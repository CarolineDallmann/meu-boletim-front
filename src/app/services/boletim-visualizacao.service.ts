import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import {
  Boletim,
  BoletimResponse,
  ConfigEscola,
  ConfigEscolaResponse
} from '../entities/boletim.entity';
import { Materia } from '../entities/materia.entity';
import { MsgResponse } from '../entities/msg-response.entity';
import { BuscaFilhoResponse } from '../entities/pessoa.entity';
import { ResultadoBoletim } from '../enums/resultado-boletim.enum';

@Injectable()
export class BoletimVisualizacaoService {
  constructor(private http: HttpClient) {}

  getBuscarFilhos(id: string) {
    return this.http.get<BuscaFilhoResponse[]>(
      `${environment.api}pessoas/consultar-filhos`,
      { params: { id } }
    );
  }

  configEscolaResponseToConfigEscola(
    configEscolaResponse: ConfigEscolaResponse
  ): ConfigEscola {
    return {
      ...configEscolaResponse,
      inicioBim1: new Date(configEscolaResponse.inicioBim1),
      fimBim1: new Date(configEscolaResponse.fimBim1),
      inicioBim2: new Date(configEscolaResponse.inicioBim2),
      fimBim2: new Date(configEscolaResponse.fimBim2),
      inicioBim3: new Date(configEscolaResponse.inicioBim3),
      fimBim3: new Date(configEscolaResponse.fimBim3),
      inicioBim4: new Date(configEscolaResponse.inicioBim4),
      fimBim4: new Date(configEscolaResponse.fimBim4)
    };
  }
  getConfigEscola() {
    return this.http.get<ConfigEscolaResponse>(
      `${environment.api}config-escola`
    );
  }

  postConfigEscola(body: ConfigEscola) {
    return this.http.post<MsgResponse>(`${environment.api}config-escola`, body);
  }

  getBoletim(alunoId: string, anoLetivo: number) {
    return this.http.get<BoletimResponse[]>(`${environment.apijava}boletim`, {
      params: { alunoId, anoLetivo }
    });
  }

  preparaBoletim(
    boletim: BoletimResponse[],
    materias: Materia[],
    configEscola: ConfigEscola
  ): Boletim[] {
    const dataAtual = environment.datateste
      ? new Date(environment.datateste)
      : new Date();
    const mostrarFinal = dataAtual > configEscola.fimBim4;

    return boletim.map((b) => {
      return {
        ...b,
        materia: materias.find((m) => m.id === b.materiaId)?.nome || '',
        mediaFinal: mostrarFinal ? this.mediaFinal(b).toString() : '',
        resultado: mostrarFinal
          ? this.resultadoParcial(b, configEscola)
          : ResultadoBoletim.INDETERMINADO
      };
    });
  }

  mediaFinal({
    notaBim1,
    notaBim2,
    notaBim3,
    notaBim4
  }: BoletimResponse): number {
    return (notaBim1 + notaBim2 + notaBim3 + notaBim4) / 4;
  }

  freqAprovacao(
    { frequenciaAprovacao }: ConfigEscola,
    {
      qtdeFaltaBim1,
      qtdeFaltaBim2,
      qtdeFaltaBim3,
      qtdeFaltaBim4,
      qtdePresenca
    }: BoletimResponse
  ): boolean {
    const qtdeAulas =
      qtdeFaltaBim1 +
      qtdeFaltaBim2 +
      qtdeFaltaBim3 +
      qtdeFaltaBim4 +
      qtdePresenca;
    const freqEsperada = (qtdeAulas * frequenciaAprovacao) / 100;
    if (qtdePresenca < freqEsperada) {
      return false;
    }
    return true;
  }

  resultadoParcial(b: BoletimResponse, config: ConfigEscola) {
    if (
      this.mediaFinal(b) >= config.mediaAprovacao &&
      this.freqAprovacao(config, b)
    ) {
      return ResultadoBoletim.APROVADO;
    }
    if (
      this.mediaFinal(b) >= config.mediaAprovacao &&
      !this.freqAprovacao(config, b)
    ) {
      return ResultadoBoletim.REPROVADO_POR_FALTAS;
    }
    return ResultadoBoletim.REPROVADO;
  }

  avFinal(bol: Boletim[]): ResultadoBoletim {
    if (bol.find((b) => b.resultado === ResultadoBoletim.REPROVADO)) {
      return ResultadoBoletim.REPROVADO;
    }
    if (bol.every((b) => b.resultado === ResultadoBoletim.APROVADO)) {
      return ResultadoBoletim.APROVADO;
    }
    if (
      bol.every((b) => b.resultado === ResultadoBoletim.REPROVADO_POR_FALTAS)
    ) {
      return ResultadoBoletim.REPROVADO_POR_FALTAS;
    }
    return ResultadoBoletim.INDETERMINADO;
  }
}
