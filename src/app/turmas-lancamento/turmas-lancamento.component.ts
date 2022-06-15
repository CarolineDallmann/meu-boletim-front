import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Turno } from '../enums/turno.enum'
import { Serie } from '../enums/serie.enum'
import { TurmaService } from '../services/turma.service';
import { Turma } from '../entities/turma.entity';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-turmas-lancamento',
  templateUrl: './turmas-lancamento.component.html',
  styleUrls: ['./turmas-lancamento.component.scss']
})
export class TurmasLancamentoComponent implements OnInit {

  form: FormGroup = this.formBuilder.group({
    id:  new FormControl(""),
    nome: new FormControl("", [Validators.required]),
    ano_letivo: new FormControl("", [Validators.required, Validators.min(2022)]),
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
    private route: ActivatedRoute, private snackBar: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
    const turmaId = this.route.snapshot.queryParamMap.get('turmaId')
    if(turmaId){
      this.turmaService.getOneTurma(turmaId).subscribe((turma)=>{
        this.form.setValue(turma)
      })
    }
  }

  salvar(){
    if (this.form.valid) {
      this.turmaService.salvarTurma(this.form.value).subscribe({
        next: (res) => {
          this.snackBar.open(res.msg, undefined, { duration: 5000 })
          this.router.navigate(['/turmas'])
        },
        error: (err) => {
          this.snackBar.open(err.error.msg, undefined, { duration: 5000 })
        }
      })
    }
  }


}
