import {
  AfterContentChecked,
  ChangeDetectorRef,
  Component,
} from '@angular/core';

@Component({
  selector: 'app-layout-principal',
  templateUrl: './layout-principal.component.html',
  styleUrls: ['./layout-principal.component.scss'],
})
export class LayoutPrincipalComponent implements AfterContentChecked {
  title = '';

  constructor(private cdref: ChangeDetectorRef) { }

  ngAfterContentChecked(): void {
    this.cdref.detectChanges();
  }

  setTitle(e: string) {
    this.title = e;
  }
}
