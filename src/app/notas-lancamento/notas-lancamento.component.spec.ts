import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotasLancamentoComponent } from './notas-lancamento.component';

describe('NotasLancamentoComponent', () => {
  let component: NotasLancamentoComponent;
  let fixture: ComponentFixture<NotasLancamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotasLancamentoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotasLancamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
