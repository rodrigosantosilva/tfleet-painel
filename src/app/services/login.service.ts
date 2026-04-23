import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

import { Login, Auth, AuthPlataform } from '../types/login-response.type';
import * as sqlList from '../sql/login-repository';
import { AESEncryptDecryptService } from '../services/aesencrypt-decrypt.service'
import { Subject } from 'rxjs';

const BACKEND_URL = environment.apiUrl + '/login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private isAuthenticated = false;
  private token: string | null = null;
  private userId: string | null = null;
  private tokenTimer: any;
  private authStatusListener = new Subject<boolean>();
  private grupoAcesso: string = '';

  private usuarioLogado: Login | undefined;


  constructor(
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar,
    private crypto: AESEncryptDecryptService
  ) {
  }

  getUsuarioLogado() {
    return this.usuarioLogado;
  }

  getGrupoAcesso() {
    return this.grupoAcesso;
  }



  //snackbars
  successSnackBar(msg: string, time: number) {
    this.snackBar.open(msg, '', {
      duration: time,
      panelClass: 'success-snack-bar',
    });
  }
  errorSnackBar(msg: string, time: number) {
    this.snackBar.open(msg, '', {
      duration: time,
      panelClass: 'error-snack-bar',
    });
  }

  //dados de configuração de Login
  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getUserId() {
    return this.userId;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  loginGet() {

  }

  login(usuario: string, senha: string, grupoAcesso: string) {
    this.grupoAcesso = grupoAcesso;
    const authData: Auth = {
      usuario,
      senha,
      grupoAcesso,
      sql: sqlList.loginSQL,
      db: this.grupoAcesso
    };
    this.http
      .post<{
        result: Login;
        token: string;
        expiresIn: number;
        userId: string;
      }>(BACKEND_URL + '/login', authData)
      .subscribe(
        (response) => {
          const token = response.token;
          this.token = token;
          if (response.result) {
            const expiresInDuration = response.expiresIn;
            this.setAuthTimer(expiresInDuration);
            this.isAuthenticated = true;
            this.userId = response.userId;
            const now = new Date();
            const expirationDate = new Date(
              now.getTime() + expiresInDuration * 1000
            );
            this.saveAuthData(token, expirationDate, this.userId);
            const msg =
              'Login efetuado com sucesso. Você está sendo direcionado para o painel.';
            this.successSnackBar(msg, 3000);
            this.usuarioLogado = response.result;
            localStorage.setItem('reload', 'false');
            localStorage.setItem('filter', 'false');
            this.router.navigate(['/painel']);
          } else {
            const msg =
              'Usuário, senha ou grupo de acesso incorreto. Favor verificar os dados e tentar novamente.';
            this.errorSnackBar(msg, 3000);
          }
        },
        (error) => {
          const msg =
            'Usuário, senha ou grupo de acesso incorreto. Favor verificar os dados e tentar novamente.';
          this.errorSnackBar(msg, 3000);
          this.authStatusListener.next(false);
        }
      );
  }


  loginDirect(codigousuario: string, grupoAcesso: string) {
    this.grupoAcesso = grupoAcesso;
    const authData: AuthPlataform = {
      codigousuario,
      grupoAcesso,
      sql: sqlList.loginDirect,
      db: this.grupoAcesso
    };
    this.http
      .post<{
        result: Login;
        token: string;
        expiresIn: number;
        userId: string;
      }>(BACKEND_URL + '/loginPlatform', authData)
      .subscribe(
        (response) => {
          const token = response.token;
          this.token = token;
          if (response.result) {
            const expiresInDuration = response.expiresIn;
            this.setAuthTimer(expiresInDuration);
            this.isAuthenticated = true;
            this.userId = response.userId;
            const now = new Date();
            const expirationDate = new Date(
              now.getTime() + expiresInDuration * 1000
            );
            this.saveAuthData(token, expirationDate, this.userId);
            const msg =
              'Login efetuado com sucesso. Você está sendo direcionado para o painel.';
            this.successSnackBar(msg, 3000);
            this.usuarioLogado = response.result;
            localStorage.setItem('reload', 'false');
            localStorage.setItem('filter', 'false');
            this.router.navigate(['/painel']);
          } else {
            const msg =
              'Usuário, senha ou grupo de acesso incorreto. Favor verificar os dados e tentar novamente.';
            this.errorSnackBar(msg, 3000);
          }
        },
        (error) => {
          const msg =
            'Usuário, senha ou grupo de acesso incorreto. Favor verificar os dados e tentar novamente.';
          this.errorSnackBar(msg, 3000);
          this.authStatusListener.next(false);
        }
      );
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.userId = authInformation.userId;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.userId = null;
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/']);
  }


  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveAuthData(token: string, expirationDate: Date, userId: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('userId', userId);
    localStorage.setItem('timer', '30');
    localStorage.setItem('gerencial_db', this.grupoAcesso);
    let empresa: string = JSON.parse(atob(token.split('.')[1])).empresa;
    //empresa = empresa.split(',')[0].trim();  
    let gerencial: string = JSON.parse(atob(token.split('.')[1])).gerencial;
    let contrato: string = JSON.parse(atob(token.split('.')[1])).contrato;
    localStorage.setItem('empresa', this.crypto.encrypt(empresa));
    localStorage.setItem('filtro', this.crypto.encrypt(empresa));
    localStorage.setItem('empresaN', this.crypto.encrypt(empresa));
    localStorage.setItem('gerencial', this.crypto.encrypt(gerencial));
    localStorage.setItem('contrato', this.crypto.encrypt(contrato));
    localStorage.setItem('unidadeN', this.crypto.encrypt(''));
    localStorage.setItem('departoN', this.crypto.encrypt(''));
    localStorage.setItem('veiculoN', this.crypto.encrypt(''));
    localStorage.setItem('placaN', this.crypto.encrypt(''));
    localStorage.setItem('legalN', this.crypto.encrypt(''));
    localStorage.setItem('tipoN', this.crypto.encrypt(''));
    localStorage.setItem('gerencialN', this.crypto.encrypt(''));
    localStorage.setItem('ccustoN', this.crypto.encrypt(''));
    localStorage.setItem('situacaoN', this.crypto.encrypt(''));
    localStorage.setItem('operacionalN', this.crypto.encrypt(''));
    localStorage.setItem('reservaN', this.crypto.encrypt(''));
    localStorage.setItem('localN', this.crypto.encrypt(''));
    localStorage.setItem('locacaoN', this.crypto.encrypt(''));
    localStorage.setItem('rastreamentoN', this.crypto.encrypt(''));
    localStorage.setItem('multaTipoN', this.crypto.encrypt(''));
    localStorage.setItem('multaGravidadeN', this.crypto.encrypt(''));
    localStorage.setItem('multaDescricaoN', this.crypto.encrypt(''));
    localStorage.setItem('multaReembolsoN', this.crypto.encrypt(''));
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('gerencial_db');
    localStorage.removeItem('filtro');
    localStorage.removeItem('userId');
    localStorage.removeItem('timer');
    localStorage.removeItem('empresa');
    localStorage.removeItem('empresaN');
    localStorage.removeItem('gerencial');
    localStorage.removeItem('contrato');
    localStorage.removeItem('component');
    localStorage.removeItem('unidadeN');
    localStorage.removeItem('departoN');
    localStorage.removeItem('veiculoN');
    localStorage.removeItem('placaN');
    localStorage.removeItem('legalN');
    localStorage.removeItem('tipoN');
    localStorage.removeItem('gerencialN');
    localStorage.removeItem('ccustoN');
    localStorage.removeItem('situacaoN');
    localStorage.removeItem('operacionalN');
    localStorage.removeItem('reservaN');
    localStorage.removeItem('localN');
    localStorage.removeItem('locacaoN');
    localStorage.removeItem('rastreamentoN');
    localStorage.removeItem('multaTipoN');
    localStorage.removeItem('multaGravidadeN');
    localStorage.removeItem('multaDescricaoN');
    localStorage.removeItem('multaReembolsoN');
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const userId = localStorage.getItem('userId');
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      userId: userId
    };
  }
}
