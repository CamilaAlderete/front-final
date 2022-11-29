import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevaCabeceraComponent } from './nueva-cabecera.component';

describe('NuevoCabeceraComponent', () => {
  let component: NuevaCabeceraComponent;
  let fixture: ComponentFixture<NuevaCabeceraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevaCabeceraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevaCabeceraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
