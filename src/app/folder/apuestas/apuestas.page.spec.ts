import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApuestasPage } from './apuestas.page';

describe('ApuestasPage', () => {
  let component: ApuestasPage;
  let fixture: ComponentFixture<ApuestasPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ApuestasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
