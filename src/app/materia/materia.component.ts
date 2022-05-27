import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Materia, MateriaPayload } from '../entities/materia.entity';
import { MateriaService } from '../services/materia.service';

@Component({
  selector: 'app-materia',
  templateUrl: './materia.component.html',
  styleUrls: ['./materia.component.scss']
})
export class MateriaComponent implements OnInit {
  materias: Materia[] = []
  displayedColumns: string[] = ['materias', 'acoes'];
  materiaSelecionada?: MateriaPayload

  constructor(private materiaService: MateriaService, private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.search() 
  }

  onInput(event: Event) {
    const value = (event.target as HTMLInputElement).value
    if (value) {
      this.materiaSelecionada = { ...this.materiaSelecionada, nome: value }
    } else {
      this.materiaSelecionada = undefined
    }
  }

  salvar() {
    if (this.materiaSelecionada) {
      this.materiaService.salvarMateria(this.materiaSelecionada).subscribe((res) => {
        this.snackBar.open(res.msg, undefined, { duration: 5000 })
        this.materiaSelecionada = undefined
        this.search()
      })
    }
  }
  search() {
    this.materiaService.getAllMaterias().subscribe((materias) => {
      this.materias = materias.sort((a, b) => a.nome.localeCompare(b.nome))
    })
  }

  editar(materia: Materia) {
    this.materiaSelecionada = materia
  }

  excluir(materia: Materia) {
    this.materiaService.deleteMateria(materia.id).subscribe((res) => {
      this.snackBar.open(res.msg, undefined, { duration: 5000 })
      this.search()
    }, ({error})=>{this.snackBar.open(error.msg, undefined, { duration: 5000 })
    })
  }

}