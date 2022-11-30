import { Component, OnInit } from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute, Router} from "@angular/router";
import {CabeceraVenta} from "../../model/cabeceraVenta";
import {Producto} from "../../model/producto";

@Component({
  selector: 'app-vista-registro-productos',
  templateUrl: './vista-registro-productos.component.html',
  styleUrls: ['./vista-registro-productos.component.css']
})
export class VistaRegistroProductosComponent implements OnInit {

  cabecera = new CabeceraVenta();
  displayedColumns : string[] =  ['id', 'nombre', 'cantidad',  'precio', 'total'];


  constructor(
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    let id =  decodeURI( this.route.snapshot.paramMap.get('id') || '0') ;
    this.getCabecera( parseInt(id));
  }

  getCabecera(id: number){

    let cabecerasAux = localStorage.getItem("cabeceras");

    if(cabecerasAux !== null) {

      let jsonObj = JSON.parse(cabecerasAux);
      let cabeceras = jsonObj as CabeceraVenta[];

      for(var i=0; i < cabeceras.length; i++){
        if(cabeceras[i].id === id){
          this.cabecera = cabeceras[i];
          break;
        }
      }

    }

  }

  atras() {
    this.router.navigate(['../../'], {relativeTo: this.route});
  }


}
