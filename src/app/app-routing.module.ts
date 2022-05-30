import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FrequenciaComponent } from './frequencia/frequencia.component';
import { LoginComponent } from './login/login.component';
import { MateriaComponent } from './materia/materia.component';
import { NotasLancamentoComponent } from './notas-lancamento/notas-lancamento.component';
import { NotasComponent } from './notas/notas.component';
import { PrincipalComponent } from './principal/principal.component';
import { TurmasComponent } from './turmas/turmas.component';
import { VisulizacaoboletimComponent } from './visulizacaoboletim/visulizacaoboletim.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: PrincipalComponent },
  { path: 'turmas', component: TurmasComponent },
  { path: 'materias', component: MateriaComponent },
  { path: 'home', component: PrincipalComponent },
  { path: 'notas', component: NotasComponent },
  { path: 'notas/lancamento', component: NotasLancamentoComponent },
  { path: 'frequencias', component: FrequenciaComponent },
  { path: 'boletim', component: VisulizacaoboletimComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
