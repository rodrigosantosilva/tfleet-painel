export interface itemmanutencao {
    id: number,
    tipo: string,
    item: string,
    informacao: string,
    valor: string | null
}

export type resultResponse = {
  id : number,
  result: string
}