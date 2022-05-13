import { Serie } from "../enums/serie.enum"
import { Turno } from "../enums/turno.enum"

export type Turma = {
    id: string,
    nome: string,
    anoLetivo: number,
    turno: Turno,
    serie: Serie
}