import {
  AfterContentChecked,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataStoreService } from 'src/app/data-storage';
import { TipoPessoa } from 'src/app/enums/tipo-pesssoa.enum';

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

  itensMenu: Menu[] = [];

  constructor(private router: Router, private route: ActivatedRoute, private dataStorage: DataStoreService) {
    this.route.url.subscribe(e => {
      if (e[0]) {
        this.currentRoute = e[0].path;
      }
    });

    this.dataStorage.usuarioConectado.subscribe((usuarioConectado) => {
      if (usuarioConectado?.tipoPessoa === TipoPessoa.PROFESSOR) {
        this.itensMenu = [
          { path: 'notas', title: 'Notas' },
          { path: 'frequencias', title: 'Frequências' },
        ]
      }
      if (usuarioConectado?.tipoPessoa === TipoPessoa.SECRETARIA) {
        this.itensMenu = [
          { path: 'alunos', title: 'Alunos' },
          { path: 'materia', title: 'Matérias' },
          { path: 'responsaveis', title: 'Responsáveis' },
          { path: 'professores', title: 'Professores' },
          { path: 'secretaria', title: 'Secretaria' },
          { path: 'materias', title: 'Matérias' },
          { path: 'turmas', title: 'Turmas' },
          { path: 'notas', title: 'Notas' },
          { path: 'frequencias', title: 'Frequências' },
          { path: 'opcoes', title: 'Opções' }
        ]
      }
    })
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
