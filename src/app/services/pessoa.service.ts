import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pessoa } from '../entities/pessoa.entity';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  constructor(private http: HttpClient) { }

  getAllPessoas(nome: string, tipo_pessoa: string, mostrarInativos: boolean) {
    return this.http.get<Pessoa[]>(`${environment.api}pessoas`, { params: { nome, tipo_pessoa, mostrarInativos } })
  }

  savePessoa(pessoa: Pessoa) {
    return this.http.post<Pessoa>(`${environment.api}pessoas`, pessoa);
  }
}
