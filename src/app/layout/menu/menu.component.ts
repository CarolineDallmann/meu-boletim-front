import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

type Menu = {
  path: string;
  title: string;
};

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  currentRoute = '';

  @Output()
  navegateEvent = new EventEmitter<string>();

  itensMenu: Menu[] = [
    { path: 'alunos', title: 'Alunos' },
    { path: 'responsaveis', title: 'Responsáveis' },
    { path: 'professores', title: 'Professores' },
    { path: 'secretaria', title: 'Secretaria' },
    { path: 'materias', title: 'Matérias' },
    { path: 'principal', title: 'Turmas' },
    { path: 'notas', title: 'Notas' },
    { path: 'frequencia', title: 'Frequências' },
    { path: 'opcoes', title: 'Opções' },
    { path: 'sair', title: 'Sair' },
  ];

  constructor(private router: Router, private route: ActivatedRoute) {
    route.url.subscribe(e => {
      this.currentRoute = e[0].path;
    });
  }

  navegate(menu: Menu) {
    this.navegateEvent.emit(menu.title);
    this.router.navigate([menu.path]);
  }
}
