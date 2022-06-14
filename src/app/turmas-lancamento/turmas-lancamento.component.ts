import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Turno } from '../enums/turno.enum'
import { Serie } from '../enums/serie.enum'
import { TurmaService } from '../services/turma.service';


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
  
  tipoTurnos: string[] = Object.values(Turno)
  tipoSeries: string[] = Object.values(Serie)

  constructor(private formBuilder: FormBuilder, private turmaService: TurmaService) { }

  ngOnInit(): void {
    
  }

  salvar(){

  }



}
