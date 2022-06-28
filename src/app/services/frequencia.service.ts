import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import {
  FrequenciaPayload,
  FrequenciaResponse
} from '../entities/frequencia.entity';
import { MsgResponse } from '../entities/msg-response.entity';

@Injectable()
export class FrequenciaService {
  constructor(private http: HttpClient) {}

  getBuscarFrequencia(turmaId: string, materiaId: string, data: string) {
    return this.http.get<FrequenciaResponse[]>(
      `${environment.api}frequencia/buscar-frequencia`,
      { params: { turmaId, materiaId, data } }
    );
  }

  salvarFrequencia(body: FrequenciaPayload) {
    return this.http.post<MsgResponse>(
      `${environment.api}frequencia/salvar-frequencia`,
      body
    );
  }
}
