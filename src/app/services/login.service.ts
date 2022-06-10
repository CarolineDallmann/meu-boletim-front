import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { PessoaLocalStorage } from '../entities/pessoa.entity';

@Injectable()
export class LoginService {

  constructor(private http: HttpClient) { }

  postLogin(body: {login: string, senha: string}){
     return this.http.post<PessoaLocalStorage>(`${environment.api}pessoas/login`, body)
  }

 
}
