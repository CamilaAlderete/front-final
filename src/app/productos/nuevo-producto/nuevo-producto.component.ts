import { Component, OnInit } from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute, Router} from "@angular/router";
import {Producto} from "../../model/producto";

@Component({
  selector: 'app-nuevo-producto',
  templateUrl: './nuevo-producto.component.html',
  styleUrls: ['./nuevo-producto.component.css']
})
export class NuevoProductoComponent implements OnInit {

  titulo = 'Nuevo Producto';
  producto: Producto = { id:0, codigo:'', nombre: '', precioVenta: 0, existencia:0 }
  lista: Producto[] = []
  id:any = Producto;

  constructor(
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getLista();
    this.getLastId();
  }

  //obtiene el ultimo id Producto guardado en el local storage
  getLastId(){
    let id = localStorage.getItem("lastIdProducto");
    if(id === null){
      this.producto.id = 1;
    }else{
      this.producto.id = parseInt(id) + 1;
    }

  }

  getLista(){

    let lista = localStorage.getItem("productos");
    if(lista !== null) {

      let jsonObj = JSON.parse(lista);
      this.lista = jsonObj as Producto[]

    }

  }

  //guarda el ultimo id generado
  setLastId(){
    localStorage.setItem("lastIdProducto", this.producto.id.toString());
  }

  guardar(){

    if( this.producto.codigo.trim() === '' || this.producto.nombre.trim() === '' || this.producto.precioVenta.toString()==='' || this.producto.existencia.toString()===''){
      this.toastr.error('Debe completar todos los campos','Error');
    }else{
      this.lista.push(this.producto);
      localStorage.setItem('productos', JSON.stringify(this.lista));
      this.toastr.success('Producto guardado exitosamente');
      this.setLastId();
      this.atras();
    }
  }

  atras() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

}
