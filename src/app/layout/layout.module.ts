import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LayoutPrincipalComponent } from './layout-principal/layout-principal.component';
import { MenuComponent } from './menu/menu.component';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { CardFiltroComponent } from './card-filtro/card-filtro.component';
import { CardConteudoComponent } from './card-conteudo/card-conteudo.component';
import { MatButtonModule } from '@angular/material/button';
import { ButtonComponent } from './button/button.component';
import { PgemptyComponent } from './pgempty/pgempty.component';
import { RouterModule } from '@angular/router';
import { FieldsetComponent } from './fieldset/fieldset.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    LayoutPrincipalComponent,
    MenuComponent,
    CardFiltroComponent,
    CardConteudoComponent,
    ButtonComponent,
    PgemptyComponent,
    FieldsetComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    RouterModule,
    FlexLayoutModule
  ],
  exports: [
    LayoutPrincipalComponent,
    CardFiltroComponent,
    CardConteudoComponent,
    ButtonComponent,
    PgemptyComponent,
    FieldsetComponent
  ]
})
export class LayoutModule {}
