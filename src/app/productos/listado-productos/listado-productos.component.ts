import {Component, OnInit, ViewChild} from '@angular/core';
import {Producto} from "../../model/producto";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-listado-productos',
  templateUrl: './listado-productos.component.html',
  styleUrls: ['./listado-productos.component.css']
})
export class ListadoProductosComponent implements OnInit {

  titulo = 'Productos';

  lista: Producto[] = [];

  //columnas del la tabla (ojo: si no se colocan todas las columnas correspondientes en el html no se va poder ver nada)
  displayedColumns: string[] = ['id', 'codigo', 'nombre', 'precioVenta', 'existencia', 'acciones'];

  constructor(
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getLista();
  }

  getLista(){

    let lista = localStorage.getItem("productos");
    if(lista !== null){

      let jsonObj = JSON.parse(lista);
      this.lista = jsonObj as Producto[]

    }else{
      this.toastr.warning('Lista vacía');
    }
  }

  delete(id: number){

    for (var i = 0; i < this.lista.length; i++) {

      let producto = this.lista[i];

      if( producto.id === id){
        this.lista.splice(i, 1);
        localStorage.setItem("productos", JSON.stringify( this.lista));
        this.toastr.success('Producto eliminado exitosamente');
        this.getLista();
        break;
      }

    }
  }

}
