import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NotasLancamentoComponent } from './notas-lancamento/notas-lancamento.component';
import { NotasComponent } from './notas/notas.component';
import { PrincipalComponent } from './principal/principal.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: LoginComponent },
  { path: 'principal', component: PrincipalComponent },
  { path: 'notas', component: NotasComponent },
  { path: 'notas/lancamento', component: NotasLancamentoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
