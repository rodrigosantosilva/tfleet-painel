import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { PainelComponent } from '../painel/painel.component';
import { TesseractService } from '../../services/tesseract.service';
import { listaatendimento } from '../../types/digitalizar-response.type';

@Component({
  selector: 'app-digitalizar-tela',
  imports: [ PainelComponent ],
  templateUrl: './digitalizar-tela.component.html',
  styleUrl: './digitalizar-tela.component.scss'
})
export class DigitalizarTelaComponent {

  constructor(private tesseractService: TesseractService,
    private router: Router) { }  

  salvar() {
    this.router.navigate(["digitalizar"]);
  }

  cancelar() {
     this.router.navigate(["digitaGrid"]);   
  }

}
