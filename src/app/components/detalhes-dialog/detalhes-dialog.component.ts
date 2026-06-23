import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { format } from 'date-fns';

@Component({
  selector: 'app-detalhes-dialog',
  imports: [MatDialogModule, MatButtonModule, FormsModule, CommonModule,
    MatInputModule, MatDatepickerModule],
  templateUrl: './detalhes-dialog.component.html',
  styleUrl: './detalhes-dialog.component.scss'
})
export class DetalhesDialogComponent implements OnInit {
  dataInicial: Date | null = null;
  dataFinal: Date | null = null;

  constructor(private dialogRef: MatDialogRef<DetalhesDialogComponent>
  ) { }

  ngOnInit(): void {

    this.dataInicial = this.toDateFilter(localStorage.getItem("dataInicial"));
    this.dataFinal = this.toDateFilter(localStorage.getItem("dataFinal"));
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
    localStorage.setItem('dataInicial', format(this.dataInicial!, 'dd/MM/yyyy'));
    localStorage.setItem('dataFinal', format(this.dataFinal!, 'dd/MM/yyyy'));
    this.dialogRef.close(true);
  }


  toDateFilter(data: string | null): Date | null {
    if (data != 'vazio' && data != null) {
      let partes = data.split('/');
      const dia = Number(partes[0]);
      const mes = Number(partes[1]) - 1; // meses começam em 0
      const ano = Number(partes[2]);
      return new Date(ano, mes, dia);
    } else {
      return null;
    }
  }

  formatDate(event: Event) {
    const input = event.target as HTMLInputElement;
    let valor = input.value.replace(/\D/g, ''); // Remove caracteres não numéricos

    if (valor.length >= 2) {
      valor = valor.substring(0, 2) + '/' + valor.substring(2);
    }
    if (valor.length >= 5) {
      valor = valor.substring(0, 5) + '/' + valor.substring(5, 9);
    }
    input.value = valor;
  }


}
