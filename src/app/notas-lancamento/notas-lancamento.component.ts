import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { DataStoreService } from '../data-storage';
import {
  NotaAtividade,
  SalvarAtividadePayload
} from '../entities/atividade.entity';
import { Materia } from '../entities/materia.entity';
import { Turma } from '../entities/turma.entity';
import { TipoAtividade } from '../enums/tipo-atividade.enum';
import { MateriaService } from '../services/materia.service';
import { NotaService } from '../services/nota.service';
import { TurmaService } from '../services/turma.service';

@Component({
  selector: 'app-notas-lancamento',
  templateUrl: './notas-lancamento.component.html',
  styleUrls: ['./notas-lancamento.component.scss']
})
export class NotasLancamentoComponent implements OnInit {
  disableSalvar = false;
  turmaSelecionada = '';
  materiaSelecionada = '';
  dataSelecionada?: Date;
  tipoSelecionado?: TipoAtividade;
  turmas: Turma[] = [];
  materias: Materia[] = [];
  tipoAtividades: string[] = Object.values(TipoAtividade);
  notas: NotaAtividade[] = [];
  disabledTurma = false;
  displayedColumns: string[] = ['aluno', 'nota'];
  atividadeId: string | null = null;
  maxDate = environment.datateste
    ? new Date(environment.datateste)
    : new Date();
  isSmall = false;

  constructor(
    private turmaService: TurmaService,
    private materiaService: MateriaService,
    private notaService: NotaService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router,
    private dataStorage: DataStoreService
  ) {
    this.dataStorage.isSmall.subscribe((e) => (this.isSmall = e));
  }

  ngOnInit(): void {
    this.turmaService.getAllTurmas().subscribe((turmas) => {
      this.turmas = turmas;
    });
    this.materiaService.getAllMaterias().subscribe((materias) => {
      this.materias = materias;
    });
    const materiaId = this.route.snapshot.queryParamMap.get('materiaId');
    this.atividadeId = this.route.snapshot.queryParamMap.get('atividadeId');
    const turmaId = this.route.snapshot.queryParamMap.get('turmaId');
    if (turmaId) {
      this.search(turmaId);
    }
    if (materiaId) {
      this.materiaSelecionada = materiaId;
    }
    if (this.atividadeId) {
      this.notaService
        .getBuscarNota({ atividadeId: this.atividadeId })
        .subscribe((res) => {
          const resultado = this.notaService.buscaNotaResponseToBuscaNota(res);
          this.materiaSelecionada = resultado.materia?.id || '';
          this.turmaSelecionada = resultado.turma.id;
          this.dataSelecionada = resultado.dataAtividade;
          this.tipoSelecionado = resultado.tipoAtividade;
          this.notas = res.notas;
          this.disabledTurma = true;
          this.checkDisableButton();
        });
    }
    this.checkDisableButton();
  }

  onTurmaChange(event: string) {
    this.turmaSelecionada = event;
    this.search(event);
    this.checkDisableButton();
  }

  onMateriaChange(event: string) {
    this.materiaSelecionada = event;
    this.checkDisableButton();
  }

  onTipoChange(event: TipoAtividade) {
    this.tipoSelecionado = event;
    this.checkDisableButton();
  }

  onDateChange(event: Date) {
    this.dataSelecionada = event;
    this.checkDisableButton();
  }

  onInputChange(event: Event, nota: NotaAtividade) {
    const isLess = (n?: number) => Number(n) < 0;
    const isMore = (n?: number) => Number(n) > 10;
    nota.nota = Number((event.target as HTMLInputElement).value);
    if (this.notas.find((n) => isLess(n.nota) || isMore(n.nota))) {
      this.notas = this.notas.map((e) => {
        const novaNota = isMore(e.nota) ? 10 : isLess(e.nota) ? 0 : e.nota;
        return { ...e, nota: novaNota };
      });
    }
    this.checkDisableButton();
  }

  search(turmaId: string) {
    this.turmaSelecionada = turmaId;
    this.notaService.getBuscarNota({ turmaId }).subscribe((res) => {
      res.notas.sort((a, b) => a.aluno.nome.localeCompare(b.aluno.nome));
      this.notas = res.notas;
    });
  }

  salvar() {
    if (this.dataSelecionada && this.tipoSelecionado) {
      const body: SalvarAtividadePayload = {
        turmaId: this.turmaSelecionada,
        dataAtividade: this.dataSelecionada.toISOString().split('T')[0],
        tipoAtividade: this.tipoSelecionado,
        materiaId: this.materiaSelecionada,
        notas: this.notas.map((n) => {
          return {
            alunoId: n.aluno.id,
            nota: n.nota || 0
          };
        })
      };
      if (this.atividadeId) {
        body.atividadeId = this.atividadeId;
      }
      this.notaService.salvarAtividade(body).subscribe({
        next: (res) => {
          this.snackBar.open(res.msg, undefined, { duration: 5000 });
          this.router.navigate(['notas'], {
            queryParams: {
              turmaId: this.turmaSelecionada,
              materiaId: this.materiaSelecionada
            }
          });
        },
        error: (err) => {
          this.snackBar.open(err.error.msg, undefined, { duration: 5000 });
        }
      });
    }
  }

  checkDisableButton() {
    this.disableSalvar = !(
      this.turmaSelecionada &&
      this.materiaSelecionada &&
      this.dataSelecionada &&
      this.tipoSelecionado &&
      this.notas.every((nota) => nota.nota !== undefined)
    );
  }
}
