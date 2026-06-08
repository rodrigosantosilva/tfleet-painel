import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { Resumo, Status } from '../types/home-response.type';
import { AtendimentoSQL } from '../sql/atendimento-repository';

const BACKEND_URL = environment.apiUrl + '/atendimento';

@Injectable({
  providedIn: 'root'
})
export class AtendimentoService {


  database = localStorage.getItem('gerencial_db');

  constructor(private http: HttpClient, private sqlList: AtendimentoSQL) { }

  generateResumo(dias: number, empresa: string, codigogger: string, contrato: string, legal: string, unidade: string, setor: string, tipo: string, veiculo: string, placa: string, gerencial: string,
    ccusto: string, local: string, situacao: string, sitopera: string, reserva: string, locacao: string, rastreamento: string): any {

    const sql = this.sqlList.resumoSQL(dias, empresa, codigogger, contrato, legal, unidade, setor, veiculo, tipo, placa,
      gerencial, ccusto, local, situacao, sitopera, reserva, locacao, rastreamento);
    return this.http.post<{ result: Resumo }>(BACKEND_URL + '/resumo', {
      sql, db: this.database
    }).pipe(map(response => response.result));
  }

  generateStatus(dias: number, empresa: string, codigogger: string, contrato: string, legal: string, unidade: string, setor: string, tipo: string, veiculo: string, placa: string, gerencial: string,
    ccusto: string, local: string, situacao: string, sitopera: string, reserva: string, locacao: string, rastreamento: string): any {

    const sql = this.sqlList.statusSQL(dias, empresa, codigogger, contrato, legal, unidade, setor, veiculo, tipo, placa,
      gerencial, ccusto, local, situacao, sitopera, reserva, locacao, rastreamento);
      
    return this.http.post<{ result: Status[] }>(BACKEND_URL + '/status', {
      sql, db: this.database
    }).pipe(map(response => response.result));
  }
}
