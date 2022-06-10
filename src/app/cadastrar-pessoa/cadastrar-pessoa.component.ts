import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
  condicaoPessoa = '';
  listaResponsaveis: any = {};
  tipo = '';

  emailValidator = [Validators.maxLength(250), Validators.minLength(5), Validators.pattern(/.+@.+\..+/), Validators.required];
  senhaValidador = [Validators.pattern('^[0-9a-zA-Z]{8,}$'), Validators.required];
  nome_mae = new FormControl();
  responsavel = new FormControl();
  turmaSelecionada = new FormControl();
  materia = new FormControl();
  nome_pai = new FormControl();

  constructor(private fb: FormBuilder, private pessoaService: PessoaService, private turmaService: TurmaService, private materiaService: MateriaService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.tipo = this.route.snapshot.url[1].path;
    this.checked = true;
    this.turmaService.getAllTurmas().subscribe((turmas) => { this.turmas = turmas })
    this.materiaService.getAllMaterias().subscribe((materia) => { this.materias = materia })
    this.createForm();
    this.condicaoPessoa = this.cadastroPessoa.value.tipo_pessoa;
    this.addSpecificControls(this.condicaoPessoa);
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
      tipo_pessoa: [this.tipo, [Validators.required]]
    });
  }

  onSubmit() {
    this.cadastroPessoa.value.datanasc = this.dataFormat(this.cadastroPessoa.value.datanasc);
    this.captureIdResponsavel(this.cadastroPessoa.value.responsavel);
    if(this.cadastroPessoa.valid) {
      this.pessoaService.savePessoa(this.cadastroPessoa.value).subscribe(data => window.location.reload())
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
    this.addSpecificControls(this.condicaoPessoa);
  }

  addSpecificControls(tipoPessoa: string) {
    if (tipoPessoa == 'ALUNO') {
      this.nome_mae.setValidators([Validators.required]);
      this.cadastroPessoa.addControl('nome_mae', this.nome_mae);

      this.cadastroPessoa.addControl('nome_pai', this.nome_pai);

      this.responsavel.setValidators([Validators.required]);
      this.cadastroPessoa.addControl('responsavel', this.responsavel);

      this.turmaSelecionada.setValidators([Validators.required]);
      this.cadastroPessoa.addControl('turmaSelecionada', this.turmaSelecionada);

    }
    if (tipoPessoa == 'PROFESSOR') {
      this.materia.setValidators([Validators.required]);
      this.cadastroPessoa.addControl('materia', this.materia);
    }
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
