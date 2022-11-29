import { Component, OnInit } from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute, Router} from "@angular/router";
import {Producto} from "../../model/producto";

@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.component.html',
  styleUrls: ['./editar-producto.component.css']
})
export class EditarProductoComponent implements OnInit {

  titulo = 'Editar producto';

  lista: Producto[] = [];
  producto = new Producto();
  index = 0;

  constructor(
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getLista();
    let id =  decodeURI( this.route.snapshot.paramMap.get('id') || '0') ;
    this.getItem(parseInt(id));
  }

  getItem(id: number){

    for (var i = 0; i < this.lista.length; i++) {

      let producto = this.lista[i];

      //guardo producto y su posicion en el listado
      if(producto.id === id){
        this.producto = producto;
        this.index = i;
        break;
      }
    }
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

  guardar(){

    if( this.producto.codigo.trim() === '' || this.producto.nombre.trim() === '' || this.producto.precioVenta.toString()==='' || this.producto.existencia.toString()===''){
      this.toastr.error('Debe completar todos los campos','Error');
    }else{

      this.lista[this.index] = this.producto;
      localStorage.setItem('productos', JSON.stringify(this.lista));
      this.toastr.success("Producto editado exitosamente");
      this.atras();

    }
  }

  atras() {
    this.router.navigate(['../../'], {relativeTo: this.route});
  }


}
