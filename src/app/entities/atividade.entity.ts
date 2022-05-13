import { TipoAtividade } from "../enums/tipo-atividade.enum"

export type Atividade = {
    id: string,
    tipoAtividade: TipoAtividade,
    dataAtividade: Date
}

export type AtividadeResponse = {
    id: string,
    tipoAtividade: string,
    dataAtividade: string
}