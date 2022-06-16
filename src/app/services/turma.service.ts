import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { SalvarTurmaPayload, Turma } from '../entities/turma.entity';
import { MsgResponse } from '../entities/msg-response.entity';

@Injectable()
export class TurmaService {
  constructor(private http: HttpClient) {}

  getAllTurmas() {
    return this.http.get<Turma[]>(`${environment.api}turmas`);
  }

  getOneTurma(id: string) {
    return this.http.get<Turma>(`${environment.api}turmas/${id}`);
  }

  salvarTurma(body: SalvarTurmaPayload) {
    return this.http.post<MsgResponse>(`${environment.api}turmas`, body);
  }

  deleteTurma(id: string) {
    return this.http.delete<MsgResponse>(`${environment.api}turmas/${id}`);
  }
}
