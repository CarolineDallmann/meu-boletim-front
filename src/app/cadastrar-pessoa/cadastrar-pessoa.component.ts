import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Materia } from '../entities/materia.entity';
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
  condicaoPessoa = '';
  listaResponsaveis: any = {};
  tipo: any;

  configSenha: string = `A senha deve conter, no mínino, 8 caracteres da seguinte forma:
    - Pelo menos 1 letra MAIÚSCULA;
    - Pelo menos 1 letra minúscula;
    - Pelo menos 1 número;
    - E caracter especial do tipo: !@#$`;

  emailValidator = [Validators.maxLength(250), Validators.minLength(5), Validators.pattern(/.+@.+\..+/), Validators.required];
  senhaValidador = [Validators.pattern('^[0-9a-zA-Z!@#$]{8,}$'), Validators.required];

  constructor(private fb: FormBuilder, private pessoaService: PessoaService, private turmaService: TurmaService, private materiaService: MateriaService, 
    private route: ActivatedRoute, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.tipo = this.route.snapshot.queryParamMap.get('tipoPessoa');
    this.checked = true;
    this.turmaService.getAllTurmas().subscribe((turmas) => { this.turmas = turmas })
    this.materiaService.getAllMaterias().subscribe((materia) => { this.materias = materia })
    this.createForm();
    this.condicaoPessoa = this.cadastroPessoa.value.tipo_pessoa;
    this.pessoaService.getAllPessoas('', 'RESPONSAVEL', true).subscribe(pessoa => { this.listaResponsaveis = pessoa })
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
    this.cadastroPessoa.value.datanasc = this.dataFormat(this.cadastroPessoa.value.datanasc);
    this.captureIdResponsavel(this.cadastroPessoa.value.responsavel);
    if(this.cadastroPessoa.valid) {
      this.pessoaService.savePessoa(this.cadastroPessoa.value).subscribe({
        next: (res) => {
          this.snackBar.open(res.msg, undefined, { duration: 4000 })
          setTimeout(() => {
            if(this.cadastroPessoa.value.tipo_pessoa === 'ALUNO'){
              this.router.navigate(['/alunos'])
            } else if(this.cadastroPessoa.value.tipo_pessoa === 'RESPONSAVEL') {
              this.router.navigate(['/responsaveis'])
            } else if(this.cadastroPessoa.value.tipo_pessoa === 'PROFESSOR') {
              this.router.navigate(['/professores'])
            } else if(this.cadastroPessoa.value.tipo_pessoa === 'SECRETARIA') {
              this.router.navigate(['/secretaria'])
            }
          }, 4000);
        },
        error: (err) => {
          this.snackBar.open(err.error.msg, undefined, { duration: 5000 })
        }
      })
    }
  }

  dataFormat(data: Date) {
    let dia = data.getDate();
    let mes = data.getMonth() + 1;
    let ano = data.getFullYear();
    return (ano + "-" + mes + "-" + dia);
  }

  changeTipoPessoa(event: any) {
    this.condicaoPessoa = event.value;
  }


  captureIdResponsavel(nomeResp: String) {
    this.pessoaService.getAllPessoas('', 'RESPONSAVEL', true).subscribe(pessoa => {
      this.listaResponsaveis = pessoa;
      for (let i = 0; i < this.listaResponsaveis.length; i++) {
        if (this.listaResponsaveis[i].nome == nomeResp) {
          nomeResp = this.listaResponsaveis[i].id;
        }
      }
      this.cadastroPessoa.value.responsavel = nomeResp;
    })
  }

}
