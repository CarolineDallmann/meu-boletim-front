import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DataStoreService } from '../data-storage';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  loginInput = ""
  senhaInput = ""
  erro = ""
  centerXSmall = { left: 0, right: 0, 'margin-left': 'auto', 'margin-right': 'auto', 'width': '75%' }
  centerSmall = { left: 0, right: 0, 'margin-left': 'auto', 'margin-right': 'auto', 'width': '60%' }

  constructor(private loginService: LoginService, private dataStorage: DataStoreService) { }

  ngOnInit(): void {
  }

  onLoginChange(event: Event) {
    this.loginInput = ((event.target as HTMLInputElement).value)
  }

  onSenhaChange(event: Event) {
    this.senhaInput = ((event.target as HTMLInputElement).value)
  }

  keypress(event: KeyboardEvent) {
    if (event.key === "Enter") {
      this.login()
    }
  }

  login() {
    this.loginService.postLogin({ login: this.loginInput, senha: this.senhaInput }).subscribe({
      next: (res) => {
        this.dataStorage.updateUsuario(res)
      },
      error: (error) => { this.erro = "Usuário ou senha não encontrado" }
    })

  }

}
