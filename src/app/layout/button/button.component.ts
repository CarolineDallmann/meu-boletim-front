import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  @Input()
  type: "primary" | "danger" = "primary"

  @Input()
  leftSpace = false

  @Input()
  disabled = false

  @Input()
  fullSize = false;

  constructor() { }

  ngOnInit(): void {
  }
}
