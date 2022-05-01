import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LayoutPrincipalComponent } from './layout-principal/layout-principal.component';
import { MenuComponent } from './menu/menu.component';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { CardFiltroComponent } from './card-filtro/card-filtro.component';
import { CardConteudoComponent } from './card-conteudo/card-conteudo.component';

@NgModule({
  declarations: [LayoutPrincipalComponent, MenuComponent, CardFiltroComponent, CardConteudoComponent],
  imports: [CommonModule, MatToolbarModule, MatListModule, MatCardModule],
  exports: [LayoutPrincipalComponent, CardFiltroComponent, CardConteudoComponent],
})
export class LayoutModule {}
