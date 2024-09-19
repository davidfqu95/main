import { Component, OnInit } from '@angular/core';
import { CotizacionService } from '../cotizacion.service';
import { Guid } from 'guid-typescript';
import { DataBaseRepositoryService } from '../data-base-repository-service';
import { AuthService, User } from '../../authentication/auth.service';
import { Subscription } from 'rxjs';
import { Laminas } from '../products-catalog.model';

@Component({
  selector: 'app-laminas',
  templateUrl: './laminas.component.html',
  styleUrls: ['./laminas.component.scss']
})
export class LaminasComponent implements OnInit{
  constructor(
    private cotizacionService: CotizacionService,
    private dataBaseRepositoryService: DataBaseRepositoryService,
    private authService: AuthService
  ) { }

  private userSub: Subscription;
  user : User | null = null;
  
  tipos: string[] | undefined;
  subtipos: string[] | undefined;
  unidades: string[] | undefined;
  anchos: string[] = [];
  metros: string[] = [];
  tipo: string = '';
  subtipo: string = '';
  unidad: string = '';
  ancho: string = '';
  metro: string = '';
  precioM2: number = 0;
  precio: number = 0;
  base: number;
  altura: number;
  precioMayoreo: number = 0;
  precioM2mayoreo: number = 0;
  cantidad: number = 1;
  cantidadMayoreo: number = 1;
  CATALOGO_LAMINAS: Laminas[] = [];

  ngOnInit(): void {
    this.fetch();
    this.userSub = this.authService.user.subscribe(user => {
      this.user = user;
    });
  }

  fetch() {
    this.dataBaseRepositoryService.getLaminas().subscribe((data) => {
      this.CATALOGO_LAMINAS = data;
      this.tipos = Array.from(new Set(this.CATALOGO_LAMINAS.map(x => x.tipo))).sort();
    });
  }
  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  onTipoChanged() {
    this.subtipos = Array.from(new Set(this.CATALOGO_LAMINAS.filter(lamina => lamina.tipo === this.tipo).map(lamina => lamina.subtipo)));
    if (this.subtipos.length === 1) {
      this.subtipo = this.subtipos[0];
    }
    this.unidades = Array.from(new Set(this.CATALOGO_LAMINAS.filter(lamina => lamina.tipo === this.tipo).map(lamina => lamina.unidad)));
    if (this.unidades.length === 1) {
      this.unidad = this.unidades[0];
    }
    this.anchos = Array.from(new Set(this.CATALOGO_LAMINAS.filter(lamina => lamina.tipo === this.tipo).map(lamina => lamina.ancho)));
    if (this.anchos.length === 1) {
      this.ancho = this.anchos[0];
    }
    this.metros = Array.from(new Set(this.CATALOGO_LAMINAS.filter(lamina => lamina.tipo === this.tipo).map(lamina => lamina.metros)));
    if (this.metros.length === 1) {
      this.metro = this.metros[0];
    }
    this.precioM2 = this.CATALOGO_LAMINAS.find(lamina => lamina.tipo === this.tipo && lamina.subtipo === this.subtipo && lamina.unidad === this.unidad && lamina.ancho === this.ancho && lamina.metros === this.metro)?.precioM2 || 0;
    this.precioM2mayoreo = this.CATALOGO_LAMINAS.find(lamina => lamina.tipo === this.tipo && lamina.subtipo === this.subtipo && lamina.unidad === this.unidad && lamina.ancho === this.ancho && lamina.metros === this.metro)?.precioM2mayoreo || 0;
    this.onCalcular();
  }

  onSubtipoChanged() {
    this.unidades = Array.from(new Set(this.CATALOGO_LAMINAS.filter(lamina => lamina.subtipo === this.subtipo && lamina.tipo === this.tipo).map(lamina => lamina.unidad)));
    if (this.unidades.length === 1) {
      this.unidad = this.unidades[0];
    }
    this.anchos = Array.from(new Set(this.CATALOGO_LAMINAS.filter(lamina => lamina.subtipo === this.subtipo && lamina.tipo === this.tipo).map(lamina => lamina.ancho)));
    if (this.anchos.length === 1) {
      this.ancho = this.anchos[0];
    }
    this.metros = Array.from(new Set(this.CATALOGO_LAMINAS.filter(lamina => lamina.subtipo === this.subtipo && lamina.tipo === this.tipo).map(lamina => lamina.metros)));
    if (this.metros.length === 1) {
      this.metro = this.metros[0];
    }
    this.precioM2 = this.CATALOGO_LAMINAS.find(lamina => lamina.tipo === this.tipo && lamina.subtipo === this.subtipo && lamina.unidad === this.unidad && lamina.ancho === this.ancho && lamina.metros === this.metro)?.precioM2 || 0;
    this.precioM2mayoreo = this.CATALOGO_LAMINAS.find(lamina => lamina.tipo === this.tipo && lamina.subtipo === this.subtipo && lamina.unidad === this.unidad && lamina.ancho === this.ancho && lamina.metros === this.metro)?.precioM2mayoreo || 0;
    this.onCalcular();
  }

  onUnidadChanged() {
    this.anchos = Array.from(new Set(this.CATALOGO_LAMINAS.filter(lamina => lamina.unidad === this.unidad && lamina.subtipo === this.subtipo && lamina.tipo === this.tipo).map(lamina => lamina.ancho)));
    if (this.anchos.length === 1) {
      this.ancho = this.anchos[0];
    }
    this.metros = Array.from(new Set(this.CATALOGO_LAMINAS.filter(lamina => lamina.unidad === this.unidad && lamina.subtipo === this.subtipo && lamina.tipo === this.tipo).map(lamina => lamina.metros)));
    if (this.metros.length === 1) {
      this.metro = this.metros[0];
    }
    this.precioM2 = this.CATALOGO_LAMINAS.find(lamina => lamina.tipo === this.tipo && lamina.subtipo === this.subtipo && lamina.unidad === this.unidad && lamina.ancho === this.ancho && lamina.metros === this.metro)?.precioM2 || 0;
    this.precioM2mayoreo = this.CATALOGO_LAMINAS.find(lamina => lamina.tipo === this.tipo && lamina.subtipo === this.subtipo && lamina.unidad === this.unidad && lamina.ancho === this.ancho && lamina.metros === this.metro)?.precioM2mayoreo || 0;
    this.onCalcular();
  }

  onAnchoChanged() {
    this.metros = Array.from(new Set(this.CATALOGO_LAMINAS.filter(lamina => lamina.ancho === this.ancho && lamina.unidad === this.unidad && lamina.subtipo === this.subtipo && lamina.tipo === this.tipo).map(lamina => lamina.metros)));
    if (this.metros.length === 1) {
      this.metro = this.metros[0];
    }
    
    if (this.metros.length === 1) {
      this.metro = this.metros[0];
    }
    this.precioM2 = this.CATALOGO_LAMINAS.find(lamina => lamina.tipo === this.tipo && lamina.subtipo === this.subtipo && lamina.unidad === this.unidad && lamina.ancho === this.ancho && lamina.metros === this.metro)?.precioM2 || 0;
    this.precioM2mayoreo = this.CATALOGO_LAMINAS.find(lamina => lamina.tipo === this.tipo && lamina.subtipo === this.subtipo && lamina.unidad === this.unidad && lamina.ancho === this.ancho && lamina.metros === this.metro)?.precioM2mayoreo || 0;
    this.onCalcular();
  }

  onMetrosChanged() {
    this.precioM2 = this.CATALOGO_LAMINAS.find(lamina => lamina.tipo === this.tipo && lamina.subtipo === this.subtipo && lamina.unidad === this.unidad && lamina.ancho === this.ancho && lamina.metros === this.metro)?.precioM2 || 0;
    this.precioM2mayoreo = this.CATALOGO_LAMINAS.find(lamina => lamina.tipo === this.tipo && lamina.subtipo === this.subtipo && lamina.unidad === this.unidad && lamina.ancho === this.ancho && lamina.metros === this.metro)?.precioM2mayoreo || 0;
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
        producto: 'Lámina',
        medida: `${this.base * this.altura} m2`,
        material: `${this.tipo} ${this.subtipo} ${this.unidad} ${this.ancho} ${this.metro}`,
        precio: this.precioMayoreo,
        cantidad: this.cantidadMayoreo,
        importe: this.precioMayoreo * this.cantidadMayoreo
      });
    }
    else {
      this.cotizacionService.addCotizacion({
        id: Guid.create(),
        producto: 'Lámina',
        medida: `${this.base * this.altura} m2`,
        material: `${this.tipo} ${this.subtipo} ${this.unidad} ${this.ancho} ${this.metro}`,
        precio: this.precio,
        cantidad: this.cantidad,
        importe: this.precio * this.cantidad
      });
    }
    this.cantidad = 1;
    this.cantidadMayoreo = 1;
  }
}
