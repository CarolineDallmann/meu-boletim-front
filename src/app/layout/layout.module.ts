import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LayoutPrincipalComponent } from './layout-principal/layout-principal.component';
import { MenuComponent } from './menu/menu.component';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { CardFiltroComponent } from './card-filtro/card-filtro.component';
import { CardConteudoComponent } from './card-conteudo/card-conteudo.component';
import {MatButtonModule} from '@angular/material/button';
import { ButtonComponent } from './button/button.component';
import { PgemptyComponent } from './pgempty/pgempty.component';


@NgModule({
  declarations: [LayoutPrincipalComponent, MenuComponent, CardFiltroComponent, CardConteudoComponent, ButtonComponent, PgemptyComponent],
  imports: [CommonModule, MatToolbarModule, MatListModule, MatCardModule, MatButtonModule],
  exports: [LayoutPrincipalComponent, CardFiltroComponent, CardConteudoComponent, ButtonComponent, PgemptyComponent],
})
export class LayoutModule {}
