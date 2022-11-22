import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import {ListadoClientesComponent} from "./clientes/listado-clientes/listado-clientes.component";
import {NuevoClienteComponent} from "./clientes/nuevo-cliente/nuevo-cliente.component";
import {EditarClienteComponent} from "./clientes/editar-cliente/editar-cliente.component";


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
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
