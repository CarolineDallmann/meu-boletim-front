import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { PessoaLocalStorage } from './entities/pessoa.entity';
import { TipoPessoa } from './enums/tipo-pesssoa.enum';

@Injectable({ providedIn: 'root' })
export class DataStoreService {
  public isSmall = new BehaviorSubject(false);

  public usuarioConectado = new BehaviorSubject<PessoaLocalStorage | undefined>(
    undefined
  );

  constructor(private router: Router) {}

  updateUsuario(usuario: PessoaLocalStorage | undefined) {
    this.usuarioConectado.next(usuario);
    if (usuario) {
      localStorage.setItem('usuario', JSON.stringify(usuario));
      if (
        [TipoPessoa.ALUNO, TipoPessoa.RESPONSAVEL].includes(usuario.tipoPessoa)
      ) {
        this.router.navigate(['boletim']);
      } else {
        setTimeout(() => {
          if (
            this.router.url.includes('login') ||
            this.router.url.includes('boletim')
          ) {
            this.router.navigate(['']);
          } else {
            this.router.navigate([this.router.url.replace('/', '')]);
          }
        }, 10);
      }
    } else {
      localStorage.removeItem('usuario');
      this.router.navigate(['login']);
    }
  }
}
