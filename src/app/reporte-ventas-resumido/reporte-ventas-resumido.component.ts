import { Component, OnInit } from '@angular/core';
import {CabeceraVenta} from "../model/cabeceraVenta";
import {Cliente} from "../model/cliente";
import {ToastrService} from "ngx-toastr";





  /**
   * Clase para representar al reporte de ventas resumido
   */

interface ReporteVentas {
  cabecera: CabeceraVenta // la cabecera del detalle
}

@Component({
  selector: 'app-reporte-ventas-resumido',
  templateUrl: './reporte-ventas-resumido.component.html',
  styleUrls: ['./reporte-ventas-resumido.component.css']
})
export class ReporteVentasResumidoComponent implements OnInit {

  listaVentas: ReporteVentas[] = [];

  // filtros
  fechaDesde!: Date;
  fechaHasta!: Date;
  cliente!: Cliente;
  listaClientes!: Cliente[];

  // para decirle al mat-table qué columnas poner
  displayedColumns: string[] = [
    "fecha",
    "cliente",
    "totalVenta",
    "factura",
  ];

  constructor(
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.listaVentas = this.obtenerReporteCabeceras();
    this.cargarClientes();
  }


  /**
   * Devuelve un ReporteVenas[] que es el resultado de poner todos los DetalleVenta de la base de datos
   * en una interfaz ReporteVentas
   */
  obtenerReporteCabeceras (): ReporteVentas[] {
    let resultado: ReporteVentas [] = [];

    //let ventasJson = localStorage.getItem("ventas");
    // datos de prueba en caso de ser necesario
    let cabecerasPrueba: CabeceraVenta[] = [
      {
        id: "1",
        fecha: "11/23/2022",
        factura: "1",
        cliente: {
          id: 1,
          nombre: "caje",
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
              nombre: "producto 1",
              precioVenta: 10,
              existencia: 1
            },
            cantidad: 2,
            totalDetalle: 5
          },
        ]
      },
      {
        id: "1",
        fecha: "11/25/2022",
        factura: "1",
        cliente: {
          id: 2,
          nombre: "cami",
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
              id: "2",
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
      ventas.forEach((venta) => {
          let cabecera: ReporteVentas = {
            cabecera: venta
          }
          resultado.push(cabecera);
      });

    } else {
      this.toastr.warning('Lista de ventas vacía');
    }

    return resultado;
  }

  /**
   * Cargar los clientes de la base de datos para el filtro de clientes
   */
  cargarClientes() {
    //let clientesJson = localStorage.getItem("clientes");
    // datos de prueba en caso de ser necesarios
    let productosPrueba = [
      {
        id: 2 ,
        nombre: "cami",
        email: "email",
        ruc: "1"
      },
      {
        id: 1,
        nombre: "caje",
        email: "email",
        ruc: "1"
      }
    ]

    let clientesJson = JSON.stringify(productosPrueba);
    if (clientesJson) {
      this.listaClientes = JSON.parse(clientesJson);
    }
    else {
      this.toastr.warning("Lista de productos vacía");
    }
  }


  filtrar() {
    let respuesta: ReporteVentas[] = this.obtenerReporteCabeceras();

    if (this.fechaDesde && this.fechaHasta) {
      if (this.cliente) {
        // hay fecha y producto
        for (let i=0; i< respuesta.length; i++){
          let fecha: Date = new Date(respuesta[i].cabecera.fecha);

          // verificar la condición del filtro
          if (
            ! ( this.fechaDesde <= fecha && fecha <= this.fechaHasta &&
              respuesta[i].cabecera.cliente.id == this.cliente.id)
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
    } else if (this.cliente) {
      // hay sólo producto
      for (let i=0; i< respuesta.length; i++){

        // verificar la condición del filtro
        if (this.cliente.id != respuesta[i].cabecera.cliente.id) {
          respuesta.splice(i--, 1);
        }

      };
    }

    // no hay ningún filtro
    this.listaVentas = respuesta;
  }






}
