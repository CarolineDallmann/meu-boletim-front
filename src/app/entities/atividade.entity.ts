import { TipoAtividade } from "../enums/tipo-atividade.enum"

export type Atividade = {
    id: string,
    tipo: TipoAtividade,
    data: Date
}

export type AtividadeResponse = {
    id: string,
    tipo: string,
    data: string
}