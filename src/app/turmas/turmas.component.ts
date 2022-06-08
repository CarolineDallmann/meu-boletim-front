import { Component, OnInit } from '@angular/core';
import { Turma } from '../entities/turma.entity';
import { TurmaService } from '../services/turma.service';

@Component({
  selector: 'app-turmas',
  templateUrl: './turmas.component.html',
  styleUrls: ['./turmas.component.scss']
})
export class TurmasComponent implements OnInit {

  turmas: Turma[] = [];
  msg: string = '';
  displayedColumns: string[] = ['nome', 'anoLetivo', 'turno', 'serie'];

  constructor(private turmaService: TurmaService) { }

  ngOnInit(): void {
    this.turmaService.getAllTurmas().subscribe((turmas) => { this.turmas = turmas }, error => { this.turmas = [];this.msg = error.error.msg});
  }

  getOneTurma( nomeTurma: string ) {
    this.turmaService.getOneTurma(nomeTurma).subscribe(turma => { this.turmas = turma }, error => { this.turmas = [];this.msg = error.error.msg});
  }

}
