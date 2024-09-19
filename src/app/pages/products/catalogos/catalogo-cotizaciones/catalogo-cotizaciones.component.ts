import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Cotizacion } from '../../products-catalog.model';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { EditDialogDisplaysComponent } from '../../dialogs/otros/edit-dialog-displays/edit-dialog-displays.component';
import { DataBaseRepositoryService } from '../../data-base-repository-service';
import { Guid } from 'guid-typescript';


@Component({
  selector: 'app-catalogo-cotizaciones',
  templateUrl: './catalogo-cotizaciones.component.html',
  styleUrls: ['./catalogo-cotizaciones.component.scss']
})
export class CatalogoCotizacionesComponent implements OnInit {
  displayedColumns: string[] = ['numero', 'nombreCliente', 'fecha', 'total', 'acciones'];
  searchString: string = '';
  dataSource: MatTableDataSource<Cotizacion>;
  constructor(public dialog: MatDialog, private dataBaseRepositoryService: DataBaseRepositoryService) {
    this.dataSource = new MatTableDataSource<Cotizacion>();
  }

  ngOnInit(): void {
    this.fetchCotizaciones();
  }

  private fetchCotizaciones() {
    this.dataBaseRepositoryService.getCotizaciones().subscribe((data) => {
      this.dataSource.data = data;
      // order by numero desc 
      this.dataSource.data = this.dataSource.data.sort((a, b) => b.numero - a.numero);
    });
  }

  applyFilter() {
    this.dataSource.filter = this.searchString.trim().toLowerCase();
  }

  delete(cotizacion: Cotizacion): void {
    this.dataBaseRepositoryService.deleteCotizacion(cotizacion.id).subscribe(
      (data) => {
        const index = this.dataSource.data.findIndex((x) => x.id === cotizacion.id);
        this.dataSource.data.splice(index, 1);
        this.dataSource.data = [...this.dataSource.data];
      }
    );
  };

  add(): void {
  };
}
