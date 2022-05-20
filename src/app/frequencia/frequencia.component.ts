import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FrequenciaAlunoPayload, FrequenciaPayload, FrequenciaResponse } from '../entities/frequencia.entity';
import { Materia } from '../entities/materia.entity';
import { Turma } from '../entities/turma.entity';
import { FrequenciaService } from '../services/frequencia.service';
import { MateriaService } from '../services/materia.service';
import { TurmaService } from '../services/turma.service';

@Component({
  selector: 'app-frequencia',
  templateUrl: './frequencia.component.html',
  styleUrls: ['./frequencia.component.scss']
})
export class FrequenciaComponent implements OnInit {

  indeterminate: boolean = false
  allComplete: boolean = false
  disableSalvar = false
  turmaSelecionada = ''
  materiaSelecionada = ''
  turmas: Turma[] = []
  materias: Materia[] = []
  dataSelecionada = new Date()
  listaFrequencia: FrequenciaResponse[] = []
  displayedColumns: string[] = ['aluno', 'frequencia'];

  constructor(private turmaService: TurmaService, private materiaService: MateriaService,
    private frequenciaService: FrequenciaService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.turmaService.getAllTurmas().subscribe((turmas) => { this.turmas = turmas })
    this.materiaService.getAllMaterias().subscribe((materias) => { this.materias = materias })
    this.checkDisableButton()
  }

  onTurmaChange(event: string) {
    this.turmaSelecionada = event
    this.search()
    this.checkDisableButton()
  }

  onMateriaChange(event: string) {
    this.materiaSelecionada = event
    this.search()
    this.checkDisableButton()
  }

  onDateChange(event: Date) {
    this.dataSelecionada = event
    this.search()
    this.checkDisableButton()
  }
  onCheckChange(event: boolean, frequencia: FrequenciaResponse) {
    frequencia.presenca = event
    this.checkAllSelect()
  }

  checkAllSelect() {
    if (this.listaFrequencia.every((freq) => freq.presenca)) {
      this.allComplete = true
      this.indeterminate = false
    } else if (this.listaFrequencia.every((freq) => !freq.presenca)) {
      this.allComplete = false
      this.indeterminate = false
    } else {
      this.allComplete = false
      this.indeterminate = true
    }
  }

  setAll(completed: boolean) {
    this.allComplete = completed;
    this.listaFrequencia = this.listaFrequencia.map((freq) => {
      return { ...freq, presenca: completed }
    })
    this.indeterminate = false
  }

  search() {
    if (this.turmaSelecionada && this.materiaSelecionada) {
      this.frequenciaService.getBuscarFrequencia(this.turmaSelecionada,
        this.materiaSelecionada,
        this.dataSelecionada.toISOString().split('T')[0])
        .subscribe((lista) => {
          lista.sort((a, b) => a.aluno.nome.localeCompare(b.aluno.nome))
          this.listaFrequencia = lista
          this.checkAllSelect()
        })
    }
  }

  salvar() {
    const body: FrequenciaPayload = {
      materiaId: this.materiaSelecionada,
      dataPresenca: this.dataSelecionada.toISOString().split('T')[0],
      alunos: this.listaFrequencia.map((freq) => {
        return {
          id: freq.aluno.id,
          presenca: Boolean(freq.presenca),
          frequenciaId: freq.id
        }
      })
    }
    this.frequenciaService.salvarFrequencia(body).subscribe((res) => {
      this.snackBar.open(res.msg, undefined, { duration: 5000 })
      this.search()
    })
  }

  checkDisableButton() {
    this.disableSalvar = !(this.turmaSelecionada &&
      this.materiaSelecionada &&
      this.dataSelecionada
    )
  }
}
