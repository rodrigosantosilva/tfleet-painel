import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule, FormGroup } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ToastrService } from 'ngx-toastr';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { debounceTime, switchMap, map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

import { PainelComponent } from '../painel/painel.component';
import { TesseractService } from '../../services/tesseract.service';
import { listaatendimento, listaMotivo } from '../../types/digitalizar-response.type';


@Component({
  selector: 'app-digitalizar-tela',
  imports: [PainelComponent, CommonModule, MatListModule, ReactiveFormsModule, MatCheckboxModule,
    MatFormFieldModule, FormsModule, MatInputModule, MatSelectModule, MatDatepickerModule,
    MatNativeDateModule],
  templateUrl: './digitalizar-tela.component.html',
  styleUrl: './digitalizar-tela.component.scss'
})
export class DigitalizarTelaComponent implements OnInit {
  form!: FormGroup;
  registro: any;
  dataMotivo: listaMotivo[] = [];
  dataformadada: string | null = '';
  entradaformadada: string | null = '';

  constructor(private tctService: TesseractService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router) { }

  async ngOnInit(): Promise<void> {
    this.form = this.fb.group({
      placa: ['', Validators.required],
      ordemexterna: ['', Validators.required, [this.validaOrdemAsync.bind(this)]],
      km: ['', Validators.required],
      condutor: [''],
      codmotivo: ['', Validators.required],
      servico: [''],
      realizados: ['', Validators.required],
      abertura: ['', Validators.required],
      entrada: ['']
    });

    await this.ListaMotivo();
  }

  ListaMotivo(): Promise<void> {
    return new Promise(resolve => {
      this.tctService.getMotivo().subscribe(dados => {
        for (const item of dados) {
          this.dataMotivo.push({
            codigomot: item[0].toString(),
            motivo: item[1]
          });
        }
        resolve();  // sinaliza que terminou
      });
    });
  }

  validaOrdemAsync(control: AbstractControl): Observable<ValidationErrors | null> {
    if (!control.value) {
      return of(null);
    }

    return of(control.value).pipe(
      debounceTime(500), // espera 500ms após digitação
      switchMap(value =>
        this.tctService.validaOrdem(value).pipe(
          map((res: any[]) => {
            return res[0] > 0 ? { ordemInvalida: true } : null;
          }),
          catchError(err => {
            return of({ ordemInvalida: false });
          })
        )
      )
    );
  }

  formatarData(formdata: any): string | null {
    if (!formdata) {
      return '';
    }
    const data = new Date(formdata);
    return data.toLocaleDateString('pt-BR'); // já retorna dd/MM/yyyy
  }

  async onSalvar() {
    this.dataformadada = this.formatarData(this.form.value.abertura);
    this.entradaformadada = this.formatarData(this.form.value.entrada);

    const result = await this.tctService.gravaAtendimento(
            this.form.value.ordemexterna.toUpperCase(),
            this.form.value.placa.toUpperCase(),
            this.form.value.km,
            this.form.value.condutor.toUpperCase(),     
            this.form.value.codmotivo.toUpperCase(),
            this.dataformadada,
            this.entradaformadada,
            this.form.value.servico.toUpperCase(),
            this.form.value.realizados.toUpperCase()
          );
    if (result) {
      this.tctService.mostrarMensagem("Registro inserido com Sucesso.");
      this.toastr.success("Registro inserido com Sucesso.");
    } else {
      this.toastr.error("Falha na inserção");
    }

    this.registro = {
      ordemexterna: this.form.value.ordemexterna.toUpperCase(),
      placa: this.form.value.placa.toUpperCase(),
      motivo: this.form.value.codmotivo
    }
    this.tctService.setRegistro(this.registro);
    this.router.navigate(["digitalizar"]);
  }

  oncancelar() {
    this.router.navigate(["digitaGrid"]);
  }

  formatDate(event: Event, field: string) {
    const input = event.target as HTMLInputElement;
    let valor = input.value.replace(/\D/g, ''); // Remove caracteres não numéricos

    if (valor.length >= 2) {
      valor = valor.substring(0, 2) + '/' + valor.substring(2);
    }
    if (valor.length >= 5) {
      valor = valor.substring(0, 5) + '/' + valor.substring(5, 9);
    }
    input.value = valor;
    if (valor.length == 10) {
      let partes = valor.split('/');
      const dateObject = new Date(Number(partes[2]), Number(partes[1]) - 1, Number(partes[0]));
      this.form.get(field)?.setValue(dateObject);
    }
  }

}
