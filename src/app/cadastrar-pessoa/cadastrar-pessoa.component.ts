import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Pessoa } from '../entities/pessoa.entity';
import { Turma } from '../entities/turma.entity';
import { PessoaService } from '../services/pessoa.service';
import { TurmaService } from '../services/turma.service';

@Component({
  selector: 'app-cadastrar-pessoa',
  templateUrl: './cadastrar-pessoa.component.html',
  styleUrls: ['./cadastrar-pessoa.component.scss']
})
export class CadastrarPessoaComponent implements OnInit {

  cadastroPessoa: FormGroup = new FormGroup({});
  generos: string[] = ['FEMININO', 'MASCULINO', 'OUTRO'];
  generoSelecionado: string = '';
  checked: boolean = false;
  tipoPessoa: Array<any> = [
    { nome: 'Aluno', value: 'ALUNO' },
    { nome: 'Responsável', value: 'RESPONSAVEL' },
    { nome: 'Professor', value: 'PROFESSOR' },
    { nome: 'Secretaria', value: 'SECRETARIA' }
  ];
  turmas: Turma[] = [];
  pessoa = '';
  listaResponsaveis: any = {};

  path = window.location.pathname; 
  tipo = this.path.split('/')[2]; 

  emailValidator = [Validators.maxLength(250), Validators.minLength(5), Validators.pattern(/.+@.+\..+/), Validators.required];
  senhaValidador = [Validators.pattern('^[0-9a-zA-Z]{8,}$'), Validators.required];

  constructor(private fb: FormBuilder, private pessoaService: PessoaService, private turmaService: TurmaService) { }

  ngOnInit(): void {
    this.checked = true;
    this.turmaService.getAllTurmas().subscribe((turmas) => { this.turmas = turmas })
    this.createForm();
    this.pessoa = this.cadastroPessoa.value.tipo_pessoa;
    this.pessoaService.getAllPessoas('', 'RESPONSAVEL', true).subscribe(pessoa => {this.listaResponsaveis = pessoa; console.log(this.listaResponsaveis)})
  }

  createForm() {
    this.cadastroPessoa = this.fb.group({
      nome: ['', [Validators.required]],
      genero: ['', [Validators.required]], 
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
      senha: ['', this.senhaValidador],
      status: [''],
      tipo_pessoa: [this.tipo, [Validators.required]],
      nome_mae: [''],
      nome_pai: [''],
      responsavel: [''],
      turmaSelecionada: ['']
    });
  }

  onSubmit() {
    this.cadastroPessoa.value.datanasc = this.dataFormat(this.cadastroPessoa.value.datanasc);
    console.log(this.cadastroPessoa.value);
    this.pessoaService.savePessoa(this.cadastroPessoa.value).subscribe(data => {console.log(data);})
  }

  dataFormat(data: Date) {
    let dia = data.getDate();
    let mes = data.getMonth()+1;
    let ano = data.getFullYear();
    return(ano+"-"+mes+"-"+dia);
  }

  changeTipoPessoa(event: any) {
    console.log(event.value);
    this.pessoa = event.value;
  }

}
