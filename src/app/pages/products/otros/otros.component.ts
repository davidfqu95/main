import { Component } from '@angular/core';
import { OnInit, OnDestroy } from '@angular/core';
import { CotizacionService } from '../cotizacion.service';
import { DataBaseRepositoryService } from '../data-base-repository-service';
import { Guid } from 'guid-typescript';
import { OtrosProductos } from '../products-catalog.model';
import { AuthService, User } from '../../authentication/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-otros',
  templateUrl: './otros.component.html',
  styleUrls: ['./otros.component.scss']
})
export class OtrosComponent implements OnInit, OnDestroy{
  constructor(
    private cotizacionService: CotizacionService,
    private dataBaseRepositoryService: DataBaseRepositoryService,
    private authService: AuthService
  ) { }
  private userSub: Subscription;
  user : User | null = null;

  productos: string[] | undefined;
  tipos: string[] | undefined;
  tipos2: string[] | undefined;
  producto: string = '';
  tipo: string = '';
  tipo2: string = '';
  precio: number = 0;
  base: number;
  altura: number;
  precioM2: number = 0;
  precioM2mayoreo: number = 0;
  precioMayoreo: number = 0;
  cantidad: number = 1;
  cantidadMayoreo: number = 1;
  CATALOGO_OTROS_PRODUCTOS: OtrosProductos[] = []; 
  ngOnInit() {
    this.fetchOtrosProductos();
    this.userSub = this.authService.user.subscribe(user => {
      this.user = user;
    });
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  onProductoChanged() {
    this.tipos = Array.from(new Set(this.CATALOGO_OTROS_PRODUCTOS.filter(x => x.producto === this.producto).map(x => x.tipo)));
    if (this.tipos.length === 1) {
      this.tipo = this.tipos[0];
    }
    this.tipos2 = Array.from(new Set(this.CATALOGO_OTROS_PRODUCTOS.filter(x => x.producto === this.producto && x.tipo === this.tipo).map(x => x.tipo2)));
    if (this.tipos2.length === 1) {
      this.tipo2 = this.tipos2[0];
    }
    this.precio = this.CATALOGO_OTROS_PRODUCTOS.find(x => x.producto === this.producto && x.tipo === this.tipo && x.tipo2 === this.tipo2)?.precio || 0;
  }

  onTipoChanged() {
    this.tipos2 = Array.from(new Set(this.CATALOGO_OTROS_PRODUCTOS.filter(x => x.producto === this.producto && x.tipo === this.tipo).map(x => x.tipo2)));
    if (this.tipos2.length === 1) {
      this.tipo2 = this.tipos2[0];
    }
    this.precio = this.CATALOGO_OTROS_PRODUCTOS.find(x => x.producto === this.producto && x.tipo === this.tipo && x.tipo2 === this.tipo2)?.precio || 0;
  }

  onTipo2Changed() {
    this.precio = this.CATALOGO_OTROS_PRODUCTOS.find(x => x.producto === this.producto && x.tipo === this.tipo && x.tipo2 === this.tipo2)?.precio || 0;
  }

  onAgregarProductoACotizacion(mayoreo: boolean) {
    let material = "-"
    if(this.tipo !== "" && this.tipo2 !== "") {
      material = `${this.tipo} - ${this.tipo2}`
    }
    if(this.tipo !== "" && this.tipo2 === "") {
      material = this.tipo
    }
    if(mayoreo) {
      this.cotizacionService.addCotizacion({
        id: Guid.create(),
        producto: this.producto,
        medida: "-",
        material: material,
        precio: this.precioMayoreo,
        cantidad: this.cantidadMayoreo,
        importe: this.precioMayoreo * this.cantidadMayoreo
      });
    }
    else {
      this.cotizacionService.addCotizacion({
        id: Guid.create(),
        producto: this.producto,
        medida: '-',
        material: material,
        precio: this.precio,
        cantidad: this.cantidad,
        importe: this.precio * this.cantidad
      });
    }
    this.cantidad = 1;
    this.cantidadMayoreo = 1;
  }

  fetchOtrosProductos() {
    this.dataBaseRepositoryService.getOtrosProductos().subscribe((data) => {
      this.CATALOGO_OTROS_PRODUCTOS = data;
      this.productos = Array.from(new Set(this.CATALOGO_OTROS_PRODUCTOS.map(x => x.producto))).sort();
    });
  }
}
