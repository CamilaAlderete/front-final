import { Component, OnInit } from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute, Router} from "@angular/router";
import {CabeceraVenta} from "../../model/cabeceraVenta";
import {DetalleVenta} from "../../model/detalleVenta";
import {Cliente} from "../../model/cliente";
import {Producto} from "../../model/producto";

@Component({
  selector: 'app-nuevo-cabecera',
  templateUrl: './nueva-cabecera.component.html',
  styleUrls: ['./nueva-cabecera.component.css']
})
export class NuevaCabeceraComponent implements OnInit {

  titulo = 'Venta';
  clientes : Cliente [] = [];
  productos : Producto [] = [];
  detalles : DetalleVenta [] = [];

  //para el detalle
  cantidad = 1;
  totalDetalle: any =  null;
  producto: any = null;

  detalles1 : DetalleVenta = {
  id: 0 ,
  producto: this.producto,
  cantidad: this.cantidad,
  totalDetalle: this.totalDetalle
  };

  cliente : any = Cliente;
  minDate = new Date(); //para que solo se pueda reservar de hoy en adelante

  cabecera: CabeceraVenta = { id:0, fecha:'', factura: '', cliente:this.cliente,
    total:0, detalles:this.detalles }

  displayedColumns : string[] =  ['id', 'nombre', 'cantidad',  'precio', 'total', 'acciones'];

  lista: CabeceraVenta[] = []
  id:any = CabeceraVenta;

  constructor(
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  // *******************************************  CABECERA  ************************************************

  ngOnInit(): void {
    this.getLista();
    this.getLastId();
  }

  //obtiene el ultimo id Cabecera guardado en el local storage
  getLastId(){
    let id = localStorage.getItem("lastIdCabecera");
    if(id === null){
      this.cabecera.id = 1;
    }else{
      this.cabecera.id = parseInt(id) + 1;
    }

  }

  getLista(){

    //lista cabeceras
    let lista = localStorage.getItem("cabeceras");
    if(lista !== null) {

      let jsonObj = JSON.parse(lista);
      this.lista = jsonObj as CabeceraVenta[]
    }

    //lista clientes
    let listaCliente = localStorage.getItem("clientes");
    if(listaCliente !== null) {

      let jsonObj = JSON.parse(listaCliente);
      this.clientes = jsonObj as Cliente[]
    }

    //lista productos
    let listaProductos = localStorage.getItem("productos");
    if(listaProductos !== null) {

      let jsonObj = JSON.parse(listaProductos);
      this.productos = jsonObj as Producto[]
    }

  }

  //guarda el ultimo id generado
  setLastId(){
    localStorage.setItem("lastIdCabecera", this.cabecera.id.toString());
  }

  guardar(){

    if( this.cabecera.fecha.toString().trim() === '' || this.cabecera.factura.trim() === '' || this.cabecera.cliente.toString()==='' || this.cabecera.total.toString()===''){
      this.toastr.error('Debe completar todos los campos de la cabecera','Error');
    }
    else if(this.cabecera.detalles.length===0){
      this.toastr.error('La venta debe poseer al menos 1 detalle','Error');
    }else{
      this.cabecera.cliente = this.clientes[this.cliente];
      this.lista.push(this.cabecera);
      localStorage.setItem('cabeceras', JSON.stringify(this.lista));
      this.toastr.success('Venta registrada exitosamente');
      this.setLastId();
      this.atras();
    }
  }

 // *************************************** DETALLES **********************************************************
  getListadetalles(){

    let detallesLista = localStorage.getItem("detalles");
    if(detallesLista !== null) {

      let jsonObj = JSON.parse(detallesLista);
      this.detalles = jsonObj as DetalleVenta[]

    }
  }

  agregarDetalle(){
    if(this.producto === null){
      this.toastr.error('Debe seleccionar un producto','Error');
    }else{
      this.agregarDetalleVenta();
    }
  }

  agregarDetalleVenta(){

    this.detalles1.id=Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10) +
        Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10) +
      Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10);
    this.detalles1.cantidad = this.cantidad;
    this.detalles1.producto = this.productos[this.producto];
    this.detalles1.totalDetalle = this.totalDetalle;

    this.detalles.push(this.detalles1);
    localStorage.setItem('detalles', JSON.stringify(this.detalles));
    this.getListadetalles();

    this.cabecera.total = this.cabecera.total + this.totalDetalle; //suma al total de la cabecera

    //borra los datos del detalle agregado
    this.cantidad = 1 ;
    this.producto = null;
    this.totalDetalle = 0;
  }


  totalProducto(){
    for(var UNproducto of this.productos){

      if(UNproducto.id === this.producto){
        this.totalDetalle = UNproducto.precioVenta * this.cantidad; //actualiza el total del detalle

        //actualiza el total de la cabecera
        let suma = 0;
        for(var UNO of this.detalles){
          suma = suma + UNO.cantidad*UNO.producto.precioVenta;
        }
        this.cabecera.total = suma;

        break;
      }
    }
  }

  eliminar(id: number){
      for (var i = 0; i < this.detalles.length; i++) {

        let UNdetalle = this.detalles[i];

        if( UNdetalle.id === id){
          this.cabecera.total = this.cabecera.total - UNdetalle.totalDetalle; //resta al total de la cabecera

          this.detalles.splice(i, 1); //eliminado un detalle
          localStorage.setItem('detalles', JSON.stringify(this.detalles));
          this.getListadetalles();
          this.cabecera.detalles = this.detalles; //actualizado la lista de detalles de la cabecera para luego guardar
          break;
        }
      }
  }

  atras() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

}
