import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import moment from 'moment';

const companies = ['TFLEET', 'ALELO', 'CSN', 'VALE', 'PETROPOLIS']
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  logging = false;
  number: number = 50;
  loginForm: any;

  constructor(private loginService: LoginService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar) {
    this.loginForm = this.fb.group({
      grupo: ['', Validators.required],
      usuario: ['', Validators.required],
      senha: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    let origin = this.route.snapshot.queryParams['origin'];
    if (origin === "central")
      this.loginExternal();
    this.loginForm.get('grupo')?.setValue("TFLEET");
  }


  codigousuarioFormControl = new FormControl('', [
    Validators.required
  ]);

  get grupoClasses() {  
    const valor = (this.loginForm.get('grupo')?.value ?? '').toUpperCase();
    return {
      contentInit: !valor || valor.length < 5,
      contentTfleet: valor === 'TFLEET',
      contentAlelo: valor === 'ALELO',
      contentVale: valor === 'VALE',
      contentNull: valor.length >= 5 && !['VALE', 'TFLEET', 'ALELO'].includes(valor)
    };
  }

  onLogin() {
    if (!this.loginForm.valid) {
      return;
    }
    if (companies.includes(this.loginForm.get('grupo')!.value.toUpperCase())) {
      this.logging = true;
      let dataInicial: Date = new Date();
      let dataFinal: Date = new Date();

      dataFinal.setMinutes(0);
      dataFinal.setHours(0);
      dataFinal.setSeconds(0);
      dataFinal.setMilliseconds(0);
      dataInicial.setDate(dataFinal.getDate() - 365);

      localStorage.setItem('dataInicial', moment(dataInicial).format('DD/MM/YYYY'));
      localStorage.setItem('dataFinal', moment(dataFinal).format('DD/MM/YYYY'));
      localStorage.setItem('opcao', 'os');
      localStorage.setItem('gerencial_db', this.loginForm.get('grupo')!.value);

      this.loginService.login(this.loginForm.get('usuario')!.value.toUpperCase(),
        this.loginForm.get('senha')!.value,
        this.loginForm.get('grupo')!.value.toUpperCase());
      this.logging = false;
      return;
    }
    this.snackBar.open('Grupo de Acesso Inválido', '', {
      duration: 3000,
      panelClass: 'error-snack-bar'
    })
    return;

  }


  onLoginDirection() {
    if (this.loginForm.valid) {
      return;
    }
    if (companies.includes(this.loginForm.get('grupo')!.value.toUpperCase())) {
      this.logging = true;
      let dataInicial: Date = new Date();
      let dataFinal: Date = new Date();

      dataFinal.setMinutes(0);
      dataFinal.setHours(0);
      dataFinal.setSeconds(0);
      dataFinal.setMilliseconds(0);
      dataInicial.setDate(dataFinal.getDate() - 365);

      localStorage.setItem('dataInicial', moment(dataInicial).format('DD/MM/YYYY'));
      localStorage.setItem('dataFinal', moment(dataFinal).format('DD/MM/YYYY'));
      localStorage.setItem('opcao', 'os');
      localStorage.setItem('gerencial_db', this.loginForm.get('grupo')!.value);

      this.loginService.loginDirect(this.codigousuarioFormControl.value!,
        this.loginForm.get('grupo')!.value);
      this.logging = false;
      return;
    }
    this.snackBar.open('Grupo de Acesso Inválido', '', {
      duration: 3000,
      panelClass: 'error-snack-bar'
    })
    return;

  }

  loginExternal() {
    let codigofun = this.route.snapshot.queryParamMap.get('codigofun');
    let grupoacesso = this.route.snapshot.queryParamMap.get('grupoacesso');

    this.codigousuarioFormControl.setValue(codigofun);
    this.loginForm.get('grupo')?.setValue(grupoacesso);
    this.onLoginDirection();
  }

}
