import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Turma } from '../entities/turma.entity';

@Injectable()
export class TurmaService {

  constructor(private http: HttpClient) { }

  getAllTurmas(){
     return this.http.get<Turma[]>(`${environment.api}turmas`)
  }
}
