import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from './layout/layout.module';
import { PrincipalComponent } from './principal/principal.component';
import { NotasComponent } from './notas/notas.component';
import { MatSelectModule } from '@angular/material/select';
import { MatGridListModule } from '@angular/material/grid-list';
import { HttpClientModule } from '@angular/common/http';
import { TurmaService } from './services/turma.service';
import { MateriaService } from './services/materia.service';
import { NotaService } from './services/nota.service';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TurmasComponent } from './turmas/turmas.component';
import { FormsModule } from '@angular/forms';
import { NotasLancamentoComponent } from './notas-lancamento/notas-lancamento.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FrequenciaComponent } from './frequencia/frequencia.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FrequenciaService } from './services/frequencia.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PrincipalComponent,
    NotasComponent,
    NotasLancamentoComponent,
    FrequenciaComponent,
    TurmasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    LayoutModule,
    MatSelectModule,
    MatGridListModule,
    HttpClientModule,
    MatTableModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    FormsModule
  ],
  providers: [
    TurmaService,
    MateriaService,
    NotaService,
    FrequenciaService
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
