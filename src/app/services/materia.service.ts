import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Materia } from '../entities/materia.entity';

@Injectable()
export class MateriaService {

  constructor(private http: HttpClient) { }

  getAllMaterias(){
     return this.http.get<Materia[]>(`${environment.api}materias`)
  }
}
