import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PilotosPage } from './pilotos.page';

describe('PilotosPage', () => {
  let component: PilotosPage;
  let fixture: ComponentFixture<PilotosPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PilotosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
