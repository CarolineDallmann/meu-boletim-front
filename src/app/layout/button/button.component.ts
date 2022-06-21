import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input()
  severity: 'primary' | 'danger' = 'primary';

  @Input()
  leftSpace = false;

  @Input()
  disabled = false;

  @Input()
  fullSize = false;
}
