import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuscarPessoaComponent } from './buscar-pessoa/buscar-pessoa.component';
import { CadastrarPessoaComponent } from './cadastrar-pessoa/cadastrar-pessoa.component';
import { EditarPessoaComponent } from './editar-pessoa/editar-pessoa.component';
import { FrequenciaComponent } from './frequencia/frequencia.component';
import { LoginComponent } from './login/login.component';
import { MateriaComponent } from './materia/materia.component';
import { NotasLancamentoComponent } from './notas-lancamento/notas-lancamento.component';
import { NotasComponent } from './notas/notas.component';
import { OpcoesComponent } from './opcoes/opcoes.component';
import { PrincipalComponent } from './principal/principal.component';
import { TurmasLancamentoComponent } from './turmas-lancamento/turmas-lancamento.component';
import { TurmasComponent } from './turmas/turmas.component';
import { VisulizacaoboletimComponent } from './visulizacaoboletim/visulizacaoboletim.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: PrincipalComponent },
  { path: 'turmas', component: TurmasComponent },
  { path: 'materias', component: MateriaComponent },
  { path: 'opcoes', component: OpcoesComponent },
  { path: 'notas', component: NotasComponent },
  { path: 'notas/lancamento', component: NotasLancamentoComponent },
  { path: 'turmas/lancamento', component: TurmasLancamentoComponent },
  { path: 'frequencias', component: FrequenciaComponent },

  { path: 'alunos', component: BuscarPessoaComponent },
  { path: 'alunos/cadastro', component: CadastrarPessoaComponent },
  { path: 'alunos/editar', component: EditarPessoaComponent },

  { path: 'responsaveis', component: BuscarPessoaComponent },
  { path: 'responsaveis/cadastro', component: CadastrarPessoaComponent },
  { path: 'responsaveis/editar', component: EditarPessoaComponent },

  { path: 'professores', component: BuscarPessoaComponent },
  { path: 'professores/cadastro', component: CadastrarPessoaComponent },
  { path: 'professores/editar', component: EditarPessoaComponent },

  { path: 'secretaria', component: BuscarPessoaComponent },
  { path: 'secretaria/cadastro', component: CadastrarPessoaComponent },
  { path: 'secretaria/editar', component: EditarPessoaComponent },

  { path: 'boletim', component: VisulizacaoboletimComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
