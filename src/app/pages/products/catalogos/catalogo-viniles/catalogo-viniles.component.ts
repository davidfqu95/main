import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Viniles } from '../../products-catalog.model';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { EditDialogVinilesComponent } from '../../dialogs/otros/edit-dialog-viniles/edit-dialog-viniles.component';
import { DataBaseRepositoryService } from '../../data-base-repository-service';
import { Guid } from 'guid-typescript';

@Component({
  selector: 'app-catalogo-viniles',
  templateUrl: './catalogo-viniles.component.html',
  styleUrls: ['./catalogo-viniles.component.scss']
})
export class CatalogoVinilesComponent implements OnInit{
  displayedColumns: string[] = ['tipo', 'subtipo', 'ancho', 'precioM2', 'precioM2mayoreo', 'acciones'];
  searchString: string = '';
  dataSource: MatTableDataSource<Viniles>;
  constructor(public dialog: MatDialog, private dataBaseRepositoryService: DataBaseRepositoryService) {
    this.dataSource = new MatTableDataSource<Viniles>();
  }
  ngOnInit(): void {
    this.fetchViniles();
  }

  applyFilter() {
    this.dataSource.filter = this.searchString.trim().toLowerCase();
  }

  edit(producto: Viniles): void {
    const dialogRef = this.dialog.open(EditDialogVinilesComponent, {
      width: '500px',
      maxWidth: '95vw',
      data: producto
    });

    dialogRef.afterClosed().subscribe((result: Viniles) => {
      if (result) {
        const index = this.dataSource.data.findIndex((x) => x.id === result.id);
        this.dataBaseRepositoryService.updateViniles(result).subscribe(
          (data) => {
            this.dataSource.data[index] = result;
            this.dataSource.data = [...this.dataSource.data];
          }
        );
      }
    });
  }

  delete(producto: Viniles): void {
    this.dataBaseRepositoryService.deleteViniles(producto.id).subscribe(
      (data) => {
        const index = this.dataSource.data.findIndex((x) => x.id === producto.id);
        this.dataSource.data.splice(index, 1);
        this.dataSource.data = [...this.dataSource.data];
      }
    );
  }

  add(): void {
    const dialogRef = this.dialog.open(EditDialogVinilesComponent, {
      width: '500px',
      maxWidth: '95vw',
      data: {
        id: Guid.create().toString(),
        tipo: '',
        subtipo: '',
        ancho: '',
        precioM2: 0,
        precioM2mayoreo: 0
      },
    });

    dialogRef.afterClosed().subscribe((result: Viniles) => {
      if (result) {
        this.dataBaseRepositoryService.addViniles(result).subscribe(
          (data) => {
            this.dataSource.data.push(result);
            this.sortData();
          }
        );
      }
    });
  }

  private fetchViniles() {
    this.dataBaseRepositoryService.getViniles().subscribe((data) => {
      this.dataSource.data = data;
      this.sortData();
    });
  }

  private sortData() {
  }
}
