import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuscarPessoaComponent } from './buscar-pessoa/buscar-pessoa.component';
import { CadastrarPessoaComponent } from './cadastrar-pessoa/cadastrar-pessoa.component';
import { EditarPessoaComponent } from './editar-pessoa/editar-pessoa.component';
import { FrequenciaComponent } from './frequencia/frequencia.component';
import { LoginComponent } from './login/login.component';
import { NotasLancamentoComponent } from './notas-lancamento/notas-lancamento.component';
import { NotasComponent } from './notas/notas.component';
import { PrincipalComponent } from './principal/principal.component';
import { TurmasComponent } from './turmas/turmas.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: LoginComponent },
  { path: 'principal', component: PrincipalComponent },
  { path: 'turmas', component: TurmasComponent },
  { path: 'home', component: PrincipalComponent },
  { path: 'notas', component: NotasComponent },
  { path: 'notas/lancamento', component: NotasLancamentoComponent },
  { path: 'frequencias', component: FrequenciaComponent },
  { path: 'cadastro/:tipoPessoa', component: CadastrarPessoaComponent },
  { path: 'editar/:idPessoa', component: EditarPessoaComponent },
  { path: 'alunos', component: BuscarPessoaComponent}, 
  { path: 'responsaveis', component: BuscarPessoaComponent },
  { path: 'professores', component: BuscarPessoaComponent },
  { path: 'secretaria', component: BuscarPessoaComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
