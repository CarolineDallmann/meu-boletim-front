import { Serie } from "../enums/serie.enum"
import { TipoPessoa } from "../enums/tipo-pesssoa.enum"
import { Turno } from "../enums/turno.enum"

export type Pessoa = {
    id: string,
    nome: string,
    genero: string,
    datanasc: string,
    cep: string,
    rua: string,
    numero: number,
    bairro: string,
    cidade: string,
    uf: string,
    telefone: string,
    email: string,
    login: string,
    senha: string,
    status: string,
    tipo_pessoa: string
}

export type BuscaFilhoResponse = {
    id: string,
    nome: string,
    serie: Serie,
    turma: string,
    turno: Turno
}

export type PessoaLocalStorage = {
    id: string
    nome: string
    serie: Serie
    tipoPessoa: TipoPessoa
    token: string
    turma: string
    turno: Turno
}