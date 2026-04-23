import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { AESEncryptDecryptService } from '../services/aesencrypt-decrypt.service';
import { Resumo, TopDez, StatusValor,Status, Vehicle } from '../types/servicos-response.type';

import { ServicoSQL } from '../sql/servicos-repository';

const BACKEND_URL = environment.apiUrl + '/consulta';

@Injectable({
  providedIn: 'root'
})
export class ServicosService {

  empresa: string='';
  dataInicial: string='';
  dataFinal: string='';
  opcao: string='';

  database = localStorage.getItem('gerencial_db');

  constructor(private http: HttpClient,
              private sqlList: ServicoSQL,
              private crypto: AESEncryptDecryptService) { }

  generateResumo(dias: number): any {
    const sql = this.sqlList.resumoSQL(dias, this.crypto.decrypt(localStorage.getItem('empresa')!),
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
                                        this.crypto.decrypt(localStorage.getItem('rastreamentoN')!)    
                                        );
    return this.http.post<{ result: Resumo }>(BACKEND_URL + '/label', {
      sql, db: this.database
    });
  }

  generateStatus(dias: number): any {
    const sql = this.sqlList.statusSQL(dias, this.crypto.decrypt(localStorage.getItem('empresa')!),
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
                                              this.crypto.decrypt(localStorage.getItem('rastreamentoN')!)    
                                      );
    return this.http.post<{ result: Status[] }>(BACKEND_URL + '/consulta', {
      sql, db: this.database
    });
  }

  generateStaOS(): any {
    const sql =
      localStorage.getItem('opcao') === 'os'
        ? this.sqlList.statusOSSQL(localStorage.getItem('dataFinal')!!,
          localStorage.getItem('dataFinal')!,
          this.crypto.decrypt(localStorage.getItem('empresa')!),
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
          this.crypto.decrypt(localStorage.getItem('rastreamentoN')!)  )
        : this.sqlList.statusNDSQL(localStorage.getItem('dataFinal')!!,
          localStorage.getItem('dataFinal')!,
          this.crypto.decrypt(localStorage.getItem('empresa')!),
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
          this.crypto.decrypt(localStorage.getItem('rastreamentoN')!)   );
    return this.http.post<{ result: Status[] }>(BACKEND_URL + '/consulta', {
      sql, db: this.database
    });
  }

  generateMotivo(): any {
    const sql =
      localStorage.getItem('opcao') === 'os'
        ? this.sqlList.motivoOSSQL(localStorage.getItem('dataFinal')!,
          localStorage.getItem('dataFinal')!,
          this.crypto.decrypt(localStorage.getItem('empresa')!),
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
          this.crypto.decrypt(localStorage.getItem('rastreamentoN')!)  )
        : this.sqlList.motivoNDSQL(localStorage.getItem('dataFinal')!,
          localStorage.getItem('dataFinal')!,
          this.crypto.decrypt(localStorage.getItem('empresa')!),
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
    return this.http.post<{ result: Status[] }>(BACKEND_URL + '/consulta', {
      sql, db: this.database
    });
  }

  generateGerencial(): any {
    const sql =
      localStorage.getItem('opcao') === 'os'
        ? this.sqlList.gerencialOSSQL(localStorage.getItem('dataFinal')!,
          localStorage.getItem('dataFinal')!,
          this.crypto.decrypt(localStorage.getItem('empresa')!),
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
          this.crypto.decrypt(localStorage.getItem('rastreamentoN')!)   )
        : this.sqlList.gerencialNDSQL(localStorage.getItem('dataFinal')!,
          localStorage.getItem('dataFinal')!,
          this.crypto.decrypt(localStorage.getItem('empresa')!),
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
          this.crypto.decrypt(localStorage.getItem('rastreamentoN')!)   );
    return this.http.post<{ result: Status[] }>(BACKEND_URL + '/consulta', {
      sql, db: this.database
    });
  }

  generateIDF(): any {
    const sql =
      localStorage.getItem('opcao') === 'os'
        ? this.sqlList.IDFOSSQL(localStorage.getItem('dataFinal')!,
          localStorage.getItem('dataFinal')!,
          this.crypto.decrypt(localStorage.getItem('empresa')!),
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
          this.crypto.decrypt(localStorage.getItem('rastreamentoN')!)   )
        : this.sqlList.IDFNDSQL(localStorage.getItem('dataFinal')!,
          localStorage.getItem('dataFinal')!,
          this.crypto.decrypt(localStorage.getItem('empresa')!),
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
          this.crypto.decrypt(localStorage.getItem('rastreamentoN')!)   );   
    return this.http.post<{ result: Status[] }>(BACKEND_URL + '/consulta', {
      sql, db: this.database
    });
  }

  generateTopDez(): any {
    const sql =
      localStorage.getItem('opcao') === 'os'
        ? this.sqlList.topDezOSSQL(localStorage.getItem('dataFinal')!,
          localStorage.getItem('dataFinal')!,
          this.crypto.decrypt(localStorage.getItem('empresa')!),
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
          this.crypto.decrypt(localStorage.getItem('rastreamentoN')!)  )
        : this.sqlList.topDezNDSQL(localStorage.getItem('dataFinal')!,
          localStorage.getItem('dataFinal')!,
          this.crypto.decrypt(localStorage.getItem('empresa')!),
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
    return this.http.post<{ result: TopDez[] }>(BACKEND_URL + '/consulta', {
      sql, db: this.database
    });
  }

  generatEstados(): any {
    const sql =
      localStorage.getItem('opcao') === 'os'
        ? this.sqlList.estadosOSSQL(localStorage.getItem('dataFinal')!,
          localStorage.getItem('dataFinal')!,
          this.crypto.decrypt(localStorage.getItem('empresa')!),
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
          this.crypto.decrypt(localStorage.getItem('rastreamentoN')!)  )
        : this.sqlList.estadosNDSQL(localStorage.getItem('dataFinal')!,
          localStorage.getItem('dataFinal')!,
          this.crypto.decrypt(localStorage.getItem('empresa')!),
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
    return this.http.post<{ result: Status[] }>(BACKEND_URL + '/consulta', {
      sql, db: this.database
    });
  }

  generatAll(): any {
    const sql =
      localStorage.getItem('opcao') === 'os'
        ? this.sqlList.allOSSQL(localStorage.getItem('dataFinal')!,
          localStorage.getItem('dataFinal')!,
          this.crypto.decrypt(localStorage.getItem('empresa')!),
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
          this.crypto.decrypt(localStorage.getItem('rastreamentoN')!)  )
        : this.sqlList.allNDSQL(localStorage.getItem('dataFinal')!,
          localStorage.getItem('dataFinal')!,
          this.crypto.decrypt(localStorage.getItem('empresa')!),
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
      
    return this.http.post<{ result: Status[] }>(BACKEND_URL + '/consulta', {
      sql, db: this.database
    });
  }

  getLabels(): any {
    const sql = this.sqlList.labelsSQL();
    return this.http.post<{ result: string[] }>(BACKEND_URL + '/consulta', {
      sql, db: this.database
    });
  }

  generatAllTCO(): any {    
      const sql = this.sqlList.TCOSQL(localStorage.getItem('dataFinal')!,
                                      localStorage.getItem('dataFinal')!,
                                      this.crypto.decrypt(localStorage.getItem('empresa')!),
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
      return this.http.post<{ result: string[] }>(BACKEND_URL + '/consulta', {
        sql, db: this.database
      });
    
  }
  getApelidos(empresa: string, gerencial: string, contrato: string): any {    
    const sql = this.sqlList.nomesEmpresasSQL(empresa, gerencial, contrato);
    // O primeiro apontamento de memoria errado na variavel - this.database
    const base : string = localStorage.getItem('gerencial_db')!;
    return this.http.post<{ result: Status[] }>(BACKEND_URL + '/consulta', {
      sql, db: base
    });
  }
  getUnidades(empresa: string): any {
    const sql = this.sqlList.nomesUnidadeSQL(empresa,
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
                                             this.crypto.decrypt(localStorage.getItem('rastreamentoN')!)
                                       );
    return this.http.post<{ result: Status[] }>(BACKEND_URL + '/consulta', {
      sql, db: this.database
    });
  }
  getDepartos(empresa: string): any {
    const sql = this.sqlList.nomesDepartoSQL(empresa,
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
                                             this.crypto.decrypt(localStorage.getItem('rastreamentoN')!)
                                              );                                    
    return this.http.post<{ result: Status[] }>(BACKEND_URL + '/consulta', {
      sql, db: this.database
    });
  }
  getVeiculos(empresa: string): any {
    const sql = this.sqlList.nomesVeiculoSQL(empresa,
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
                                             this.crypto.decrypt(localStorage.getItem('rastreamentoN')!));
    return this.http.post<{ result: Status[] }>(BACKEND_URL + '/consulta', {
      sql, db: this.database
    });
  }
  getPlacas(empresa: string): any {
    const sql = this.sqlList.nomesPlacaSQL(empresa,
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
                                         this.crypto.decrypt(localStorage.getItem('rastreamentoN')!));
    return this.http.post<{ result: Status[] }>(BACKEND_URL + '/consulta', {
      sql, db: this.database
    });
  }
  getLegal(empresa: string): any {
    const sql = this.sqlList.nomesLegalSQL(empresa,
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
                                           this.crypto.decrypt(localStorage.getItem('rastreamentoN')!));
    return this.http.post<{ result: Status[] }>(BACKEND_URL + '/consulta', {
      sql, db: this.database
    });
  }
  getTipo(empresa: string): any {
    const sql = this.sqlList.nomesTipoSQL(empresa,
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
                                         this.crypto.decrypt(localStorage.getItem('rastreamentoN')!));
    return this.http.post<{ result: Status[] }>(BACKEND_URL + '/consulta', {
      sql, db: this.database
    });
  }
  
  getGerencial(empresa: string): any {
    const sql = this.sqlList.nomesGerencialSQL(empresa,
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
                                               this.crypto.decrypt(localStorage.getItem('rastreamentoN')!));
    return this.http.post<{ result: Status[] }>(BACKEND_URL + '/consulta', {
      sql, db: this.database
    });
  }
  getCCusto(empresa: string): any {
    const sql = this.sqlList.nomesCCustoSQL(empresa,
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
                                           this.crypto.decrypt(localStorage.getItem('rastreamentoN')!));
    return this.http.post<{ result: Status[] }>(BACKEND_URL + '/consulta', {
      sql, db: this.database
    });
  }
  getSituacao(empresa: string): any {
    const sql = this.sqlList.nomesSituacaoSQL(empresa,
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
                                             this.crypto.decrypt(localStorage.getItem('rastreamentoN')!));
    return this.http.post<{ result: Status[] }>(BACKEND_URL + '/consulta', {
      sql, db: this.database
    });
  }
  getOperacional(empresa: string): any {
    const sql = this.sqlList.nomesOperacionalSQL(empresa,
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
                                                 this.crypto.decrypt(localStorage.getItem('rastreamentoN')!));
    return this.http.post<{ result: Status[] }>(BACKEND_URL + '/consulta', {
      sql, db: this.database
    });
  }
  getReserva(empresa: string): any {
    const sql = this.sqlList.nomesReservaSQL(empresa,
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
                                             this.crypto.decrypt(localStorage.getItem('rastreamentoN')!));    
    return this.http.post<{ result: Status[] }>(BACKEND_URL + '/consulta', {
      sql, db: this.database
    });
  }  
  getLocal(empresa: string): any {
    const sql = this.sqlList.nomesLocalSQL(empresa,
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
                                           this.crypto.decrypt(localStorage.getItem('rastreamentoN')!));
    return this.http.post<{ result: Status[] }>(BACKEND_URL + '/consulta', {
      sql, db: this.database
    });
  }  
  getLocacao(empresa: string): any {
    const sql = this.sqlList.nomesLocacaoSQL(empresa,
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
                                             this.crypto.decrypt(localStorage.getItem('rastreamentoN')!));
    return this.http.post<{ result: Status[] }>(BACKEND_URL + '/consulta', {
      sql, db: this.database
    });
  }  
  getRastreamento(empresa: string): any {
    const sql = this.sqlList.nomesRastreamentoSQL(empresa,
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
                                                 this.crypto.decrypt(localStorage.getItem('rastreamentoN')!));
    return this.http.post<{ result: Status[] }>(BACKEND_URL + '/consulta', {
      sql, db: this.database
    });
  }  
  getEnviaVeiculo(empresa: string): any {
    const sql = this.sqlList.EnviaVeiculoSQL(empresa);
    return this.http.post<{ result: Vehicle[] }>(BACKEND_URL + '/consulta', {
      sql, db: this.database
    });
  }  
  
  generateStatusValores(): any {
    const sql =
      localStorage.getItem('opcao') === 'os'
        ? this.sqlList.statusValoresOSSQL(localStorage.getItem('dataFinal')!,
          localStorage.getItem('dataFinal')!,
          this.crypto.decrypt(localStorage.getItem('empresa')!),
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
          this.crypto.decrypt(localStorage.getItem('rastreamentoN')!)  )
        : this.sqlList.statusValoresNDSQL(localStorage.getItem('dataFinal')!,
          localStorage.getItem('dataFinal')!,
          this.crypto.decrypt(localStorage.getItem('empresa')!),
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
    return this.http.post<{ result: StatusValor[] }>(BACKEND_URL + '/consulta', {
      sql, db: this.database
    });
  }

  generateTop10Placa(): any {
    const sql =
      localStorage.getItem('opcao') === 'os'
        ? this.sqlList.top10PlacaOSSQL(localStorage.getItem('dataFinal')!,
          localStorage.getItem('dataFinal')!,
          this.crypto.decrypt(localStorage.getItem('empresa')!),
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
          this.crypto.decrypt(localStorage.getItem('rastreamentoN')!)  )
        : this.sqlList.top10PlacaNDSQL(localStorage.getItem('dataFinal')!,
          localStorage.getItem('dataFinal')!,
          this.crypto.decrypt(localStorage.getItem('empresa')!),
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
        
    return this.http.post<{ result: Status[] }>(BACKEND_URL + '/consulta', {
      sql, db: this.database
    });
  }

  generateTop10Unidade(): any {
    const sql =
      localStorage.getItem('opcao') === 'os'
        ? this.sqlList.top10UnidadeOSSQL(localStorage.getItem('dataFinal')!,
          localStorage.getItem('dataFinal')!,
          this.crypto.decrypt(localStorage.getItem('empresa')!),
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
          this.crypto.decrypt(localStorage.getItem('rastreamentoN')!)  )
        : this.sqlList.top10UnidadeNDSQL(localStorage.getItem('dataFinal')!,
          localStorage.getItem('dataFinal')!,
          this.crypto.decrypt(localStorage.getItem('empresa')!),
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

    return this.http.post<{ result: Status[] }>(BACKEND_URL + '/consulta', {
      sql, db: this.database
    });
  }

  generateTop10Corretivas(): any {
    const sql =
      localStorage.getItem('opcao') === 'os'
        ? this.sqlList.top10CorretivasOSSQL(localStorage.getItem('dataFinal')!,
          localStorage.getItem('dataFinal')!,
          this.crypto.decrypt(localStorage.getItem('empresa')!),
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
          this.crypto.decrypt(localStorage.getItem('rastreamentoN')!)   )
        : this.sqlList.top10CorretivasNDSQL(localStorage.getItem('dataFinal')!,
          localStorage.getItem('dataFinal')!,
          this.crypto.decrypt(localStorage.getItem('empresa')!),
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

    return this.http.post<{ result: Status[] }>(BACKEND_URL + '/consulta', {
      sql, db: this.database
    });
  }

  generateTop10Preventivas(): any {
    const sql =
      localStorage.getItem('opcao') === 'os'
        ? this.sqlList.top10PreventivasOSSQL(localStorage.getItem('dataFinal')!,
          localStorage.getItem('dataFinal')!,
          this.crypto.decrypt(localStorage.getItem('empresa')!),
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
          this.crypto.decrypt(localStorage.getItem('rastreamentoN')!)  )
        : this.sqlList.top10PreventivasNDSQL(localStorage.getItem('dataFinal')!,
          localStorage.getItem('dataFinal')!,
          this.crypto.decrypt(localStorage.getItem('empresa')!),
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

    return this.http.post<{ result: Status[] }>(BACKEND_URL + '/consulta', {
      sql, db: this.database
    });
  }

  generateEconomia(): any {
    const sql =
      localStorage.getItem('opcao') === 'os'
        ? this.sqlList.economiaOSSQL(localStorage.getItem('dataFinal')!,
          localStorage.getItem('dataFinal')!,
          this.crypto.decrypt(localStorage.getItem('empresa')!),
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
          this.crypto.decrypt(localStorage.getItem('rastreamentoN')!)  )
        : this.sqlList.economiaNDSQL(localStorage.getItem('dataFinal')!,
          localStorage.getItem('dataFinal')!,
          this.crypto.decrypt(localStorage.getItem('empresa')!),
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
        
    return this.http.post<{ result: Status[] }>(BACKEND_URL + '/consulta', {
      sql, db: this.database
    });
  }

  generateEconomiaSUIV(): any {
    const sql =
      localStorage.getItem('opcao') === 'os'
        ? this.sqlList.economiaSUIVSQL(localStorage.getItem('dataFinal')!,
          localStorage.getItem('dataFinal')!,
          this.crypto.decrypt(localStorage.getItem('empresa')!),
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
          this.crypto.decrypt(localStorage.getItem('rastreamentoN')!)  )
        : this.sqlList.economiaNDSUIVSQL(localStorage.getItem('dataFinal')!,
          localStorage.getItem('dataFinal')!,
          this.crypto.decrypt(localStorage.getItem('empresa')!),
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
          this.crypto.decrypt(localStorage.getItem('rastreamentoN')!)   );
        
    return this.http.post<{ result: Status[] }>(BACKEND_URL + '/consulta', {
      sql, db: this.database
    });
  }

  generateEconomiaMEDIO(): any {
    const sql =
      localStorage.getItem('opcao') === 'os'
        ? this.sqlList.economiaMEDIOSQL(localStorage.getItem('dataFinal')!,
          localStorage.getItem('dataFinal')!,
          this.crypto.decrypt(localStorage.getItem('empresa')!),
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
          this.crypto.decrypt(localStorage.getItem('rastreamentoN')!)  )
        : this.sqlList.economiaNDMEDIOSQL(localStorage.getItem('dataFinal')!,
          localStorage.getItem('dataFinal')!,
          this.crypto.decrypt(localStorage.getItem('empresa')!),
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
          this.crypto.decrypt(localStorage.getItem('rastreamentoN')!)   );
        
    return this.http.post<{ result: Status[] }>(BACKEND_URL + '/consulta', {
      sql, db: this.database
    });
  }

  generateTCO(dataInicial: string, dataFinal: string, empresa: string, codigogger: string, contrato: string, legal : string, unidade : string, setor : string, tipo : string, veiculo : string, placa : string, gerencial : string, 
    ccusto  : string, local : string, situacao  : string,  sitopera  : string, reserva : string, locacao: string, rastreamento: string): any {
 
    const sql = this.sqlList.TCOSQL(dataInicial, dataFinal, empresa,codigogger,contrato,legal, unidade, setor, tipo, veiculo, placa,gerencial, 
      ccusto, local, situacao ,  sitopera, reserva,locacao,rastreamento );

      return this.http.post<{ result: Status[] }>(BACKEND_URL + '/consulta', {
      sql, db: this.database
    });
  }

  generateIndChamada(): any {
    const sql = this.sqlList.indicadorChamadaSQL(localStorage.getItem('dataFinal')!,
                            localStorage.getItem('dataFinal')!,
                            this.crypto.decrypt(localStorage.getItem('empresa')!),
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
    return this.http.post<{ result: Status[] }>(BACKEND_URL + '/consulta', {
      sql, db: this.database
    });
  }


  generatePainelOsAberta(): any {
    const sql = this.sqlList.painelOSAbertaSQL(localStorage.getItem('dataFinal')!,
                            localStorage.getItem('dataFinal')!,
                            this.crypto.decrypt(localStorage.getItem('empresa')!),
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
    return this.http.post<{ result: Status[] }>(BACKEND_URL + '/consulta', {
      sql, db: this.database
    });
  }

  generateCardOsAberta(): any {
    const sql = this.sqlList.statusValoresOSabertaSQL(localStorage.getItem('dataFinal')!,
                            localStorage.getItem('dataFinal')!,
                            this.crypto.decrypt(localStorage.getItem('empresa')!),
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
    return this.http.post<{ result: Status[] }>(BACKEND_URL + '/consulta', {
      sql, db: this.database
    });
  } 

  generatePreventivaLista(): any {
    const sql = this.sqlList.preventivaAtrasadasSQL(this.crypto.decrypt(localStorage.getItem('empresa')!),                   
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
    return this.http.post<{ result: Status[] }>(BACKEND_URL + '/consulta', {
      sql, db: this.database
    });
  }



  getLabelsR(): Observable<any> {
    const sql = this.sqlList.labelsSQLR();
    return this.http.post<{ result: string[] }>(BACKEND_URL + '/consulta', {sql, db: this.database});
  }

  consultaBanco(sql: string): any {
    return this.http.post<{ result: string[] }>(BACKEND_URL + '/consulta', {sql, db: this.database});
  }

  getCubosIC(codigofun: string): Observable<any> {
    const sql = this.sqlList.getCubosIC(codigofun);
    return this.http.post<{ result: string[] }>(BACKEND_URL + '/consulta', {sql, db: this.database});
  }

  getLabelCubosIc(codigocubo: string): Observable<any> {
    const sql = this.sqlList.getLabelCubosIc(codigocubo);
    return this.http.post<{ result: string[] }>(BACKEND_URL + '/consulta', {sql, db: this.database});
  }

}
