import { TipoAtividade } from "../enums/tipo-atividade.enum"
import { Materia } from "./materia.entity"
import { Pessoa } from "./pessoa.entity"
import { Turma } from "./turma.entity"

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

export type NotaAtividade = {
    aluno: Pessoa,
    nota?: number
}

export type BuscaNota = {
    turma: Turma,
    dataAtividade?: Date,
    tipoAtividade?: TipoAtividade,
    materia?: Materia
    notas: NotaAtividade[]
}
export type BuscaNotaResponse = {
    turma: Turma,
    dataAtividade?: string,
    tipoAtividade?: string,
    materia?: Materia
    notas: NotaAtividade[]
}

export type SalvarAtividadePayload = {
    atividadeId?: string,
    turmaId: string,
    dataAtividade: string,
    tipoAtividade: string,
    materiaId: string,
    notas: { alunoId: string, nota: number }[]
}