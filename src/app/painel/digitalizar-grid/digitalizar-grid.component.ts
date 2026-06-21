import { Component, ViewChild, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { Router } from '@angular/router';

import { PainelComponent } from '../painel/painel.component';
import { TesseractService } from '../../services/tesseract.service';
import { listaatendimento } from '../../types/digitalizar-response.type';

@Component({
  selector: 'app-digitalizar-grid',
  imports: [PainelComponent, CommonModule, MatIconModule,
    MatTableModule, MatPaginatorModule, MatSortModule, MatInputModule],
  templateUrl: './digitalizar-grid.component.html',
  styleUrl: './digitalizar-grid.component.scss'
})

export class DigitalizarGridComponent implements OnInit  {
  displayedColumns: string[] = ['atendimento', 'seqos', 'ordemexterna', 'placa', 'motivo', 'valor', 'dtaprovacao', 'dtfechamento'];
  dataSource = new MatTableDataSource<listaatendimento>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private changeDetectorRef: ChangeDetectorRef,
    private tesseractService: TesseractService,
    private router: Router) { }


  ngOnInit(): void {
    this.tesseractService.getDados().subscribe(dados => {
      this.dataSource.data = dados;
      this.changeDetectorRef.detectChanges();
    });
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  atendimento() {
    this.router.navigate(["digitaTela"]);
  }

  digitalizar() {
    this.router.navigate(["digitalizar"]);
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
