import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment';
import { ConfigEscola } from '../entities/boletim.entity';

@Pipe({
  name: 'checkNota'
})
export class CheckNotaPipe implements PipeTransform {

  transform(nota: number, configEscola?: ConfigEscola, numBim?: number): 'red' | '' {
   
    if(configEscola){
     const dataAtual = new Date(environment.datateste)
     if (numBim === 1 && nota < (configEscola.mediaAprovacao || 0) && dataAtual > configEscola.fimBim1) {
       return "red"
     }
     if (numBim === 2 && nota < (configEscola?.mediaAprovacao || 0) && dataAtual > configEscola.fimBim2) {
       return "red"
     }
     if (numBim === 3 && nota < (configEscola?.mediaAprovacao || 0) && dataAtual > configEscola.fimBim3) {
       return "red"
     }
     if (numBim === 4 && nota < (configEscola?.mediaAprovacao || 0) && dataAtual > configEscola.fimBim4) {
       return "red"
     } 
   }
    return '';
  }

}
