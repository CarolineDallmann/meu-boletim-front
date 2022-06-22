import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataStoreService } from '../data-storage';
import { Pessoa } from '../entities/pessoa.entity';
import { TipoPessoa } from '../enums/tipo-pesssoa.enum';
import { PessoaService } from '../services/pessoa.service';

@Component({
  selector: 'app-buscar-pessoa',
  templateUrl: './buscar-pessoa.component.html',
  styleUrls: ['./buscar-pessoa.component.scss']
})
export class BuscarPessoaComponent implements OnInit {
  displayedColumnsAlunos: string[] = [
    'nome',
    'serie',
    'turma',
    'turno',
    'editar'
  ];
  displayedColumnsAdultos: string[] = ['nome', 'telefone', 'editar'];
  pessoas: any = [];
  msg = '';
  tipoPessoa = '';
  checkInativo = false;
  pesquisar = '';
  tipo = '';
  isSmall = false;

  constructor(
    private pessoaService: PessoaService,
    private route: ActivatedRoute,
    private router: Router,
    private dataStorage: DataStoreService
  ) {
    this.dataStorage.isSmall.subscribe((e) => (this.isSmall = e));
  }

  ngOnInit(): void {
    this.tipoPessoa = this.route.snapshot.url[0].path;
    this.search();
  }

  onNomeChange(e: Event) {
    this.pesquisar = (e.target as HTMLInputElement).value;
    this.search();
  }

  search() {
    this.pessoaService
      .getAllPessoas(
        this.pesquisar,
        this.filterTipoPessoa(this.tipoPessoa),
        this.checkInativo
      )
      .subscribe((pessoa) => {
        this.pessoas = [...pessoa].sort((a, b) => a.nome.localeCompare(b.nome));
      });
  }

  onInativoChange(e: boolean) {
    this.checkInativo = e;
    this.search();
  }

  filterTipoPessoa(tipo: string): TipoPessoa {
    if (tipo === 'alunos') {
      return TipoPessoa.ALUNO;
    }
    if (tipo === 'responsaveis') {
      return TipoPessoa.RESPONSAVEL;
    }
    if (tipo === 'professores') {
      return TipoPessoa.PROFESSOR;
    }

    return TipoPessoa.SECRETARIA;
  }

  editar(pessoa: Pessoa) {
    this.router.navigate([`${this.tipoPessoa}/editar/`], {
      queryParams: { pessoaId: pessoa.id }
    });
  }

  cadastrar() {
    this.router.navigate([`${this.tipoPessoa}/cadastro/`], {
      queryParams: { tipoPessoa: this.filterTipoPessoa(this.tipoPessoa) }
    });
  }
}
