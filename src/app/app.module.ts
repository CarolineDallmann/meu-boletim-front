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
import { MateriaComponent } from './materia/materia.component';
import { TurmasComponent } from './turmas/turmas.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NotasLancamentoComponent } from './notas-lancamento/notas-lancamento.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { FrequenciaComponent } from './frequencia/frequencia.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FrequenciaService } from './services/frequencia.service';
import { CadastrarPessoaComponent } from './cadastrar-pessoa/cadastrar-pessoa.component';
import { BuscarPessoaComponent } from './buscar-pessoa/buscar-pessoa.component';
import { PessoaService } from './services/pessoa.service';
import { MatRadioModule } from '@angular/material/radio';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { EditarPessoaComponent } from './editar-pessoa/editar-pessoa.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { VisulizacaoboletimComponent } from './visulizacaoboletim/visulizacaoboletim.component';
import { BoletimVisualizacaoService } from './services/boletim-visualizacao.service';
import { OpcoesComponent } from './opcoes/opcoes.component';
import { SerieDeParaPipe } from './pipes/serie-de-para.pipe';
import { CheckNotaPipe } from './pipes/check-nota.pipe';
import { ResultadoBoletimPipe } from './pipes/resultado-boletim.pipe';
import { LoginService } from './services/login.service';
import { TurmasLancamentoComponent } from './turmas-lancamento/turmas-lancamento.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PrincipalComponent,
    NotasComponent,
    MateriaComponent,
    NotasLancamentoComponent,
    FrequenciaComponent,
    TurmasComponent,
    CadastrarPessoaComponent,
    BuscarPessoaComponent,
    EditarPessoaComponent,
    OpcoesComponent,
    TurmasComponent,
    VisulizacaoboletimComponent,
    SerieDeParaPipe,
    CheckNotaPipe,
    ResultadoBoletimPipe,
    TurmasLancamentoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    LayoutModule,
    MatSelectModule,
    MatGridListModule,
    FlexLayoutModule,
    HttpClientModule,
    MatTableModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatAutocompleteModule,
    FlexLayoutModule
  ],
  providers: [
    TurmaService,
    MateriaService,
    NotaService,
    FrequenciaService,
    PessoaService,
    BoletimVisualizacaoService,
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    LoginService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
