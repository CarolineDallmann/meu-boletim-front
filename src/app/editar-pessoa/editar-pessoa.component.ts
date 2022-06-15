import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Materia } from '../entities/materia.entity';
import { Turma } from '../entities/turma.entity';
import { Genero } from '../enums/genero.enum';
import { MateriaService } from '../services/materia.service';
import { PessoaService } from '../services/pessoa.service';
import { TurmaService } from '../services/turma.service';

@Component({
  selector: 'app-editar-pessoa',
  templateUrl: './editar-pessoa.component.html',
  styleUrls: ['./editar-pessoa.component.scss']
})
export class EditarPessoaComponent implements OnInit {

  editarPessoa: FormGroup = new FormGroup({});
  
  emailValidator = [Validators.maxLength(250), Validators.minLength(5), Validators.pattern(/.+@.+\..+/), Validators.required];
  senhaValidador = [Validators.pattern('^[0-9a-zA-Z!@#$]{8,}$'), Validators.required];

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
  listaResponsaveis: any = [];
  pessoaId: any;
  isLoad: boolean = false;
  responsavelNome: String = '';
  configSenha: string = `A senha deve conter, no mínino, 8 caracteres da seguinte forma:
    - Pelo menos 1 letra MAIÚSCULA;
    - Pelo menos 1 letra minúscula;
    - Pelo menos 1 número;
    - E caracter especial do tipo: !@#$`; 

  constructor(private fb: FormBuilder, private pessoaService: PessoaService, private turmaService: TurmaService, 
    private materiaService: MateriaService, private route: ActivatedRoute, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.pessoaId = this.route.snapshot.queryParamMap.get('pessoaId');
    this.loadPessoa();
    this.turmaService.getAllTurmas().subscribe((turmas) => { this.turmas = turmas })
    this.materiaService.getAllMaterias().subscribe((materia) => { this.materias = materia})
    this.pessoaService.getAllPessoas('', 'RESPONSAVEL', true).subscribe(pessoa => {this.listaResponsaveis = pessoa});
  }

  loadPessoa() {
    this.pessoaService.getPessoaById(this.pessoaId).subscribe(pessoa => { 
      this.isLoad = true;
      this.createForm(pessoa);
    })
  }

  createForm(pessoa: any) {
    this.editarPessoa = this.fb.group({
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
    this.captureNomeResponsavel(this.editarPessoa.value.responsavel);

  }

  onSubmit() {
    this.editarPessoa.value.datanasc = this.dataFormat(this.editarPessoa.value.datanasc);
    this.captureIdResponsavel(this.editarPessoa.value.responsavel);
    if(this.editarPessoa.valid) {
      this.pessoaService.updatePessoa(this.editarPessoa.value, this.pessoaId).subscribe({
        next: (res) => {
          this.snackBar.open(res.msg, undefined, { duration: 4000 })
          setTimeout(() => {
            if(this.editarPessoa.value.tipo_pessoa === 'ALUNO'){
              this.router.navigate(['/alunos'])
            } else if(this.editarPessoa.value.tipo_pessoa === 'RESPONSAVEL') {
              this.router.navigate(['/responsaveis'])
            } else if(this.editarPessoa.value.tipo_pessoa === 'PROFESSOR') {
              this.router.navigate(['/professores'])
            } else if(this.editarPessoa.value.tipo_pessoa === 'SECRETARIA') {
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
    let mes = data.getMonth()+1;
    let ano = data.getFullYear();
    return(ano+"-"+mes+"-"+dia);
  }

  changeTipoPessoa(event: any) {
    this.condicaoPessoa = event.value;
  }

  changeSenha() {
    this.editarPessoa.controls['senha'].setValidators(this.senhaValidador);
  }

  captureIdResponsavel(nomeResp: String) {
    this.pessoaService.getAllPessoas('', 'RESPONSAVEL', true).subscribe(pessoa => {
      for (let i = 0; i < pessoa.length; i++) {
        if(pessoa[i].nome == nomeResp) {
          this.editarPessoa.value.responsavel = pessoa[i].id;
        }
      }
    })
  }

  captureNomeResponsavel(event: any) {
    this.pessoaService.getAllPessoas('', 'RESPONSAVEL', true).subscribe(pessoa => {
      for (let i = 0; i < pessoa.length; i++) {
        if(pessoa[i].id == event) {
          this.editarPessoa.controls['responsavel'].setValue(pessoa[i].nome);
        }
      }
    })
  }

}