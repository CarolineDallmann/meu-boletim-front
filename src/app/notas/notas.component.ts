import { Component, OnInit } from '@angular/core';
import { Atividade } from '../entities/atividade.entity';
import { Materia } from '../entities/materia.entity';
import { Turma } from '../entities/turma.entity';
import { MateriaService } from '../services/materia.service';
import { NotaService } from '../services/nota.service';
import { TurmaService } from '../services/turma.service';

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

  constructor(private turmaService: TurmaService, private materiaService: MateriaService,
    private notaService: NotaService) { }

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
}
