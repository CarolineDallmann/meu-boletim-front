import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { Boletim, ConfigEscola } from '../entities/boletim.entity';
import { Materia } from '../entities/materia.entity';
import { BuscaFilhoResponse, Pessoa } from '../entities/pessoa.entity';
import { ResultadoBoletim } from '../enums/resultado-boletim.enum';
import { BoletimVisualizacaoService } from '../services/boletim-visualizacao.service';
import { MateriaService } from '../services/materia.service';

@Component({
  selector: 'app-visulizacaoboletim',
  templateUrl: './visulizacaoboletim.component.html',
  styleUrls: ['./visulizacaoboletim.component.scss']
})
export class VisulizacaoboletimComponent implements OnInit {
  alunos: BuscaFilhoResponse[] = []
  alunoSelecionado?: BuscaFilhoResponse
  configEscola?: ConfigEscola
  anoLetivo?: number
  materias: Materia[] = []
  boletim: Boletim[] = []
  displayedColumns: string[] = ['disciplina', '1bim', '2bim', '3bim', '4bim', 'final'];
  displayedSubColumns: string[] = ['d', '1nota', '1falta', '2nota', '2falta', '3nota',
    '3falta', '4nota', '4falta', 'media', 'resultado'];
  fechamentos = { bim1: '', bim2: '', bim3: '', bim4: '', final: ResultadoBoletim.INDETERMINADO }

  constructor(private boletimService: BoletimVisualizacaoService, private router: Router, private materiaService: MateriaService) { }

  ngOnInit(): void {
    const pessoa: Pessoa = JSON.parse(localStorage.getItem('usuario') || '{}')

    //Buscando configs e ano letivo
    this.boletimService.getConfigEscola().subscribe((config) => {
      this.configEscola = this.boletimService.configEscolaResponseToConfigEscola(config)
      const anoLetivo = this.configEscola.inicioBim1.getFullYear();
      this.anoLetivo = anoLetivo

      //Preenchendo status bimestre
      const dataAtual = environment.datateste ? new Date(environment.datateste) : new Date()
      if (this.betweenDates(this.configEscola.inicioBim1, this.configEscola.fimBim1)) {
        this.fechamentos.bim1 = 'Em Progresso'
      } else if (this.betweenDates(this.configEscola.inicioBim2, this.configEscola.fimBim2)) {
        this.fechamentos = {...this.fechamentos, bim1: 'Fechado', bim2: 'Em Progresso'}
      } else if (this.betweenDates(this.configEscola.inicioBim3, this.configEscola.fimBim3)) {
        this.fechamentos = {...this.fechamentos, bim1: 'Fechado', bim2: 'Fechado', bim3: 'Em Progresso'}
      } else if (this.betweenDates(this.configEscola.inicioBim4, this.configEscola.fimBim4)) {
        this.fechamentos = {...this.fechamentos, bim1: 'Fechado', bim2: 'Fechado', bim3: 'Fechado', bim4: 'Em Progresso'}
      } else if (dataAtual > this.configEscola.fimBim4) {
        this.fechamentos = {...this.fechamentos, bim1: 'Fechado', bim2: 'Fechado', bim3: 'Fechado', bim4: 'Fechado'}
      }

      //Buscando alunos do responsável
      this.boletimService.getBuscarFilhos(pessoa.id).subscribe((alunos) => {
        const primAluno = alunos[0]
        this.alunos = alunos;
        this.alunoSelecionado = primAluno;

        //Buscando matérias
        this.materiaService.getAllMaterias().subscribe((materias) => {
          this.materias = materias

          //Buscando dados boletim 
          this.getBoletim()
        })
      })
    })

  }
  getBoletim() {
    if (this.alunoSelecionado && this.anoLetivo) {
      this.boletimService.getBoletim(this.alunoSelecionado.id, this.anoLetivo).subscribe((bol) => {
        if (this.configEscola) {
          this.boletim = this.boletimService.preparaBoletim(bol, this.materias, this.configEscola)
          this.fechamentos.final = this.boletimService.avFinal(this.boletim)
        }
      })
    }
  }

  betweenDates(ini: Date, fim: Date) {
    const dataAtual = environment.datateste ? new Date(environment.datateste) : new Date()
    return dataAtual >= ini && dataAtual <= fim
  }

  onAlunoChange(event: BuscaFilhoResponse) {
    this.alunoSelecionado = event
    this.getBoletim()
  }

  sairBoletim(){
    localStorage.removeItem('usuario')
    this.router.navigate(['login'])
  }
  
}
