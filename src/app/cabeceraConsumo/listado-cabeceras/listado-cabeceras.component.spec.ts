import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoCabecerasComponent } from './listado-cabeceras.component';

describe('ListadoCabecerasComponent', () => {
  let component: ListadoCabecerasComponent;
  let fixture: ComponentFixture<ListadoCabecerasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoCabecerasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoCabecerasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
