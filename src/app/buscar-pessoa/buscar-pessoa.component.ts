import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { Pessoa } from '../entities/pessoa.entity';
import { PessoaService } from '../services/pessoa.service';

@Component({
  selector: 'app-buscar-pessoa',
  templateUrl: './buscar-pessoa.component.html',
  styleUrls: ['./buscar-pessoa.component.scss']
})
export class BuscarPessoaComponent implements OnInit {

  displayedColumnsAlunos: string[] = ['nome', 'serie', 'turma', 'turno', 'editar'];
  displayedColumnsAdultos: string[] = ['nome', 'telefone', 'editar'];
  pessoas: any = {};
  msg: string = '';
  path = window.location.pathname; 
  tipoPessoa = this.path.split('/')[1];
  checkInitivo = false;
  pesquisar = '';
  tipo: string = '';

  constructor(private pessoaService: PessoaService) { }
  
  ngOnInit(): void {
    this.filterTipoPessoa(this.tipoPessoa);
    this.pessoaService.getAllPessoas(this.pesquisar, this.tipoPessoa, false).subscribe(pessoa => { 
      this.pessoas = pessoa;
    })
  }

  onNomeChange() {
    this.pessoaService.getAllPessoas(this.pesquisar, this.tipoPessoa, false).subscribe(pessoa => { this.pessoas = pessoa })
  }

  onInativoChange() {
    if(this.checkInitivo==true){
      this.pessoaService.getAllPessoas('', this.tipoPessoa, true).subscribe(pessoa => { this.pessoas = pessoa })
    } else {
      this.pessoaService.getAllPessoas('', this.tipoPessoa, false).subscribe(pessoa => { this.pessoas = pessoa })
    }
    
  }

  filterTipoPessoa(tipo: String) {
    if (tipo == "alunos"){
      this.tipoPessoa = "ALUNO";
    }
    if (tipo == "responsaveis"){
      this.tipoPessoa = "RESPONSAVEL";
    }
    if (tipo == "professores"){
      this.tipoPessoa = "PROFESSOR";
    }
    if (tipo == "secretaria"){
      this.tipoPessoa = "SECRETARIA";
    }
  }
}