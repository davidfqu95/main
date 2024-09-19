import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { Guid } from 'guid-typescript';
import { MatTable } from '@angular/material/table';
import { CotizacionService } from '../cotizacion.service';
import * as moment from 'moment';
import { Cotizacion, ProductoCotizacion } from '../products-catalog.model';
import { Subscription } from 'rxjs';
import { AuthService, User } from '../../authentication/auth.service';
import { DataBaseRepositoryService } from '../data-base-repository-service';

moment.locale('es');

@Component({
  selector: 'app-generador-manual',
  templateUrl: './generador-manual.component.html',
  styleUrls: ['./generador-manual.component.scss']
})

export class GeneradorManualComponent implements OnInit, OnDestroy {
  constructor(
    private route: ActivatedRoute,
    private cotizacionService: CotizacionService,
    private dataBaseRepositoryService: DataBaseRepositoryService,
    private authService: AuthService,
  ) { }

  @ViewChild(MatTable) table: MatTable<ProductoCotizacion>
  displayedColumns: string[] = ['producto', 'medida', 'material', 'precio', 'cantidad', 'importe'];
  numeroCotizacionEditable: number | null = null;
  modoEdicion : boolean = false;
  fechaActual = moment(Date.now()).format("D MMMM YYYY");
  nuevoProducto:string;
  nuevaMedida:string;
  nuevoMaterial:string;
  nuevoPrecio:number | null;
  nuevaCantidad:number | null;
  modoAgregarProducto: boolean = false;
  modoEditarProducto: boolean = false;
  subscription: Subscription;
  cotizacion: Cotizacion = {
    numero: 0,
    fechaCreacion: new Date(),
    nombreCliente: 'Nombre del cliente',
    subtotal: 0,
    impuestos: 0,
    descuento: 0,
    total: 0,
    productos: [],
    fecha: new Date(),
    iva: 0.16,
    id: Guid.create().toString(),
    creador: ''
  };
  disableBotonGuardar: boolean = false;
  private userSub: Subscription;
  user : User | null = null;

  ngOnInit(): void {
    this.subscription = this.cotizacionService.cotizacionesChanged.subscribe(cotizaciones => {
      this.cotizacion.productos = cotizaciones;
    });
    this.cotizacion.productos = this.cotizacionService.getCotizaciones();
    this.recalcularSubtotal();
    this.userSub = this.authService.user.subscribe(user => {
      this.user = user;
    });

    this.route.params.subscribe(params => {
      const numero = params['numero'] ? +params['numero'] : null;
      if (numero !== null) {
        this.cotizacion.numero = numero;
        this.numeroCotizacionEditable = numero;
        this.dataBaseRepositoryService.getCotizacionByNumero(numero).subscribe(
          (data) => {
            this.cotizacion = data[0];
            this.cotizacionService.clearCotizaciones();
            this.cotizacion.productos.forEach(cotizacion => {
              this.cotizacionService.addCotizacion(cotizacion);
              this.cotizacionService.setCotizacionActual(this.cotizacion.numero);
            });
            this.recalcularSubtotal();
          }
        );
        return;
      }
      else
      {
        if(this.cotizacionService.getCotizacionActual() !== 0) {
          this.cotizacion.numero = this.cotizacionService.getCotizacionActual();
          this.dataBaseRepositoryService.getCotizacionByNumero(this.cotizacion.numero).subscribe(
            (data) => {
              this.cotizacion = data[0];
              this.cotizacion.productos = this.cotizacionService.getCotizaciones();
              this.cotizacionService.setCotizacionActual(this.cotizacion.numero);
              this.recalcularSubtotal();
            }
          );
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  agregarProducto() {
    const nuevaCotizacion: ProductoCotizacion = {
      id: Guid.create(),
      producto: this.nuevoProducto,
      medida: this.nuevaMedida,
      material: this.nuevoMaterial,
      precio: this.nuevoPrecio ? this.nuevoPrecio : 0,
      cantidad: this.nuevaCantidad ? this.nuevaCantidad : 0,
      importe: (this.nuevoPrecio ? this.nuevoPrecio : 0) * (this.nuevaCantidad ? this.nuevaCantidad : 0)
    };
    this.cotizacionService.addCotizacion(nuevaCotizacion);
    this.table.renderRows();
    this.limpiarNuevoProducto();
    this.recalcularSubtotal();
  }

  downloadPDF() {
    html2canvas(document.getElementById('cotizacion')!, {scrollY: -window.scrollY, scrollX: -window.scrollX}).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      var width = pdf.internal.pageSize.getWidth();
      var height = canvas.height * width / canvas.width;
      pdf.addImage(imgData, 'PNG',0, 0, width, height);
      pdf.save('cotizacion.pdf');
    });
  }

  toggleEdicion() {
    this.modoEdicion = !this.modoEdicion;
    if(this.modoEdicion) {
      //add acciones a display columns
      this.displayedColumns.push('acciones');
    }
    else {
      this.modoAgregarProducto = false;
      this.displayedColumns.pop();
    }
  }

  toggleAgregarProducto() {
    this.modoAgregarProducto = !this.modoAgregarProducto;
  }

  eliminarProducto(id: Guid) {
    this.cotizacionService.deleteCotizacion(id);
    this.table.renderRows();
    this.recalcularSubtotal();
  }

  editarProducto(id: Guid) {
    const cotizacion = this.cotizacion.productos.find(cotizacion => cotizacion.id === id);
    if (cotizacion) {
      this.nuevoProducto = cotizacion.producto;
      this.nuevaMedida = cotizacion.medida;
      this.nuevoMaterial = cotizacion.material;
      this.nuevoPrecio = cotizacion.precio;
      this.nuevaCantidad = cotizacion.cantidad;
      this.eliminarProducto(id);
      this.modoAgregarProducto = true;
    }
  }

  limpiarNuevoProducto() {
    this.nuevoProducto = '';
    this.nuevaMedida = '';
    this.nuevoMaterial = '';
    this.nuevoPrecio = null;
    this.nuevaCantidad = null;
  }

  empezarNuevaCotizacion() {
    this.cotizacion = {
      numero: 0,
      fechaCreacion: new Date(),
      nombreCliente: 'Nombre del cliente',
      subtotal: 0,
      impuestos: 0,
      descuento: 0,
      total: 0,
      productos: [],
      fecha: new Date(),
      iva: 0.16,
      id: Guid.create().toString(),
      creador: ''
    };
    this.cotizacionService.setCotizacionActual(0);
    this.numeroCotizacionEditable = null;
    this.limpiarNuevoProducto();
    this.recalcularSubtotal();
  }

  recalcularSubtotal() {
    this.cotizacion.subtotal = this.cotizacion.productos.reduce((acc, x) => acc + x.importe, 0);
    this.cotizacion.impuestos = this.cotizacion.subtotal * this.cotizacion.iva;
    this.cotizacion.total = this.cotizacion.subtotal + this.cotizacion.impuestos - this.cotizacion.descuento;
  }

  guardarCotizacion() {
    this.disableBotonGuardar = true;
    if(this.cotizacion.numero !== 0) {
      this.dataBaseRepositoryService.updateCotizacion(this.cotizacion).subscribe();
      this.disableBotonGuardar = false;
      return;
    }

    this.dataBaseRepositoryService.getUltimoNumeroCotizacion().subscribe(
      (data) => {
        this.cotizacion.numero = data.ultimoNumero + 1;
        this.cotizacion.fechaCreacion = new Date();
        this.numeroCotizacionEditable = this.cotizacion.numero;
        this.dataBaseRepositoryService.addCotizacion(this.cotizacion).subscribe(
          () => {
            this.dataBaseRepositoryService.updateUltimoNumeroCotizacion(this.cotizacion.numero).subscribe();
            this.disableBotonGuardar = false;
            this.cotizacionService.setCotizacionActual(this.cotizacion.numero);
          });
      }
    );
  }
}
