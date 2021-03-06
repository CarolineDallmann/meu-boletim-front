import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataStoreService } from '../data-storage';
import { Materia, MateriaPayload } from '../entities/materia.entity';
import { DialogService } from '../services/dialog.service';
import { MateriaService } from '../services/materia.service';

@Component({
  selector: 'app-materia',
  templateUrl: './materia.component.html'
})
export class MateriaComponent implements OnInit {
  materias: Materia[] = [];
  displayedColumns: string[] = ['materias', 'acoes'];
  materiaSelecionada?: MateriaPayload;
  isSmall = false;

  constructor(
    private materiaService: MateriaService,
    private snackBar: MatSnackBar,
    private dataStorage: DataStoreService,
    private dialogService: DialogService
  ) {
    this.dataStorage.isSmall.subscribe((e) => (this.isSmall = e));
  }

  ngOnInit(): void {
    this.search();
  }

  onInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    if (value) {
      this.materiaSelecionada = { ...this.materiaSelecionada, nome: value };
    } else {
      this.materiaSelecionada = undefined;
    }
  }

  salvar() {
    if (this.materiaSelecionada) {
      this.materiaService
        .salvarMateria(this.materiaSelecionada)
        .subscribe((res) => {
          this.snackBar.open(res.msg, undefined, { duration: 5000 });
          this.materiaSelecionada = undefined;
          this.search();
        });
    }
  }
  search() {
    this.materiaService.getAllMaterias().subscribe((materias) => {
      this.materias = materias;
    });
  }

  editar(materia: Materia) {
    this.materiaSelecionada = materia;
  }

  excluir(materia: Materia) {
    this.dialogService
      .openConfirmDialog()
      .afterClosed()
      .subscribe((res1) => {
        if (res1) {
          this.materiaService.deleteMateria(materia.id).subscribe({
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
