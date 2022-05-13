import { Component, OnInit } from '@angular/core';
import { Atividade } from '../entities/atividade.entity';
import { Materia } from '../entities/materia.entity';
import { Turma } from '../entities/turma.entity';
import { MateriaService } from '../services/materia.service';
import { NotaService } from '../services/nota.service';
import { TurmaService } from '../services/turma.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-notas',
  templateUrl: './notas.component.html',
  styleUrls: ['./notas.component.scss']
})
export class NotasComponent implements OnInit {

  turmaSelecionada = ''
  materiaSelecionada = ''

  turmas: Turma[] = []
  materias: Materia[] = []
  atividades: Atividade[] = []
  displayedColumns: string[] = ['atividade', 'data', 'acoes'];

  constructor(private turmaService: TurmaService, private materiaService: MateriaService,
    private notaService: NotaService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.turmaService.getAllTurmas().subscribe((turmas) => { this.turmas = turmas })
    this.materiaService.getAllMaterias().subscribe((materias) => { this.materias = materias })
  }

  teste() {
    console.log('cli');
  }

  onTurmaChange(event: string) {
    this.turmaSelecionada = event
    this.search()
  }

  onMateriaChange(event: string) {
    this.materiaSelecionada = event
    this.search()
  }

  search() {
    if (this.turmaSelecionada && this.materiaSelecionada) {
      this.notaService.getListarAtividades(this.turmaSelecionada, this.materiaSelecionada)
        .subscribe((ativ) => { this.atividades = this.notaService.atividadeResponseToAtividade(ativ) })
    }
  }

  editar(atividade: Atividade) {
    console.log(atividade);
  }

  excluir(atividade: Atividade) {
    this.notaService.deleteAtividade(atividade.id).subscribe((res) => {
      this.snackBar.open(res.msg, undefined, { duration: 5000 })
      this.search()
    })
  }
}
