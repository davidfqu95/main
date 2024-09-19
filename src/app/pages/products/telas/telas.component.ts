import { Component, OnInit, OnDestroy } from '@angular/core';
import { CotizacionService } from '../cotizacion.service';
import { DataBaseRepositoryService } from '../data-base-repository-service';
import { Guid } from 'guid-typescript';
import { AuthService, User } from '../../authentication/auth.service';
import { Subscription } from 'rxjs';
import { Telas } from '../products-catalog.model';

@Component({
  selector: 'app-telas',
  templateUrl: './telas.component.html',
  styleUrls: ['./telas.component.scss']
})
export class TelasComponent implements OnInit, OnDestroy{
  constructor(
    private cotizacionService: CotizacionService,
    private dataBaseRepositoryService: DataBaseRepositoryService,
    private authService: AuthService
  ) { }

  private userSub: Subscription;
  user : User | null = null;

  tipos: string[] | undefined;
  tipo: string = '';
  precioM2: number = 0;
  precio: number = 0;
  base: number;
  altura: number;
  precioMayoreo: number = 0;
  precioM2mayoreo: number = 0;
  cantidad: number = 1;
  cantidadMayoreo: number = 1;
  CATALOGO_TELAS: Telas[] = []; 

  ngOnInit(): void {
    this.fetch();
    this.userSub = this.authService.user.subscribe(user => {
      this.user = user;
    });
  }

  fetch() {
    this.dataBaseRepositoryService.getLonas().subscribe((data) => {
      this.CATALOGO_TELAS = data;
      this.tipos = Array.from(new Set(this.CATALOGO_TELAS.map(x => x.tipo))).sort();
    });
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  onTipoChanged() {
    // get precioM2 from CATALOGO_TELAS where tipo = this.tipo
    this.precioM2 = this.CATALOGO_TELAS.find(tela => tela.tipo === this.tipo)?.precioM2 || 0;
    this.precioM2mayoreo  = this.CATALOGO_TELAS.find(tela => tela.tipo === this.tipo)?.precioM2mayoreo || 0;
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
        producto: 'Tela',
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
        producto: 'Tela',
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
