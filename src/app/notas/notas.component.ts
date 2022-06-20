import { Component, OnInit } from '@angular/core';
import { Atividade } from '../entities/atividade.entity';
import { Materia } from '../entities/materia.entity';
import { Turma } from '../entities/turma.entity';
import { MateriaService } from '../services/materia.service';
import { NotaService } from '../services/nota.service';
import { TurmaService } from '../services/turma.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { DataStoreService } from '../data-storage';
import { DialogService } from '../services/dialog.service';

@Component({
  selector: 'app-notas',
  templateUrl: './notas.component.html',
  styleUrls: ['./notas.component.scss']
})
export class NotasComponent implements OnInit {
  turmaSelecionada = '';
  materiaSelecionada = '';
  turmas: Turma[] = [];
  materias: Materia[] = [];
  atividades: Atividade[] = [];
  displayedColumns: string[] = ['atividade', 'data', 'acoes'];
  isSmall = false;

  constructor(
    private turmaService: TurmaService,
    private materiaService: MateriaService,
    private notaService: NotaService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router,
    private dataStorage: DataStoreService,
    private dialogService: DialogService
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
    const turmaId = this.route.snapshot.queryParamMap.get('turmaId');
    const materiaId = this.route.snapshot.queryParamMap.get('materiaId');

    if (turmaId && materiaId) {
      this.turmaSelecionada = turmaId;
      this.materiaSelecionada = materiaId;
      this.search();
    }
  }

  navegarNovaAtividade() {
    this.router.navigate(['/notas/lancamento'], {
      queryParams: {
        turmaId: this.turmaSelecionada,
        materiaId: this.materiaSelecionada
      }
    });
  }

  onTurmaChange(event: string) {
    this.turmaSelecionada = event;
    this.search();
  }

  onMateriaChange(event: string) {
    this.materiaSelecionada = event;
    this.search();
  }

  search() {
    if (this.turmaSelecionada && this.materiaSelecionada) {
      this.notaService
        .getListarAtividades(this.turmaSelecionada, this.materiaSelecionada)
        .subscribe((ativ) => {
          this.atividades = this.notaService.atividadeResponseToAtividade(ativ);
        });
    }
  }

  editar(atividade: Atividade) {
    this.router.navigate(['/notas/lancamento'], {
      queryParams: { atividadeId: atividade.id }
    });
  }

  excluir(atividade: Atividade) {
    this.dialogService
      .openConfirmDialog()
      .afterClosed()
      .subscribe((res1) => {
        if (res1) {
          this.notaService.deleteAtividade(atividade.id).subscribe({
            next: (res) => {
              this.snackBar.open(res.msg, undefined, { duration: 5000 });
              this.search();
            },
            error: (err) => {
              this.snackBar.open(err.error.msg, undefined, { duration: 5000 });
            }
          });
        }
      });
  }
}
