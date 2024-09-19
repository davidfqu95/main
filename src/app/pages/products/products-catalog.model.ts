import { Guid } from "guid-typescript";

export interface Cotizacion {
  id: string;
  titulo?: string;
  numero: number;
  fecha: Date;
  nombreCliente: string;
  subtotal: number;
  impuestos: number;
  descuento: number;
  total: number;
  iva: number;
  creador: string;
  fechaCreacion: Date;
  productos: ProductoCotizacion[];
}

export interface ProductoCotizacion {
  id: Guid;
  producto: string;
  medida: string;
  material: string;
  precio: number;
  cantidad: number;
  importe: number;
}

export class Lonas {
    id: string;
    tipo: string;
    ancho: string;
    precioM2: number;
    precioM2mayoreo: number;
  
    constructor(tipo: string, ancho: string, precioM2: number, precioM2mayoreo: number) {
      this.id = Guid.create().toString();
      this.tipo = tipo;
      this.ancho = ancho;
      this.precioM2 = precioM2;
      this.precioM2mayoreo = precioM2mayoreo;
    }
  }
  
  export const CATALOGO_LONAS: Lonas[] = [
    new Lonas('13 oz', '3.1', 110, 80),
    new Lonas('Mesh', '3.1', 200, 150),
    new Lonas('Double print', '2.1', 200, 170),
    new Lonas('Translúcida 3 años', '1.4', 250, 0),
    new Lonas('Translúcida 3 años', '2.4', 400, 0),
    new Lonas('Translúcida 3 años', '3.1', 500, 0),
    new Lonas('Translúcida 5 años', '1.4', 300, 0),
    new Lonas('Translúcida 5 años', '2.4', 500, 0),
    new Lonas('Translúcida 5 años', '3.1', 600, 0),
    new Lonas('Translúcida 7 años', '2.4', 700, 0),
    new Lonas('Translúcida 7 años', '3.1', 800, 0),
  ];
  
      export class Viniles {
        id: string;
        tipo: string;
        subtipo: string;
        ancho: string;
        precioM2: number;
        precioM2mayoreo: number;
      
        constructor(tipo: string, subtipo: string ,ancho: string, precioM2: number, precioM2mayoreo: number) {
          this.id = Guid.create().toString();
          this.tipo = tipo;
          this.subtipo = subtipo;
          this.ancho = ancho;
          this.precioM2 = precioM2;
          this.precioM2mayoreo = precioM2mayoreo;
        }
      }

export class Telas {
  id: string;
  tipo: string;
  precioM2: number;
  precioM2mayoreo: number;
  constructor(tipo: string, precioM2: number, precioM2mayoreo: number) {
    this.id = Guid.create().toString();
    this.tipo = tipo;
    this.precioM2 = precioM2;
    this.precioM2mayoreo = precioM2mayoreo;
  }
}

export class Laminas {
  id: string;
  tipo: string;
  subtipo: string;
  unidad: string;
  ancho: string;
  metros: string;
  precioM2: number;
  precioM2mayoreo: number;

  constructor(tipo: string,subtipo: string, unidad: string, ancho:string, metros:string, precioM2: number, precioM2mayoreo: number) {
    this.id = Guid.create().toString();
    this.tipo = tipo;
    this.subtipo = subtipo;
    this.unidad = unidad;
    this.ancho = ancho;
    this.metros = metros;
    this.precioM2 = precioM2;
    this.precioM2mayoreo = precioM2mayoreo;
  }
}

export class Displays {
  id: string;
  tipo: string;
  unidad: string;
  precioM2: number;
  precioM2mayoreo: number;

  constructor(tipo: string, unidad: string, precioM2: number, precioM2mayoreo: number) {
    this.id = Guid.create().toString();
    this.tipo = tipo;
    this.unidad = unidad;
    this.precioM2 = precioM2;
    this.precioM2mayoreo = precioM2mayoreo;
  }
}

export class RotulacionVehicular {
  id: string;
  tipo: string;
  ancho: number;
  precioM2: number;
  constructor(tipo: string, ancho: number, precioM2: number) {
    this.id = Guid.create().toString();
    this.tipo = tipo;
    this.ancho = ancho;
    this.precioM2 = precioM2;
  }
}

export const CATALOGO_ROTULACION_VEHICULAR: RotulacionVehicular[] = [
    new RotulacionVehicular('3M', 1.45, 1200),
]

export class TarjetasPresentacion {
  cantidad: number;
  precio: number;
  precioExtraDobleCara: number;
  precioExtraUv: number;

  constructor(cantidad: number, precio: number) {
    this.cantidad = cantidad;
    this.precio = precio;
    this.precioExtraDobleCara = precio * 0.5;
    this.precioExtraUv = cantidad * 0.25;
  }
}

export const CATALOGO_TARJETAS_PRESENTACION: TarjetasPresentacion[] = [
    new TarjetasPresentacion(100, 120),
    new TarjetasPresentacion(200, 220),
    new TarjetasPresentacion(300, 315),
    new TarjetasPresentacion(400, 380),
    new TarjetasPresentacion(500, 450),
    new TarjetasPresentacion(600, 530),
    new TarjetasPresentacion(700, 605),
    new TarjetasPresentacion(800, 675),
    new TarjetasPresentacion(900, 740),
    new TarjetasPresentacion(1000, 850),
]

export class CotizacionIndex {
  ultimoNumero: number;
  constructor(ultimoNumero: number) {
    this.ultimoNumero = ultimoNumero;
  }
}

export class OtrosProductos {
  id: string;
  producto: string;
  tipo: string;
  tipo2: string;
  precio: number;
  precioMayoreo: number;

  constructor(producto: string, tipo: string, tipo2: string, precio: number, precioMayoreo: number) {
    this.id = Guid.create().toString();
    this.producto = producto;
    this.tipo = tipo;
    this.tipo2 = tipo2;
    this.precio = precio;
    this.precioMayoreo = precioMayoreo;
  }
}

export const CATALOGO_OTROS_PRODUCTOS: OtrosProductos[] = [
  new OtrosProductos('Digitalizado', '', '', 300, 0),
  new OtrosProductos('Gorra', 'Sublimada', '', 180, 0),
  new OtrosProductos('Gorra', 'DTF', '', 300, 0),
  new OtrosProductos('Camiseta', 'Sublimada', 'Impresión hoja carta', 200, 0),
  new OtrosProductos('Camiseta', 'Sublimada', 'Impresión 1/2 carta', 170, 0),
  new OtrosProductos('Camiseta', 'Sublimada', 'Impresión 1/4 carta', 140, 0),
  new OtrosProductos('Camiseta', 'Sublimada', 'Dos impresiones carta', 240, 0),
  new OtrosProductos('Camiseta', 'DTF', 'Impresión hoja carta', 250, 0),
  new OtrosProductos('Camiseta', 'DTF', 'Impresión 1/2 carta', 190, 0),
  new OtrosProductos('Camiseta', 'DTF', 'Impresión 1/4 carta', 160, 0),
  new OtrosProductos('Camiseta', 'DTF', 'Dos impresiones carta', 290, 0),
  new OtrosProductos('Sudadera (DTF)', 'Impresión hoja carta', 'Sencilla', 530, 0),
  new OtrosProductos('Sudadera (DTF)', 'Impresión 1/2 carta', 'Sencilla', 500, 0),
  new OtrosProductos('Sudadera (DTF)', 'Impresión 1/4 carta', 'Sencilla', 480, 0),
  new OtrosProductos('Sudadera (DTF)', 'Dos impresiones carta', 'Sencilla', 570, 0),
  new OtrosProductos('Sudadera (DTF)', 'Impresión hoja carta', 'Con capucha y bolsa', 560, 0),
  new OtrosProductos('Sudadera (DTF)', 'Impresión 1/2 carta', 'Con capucha y bolsa', 540, 0),
  new OtrosProductos('Sudadera (DTF)', 'Impresión 1/4 carta', 'Con capucha y bolsa', 520, 0),
  new OtrosProductos('Sudadera (DTF)', 'Dos impresiones carta', 'Con capucha y bolsa', 590, 0),
  new OtrosProductos('Taza', 'Blanca 11 oz diseño 20,5 cm x 8,5 cm', '', 120, 0),
  new OtrosProductos('Tabloide', 'Una cara', 'Medida 11x7', 15, 0),
  new OtrosProductos('Tabloide', 'Una cara', 'Medida 12x8', 18, 0),
  new OtrosProductos('Tabloide', 'Ambas caras', 'Medida 11x7', 30, 0),
  new OtrosProductos('Tabloide', 'Ambas caras', 'Medida 12x8', 36, 0),
  new OtrosProductos('Recetarios', 'Solo original', 'Tamaño carta', 2.5, 0),
  new OtrosProductos('Recetarios', 'Solo original', 'Tamaño 1/2 carta', 1.25, 0),
  new OtrosProductos('Recetarios', 'Solo original', 'Tamaño 1/4 carta', 0.65, 0),
  new OtrosProductos('Recetarios', 'Original y 2 copias', 'Tamaño carta', 9.25, 0),
  new OtrosProductos('Recetarios', 'Original y 2 copias', 'Tamaño 1/2 carta', 4.65, 0),
  new OtrosProductos('Recetarios', 'Original y 2 copias', 'Tamaño 1/4 carta', 2.35, 0),
  new OtrosProductos('Recetarios', 'Original y copia', 'Tamaño carta', 7, 0),
  new OtrosProductos('Recetarios', 'Original y copia', 'Tamaño 1/2 carta', 3.5, 0),
  new OtrosProductos('Recetarios', 'Original y copia', 'Tamaño 1/4 carta', 1.75, 0),
  new OtrosProductos('Block de notas', 'Solo original', 'Tamaño carta', 2.5, 0),
  new OtrosProductos('Block de notas', 'Solo original', 'Tamaño 1/2 carta', 1.25, 0),
  new OtrosProductos('Block de notas', 'Solo original', 'Tamaño 1/4 carta', 0.65, 0),
  new OtrosProductos('Block de notas', 'Original y 2 copias', 'Tamaño carta', 9.25, 0),
  new OtrosProductos('Block de notas', 'Original y 2 copias', 'Tamaño 1/2 carta', 4.65, 0),
  new OtrosProductos('Block de notas', 'Original y 2 copias', 'Tamaño 1/4 carta', 2.35, 0),
  new OtrosProductos('Block de notas', 'Original y copia', 'Tamaño carta', 7, 0),
  new OtrosProductos('Block de notas', 'Original y copia', 'Tamaño 1/2 carta', 3.5, 0),
  new OtrosProductos('Block de notas', 'Original y copia', 'Tamaño 1/4 carta', 1.75, 0),
  new OtrosProductos('Hojas memembretadas', '500 hojas', '', 1250, 0),
  new OtrosProductos('Tabloide engomado', '11x17', '', 35, 0),
  new OtrosProductos('Tabloide engomado', '12x18', '', 40, 0),
  new OtrosProductos('Flyer', 'Hoja carta, papel bond', 'Por un lado', 5, 0),
  new OtrosProductos('Flyer', 'Hoja carta, papel text o cover', 'Por un lado', 8, 0),
  new OtrosProductos('Flyer', 'Hoja carta, papel bond', 'Por los dos lados', 10, 0),
  new OtrosProductos('Flyer', 'Hoja carta, papel text o cover', 'Por los dos lados', 15, 0),
  new OtrosProductos('Folletos', 'Hoja carta, papel bond', 'Por un lado', 5, 0),
  new OtrosProductos('Folletos', 'Hoja carta, papel text o cover', 'Por un lado', 8, 0),
  new OtrosProductos('Folletos', 'Hoja carta, papel bond', 'Por los dos lados', 10, 0),
  new OtrosProductos('Folletos', 'Hoja carta, papel text o cover', 'Por los dos lados', 15, 0),
  new OtrosProductos('Folder', 'Impreso por un lado', 'Una solapa', 35, 0),
  new OtrosProductos('Folder', 'Impreso por un lado', 'Dos solapas', 40, 0),
  new OtrosProductos('Folder', 'Impreso por los dos lados', 'Una solapa', 46, 0),
  new OtrosProductos('Folder', 'Impreso por los dos lados', 'Dos solapas', 50, 0),
  new OtrosProductos('Invitaciones', 'Medida 11x7', '', 35, 0),
  new OtrosProductos('Invitaciones', 'Medida 12x8', '', 40, 0),
  new OtrosProductos('Menus', 'Medida 11x7', '', 35, 0),
  new OtrosProductos('Menus', 'Medida 12x8', '', 40, 0),
  new OtrosProductos('Catálogos', 'Medida 11x7', '', 35, 0),
  new OtrosProductos('Catálogos', 'Medida 12x8', '', 40, 0),
]