import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Turma } from '../entities/turma.entity';
import { TurmaService } from '../services/turma.service';
import { Router } from '@angular/router';
import { DataStoreService } from '../data-storage';


@Component({
  selector: 'app-turmas',
  templateUrl: './turmas.component.html',
  styleUrls: ['./turmas.component.scss']
})
export class TurmasComponent implements OnInit {

  turmas: Turma[] = [];
  displayedColumns: string[] = ['nome', 'anoLetivo', 'turno', 'serie', 'acoes'];
  turmaSelecionada = ''
  anoSelecionado = ''
  turnoSelecionado = ''
  serieSelecionada = ''
  isSmall = false

  constructor(private turmaService: TurmaService, private snackBar: MatSnackBar, private router: Router, 
    private dataStorage: DataStoreService) { this.dataStorage.isSmall.subscribe((e)=>this.isSmall = e)}

  ngOnInit(): void {
    this.turmaService.getAllTurmas().subscribe((turmas) => { this.turmas = turmas.sort((a, b) => a.serie.localeCompare(b.serie))});
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
      window.location.reload()
    })
  }
}
