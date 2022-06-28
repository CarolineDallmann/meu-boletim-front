import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataStoreService } from '../data-storage';

@Injectable()
export class Interceptor implements HttpInterceptor {
  constructor(private dataStorage: DataStoreService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.dataStorage.usuarioConectado.value?.token}`
      }
    });
    return next.handle(request);
  }
}
