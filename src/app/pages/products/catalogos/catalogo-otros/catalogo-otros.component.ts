import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { OtrosProductos } from '../../products-catalog.model';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { EditDialogOtrosComponent } from '../../dialogs/otros/edit-dialog-otros/edit-dialog-otros.component';
import { DataBaseRepositoryService } from '../../data-base-repository-service';
import { Guid } from 'guid-typescript';

@Component({
  selector: 'app-catalogo-otros',
  templateUrl: './catalogo-otros.component.html',
  styleUrls: ['./catalogo-otros.component.scss']
})
export class CatalogoOtrosComponent implements OnInit{
  displayedColumns: string[] = ['producto', 'tipo', 'tipo2', 'precio', 'acciones'];
  searchString: string = '';
  dataSource: MatTableDataSource<OtrosProductos>;
  constructor(public dialog: MatDialog, private dataBaseRepositoryService: DataBaseRepositoryService) {
    this.dataSource = new MatTableDataSource<OtrosProductos>();
  }
  ngOnInit(): void {
    this.fetchOtrosProductos();
  }

  applyFilter() {
    this.dataSource.filter = this.searchString.trim().toLowerCase();
  }

  edit(producto: OtrosProductos): void {
    const dialogRef = this.dialog.open(EditDialogOtrosComponent, {
      width: '500px',
      maxWidth: '95vw',
      data: producto
    });

    dialogRef.afterClosed().subscribe((result: OtrosProductos) => {
      if (result) {
        const index = this.dataSource.data.findIndex((x) => x.id === result.id);
        this.dataBaseRepositoryService.updateOtrosProductos(result).subscribe(
          (data) => {
            this.dataSource.data[index] = result;
            this.dataSource.data = [...this.dataSource.data];
          }
        );
      }
    });
  }

  delete(producto: OtrosProductos): void {
    this.dataBaseRepositoryService.deleteOtrosProductos(producto.id).subscribe(
      (data) => {
        const index = this.dataSource.data.findIndex((x) => x.id === producto.id);
        this.dataSource.data.splice(index, 1);
        this.dataSource.data = [...this.dataSource.data];
      }
    );
  }

  add(): void {
    const dialogRef = this.dialog.open(EditDialogOtrosComponent, {
      width: '500px',
      maxWidth: '95vw',
      data: {
        id: Guid.create().toString(),
        producto: '',
        tipo: '',
        tipo2: '',
        precio: 0,
        precioMayoreo: 0
      },
    });

    dialogRef.afterClosed().subscribe((result: OtrosProductos) => {
      if (result) {
        this.dataBaseRepositoryService.addOtrosProductos(result).subscribe(
          (data) => {
            this.dataSource.data.push(result);
            this.sortData();
          }
        );
      }
    });
  }

  private fetchOtrosProductos() {
    this.dataBaseRepositoryService.getOtrosProductos().subscribe((data) => {
      this.dataSource.data = data;
      this.sortData();
    });
  }

  private sortData() {
    this.dataSource.data = this.dataSource.data.sort((a, b) => {
      if(a.producto === b.producto) {
        if(a.tipo === b.tipo) {
          return a.tipo2.localeCompare(b.tipo2);
        }
        return a.tipo.localeCompare(b.tipo);
      }
      return a.producto.localeCompare(b.producto);
    });
  }
}
