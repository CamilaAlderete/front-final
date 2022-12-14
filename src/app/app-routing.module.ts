import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import {ListadoClientesComponent} from "./clientes/listado-clientes/listado-clientes.component";
import {NuevoClienteComponent} from "./clientes/nuevo-cliente/nuevo-cliente.component";
import {EditarClienteComponent} from "./clientes/editar-cliente/editar-cliente.component";
import {ReporteVentasDetalladoComponent} from "./reporte-ventas-detallado/reporte-ventas-detallado.component";
import {ReporteVentasResumidoComponent} from "./reporte-ventas-resumido/reporte-ventas-resumido.component";


import {ListadoProductosComponent} from "./productos/listado-productos/listado-productos.component";
import {NuevoProductoComponent} from "./productos/nuevo-producto/nuevo-producto.component";
import {EditarProductoComponent} from "./productos/editar-producto/editar-producto.component";
import {ListadoCabecerasComponent} from "./cabeceraConsumo/listado-cabeceras/listado-cabeceras.component";
import {NuevaCabeceraComponent} from "./cabeceraConsumo/nueva-cabecera/nueva-cabecera.component";
import {VistaRegistroProductosComponent} from "./cabeceraConsumo/vista-registro-productos/vista-registro-productos.component";

const routes: Routes = [
  {
    path:'',
    children: [
      {path:'', redirectTo: 'home', pathMatch: 'full'}, //http://localhost:4200/home
      {path:'home', component:HomeComponent},           //http://localhost:4200/home
      {path: 'cliente',
        children: [
          { path: '', redirectTo: 'lista', pathMatch: 'full'},
          { path: 'lista', component: ListadoClientesComponent },
          { path: 'nuevo', component: NuevoClienteComponent },
          { path: ':id/editar', component: EditarClienteComponent }
        ]
      },
      {path: 'producto',
        children: [
          { path: '', redirectTo: 'lista', pathMatch: 'full'},
          { path: 'lista', component: ListadoProductosComponent },
          { path: 'nuevo', component: NuevoProductoComponent },
          { path: ':id/editar', component: EditarProductoComponent }
        ]
      },
      {path: 'venta',
        children: [
          { path: '', redirectTo: 'lista', pathMatch: 'full'},
          { path: 'lista', component: ListadoCabecerasComponent },
          { path: 'nuevo', component: NuevaCabeceraComponent },
          { path: ':id/vista', component: VistaRegistroProductosComponent }

        ]
      },
      {path: 'reporte-detallado',
        children: [
          { path: '', component: ReporteVentasDetalladoComponent}
        ]
      },
      {path: 'reporte-resumido',
        children: [
          { path: '', component: ReporteVentasResumidoComponent}
        ]
      },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
