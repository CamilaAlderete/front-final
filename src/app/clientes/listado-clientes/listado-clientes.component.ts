import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {Cliente} from "../../model/cliente";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-listado-clientes',
  templateUrl: './listado-clientes.component.html',
  styleUrls: ['./listado-clientes.component.css']
})
export class ListadoClientesComponent implements OnInit {

  titulo = 'Clientes';

  lista: Cliente[] = [];

  //columnas del la tabla (ojo: si no se colocan todas las columnas correspondientes en el html no se va poder ver nada)
  displayedColumns: string[] = ['id','nombre','email', 'ruc', 'acciones'];

  constructor(
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getLista();
  }

  getLista(){

    let lista = localStorage.getItem("clientes");
    if(lista !== null){

      let jsonObj = JSON.parse(lista);
      this.lista = jsonObj as Cliente[]

    }else{
      this.toastr.warning('Lista vacía');
    }
  }

  delete(id: number){

    for (var i = 0; i < this.lista.length; i++) {

      let cliente = this.lista[i];

      if( cliente.id === id){
        this.lista.splice(i, 1);
        localStorage.setItem("clientes", JSON.stringify( this.lista));
        this.toastr.success('Cliente eliminado exitosamente');
        this.getLista();
        break;
      }

    }
  }

}
