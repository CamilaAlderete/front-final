import { Component, OnInit } from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute, Router} from "@angular/router";
import {Cliente} from "../../model/cliente";

@Component({
  selector: 'app-nuevo-cliente',
  templateUrl: './nuevo-cliente.component.html',
  styleUrls: ['./nuevo-cliente.component.css']
})
export class NuevoClienteComponent implements OnInit {

  titulo = 'Nuevo Cliente';
  cliente: Cliente = { id:0, nombre: '', ruc: '', email:''}
  lista: Cliente[] = []
  id:any = null;

  constructor(
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getLista();
    this.getLastId();
  }

  //obtiene el ultimo id cliente guardado en el local storage
  getLastId(){
    let id = localStorage.getItem("lastIdCliente");
    if(id === null){
      this.cliente.id = 1;
    }else{
      this.cliente.id = parseInt(id) + 1;
    }

  }

  getLista(){

    let lista = localStorage.getItem("clientes");
    if(lista !== null) {

      let jsonObj = JSON.parse(lista);
      this.lista = jsonObj as Cliente[]

    }

  }

  //guarda el ultimo id generado
  setLastId(){
    localStorage.setItem("lastIdCliente", this.cliente.id.toString());
  }

  guardar(){

    if( this.cliente.nombre.trim() === '' || this.cliente.ruc.trim() === '' || this.cliente.email.trim()===''){
      this.toastr.error('Debe completar todos los campos','Error');
    }else{
      this.lista.push(this.cliente);
      localStorage.setItem('clientes', JSON.stringify(this.lista));
      this.toastr.success('Cliente guardado exitosamente');
      this.setLastId();
      this.atras();
    }
  }

  atras() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

}
