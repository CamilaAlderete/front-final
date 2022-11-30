import {Cliente} from "./cliente";
import {DetalleVenta} from "./detalleVenta";

export class CabeceraVenta {
  id!: number;
  fecha!: string;
  factura!: string;
  cliente!: Cliente;
  total!: number;
  detalles!: DetalleVenta[];
}
