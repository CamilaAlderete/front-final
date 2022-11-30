import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaRegistroProductosComponent } from './vista-registro-productos.component';

describe('VistaRegistroProductosComponent', () => {
  let component: VistaRegistroProductosComponent;
  let fixture: ComponentFixture<VistaRegistroProductosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VistaRegistroProductosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VistaRegistroProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
