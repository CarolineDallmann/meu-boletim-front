import { Component, OnInit } from '@angular/core';
import { Pessoa } from '../entities/pessoa.entity';

@Component({
  selector: 'app-buscar-pessoa',
  templateUrl: './buscar-pessoa.component.html',
  styleUrls: ['./buscar-pessoa.component.scss']
})
export class BuscarPessoaComponent implements OnInit {

  displayedColumnsAlunos: string[] = ['nome', 'serie', 'turma', 'turno', 'editar'];
  displayedColumnsResponsaveis: string[] = ['nome', 'telefone', 'editar'];
  displayedColumnsFuncionarios: string[] = ['nome', 'telefone', 'editar'];
  alunos: Pessoa[] = [];
  msg: string = '';
  tipoPessoa: string = 'aluno'

  constructor() { }

  ngOnInit(): void {
    
  }

}
