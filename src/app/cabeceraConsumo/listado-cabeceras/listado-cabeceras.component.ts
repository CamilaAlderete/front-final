import {Component, OnInit, ViewChild} from '@angular/core';
import {Producto} from "../../model/producto";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute, Router} from "@angular/router";
import {CabeceraVenta} from "../../model/cabeceraVenta";

@Component({
  selector: 'app-listado-cabeceras',
  templateUrl: './listado-cabeceras.component.html',
  styleUrls: ['./listado-cabeceras.component.css']
})
export class ListadoCabecerasComponent implements OnInit {

  titulo = 'Ventas';

  lista: CabeceraVenta[] = [];

  //columnas del la tabla (ojo: si no se colocan todas las columnas correspondientes en el html no se va poder ver nada)
  displayedColumns: string[] = ['id', 'fecha', 'factura', 'cliente', 'total', 'detalle', 'acciones'];
  displayedColumnsdetalle: string[] = ['producto', 'cantidad', 'precio', 'subtotal'];

  constructor(
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.getLista();
  }

  getLista(){

    let lista = localStorage.getItem("cabeceras");
    if(lista !== null){

      let jsonObj = JSON.parse(lista);
      this.lista = jsonObj as CabeceraVenta[]
    }else{
  //    this.toastr.warning('Lista vacía');
    }
  }

  delete(id: number){

    for (var i = 0; i < this.lista.length; i++) {

      let CabeceraVenta = this.lista[i];

      if( CabeceraVenta.id === id){
        this.lista.splice(i, 1);
        localStorage.setItem("cabeceras", JSON.stringify( this.lista));
        this.toastr.success('Venta eliminada exitosamente');
        this.getLista();
        break;
      }
    }
  }

}
