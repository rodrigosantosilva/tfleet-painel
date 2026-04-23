import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { AESEncryptDecryptService } from '../services/aesencrypt-decrypt.service';
import { FrotaSQL } from '../sql/frota-repository';
import { Status } from '../types/servicos-response.type';
import {
  Marca,
  AnoModelo,
  PropriLegal,
  Unidade,
  Departamento,
  GrupoGerencial,
  Situacao,
  Faixakms,
  Tabelakms,
  Veiculo
} from '../types/frota-response.type';

const BACKEND_URL = environment.apiUrl + '/consulta';
const FACIL_ASSIST_APOLICE = environment.apiUrl + '/facil';
const BACKEND_INSERT_URL = environment.apiUrl + '/insert';

@Injectable({
  providedIn: 'root'
})
export class FrotasService {
  database = localStorage.getItem('gerencial_db');

  constructor(private http: HttpClient,
              private sqlList: FrotaSQL,
              private crypto: AESEncryptDecryptService) {}

  // marca
  generateMarca(): Observable<any> {
    const sql = this.sqlList.marcaSQL(this.crypto.decrypt(localStorage.getItem('empresa')!),
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
    return this.http.post<{ result: Marca[] }>(BACKEND_URL + '/consulta', {
      sql, db: this.database
    });
  }

  // ano
  generateAno(): Observable<any> {
    const sql = this.sqlList.anoSQL(this.crypto.decrypt(localStorage.getItem('empresa')!),
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
    return this.http.post<{ result: AnoModelo[] }>(BACKEND_URL + '/consulta', {
      sql, db: this.database
    });
  }

  // proprietario legal
  generateProprietario(): Observable<any> {
    const sql = this.sqlList.proprietarioSQL(this.crypto.decrypt(localStorage.getItem('empresa')!),
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
    return this.http.post<{ result: PropriLegal[] }>(
      BACKEND_URL + '/consulta', {
        sql, db: this.database
      }
    );
  }

  // unidade
  generateUnidade(): Observable<any> {
    const sql = this.sqlList.unidadeSQL(this.crypto.decrypt(localStorage.getItem('empresa')!),
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
    return this.http.post<{ result: Unidade[] }>(BACKEND_URL + '/consulta', {
      sql, db: this.database
    });
  }

  // departamento
  generatDepartamento(): Observable<any> {
    const sql = this.sqlList.departamentoSQL(this.crypto.decrypt(localStorage.getItem('empresa')!),
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
    return this.http.post<{ result: Departamento[] }>(
      BACKEND_URL + '/consulta', {
        sql, db: this.database
      });
  }

  // grupo
  generateGrupo(): Observable<any> {
    const sql = this.sqlList.grupoSQL(this.crypto.decrypt(localStorage.getItem('empresa')!),
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
    return this.http.post<{ result: GrupoGerencial[] }>(
      BACKEND_URL + '/consulta', {
        sql, db: this.database
      });
  }
  // situacao
  generateSituacao(): Observable<any> {
    const sql = this.sqlList.situacaoSQL(this.crypto.decrypt(localStorage.getItem('empresa')!),
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
    return this.http.post<{ result: Situacao[] }>(BACKEND_URL + '/consulta', {
      sql, db: this.database
    });
  }

  // faixakm
  generateFaixaKM(): Observable<any> {
    const sql = this.sqlList.faixakmSQL(this.crypto.decrypt(localStorage.getItem('empresa')!),
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
    return this.http.post<{ result: Faixakms[] }>(BACKEND_URL + '/consulta', {
      sql, db: this.database
    });
  }
  //tabelakm
  generateTabelaKM(): Observable<any> {
    const sql = this.sqlList.tabelakmSQL(this.crypto.decrypt(localStorage.getItem('empresa')!),
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

    return this.http.post<{ result: Tabelakms[] }>(BACKEND_URL + '/consulta', {
      sql, db: this.database
    });
  }

  generatAll(): Observable<any> {
    const sql = this.sqlList.allSQL(this.crypto.decrypt(localStorage.getItem('empresa')!),
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
    return this.http.post<{ result: Status[] }>(BACKEND_URL + '/consulta', {sql, db: this.database});
  }

  getLabels(): Observable<any> {
    const sql = this.sqlList.labelsSQL();
    return this.http.post<{ result: string[] }>(BACKEND_URL + '/consulta', {sql, db: this.database});
  }

  getLabelsR(): Observable<any> {
    const sql = this.sqlList.labelsSQLR();
    return this.http.post<{ result: string[] }>(BACKEND_URL + '/consulta', {sql, db: this.database});
  }

  registerVehicle(vehicle: Veiculo) {  
    const plate: string = vehicle['plate'];
    const Marca: string = vehicle['Marca'];
    const Modelo: string= vehicle['Modelo'];
    const AnoModelo: string = vehicle['AnoModelo'];
    const Combustivel: string = vehicle['Combustivel'];
    const codTransmission: string = vehicle['codTransmission'];
    const name: string = vehicle['name'];
    const dataInicio: string = vehicle['dataInicio'];
    const dataFim: string = vehicle['dataFim'];  
    return this.http.post<{result: string, success: string}>(FACIL_ASSIST_APOLICE + '/register-apolice', 
      {plate, Marca, Modelo, AnoModelo, Combustivel, codTransmission, name, dataInicio, dataFim});

  }

  setVehicle(plate: string, apolice: string): void {   
    const sql = this.sqlList.vehicleSQL(plate, apolice);
    this.http.post<{ result: any[] }>(BACKEND_INSERT_URL + '/insert', {sql, db: this.database}).subscribe(resultado => {
    }, erro => {
      console.error('Erro ao inserir dados');
    });
  }

}
