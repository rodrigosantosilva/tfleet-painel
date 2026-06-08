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

export interface ChartModel {
    data: any[],
    type: any,
    options: any,
    view?: any,
    names?: any
}