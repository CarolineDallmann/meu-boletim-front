import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Atividade, AtividadeResponse, BuscaNota, BuscaNotaResponse, SalvarAtividadePayload, } from '../entities/atividade.entity';
import { MsgResponse } from '../entities/msg-response.entity';
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
        tipo: TipoAtividade[ativ.tipo as keyof typeof TipoAtividade],
        data: new Date(ativ.data)
      }
    })
  }

  deleteAtividade(atividadeId: string) {
    return this.http.delete<MsgResponse>(`${environment.api}atividade`, { params: { atividadeId } })
  }

  getBuscarNota(params: { atividadeId?: string, turmaId?: string }) {
    return this.http.get<BuscaNotaResponse>(`${environment.api}buscar-nota`, { params })
  }

  buscaNotaResponseToBuscaNota(buscaNotaResponse: BuscaNotaResponse): BuscaNota {
    return {
      ...buscaNotaResponse,
      dataAtividade: new Date(buscaNotaResponse.dataAtividade || ''),
      tipoAtividade: TipoAtividade[buscaNotaResponse.tipoAtividade as keyof typeof TipoAtividade]
    }
  }

  salvarAtividade(body: SalvarAtividadePayload) {
    return this.http.post<MsgResponse>(`${environment.api}salvar-atividade`, body)
  }
}
