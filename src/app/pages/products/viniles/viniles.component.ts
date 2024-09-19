import { Component, OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { CotizacionService } from '../cotizacion.service';
import { Guid } from 'guid-typescript';
import { AuthService, User } from '../../authentication/auth.service';
import { Subscription } from 'rxjs';
import { DataBaseRepositoryService } from '../data-base-repository-service';
import { Viniles } from '../products-catalog.model';

@Component({
  selector: 'app-viniles',
  templateUrl: './viniles.component.html',
  styleUrls: ['./viniles.component.scss']
})
export class VinilesComponent implements OnInit, OnDestroy {
  constructor(
    private cotizacionService: CotizacionService,
    private dataBaseRepositoryService: DataBaseRepositoryService,
    private authService: AuthService
  ) { }
  private userSub: Subscription;
  user : User | null = null;

  tipos: string[] | undefined;
  subtipos: string[] | undefined;
  anchos: string[] = [];
  tipo: string = '';
  subtipo: string = '';
  ancho: string = '';
  precio: number = 0;
  base: number;
  altura: number;
  precioM2: number = 0;
  precioM2mayoreo: number = 0;
  precioMayoreo: number = 0;
  cantidad: number = 1;
  cantidadMayoreo: number = 1;
  CATALOGO_VINILES: Viniles[] = [];

  ngOnInit(): void {
    this.fetch();
  }

  fetch() {
    this.dataBaseRepositoryService.getViniles().subscribe(viniles => {
      this.CATALOGO_VINILES = viniles;
      this.tipos = Array.from(new Set(this.CATALOGO_VINILES.map(vinil => vinil.tipo)));
    });
    this.userSub = this.authService.user.subscribe(user => {
      this.user = user;
    });
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
  onTipoChanged() {
    this.subtipos = Array.from(new Set(this.CATALOGO_VINILES.filter(vinil => vinil.tipo === this.tipo).map(vinil => vinil.subtipo)));
    if (this.subtipos.length === 1) {
      this.subtipo = this.subtipos[0];
    }
    this.anchos = Array.from(new Set(this.CATALOGO_VINILES.filter(vinil => vinil.subtipo === this.subtipo && vinil.tipo === this.tipo).map(vinil => vinil.ancho)));
    if (this.anchos.length === 1) {
      this.ancho = this.anchos[0];
    }
    this.precioM2 = this.CATALOGO_VINILES.find(vinil => vinil.tipo === this.tipo && vinil.subtipo === this.subtipo && vinil.ancho === this.ancho)?.precioM2 || 0;
    this.precioM2mayoreo = this.CATALOGO_VINILES.find(vinil => vinil.tipo === this.tipo && vinil.subtipo === this.subtipo && vinil.ancho === this.ancho)?.precioM2mayoreo || 0;
    this.onCalcular();
  }

  onSubtipoChanged() {
    this.anchos = Array.from(new Set(this.CATALOGO_VINILES.filter(vinil => vinil.subtipo === this.subtipo && vinil.tipo === this.tipo).map(vinil => vinil.ancho)));
    if (this.anchos.length === 1) {
      this.ancho = this.anchos[0];
    }
    this.precioM2 = this.CATALOGO_VINILES.find(vinil => vinil.tipo === this.tipo && vinil.subtipo === this.subtipo && vinil.ancho === this.ancho)?.precioM2 || 0;
    this.precioM2mayoreo = this.CATALOGO_VINILES.find(vinil => vinil.tipo === this.tipo && vinil.subtipo === this.subtipo && vinil.ancho === this.ancho)?.precioM2mayoreo || 0;
    this.onCalcular();
  }

  onAnchoChanged() {
    this.precioM2 = this.CATALOGO_VINILES.find(vinil => vinil.tipo === this.tipo && vinil.subtipo === this.subtipo && vinil.ancho === this.ancho)?.precioM2 || 0;
    this.precioM2mayoreo = this.CATALOGO_VINILES.find(vinil => vinil.tipo === this.tipo && vinil.subtipo === this.subtipo && vinil.ancho === this.ancho)?.precioM2mayoreo || 0;
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
        producto: 'Vinil',
        medida: `${this.base * this.altura} m2`,
        material: `${this.tipo} - ${this.subtipo}`,
        precio: this.precioMayoreo,
        cantidad: this.cantidadMayoreo,
        importe: this.precioMayoreo * this.cantidadMayoreo
      });
    }
    else {
      this.cotizacionService.addCotizacion({
        id: Guid.create(),
        producto: 'Vinil',
        medida: `${this.base * this.altura} m2`,
        material: `${this.tipo} - ${this.subtipo}`,
        precio: this.precio,
        cantidad: this.cantidad,
        importe: this.precio * this.cantidad
      });
    }
    this.cantidad = 1;
    this.cantidadMayoreo = 1;
  }
}
