import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cadastrar-pessoa',
  templateUrl: './cadastrar-pessoa.component.html',
  styleUrls: ['./cadastrar-pessoa.component.scss']
})
export class CadastrarPessoaComponent implements OnInit {

  public cadastroPessoa: FormGroup = new FormGroup({});
  generos: string[] = ['FEMININO', 'MASCULINO', 'OUTRO'];
  generoSelecionado: string = '';

  emailValidator = [Validators.maxLength(250), Validators.minLength(5), Validators.pattern(/.+@.+\..+/), Validators.required];


  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.cadastroPessoa = this.fb.group({
      nome: ['', [Validators.required]],
      generoSelecionado: ['', [Validators.required]], 
      datanasc: ['', [Validators.required]],
      cep: ['', [Validators.required]],
      rua: ['', [Validators.required]],
      numero: ['', [Validators.required]],
      cidade: ['', [Validators.required]],
      bairro: ['', [Validators.required]],
      uf: ['', [Validators.required]],
      telefone: ['', [Validators.required]],
      email: ['', this.emailValidator],
      login: ['', [Validators.required]],
      senha: ['', [Validators.required]],
      status: ['']
    });
  }

  onSubmit() {
    this.cadastroPessoa.value.datanasc = this.dataFormat(this.cadastroPessoa.value.datanasc);
    console.log(this.cadastroPessoa.value);
  }

  dataFormat(data: Date) {
    let dia = data.getDate();
    let mes = data.getMonth()+1;
    let ano = data.getFullYear();
    return(dia+"/"+mes+"/"+ano);
  }

}
