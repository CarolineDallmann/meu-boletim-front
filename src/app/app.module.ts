import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { LayoutModule } from './layout/layout.module';
import { PrincipalComponent } from './principal/principal.component';

@NgModule({
  declarations: [AppComponent, LoginComponent, PrincipalComponent],
  imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule, MatFormFieldModule, MatInputModule, MatButtonModule, 
    LayoutModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
