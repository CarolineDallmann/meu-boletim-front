import { ResultadoBoletim } from "../enums/resultado-boletim.enum"

type ConfigEscolaBase<T extends string | Date> = {
    inicioBim1: T,
    fimBim1: T,
    inicioBim2: T,
    fimBim2: T,
    inicioBim3: T,
    fimBim3: T,
    inicioBim4: T,
    fimBim4: T,
    mediaAprovacao: number,
    frequenciaAprovacao: number
}

export type ConfigEscolaResponse = ConfigEscolaBase<string>

export type ConfigEscola = ConfigEscolaBase<Date>

export type BoletimResponse = {
    materiaId: string,
    notaBim1: number,
    notaBim2: number,
    notaBim3: number,
    notaBim4: number,
    qtdeFaltaBim1: number,
    qtdeFaltaBim2: number,
    qtdeFaltaBim3: number,
    qtdeFaltaBim4: number,
    qtdePresenca: number
}

export type Boletim = Omit<BoletimResponse, 'materiaId'> & {
    mediaFinal: string,
    resultado: ResultadoBoletim,
    materia: string
}



