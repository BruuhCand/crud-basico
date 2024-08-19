export interface User {
    id: number,
    nome?: string, 
    cpf: string,
    data_nasc: Date | null,
    sex?: string
}
