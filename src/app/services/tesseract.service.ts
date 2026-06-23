import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, firstValueFrom } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

import { environment } from '../../environments/environment';
import { AESEncryptDecryptService } from '../services/aesencrypt-decrypt.service';
import { DigitalizarSQL } from '../sql/digitalizar-respository';
import { resultResponse, listaatendimento, listaMotivo } from '../types/digitalizar-response.type';

declare var Tesseract: any;

const BACKEND_URL = environment.apiUrl + '/insert';
const BACKEND_CONSULTA = environment.apiUrl + '/consulta';

@Injectable({
  providedIn: 'root'
})
export class TesseractService {

  database = localStorage.getItem('gerencial_db');
  registroSelecionado: any;

  constructor(private http: HttpClient,
    private snackBar: MatSnackBar,
    private digitoSQL: DigitalizarSQL,
    private crypto: AESEncryptDecryptService) { }

  getDados(): Observable<any> {
    const sql = this.digitoSQL.getAtendimentoSQL(this.crypto.decrypt(localStorage.getItem('empresa')!),
                                                 localStorage.getItem('dataInicial')!,
                                                 localStorage.getItem('dataFinal')!);
                                   
    return this.http.post<{ result: listaatendimento[] }>(BACKEND_CONSULTA + '/consulta', {
      sql,
      db: this.database
    })
      .pipe(map(response => response.result)); // Extraindo apenas a propriedade 'result
  }

  getMotivo(): Observable<any> {
    const sql = this.digitoSQL.getmotivoSQL();
    return this.http.post<{ result: listaMotivo[] }>(BACKEND_CONSULTA + '/consulta', {
      sql,
      db: this.database
    })
      .pipe(map(response => response.result)); // Extraindo apenas a propriedade 'result
  }

  setRegistro(element: any) {
    this.registroSelecionado = element;
  }

  getRegistro() {
    return this.registroSelecionado;
  }

  async reconhecerTexto(imagem: File | string): Promise<string> {
    const { data: { text } } = await Tesseract.recognize(imagem, 'por');
    return text;
  }

  async pegarTextoClipboard(): Promise<string> {
    try {
      const texto = await navigator.clipboard.readText();
      return texto;
    } catch (err) {
      console.error('Erro ao ler clipboard:', err);
      return '';
    }
  }

  async gravaManutencao(ordem: string, placa: string, motivo: string, data: string | null,
    tipo: string, item: string, informacao: string, valor: string | null): Promise<resultResponse | null> {

    const sql = this.digitoSQL.getinsertSQL(ordem, placa, motivo, data, tipo, item, informacao, valor);
    const resultado = await this.inserir(sql);
    
    return resultado;
  }

  async inserir(sql: string): Promise<resultResponse | null> {
    try {
      const response = await firstValueFrom(
        this.http.post<{ result: resultResponse }>(BACKEND_URL + '/insert', {
          sql,
          db: this.database
        })
      );
      return response.result;
    } catch (error) {
      console.error('Erro na requisição:', error);
      return null;
    }
  }

  mostrarMensagem(texto: string) {
    this.snackBar.open(texto, 'Fechar', {
      duration: 3000, // tempo em ms
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }

}
