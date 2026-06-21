import { Component, OnInit, Inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink  } from '@angular/router';
import { CommonModule } from '@angular/common';

import { LoginService } from '../../services/login.service';
import { Login } from '../../types/login-response.type';

@Component({
  selector: 'app-sidebar',
  imports: [ MatToolbarModule, MatSidenavModule, MatListModule,MatIconModule, RouterLink, CommonModule 
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {
  token: string| null = null;
  usuarioLogado: Login = {
    codigofun: null,
    nome: null,
    empresa: null,
    gerencial: null,
    contrato: null,
    grupoAcesso: null,
    baseweb: null,
    urlweb:  null,
    basesc:  null,
    urlsc:  null,
    baseic:  null,
    urlic:  null,
  };
  class: string = '';
  mobile: boolean = false;

  constructor(private loginService: LoginService,
              private router: Router
  ) {}

  ngOnInit(): void {
    this.token = this.loginService.getToken();
    this.getUsuarioLogado();
    this.class = this.usuarioLogado.grupoAcesso!.toLocaleLowerCase();
  }

  getUsuarioLogado(): void {
    this.usuarioLogado.codigofun = JSON.parse(atob(this.token!.split('.')[1])).codigofun;
    this.usuarioLogado.nome = JSON.parse(atob(this.token!.split('.')[1])).nome;
    this.usuarioLogado.empresa = JSON.parse( atob(this.token!.split('.')[1])).empresa;
    this.usuarioLogado.gerencial = JSON.parse( atob(this.token!.split('.')[1])).gerencial;
    this.usuarioLogado.contrato = JSON.parse( atob(this.token!.split('.')[1])).contrato;
    this.usuarioLogado.grupoAcesso = JSON.parse(atob(this.token!.split('.')[1])).grupoAcesso;
    this.usuarioLogado.urlic = JSON.parse(atob(this.token!.split('.')[1])).urlic;
    this.usuarioLogado.baseic = JSON.parse(atob(this.token!.split('.')[1])).baseic;
    this.usuarioLogado.urlsc = JSON.parse(atob(this.token!.split('.')[1])).urlsc;
    this.usuarioLogado.basesc = JSON.parse(atob(this.token!.split('.')[1])).basesc;
    this.usuarioLogado.urlweb = JSON.parse(atob(this.token!.split('.')[1])).urlweb;
    this.usuarioLogado.baseweb = JSON.parse(atob(this.token!.split('.')[1])).baseweb;
  }

  digitalizar(){
    this.router.navigate(["digitaGrid"]);
  }

}
