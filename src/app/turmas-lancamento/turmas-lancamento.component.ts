import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SalvarTurmaPayload } from '../entities/turma.entity';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Turno } from '../enums/turno.enum'
import { Serie } from '../enums/serie.enum'


@Component({
  selector: 'app-turmas-lancamento',
  templateUrl: './turmas-lancamento.component.html',
  styleUrls: ['./turmas-lancamento.component.scss']
})
export class TurmasLancamentoComponent implements OnInit {

  form: FormGroup = this.formBuilder.group({
    nomeTurma: new FormControl("", [Validators.required]),
    anoTurma: new FormControl("", [Validators.required]),
    turno: new FormControl("", [Validators.required]),
    serie: new FormControl("", [Validators.required])
  })

  turnoSelecionado = ''
  serieSelecionada = ''
  nome: string[] = []
  anoLetivo: number[] = []
  turnos: string[] = Object.values(Turno)
  series: string[] = Object.values(Serie)

  constructor(  private snackBar: MatSnackBar, private formBuilder: FormBuilder,) { }

  ngOnInit(): void {
  }

  salvar(){

  }



}
