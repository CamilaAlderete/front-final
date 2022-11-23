import { Component, OnInit } from '@angular/core';
import {CabeceraVenta} from "../model/cabeceraVenta";
import {Producto} from "../model/producto";
import {ToastrService} from "ngx-toastr";
import {DetalleVenta} from "../model/detalleVenta";
import {Cliente} from "../model/cliente";

/**
 * Clase para representar al reporte de ventas detallado
 */
class ReporteVentas {
  cabecera!: CabeceraVenta
  detalle!: DetalleVenta
}
@Component({
  selector: 'app-reporte-ventas-detallado',
  templateUrl: './reporte-ventas-detallado.component.html',
  styleUrls: ['./reporte-ventas-detallado.component.css']
})
export class ReporteVentasDetalladoComponent implements OnInit {

  listaVentasEditado: ReporteVentas[] = [];

  // filtros
  fechaDesde!: Date;
  fechaHasta!: Date;
  producto!: Producto;
  listaProductos!: Producto[];


  // para decirle al mat-table qué columnas poner
  displayedColumns: string[] = [
    "cliente",
    "fecha",
    "producto",
    "cantidad",
    "totalDetalle",
  ];

  constructor(
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    // TODO: traer del almacenamiento local la lista de ventas y borrar el let de abajo
    //let ventasJson = localStorage.getItem("ventas");
    let cabecerasPrueba: CabeceraVenta[] = [
      {
        id: "1",
        fecha: "01/01/0001",
        factura: "1",
        cliente: {
          id: 1,
          nombre: "cliente 1",
          email: "email",
          ruc: "1"
        },
        total: 1,
        detalles: [
          {
            id: "1",
            producto: {
              id: "1",
              codigo: "1",
              nombre: "producto 1",
              precioVenta: 10,
              existencia: 1
            },
            cantidad: 2,
            totalDetalle: 5
          },
          {
            id: "1",
            producto: {
              id: "1",
              codigo: "1",
              nombre: "producto 2",
              precioVenta: 10,
              existencia: 1
            },
            cantidad: 2,
            totalDetalle: 5
          },
        ]
      }
    ]
    let ventasJson = JSON.stringify(cabecerasPrueba);

    if (ventasJson) {
      let ventas: CabeceraVenta[] = JSON.parse(ventasJson);

      // crear un nuevo array con una cabecera por cada detalle
      ventas.forEach((venta) => {
        venta.detalles.forEach((detalle) => {
          let cabecera: ReporteVentas = {
            cabecera: venta,
            detalle: detalle
          }
          this.listaVentasEditado.push(cabecera);
        });
      });

    } else {
      this.toastr.warning('Lista vacía');
    }
  }

  filtrar() {

  }

}
