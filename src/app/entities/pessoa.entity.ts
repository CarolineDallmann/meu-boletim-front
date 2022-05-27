import { Serie } from "../enums/serie.enum"
import { Turno } from "../enums/turno.enum"

export type Pessoa = {
    id: string,
    nome: string
}

export type BuscaFilhoResponse = {
    id: string,
    nome: string,
    serie: Serie,
    turma: string,
    turno: Turno
}