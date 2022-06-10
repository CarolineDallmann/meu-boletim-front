import { Pipe, PipeTransform } from '@angular/core';
import { Serie } from '../enums/serie.enum';

@Pipe({
  name: 'serieDePara'
})
export class SerieDeParaPipe implements PipeTransform {

  transform(value?: Serie): string {
    if(!value){
      return ''
    }
    const dePara = {
      FUND1: "1 - Fundamental",
      FUND2: "2 - Fundamental", 
      FUND3: "3 - Fundamental", 
      FUND4: "4 - Fundamental", 
      FUND5: "5 - Fundamental", 
      FUND6: "6 - Fundamental", 
      FUND7: "7 - Fundamental",
      FUND8: "8 - Fundamental", 
      FUND9: "9 - Fundamental", 
      MED1: "1 - Médio", 
      MED2: "2 - Médio", 
      MED3: "3 - Médio"
    }
    return dePara[value];
  }

}
