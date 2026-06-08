import { Component, OnInit, OnDestroy,Input  } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule} from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { CountUp } from 'countup.js'

import { DetalhesHomeComponent } from '../../components/detalhes-home/detalhes-home.component';
import { AESEncryptDecryptService } from '../../services/aesencrypt-decrypt.service';
import { LoginService } from '../../services/login.service';
import { MultasService } from '../../services/multas.service';
import { ServicosService } from '../../services/servicos.service';
import { FrotasService } from '../../services/frotas.service';
import { AtendimentoService } from '../../services/atendimento.service';
import { Login } from '../../types/login-response.type';
import { Marca } from '../../types/frota-response.type';
import { Resumo, Status, ChartModel } from '../../types/home-response.type';
import { ToolsService } from '../../services/tools.service';
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";


@Component({
  selector: 'app-home',
  imports: [CommonModule, MatToolbarModule, MatIconModule, MatProgressBarModule,
    MatCardModule, MatMenuModule, MatButtonModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {
  filter: any;
  ok = false;
  @Input() printTitle!: string;

  token: string = '';

  resumoAtendimento: Resumo = { abertos: 0, fechados: 0, total: 0 };
  resumoServicos: Resumo = { abertos: 0, fechados: 0, total: 0 };

  statusAtendimento: Status[] = [];
  statusServico: Status[] = [];
  statusMulta: Status[] = [];
  totalMulta = 0;
  dataInicial: string = '';
  dataFinal: string = '';
  tituloRelatorio: string = '';

  marcas: Marca[] = [];
  notFound = 'Sem dados para exibir';

  // atendimento charts
  atendimentoChart: ChartModel = { type: null, data: [], options: null };
  // servicos charts
  servicosChart: ChartModel = { type: null, data: [], options: null };
  // servicos charts
  multaChart: ChartModel = { type: null, data: [], options: null };
  // servicos charts
  frotaChart: ChartModel = { type: null, data: [], options: null };

  frotaAtiva = 0;
  progress = 0;
  full: boolean = false;

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

  myOpts = {
    separator: '.',
  };

  mySubscription: any;

  constructor(
    private loginService: LoginService,
    private atendimentoService: AtendimentoService,
    private servicosService: ServicosService,
    private frotaService: FrotasService,
    private tools: ToolsService,
    private router: Router,
    private dialog: MatDialog,
    private multasService: MultasService,
    private crypto: AESEncryptDecryptService) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };
    this.mySubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.router.navigated = false;
      }
    });
  }

  ngOnDestroy(): void {
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }
  }

  //  Executa ao iniciar
  ngOnInit(): void {
    localStorage.setItem('component', 'home');
    this.dataInicial = localStorage.getItem('dataInicial')!;
    this.dataFinal = localStorage.getItem('dataFinal')!;
    this.tituloRelatorio = 'Resumo Geral - Período: ' + this.dataInicial + ' ~ ' + this.dataFinal;
    this.getToken();
    this.getUsuarioLogado();
    setTimeout(() => {
      this.setResumo(1);
    }, 1000);
  }

  // Gera os gráficos
  generateCharts(): void {
    this.totalMulta = 0;
    /*for (const status of this.statusMulta) {
      this.totalMulta += status[1];
    }*/
    this.generateAtendimentoChart();
    this.generateServicoChart();
    this.generateMultasChart();
    this.generateFrotaChart();
  }

  // Pega o token que contém os dados do usuário
  getToken(): void {
    this.token = this.loginService.getToken()!;
  }
  // Preenche os dados do usuário logado pelo token
  getUsuarioLogado(): void {
    this.usuarioLogado.codigofun = JSON.parse(
      atob(this.token.split('.')[1])
    ).codigofun;
    this.usuarioLogado.nome = JSON.parse(atob(this.token.split('.')[1])).nome;
    this.usuarioLogado.empresa = JSON.parse(atob(this.token.split('.')[1])).empresa;
    this.usuarioLogado.gerencial = JSON.parse(atob(this.token.split('.')[1])).gerencial;
    this.usuarioLogado.contrato = JSON.parse(atob(this.token.split('.')[1])).contrato;
    this.usuarioLogado.grupoAcesso = JSON.parse(
      atob(this.token.split('.')[1])
    ).grupoAcesso;
  }
  // Pega os dados para preencher os cards
  async setResumo(anos: number): Promise<void> {
    // atendimento resumo
    await this.atendimentoService.generateResumo(anos * 365, this.crypto.decrypt(localStorage.getItem('empresa')!),
      this.crypto.decrypt(localStorage.getItem('gerencial')!),
      this.crypto.decrypt(localStorage.getItem('contrato')!),
      this.crypto.decrypt(localStorage.getItem('legalN')!),
      this.crypto.decrypt(localStorage.getItem('unidadeN')!),
      this.crypto.decrypt(localStorage.getItem('departoN')!),
      this.crypto.decrypt(localStorage.getItem('tipoN')!),
      this.crypto.decrypt(localStorage.getItem('veiculoN')!),
      this.crypto.decrypt(localStorage.getItem('placaN')!),
      this.crypto.decrypt(localStorage.getItem('gerencialN')!),
      this.crypto.decrypt(localStorage.getItem('ccustoN')!),
      this.crypto.decrypt(localStorage.getItem('localN')!),
      this.crypto.decrypt(localStorage.getItem('situacaoN')!),
      this.crypto.decrypt(localStorage.getItem('operacionalN')!),
      this.crypto.decrypt(localStorage.getItem('reservaN')!),
      this.crypto.decrypt(localStorage.getItem('locacaoN')!),
      this.crypto.decrypt(localStorage.getItem('rastreamentoN')!)
    ).subscribe({
      next: (resumoAtendimento: any) => {
        this.resumoAtendimento = resumoAtendimento.result;
        this.progress = 14;
      },
      error: (erro: any) => {
        console.error(erro);
      }
    });
    // serviços resumo              
    await this.servicosService.generateStatus(anos * 365).subscribe({
      next: (statusServico: any) => {
        this.statusServico = statusServico.result;
        this.progress = 56;
      },
      error: (erro: any) => {
        console.error(erro);
      }
    });
    // Marcas - frota
    await this.frotaService.generateMarca().subscribe({
      next: (marcas: any) => {
        this.marcas = marcas.result;
        this.progress = 78;
      },
      error: (erro: any) => {
        console.error(erro);
      }
    });
    // status atendimento
    await this.atendimentoService.generateStatus(anos * 365, this.crypto.decrypt(localStorage.getItem('empresa')!),
      this.crypto.decrypt(localStorage.getItem('gerencial')!),
      this.crypto.decrypt(localStorage.getItem('contrato')!),
      this.crypto.decrypt(localStorage.getItem('legalN')!),
      this.crypto.decrypt(localStorage.getItem('unidadeN')!),
      this.crypto.decrypt(localStorage.getItem('departoN')!),
      this.crypto.decrypt(localStorage.getItem('tipoN')!),
      this.crypto.decrypt(localStorage.getItem('veiculoN')!),
      this.crypto.decrypt(localStorage.getItem('placaN')!),
      this.crypto.decrypt(localStorage.getItem('gerencialN')!),
      this.crypto.decrypt(localStorage.getItem('ccustoN')!),
      this.crypto.decrypt(localStorage.getItem('localN')!),
      this.crypto.decrypt(localStorage.getItem('situacaoN')!),
      this.crypto.decrypt(localStorage.getItem('operacionalN')!),
      this.crypto.decrypt(localStorage.getItem('reservaN')!),
      this.crypto.decrypt(localStorage.getItem('locacaoN')!),
      this.crypto.decrypt(localStorage.getItem('rastreamentoN')!))
      .subscribe({
        next: (statusAtendimento: any) => {
          this.statusAtendimento = statusAtendimento.result;
          this.progress = 90;
        },
        error: (erro: any) => {
          console.error(erro);
        }
      });
    // multa gravidade
    await this.multasService.getResumoGravidade(anos * 365).subscribe({
      next: (statusMulta: any) => {
        this.statusMulta = statusMulta.result;
        this.progress = 95;
        this.ok = true;
      },
      error: (erro: any) => {
        console.error(erro);
      }
    });
    this.generateCharts();
  }

  // Gera o Gráfico de Status do atendimento
  generateAtendimentoChart(): void {
    const status: string[] = ['Status'];
    const total: string[] = ['Total'];
    let statusAtual: string;
    for (const statusAt of this.statusAtendimento as Status[]) {
      statusAtual = statusAt["status"];
      statusAtual = statusAtual.toLocaleLowerCase();
      statusAtual = statusAtual.charAt(0).toUpperCase() + statusAtual.slice(1);
      status.push(statusAtual);
      total.push(statusAt["total"].toString());
    }



    this.atendimentoChart.names = status;
    this.atendimentoChart.data = [total];
    this.atendimentoChart.type = 'ColumnChart';
    this.atendimentoChart.options = {
      animation: {
        duration: 1000,
        easing: 'out',
        startup: true,
      },
      legend: { position: 'top', alignment: 'center', maxLines: 2 },
      backgroundColor: 'transparent',
      position: 'center',
    };
  }

  // Gera o Gráfico de Status das OSs
  generateServicoChart(): void {
    const status: string[] = ['Status'];
    const total = ['Total'];
    let statusAtual: string;
    for (const statusS of this.statusServico) {
      statusAtual = statusS["status"];
      statusAtual = statusAtual.toLocaleLowerCase();
      statusAtual = statusAtual.split('_').join(' ');
      statusAtual = statusAtual.charAt(0).toUpperCase() + statusAtual.slice(1);
      status.push(statusAtual);
      total.push(statusS["total"].toString());
    }
    this.servicosChart.names = status;
    this.servicosChart.data = [total];
    this.servicosChart.type = 'ColumnChart';
    this.servicosChart.options = {
      animation: {
        duration: 1000,
        easing: 'out',
        startup: true,
      },
      legend: { position: 'top', alignment: 'center', maxLines: 2 },
      backgroundColor: 'transparent',
      position: 'center',
    };
  }

  // gera gráfico de multas
  generateMultasChart(): void {
    this.multaChart.data = this.statusMulta;
    this.multaChart.type = 'ColumnChart';
    this.multaChart.options = {
      animation: {
        duration: 1000,
        easing: 'out',
        startup: true,
      },
      legend: { position: 'none' },
      backgroundColor: 'transparent',
      position: 'center',
      colors: [this.tools.randomColorGenerator()]
    };
  }

  // Gera o Gráfico de Frota Ativa
  generateFrotaChart(): void {
    for (const marca of this.marcas) {
      this.frotaAtiva += marca["total"];
    }
    this.frotaChart.type = 'ColumnChart';
    this.frotaChart.data = this.marcas;

    this.frotaChart.options = {
      animation: {
        duration: 1000,
        easing: 'out',
        startup: true,
      },
      chartArea: { width: '90%' },
      hAxis: {
        textStyle: {
          fontSize: 10,
        },
      },
      legend: { position: 'none' },
      backgroundColor: 'transparent',
      position: 'center',
      colors: [this.tools.randomColorGenerator()]
    };
  }

  abrirDetalhes(dado: string): void {
    let data: any;
    let names: string[] = [];

    switch (dado) {
      case 'atendimento':
        data = this.statusAtendimento;
        names = ['Status', 'Quantidade'];
        break;
      case 'os':
        data = this.statusServico;
        names = ['Status', 'Quantidade'];
        break;
      case 'multas':
        data = this.statusMulta;
        names = ['Gravidade', 'Quantidade'];
        break;
      case 'frota':
        data = this.marcas;
        names = ['Marca', 'Quantidade'];
        break;
    }

    this.dialog.open(DetalhesHomeComponent, {
      width: 'wrap',
      height: 'wrap',
      panelClass: 'dialog-transparent',
      data: {
        thisData: data,
        thisNames: names,
      },
    });
  }

  isFullScreen(): boolean {
    return (
      (document.fullscreenElement! && document.fullscreenElement! !== null) ||
      (document.fullscreenElement! && document.fullscreenElement! !== null)
    );
  }

  enterFS(id: string): void {
    const page = document.getElementById(id)!;
    if (page.requestFullscreen) {
      page.requestFullscreen();
    } else if (page.requestFullscreen) {
      page.requestFullscreen();
    }
  }

  exitFS(): void {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if ((document as any).webkitExitFullscreen) {
    (document as any).webkitExitFullscreen();
  } else if ((document as any).mozCancelFullScreen) {
    (document as any).mozCancelFullScreen();
  } else if ((document as any).msExitFullscreen) {
    (document as any).msExitFullscreen();
  }
  }

  toggleFS(id: any): void {
    if (!this.isFullScreen()) {
      this.full = true;
      this.enterFS(id);
    } else {
      this.full = false;
      this.exitFS();
    }
  }
}
