import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider'
import { Router } from '@angular/router';

import { AESEncryptDecryptService } from '../../services/aesencrypt-decrypt.service';
import { LoginService } from '../../services/login.service';
import { Login } from '../../types/login-response.type';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ServicosService } from '../../services/servicos.service';
import { DetalhesHomeComponent } from '../detalhes-home/detalhes-home.component';

@Component({
  selector: 'app-toolbar',
  imports: [MatToolbarModule, MatIconModule, MatFormFieldModule,
    MatInputModule, MatSelectModule, CommonModule,  MatMenuModule,
    MatButtonModule, ReactiveFormsModule, MatDividerModule],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent implements OnInit {
  mobile: boolean = false;
  timer: boolean = false;
  token: string|null = '';
  usuarioLogado: Login = {
    codigofun: null,
    nome: null,
    empresa: null,
    gerencial: null,
    contrato: null,
    grupoAcesso: null,
    baseweb: null,
    urlweb: null,
    basesc: null,
    urlsc: null,
    baseic: null,
    urlic: null,
  };
  primeiroNome: string = '';
  class: string = '';
  listaEmpresa: [string, number][] = [];
  apelidoEmpresa: [string, number][] = []; 
  nomeEmpresa: string[] = [];
  codigoEmpresa: number[] = [];
  numeroZero = 10101;
  nodata = false;
  word: string= '';

  empresasForm = new FormControl();


  showMenu: any;

  constructor(
    private loginService: LoginService,
    private dialog: MatDialog,
    private servicosService: ServicosService,
    private crypto: AESEncryptDecryptService,
    private router: Router) { }

  ngOnInit(): void {
    this.timer = true;
    this.token = this.loginService.getToken();
    this.getUsuarioLogado();   
    if (this.usuarioLogado.nome  === 'RODRIGO SANTOS SILVA') {
      this.class = this.usuarioLogado.grupoAcesso!.toLocaleLowerCase();
    }
    const codigogger : string = this.crypto.decrypt(localStorage.getItem('gerencial')!);
    const contrato : string = this.crypto.decrypt(localStorage.getItem('contrato')!);
    const empresaN : string = this.crypto.decrypt(localStorage.getItem('filtro')!); //this.usuarioLogado.empresa
   
    this.servicosService.getApelidos(empresaN, codigogger, contrato).subscribe((sucesso: any) => {
      this.listaEmpresa.push(['Todas', 10101]);
      for (const empresa of sucesso.result) {
        this.listaEmpresa.push(empresa);
        this.apelidoEmpresa.push(empresa);
      }
      if (localStorage.getItem('reload') === 'false') {
        this.separaEmpresas();        
        this.empresasForm.setValue([this.codigoEmpresa[1]]);
        localStorage.setItem('empresa', this.crypto.encrypt(this.codigoEmpresa[1].toString()));
        localStorage.setItem('empresaN', this.crypto.encrypt(this.nomeEmpresa[1].toString()));
        localStorage.setItem('reload', 'true');              
      } else {
        this.separaEmpresas();
        let valores = this.crypto.decrypt(localStorage.getItem('empresa')!);
        valores = valores.split(',');
        valores = this.stringToNumberArray(valores);      
        this.empresasForm.setValue(valores);
      }

    });


    this.class = this.usuarioLogado.grupoAcesso!.toLocaleLowerCase();
    if (window.screen.width <= 768) {
      // 768px portrait
      this.mobile = true;
    } else {
      this.mobile = false;
    }
  }

  logOff(): void {
    this.loginService.logout();
  }

  separaEmpresas(): void {
    for (const empresa of this.listaEmpresa) {
      this.nomeEmpresa.push(empresa[0]);
      this.codigoEmpresa.push(empresa[1]);
    }
  }

  abrirFiltros(): void {
    let data: any;
    let names: string[] = [];
 

    this.dialog.open(DetalhesHomeComponent, {
      width: 'wrap',
      height: 'wrap',
      panelClass: 'dialog-transparent',      
      data: {
        thisData: data,
        thisNames: names,
        thisInformer: false,
        thisFilter: true,
        thisUsuarioEmpresa: this.crypto.decrypt(localStorage.getItem('empresa')!),
        
      },
    });
  }

  abrirInforma(): void {
    let data: any;
    let names: string[] = [];
    data = this.apelidoEmpresa;
    names = ['Empresas'];

    this.dialog.open(DetalhesHomeComponent, {
      width: 'wrap',
      height: 'wrap',
      panelClass: 'dialog-transparent',      
      data: {
        thisData: data,
        thisNames: names,
        thisInformer: true,
        thisFilter: false,
        thisUsuarioEmpresa: this.crypto.decrypt(localStorage.getItem('empresa')!),
        thisClass: this.class,
      },
    });
  }

  getUsuarioLogado(): void {
    this.usuarioLogado.codigofun = JSON.parse(atob(this.token!.split('.')[1])).codigofun;
    this.usuarioLogado.nome = JSON.parse(atob(this.token!.split('.')[1])).nome;
    this.usuarioLogado.empresa = JSON.parse(atob(this.token!.split('.')[1])).empresa;
    this.usuarioLogado.gerencial = JSON.parse( atob(this.token!.split('.')[1])).gerencial;
    this.usuarioLogado.contrato = JSON.parse( atob(this.token!.split('.')[1])).contrato;
    this.usuarioLogado.grupoAcesso = JSON.parse(atob(this.token!.split('.')[1])).grupoAcesso;
    this.usuarioLogado.urlic = JSON.parse(atob(this.token!.split('.')[1])).urlic;
    this.usuarioLogado.baseic = JSON.parse(atob(this.token!.split('.')[1])).baseic;
    this.usuarioLogado.urlsc = JSON.parse(atob(this.token!.split('.')[1])).urlsc;
    this.usuarioLogado.basesc = JSON.parse(atob(this.token!.split('.')[1])).basesc;
    this.usuarioLogado.urlweb = JSON.parse(atob(this.token!.split('.')[1])).urlweb;
    this.usuarioLogado.baseweb = JSON.parse(atob(this.token!.split('.')[1])).baseweb;   
    this.primeiroNome =
      this.usuarioLogado.nome!.split(' ')[0].charAt(0).toUpperCase() +
      this.usuarioLogado.nome!.split(' ')[0].toLowerCase().slice(1);
    this.word = btoa(`${this.usuarioLogado.codigofun}:GASFKUHASF73243HSDF67`);
  }

  openMenu(): void {
    this.showMenu = this.dialog.open(SidebarComponent, {
      width: '60vw',
      data: {
        mobile: this.mobile
      }
    });
  }

  stringToNumberArray(array: string[]): number[] {
    const numbers: number[] = [];
    for (const item of array) {
      numbers.push(this.stringToNumber(item));
    }
    return numbers;
  }

  stringToNumber(nome: string): number {
    return Number(nome);
  }

  retornaNome(codigo: number): string {
    if (codigo) {
      const dado = this.listaEmpresa.filter(dados => Number(dados[1]) === Number(codigo));
      this.nodata = false;
      return dado[0][0];
    }
    this.nodata = true;
    return 'Nenhuma empresa selecionada.';
  }

  retornaNomes(codigos: number[]): string[] {
    const nomes: string[] = [];
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < codigos.length; i++) {
      const dado = this.listaEmpresa.filter(empresa => empresa[1] === codigos[i]);
      nomes.push(dado[0][0]);
    }
    return nomes;
  }

  mudaEmpresa(): any {
    if (!this.nodata) {
      localStorage.setItem('reload', 'true');
      const codigocli = this.empresasForm.value;
      const nomes = this.retornaNomes(this.empresasForm.value); 
      localStorage.setItem('empresa', this.crypto.encrypt(codigocli.toString()));
      localStorage.setItem('empresaN', this.crypto.encrypt(nomes.toString()));
      localStorage.setItem('unidadeN', this.crypto.encrypt(''));
      localStorage.setItem('departoN', this.crypto.encrypt(''));
      localStorage.setItem('veiculoN', this.crypto.encrypt(''));
      localStorage.setItem('placaN', this.crypto.encrypt(''));
      localStorage.setItem('legalN', this.crypto.encrypt(''));
      localStorage.setItem('tipoN', this.crypto.encrypt(''));
      localStorage.setItem('filter', 'false'); 

      switch (localStorage.getItem('component')) {
        case 'home':
          this.router.navigate(['/painel/home']);
          break;
        case 'atendimento':
          this.router.navigate(['/painel/atendimento']);
          break;
        case 'servicos':
          this.router.navigate(['/painel/servicos']);
          break;
        case 'frota':
          this.router.navigate(['/painel/frota']);
          break;
        case 'infracoes':
          this.router.navigate(['/painel/infracoes']);
          break;
        case 'custo':
          this.router.navigate(['/painel/custo']);
          break;
        case 'rapido':
          this.router.navigate(['/painel/rapido']);
          break;
        case 'telemetria':
          this.router.navigate(['/painel/telemetria']);
          break;
        case 'locacoes':
          this.router.navigate(['/painel/locacoes']);
          break;          
        default:
          this.router.navigate(['/painel/home']);
          break;
      }
    }
  }

  selecionarTudo(): void {
    if (this.codigoEmpresa.length === this.empresasForm.value.length + 1) {
      this.empresasForm.setValue([this.codigoEmpresa[1]]);
    } else {
      this.empresasForm.setValue(this.codigoEmpresa);
    }
  }

  deselectAll(): void {
    const valores: [] = this.empresasForm.value;
    const filtro = valores.filter(dado => dado !== 0);
    this.empresasForm.setValue(filtro);
  }

  toSC(): void {
    const link = `${this.usuarioLogado.urlsc}?codigoUsuario=${this.word}&grupoAcesso=${this.usuarioLogado.basesc!.toLowerCase()}`;
    window.open(link, '_blank');
  }

  toIC(): void {
    const link = `${this.usuarioLogado.urlic}?codigoUsuario=${this.word}&grupoAcesso=${this.usuarioLogado.baseic!.toLowerCase()}`;
    window.open(link, '_blank');
  }

  toWeb(): void {
    const link = `${this.usuarioLogado.urlweb}?grupoAcesso=${this.usuarioLogado.baseweb!.toLowerCase()}&codigoUsuario=${this.word}`;
    window.open(link, '_blank');
  }


}
