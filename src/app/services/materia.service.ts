import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Materia, MateriaPayload } from '../entities/materia.entity';
import { MsgResponse } from '../entities/msg-response.entity';

@Injectable()
export class MateriaService {

  constructor(private http: HttpClient) { }

  getAllMaterias(){
     return this.http.get<Materia[]>(`${environment.api}materias`)
  }

  getPorIdMateria(materiaId: string){
    return this.http.get<Materia>(`${environment.api}materias/${materiaId}`)
  }

  salvarMateria(body: MateriaPayload){
    return this.http.post<MsgResponse>(`${environment.api}materias`, body)
  }

  deleteMateria(id: string){
    return this.http.delete<MsgResponse>(`${environment.api}materias/${id}`)
  }
}
