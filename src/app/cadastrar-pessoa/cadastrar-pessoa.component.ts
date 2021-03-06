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
  formPessoa: FormGroup = new FormGroup({});

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
  pessoaId: any;
  acao: string | null = '';
  isLoad = false;

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
    Validators.pattern(
      '^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$])[0-9a-zA-Z!@#$]{8,}$'
    ),
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
    this.pessoaId = this.route.snapshot.queryParamMap.get('pessoaId');

    this.acao = this.pessoaId !== null ? 'EDITAR' : 'CADASTRAR';

    this.turmaService.getAllTurmas().subscribe((turmas) => {
      this.turmas = turmas;
    });
    this.materiaService.getAllMaterias().subscribe((materia) => {
      this.materias = materia;
    });

    if (this.acao === 'CADASTRAR') {
      this.isLoad = true;
      this.createFormCadastrar();
      this.condicaoPessoa = this.formPessoa.value.tipo_pessoa;
      this.findPessoa('');
      this.formPessoa
        .get('responsavel')
        ?.valueChanges.subscribe((filterValue) => this.findPessoa(filterValue));
    } else if (this.acao === 'EDITAR') {
      this.findPessoaEdit('').subscribe((pessoa) => {
        this.listaResponsaveis = pessoa;
        this.loadPessoa();
      });
    }
  }

  findPessoa(value: string) {
    this.pessoaService
      .getAllPessoas(value, 'RESPONSAVEL', false)
      .subscribe((pessoas) => {
        this.listaResponsaveis = pessoas;
      });
  }

  findPessoaEdit(value: string) {
    return this.pessoaService.getAllPessoas(value, 'RESPONSAVEL', false);
  }

  loadPessoa() {
    this.pessoaService.getPessoaById(this.pessoaId).subscribe((pessoa) => {
      this.isLoad = true;
      this.createFormEditar(pessoa);
    });
  }

  createFormCadastrar() {
    this.formPessoa = this.fb.group({
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

  createFormEditar(pessoa: any) {
    this.formPessoa = this.fb.group({
      tipo_pessoa: [pessoa.tipo_pessoa, [Validators.required]],
      nome: [pessoa.nome, [Validators.required]],
      genero: [pessoa.genero, [Validators.required]],
      datanasc: [new Date(pessoa.datanasc), [Validators.required]],
      cep: [pessoa.cep, [Validators.required]],
      rua: [pessoa.rua, [Validators.required]],
      numero: [pessoa.numero, [Validators.required]],
      cidade: [pessoa.cidade, [Validators.required]],
      bairro: [pessoa.bairro, [Validators.required]],
      uf: [pessoa.uf, [Validators.required]],
      telefone: [pessoa.telefone, [Validators.required]],
      email: [pessoa.email, this.emailValidator],
      login: [pessoa.login, [Validators.required]],
      senha: [''],
      ativo: [pessoa.ativo],
      nome_mae: [pessoa.nome_mae],
      nome_pai: [pessoa.nome_pai],
      responsavel: [pessoa.responsavel],
      turmaSelecionada: [pessoa.turma],
      materia: [pessoa.materia]
    });
    this.condicaoPessoa = pessoa.tipo_pessoa;
    this.checked = pessoa.ativo;
    this.formPessoa.get('responsavel')?.valueChanges.subscribe((filterValue) =>
      this.findPessoaEdit(filterValue).subscribe((pessoa) => {
        this.listaResponsaveis = pessoa;
      })
    );
  }

  onSubmit() {
    if (this.formPessoa.valid) {
      if (this.acao === 'EDITAR') {
        this.pessoaService
          .updatePessoa(
            {
              ...this.formPessoa.value,
              datanasc: this.dataFormat(this.formPessoa.value.datanasc)
            },
            this.pessoaId
          )
          .subscribe({
            next: (res) => {
              this.snackBar.open(res.msg, undefined, { duration: 4000 });
              if (this.formPessoa.value.tipo_pessoa === 'ALUNO') {
                this.router.navigate(['/alunos']);
              } else if (this.formPessoa.value.tipo_pessoa === 'RESPONSAVEL') {
                this.router.navigate(['/responsaveis']);
              } else if (this.formPessoa.value.tipo_pessoa === 'PROFESSOR') {
                this.router.navigate(['/professores']);
              } else if (this.formPessoa.value.tipo_pessoa === 'SECRETARIA') {
                this.router.navigate(['/secretaria']);
              }
            },
            error: (err) => {
              this.snackBar.open(err.error.msg, undefined, { duration: 5000 });
            }
          });
      } else if (this.acao === 'CADASTRAR') {
        this.pessoaService
          .savePessoa({
            ...this.formPessoa.value,
            datanasc: this.dataFormat(this.formPessoa.value.datanasc)
          })
          .subscribe({
            next: (res) => {
              this.snackBar.open(res.msg, undefined, { duration: 4000 });
              if (this.formPessoa.value.tipo_pessoa === 'ALUNO') {
                this.router.navigate(['/alunos']);
              } else if (this.formPessoa.value.tipo_pessoa === 'RESPONSAVEL') {
                this.router.navigate(['/responsaveis']);
              } else if (this.formPessoa.value.tipo_pessoa === 'PROFESSOR') {
                this.router.navigate(['/professores']);
              } else if (this.formPessoa.value.tipo_pessoa === 'SECRETARIA') {
                this.router.navigate(['/secretaria']);
              }
            },
            error: (err) => {
              this.snackBar.open(err.error.msg, undefined, { duration: 5000 });
            }
          });
      }
    }
  }

  dataFormat(data: Date) {
    return `${data.getFullYear()}-${data.getMonth() + 1}-${data.getDate()}`;
  }

  changeTipoPessoa(event: any) {
    this.condicaoPessoa = event.value;
    this.formPessoa.value.tipo_pessoa = this.condicaoPessoa;

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

  changeSenha() {
    this.formPessoa.controls['senha'].setValidators(this.senhaValidador);
  }
}
