import { Component, OnInit } from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute, Router} from "@angular/router";
import {CabeceraVenta} from "../../model/cabeceraVenta";
import {DetalleVenta} from "../../model/detalleVenta";
import {Cliente} from "../../model/cliente";
import {Producto} from "../../model/producto";
import {DatePipe} from "@angular/common";

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

    //{
  //   id: 0 ,
  //   producto: this.producto,
  //   cantidad: this.cantidad,
  //   totalDetalle: this.totalDetalle
  // };

  cliente : any = Cliente;
  minDate = new Date(); //para que solo se pueda reservar de hoy en adelante
  fecha = new Date();
  fechaStr = this.dateFormater(this.fecha);

  cabecera: CabeceraVenta = { id:0, fecha: this.fechaStr, factura: '', cliente:this.cliente,
    total:0, detalles:this.detalles }

  displayedColumns : string[] =  ['id', 'nombre', 'cantidad',  'precio', 'total', 'acciones'];

  lista: CabeceraVenta[] = []
  id:any = CabeceraVenta;

  lastIdDetalle: number = 1;

  constructor(
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.setListaDetalles(); //vaciar temp
    this.getLista();
    this.getLastIdCabecera();
    this.getLastIdDetalle();
  }

  //obtiene el ultimo id Cabecera guardado en el local storage
  getLastIdCabecera(){
    let id = localStorage.getItem("lastIdCabecera");
    if(id === null){
      this.cabecera.id = 1;
    }else{
      this.cabecera.id = parseInt(id) + 1;
    }

  }

  getLastIdDetalle(){
    let id = localStorage.getItem("lastIdDetalle");
    if(id === null){
      this.lastIdDetalle = 1;
    }else{
      this.lastIdDetalle = parseInt(id) + 1;
    }

  }

  dateFormater(fecha:Date){
    return new DatePipe('en-US').transform(fecha, 'MM/dd/yyyy') || ''
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
  setLastIdCabecera(){
    localStorage.setItem("lastIdCabecera", this.cabecera.id.toString());
  }


  setLastIdDetalle(){
    localStorage.setItem("lastIdDetalle", this.lastIdDetalle.toString());
  }


  guardar(){

    if( this.cabecera.fecha.toString().trim() === '' || this.cabecera.factura.trim() === '' || this.cabecera.cliente.toString()==='' || this.cabecera.total.toString()===''){
      this.toastr.error('Debe completar todos los campos de la cabecera','Error');
    }
    else if(this.cabecera.detalles.length===0){
      this.toastr.error('La venta debe poseer al menos 1 detalle','Error');
    }else{
      //      this.cabecera.cliente = this.clientes[this.cliente];
      this.cabecera.fecha = this.dateFormater(this.fecha);
      this.cabecera.detalles = this.detalles;
      this.lista.push(this.cabecera);

      localStorage.setItem('cabeceras', JSON.stringify(this.lista));
      this.toastr.success('Venta registrada exitosamente');

      this.setLastIdCabecera();
      this.setLastIdDetalle();
      this.atras();
    }
  }

  getListadetalles(){

    let detallesLista = localStorage.getItem("tempDetalles");
    if(detallesLista !== null) {

      let jsonObj = JSON.parse(detallesLista);
      this.detalles = jsonObj as DetalleVenta[]

    }
  }

  setListaDetalles(){
    localStorage.setItem('tempDetalles', JSON.stringify(this.detalles));
  }

  agregarDetalle(){
    if(this.producto === null){
      this.toastr.error('Debe seleccionar un producto','Error');
    }else{
      this.agregarDetalleVenta();
    }
  }

  agregarDetalleVenta(){

    /*this.detalle.id=Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10) +
        Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10) +
      Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10);*/
    let detalle = new DetalleVenta();
    detalle.id= this.lastIdDetalle;
    this.lastIdDetalle = this.lastIdDetalle + 1;
    detalle.cantidad = this.cantidad;
    detalle.producto = this.producto;
    detalle.totalDetalle = this.totalDetalle;

    this.detalles.push(detalle);

    this.setListaDetalles();
    this.getListadetalles();

    this.cabecera.total = this.cabecera.total + this.totalDetalle; //suma al total de la cabecera

    //borra los datos del detalle agregado
    this.cantidad = 1 ;
    this.producto = null;
    this.totalDetalle = 0;
  }


  totalProducto(){
    for(var UNproducto of this.productos){

      if(UNproducto === this.producto){
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
          this.setListaDetalles();
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
