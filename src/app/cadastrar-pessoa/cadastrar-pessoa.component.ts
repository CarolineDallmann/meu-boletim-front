import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Materia } from '../entities/materia.entity';
import { Pessoa } from '../entities/pessoa.entity';
import { Turma } from '../entities/turma.entity';
import { Genero } from '../enums/genero.enum';
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
  generos: string[] = Object.values(Genero);
  generoSelecionado = '';
  checked = true;
  tipoPessoa: Array<any> = [
    { nome: 'Aluno', value: 'ALUNO' },
    { nome: 'Responsável', value: 'RESPONSAVEL' },
    { nome: 'Professor', value: 'PROFESSOR' },
    { nome: 'Secretaria', value: 'SECRETARIA' }
  ];
  turmas: Turma[] = [];
  materias: Materia[] = [];
  condicaoPessoa = '';
  listaResponsaveis: Pessoa[] = [];
  tipo: any;

  configSenha = `A senha deve conter, no mínino, 8 caracteres da seguinte forma:
    - Pelo menos 1 letra MAIÚSCULA;
    - Pelo menos 1 letra minúscula;
    - Pelo menos 1 número;
    - E caracter especial do tipo: !@#$`;

  emailValidator = [
    Validators.maxLength(250),
    Validators.minLength(5),
    Validators.pattern(/.+@.+\..+/),
    Validators.required
  ];
  senhaValidador = [
    Validators.pattern('^[0-9a-zA-Z!@#$]{8,}$'),
    Validators.required
  ];

  constructor(
    private fb: FormBuilder,
    private pessoaService: PessoaService,
    private turmaService: TurmaService,
    private materiaService: MateriaService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.tipo = this.route.snapshot.queryParamMap.get('tipoPessoa');
    this.turmaService.getAllTurmas().subscribe((turmas) => {
      this.turmas = turmas;
    });
    this.materiaService.getAllMaterias().subscribe((materia) => {
      this.materias = materia;
    });
    this.createForm();
    this.condicaoPessoa = this.cadastroPessoa.value.tipo_pessoa;
    this.findPessoa('');
    this.cadastroPessoa
      .get('responsavel')
      ?.valueChanges.subscribe((filterValue) => this.findPessoa(filterValue));
  }

  findPessoa(value: string) {
    this.pessoaService
      .getAllPessoas(value, 'RESPONSAVEL', false)
      .subscribe((pessoas) => {
        this.listaResponsaveis = pessoas;
      });
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
      nome_mae: [''],
      nome_pai: [''],
      responsavel: [''],
      turmaSelecionada: [''],
      materia: ['']
    });
  }

  onSubmit() {
    if (this.cadastroPessoa.valid) {
      this.pessoaService
        .savePessoa({
          ...this.cadastroPessoa.value,
          datanasc: this.dataFormat(this.cadastroPessoa.value.datanasc)
        })
        .subscribe({
          next: (res) => {
            this.snackBar.open(res.msg, undefined, { duration: 4000 });
            if (this.cadastroPessoa.value.tipo_pessoa === 'ALUNO') {
              this.router.navigate(['/alunos']);
            } else if (
              this.cadastroPessoa.value.tipo_pessoa === 'RESPONSAVEL'
            ) {
              this.router.navigate(['/responsaveis']);
            } else if (this.cadastroPessoa.value.tipo_pessoa === 'PROFESSOR') {
              this.router.navigate(['/professores']);
            } else if (this.cadastroPessoa.value.tipo_pessoa === 'SECRETARIA') {
              this.router.navigate(['/secretaria']);
            }
          },
          error: (err) => {
            this.snackBar.open(err.error.msg, undefined, { duration: 5000 });
          }
        });
    }
  }

  dataFormat(data: Date) {
    return `${data.getFullYear()}-${data.getMonth() + 1}-${data.getDate()}`;
  }

  changeTipoPessoa(event: any) {
    this.condicaoPessoa = event.value;
    this.cadastroPessoa.value.tipo_pessoa = this.condicaoPessoa;

    if (this.condicaoPessoa === 'ALUNO') {
      this.router.navigate([`alunos/cadastro/`], {
        queryParams: { tipoPessoa: this.condicaoPessoa }
      });
    }
    if (this.condicaoPessoa === 'RESPONSAVEL') {
      this.router.navigate([`responsaveis/cadastro/`], {
        queryParams: { tipoPessoa: this.condicaoPessoa }
      });
    }
    if (this.condicaoPessoa === 'PROFESSOR') {
      this.router.navigate([`professores/cadastro/`], {
        queryParams: { tipoPessoa: this.condicaoPessoa }
      });
    }
    if (this.condicaoPessoa === 'SECRETARIA') {
      this.router.navigate([`secretaria/cadastro/`], {
        queryParams: { tipoPessoa: this.condicaoPessoa }
      });
    }
  }

  getNome(responsavelId: string) {
    return (
      this.listaResponsaveis.find((r) => r.id === responsavelId)?.nome || ''
    );
  }
}
