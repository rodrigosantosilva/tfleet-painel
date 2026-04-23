export interface Resumo {
    abertos: number,
    fechados: number,
    total: number
}

export interface Status {
    status: string,
    total: number,
}

export interface StatusValor {
    status: string;
    total: number;
    valor: number;
}

export interface TopDez {
    estabelecimento: string;
    estado: string;
    atividade: string;
    qnt_os: number;
    valor: number;
}

export interface StatusValor {
    status: string;
    qnt_os: number;
    valor: number;
}

export interface StatusFormatado{
    status: string;
    qnt_os: number;
    valor: string;
}

export interface ListPrevent{
    placa: string;
    situacao: string;
}


export interface Vehicle {
    codTransmission: string;
    marca: string;
    modelo:  string;
    anoModelo: string;
    combustivel:  string;
    plate:  string;
    name :  string;
    dataInicio:  string;
    dataFim:  string;
}