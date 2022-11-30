import { Component, OnInit } from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute, Router} from "@angular/router";
import {Cliente} from "../../model/cliente";

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.css']
})
export class EditarClienteComponent implements OnInit {

  titulo = 'Editar cliente';

  lista: Cliente[] = [];
  cliente = new Cliente();
  index = 0;

  constructor(
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getLista();
    let id =  decodeURI( this.route.snapshot.paramMap.get('id') || '0') ;
    this.getItem( parseInt(id));
  }

  getItem(id: number){

    for (var i = 0; i < this.lista.length; i++) {

      let cliente = this.lista[i];

      //guardo cliente y su posicion en el listado
      if( cliente.id === id){
        this.cliente = cliente;
        this.index = i;
        break;
      }
    }
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

  guardar(){

    if( this.cliente.nombre.trim() === '' || this.cliente.ruc.trim() === '' || this.cliente.email.trim()===''){
      this.toastr.error('Debe completar todos los campos','Error');
    }else{

      this.lista[this.index] = this.cliente;
      localStorage.setItem('clientes', JSON.stringify(this.lista));
      this.toastr.success('Cliente editado exitosamente');
      this.atras();

    }
  }

  atras() {
    this.router.navigate(['../../'], {relativeTo: this.route});
  }


}
