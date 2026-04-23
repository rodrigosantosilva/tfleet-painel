export interface Login {
  codigofun: string|null;
  nome: string|null;
  empresa: string|null;
  gerencial: string|null;
  contrato: string|null;
  grupoAcesso: string|null;
  baseweb: string|null;
  urlweb: string|null;
  basesc: string|null;
  urlsc: string|null;
  baseic: string|null;
  urlic: string|null;
}

export interface Auth {
  usuario: string;
  senha: string;
  grupoAcesso: string;
  sql: string;
  db: string;
}

export interface AuthPlataform {
  codigousuario: string;
  grupoAcesso: string;
  sql: string;
  db: string;
}
