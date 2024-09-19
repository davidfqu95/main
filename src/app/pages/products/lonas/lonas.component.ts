import { Component, OnInit, OnDestroy } from '@angular/core';
import { CotizacionService } from '../cotizacion.service';
import { DataBaseRepositoryService } from '../data-base-repository-service';
import { Guid } from 'guid-typescript';
import { AuthService, User } from '../../authentication/auth.service';
import { Subscription } from 'rxjs';
import { Lonas } from '../products-catalog.model';

@Component({
  selector: 'app-lonas',
  templateUrl: './lonas.component.html',
  styleUrls: ['./lonas.component.scss']
})
export class LonasComponent implements OnInit, OnDestroy {
  constructor(
    private cotizacionService: CotizacionService,
    private dataBaseRepositoryService: DataBaseRepositoryService,
    private authService: AuthService
  ) { }
  private userSub: Subscription;
  user : User | null = null;
  
  tipos: string[] | undefined;
  anchos: string [] | undefined;
  tipo: string = '';
  ancho: string = '';
  precio: number = 0;
  base: number;
  altura: number;
  precioM2: number = 0;
  precioM2mayoreo: number = 0;
  precioMayoreo: number = 0;
  cantidad: number = 1;
  cantidadMayoreo: number = 1;
  CATALOGO_LONAS: Lonas[] = []; 

  ngOnInit(): void {
    this.fetch();
    this.userSub = this.authService.user.subscribe(user => {
      this.user = user;
    });
  }

  fetch() {
    this.dataBaseRepositoryService.getLonas().subscribe((data) => {
      this.CATALOGO_LONAS = data;
      this.tipos = Array.from(new Set(this.CATALOGO_LONAS.map(x => x.tipo))).sort();
    });
  }
  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  onTipoChanged() {
    // get distinct ancho from CATALOGO_LONA where tipo = this.tipo
    this.anchos = Array.from(new Set(this.CATALOGO_LONAS.filter(lona => lona.tipo === this.tipo).map(lona => lona.ancho)));
    if (this.anchos.length === 1) {
      this.ancho = this.anchos[0];
    }
    this.precioM2 = this.CATALOGO_LONAS.find(lona => lona.tipo === this.tipo && lona.ancho === this.ancho)?.precioM2 || 0;
    this.precioM2mayoreo  = this.CATALOGO_LONAS.find(lona => lona.tipo === this.tipo && lona.ancho === this.ancho)?.precioM2mayoreo || 0;
    this.onCalcular();
  }

  onAnchoChanged() {
    // get precioM2 from CATALOGO_LONA where tipo = this.tipo and ancho = this.ancho
    this.precioM2 = this.CATALOGO_LONAS.find(lona => lona.tipo === this.tipo && lona.ancho === this.ancho)?.precioM2 || 0;
    this.precioM2mayoreo  = this.CATALOGO_LONAS.find(lona => lona.tipo === this.tipo && lona.ancho === this.ancho)?.precioM2mayoreo || 0;
    this.onCalcular();
  }

  onCalcular() {
    this.precio = this.base * this.altura * this.precioM2;
    this.precioMayoreo = this.base * this.altura * this.precioM2mayoreo;
  }

  onAgregarProductoACotizacion(mayoreo: boolean) {
    if(mayoreo) {
      this.cotizacionService.addCotizacion({
        id: Guid.create(),
        producto: 'Lona',
        medida: `${this.base * this.altura} m2`,
        material: `${this.tipo}`,
        precio: this.precioMayoreo,
        cantidad: this.cantidadMayoreo,
        importe: this.precioMayoreo * this.cantidadMayoreo
      });
    }
    else {
      this.cotizacionService.addCotizacion({
        id: Guid.create(),
        producto: 'Lona',
        medida: `${this.base * this.altura} m2`,
        material: `${this.tipo}`,
        precio: this.precio,
        cantidad: this.cantidad,
        importe: this.precio * this.cantidad
      });
    }
    this.cantidad = 1;
    this.cantidadMayoreo = 1;
  }
}
