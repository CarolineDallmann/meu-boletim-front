import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Atividade, AtividadeResponse } from '../entities/atividade.entity';
import { TipoAtividade } from '../enums/tipo-atividade.enum';

@Injectable()
export class NotaService {

  constructor(private http: HttpClient) { }

  getListarAtividades(turmaId: string, materiaId: string) {
    return this.http.get<AtividadeResponse[]>(`${environment.api}listar-atividades`, { params: { turmaId, materiaId } })
  }

  atividadeResponseToAtividade(atividades: AtividadeResponse[]): Atividade[] {
    return atividades.map((ativ) => {
      return {
        id: ativ.id,
        tipoAtividade: TipoAtividade[ativ.tipoAtividade as keyof typeof TipoAtividade],
        dataAtividade: new Date(ativ.dataAtividade)
      }
    })
  }
}
