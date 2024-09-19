import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { CATALOGO_TARJETAS_PRESENTACION, TarjetasPresentacion} from '../products-catalog.model';
import { CotizacionService } from '../cotizacion.service';
import { Guid } from 'guid-typescript';

@Component({
  selector: 'app-tarjetas-presentacion',
  templateUrl: './tarjetas-presentacion.component.html',
  styleUrls: ['./tarjetas-presentacion.component.scss']
})
export class TarjetasPresentacionComponent implements OnInit {
  constructor(private cotizacionService: CotizacionService) { }

  cantidades: number[] | undefined;
  cantidad: number | undefined;
  precioTotal: number = 0;
  dobleCara: boolean = false;
  uv: boolean = false;
  tarjetaSelected: TarjetasPresentacion | undefined;

  ngOnInit(): void {
    this.cantidades = Array.from(new Set(CATALOGO_TARJETAS_PRESENTACION.map(tarjeta => tarjeta.cantidad)));
  }

  onCantidadChanged() {
    this.tarjetaSelected = CATALOGO_TARJETAS_PRESENTACION.find(tarjeta => tarjeta.cantidad === this.cantidad);
    this.onRecalcularPrecio();
  }

  onRecalcularPrecio() {
    this.precioTotal = this.tarjetaSelected?.precio || 0;
    if (this.dobleCara) {
      this.precioTotal += this.tarjetaSelected?.precioExtraDobleCara || 0;
    }
    if (this.uv) {
      this.precioTotal += this.tarjetaSelected?.precioExtraUv || 0;
    }
  }

  onAgregarProductoACotizacion() {
    this.cotizacionService.addCotizacion({
      id: Guid.create(),
      producto: `Tarjetas de presentación${this.dobleCara ? ' doble cara' : ''}`,
      medida: `-`,
      material: `${this.uv ? 'UV' : '-'}`,
      precio: this.precioTotal / this.cantidad! || 0,
      cantidad: this.cantidad || 0,
      importe: this.precioTotal
    });
  }
}
