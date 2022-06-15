import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Turma} from '../entities/turma.entity';
import { TurmaService } from '../services/turma.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-turmas',
  templateUrl: './turmas.component.html',
  styleUrls: ['./turmas.component.scss']
})
export class TurmasComponent implements OnInit {

  turmas: Turma[] = [];
  msg: string = '';
  displayedColumns: string[] = ['nome', 'anoLetivo', 'turno', 'serie', 'acoes'];
  turmaSelecionada = ''
  anoSelecionado = ''
  turnoSelecionado = ''
  serieSelecionada = ''

  constructor(private turmaService: TurmaService, private snackBar: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
    this.turmaService.getAllTurmas().subscribe((turmas) => { this.turmas = turmas }, error => { this.turmas = [];this.msg = error.error.msg});
  }

  navegarNovaTurma() {
    this.router.navigate(['/turmas/lancamento'])
  }

  editar(turma: Turma) {
    this.router.navigate(['turmas/lancamento'], {
      queryParams: { turmaId: turma.id }
    })
  }

  excluir(turma: Turma) {
    this.turmaService.deleteTurma(turma.id).subscribe((res) => {
      this.snackBar.open(res.msg, undefined, { duration: 5000 })
    }
    )
  }

}
