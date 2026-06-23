import { Component, ViewChild, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { PainelComponent } from '../painel/painel.component';
import { TesseractService } from '../../services/tesseract.service';
import { listaatendimento } from '../../types/digitalizar-response.type';
import { DetalhesDialogComponent } from '../../components/detalhes-dialog/detalhes-dialog.component';

@Component({
  selector: 'app-digitalizar-grid',
  imports: [PainelComponent, CommonModule, MatIconModule,
    MatTableModule, MatPaginatorModule, MatSortModule, MatInputModule],
  templateUrl: './digitalizar-grid.component.html',
  styleUrl: './digitalizar-grid.component.scss'
})

export class DigitalizarGridComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['atendimento', 'seqos', 'ordemexterna', 'placa', 'motivo', 'valor', 'dtaprovacao', 'dtfechamento', 'data'];
  dataSource = new MatTableDataSource<listaatendimento>([]);
  registroSelecionado: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private changeDetectorRef: ChangeDetectorRef,
    private tesseractService: TesseractService,
    private dialog: MatDialog,
    private router: Router) { }


  ngOnInit(): void {

  }

  async ngAfterViewInit() {
    await this.gridAtendimento();

    this.changeDetectorRef.detectChanges();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  gridAtendimento(): Promise<void> {
    return new Promise(resolve => {
      this.tesseractService.getDados().subscribe(dados => {
        let dataAtende: listaatendimento[] = [];
        for (const item of dados) {
          dataAtende.push({
            atendimento: item[0],
            seqos: item[1],
            ordemexterna: item[2],
            placa: item[3],
            motivo: item[4],
            valor: item[5],
            dtaprovacao: item[6],
            dtfechamento: item[7],
            data: item[8],
            codigomot: item[9]
          });
        }
        this.dataSource.data = dataAtende;
        resolve();  // sinaliza que terminou
      });
    });
  }

  selecionarRegistro(element: any) {
    this.registroSelecionado = element;
  }

  onSearch() {
    const focused = document.activeElement as HTMLElement;
    if (focused) focused.blur();

    const dialogRef = this.dialog.open(DetalhesDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.ngAfterViewInit();
      }
    });
  }

  onAtendimento() {
    this.router.navigate(["digitaTela"]);
  }

  onDigitalizar() {
    if (this.registroSelecionado) {
      const registro = {
        ordemexterna: this.registroSelecionado.ordemexterna,
        placa: this.registroSelecionado.placa,
        motivo: this.registroSelecionado.codigomot.toString()
      }
      this.tesseractService.setRegistro(registro);
    }
    this.router.navigate(["digitalizar"]);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
