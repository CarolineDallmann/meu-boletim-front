import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Turma, TurmaPayload } from '../entities/turma.entity';
import { TurmaService } from '../services/turma.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-turmas',
  templateUrl: './turmas.component.html',
  styleUrls: ['./turmas.component.scss']
})
export class TurmasComponent implements OnInit {

  turmas: Turma[] = [];
  msg: string = '';
  displayedColumns: string[] = ['nome', 'anoLetivo', 'turno', 'serie', 'acoes'];
  turmaSelecionada?: TurmaPayload

  constructor(private turmaService: TurmaService, private snackBar: MatSnackBar,
    private route: ActivatedRoute,private router: Router) { }

  ngOnInit(): void {
    this.turmaService.getAllTurmas().subscribe((turmas) => { this.turmas = turmas })
  }

  getOneTurma( nomeTurma: string ) {
    this.turmaService.getOneTurma(nomeTurma).subscribe(turma => { this.turmas = turma }, error => { this.turmas = [];this.msg = error.error.msg});
  }

  salvar(){
    if(this.turmaSelecionada){
      this.turmaService.salvarTurma(this.turmaSelecionada).subscribe((res) => {
        this.snackBar.open(res.msg, undefined, { duration: 5000})
        this.turmaSelecionada = undefined
        this.search
      })
    }
  }

  navegarNovaTurma(){
    this.router.navigate(['/turmas/lancamento'])
  }

  editar(turma: Turma){
    this.router.navigate(['turmas/lancamento'], {
      queryParams: {turmaId: turma.id}
    })
  }

  search(){
    this.turmaService.getAllTurmas().subscribe((turmas) => {
      this.turmas = turmas.sort((a, b) => a.nome.localeCompare(b.nome))
    })
  }

  excluir(turma: Turma){
    this.turmaService.deleteTurma(turma.id).subscribe({
      next: (res) => {
        this.snackBar.open(res.msg, undefined, {duration: 5000})
        this.search()
      },
      error: (err) => {this.snackBar.open(err.error.msg, undefined, {duration: 5000})}
    })    
  }

}
