import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Turno } from '../enums/turno.enum'
import { Serie } from '../enums/serie.enum'
import { TurmaService } from '../services/turma.service';
import { Turma } from '../entities/turma.entity';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-turmas-lancamento',
  templateUrl: './turmas-lancamento.component.html',
  styleUrls: ['./turmas-lancamento.component.scss']
})
export class TurmasLancamentoComponent implements OnInit {

  form: FormGroup = this.formBuilder.group({
    id:  new FormControl(""),
    nome: new FormControl("", [Validators.required]),
    anoLetivo: new FormControl("", [Validators.required]),
    turno: new FormControl("", [Validators.required]),
    serie: new FormControl("", [Validators.required])
  })

  turnoSelecionado = ''
  serieSelecionada = ''

  nome: string[] = []
  anoLetivo: number[] = []
  
  tipoTurnos: string[] = Object.values(Turno)
  tipoSeries: string[] = Object.values(Serie)
  

  constructor(private formBuilder: FormBuilder, private turmaService: TurmaService, 
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    const turmaId = this.route.snapshot.queryParamMap.get('turmaId')
    if(turmaId){
      this.turmaService.getOneTurma(turmaId).subscribe((turma)=>{
        this.form.setValue(turma)
      })
    }
    
    
   
  }

  salvar(){

  }



}
