export interface Marca {
    marca: string,
    total: number
}

export interface AnoModelo {
    ano: string,
    total: number
}

export interface PropriLegal {
    proprietario: string,
    total: number
}

export interface Unidade {
    unidade: string,
    total: number
}

export interface Departamento {
    departamento: string,
    total: number
}

export interface GrupoGerencial {
    grupo: string,
    total: number
}

export interface Situacao {
    situacao: string,
    total: number
}

export interface Faixakms {
    situacao: string,
    total: number
}

export interface Tabelakms {
    placa: string,
    faixa: string,
    km: string
}

export interface Veiculo {
    plate: string,
    Marca: string,
    Modelo: string,
    AnoModelo: string,
    Combustivel: string,
    codTransmission: string,
    name: string,
    dataInicio: string,
    dataFim: string
}