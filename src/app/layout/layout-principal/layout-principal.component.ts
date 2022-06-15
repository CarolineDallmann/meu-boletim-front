import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import {
  AfterContentChecked,
  ChangeDetectorRef,
  Component,
  Input,
} from '@angular/core';
import { DataStoreService } from 'src/app/data-storage';

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

  isSmall = false;

  constructor(private cdref: ChangeDetectorRef, private dataStorage: DataStoreService) {
    this.dataStorage.isSmall.subscribe((e)=>this.isSmall = e)

   }

  ngAfterContentChecked(): void {
    this.cdref.detectChanges();
  }

  setTitle(e: string) {
    this.title = e;
  }
}
