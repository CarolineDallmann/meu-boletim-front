import {
  AfterContentChecked,
  ChangeDetectorRef,
  Component,
  Input,
} from '@angular/core';

@Component({
  selector: 'app-layout-principal',
  templateUrl: './layout-principal.component.html',
  styleUrls: ['./layout-principal.component.scss'],
})
export class LayoutPrincipalComponent implements AfterContentChecked {
  @Input()
  title = '';

  @Input()
  hiddenMenu = false

  constructor(private cdref: ChangeDetectorRef) { }

  ngAfterContentChecked(): void {
    this.cdref.detectChanges();
  }

  setTitle(e: string) {
    this.title = e;
  }
}
