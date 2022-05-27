import { Pipe, PipeTransform } from '@angular/core';
import { ResultadoBoletim } from '../enums/resultado-boletim.enum';

@Pipe({
  name: 'resultadoBoletim'
})
export class ResultadoBoletimPipe implements PipeTransform {

  transform(value: ResultadoBoletim): string {
    switch (value) {
      case ResultadoBoletim.APROVADO:
        return 'Aprovado';
      case ResultadoBoletim.REPROVADO:
        return 'Reprovado';
      case ResultadoBoletim.REPROVADO_POR_FALTAS:
        return 'Reprovado por faltas';
      default:
        return ''
    }
  }

}
