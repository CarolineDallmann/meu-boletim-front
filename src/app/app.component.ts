import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { DataStoreService } from './data-storage';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private dataStorage: DataStoreService, private breakpointObserver: BreakpointObserver) {
    this.breakpointObserver
      .observe(['(max-width: 599px)'])
      .subscribe((result: BreakpointState) => {
        this.dataStorage.isSmall.next(result.matches)
      })
   }

  ngOnInit(): void {
    const local = localStorage.getItem("usuario")
    if (local) {
      this.dataStorage.updateUsuario(JSON.parse(local))
    } else {
      this.dataStorage.updateUsuario(undefined)
    }
  }
}
