import { Component, signal  } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PainelComponent } from '../painel/painel.component';
import { TesseractService } from '../../services/tesseract.service';

@Component({
  selector: 'app-digitalizar',
  imports: [PainelComponent, CommonModule],
  templateUrl: './digitalizar.component.html',
  styleUrl: './digitalizar.component.scss'
})
export class DigitalizarComponent  {

  textoExtraido = signal<string>('');
  carregando = signal<boolean>(false);
  imagemPreview = signal<string | null>(null);

  constructor(private tesseractService: TesseractService) { }


  async onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const arquivo = input.files[0];
    
    // Atualiza os estados para a tela do usuário
    this.carregando.set(true);
    this.textoExtraido.set('');
    this.imagemPreview.set(URL.createObjectURL(arquivo));

    try {
      // Chama o método centralizado no serviço
      const resultado = await this.tesseractService.reconhecerTexto(arquivo);
      //const resultado = await this.tesseractService.extrairTextoDaImagem(arquivo);
      this.textoExtraido.set(resultado);
    } catch (erro) {
      this.textoExtraido.set('Falha ao extrair texto da imagem.');
    } finally {
      this.carregando.set(false);
    }
  }


}
