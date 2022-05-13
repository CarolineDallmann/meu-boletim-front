import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pgempty',
  templateUrl: './pgempty.component.html',
  styleUrls: ['./pgempty.component.scss']
})
export class PgemptyComponent implements OnInit {
  
  msg: string = 'Listagem vazia'

  constructor() { }

  ngOnInit(): void {
  }

}
