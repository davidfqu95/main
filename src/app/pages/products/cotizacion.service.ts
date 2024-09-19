import { Injectable } from '@angular/core';
import { ProductoCotizacion } from './products-catalog.model';
import { Guid } from 'guid-typescript';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CotizacionService {
  cotizacionesChanged: Subject<ProductoCotizacion[]> = new Subject<ProductoCotizacion[]>();
  private cotizaciones_data: ProductoCotizacion[] = [];
  private numeroCotizacionActual: number = 0;
  
  constructor() { }

  getCotizaciones() {
    return this.cotizaciones_data.slice();
  }

  addCotizacion(cotizacion: ProductoCotizacion) {
    this.cotizaciones_data.push(cotizacion);
    this.cotizacionesChanged.next(this.cotizaciones_data.slice());
  }

  deleteCotizacion(id: Guid) {
    this.cotizaciones_data = this.cotizaciones_data.filter(cotizacion => cotizacion.id !== id);
    this.cotizacionesChanged.next(this.cotizaciones_data.slice());
  }

  updateCotizacion(id: Guid, newCotizacion: ProductoCotizacion) {
    const index = this.cotizaciones_data.findIndex(cotizacion => cotizacion.id === id);
    this.cotizaciones_data[index] = newCotizacion;
    this.cotizacionesChanged.next(this.cotizaciones_data.slice());
  }

  setCotizacionActual(numero: number) {
    this.numeroCotizacionActual = numero;
    if (this.numeroCotizacionActual <= 0) {
      this.numeroCotizacionActual = 0;
      this.cotizaciones_data = [];
    }
    this.cotizacionesChanged.next(this.cotizaciones_data.slice());
  }

  getCotizacionActual() {
    return this.numeroCotizacionActual;
  }

  clearCotizaciones() {
    this.cotizaciones_data = [];
  }
}
