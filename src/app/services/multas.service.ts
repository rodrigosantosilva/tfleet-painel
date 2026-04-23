import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { AESEncryptDecryptService } from '../services/aesencrypt-decrypt.service';
import { MultasSQL} from '../sql/multas-repository';
import { Status} from '../types/servicos-response.type';

const BACKEND_URL = environment.apiUrl + '/consulta';

@Injectable({
  providedIn: 'root'
})
export class MultasService {

  database = localStorage.getItem('gerencial_db');

  constructor(private http: HttpClient,
              private sqlList: MultasSQL,          
              private crypto: AESEncryptDecryptService) {}

  getTipos(): any {
    const sql = this.sqlList.getTipoSQL(this.crypto.decrypt(localStorage.getItem('empresa')!) || null,
                                        localStorage.getItem('dataInicial')!,
                                        localStorage.getItem('dataFinal')!,
                                        this.crypto.decrypt(localStorage.getItem('gerencial')!),
                                  this.crypto.decrypt(localStorage.getItem('contrato')!),
                                  this.crypto.decrypt(localStorage.getItem('legalN')!),
                                  this.crypto.decrypt(localStorage.getItem('unidadeN')!),
                                  this.crypto.decrypt(localStorage.getItem('departoN')!),               
                                  this.crypto.decrypt(localStorage.getItem('tipoN')!),
                                  this.crypto.decrypt(localStorage.getItem('veiculoN')!),                                 
                                  this.crypto.decrypt(localStorage.getItem('placaN')!),                            
                                  this.crypto.decrypt(localStorage.getItem('gerencialN')!),
                                  this.crypto.decrypt(localStorage.getItem('ccustoN')!),
                                  this.crypto.decrypt(localStorage.getItem('localN')!),
                                  this.crypto.decrypt(localStorage.getItem('situacaoN')!),
                                  this.crypto.decrypt(localStorage.getItem('operacionalN')!),
                                  this.crypto.decrypt(localStorage.getItem('reservaN')!),
                                  this.crypto.decrypt(localStorage.getItem('locacaoN')!), 
                                  this.crypto.decrypt(localStorage.getItem('rastreamentoN')!), 
                                  this.crypto.decrypt(localStorage.getItem('multaTipoN')!), 
                                  this.crypto.decrypt(localStorage.getItem('multaGravidadeN')!), 
                                  this.crypto.decrypt(localStorage.getItem('multaDescricaoN')!), 
                                  this.crypto.decrypt(localStorage.getItem('multaReembolsoN')!)                         
                                        );                                      
    return this.http.post<{ result: any[] }>(BACKEND_URL + '/label', {sql, db: this.database});
  }


  getTipos2(): any {
    const sql = this.sqlList.getTipoSQL(this.crypto.decrypt(localStorage.getItem('empresa')!) || null,
                                        localStorage.getItem('dataInicial') !,
                                        localStorage.getItem('dataFinal')! ,
                                        this.crypto.decrypt(localStorage.getItem('gerencial')!),
                                  this.crypto.decrypt(localStorage.getItem('contrato')!),
                                  this.crypto.decrypt(localStorage.getItem('legalN')!),
                                  this.crypto.decrypt(localStorage.getItem('unidadeN')!),
                                  this.crypto.decrypt(localStorage.getItem('departoN')!),               
                                  this.crypto.decrypt(localStorage.getItem('tipoN')!),
                                  this.crypto.decrypt(localStorage.getItem('veiculoN')!),                                 
                                  this.crypto.decrypt(localStorage.getItem('placaN')!),                            
                                  this.crypto.decrypt(localStorage.getItem('gerencialN')!),
                                  this.crypto.decrypt(localStorage.getItem('ccustoN')!),
                                  this.crypto.decrypt(localStorage.getItem('localN')!),
                                  this.crypto.decrypt(localStorage.getItem('situacaoN')!),
                                  this.crypto.decrypt(localStorage.getItem('operacionalN')!),
                                  this.crypto.decrypt(localStorage.getItem('reservaN')!),
                                  this.crypto.decrypt(localStorage.getItem('locacaoN')!), 
                                  this.crypto.decrypt(localStorage.getItem('rastreamentoN')!), 
                                  this.crypto.decrypt(localStorage.getItem('multaTipoN')!), 
                                  this.crypto.decrypt(localStorage.getItem('multaGravidadeN')!), 
                                  this.crypto.decrypt(localStorage.getItem('multaDescricaoN')!), 
                                  this.crypto.decrypt(localStorage.getItem('multaReembolsoN')!)     
                                        );
    return this.http.post<{ result: any[] }>(BACKEND_URL + '/consulta', {sql, db: this.database});
  }

  getReembolso(): any {
    const sql = this.sqlList.getReembolsoSQL(this.crypto.decrypt(localStorage.getItem('empresa')!) || null,
                                        localStorage.getItem('dataInicial') !,
                                        localStorage.getItem('dataFinal')!,
                                        this.crypto.decrypt(localStorage.getItem('gerencial')!),
                                  this.crypto.decrypt(localStorage.getItem('contrato')!),
                                  this.crypto.decrypt(localStorage.getItem('legalN')!),
                                  this.crypto.decrypt(localStorage.getItem('unidadeN')!),
                                  this.crypto.decrypt(localStorage.getItem('departoN')!),               
                                  this.crypto.decrypt(localStorage.getItem('tipoN')!),
                                  this.crypto.decrypt(localStorage.getItem('veiculoN')!),                                 
                                  this.crypto.decrypt(localStorage.getItem('placaN')!),                            
                                  this.crypto.decrypt(localStorage.getItem('gerencialN')!),
                                  this.crypto.decrypt(localStorage.getItem('ccustoN')!),
                                  this.crypto.decrypt(localStorage.getItem('localN')!),
                                  this.crypto.decrypt(localStorage.getItem('situacaoN')!),
                                  this.crypto.decrypt(localStorage.getItem('operacionalN')!),
                                  this.crypto.decrypt(localStorage.getItem('reservaN')!),
                                  this.crypto.decrypt(localStorage.getItem('locacaoN')!), 
                                  this.crypto.decrypt(localStorage.getItem('rastreamentoN')!), 
                                  this.crypto.decrypt(localStorage.getItem('multaTipoN')!), 
                                  this.crypto.decrypt(localStorage.getItem('multaGravidadeN')!), 
                                  this.crypto.decrypt(localStorage.getItem('multaDescricaoN')!), 
                                  this.crypto.decrypt(localStorage.getItem('multaReembolsoN')!)    
                                        );
    return this.http.post<{ result: any[] }>(BACKEND_URL + '/consulta', {sql, db: this.database});
  }

  getTempoDia(): any {
    const sql = this.sqlList.getTempoDiaSQL(this.crypto.decrypt(localStorage.getItem('empresa')!) || null,
                                        localStorage.getItem('dataInicial') !,
                                        localStorage.getItem('dataFinal')! ,
                                        this.crypto.decrypt(localStorage.getItem('gerencial')!),
                                  this.crypto.decrypt(localStorage.getItem('contrato')!),
                                  this.crypto.decrypt(localStorage.getItem('legalN')!),
                                  this.crypto.decrypt(localStorage.getItem('unidadeN')!),
                                  this.crypto.decrypt(localStorage.getItem('departoN')!),               
                                  this.crypto.decrypt(localStorage.getItem('tipoN')!),
                                  this.crypto.decrypt(localStorage.getItem('veiculoN')!),                                 
                                  this.crypto.decrypt(localStorage.getItem('placaN')!),                            
                                  this.crypto.decrypt(localStorage.getItem('gerencialN')!),
                                  this.crypto.decrypt(localStorage.getItem('ccustoN')!),
                                  this.crypto.decrypt(localStorage.getItem('localN')!),
                                  this.crypto.decrypt(localStorage.getItem('situacaoN')!),
                                  this.crypto.decrypt(localStorage.getItem('operacionalN')!),
                                  this.crypto.decrypt(localStorage.getItem('reservaN')!),
                                  this.crypto.decrypt(localStorage.getItem('locacaoN')!), 
                                  this.crypto.decrypt(localStorage.getItem('rastreamentoN')!), 
                                  this.crypto.decrypt(localStorage.getItem('multaTipoN')!), 
                                  this.crypto.decrypt(localStorage.getItem('multaGravidadeN')!), 
                                  this.crypto.decrypt(localStorage.getItem('multaDescricaoN')!), 
                                  this.crypto.decrypt(localStorage.getItem('multaReembolsoN')!)    
                                        );
    return this.http.post<{ result: any[] }>(BACKEND_URL + '/consulta', {sql, db: this.database});
  }
 
  getTempoHora(): any {
    const sql = this.sqlList.getTempoHoraSQL(this.crypto.decrypt(localStorage.getItem('empresa')!) || null,
                                        localStorage.getItem('dataInicial') !,
                                        localStorage.getItem('dataFinal')! ,
                                        this.crypto.decrypt(localStorage.getItem('gerencial')!),
                                  this.crypto.decrypt(localStorage.getItem('contrato')!),
                                  this.crypto.decrypt(localStorage.getItem('legalN')!),
                                  this.crypto.decrypt(localStorage.getItem('unidadeN')!),
                                  this.crypto.decrypt(localStorage.getItem('departoN')!),               
                                  this.crypto.decrypt(localStorage.getItem('tipoN')!),
                                  this.crypto.decrypt(localStorage.getItem('veiculoN')!),                                 
                                  this.crypto.decrypt(localStorage.getItem('placaN')!),                            
                                  this.crypto.decrypt(localStorage.getItem('gerencialN')!),
                                  this.crypto.decrypt(localStorage.getItem('ccustoN')!),
                                  this.crypto.decrypt(localStorage.getItem('localN')!),
                                  this.crypto.decrypt(localStorage.getItem('situacaoN')!),
                                  this.crypto.decrypt(localStorage.getItem('operacionalN')!),
                                  this.crypto.decrypt(localStorage.getItem('reservaN')!),
                                  this.crypto.decrypt(localStorage.getItem('locacaoN')!), 
                                  this.crypto.decrypt(localStorage.getItem('rastreamentoN')!), 
                                  this.crypto.decrypt(localStorage.getItem('multaTipoN')!), 
                                  this.crypto.decrypt(localStorage.getItem('multaGravidadeN')!), 
                                  this.crypto.decrypt(localStorage.getItem('multaDescricaoN')!), 
                                  this.crypto.decrypt(localStorage.getItem('multaReembolsoN')!)    
                                        );
    return this.http.post<{ result: any[] }>(BACKEND_URL + '/consulta', {sql, db: this.database});
  }

  getResumoGravidade(dias: number): any {
    const sql = this.sqlList.getResumoGravidade(dias || 365, this.crypto.decrypt(localStorage.getItem('empresa')!) || null,
                                                      this.crypto.decrypt(localStorage.getItem('gerencial')!),
                                                      this.crypto.decrypt(localStorage.getItem('contrato')!),
                                                      this.crypto.decrypt(localStorage.getItem('legalN')!),
                                                      this.crypto.decrypt(localStorage.getItem('unidadeN')!),
                                                      this.crypto.decrypt(localStorage.getItem('departoN')!),               
                                                      this.crypto.decrypt(localStorage.getItem('tipoN')!),
                                                      this.crypto.decrypt(localStorage.getItem('veiculoN')!),                                 
                                                      this.crypto.decrypt(localStorage.getItem('placaN')!),                            
                                                      this.crypto.decrypt(localStorage.getItem('gerencialN')!),
                                                      this.crypto.decrypt(localStorage.getItem('ccustoN')!),
                                                      this.crypto.decrypt(localStorage.getItem('localN')!),
                                                      this.crypto.decrypt(localStorage.getItem('situacaoN')!),
                                                      this.crypto.decrypt(localStorage.getItem('operacionalN')!),
                                                      this.crypto.decrypt(localStorage.getItem('reservaN')!),
                                                      this.crypto.decrypt(localStorage.getItem('locacaoN')!), 
                                                      this.crypto.decrypt(localStorage.getItem('rastreamentoN')!), 
                                                      this.crypto.decrypt(localStorage.getItem('multaTipoN')!), 
                                                      this.crypto.decrypt(localStorage.getItem('multaGravidadeN')!), 
                                                      this.crypto.decrypt(localStorage.getItem('multaDescricaoN')!), 
                                                      this.crypto.decrypt(localStorage.getItem('multaReembolsoN')!)     );                                   
    return this.http.post<{ result: Status[] }>(BACKEND_URL + '/consulta', {sql, db: this.database});
  }

  getGravidade(): any {
    const sql = this.sqlList.getGravidadeSQL(this.crypto.decrypt(localStorage.getItem('empresa')!) || null,
                                              localStorage.getItem('dataInicial') !,
                                              localStorage.getItem('dataFinal')! ,
                                              this.crypto.decrypt(localStorage.getItem('gerencial')!),
                                  this.crypto.decrypt(localStorage.getItem('contrato')!),
                                  this.crypto.decrypt(localStorage.getItem('legalN')!),
                                  this.crypto.decrypt(localStorage.getItem('unidadeN')!),
                                  this.crypto.decrypt(localStorage.getItem('departoN')!),               
                                  this.crypto.decrypt(localStorage.getItem('tipoN')!),
                                  this.crypto.decrypt(localStorage.getItem('veiculoN')!),                                 
                                  this.crypto.decrypt(localStorage.getItem('placaN')!),                            
                                  this.crypto.decrypt(localStorage.getItem('gerencialN')!),
                                  this.crypto.decrypt(localStorage.getItem('ccustoN')!),
                                  this.crypto.decrypt(localStorage.getItem('localN')!),
                                  this.crypto.decrypt(localStorage.getItem('situacaoN')!),
                                  this.crypto.decrypt(localStorage.getItem('operacionalN')!),
                                  this.crypto.decrypt(localStorage.getItem('reservaN')!),
                                  this.crypto.decrypt(localStorage.getItem('locacaoN')!), 
                                  this.crypto.decrypt(localStorage.getItem('rastreamentoN')!), 
                                  this.crypto.decrypt(localStorage.getItem('multaTipoN')!), 
                                  this.crypto.decrypt(localStorage.getItem('multaGravidadeN')!), 
                                  this.crypto.decrypt(localStorage.getItem('multaDescricaoN')!), 
                                  this.crypto.decrypt(localStorage.getItem('multaReembolsoN')!)     );
    return this.http.post<{ result: any[] }>(BACKEND_URL + '/consulta', {sql, db: this.database});
  }

  getDescricao(): any {
    const sql = this.sqlList.getDescricaoSQL(this.crypto.decrypt(localStorage.getItem('empresa')!) || null,
                                              localStorage.getItem('dataInicial') !,
                                              localStorage.getItem('dataFinal')! ,
                                              this.crypto.decrypt(localStorage.getItem('gerencial')!),
                                  this.crypto.decrypt(localStorage.getItem('contrato')!),
                                  this.crypto.decrypt(localStorage.getItem('legalN')!),
                                  this.crypto.decrypt(localStorage.getItem('unidadeN')!),
                                  this.crypto.decrypt(localStorage.getItem('departoN')!),               
                                  this.crypto.decrypt(localStorage.getItem('tipoN')!),
                                  this.crypto.decrypt(localStorage.getItem('veiculoN')!),                                 
                                  this.crypto.decrypt(localStorage.getItem('placaN')!),                            
                                  this.crypto.decrypt(localStorage.getItem('gerencialN')!),
                                  this.crypto.decrypt(localStorage.getItem('ccustoN')!),
                                  this.crypto.decrypt(localStorage.getItem('localN')!),
                                  this.crypto.decrypt(localStorage.getItem('situacaoN')!),
                                  this.crypto.decrypt(localStorage.getItem('operacionalN')!),
                                  this.crypto.decrypt(localStorage.getItem('reservaN')!),
                                  this.crypto.decrypt(localStorage.getItem('locacaoN')!), 
                                  this.crypto.decrypt(localStorage.getItem('rastreamentoN')!), 
                                  this.crypto.decrypt(localStorage.getItem('multaTipoN')!), 
                                  this.crypto.decrypt(localStorage.getItem('multaGravidadeN')!), 
                                  this.crypto.decrypt(localStorage.getItem('multaDescricaoN')!), 
                                  this.crypto.decrypt(localStorage.getItem('multaReembolsoN')!)     );
    return this.http.post<{ result: any[] }>(BACKEND_URL + '/consulta', {sql, db: this.database});
  }

  getMensal(): any {
    const sql = this.sqlList.getMensalSQL(this.crypto.decrypt(localStorage.getItem('empresa')!) || null,
                                          localStorage.getItem('dataInicial') !,
                                          localStorage.getItem('dataFinal')! ,
                                          this.crypto.decrypt(localStorage.getItem('gerencial')!),
                                  this.crypto.decrypt(localStorage.getItem('contrato')!),
                                  this.crypto.decrypt(localStorage.getItem('legalN')!),
                                  this.crypto.decrypt(localStorage.getItem('unidadeN')!),
                                  this.crypto.decrypt(localStorage.getItem('departoN')!),               
                                  this.crypto.decrypt(localStorage.getItem('tipoN')!),
                                  this.crypto.decrypt(localStorage.getItem('veiculoN')!),                                 
                                  this.crypto.decrypt(localStorage.getItem('placaN')!),                            
                                  this.crypto.decrypt(localStorage.getItem('gerencialN')!),
                                  this.crypto.decrypt(localStorage.getItem('ccustoN')!),
                                  this.crypto.decrypt(localStorage.getItem('localN')!),
                                  this.crypto.decrypt(localStorage.getItem('situacaoN')!),
                                  this.crypto.decrypt(localStorage.getItem('operacionalN')!),
                                  this.crypto.decrypt(localStorage.getItem('reservaN')!),
                                  this.crypto.decrypt(localStorage.getItem('locacaoN')!), 
                                  this.crypto.decrypt(localStorage.getItem('rastreamentoN')!), 
                                  this.crypto.decrypt(localStorage.getItem('multaTipoN')!), 
                                  this.crypto.decrypt(localStorage.getItem('multaGravidadeN')!), 
                                  this.crypto.decrypt(localStorage.getItem('multaDescricaoN')!), 
                                  this.crypto.decrypt(localStorage.getItem('multaReembolsoN')!)     );
    return this.http.post<{ result: any[] }>(BACKEND_URL + '/consulta', {sql, db: this.database});
  }

  getMensalValor(): any {
    const sql = this.sqlList.getMensalValorSQL(this.crypto.decrypt(localStorage.getItem('empresa')!) || null,
                                          localStorage.getItem('dataInicial') !,
                                          localStorage.getItem('dataFinal')! ,
                                          this.crypto.decrypt(localStorage.getItem('gerencial')!),
                                  this.crypto.decrypt(localStorage.getItem('contrato')!),
                                  this.crypto.decrypt(localStorage.getItem('legalN')!),
                                  this.crypto.decrypt(localStorage.getItem('unidadeN')!),
                                  this.crypto.decrypt(localStorage.getItem('departoN')!),               
                                  this.crypto.decrypt(localStorage.getItem('tipoN')!),
                                  this.crypto.decrypt(localStorage.getItem('veiculoN')!),                                 
                                  this.crypto.decrypt(localStorage.getItem('placaN')!),                            
                                  this.crypto.decrypt(localStorage.getItem('gerencialN')!),
                                  this.crypto.decrypt(localStorage.getItem('ccustoN')!),
                                  this.crypto.decrypt(localStorage.getItem('localN')!),
                                  this.crypto.decrypt(localStorage.getItem('situacaoN')!),
                                  this.crypto.decrypt(localStorage.getItem('operacionalN')!),
                                  this.crypto.decrypt(localStorage.getItem('reservaN')!),
                                  this.crypto.decrypt(localStorage.getItem('locacaoN')!), 
                                  this.crypto.decrypt(localStorage.getItem('rastreamentoN')!), 
                                  this.crypto.decrypt(localStorage.getItem('multaTipoN')!), 
                                  this.crypto.decrypt(localStorage.getItem('multaGravidadeN')!), 
                                  this.crypto.decrypt(localStorage.getItem('multaDescricaoN')!), 
                                  this.crypto.decrypt(localStorage.getItem('multaReembolsoN')!)     );                                    
    return this.http.post<{ result: any[] }>(BACKEND_URL + '/consulta', {sql, db: this.database});
  }

  getTop10(): any {
    const sql = this.sqlList.getTop10(this.crypto.decrypt(localStorage.getItem('empresa')!) || null,
                                      localStorage.getItem('dataInicial') !,
                                      localStorage.getItem('dataFinal')! ,
                                      this.crypto.decrypt(localStorage.getItem('gerencial')!),
                                  this.crypto.decrypt(localStorage.getItem('contrato')!),
                                  this.crypto.decrypt(localStorage.getItem('legalN')!),
                                  this.crypto.decrypt(localStorage.getItem('unidadeN')!),
                                  this.crypto.decrypt(localStorage.getItem('departoN')!),               
                                  this.crypto.decrypt(localStorage.getItem('tipoN')!),
                                  this.crypto.decrypt(localStorage.getItem('veiculoN')!),                                 
                                  this.crypto.decrypt(localStorage.getItem('placaN')!),                            
                                  this.crypto.decrypt(localStorage.getItem('gerencialN')!),
                                  this.crypto.decrypt(localStorage.getItem('ccustoN')!),
                                  this.crypto.decrypt(localStorage.getItem('localN')!),
                                  this.crypto.decrypt(localStorage.getItem('situacaoN')!),
                                  this.crypto.decrypt(localStorage.getItem('operacionalN')!),
                                  this.crypto.decrypt(localStorage.getItem('reservaN')!),
                                  this.crypto.decrypt(localStorage.getItem('locacaoN')!), 
                                  this.crypto.decrypt(localStorage.getItem('rastreamentoN')!), 
                                  this.crypto.decrypt(localStorage.getItem('multaTipoN')!), 
                                  this.crypto.decrypt(localStorage.getItem('multaGravidadeN')!), 
                                  this.crypto.decrypt(localStorage.getItem('multaDescricaoN')!), 
                                  this.crypto.decrypt(localStorage.getItem('multaReembolsoN')!)    ); 
    return this.http.post<{ result: any[] }>(BACKEND_URL + '/consulta', {sql, db: this.database});
  }

  getQtde10(): any {
    const sql = this.sqlList.getQtde10SQL(this.crypto.decrypt(localStorage.getItem('empresa')!) || null,
                                      localStorage.getItem('dataInicial') !,
                                      localStorage.getItem('dataFinal')! ,
                                      this.crypto.decrypt(localStorage.getItem('gerencial')!),
                                  this.crypto.decrypt(localStorage.getItem('contrato')!),
                                  this.crypto.decrypt(localStorage.getItem('legalN')!),
                                  this.crypto.decrypt(localStorage.getItem('unidadeN')!),
                                  this.crypto.decrypt(localStorage.getItem('departoN')!),               
                                  this.crypto.decrypt(localStorage.getItem('tipoN')!),
                                  this.crypto.decrypt(localStorage.getItem('veiculoN')!),                                 
                                  this.crypto.decrypt(localStorage.getItem('placaN')!),                            
                                  this.crypto.decrypt(localStorage.getItem('gerencialN')!),
                                  this.crypto.decrypt(localStorage.getItem('ccustoN')!),
                                  this.crypto.decrypt(localStorage.getItem('localN')!),
                                  this.crypto.decrypt(localStorage.getItem('situacaoN')!),
                                  this.crypto.decrypt(localStorage.getItem('operacionalN')!),
                                  this.crypto.decrypt(localStorage.getItem('reservaN')!),
                                  this.crypto.decrypt(localStorage.getItem('locacaoN')!), 
                                  this.crypto.decrypt(localStorage.getItem('rastreamentoN')!), 
                                  this.crypto.decrypt(localStorage.getItem('multaTipoN')!), 
                                  this.crypto.decrypt(localStorage.getItem('multaGravidadeN')!), 
                                  this.crypto.decrypt(localStorage.getItem('multaDescricaoN')!), 
                                  this.crypto.decrypt(localStorage.getItem('multaReembolsoN')!)     );
    return this.http.post<{ result: any[] }>(BACKEND_URL + '/consulta', {sql, db: this.database});
  }

  getGravissimas(): any {
    const sql = this.sqlList.getGravissima(this.crypto.decrypt(localStorage.getItem('empresa')!) || null,
                                            localStorage.getItem('dataInicial') !,
                                            localStorage.getItem('dataFinal')! ,
                                            this.crypto.decrypt(localStorage.getItem('gerencial')!),
                                  this.crypto.decrypt(localStorage.getItem('contrato')!),
                                  this.crypto.decrypt(localStorage.getItem('legalN')!),
                                  this.crypto.decrypt(localStorage.getItem('unidadeN')!),
                                  this.crypto.decrypt(localStorage.getItem('departoN')!),               
                                  this.crypto.decrypt(localStorage.getItem('tipoN')!),
                                  this.crypto.decrypt(localStorage.getItem('veiculoN')!),                                 
                                  this.crypto.decrypt(localStorage.getItem('placaN')!),                            
                                  this.crypto.decrypt(localStorage.getItem('gerencialN')!),
                                  this.crypto.decrypt(localStorage.getItem('ccustoN')!),
                                  this.crypto.decrypt(localStorage.getItem('localN')!),
                                  this.crypto.decrypt(localStorage.getItem('situacaoN')!),
                                  this.crypto.decrypt(localStorage.getItem('operacionalN')!),
                                  this.crypto.decrypt(localStorage.getItem('reservaN')!),
                                  this.crypto.decrypt(localStorage.getItem('locacaoN')!), 
                                  this.crypto.decrypt(localStorage.getItem('rastreamentoN')!), 
                                  this.crypto.decrypt(localStorage.getItem('multaTipoN')!), 
                                  this.crypto.decrypt(localStorage.getItem('multaGravidadeN')!), 
                                  this.crypto.decrypt(localStorage.getItem('multaDescricaoN')!), 
                                  this.crypto.decrypt(localStorage.getItem('multaReembolsoN')!)     );
    return this.http.post<{ result: any[] }>(BACKEND_URL + '/consulta', {sql, db: this.database});
  }

  getEstados(): any {
    const sql = this.sqlList.getEstados(this.crypto.decrypt(localStorage.getItem('empresa')!) || null,
                                        localStorage.getItem('dataInicial') !,
                                        localStorage.getItem('dataFinal')! ,
                                        this.crypto.decrypt(localStorage.getItem('gerencial')!),
                                  this.crypto.decrypt(localStorage.getItem('contrato')!),
                                  this.crypto.decrypt(localStorage.getItem('legalN')!),
                                  this.crypto.decrypt(localStorage.getItem('unidadeN')!),
                                  this.crypto.decrypt(localStorage.getItem('departoN')!),               
                                  this.crypto.decrypt(localStorage.getItem('tipoN')!),
                                  this.crypto.decrypt(localStorage.getItem('veiculoN')!),                                 
                                  this.crypto.decrypt(localStorage.getItem('placaN')!),                            
                                  this.crypto.decrypt(localStorage.getItem('gerencialN')!),
                                  this.crypto.decrypt(localStorage.getItem('ccustoN')!),
                                  this.crypto.decrypt(localStorage.getItem('localN')!),
                                  this.crypto.decrypt(localStorage.getItem('situacaoN')!),
                                  this.crypto.decrypt(localStorage.getItem('operacionalN')!),
                                  this.crypto.decrypt(localStorage.getItem('reservaN')!),
                                  this.crypto.decrypt(localStorage.getItem('locacaoN')!), 
                                  this.crypto.decrypt(localStorage.getItem('rastreamentoN')!), 
                                  this.crypto.decrypt(localStorage.getItem('multaTipoN')!), 
                                  this.crypto.decrypt(localStorage.getItem('multaGravidadeN')!), 
                                  this.crypto.decrypt(localStorage.getItem('multaDescricaoN')!), 
                                  this.crypto.decrypt(localStorage.getItem('multaReembolsoN')!)     );
    return this.http.post<{ result: any[] }>(BACKEND_URL + '/consulta', {sql, db: this.database});
  }

  generatAll(): any {
    const sql = this.sqlList.allSQL(this.crypto.decrypt(localStorage.getItem('empresa')!) || null,
                                    localStorage.getItem('dataInicial') !,
                                    localStorage.getItem('dataFinal')! ,
                                    this.crypto.decrypt(localStorage.getItem('gerencial')!),
                                  this.crypto.decrypt(localStorage.getItem('contrato')!),
                                  this.crypto.decrypt(localStorage.getItem('legalN')!),
                                  this.crypto.decrypt(localStorage.getItem('unidadeN')!),
                                  this.crypto.decrypt(localStorage.getItem('departoN')!),               
                                  this.crypto.decrypt(localStorage.getItem('tipoN')!),
                                  this.crypto.decrypt(localStorage.getItem('veiculoN')!),                                 
                                  this.crypto.decrypt(localStorage.getItem('placaN')!),                            
                                  this.crypto.decrypt(localStorage.getItem('gerencialN')!),
                                  this.crypto.decrypt(localStorage.getItem('ccustoN')!),
                                  this.crypto.decrypt(localStorage.getItem('localN')!),
                                  this.crypto.decrypt(localStorage.getItem('situacaoN')!),
                                  this.crypto.decrypt(localStorage.getItem('operacionalN')!),
                                  this.crypto.decrypt(localStorage.getItem('reservaN')!),
                                  this.crypto.decrypt(localStorage.getItem('locacaoN')!), 
                                  this.crypto.decrypt(localStorage.getItem('rastreamentoN')!), 
                                  this.crypto.decrypt(localStorage.getItem('multaTipoN')!), 
                                  this.crypto.decrypt(localStorage.getItem('multaGravidadeN')!), 
                                  this.crypto.decrypt(localStorage.getItem('multaDescricaoN')!), 
                                  this.crypto.decrypt(localStorage.getItem('multaReembolsoN')!)     );
                                 
    return this.http.post<{ result: Status[] }>(BACKEND_URL + '/consulta',  {sql, db: this.database});
  }

  generateDeparto(): any {
    const sql = this.sqlList.getDepartoSQL(this.crypto.decrypt(localStorage.getItem('empresa')!) || null,
                                    localStorage.getItem('dataInicial') !,
                                    localStorage.getItem('dataFinal')! ,
                                    this.crypto.decrypt(localStorage.getItem('gerencial')!),
                                  this.crypto.decrypt(localStorage.getItem('contrato')!),
                                  this.crypto.decrypt(localStorage.getItem('legalN')!),
                                  this.crypto.decrypt(localStorage.getItem('unidadeN')!),
                                  this.crypto.decrypt(localStorage.getItem('departoN')!),               
                                  this.crypto.decrypt(localStorage.getItem('tipoN')!),
                                  this.crypto.decrypt(localStorage.getItem('veiculoN')!),                                 
                                  this.crypto.decrypt(localStorage.getItem('placaN')!),                            
                                  this.crypto.decrypt(localStorage.getItem('gerencialN')!),
                                  this.crypto.decrypt(localStorage.getItem('ccustoN')!),
                                  this.crypto.decrypt(localStorage.getItem('localN')!),
                                  this.crypto.decrypt(localStorage.getItem('situacaoN')!),
                                  this.crypto.decrypt(localStorage.getItem('operacionalN')!),
                                  this.crypto.decrypt(localStorage.getItem('reservaN')!),
                                  this.crypto.decrypt(localStorage.getItem('locacaoN')!), 
                                  this.crypto.decrypt(localStorage.getItem('rastreamentoN')!), 
                                  this.crypto.decrypt(localStorage.getItem('multaTipoN')!), 
                                  this.crypto.decrypt(localStorage.getItem('multaGravidadeN')!), 
                                  this.crypto.decrypt(localStorage.getItem('multaDescricaoN')!), 
                                  this.crypto.decrypt(localStorage.getItem('multaReembolsoN')!)     );                           
    return this.http.post<{ result: Status[] }>(BACKEND_URL + '/consulta',  {sql, db: this.database});
  }

  generateUnidade(): any {
    const sql = this.sqlList.getUnidadeSQL(this.crypto.decrypt(localStorage.getItem('empresa')!) || null,
                                    localStorage.getItem('dataInicial') !,
                                    localStorage.getItem('dataFinal')! ,
                                    this.crypto.decrypt(localStorage.getItem('gerencial')!),
                                  this.crypto.decrypt(localStorage.getItem('contrato')!),
                                  this.crypto.decrypt(localStorage.getItem('legalN')!),
                                  this.crypto.decrypt(localStorage.getItem('unidadeN')!),
                                  this.crypto.decrypt(localStorage.getItem('departoN')!),               
                                  this.crypto.decrypt(localStorage.getItem('tipoN')!),
                                  this.crypto.decrypt(localStorage.getItem('veiculoN')!),                                 
                                  this.crypto.decrypt(localStorage.getItem('placaN')!),                            
                                  this.crypto.decrypt(localStorage.getItem('gerencialN')!),
                                  this.crypto.decrypt(localStorage.getItem('ccustoN')!),
                                  this.crypto.decrypt(localStorage.getItem('localN')!),
                                  this.crypto.decrypt(localStorage.getItem('situacaoN')!),
                                  this.crypto.decrypt(localStorage.getItem('operacionalN')!),
                                  this.crypto.decrypt(localStorage.getItem('reservaN')!),
                                  this.crypto.decrypt(localStorage.getItem('locacaoN')!), 
                                  this.crypto.decrypt(localStorage.getItem('rastreamentoN')!), 
                                  this.crypto.decrypt(localStorage.getItem('multaTipoN')!), 
                                  this.crypto.decrypt(localStorage.getItem('multaGravidadeN')!), 
                                  this.crypto.decrypt(localStorage.getItem('multaDescricaoN')!), 
                                  this.crypto.decrypt(localStorage.getItem('multaReembolsoN')!)     );                               
    return this.http.post<{ result: Status[] }>(BACKEND_URL + '/consulta',  {sql, db: this.database});
  }
  
  generateEmpresa(): any {
    const sql = this.sqlList.getEmpresaSQL(this.crypto.decrypt(localStorage.getItem('empresa')!) || null,
                                    localStorage.getItem('dataInicial') !,
                                    localStorage.getItem('dataFinal')! ,
                                    this.crypto.decrypt(localStorage.getItem('gerencial')!),
                                  this.crypto.decrypt(localStorage.getItem('contrato')!),
                                  this.crypto.decrypt(localStorage.getItem('legalN')!),
                                  this.crypto.decrypt(localStorage.getItem('unidadeN')!),
                                  this.crypto.decrypt(localStorage.getItem('departoN')!),               
                                  this.crypto.decrypt(localStorage.getItem('tipoN')!),
                                  this.crypto.decrypt(localStorage.getItem('veiculoN')!),                                 
                                  this.crypto.decrypt(localStorage.getItem('placaN')!),                            
                                  this.crypto.decrypt(localStorage.getItem('gerencialN')!),
                                  this.crypto.decrypt(localStorage.getItem('ccustoN')!),
                                  this.crypto.decrypt(localStorage.getItem('localN')!),
                                  this.crypto.decrypt(localStorage.getItem('situacaoN')!),
                                  this.crypto.decrypt(localStorage.getItem('operacionalN')!),
                                  this.crypto.decrypt(localStorage.getItem('reservaN')!),
                                  this.crypto.decrypt(localStorage.getItem('locacaoN')!), 
                                  this.crypto.decrypt(localStorage.getItem('rastreamentoN')!), 
                                  this.crypto.decrypt(localStorage.getItem('multaTipoN')!), 
                                  this.crypto.decrypt(localStorage.getItem('multaGravidadeN')!), 
                                  this.crypto.decrypt(localStorage.getItem('multaDescricaoN')!), 
                                  this.crypto.decrypt(localStorage.getItem('multaReembolsoN')!)     );                                 
    return this.http.post<{ result: Status[] }>(BACKEND_URL + '/consulta',  {sql, db: this.database});
  }

  getLabels(): any {
    const sql = this.sqlList.labelsSQL();
    return this.http.post<{ result: string[] }>(BACKEND_URL + '/consulta',  {sql, db: this.database});
  }

  getMultasValores(): any {
    const sql = this.sqlList.getValorTipoSQL(this.crypto.decrypt(localStorage.getItem('empresa')!) || null,
                                      localStorage.getItem('dataInicial') !,
                                      localStorage.getItem('dataFinal')! ,
                                      this.crypto.decrypt(localStorage.getItem('gerencial')!),
                                      this.crypto.decrypt(localStorage.getItem('contrato')!),
                                      this.crypto.decrypt(localStorage.getItem('legalN')!),
                                      this.crypto.decrypt(localStorage.getItem('unidadeN')!),
                                      this.crypto.decrypt(localStorage.getItem('departoN')!),               
                                      this.crypto.decrypt(localStorage.getItem('tipoN')!),
                                      this.crypto.decrypt(localStorage.getItem('veiculoN')!),                                 
                                      this.crypto.decrypt(localStorage.getItem('placaN')!),                            
                                      this.crypto.decrypt(localStorage.getItem('gerencialN')!),
                                      this.crypto.decrypt(localStorage.getItem('ccustoN')!),
                                      this.crypto.decrypt(localStorage.getItem('localN')!),
                                      this.crypto.decrypt(localStorage.getItem('situacaoN')!),
                                      this.crypto.decrypt(localStorage.getItem('operacionalN')!),
                                      this.crypto.decrypt(localStorage.getItem('reservaN')!),
                                      this.crypto.decrypt(localStorage.getItem('locacaoN')!), 
                                      this.crypto.decrypt(localStorage.getItem('rastreamentoN')!), 
                                      this.crypto.decrypt(localStorage.getItem('multaTipoN')!), 
                                      this.crypto.decrypt(localStorage.getItem('multaGravidadeN')!), 
                                      this.crypto.decrypt(localStorage.getItem('multaDescricaoN')!), 
                                      this.crypto.decrypt(localStorage.getItem('multaReembolsoN')!)     );
    return this.http.post<{ result: any[] }>(BACKEND_URL + '/consulta', { sql, db: this.database});
  }

  getFilterTipo(): any {
    const sql = this.sqlList.filterTipoSQL(this.crypto.decrypt(localStorage.getItem('empresa')!) || null,
                                      localStorage.getItem('dataInicial') !,
                                      localStorage.getItem('dataFinal')! ,
                                      this.crypto.decrypt(localStorage.getItem('gerencial')!),
                                      this.crypto.decrypt(localStorage.getItem('contrato')!),
                                      this.crypto.decrypt(localStorage.getItem('legalN')!),
                                      this.crypto.decrypt(localStorage.getItem('unidadeN')!),
                                      this.crypto.decrypt(localStorage.getItem('departoN')!),               
                                      this.crypto.decrypt(localStorage.getItem('tipoN')!),
                                      this.crypto.decrypt(localStorage.getItem('veiculoN')!),                                 
                                      this.crypto.decrypt(localStorage.getItem('placaN')!),                            
                                      this.crypto.decrypt(localStorage.getItem('gerencialN')!),
                                      this.crypto.decrypt(localStorage.getItem('ccustoN')!),
                                      this.crypto.decrypt(localStorage.getItem('localN')!),
                                      this.crypto.decrypt(localStorage.getItem('situacaoN')!),
                                      this.crypto.decrypt(localStorage.getItem('operacionalN')!),
                                      this.crypto.decrypt(localStorage.getItem('reservaN')!),
                                      this.crypto.decrypt(localStorage.getItem('locacaoN')!), 
                                      this.crypto.decrypt(localStorage.getItem('rastreamentoN')!), 
                                      this.crypto.decrypt(localStorage.getItem('multaTipoN')!), 
                                      this.crypto.decrypt(localStorage.getItem('multaGravidadeN')!), 
                                      this.crypto.decrypt(localStorage.getItem('multaDescricaoN')!), 
                                      this.crypto.decrypt(localStorage.getItem('multaReembolsoN')!)     );                                
    return this.http.post<{ result: any[] }>(BACKEND_URL + '/consulta', { sql, db: this.database});
  }
  getFilterGravidade(): any {
    const sql = this.sqlList.filterGravidadeSQL(this.crypto.decrypt(localStorage.getItem('empresa')!) || null,
                                      localStorage.getItem('dataInicial') !,
                                      localStorage.getItem('dataFinal')! ,
                                      this.crypto.decrypt(localStorage.getItem('gerencial')!),
                                      this.crypto.decrypt(localStorage.getItem('contrato')!),
                                      this.crypto.decrypt(localStorage.getItem('legalN')!),
                                      this.crypto.decrypt(localStorage.getItem('unidadeN')!),
                                      this.crypto.decrypt(localStorage.getItem('departoN')!),               
                                      this.crypto.decrypt(localStorage.getItem('tipoN')!),
                                      this.crypto.decrypt(localStorage.getItem('veiculoN')!),                                 
                                      this.crypto.decrypt(localStorage.getItem('placaN')!),                            
                                      this.crypto.decrypt(localStorage.getItem('gerencialN')!),
                                      this.crypto.decrypt(localStorage.getItem('ccustoN')!),
                                      this.crypto.decrypt(localStorage.getItem('localN')!),
                                      this.crypto.decrypt(localStorage.getItem('situacaoN')!),
                                      this.crypto.decrypt(localStorage.getItem('operacionalN')!),
                                      this.crypto.decrypt(localStorage.getItem('reservaN')!),
                                      this.crypto.decrypt(localStorage.getItem('locacaoN')!), 
                                      this.crypto.decrypt(localStorage.getItem('rastreamentoN')!), 
                                      this.crypto.decrypt(localStorage.getItem('multaTipoN')!), 
                                      this.crypto.decrypt(localStorage.getItem('multaGravidadeN')!), 
                                      this.crypto.decrypt(localStorage.getItem('multaDescricaoN')!), 
                                      this.crypto.decrypt(localStorage.getItem('multaReembolsoN')!)     );
    return this.http.post<{ result: any[] }>(BACKEND_URL + '/consulta', { sql, db: this.database});
  }
  getFilterDescricao(): any {
    const sql = this.sqlList.filterDescricaoSQL(this.crypto.decrypt(localStorage.getItem('empresa')!) || null,
                                      localStorage.getItem('dataInicial') !,
                                      localStorage.getItem('dataFinal')! ,
                                      this.crypto.decrypt(localStorage.getItem('gerencial')!),
                                      this.crypto.decrypt(localStorage.getItem('contrato')!),
                                      this.crypto.decrypt(localStorage.getItem('legalN')!),
                                      this.crypto.decrypt(localStorage.getItem('unidadeN')!),
                                      this.crypto.decrypt(localStorage.getItem('departoN')!),               
                                      this.crypto.decrypt(localStorage.getItem('tipoN')!),
                                      this.crypto.decrypt(localStorage.getItem('veiculoN')!),                                 
                                      this.crypto.decrypt(localStorage.getItem('placaN')!),                            
                                      this.crypto.decrypt(localStorage.getItem('gerencialN')!),
                                      this.crypto.decrypt(localStorage.getItem('ccustoN')!),
                                      this.crypto.decrypt(localStorage.getItem('localN')!),
                                      this.crypto.decrypt(localStorage.getItem('situacaoN')!),
                                      this.crypto.decrypt(localStorage.getItem('operacionalN')!),
                                      this.crypto.decrypt(localStorage.getItem('reservaN')!),
                                      this.crypto.decrypt(localStorage.getItem('locacaoN')!), 
                                      this.crypto.decrypt(localStorage.getItem('rastreamentoN')!), 
                                      this.crypto.decrypt(localStorage.getItem('multaTipoN')!), 
                                      this.crypto.decrypt(localStorage.getItem('multaGravidadeN')!), 
                                      this.crypto.decrypt(localStorage.getItem('multaDescricaoN')!), 
                                      this.crypto.decrypt(localStorage.getItem('multaReembolsoN')!)     );
    return this.http.post<{ result: any[] }>(BACKEND_URL + '/consulta', { sql, db: this.database});
  }
  getFilterReembolso(): any {
    const sql = this.sqlList.filterReembolsoSQL(this.crypto.decrypt(localStorage.getItem('empresa')!) || null,
                                      localStorage.getItem('dataInicial') !,
                                      localStorage.getItem('dataFinal')! ,
                                      this.crypto.decrypt(localStorage.getItem('gerencial')!),
                                      this.crypto.decrypt(localStorage.getItem('contrato')!),
                                      this.crypto.decrypt(localStorage.getItem('legalN')!),
                                      this.crypto.decrypt(localStorage.getItem('unidadeN')!),
                                      this.crypto.decrypt(localStorage.getItem('departoN')!),               
                                      this.crypto.decrypt(localStorage.getItem('tipoN')!),
                                      this.crypto.decrypt(localStorage.getItem('veiculoN')!),                                 
                                      this.crypto.decrypt(localStorage.getItem('placaN')!),                            
                                      this.crypto.decrypt(localStorage.getItem('gerencialN')!),
                                      this.crypto.decrypt(localStorage.getItem('ccustoN')!),
                                      this.crypto.decrypt(localStorage.getItem('localN')!),
                                      this.crypto.decrypt(localStorage.getItem('situacaoN')!),
                                      this.crypto.decrypt(localStorage.getItem('operacionalN')!),
                                      this.crypto.decrypt(localStorage.getItem('reservaN')!),
                                      this.crypto.decrypt(localStorage.getItem('locacaoN')!), 
                                      this.crypto.decrypt(localStorage.getItem('rastreamentoN')!), 
                                      this.crypto.decrypt(localStorage.getItem('multaTipoN')!), 
                                      this.crypto.decrypt(localStorage.getItem('multaGravidadeN')!), 
                                      this.crypto.decrypt(localStorage.getItem('multaDescricaoN')!), 
                                      this.crypto.decrypt(localStorage.getItem('multaReembolsoN')!)     );
    return this.http.post<{ result: any[] }>(BACKEND_URL + '/consulta', { sql, db: this.database});
  }

  getTop10PlacasValores(): any {
    const sql = this.sqlList.getTop10PlacaValorSQL(this.crypto.decrypt(localStorage.getItem('empresa')!) || null,
                                      localStorage.getItem('dataInicial') !,
                                      localStorage.getItem('dataFinal')! ,
                                      this.crypto.decrypt(localStorage.getItem('gerencial')!),
                                  this.crypto.decrypt(localStorage.getItem('contrato')!),
                                  this.crypto.decrypt(localStorage.getItem('legalN')!),
                                  this.crypto.decrypt(localStorage.getItem('unidadeN')!),
                                  this.crypto.decrypt(localStorage.getItem('departoN')!),               
                                  this.crypto.decrypt(localStorage.getItem('tipoN')!),
                                  this.crypto.decrypt(localStorage.getItem('veiculoN')!),                                 
                                  this.crypto.decrypt(localStorage.getItem('placaN')!),                            
                                  this.crypto.decrypt(localStorage.getItem('gerencialN')!),
                                  this.crypto.decrypt(localStorage.getItem('ccustoN')!),
                                  this.crypto.decrypt(localStorage.getItem('localN')!),
                                  this.crypto.decrypt(localStorage.getItem('situacaoN')!),
                                  this.crypto.decrypt(localStorage.getItem('operacionalN')!),
                                  this.crypto.decrypt(localStorage.getItem('reservaN')!),
                                  this.crypto.decrypt(localStorage.getItem('locacaoN')!), 
                                  this.crypto.decrypt(localStorage.getItem('rastreamentoN')!), 
                                  this.crypto.decrypt(localStorage.getItem('multaTipoN')!), 
                                  this.crypto.decrypt(localStorage.getItem('multaGravidadeN')!), 
                                  this.crypto.decrypt(localStorage.getItem('multaDescricaoN')!), 
                                  this.crypto.decrypt(localStorage.getItem('multaReembolsoN')!)    );
                             
    return this.http.post<{ result: any[] }>(BACKEND_URL + '/consulta', { sql, db: this.database });
  }

  getTop10ClassificacaoValores(): any {
    const sql = this.sqlList.getTop10ClassificacaoValorSQL(this.crypto.decrypt(localStorage.getItem('empresa')!) || null,
                                      localStorage.getItem('dataInicial') !,
                                      localStorage.getItem('dataFinal')! ,
                                      this.crypto.decrypt(localStorage.getItem('gerencial')!),
                                  this.crypto.decrypt(localStorage.getItem('contrato')!),
                                  this.crypto.decrypt(localStorage.getItem('legalN')!),
                                  this.crypto.decrypt(localStorage.getItem('unidadeN')!),
                                  this.crypto.decrypt(localStorage.getItem('departoN')!),               
                                  this.crypto.decrypt(localStorage.getItem('tipoN')!),
                                  this.crypto.decrypt(localStorage.getItem('veiculoN')!),                                 
                                  this.crypto.decrypt(localStorage.getItem('placaN')!),                            
                                  this.crypto.decrypt(localStorage.getItem('gerencialN')!),
                                  this.crypto.decrypt(localStorage.getItem('ccustoN')!),
                                  this.crypto.decrypt(localStorage.getItem('localN')!),
                                  this.crypto.decrypt(localStorage.getItem('situacaoN')!),
                                  this.crypto.decrypt(localStorage.getItem('operacionalN')!),
                                  this.crypto.decrypt(localStorage.getItem('reservaN')!),
                                  this.crypto.decrypt(localStorage.getItem('locacaoN')!), 
                                  this.crypto.decrypt(localStorage.getItem('rastreamentoN')!), 
                                  this.crypto.decrypt(localStorage.getItem('multaTipoN')!), 
                                  this.crypto.decrypt(localStorage.getItem('multaGravidadeN')!), 
                                  this.crypto.decrypt(localStorage.getItem('multaDescricaoN')!), 
                                  this.crypto.decrypt(localStorage.getItem('multaReembolsoN')!)    );
                            
    return this.http.post<{ result: any[] }>(BACKEND_URL + '/consulta', { sql, db: this.database });
  }

  getTiposR(): any {
    const sql = this.sqlList.getTiposRSQL(this.crypto.decrypt(localStorage.getItem('empresa')!) || null,
                                        localStorage.getItem('dataInicial') !,
                                        localStorage.getItem('dataFinal')! ,
                                        localStorage.getItem('modulo') || 'vazio',
                                        this.crypto.decrypt(localStorage.getItem('gerencial')!),
                                  this.crypto.decrypt(localStorage.getItem('contrato')!),
                                  this.crypto.decrypt(localStorage.getItem('legalN')!),
                                  this.crypto.decrypt(localStorage.getItem('unidadeN')!),
                                  this.crypto.decrypt(localStorage.getItem('departoN')!),               
                                  this.crypto.decrypt(localStorage.getItem('tipoN')!),
                                  this.crypto.decrypt(localStorage.getItem('veiculoN')!),                                 
                                  this.crypto.decrypt(localStorage.getItem('placaN')!),                            
                                  this.crypto.decrypt(localStorage.getItem('gerencialN')!),
                                  this.crypto.decrypt(localStorage.getItem('ccustoN')!),
                                  this.crypto.decrypt(localStorage.getItem('localN')!),
                                  this.crypto.decrypt(localStorage.getItem('situacaoN')!),
                                  this.crypto.decrypt(localStorage.getItem('operacionalN')!),
                                  this.crypto.decrypt(localStorage.getItem('reservaN')!),
                                  this.crypto.decrypt(localStorage.getItem('locacaoN')!), 
                                  this.crypto.decrypt(localStorage.getItem('rastreamentoN')!) );  
                            
    return this.http.post<{ result: any[] }>(BACKEND_URL + '/label', {sql, db: this.database});
  }
 
  gettop10parado(): any {
    const sql = this.sqlList.gettop10paradoSQL(this.crypto.decrypt(localStorage.getItem('empresa')!) || null,
                                        localStorage.getItem('dataInicial') !,
                                        localStorage.getItem('dataFinal')! ,
                                        localStorage.getItem('modulo') || 'vazio',
                                        this.crypto.decrypt(localStorage.getItem('gerencial')!),
                                  this.crypto.decrypt(localStorage.getItem('contrato')!),
                                  this.crypto.decrypt(localStorage.getItem('legalN')!),
                                  this.crypto.decrypt(localStorage.getItem('unidadeN')!),
                                  this.crypto.decrypt(localStorage.getItem('departoN')!),               
                                  this.crypto.decrypt(localStorage.getItem('tipoN')!),
                                  this.crypto.decrypt(localStorage.getItem('veiculoN')!),                                 
                                  this.crypto.decrypt(localStorage.getItem('placaN')!),                            
                                  this.crypto.decrypt(localStorage.getItem('gerencialN')!),
                                  this.crypto.decrypt(localStorage.getItem('ccustoN')!),
                                  this.crypto.decrypt(localStorage.getItem('localN')!),
                                  this.crypto.decrypt(localStorage.getItem('situacaoN')!),
                                  this.crypto.decrypt(localStorage.getItem('operacionalN')!),
                                  this.crypto.decrypt(localStorage.getItem('reservaN')!),
                                  this.crypto.decrypt(localStorage.getItem('locacaoN')!), 
                                  this.crypto.decrypt(localStorage.getItem('rastreamentoN')!) );  
                         
    return this.http.post<{ result: any[] }>(BACKEND_URL + '/consulta', {sql, db: this.database});
  } 

  gettop10excesso(): any {
    const sql = this.sqlList.gettop10excessoSQL(this.crypto.decrypt(localStorage.getItem('empresa')!) || null,
                                        localStorage.getItem('dataInicial') !,
                                        localStorage.getItem('dataFinal')! ,
                                        localStorage.getItem('modulo') || 'vazio',
                                        this.crypto.decrypt(localStorage.getItem('gerencial')!),
                                  this.crypto.decrypt(localStorage.getItem('contrato')!),
                                  this.crypto.decrypt(localStorage.getItem('legalN')!),
                                  this.crypto.decrypt(localStorage.getItem('unidadeN')!),
                                  this.crypto.decrypt(localStorage.getItem('departoN')!),               
                                  this.crypto.decrypt(localStorage.getItem('tipoN')!),
                                  this.crypto.decrypt(localStorage.getItem('veiculoN')!),                                 
                                  this.crypto.decrypt(localStorage.getItem('placaN')!),                            
                                  this.crypto.decrypt(localStorage.getItem('gerencialN')!),
                                  this.crypto.decrypt(localStorage.getItem('ccustoN')!),
                                  this.crypto.decrypt(localStorage.getItem('localN')!),
                                  this.crypto.decrypt(localStorage.getItem('situacaoN')!),
                                  this.crypto.decrypt(localStorage.getItem('operacionalN')!),
                                  this.crypto.decrypt(localStorage.getItem('reservaN')!),
                                  this.crypto.decrypt(localStorage.getItem('locacaoN')!), 
                                  this.crypto.decrypt(localStorage.getItem('rastreamentoN')!)  );  
                                  
    return this.http.post<{ result: any[] }>(BACKEND_URL + '/consulta', {sql, db: this.database});
  }  
  
  gettop10freadas(): any {
    const sql = this.sqlList.gettop10freadasSQL(this.crypto.decrypt(localStorage.getItem('empresa')!) || null,
                                        localStorage.getItem('dataInicial') !,
                                        localStorage.getItem('dataFinal')! ,
                                        localStorage.getItem('modulo') || 'vazio',
                                        this.crypto.decrypt(localStorage.getItem('gerencial')!),
                                  this.crypto.decrypt(localStorage.getItem('contrato')!),
                                  this.crypto.decrypt(localStorage.getItem('legalN')!),
                                  this.crypto.decrypt(localStorage.getItem('unidadeN')!),
                                  this.crypto.decrypt(localStorage.getItem('departoN')!),               
                                  this.crypto.decrypt(localStorage.getItem('tipoN')!),
                                  this.crypto.decrypt(localStorage.getItem('veiculoN')!),                                 
                                  this.crypto.decrypt(localStorage.getItem('placaN')!),                            
                                  this.crypto.decrypt(localStorage.getItem('gerencialN')!),
                                  this.crypto.decrypt(localStorage.getItem('ccustoN')!),
                                  this.crypto.decrypt(localStorage.getItem('localN')!),
                                  this.crypto.decrypt(localStorage.getItem('situacaoN')!),
                                  this.crypto.decrypt(localStorage.getItem('operacionalN')!),
                                  this.crypto.decrypt(localStorage.getItem('reservaN')!),
                                  this.crypto.decrypt(localStorage.getItem('locacaoN')!), 
                                  this.crypto.decrypt(localStorage.getItem('rastreamentoN')!) );  
                                  
    return this.http.post<{ result: any[] }>(BACKEND_URL + '/consulta', {sql, db: this.database});
  }  
  gettop10notificacao(): any {
    const sql = this.sqlList.gettop10notificaSQL(this.crypto.decrypt(localStorage.getItem('empresa')!) || null,
                                        localStorage.getItem('dataInicial') !,
                                        localStorage.getItem('dataFinal')! ,
                                        localStorage.getItem('modulo') || 'vazio',
                                        this.crypto.decrypt(localStorage.getItem('gerencial')!),
                                  this.crypto.decrypt(localStorage.getItem('contrato')!),
                                  this.crypto.decrypt(localStorage.getItem('legalN')!),
                                  this.crypto.decrypt(localStorage.getItem('unidadeN')!),
                                  this.crypto.decrypt(localStorage.getItem('departoN')!),               
                                  this.crypto.decrypt(localStorage.getItem('tipoN')!),
                                  this.crypto.decrypt(localStorage.getItem('veiculoN')!),                                 
                                  this.crypto.decrypt(localStorage.getItem('placaN')!),                            
                                  this.crypto.decrypt(localStorage.getItem('gerencialN')!),
                                  this.crypto.decrypt(localStorage.getItem('ccustoN')!),
                                  this.crypto.decrypt(localStorage.getItem('localN')!),
                                  this.crypto.decrypt(localStorage.getItem('situacaoN')!),
                                  this.crypto.decrypt(localStorage.getItem('operacionalN')!),
                                  this.crypto.decrypt(localStorage.getItem('reservaN')!),
                                  this.crypto.decrypt(localStorage.getItem('locacaoN')!), 
                                  this.crypto.decrypt(localStorage.getItem('rastreamentoN')!) );  
                                  
    return this.http.post<{ result: any[] }>(BACKEND_URL + '/consulta', {sql, db: this.database});
  }  


  getQuantitativoR(): any {
    const sql = this.sqlList.getQuantitativoRSQL(this.crypto.decrypt(localStorage.getItem('empresa')!) || null,
                                        localStorage.getItem('dataInicial') !,
                                        localStorage.getItem('dataFinal')! ,
                                        localStorage.getItem('modulo') || 'vazio',
                                        this.crypto.decrypt(localStorage.getItem('gerencial')!),
                                  this.crypto.decrypt(localStorage.getItem('contrato')!),
                                  this.crypto.decrypt(localStorage.getItem('legalN')!),
                                  this.crypto.decrypt(localStorage.getItem('unidadeN')!),
                                  this.crypto.decrypt(localStorage.getItem('departoN')!),               
                                  this.crypto.decrypt(localStorage.getItem('tipoN')!),
                                  this.crypto.decrypt(localStorage.getItem('veiculoN')!),                                 
                                  this.crypto.decrypt(localStorage.getItem('placaN')!),                            
                                  this.crypto.decrypt(localStorage.getItem('gerencialN')!),
                                  this.crypto.decrypt(localStorage.getItem('ccustoN')!),
                                  this.crypto.decrypt(localStorage.getItem('localN')!),
                                  this.crypto.decrypt(localStorage.getItem('situacaoN')!),
                                  this.crypto.decrypt(localStorage.getItem('operacionalN')!),
                                  this.crypto.decrypt(localStorage.getItem('reservaN')!),
                                  this.crypto.decrypt(localStorage.getItem('locacaoN')!), 
                                  this.crypto.decrypt(localStorage.getItem('rastreamentoN')!) ,  this.database!);   
                                              
    return this.http.post<{ result: any[] }>(BACKEND_URL + '/label', {sql, db: this.database});
  }

  getProvedorRastreado(): any {
    const sql = this.sqlList.getProvedorRastreadoSQL(this.crypto.decrypt(localStorage.getItem('empresa')!) || null,
                                              localStorage.getItem('dataInicial') !,
                                              localStorage.getItem('dataFinal')! ,
                                              localStorage.getItem('modulo') || 'vazio',
                                              this.crypto.decrypt(localStorage.getItem('gerencial')!),
                                  this.crypto.decrypt(localStorage.getItem('contrato')!),
                                  this.crypto.decrypt(localStorage.getItem('legalN')!),
                                  this.crypto.decrypt(localStorage.getItem('unidadeN')!),
                                  this.crypto.decrypt(localStorage.getItem('departoN')!),               
                                  this.crypto.decrypt(localStorage.getItem('tipoN')!),
                                  this.crypto.decrypt(localStorage.getItem('veiculoN')!),                                 
                                  this.crypto.decrypt(localStorage.getItem('placaN')!),                            
                                  this.crypto.decrypt(localStorage.getItem('gerencialN')!),
                                  this.crypto.decrypt(localStorage.getItem('ccustoN')!),
                                  this.crypto.decrypt(localStorage.getItem('localN')!),
                                  this.crypto.decrypt(localStorage.getItem('situacaoN')!),
                                  this.crypto.decrypt(localStorage.getItem('operacionalN')!),
                                  this.crypto.decrypt(localStorage.getItem('reservaN')!),
                                  this.crypto.decrypt(localStorage.getItem('locacaoN')!), 
                                  this.crypto.decrypt(localStorage.getItem('rastreamentoN')!) );                         
    return this.http.post<{ result: any[] }>(BACKEND_URL + '/consulta', {sql, db: this.database});
  }

  getTipoRastreado(): any {
    const sql = this.sqlList.getTipoRastreadoSQL(this.crypto.decrypt(localStorage.getItem('empresa')!) || null,
                                              localStorage.getItem('dataInicial') !,
                                              localStorage.getItem('dataFinal')! ,
                                              localStorage.getItem('modulo') || 'vazio',
                                              this.crypto.decrypt(localStorage.getItem('gerencial')!),
                                  this.crypto.decrypt(localStorage.getItem('contrato')!),
                                  this.crypto.decrypt(localStorage.getItem('legalN')!),
                                  this.crypto.decrypt(localStorage.getItem('unidadeN')!),
                                  this.crypto.decrypt(localStorage.getItem('departoN')!),               
                                  this.crypto.decrypt(localStorage.getItem('tipoN')!),
                                  this.crypto.decrypt(localStorage.getItem('veiculoN')!),                                 
                                  this.crypto.decrypt(localStorage.getItem('placaN')!),                            
                                  this.crypto.decrypt(localStorage.getItem('gerencialN')!),
                                  this.crypto.decrypt(localStorage.getItem('ccustoN')!),
                                  this.crypto.decrypt(localStorage.getItem('localN')!),
                                  this.crypto.decrypt(localStorage.getItem('situacaoN')!),
                                  this.crypto.decrypt(localStorage.getItem('operacionalN')!),
                                  this.crypto.decrypt(localStorage.getItem('reservaN')!),
                                  this.crypto.decrypt(localStorage.getItem('locacaoN')!), 
                                  this.crypto.decrypt(localStorage.getItem('rastreamentoN')!) );                 
    return this.http.post<{ result: any[] }>(BACKEND_URL + '/consulta', {sql, db: this.database});
  }

  getDescricaoRastreado(): any {
    const sql = this.sqlList.getDescricaoRastreadoSQL(this.crypto.decrypt(localStorage.getItem('empresa')!) || null,
                                              localStorage.getItem('dataInicial') !,
                                              localStorage.getItem('dataFinal')! ,
                                              localStorage.getItem('modulo') || 'vazio',
                                              this.crypto.decrypt(localStorage.getItem('gerencial')!),
                                  this.crypto.decrypt(localStorage.getItem('contrato')!),
                                  this.crypto.decrypt(localStorage.getItem('legalN')!),
                                  this.crypto.decrypt(localStorage.getItem('unidadeN')!),
                                  this.crypto.decrypt(localStorage.getItem('departoN')!),               
                                  this.crypto.decrypt(localStorage.getItem('tipoN')!),
                                  this.crypto.decrypt(localStorage.getItem('veiculoN')!),                                 
                                  this.crypto.decrypt(localStorage.getItem('placaN')!),                            
                                  this.crypto.decrypt(localStorage.getItem('gerencialN')!),
                                  this.crypto.decrypt(localStorage.getItem('ccustoN')!),
                                  this.crypto.decrypt(localStorage.getItem('localN')!),
                                  this.crypto.decrypt(localStorage.getItem('situacaoN')!),
                                  this.crypto.decrypt(localStorage.getItem('operacionalN')!),
                                  this.crypto.decrypt(localStorage.getItem('reservaN')!),
                                  this.crypto.decrypt(localStorage.getItem('locacaoN')!), 
                                  this.crypto.decrypt(localStorage.getItem('rastreamentoN')!) );                          
    return this.http.post<{ result: any[] }>(BACKEND_URL + '/consulta', {sql, db: this.database});
  }

  getEstadoRastreado(): any {
    const sql = this.sqlList.getEstadoRastreadoSQL(this.crypto.decrypt(localStorage.getItem('empresa')!) || null,
                                              localStorage.getItem('dataInicial') !,
                                              localStorage.getItem('dataFinal')! ,
                                              localStorage.getItem('modulo') || 'vazio',
                                              this.crypto.decrypt(localStorage.getItem('gerencial')!),
                                  this.crypto.decrypt(localStorage.getItem('contrato')!),
                                  this.crypto.decrypt(localStorage.getItem('legalN')!),
                                  this.crypto.decrypt(localStorage.getItem('unidadeN')!),
                                  this.crypto.decrypt(localStorage.getItem('departoN')!),               
                                  this.crypto.decrypt(localStorage.getItem('tipoN')!),
                                  this.crypto.decrypt(localStorage.getItem('veiculoN')!),                                 
                                  this.crypto.decrypt(localStorage.getItem('placaN')!),                            
                                  this.crypto.decrypt(localStorage.getItem('gerencialN')!),
                                  this.crypto.decrypt(localStorage.getItem('ccustoN')!),
                                  this.crypto.decrypt(localStorage.getItem('localN')!),
                                  this.crypto.decrypt(localStorage.getItem('situacaoN')!),
                                  this.crypto.decrypt(localStorage.getItem('operacionalN')!),
                                  this.crypto.decrypt(localStorage.getItem('reservaN')!),
                                  this.crypto.decrypt(localStorage.getItem('locacaoN')!), 
                                  this.crypto.decrypt(localStorage.getItem('rastreamentoN')!) );                                  
    return this.http.post<{ result: any[] }>(BACKEND_URL + '/consulta', {sql, db: this.database});
  }

  getkmMesRastreado(): any {
    const sql = this.sqlList.getkmMesRastreadoSQL(this.crypto.decrypt(localStorage.getItem('empresa')!) || null,
                                              localStorage.getItem('dataInicial') !,
                                              localStorage.getItem('dataFinal')! ,
                                              localStorage.getItem('modulo') || 'vazio',
                                              this.crypto.decrypt(localStorage.getItem('gerencial')!),
                                  this.crypto.decrypt(localStorage.getItem('contrato')!),
                                  this.crypto.decrypt(localStorage.getItem('legalN')!),
                                  this.crypto.decrypt(localStorage.getItem('unidadeN')!),
                                  this.crypto.decrypt(localStorage.getItem('departoN')!),               
                                  this.crypto.decrypt(localStorage.getItem('tipoN')!),
                                  this.crypto.decrypt(localStorage.getItem('veiculoN')!),                                 
                                  this.crypto.decrypt(localStorage.getItem('placaN')!),                            
                                  this.crypto.decrypt(localStorage.getItem('gerencialN')!),
                                  this.crypto.decrypt(localStorage.getItem('ccustoN')!),
                                  this.crypto.decrypt(localStorage.getItem('localN')!),
                                  this.crypto.decrypt(localStorage.getItem('situacaoN')!),
                                  this.crypto.decrypt(localStorage.getItem('operacionalN')!),
                                  this.crypto.decrypt(localStorage.getItem('reservaN')!),
                                  this.crypto.decrypt(localStorage.getItem('locacaoN')!), 
                                  this.crypto.decrypt(localStorage.getItem('rastreamentoN')!) );                 
    return this.http.post<{ result: any[] }>(BACKEND_URL + '/consulta', {sql, db: this.database});
  }

  getkmTipoRastreado(): any {
    const sql = this.sqlList.getkmTipoRastreadoSQL(this.crypto.decrypt(localStorage.getItem('empresa')!) || null,
                                              localStorage.getItem('dataInicial') !,
                                              localStorage.getItem('dataFinal')! ,
                                              localStorage.getItem('modulo') || 'vazio',
                                              this.crypto.decrypt(localStorage.getItem('gerencial')!),
                                  this.crypto.decrypt(localStorage.getItem('contrato')!),
                                  this.crypto.decrypt(localStorage.getItem('legalN')!),
                                  this.crypto.decrypt(localStorage.getItem('unidadeN')!),
                                  this.crypto.decrypt(localStorage.getItem('departoN')!),               
                                  this.crypto.decrypt(localStorage.getItem('tipoN')!),
                                  this.crypto.decrypt(localStorage.getItem('veiculoN')!),                                 
                                  this.crypto.decrypt(localStorage.getItem('placaN')!),                            
                                  this.crypto.decrypt(localStorage.getItem('gerencialN')!),
                                  this.crypto.decrypt(localStorage.getItem('ccustoN')!),
                                  this.crypto.decrypt(localStorage.getItem('localN')!),
                                  this.crypto.decrypt(localStorage.getItem('situacaoN')!),
                                  this.crypto.decrypt(localStorage.getItem('operacionalN')!),
                                  this.crypto.decrypt(localStorage.getItem('reservaN')!),
                                  this.crypto.decrypt(localStorage.getItem('locacaoN')!), 
                                  this.crypto.decrypt(localStorage.getItem('rastreamentoN')!) );            
    return this.http.post<{ result: any[] }>(BACKEND_URL + '/consulta', {sql, db: this.database});
  }


  getkmDiaRastreado(): any {
    const sql = this.sqlList.getkmDiaRastreadoSQL(this.crypto.decrypt(localStorage.getItem('empresa')!) || null,
                                              localStorage.getItem('dataInicial') !,
                                              localStorage.getItem('dataFinal')! ,
                                              localStorage.getItem('modulo') || 'vazio',
                                              this.crypto.decrypt(localStorage.getItem('gerencial')!),
                                  this.crypto.decrypt(localStorage.getItem('contrato')!),
                                  this.crypto.decrypt(localStorage.getItem('legalN')!),
                                  this.crypto.decrypt(localStorage.getItem('unidadeN')!),
                                  this.crypto.decrypt(localStorage.getItem('departoN')!),               
                                  this.crypto.decrypt(localStorage.getItem('tipoN')!),
                                  this.crypto.decrypt(localStorage.getItem('veiculoN')!),                                 
                                  this.crypto.decrypt(localStorage.getItem('placaN')!),                            
                                  this.crypto.decrypt(localStorage.getItem('gerencialN')!),
                                  this.crypto.decrypt(localStorage.getItem('ccustoN')!),
                                  this.crypto.decrypt(localStorage.getItem('localN')!),
                                  this.crypto.decrypt(localStorage.getItem('situacaoN')!),
                                  this.crypto.decrypt(localStorage.getItem('operacionalN')!),
                                  this.crypto.decrypt(localStorage.getItem('reservaN')!),
                                  this.crypto.decrypt(localStorage.getItem('locacaoN')!), 
                                  this.crypto.decrypt(localStorage.getItem('rastreamentoN')!) );            
    return this.http.post<{ result: any[] }>(BACKEND_URL + '/consulta', {sql, db: this.database});
  }  
  
  getkmDiaMedioRastreado(): any {
    const sql = this.sqlList.getkmDiaMedioRastreadoSQL(this.crypto.decrypt(localStorage.getItem('empresa')!) || null,
                                              localStorage.getItem('dataInicial') !,
                                              localStorage.getItem('dataFinal')! ,
                                              localStorage.getItem('modulo') || 'vazio',
                                              this.crypto.decrypt(localStorage.getItem('gerencial')!),
                                  this.crypto.decrypt(localStorage.getItem('contrato')!),
                                  this.crypto.decrypt(localStorage.getItem('legalN')!),
                                  this.crypto.decrypt(localStorage.getItem('unidadeN')!),
                                  this.crypto.decrypt(localStorage.getItem('departoN')!),               
                                  this.crypto.decrypt(localStorage.getItem('tipoN')!),
                                  this.crypto.decrypt(localStorage.getItem('veiculoN')!),                                 
                                  this.crypto.decrypt(localStorage.getItem('placaN')!),                            
                                  this.crypto.decrypt(localStorage.getItem('gerencialN')!),
                                  this.crypto.decrypt(localStorage.getItem('ccustoN')!),
                                  this.crypto.decrypt(localStorage.getItem('localN')!),
                                  this.crypto.decrypt(localStorage.getItem('situacaoN')!),
                                  this.crypto.decrypt(localStorage.getItem('operacionalN')!),
                                  this.crypto.decrypt(localStorage.getItem('reservaN')!),
                                  this.crypto.decrypt(localStorage.getItem('locacaoN')!), 
                                  this.crypto.decrypt(localStorage.getItem('rastreamentoN')!)  );               
    return this.http.post<{ result: any[] }>(BACKEND_URL + '/consulta', {sql, db: this.database});
  }  

  getOcupacaoMesRastreado(): any {
    const sql = this.sqlList.getOcupacaoMesRastreadoSQL(this.crypto.decrypt(localStorage.getItem('empresa')!) || null,
                                              localStorage.getItem('dataInicial') !,
                                              localStorage.getItem('dataFinal')! ,
                                              localStorage.getItem('modulo') || 'vazio',
                                              this.crypto.decrypt(localStorage.getItem('gerencial')!),
                                  this.crypto.decrypt(localStorage.getItem('contrato')!),
                                  this.crypto.decrypt(localStorage.getItem('legalN')!),
                                  this.crypto.decrypt(localStorage.getItem('unidadeN')!),
                                  this.crypto.decrypt(localStorage.getItem('departoN')!),               
                                  this.crypto.decrypt(localStorage.getItem('tipoN')!),
                                  this.crypto.decrypt(localStorage.getItem('veiculoN')!),                                 
                                  this.crypto.decrypt(localStorage.getItem('placaN')!),                            
                                  this.crypto.decrypt(localStorage.getItem('gerencialN')!),
                                  this.crypto.decrypt(localStorage.getItem('ccustoN')!),
                                  this.crypto.decrypt(localStorage.getItem('localN')!),
                                  this.crypto.decrypt(localStorage.getItem('situacaoN')!),
                                  this.crypto.decrypt(localStorage.getItem('operacionalN')!),
                                  this.crypto.decrypt(localStorage.getItem('reservaN')!),
                                  this.crypto.decrypt(localStorage.getItem('locacaoN')!), 
                                  this.crypto.decrypt(localStorage.getItem('rastreamentoN')!) );                         
    return this.http.post<{ result: any[] }>(BACKEND_URL + '/consulta', {sql, db: this.database});
  }

  getOcupacaoDiaRastreado(): any {
    const sql = this.sqlList.getOcupacaoDiaRastreadoSQL(this.crypto.decrypt(localStorage.getItem('empresa')!) || null,
                                              localStorage.getItem('dataInicial') !,
                                              localStorage.getItem('dataFinal')! ,
                                              localStorage.getItem('modulo') || 'vazio',
                                              this.crypto.decrypt(localStorage.getItem('gerencial')!),
                                  this.crypto.decrypt(localStorage.getItem('contrato')!),
                                  this.crypto.decrypt(localStorage.getItem('legalN')!),
                                  this.crypto.decrypt(localStorage.getItem('unidadeN')!),
                                  this.crypto.decrypt(localStorage.getItem('departoN')!),               
                                  this.crypto.decrypt(localStorage.getItem('tipoN')!),
                                  this.crypto.decrypt(localStorage.getItem('veiculoN')!),                                 
                                  this.crypto.decrypt(localStorage.getItem('placaN')!),                            
                                  this.crypto.decrypt(localStorage.getItem('gerencialN')!),
                                  this.crypto.decrypt(localStorage.getItem('ccustoN')!),
                                  this.crypto.decrypt(localStorage.getItem('localN')!),
                                  this.crypto.decrypt(localStorage.getItem('situacaoN')!),
                                  this.crypto.decrypt(localStorage.getItem('operacionalN')!),
                                  this.crypto.decrypt(localStorage.getItem('reservaN')!),
                                  this.crypto.decrypt(localStorage.getItem('locacaoN')!), 
                                  this.crypto.decrypt(localStorage.getItem('rastreamentoN')!) );           
    return this.http.post<{ result: any[] }>(BACKEND_URL + '/consulta', {sql, db: this.database});
  }

  getOcupacaoDiaMedioRastreado(): any {
    const sql = this.sqlList.getOcupacaoDiaMedioRastreadoSQL(this.crypto.decrypt(localStorage.getItem('empresa')!) || null,
                                              localStorage.getItem('dataInicial') !,
                                              localStorage.getItem('dataFinal')! ,
                                              localStorage.getItem('modulo') || 'vazio',
                                              this.crypto.decrypt(localStorage.getItem('gerencial')!),
                                  this.crypto.decrypt(localStorage.getItem('contrato')!),
                                  this.crypto.decrypt(localStorage.getItem('legalN')!),
                                  this.crypto.decrypt(localStorage.getItem('unidadeN')!),
                                  this.crypto.decrypt(localStorage.getItem('departoN')!),               
                                  this.crypto.decrypt(localStorage.getItem('tipoN')!),
                                  this.crypto.decrypt(localStorage.getItem('veiculoN')!),                                 
                                  this.crypto.decrypt(localStorage.getItem('placaN')!),                            
                                  this.crypto.decrypt(localStorage.getItem('gerencialN')!),
                                  this.crypto.decrypt(localStorage.getItem('ccustoN')!),
                                  this.crypto.decrypt(localStorage.getItem('localN')!),
                                  this.crypto.decrypt(localStorage.getItem('situacaoN')!),
                                  this.crypto.decrypt(localStorage.getItem('operacionalN')!),
                                  this.crypto.decrypt(localStorage.getItem('reservaN')!),
                                  this.crypto.decrypt(localStorage.getItem('locacaoN')!), 
                                  this.crypto.decrypt(localStorage.getItem('rastreamentoN')!) );                          
    return this.http.post<{ result: any[] }>(BACKEND_URL + '/consulta', {sql, db: this.database});
  }

  getOcupacaoTipoRastreado(): any {
    const sql = this.sqlList.getOcupacaoTipoRastreadoSQL(this.crypto.decrypt(localStorage.getItem('empresa')!) || null,
                                              localStorage.getItem('dataInicial') !,
                                              localStorage.getItem('dataFinal')! ,
                                              localStorage.getItem('modulo') || 'vazio',
                                              this.crypto.decrypt(localStorage.getItem('gerencial')!),
                                  this.crypto.decrypt(localStorage.getItem('contrato')!),
                                  this.crypto.decrypt(localStorage.getItem('legalN')!),
                                  this.crypto.decrypt(localStorage.getItem('unidadeN')!),
                                  this.crypto.decrypt(localStorage.getItem('departoN')!),               
                                  this.crypto.decrypt(localStorage.getItem('tipoN')!),
                                  this.crypto.decrypt(localStorage.getItem('veiculoN')!),                                 
                                  this.crypto.decrypt(localStorage.getItem('placaN')!),                            
                                  this.crypto.decrypt(localStorage.getItem('gerencialN')!),
                                  this.crypto.decrypt(localStorage.getItem('ccustoN')!),
                                  this.crypto.decrypt(localStorage.getItem('localN')!),
                                  this.crypto.decrypt(localStorage.getItem('situacaoN')!),
                                  this.crypto.decrypt(localStorage.getItem('operacionalN')!),
                                  this.crypto.decrypt(localStorage.getItem('reservaN')!),
                                  this.crypto.decrypt(localStorage.getItem('locacaoN')!), 
                                  this.crypto.decrypt(localStorage.getItem('rastreamentoN')!)  );      
    return this.http.post<{ result: any[] }>(BACKEND_URL + '/consulta', {sql, db: this.database});
  }
  getOcupacaoBaixaRastreado(): any {
    const sql = this.sqlList.getOcupacaobaixaRastreadoSQL(this.crypto.decrypt(localStorage.getItem('empresa')!) || null,
                                              localStorage.getItem('dataInicial') !,
                                              localStorage.getItem('dataFinal')! ,
                                              localStorage.getItem('modulo') || 'vazio',
                                              this.crypto.decrypt(localStorage.getItem('gerencial')!),
                                  this.crypto.decrypt(localStorage.getItem('contrato')!),
                                  this.crypto.decrypt(localStorage.getItem('legalN')!),
                                  this.crypto.decrypt(localStorage.getItem('unidadeN')!),
                                  this.crypto.decrypt(localStorage.getItem('departoN')!),               
                                  this.crypto.decrypt(localStorage.getItem('tipoN')!),
                                  this.crypto.decrypt(localStorage.getItem('veiculoN')!),                                 
                                  this.crypto.decrypt(localStorage.getItem('placaN')!),                            
                                  this.crypto.decrypt(localStorage.getItem('gerencialN')!),
                                  this.crypto.decrypt(localStorage.getItem('ccustoN')!),
                                  this.crypto.decrypt(localStorage.getItem('localN')!),
                                  this.crypto.decrypt(localStorage.getItem('situacaoN')!),
                                  this.crypto.decrypt(localStorage.getItem('operacionalN')!),
                                  this.crypto.decrypt(localStorage.getItem('reservaN')!),
                                  this.crypto.decrypt(localStorage.getItem('locacaoN')!), 
                                  this.crypto.decrypt(localStorage.getItem('rastreamentoN')!) );  
                                
    return this.http.post<{ result: any[] }>(BACKEND_URL + '/consulta', {sql, db: this.database});
  } 

  getTabelaVeiculoKm(): any {
    const sql = this.sqlList.getTabelaVeiculoKmSQL(this.crypto.decrypt(localStorage.getItem('empresa')!) || null,
                                              localStorage.getItem('dataInicial') !,
                                              localStorage.getItem('dataFinal')! ,
                                              localStorage.getItem('modulo') || 'vazio',
                                              this.crypto.decrypt(localStorage.getItem('gerencial')!),
                                  this.crypto.decrypt(localStorage.getItem('contrato')!),
                                  this.crypto.decrypt(localStorage.getItem('legalN')!),
                                  this.crypto.decrypt(localStorage.getItem('unidadeN')!),
                                  this.crypto.decrypt(localStorage.getItem('departoN')!),               
                                  this.crypto.decrypt(localStorage.getItem('tipoN')!),
                                  this.crypto.decrypt(localStorage.getItem('veiculoN')!),                                 
                                  this.crypto.decrypt(localStorage.getItem('placaN')!),                            
                                  this.crypto.decrypt(localStorage.getItem('gerencialN')!),
                                  this.crypto.decrypt(localStorage.getItem('ccustoN')!),
                                  this.crypto.decrypt(localStorage.getItem('localN')!),
                                  this.crypto.decrypt(localStorage.getItem('situacaoN')!),
                                  this.crypto.decrypt(localStorage.getItem('operacionalN')!),
                                  this.crypto.decrypt(localStorage.getItem('reservaN')!),
                                  this.crypto.decrypt(localStorage.getItem('locacaoN')!), 
                                  this.crypto.decrypt(localStorage.getItem('rastreamentoN')!) );        
                                 
    return this.http.post<{ result: any[] }>(BACKEND_URL + '/consulta', {sql, db: this.database});
  } 

  getMensalR(): any {
    const sql = this.sqlList.getMensalRSQL(this.crypto.decrypt(localStorage.getItem('empresa')!) || null,
                                              localStorage.getItem('dataInicial') !,
                                              localStorage.getItem('dataFinal')! ,
                                              localStorage.getItem('modulo') || 'vazio',
                                              this.crypto.decrypt(localStorage.getItem('gerencial')!),
                                  this.crypto.decrypt(localStorage.getItem('contrato')!),
                                  this.crypto.decrypt(localStorage.getItem('legalN')!),
                                  this.crypto.decrypt(localStorage.getItem('unidadeN')!),
                                  this.crypto.decrypt(localStorage.getItem('departoN')!),               
                                  this.crypto.decrypt(localStorage.getItem('tipoN')!),
                                  this.crypto.decrypt(localStorage.getItem('veiculoN')!),                                 
                                  this.crypto.decrypt(localStorage.getItem('placaN')!),                            
                                  this.crypto.decrypt(localStorage.getItem('gerencialN')!),
                                  this.crypto.decrypt(localStorage.getItem('ccustoN')!),
                                  this.crypto.decrypt(localStorage.getItem('localN')!),
                                  this.crypto.decrypt(localStorage.getItem('situacaoN')!),
                                  this.crypto.decrypt(localStorage.getItem('operacionalN')!),
                                  this.crypto.decrypt(localStorage.getItem('reservaN')!),
                                  this.crypto.decrypt(localStorage.getItem('locacaoN')!), 
                                  this.crypto.decrypt(localStorage.getItem('rastreamentoN')!) );        
                               
    return this.http.post<{ result: any[] }>(BACKEND_URL + '/consulta', {sql, db: this.database});
  } 

  getHistoricoKm(): any {
    const sql = this.sqlList.getHistorKmSQL(this.crypto.decrypt(localStorage.getItem('empresa')!) || null,
                                              localStorage.getItem('dataInicial') !,
                                              localStorage.getItem('dataFinal')! ,
                                              localStorage.getItem('modulo') || 'vazio',
                                              this.crypto.decrypt(localStorage.getItem('gerencial')!),
                                  this.crypto.decrypt(localStorage.getItem('contrato')!),
                                  this.crypto.decrypt(localStorage.getItem('legalN')!),
                                  this.crypto.decrypt(localStorage.getItem('unidadeN')!),
                                  this.crypto.decrypt(localStorage.getItem('departoN')!),               
                                  this.crypto.decrypt(localStorage.getItem('tipoN')!),
                                  this.crypto.decrypt(localStorage.getItem('veiculoN')!),                                 
                                  this.crypto.decrypt(localStorage.getItem('placaN')!),                            
                                  this.crypto.decrypt(localStorage.getItem('gerencialN')!),
                                  this.crypto.decrypt(localStorage.getItem('ccustoN')!),
                                  this.crypto.decrypt(localStorage.getItem('localN')!),
                                  this.crypto.decrypt(localStorage.getItem('situacaoN')!),
                                  this.crypto.decrypt(localStorage.getItem('operacionalN')!),
                                  this.crypto.decrypt(localStorage.getItem('reservaN')!),
                                  this.crypto.decrypt(localStorage.getItem('locacaoN')!), 
                                  this.crypto.decrypt(localStorage.getItem('rastreamentoN')!) );        
                                 
    return this.http.post<{ result: any[] }>(BACKEND_URL + '/consulta', {sql, db: this.database});
  } 

  getTabelaVeiculoTempo(): any {
    const sql = this.sqlList.getTabelaVeiculoTempoSQL(this.crypto.decrypt(localStorage.getItem('empresa')!) || null,
                                              localStorage.getItem('dataInicial') !,
                                              localStorage.getItem('dataFinal')! ,
                                              localStorage.getItem('modulo') || 'vazio',
                                              this.crypto.decrypt(localStorage.getItem('gerencial')!),
                                  this.crypto.decrypt(localStorage.getItem('contrato')!),
                                  this.crypto.decrypt(localStorage.getItem('legalN')!),
                                  this.crypto.decrypt(localStorage.getItem('unidadeN')!),
                                  this.crypto.decrypt(localStorage.getItem('departoN')!),               
                                  this.crypto.decrypt(localStorage.getItem('tipoN')!),
                                  this.crypto.decrypt(localStorage.getItem('veiculoN')!),                                 
                                  this.crypto.decrypt(localStorage.getItem('placaN')!),                            
                                  this.crypto.decrypt(localStorage.getItem('gerencialN')!),
                                  this.crypto.decrypt(localStorage.getItem('ccustoN')!),
                                  this.crypto.decrypt(localStorage.getItem('localN')!),
                                  this.crypto.decrypt(localStorage.getItem('situacaoN')!),
                                  this.crypto.decrypt(localStorage.getItem('operacionalN')!),
                                  this.crypto.decrypt(localStorage.getItem('reservaN')!),
                                  this.crypto.decrypt(localStorage.getItem('locacaoN')!), 
                                  this.crypto.decrypt(localStorage.getItem('rastreamentoN')!) );        
                                 
    return this.http.post<{ result: any[] }>(BACKEND_URL + '/consulta', {sql, db: this.database});
  } 

  getTabelaSetorKm(): any {
    const sql = this.sqlList.getTabelaSetorKmSQL(this.crypto.decrypt(localStorage.getItem('empresa')!) || null,
                                              localStorage.getItem('dataInicial') !,
                                              localStorage.getItem('dataFinal')! ,
                                              localStorage.getItem('modulo') || 'vazio',
                                              this.crypto.decrypt(localStorage.getItem('gerencial')!),
                                  this.crypto.decrypt(localStorage.getItem('contrato')!),
                                  this.crypto.decrypt(localStorage.getItem('legalN')!),
                                  this.crypto.decrypt(localStorage.getItem('unidadeN')!),
                                  this.crypto.decrypt(localStorage.getItem('departoN')!),               
                                  this.crypto.decrypt(localStorage.getItem('tipoN')!),
                                  this.crypto.decrypt(localStorage.getItem('veiculoN')!),                                 
                                  this.crypto.decrypt(localStorage.getItem('placaN')!),                            
                                  this.crypto.decrypt(localStorage.getItem('gerencialN')!),
                                  this.crypto.decrypt(localStorage.getItem('ccustoN')!),
                                  this.crypto.decrypt(localStorage.getItem('localN')!),
                                  this.crypto.decrypt(localStorage.getItem('situacaoN')!),
                                  this.crypto.decrypt(localStorage.getItem('operacionalN')!),
                                  this.crypto.decrypt(localStorage.getItem('reservaN')!),
                                  this.crypto.decrypt(localStorage.getItem('locacaoN')!), 
                                  this.crypto.decrypt(localStorage.getItem('rastreamentoN')!) );        
                                 
    return this.http.post<{ result: any[] }>(BACKEND_URL + '/consulta', {sql, db: this.database});
  } 
  generatAllTelemetria(): any {
    const sql = this.sqlList.allTelemetriaSQL(localStorage.getItem('dataInicial')!,
                                    localStorage.getItem('dataFinal')! ,
                                    this.crypto.decrypt(localStorage.getItem('empresa')!) || null,
                                    this.crypto.decrypt(localStorage.getItem('gerencial')!),
                                  this.crypto.decrypt(localStorage.getItem('contrato')!),
                                  this.crypto.decrypt(localStorage.getItem('legalN')!),
                                  this.crypto.decrypt(localStorage.getItem('unidadeN')!),
                                  this.crypto.decrypt(localStorage.getItem('departoN')!),               
                                  this.crypto.decrypt(localStorage.getItem('tipoN')!),
                                  this.crypto.decrypt(localStorage.getItem('veiculoN')!),                                 
                                  this.crypto.decrypt(localStorage.getItem('placaN')!),                            
                                  this.crypto.decrypt(localStorage.getItem('gerencialN')!),
                                  this.crypto.decrypt(localStorage.getItem('ccustoN')!),
                                  this.crypto.decrypt(localStorage.getItem('localN')!),
                                  this.crypto.decrypt(localStorage.getItem('situacaoN')!),
                                  this.crypto.decrypt(localStorage.getItem('operacionalN')!),
                                  this.crypto.decrypt(localStorage.getItem('reservaN')!),
                                  this.crypto.decrypt(localStorage.getItem('locacaoN')!), 
                                  this.crypto.decrypt(localStorage.getItem('rastreamentoN')!) );                                                       
    return this.http.post<{ result: Status[] }>(BACKEND_URL + '/consulta',  {sql, db: this.database});
  }

  getLabelsR(): Observable<any> {
    const sql = this.sqlList.labelsSQLR();
    return this.http.post<{ result: string[] }>(BACKEND_URL + '/consulta', {sql, db: this.database});
  }

  getLabelsE(): Observable<any> {
    const sql = this.sqlList.labelsSQLE();
    return this.http.post<{ result: string[] }>(BACKEND_URL + '/consulta', {sql, db: this.database});
  }


}
