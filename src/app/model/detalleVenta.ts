import {Producto} from "./producto";

export class DetalleVenta {
  id!: string;
  producto!: Producto;
  cantidad!: number;
  totalDetalle!: number;
}
