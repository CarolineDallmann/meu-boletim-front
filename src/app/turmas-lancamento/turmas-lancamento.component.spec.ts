import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurmasLancamentoComponent } from './turmas-lancamento.component';

describe('TurmasLancamentoComponent', () => {
  let component: TurmasLancamentoComponent;
  let fixture: ComponentFixture<TurmasLancamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TurmasLancamentoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TurmasLancamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
