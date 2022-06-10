import { Component, OnInit } from '@angular/core';
import { DataStoreService } from './data-storage';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private dataStorage: DataStoreService) { }

  ngOnInit(): void {
    const local = localStorage.getItem("usuario")
    if (local) {
      this.dataStorage.updateUsuario(JSON.parse(local))
    } else {
      this.dataStorage.updateUsuario(undefined)
    }
  }
}
