export interface itemmanutencao {
  id: number,
  tipo: string,
  item: string,
  informacao: string,
  valor: string | null
}

export interface listaatendimento {
  atendimento: string,
  seqos: string,
  ordemexterna: string,
  placa: string,
  motivo: string,
  valor: string,
  dtaprovacao: string,
  dtfechamento: string
}


export type resultResponse = {
  id: number,
  result: string
}