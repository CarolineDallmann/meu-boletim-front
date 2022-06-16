import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisulizacaoboletimComponent } from './visulizacaoboletim.component';

describe('VisulizacaoboletimComponent', () => {
  let component: VisulizacaoboletimComponent;
  let fixture: ComponentFixture<VisulizacaoboletimComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VisulizacaoboletimComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisulizacaoboletimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
