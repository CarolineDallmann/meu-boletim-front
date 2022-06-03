import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Materia } from '../entities/materia.entity';
import { Turma } from '../entities/turma.entity';
import { MateriaService } from '../services/materia.service';
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
  materias: Materia[] = [];
  pessoa = '';
  listaResponsaveis: any = {};

  path = window.location.pathname; 
  tipo = this.path.split('/')[2]; 

  emailValidator = [Validators.maxLength(250), Validators.minLength(5), Validators.pattern(/.+@.+\..+/), Validators.required];
  senhaValidador = [Validators.pattern('^[0-9a-zA-Z]{8,}$'), Validators.required];
  nome_maeValidator = [Validators.required];
  turmaValidator = [Validators.required];
  materiaValidator = [Validators.required];

  constructor(private fb: FormBuilder, private pessoaService: PessoaService, private turmaService: TurmaService, private materiaService: MateriaService) { }

  ngOnInit(): void {
    this.checked = true;
    this.turmaService.getAllTurmas().subscribe((turmas) => { this.turmas = turmas })
    this.materiaService.getAllMaterias().subscribe((materia) => { this.materias = materia})
    this.createForm();
    this.pessoa = this.cadastroPessoa.value.tipo_pessoa;
    this.pessoaService.getAllPessoas('', 'RESPONSAVEL', true).subscribe(pessoa => {this.listaResponsaveis = pessoa})
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
      ativo: [''],
      tipo_pessoa: [this.tipo, [Validators.required]],
      nome_mae: ['', this.nome_maeValidator],
      nome_pai: [''],
      responsavel: [''],
      turmaSelecionada: ['', this.turmaValidator],
      materia: ['', this.materiaValidator]
    });
  }

  onSubmit() {
    this.cadastroPessoa.value.datanasc = this.dataFormat(this.cadastroPessoa.value.datanasc);
    this.captureIdResponsavel(this.cadastroPessoa.value.responsavel);
    console.log(this.cadastroPessoa.value);
    //this.pessoaService.savePessoa(this.cadastroPessoa.value).subscribe(data => window.location.reload())
  }

  dataFormat(data: Date) {
    let dia = data.getDate();
    let mes = data.getMonth()+1;
    let ano = data.getFullYear();
    return(ano+"-"+mes+"-"+dia);
  }

  changeTipoPessoa(event: any) {
    this.pessoa = event.value;
    this.cadastroPessoa.reset();
  }

  captureIdResponsavel(nomeResp: String) {
    this.pessoaService.getAllPessoas('', 'RESPONSAVEL', true).subscribe(pessoa => {
      this.listaResponsaveis = pessoa;
      for (let i = 0; i < this.listaResponsaveis.length; i++) {
        if(this.listaResponsaveis[i].nome == nomeResp) {
          nomeResp = this.listaResponsaveis[i].id;
        }
      }
      this.cadastroPessoa.value.responsavel = nomeResp;
    })
  }

}
