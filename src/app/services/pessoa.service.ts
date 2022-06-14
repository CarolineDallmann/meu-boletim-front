import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MsgResponse } from '../entities/msg-response.entity';
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
    return this.http.post<MsgResponse>(`${environment.api}pessoas`, pessoa);
  }

  getPessoaById(id: string) {
    return this.http.get<Observable<any>>(`${environment.api}pessoas/${id}`);
  }

  updatePessoa(pessoa: Pessoa, pessoaId: string) {
    return this.http.put<MsgResponse>(`${environment.api}pessoas/${pessoaId}`, pessoa);
  }
}
