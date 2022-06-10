import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Materia } from '../entities/materia.entity';
import { Turma } from '../entities/turma.entity';
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
  pessoaId = "";

  emailValidator = [Validators.maxLength(250), Validators.minLength(5), Validators.pattern(/.+@.+\..+/), Validators.required];
  senhaValidador = [Validators.pattern('^[0-9a-zA-Z]{8,}$'), Validators.required];
  
  nome_mae = new FormControl();
  responsavel = new FormControl();
  turmaSelecionada = new FormControl();
  materia = new FormControl();
  nome_pai = new FormControl();

  constructor(private fb: FormBuilder, private pessoaService: PessoaService, private turmaService: TurmaService, 
    private materiaService: MateriaService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.pessoaId = this.route.snapshot.params['idPessoa'];
    this.loadPessoa();
    this.editarPessoa.value.tipo_pessoa = this.editarPessoa.value.tipo_pessoa
    this.addSpecificControls(this.condicaoPessoa);
    this.turmaService.getAllTurmas().subscribe((turmas) => { this.turmas = turmas })
    this.materiaService.getAllMaterias().subscribe((materia) => { this.materias = materia})
    this.pessoaService.getAllPessoas('', 'RESPONSAVEL', true).subscribe(pessoa => {this.listaResponsaveis = pessoa});
  }

  loadPessoa() {
    this.pessoaService.getPessoaById(this.pessoaId).subscribe(pessoa => { 
      this.createForm(pessoa);
    })
  }

  createForm(pessoa: any) {
    this.editarPessoa = this.fb.group({
      tipo_pessoa: [pessoa.tipo_pessoa, [Validators.required]],
      nome: [pessoa.nome, [Validators.required]],
      genero: [pessoa.genero, [Validators.required]], 
      datanasc: [pessoa.datanasc, [Validators.required]],
      cep: [pessoa.cep, [Validators.required]],
      rua: [pessoa.rua, [Validators.required]],
      numero: [pessoa.numero, [Validators.required]],
      cidade: [pessoa.cidade, [Validators.required]],
      bairro: [pessoa.bairro, [Validators.required]],
      uf: [pessoa.uf, [Validators.required]],
      telefone: [pessoa.telefone, [Validators.required]],
      email: [pessoa.email, this.emailValidator],
      login: [pessoa.login, [Validators.required]],
      senha: [pessoa.senha, this.senhaValidador],
      ativo: [pessoa.ativo]
    });
    this.condicaoPessoa = pessoa.tipo_pessoa;
    this.checked = pessoa.ativo;
    console.log(this.editarPessoa)
  }

  onSubmit() {
    this.editarPessoa.value.datanasc = this.dataFormat(this.editarPessoa.value.datanasc);
    this.captureIdResponsavel(this.editarPessoa.value.responsavel);
    console.log(this.editarPessoa.value)
  }

  dataFormat(data: Date) {
    let dia = data.getDate();
    let mes = data.getMonth()+1;
    let ano = data.getFullYear();
    return(ano+"-"+mes+"-"+dia);
  }

  changeTipoPessoa(event: any) {
    this.condicaoPessoa = event.value;
    this.addSpecificControls(this.condicaoPessoa);
  }

  addSpecificControls(tipoPessoa: string) {
    if (tipoPessoa == 'ALUNO') {
      this.nome_mae.setValidators([Validators.required]);
      this.editarPessoa.addControl('nome_mae', this.nome_mae);

      this.editarPessoa.addControl('nome_pai', this.nome_pai);

      this.responsavel.setValidators([Validators.required]);
      this.editarPessoa.addControl('responsavel', this.responsavel);

      this.turmaSelecionada.setValidators([Validators.required]);
      this.editarPessoa.addControl('turmaSelecionada', this.turmaSelecionada);

    }
    if (tipoPessoa == 'PROFESSOR') {
      this.materia.setValidators([Validators.required]);
      this.editarPessoa.addControl('materia', this.materia);
    }
  }

  captureIdResponsavel(nomeResp: String) {
    this.pessoaService.getAllPessoas('', 'RESPONSAVEL', true).subscribe(pessoa => {
      this.listaResponsaveis = pessoa;
      for (let i = 0; i < this.listaResponsaveis.length; i++) {
        if(this.listaResponsaveis[i].nome == nomeResp) {
          nomeResp = this.listaResponsaveis[i].id;
        }
      }
      this.editarPessoa.value.responsavel = nomeResp;
    })
  }

}
