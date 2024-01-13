import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CircuitosPage } from './circuitos.page';

describe('CircuitosPage', () => {
  let component: CircuitosPage;
  let fixture: ComponentFixture<CircuitosPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CircuitosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
