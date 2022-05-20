import {
  AfterContentChecked,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
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
export class MenuComponent implements AfterContentChecked {
  currentRoute = '';

  @Output()
  navegateEvent = new EventEmitter<string>();

  itensMenu: Menu[] = [
    { path: 'alunos', title: 'Alunos' },
    { path: 'responsaveis', title: 'Responsáveis' },
    { path: 'professores', title: 'Professores' },
    { path: 'secretaria', title: 'Secretaria' },
    { path: 'materias', title: 'Matérias' },
    { path: 'turmas', title: 'Turmas' },
    { path: 'notas', title: 'Notas' },
    { path: 'frequencias', title: 'Frequências' },
    { path: 'opcoes', title: 'Opções' },
    { path: 'sair', title: 'Sair' },
  ];
  constructor(private router: Router, private route: ActivatedRoute) {
    this.route.url.subscribe(e => {
      this.currentRoute = e[0].path;
    });
  }

  ngAfterContentChecked() {
    this.navegateEvent.emit(
      this.itensMenu.find(m => m.path === this.currentRoute)?.title
    );
  }

  navegate(menu: Menu) {
    this.router.navigate([menu.path]);
  }
}
