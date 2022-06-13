import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Turma, TurmaPayload } from '../entities/turma.entity';
import { MsgResponse } from '../entities/msg-response.entity';

@Injectable()
export class TurmaService {

  constructor(private http: HttpClient) { }

  getAllTurmas(){
     return this.http.get<Turma[]>(`${environment.api}turmas`)
  }

  getOneTurma(nomeTurma: string) {
    return this.http.post<Turma[]>(`${environment.api}turmas`, { params: { nomeTurma } })
  }

  salvarTurma(body: TurmaPayload){
    return this.http.post<MsgResponse>(`${environment.api}turmas`, body)
  }

  deleteTurma(id: string){
    return this.http.delete<MsgResponse>(`${environment.api}turmas/${id}`)
  }
  
}
