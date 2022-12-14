import {LOCALE_ID, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';

import { LayoutModule } from '@angular/cdk/layout';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatFormFieldModule, MatLabel} from "@angular/material/form-field";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import { CositasUtilesComponent } from './cositas-utiles/cositas-utiles/cositas-utiles.component';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import {MatSelectModule} from '@angular/material/select';
import {MatListModule} from "@angular/material/list";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
import { ListadoClientesComponent } from './clientes/listado-clientes/listado-clientes.component';
import { NuevoClienteComponent } from './clientes/nuevo-cliente/nuevo-cliente.component';
import { EditarClienteComponent } from './clientes/editar-cliente/editar-cliente.component';
import { ReporteVentasDetalladoComponent } from './reporte-ventas-detallado/reporte-ventas-detallado.component';
import { ReporteVentasResumidoComponent } from './reporte-ventas-resumido/reporte-ventas-resumido.component';

import { ListadoProductosComponent } from './productos/listado-productos/listado-productos.component';
import { NuevoProductoComponent } from './productos/nuevo-producto/nuevo-producto.component';
import { EditarProductoComponent } from './productos/editar-producto/editar-producto.component';
import { NuevaCabeceraComponent } from './cabeceraConsumo/nueva-cabecera/nueva-cabecera.component';
import { ListadoCabecerasComponent } from './cabeceraConsumo/listado-cabeceras/listado-cabeceras.component';
import { VistaRegistroProductosComponent } from './cabeceraConsumo/vista-registro-productos/vista-registro-productos.component';

@NgModule({
  //componentes creados
  declarations: [
    AppComponent,
    HomeComponent,
    CositasUtilesComponent,
    ListadoClientesComponent,
    NuevoClienteComponent,
    EditarClienteComponent,
    ReporteVentasDetalladoComponent,
    ReporteVentasResumidoComponent,
    ReporteVentasResumidoComponent,
    ListadoProductosComponent,
    NuevoProductoComponent,
    EditarProductoComponent,
    NuevaCabeceraComponent,
    ListadoCabecerasComponent,
    VistaRegistroProductosComponent,
  ],
  // librerias y modulos de angular y librerias externas
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        LayoutModule,
        MatSidenavModule,
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        MatDividerModule,
        HttpClientModule,
        ToastrModule.forRoot(),
        MatTableModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatDialogModule,
        MatSelectModule,
        MatListModule,
        MatPaginatorModule,
        MatSortModule,
        ReactiveFormsModule,
        MatDialogModule,
    ],
  providers: [
    //para usar datepicker
    MatDatepickerModule,
    MatNativeDateModule,
    {
      provide: MatDialogRef,
      useValue: {}
    },
    { provide: LOCALE_ID, useValue: 'en-nz' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
