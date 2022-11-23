import { Component, OnInit } from '@angular/core';
import {CabeceraVenta} from "../model/cabeceraVenta";
import {Producto} from "../model/producto";
import {ToastrService} from "ngx-toastr";
import {DetalleVenta} from "../model/detalleVenta";
import {Cliente} from "../model/cliente";
import {DatePipe} from "@angular/common";

/**
 * Clase para representar al reporte de ventas detallado
 */
interface ReporteVentas {
  cabecera: CabeceraVenta // la cabecera del detalle
  detalle: DetalleVenta // el detalle
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
    this.listaVentasEditado = this.obtenerReporteCabeceras();
    this.cargarProductos();
  }

  /**
   * Devuelve un ReporteVenas[] que es el resultado de poner todos los DetalleVenta de la base de datos
   * en una interfaz ReporteVentas
   */
  obtenerReporteCabeceras (): ReporteVentas[] {
    let resultado: ReporteVentas [] = [];

    let ventasJson = localStorage.getItem("ventas");
    // datos de prueba en caso de ser necesario
    // let cabecerasPrueba: CabeceraVenta[] = [
    //   {
    //     id: "1",
    //     fecha: "11/23/2022",
    //     factura: "1",
    //     cliente: {
    //       id: 1,
    //       nombre: "cliente 1",
    //       email: "email",
    //       ruc: "1"
    //     },
    //     total: 1,
    //     detalles: [
    //       {
    //         id: "1",
    //         producto: {
    //           id: "1",
    //           codigo: "1",
    //           nombre: "producto 1",
    //           precioVenta: 10,
    //           existencia: 1
    //         },
    //         cantidad: 2,
    //         totalDetalle: 5
    //       },
    //       {
    //         id: "1",
    //         producto: {
    //           id: "1",
    //           codigo: "1",
    //           nombre: "producto 1",
    //           precioVenta: 10,
    //           existencia: 1
    //         },
    //         cantidad: 2,
    //         totalDetalle: 5
    //       },
    //     ]
    //   },
    //   {
    //     id: "1",
    //     fecha: "11/25/2022",
    //     factura: "1",
    //     cliente: {
    //       id: 1,
    //       nombre: "cliente 1",
    //       email: "email",
    //       ruc: "1"
    //     },
    //     total: 1,
    //     detalles: [
    //       {
    //         id: "1",
    //         producto: {
    //           id: "1",
    //           codigo: "1",
    //           nombre: "producto 1",
    //           precioVenta: 10,
    //           existencia: 1
    //         },
    //         cantidad: 2,
    //         totalDetalle: 5
    //       },
    //       {
    //         id: "1",
    //         producto: {
    //           id: "2",
    //           codigo: "1",
    //           nombre: "producto 2",
    //           precioVenta: 10,
    //           existencia: 1
    //         },
    //         cantidad: 2,
    //         totalDetalle: 5
    //       },
    //     ]
    //   }
    // ]
    // let ventasJson = JSON.stringify(cabecerasPrueba);

    if (ventasJson) {
      let ventas: CabeceraVenta[] = JSON.parse(ventasJson);

      // crear un nuevo array con una cabecera por cada detalle
      ventas.forEach((venta) => {
        venta.detalles.forEach((detalle) => {
          let cabecera: ReporteVentas = {
            cabecera: venta,
            detalle: detalle
          }
          resultado.push(cabecera);
        });
      });

    } else {
      this.toastr.warning('Lista de ventas vacía');
    }

    return resultado;
  }

  filtrar() {
    let respuesta: ReporteVentas[] = this.obtenerReporteCabeceras();

    if (this.fechaDesde && this.fechaHasta) {
      if (this.producto) {
        // hay fecha y producto
        for (let i=0; i< respuesta.length; i++){
          let fecha: Date = new Date(respuesta[i].cabecera.fecha);

          // verificar la condición del filtro
          if (
            ! ( this.fechaDesde <= fecha && fecha <= this.fechaHasta &&
              respuesta[i].detalle.producto.id == this.producto.id)
          ) {
            // borrar elemento en caso
            respuesta.splice(i--, 1);
          }
        }

      }
      else {
        // hay fecha pero no hay producto
        for (let i=0; i< respuesta.length; i++){
          let fecha: Date = new Date(respuesta[i].cabecera.fecha);

          // verificar la condición del filtro
          if (!( this.fechaDesde <= fecha && fecha <= this.fechaHasta)) {
            respuesta.splice(i--, 1);
          }

        };
      }
    } else if (this.producto) {
      // hay sólo producto
      for (let i=0; i< respuesta.length; i++){

        // verificar la condición del filtro
        if (this.producto.id != respuesta[i].detalle.producto.id) {
          respuesta.splice(i--, 1);
        }

      };
    }

    // no hay ningún filtro
    this.listaVentasEditado = respuesta;
  }

  /**
   * Cargar los productos de la base de datos para el filtro de productos
   */
  cargarProductos() {
    let productosJson = localStorage.getItem("productos");
    // datos de prueba en caso de ser necesarios
    // let productosPrueba = [
    //   {
    //     id: "1",
    //     codigo: "1",
    //     nombre: "producto 1",
    //     precioVenta: 10,
    //     existencia: 1
    //   },
    //   {
    //     id: "2",
    //     codigo: "1",
    //     nombre: "producto 2",
    //     precioVenta: 10,
    //     existencia: 1
    //   }
    // ]

    // let productosJson = JSON.stringify(productosPrueba);

    if (productosJson) {
      this.listaProductos = JSON.parse(productosJson);
    }
    else {
      this.toastr.warning("Lista de productos vacía");
    }
  }
}
