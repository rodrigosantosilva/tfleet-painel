import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl } from '@angular/forms';

import { ServicosService } from '../../services/servicos.service';
import { MultasService } from '../../services/multas.service';
import { FrotasService } from '../../services/frotas.service';
import { AESEncryptDecryptService } from '../../services/aesencrypt-decrypt.service';
import { Router } from '@angular/router';
import { Vehicle } from '../../types/servicos-response.type';

@Component({
  selector: 'app-detalhes-home',
  imports: [],
  templateUrl: './detalhes-home.component.html',
  styleUrl: './detalhes-home.component.scss'
})
export class DetalhesHomeComponent implements OnInit {

  displayedColumns: string[] = [];
  dataSource: MatTableDataSource<any>;
  filtering = false;
  informating = false;
  txtButton = false;
  classing: string;
  usuarioEmpresa: string;

  unidadeForm = new FormControl();
  departoForm = new FormControl();
  veiculoForm = new FormControl();
  placaForm = new FormControl();
  legalForm = new FormControl();
  tipoForm = new FormControl();
  gerencialForm = new FormControl();
  ccustoForm = new FormControl();
  situacaoForm = new FormControl();
  operacionalForm = new FormControl();
  reservaForm = new FormControl();
  localForm = new FormControl();
  locacaoForm = new FormControl();
  rastreamentoForm = new FormControl();
  tipoMultaForm = new FormControl();
  gravidadeMultaForm = new FormControl();
  descricaoMultaForm = new FormControl();
  reembolsoMultaForm = new FormControl();

  listaUnidade: string[] = [];
  listaDeparto: string[] = [];
  listanomes: string[] = [];
  listaVeiculo: string[] = [];
  listaPlaca: string[] = [];
  listaLegal: string[] = [];
  listaTipo: string[] = [];
  listaGerencial: string[] = [];
  listaCCusto: string[] = [];
  listaSituacao: string[] = [];
  listaOperacional: string[] = [];
  listaReserva: string[] = [];
  listaLocal: string[] = [];
  listaLocacao: string[] = [];
  listaRastreamento: string[] = [];
  listaTipoMulta: string[] = [];
  listaGravidadeMulta: string[] = [];
  listaDescricaoMulta: string[] = [];
  listaReembolsoMulta: string[] = [];
  //listaVehicle : Vehicle[];

  @ViewChild('paginator')
  paginator: MatPaginator = new MatPaginator;
  @ViewChild(MatSort, { static: true })
  sort: MatSort = new MatSort;

  constructor(
    private dialogRef: MatDialogRef<DetalhesHomeComponent>,
    private servicosService: ServicosService,
    private multasService: MultasService,
    private frotaService: FrotasService,
    private crypto: AESEncryptDecryptService,
    private router: Router,


    @Inject(MAT_DIALOG_DATA)
    private data: {
      thisData: any;
      thisNames: string[];
      thisInformer: boolean;
      thisFilter: boolean;
      thisClass: string;
      thisUsuarioEmpresa: any;

    }
  ) {
    this.dataSource = new MatTableDataSource(this.data.thisData);
    this.filtering = this.data.thisFilter;
    this.informating = this.data.thisInformer;
    this.usuarioEmpresa = this.data.thisUsuarioEmpresa;
    this.classing = this.data.thisClass;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {

    this.displayedColumns = this.data.thisNames;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'Tipo': return item[0];
        case 'Status': return item[0];
        case 'Placa': return item[0];
        case 'Motivo': return item[0];
        case 'Gerencial': return item[0];
        case 'Estado': return item[0];
        case 'Gravidade': return item[0];
        case 'Marca': return item[0];
        case 'CCusto': return item[0];
        case 'Situacao': return item[0];
        case 'Operacao': return item[0];
        case 'Reserva': return item[0];
        case 'Local': return item[0];
        case 'Locacao': return item[0];
        case 'Rastreamento': return item[0];
        default: return item[1];
      }
    };
    this.dataSource.sort = this.sort;
    if (this.filtering) {
      this.SelectMultiple();
      this.SelectInfracoes();

      if (localStorage.getItem('filter') === 'false') {
        this.unidadeForm.setValue(['']);
        this.departoForm.setValue(['']);
        this.veiculoForm.setValue(['']);
        this.placaForm.setValue(['']);
        this.legalForm.setValue(['']);
        this.tipoForm.setValue(['']);
        this.gerencialForm.setValue(['']);
        this.ccustoForm.setValue(['']);
        this.situacaoForm.setValue(['']);
        this.operacionalForm.setValue(['']);
        this.reservaForm.setValue(['']);
        this.localForm.setValue(['']);
        this.locacaoForm.setValue(['']);
        this.rastreamentoForm.setValue(['']);
        // Filtro especial Infração
        this.tipoMultaForm.setValue(['']);
        this.gravidadeMultaForm.setValue(['']);
        this.descricaoMultaForm.setValue(['']);
        this.reembolsoMultaForm.setValue(['']);

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
        // Filtro especial Infração
        localStorage.setItem('multaTipoN', this.crypto.encrypt(''));
        localStorage.setItem('multaGravidadeN', this.crypto.encrypt(''));
        localStorage.setItem('multaDescricaoN', this.crypto.encrypt(''));
        localStorage.setItem('multaReembolsoN', this.crypto.encrypt(''));
        localStorage.setItem('filter', 'true');
        this.txtButton = false;
      } else {
        this.txtButton = true;
        this.listanomes = this.crypto.decrypt(localStorage.getItem('unidadeN')!.toString()).split(',');
        this.unidadeForm.setValue(this.listanomes);
        this.listanomes = this.crypto.decrypt(localStorage.getItem('departoN')!.toString()).split(',');
        this.departoForm.setValue(this.listanomes);
        this.listanomes = this.crypto.decrypt(localStorage.getItem('veiculoN')!.toString()).split(',');
        this.veiculoForm.setValue(this.listanomes);
        this.listanomes = this.crypto.decrypt(localStorage.getItem('placaN')!.toString()).split(',');
        this.placaForm.setValue(this.listanomes);
        this.listanomes = this.crypto.decrypt(localStorage.getItem('legalN')!.toString()).split(',');
        this.legalForm.setValue(this.listanomes);
        this.listanomes = this.crypto.decrypt(localStorage.getItem('tipoN')!.toString()).split(',');
        this.tipoForm.setValue(this.listanomes);
        this.listanomes = this.crypto.decrypt(localStorage.getItem('gerencialN')!.toString()).split(',');
        this.gerencialForm.setValue(this.listanomes);
        this.listanomes = this.crypto.decrypt(localStorage.getItem('ccustoN')!.toString()).split(',');
        this.ccustoForm.setValue(this.listanomes);
        this.listanomes = this.crypto.decrypt(localStorage.getItem('situacaoN')!.toString()).split(',');
        this.situacaoForm.setValue(this.listanomes);
        this.listanomes = this.crypto.decrypt(localStorage.getItem('operacionalN')!.toString()).split(',');
        this.operacionalForm.setValue(this.listanomes);
        this.listanomes = this.crypto.decrypt(localStorage.getItem('reservaN')!.toString()).split(',');
        this.reservaForm.setValue(this.listanomes);
        this.listanomes = this.crypto.decrypt(localStorage.getItem('localN')!.toString()).split(',');
        this.localForm.setValue(this.listanomes);
        this.listanomes = this.crypto.decrypt(localStorage.getItem('locacaoN')!.toString()).split(',');
        this.locacaoForm.setValue(this.listanomes);
        this.listanomes = this.crypto.decrypt(localStorage.getItem('rastreamentoN')!.toString()).split(',');
        this.rastreamentoForm.setValue(this.listanomes);
        // Filtro especial Infração
        this.listanomes = this.crypto.decrypt(localStorage.getItem('multaTipoN')!.toString()).split(',');
        this.tipoMultaForm.setValue(this.listanomes);
        this.listanomes = this.crypto.decrypt(localStorage.getItem('multaGravidadeN')!.toString()).split(',');
        this.gravidadeMultaForm.setValue(this.listanomes);
        this.listanomes = this.crypto.decrypt(localStorage.getItem('multaDescricaoN')!.toString()).split(',');
        this.descricaoMultaForm.setValue(this.listanomes);
        this.listanomes = this.crypto.decrypt(localStorage.getItem('multaReembolsoN')!.toString()).split(',');
        this.reembolsoMultaForm.setValue(this.listanomes);
      };
    }
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  verificaTipo(dado: any): any {
    return typeof (dado);
  }

  eNumero(dado: any): boolean {
    return typeof (dado) === 'number' ? true : false;
  }
  onClose(): void {
    this.dialogRef.close();
  }

  SelectMultiple(): void {
    this.servicosService.getUnidades(this.usuarioEmpresa).subscribe((sucesso: any) => {
      for (const unidade of sucesso.result) {
        this.listaUnidade.push(unidade);
      }
    });
    this.servicosService.getDepartos(this.usuarioEmpresa).subscribe((sucesso: any) => {
      for (const departo of sucesso.result) {
        this.listaDeparto.push(departo);
      }
    });
    this.servicosService.getVeiculos(this.usuarioEmpresa).subscribe((sucesso: any) => {
      for (const veiculo of sucesso.result) {
        this.listaVeiculo.push(veiculo);
      }
    });
    this.servicosService.getPlacas(this.usuarioEmpresa).subscribe((sucesso: any) => {
      for (const placa of sucesso.result) {
        this.listaPlaca.push(placa);
      }
    });
    this.servicosService.getLegal(this.usuarioEmpresa).subscribe((sucesso: any) => {
      for (const legal of sucesso.result) {
        this.listaLegal.push(legal);
      }
    });
    this.servicosService.getTipo(this.usuarioEmpresa).subscribe((sucesso: any) => {
      for (const tipo of sucesso.result) {
        this.listaTipo.push(tipo);
      }
    });
    this.servicosService.getGerencial(this.usuarioEmpresa).subscribe((sucesso: any) => {
      for (const gerencial of sucesso.result) {
        this.listaGerencial.push(gerencial);
      }
    });
    this.servicosService.getCCusto(this.usuarioEmpresa).subscribe((sucesso: any) => {
      for (const ccusto of sucesso.result) {
        this.listaCCusto.push(ccusto);
      }
    });
    this.servicosService.getSituacao(this.usuarioEmpresa).subscribe((sucesso: any) => {
      for (const situacao of sucesso.result) {
        this.listaSituacao.push(situacao);
      }
    });
    this.servicosService.getOperacional(this.usuarioEmpresa).subscribe((sucesso: any) => {
      for (const operacao of sucesso.result) {
        this.listaOperacional.push(operacao);
      }
    });
    this.servicosService.getReserva(this.usuarioEmpresa).subscribe((sucesso: any) => {
      for (const reserva of sucesso.result) {
        this.listaReserva.push(reserva);
      }
    });
    this.servicosService.getLocal(this.usuarioEmpresa).subscribe((sucesso: any) => {
      for (const local of sucesso.result) {
        this.listaLocal.push(local);
      }
    });
    this.servicosService.getLocacao(this.usuarioEmpresa).subscribe((sucesso: any) => {
      for (const locador of sucesso.result) {
        this.listaLocacao.push(locador);
      }
    });
    this.servicosService.getRastreamento(this.usuarioEmpresa).subscribe((sucesso: any) => {
      for (const rastreador of sucesso.result) {
        this.listaRastreamento.push(rastreador);
      }
    });

  }

  SelectInfracoes(): void {
    //if (this.classing === 'infracoes') {
    this.multasService.getFilterTipo().subscribe((sucesso: any) => {
      for (const tipo of sucesso.result) {
        this.listaTipoMulta.push(tipo);
      }
    });
    this.multasService.getFilterGravidade().subscribe((sucesso: any) => {
      for (const gravidade of sucesso.result) {
        this.listaGravidadeMulta.push(gravidade);
      }
    });
    this.multasService.getFilterDescricao().subscribe((sucesso: any) => {
      for (const descricao of sucesso.result) {
        this.listaDescricaoMulta.push(descricao);
      }
    });
    this.multasService.getFilterReembolso().subscribe((sucesso: any) => {
      for (const reembolso of sucesso.result) {
        this.listaReembolsoMulta.push(reembolso);
      }
    });

  }

  mudaInfracao(): any {
    if (this.classing === 'infracoes') {
      const nomesTipo = this.tipoMultaForm.value;
      const nomesGravidade = this.gravidadeMultaForm.value;
      const nomesDescricao = this.descricaoMultaForm.value;
      const nomesReembolso = this.reembolsoMultaForm.value;
      localStorage.setItem('multaTipoN', this.crypto.encrypt(nomesTipo.toString()));
      localStorage.setItem('multaGravidadeN', this.crypto.encrypt(nomesGravidade.toString()));
      localStorage.setItem('multaDescricaoN', this.crypto.encrypt(nomesDescricao.toString()));
      localStorage.setItem('multaReembolsoN', this.crypto.encrypt(nomesReembolso.toString()));
      this.SelectInfracoes();
      this.listaTipoMulta = this.crypto.decrypt(localStorage.getItem('multaTipoN')!.toString()).split(',');
      this.tipoMultaForm.setValue(this.listaTipoMulta);
      this.listaGravidadeMulta = this.crypto.decrypt(localStorage.getItem('multaGravidadeN')!.toString()).split(',');
      this.gravidadeMultaForm.setValue(this.listaGravidadeMulta);
      this.listaDescricaoMulta = this.crypto.decrypt(localStorage.getItem('multaDescricaoN')!.toString()).split(',');
      this.descricaoMultaForm.setValue(this.listaDescricaoMulta);
      this.listaReembolsoMulta = this.crypto.decrypt(localStorage.getItem('multaReembolsoN')!.toString()).split(',');
      this.reembolsoMultaForm.setValue(this.listaReembolsoMulta);
    };
  }

  mudaEmpresa(): any {
    const nomesUnidade = this.unidadeForm.value;
    const nomesDepartamento = this.departoForm.value;
    const nomesVeiculo = this.veiculoForm.value;
    const nomesPlaca = this.placaForm.value;
    const nomesLegal = this.legalForm.value;
    const nomesTipos = this.tipoForm.value;
    const nomesGerencial = this.gerencialForm.value;
    const nomesCCusto = this.ccustoForm.value;
    const nomesSituacao = this.situacaoForm.value;
    const nomesOperacional = this.operacionalForm.value;
    const nomesReserva = this.reservaForm.value;
    const nomesLocal = this.localForm.value;
    const nomesLocacao = this.locacaoForm.value;
    const nomesRastreamento = this.rastreamentoForm.value;
    localStorage.setItem('unidadeN', this.crypto.encrypt(nomesUnidade.toString()));
    localStorage.setItem('departoN', this.crypto.encrypt(nomesDepartamento.toString()));
    localStorage.setItem('veiculoN', this.crypto.encrypt(nomesVeiculo.toString()));
    localStorage.setItem('placaN', this.crypto.encrypt(nomesPlaca.toString()));
    localStorage.setItem('legalN', this.crypto.encrypt(nomesLegal.toString()));
    localStorage.setItem('tipoN', this.crypto.encrypt(nomesTipos.toString()));
    localStorage.setItem('gerencialN', this.crypto.encrypt(nomesGerencial.toString()));
    localStorage.setItem('ccustoN', this.crypto.encrypt(nomesCCusto.toString()));
    localStorage.setItem('situacaoN', this.crypto.encrypt(nomesSituacao.toString()));
    localStorage.setItem('operacionalN', this.crypto.encrypt(nomesOperacional.toString()));
    localStorage.setItem('reservaN', this.crypto.encrypt(nomesReserva.toString()));
    localStorage.setItem('localN', this.crypto.encrypt(nomesLocal.toString()));
    localStorage.setItem('locacaoN', this.crypto.encrypt(nomesLocacao.toString()));
    localStorage.setItem('rastreamentoN', this.crypto.encrypt(nomesRastreamento.toString()));
    this.SelectMultiple();
    this.listanomes = this.crypto.decrypt(localStorage.getItem('unidadeN')!.toString()).split(',');
    this.unidadeForm.setValue(this.listanomes);
    this.listanomes = this.crypto.decrypt(localStorage.getItem('departoN')!.toString()).split(',');
    this.departoForm.setValue(this.listanomes);
    this.listanomes = this.crypto.decrypt(localStorage.getItem('veiculoN')!.toString()).split(',');
    this.veiculoForm.setValue(this.listanomes);
    this.listanomes = this.crypto.decrypt(localStorage.getItem('placaN')!.toString()).split(',');
    this.placaForm.setValue(this.listanomes);
    this.listanomes = this.crypto.decrypt(localStorage.getItem('legalN')!.toString()).split(',');
    this.legalForm.setValue(this.listanomes);
    this.listanomes = this.crypto.decrypt(localStorage.getItem('tipoN')!.toString()).split(',');
    this.tipoForm.setValue(this.listanomes);
    this.listanomes = this.crypto.decrypt(localStorage.getItem('gerencialN')!.toString()).split(',');
    this.gerencialForm.setValue(this.listanomes);
    this.listanomes = this.crypto.decrypt(localStorage.getItem('ccustoN')!.toString()).split(',');
    this.ccustoForm.setValue(this.listanomes);
    this.listanomes = this.crypto.decrypt(localStorage.getItem('situacaoN')!.toString()).split(',');
    this.situacaoForm.setValue(this.listanomes);
    this.listanomes = this.crypto.decrypt(localStorage.getItem('operacionalN')!.toString()).split(',');
    this.operacionalForm.setValue(this.listanomes);
    this.listanomes = this.crypto.decrypt(localStorage.getItem('reservaN')!.toString()).split(',');
    this.reservaForm.setValue(this.listanomes);
    this.listanomes = this.crypto.decrypt(localStorage.getItem('localN')!.toString()).split(',');
    this.localForm.setValue(this.listanomes);
    this.listanomes = this.crypto.decrypt(localStorage.getItem('locacaoN')!.toString()).split(',');
    this.locacaoForm.setValue(this.listanomes);
    this.listanomes = this.crypto.decrypt(localStorage.getItem('rastreamentoN')!.toString()).split(',');
    this.rastreamentoForm.setValue(this.listanomes);
    //filtro de infrações
    this.mudaInfracao();
  }

  filtraInfracao(): any {
    if (this.classing === 'infracoes') {
      const nomesTipo = this.tipoMultaForm.value;
      const nomesGravidade = this.gravidadeMultaForm.value;
      const nomesDescricao = this.descricaoMultaForm.value;
      const nomesReembolso = this.reembolsoMultaForm.value;
      localStorage.setItem('multaTipoN', this.crypto.encrypt(nomesTipo.toString()));
      localStorage.setItem('multaGravidadeN', this.crypto.encrypt(nomesGravidade.toString()));
      localStorage.setItem('multaDescricaoN', this.crypto.encrypt(nomesDescricao.toString()));
      localStorage.setItem('multaReembolsoN', this.crypto.encrypt(nomesReembolso.toString()));
    };
  }

  filtraEmpresa(): any {
    this.txtButton = true;
    const nomesUnidade = this.unidadeForm.value;
    const nomesDepartamento = this.departoForm.value;
    const nomesVeiculo = this.veiculoForm.value;
    const nomesPlaca = this.placaForm.value;
    const nomesLegal = this.legalForm.value;
    const nomesTipos = this.tipoForm.value;
    const nomesGerencial = this.gerencialForm.value;
    const nomesCCusto = this.ccustoForm.value;
    const nomesSituacao = this.situacaoForm.value;
    const nomesOperacional = this.operacionalForm.value;
    const nomesReserva = this.reservaForm.value;
    const nomesLocal = this.localForm.value;
    const nomesLocacao = this.locacaoForm.value;
    const nomesRastreamento = this.rastreamentoForm.value;

    localStorage.setItem('unidadeN', this.crypto.encrypt(nomesUnidade.toString()));
    localStorage.setItem('departoN', this.crypto.encrypt(nomesDepartamento.toString()));
    localStorage.setItem('veiculoN', this.crypto.encrypt(nomesVeiculo.toString()));
    localStorage.setItem('placaN', this.crypto.encrypt(nomesPlaca.toString()));
    localStorage.setItem('legalN', this.crypto.encrypt(nomesLegal.toString()));
    localStorage.setItem('tipoN', this.crypto.encrypt(nomesTipos.toString()));
    localStorage.setItem('gerencialN', this.crypto.encrypt(nomesGerencial.toString()));
    localStorage.setItem('ccustoN', this.crypto.encrypt(nomesCCusto.toString()));
    localStorage.setItem('situacaoN', this.crypto.encrypt(nomesSituacao.toString()));
    localStorage.setItem('operacionalN', this.crypto.encrypt(nomesOperacional.toString()));
    localStorage.setItem('reservaN', this.crypto.encrypt(nomesReserva.toString()));
    localStorage.setItem('localN', this.crypto.encrypt(nomesLocal.toString()));
    localStorage.setItem('locacaoN', this.crypto.encrypt(nomesLocacao.toString()));
    localStorage.setItem('rastreamentoN', this.crypto.encrypt(nomesRastreamento.toString()));
    //filtro de infrações
    this.filtraInfracao();

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
      default:
        this.router.navigate(['/painel/home']);
        break;
    }

    this.onClose();
  }


  frotaIntegration(vehicle: any) {
    this.frotaService.registerVehicle(vehicle).subscribe((ret) => {
      let xmlDOM = (new DOMParser()).parseFromString(ret['result'], 'text/xml');
      let codApolice = xmlDOM.getElementsByTagName('CodApolice');
      this.frotaService.setVehicle(vehicle['plate'], codApolice[0].childNodes[0].nodeValue!);
    }, error => {
      console.error(error)
    })
  }

  frotaEnvio(): void {
    try {
      let vehicle: Vehicle;
      this.servicosService.getEnviaVeiculo(this.usuarioEmpresa).subscribe((sucesso: any) => {
        for (const placa of sucesso.result) {
          vehicle = {
            codTransmission: placa[0],
            marca: placa[1],
            modelo: placa[2],
            anoModelo: placa[3],
            combustivel: placa[4],
            plate: placa[5],
            name: placa[6],
            dataInicio: placa[7],
            dataFim: placa[8],
          }
          this.frotaIntegration(vehicle);
        }
      });

    } catch (error) {
      console.error(error);
    }

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
      default:
        this.router.navigate(['/painel/home']);
        break;
    }

    this.onClose();
  }


}
