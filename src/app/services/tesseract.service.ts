import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
//import { createWorker } from 'tesseract.js';


@Injectable({
  providedIn: 'root'
})
export class TesseractService {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  async reconhecerTexto(imagem: File | string): Promise<string> {
    return ''; 
  /*  const worker = await createWorker('por'); 
    const ret = await worker.recognize(imagem); // O Tesseract aceita o arquivo File nativamente
    await worker.terminate();
    return ret.data.text;*/
  }

  async extrairTextoDaImagem(arquivo: File): Promise<string> {
    return '';
    // Segurança para não quebrar o build ou renderização no Servidor (SSR)
   /* if (!isPlatformBrowser(this.platformId)) {
      return '';
    }

    try {
      // Importação dinâmica para compatibilidade perfeita com o Vite
      const { createWorker } = await import('tesseract.js');

      // Cria e configura o worker para Português
      const worker = await createWorker('por');

      // Executa o reconhecimento óptico de caracteres (OCR)
      const { data: { text } } = await worker.recognize(arquivo);

      // Finaliza o processo para liberar memória do navegador
      await worker.terminate();

      return text;
    } catch (erro) {
      console.error('Erro no serviço de OCR:', erro);
      throw new Error('Não foi possível processar a imagem.');
    }*/
  }


  /*async reconhecer(file: File, lang: string = 'por'): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async () => {
        try {
          const result = await Tesseract.recognize(reader.result as string, lang);
          resolve(result.data.text);
        } catch (err) {
          reject(err);
        }
      };
      reader.readAsDataURL(file);
    });
  }*/

}
