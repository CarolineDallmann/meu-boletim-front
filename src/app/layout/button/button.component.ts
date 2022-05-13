import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  @Input()
  type: "primary" | "danger" = "primary"

  @Output()
  click = new EventEmitter()

  onclick(){
    this.click.emit()
  }

  constructor() { }

  ngOnInit(): void {
  }

}
