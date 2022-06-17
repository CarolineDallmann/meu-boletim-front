import { Serie } from '../enums/serie.enum';
import { SerieDeParaPipe } from './serie-de-para.pipe';

describe('SerieDeParaPipe', () => {
  it('traducao pipe', () => {
    const result = new SerieDeParaPipe().transform(Serie.FUND1);
    expect(result).toBe('1 - Fundamental');
  });

  it('valor vazio', () => {
    const result = new SerieDeParaPipe().transform();
    expect(result).toBe('');
  });
});
