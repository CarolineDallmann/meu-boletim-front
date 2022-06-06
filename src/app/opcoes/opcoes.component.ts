import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfigEscola } from '../entities/boletim.entity';
import { BoletimVisualizacaoService } from '../services/boletim-visualizacao.service';


@Component({
  selector: 'app-opcoes',
  templateUrl: './opcoes.component.html',
  styleUrls: ['./opcoes.component.scss']
})
export class OpcoesComponent implements OnInit {
  form: FormGroup = this.formBuilder.group({
    mediaAprovacao: new FormControl("", [
      Validators.required, Validators.min(1), Validators.max(10)]),
    frequenciaAprovacao: new FormControl("", [
      Validators.required, Validators.min(1), Validators.max(100)]),
    inicioBim1: new FormControl("", [Validators.required]),
    fimBim1: new FormControl("", [Validators.required]),
    inicioBim2: new FormControl("", [Validators.required]),
    fimBim2: new FormControl("", [Validators.required]),
    inicioBim3: new FormControl("", [Validators.required]),
    fimBim3: new FormControl("", [Validators.required]),
    inicioBim4: new FormControl("", [Validators.required]),
    fimBim4: new FormControl("", [Validators.required]),

  })

  constructor(private boletimService: BoletimVisualizacaoService, private formBuilder: FormBuilder,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.boletimService.getConfigEscola().subscribe((config) => {
      this.form.setValue(this.boletimService.configEscolaResponseToConfigEscola(config))
    })
  }

  salvar() {
    if (this.form.valid) {
      this.boletimService.postConfigEscola(this.form.value).subscribe({
        next: (res) => {
          this.snackBar.open(res.msg, undefined, { duration: 5000 })
        },
        error: (err) => {
          this.snackBar.open(err.error.msg, undefined, { duration: 5000 })
        }
      })
    }

  }

}
