import { Component, OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { CotizacionService } from '../cotizacion.service';
import { Guid } from 'guid-typescript';
import { DataBaseRepositoryService } from '../data-base-repository-service';
import { AuthService, User } from '../../authentication/auth.service';
import { Subscription } from 'rxjs';
import { Displays } from '../products-catalog.model';

@Component({
  selector: 'app-displays',
  templateUrl: './displays.component.html',
  styleUrls: ['./displays.component.scss']
})
export class DisplaysComponent implements OnInit, OnDestroy{
  constructor(
    private cotizacionService: CotizacionService,
    private dataBaseRepositoryService: DataBaseRepositoryService,
    private authService: AuthService
  ) { }

  private userSub: Subscription;
  user : User | null = null;
  
  tipos: string[] | undefined;
  unidades: string[] | undefined;
  tipo: string = '';
  unidad: string = '';
  precio: number = 0;
  precioM2: number = 0;
  precioMayoreo: number = 0;
  precioM2mayoreo: number = 0;
  cantidad: number = 1;
  cantidadMayoreo: number = 1;
  CATALOGO_DISPLAYS: Displays[] = [];

  ngOnInit(): void {
    this.fetch();
    this.userSub = this.authService.user.subscribe(user => {
      this.user = user;
    });
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  fetch() {
    this.dataBaseRepositoryService.getDisplays().subscribe((data) => {
      this.CATALOGO_DISPLAYS = data;
      this.tipos = Array.from(new Set(this.CATALOGO_DISPLAYS.map(x => x.tipo))).sort();
    });
  }

  onTipoChanged() {
    this.unidades = Array.from(new Set(this.CATALOGO_DISPLAYS.filter(display => display.tipo === this.tipo).map(display => display.unidad)));
    if (this.unidades.length === 1) {
      this.unidad = this.unidades[0];
    }
    this.precio = this.CATALOGO_DISPLAYS.find(display => display.tipo === this.tipo && display.unidad === this.unidad)?.precioM2 || 0;
    this.precioMayoreo = this.CATALOGO_DISPLAYS.find(display => display.tipo === this.tipo && display.unidad === this.unidad)?.precioM2mayoreo || 0;
  }

  onUnidadChanged() {
    this.precio = this.CATALOGO_DISPLAYS.find(display => display.tipo === this.tipo && display.unidad === this.unidad)?.precioM2 || 0;
    this.precioMayoreo = this.CATALOGO_DISPLAYS.find(display => display.tipo === this.tipo && display.unidad === this.unidad)?.precioM2mayoreo || 0;
  }

  onAgregarProductoACotizacion(mayoreo: boolean) {
    if(mayoreo) {
      this.cotizacionService.addCotizacion({
        id: Guid.create(),
        producto: 'Vinil',
        medida: `${this.unidad}`,
        material: `${this.tipo}`,
        precio: this.precioMayoreo,
        cantidad: this.cantidadMayoreo,
        importe: this.precioMayoreo * this.cantidadMayoreo
      });
    }
    else {
      this.cotizacionService.addCotizacion({
        id: Guid.create(),
        producto: 'Display',
        medida: `${this.unidad}`,
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
