import { ResultadoBoletim } from '../enums/resultado-boletim.enum';
import { ResultadoBoletimPipe } from './resultado-boletim.pipe';

describe('ResultadoBoletimPipe', () => {
  it('traducoes', () => {
    expect(
      new ResultadoBoletimPipe().transform(ResultadoBoletim.APROVADO)
    ).toBe('Aprovado');
    expect(
      new ResultadoBoletimPipe().transform(ResultadoBoletim.REPROVADO)
    ).toBe('Reprovado');
    expect(
      new ResultadoBoletimPipe().transform(
        ResultadoBoletim.REPROVADO_POR_FALTAS
      )
    ).toBe('Reprovado por faltas');
  });
  it('vazio', () => {
    expect(
      new ResultadoBoletimPipe().transform(ResultadoBoletim.INDETERMINADO)
    ).toBe('');
  });
});
