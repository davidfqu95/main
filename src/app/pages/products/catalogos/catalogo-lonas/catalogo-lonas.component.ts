import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Lonas } from '../../products-catalog.model';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { DataBaseRepositoryService } from '../../data-base-repository-service';
import { Guid } from 'guid-typescript';
import { EditDialogLonasComponent } from '../../dialogs/otros/edit-dialog-lonas/edit-dialog-lonas.component';

@Component({
  selector: 'app-catalogo-lonas',
  templateUrl: './catalogo-lonas.component.html',
  styleUrls: ['./catalogo-lonas.component.scss']
})
export class CatalogoLonasComponent implements OnInit{
  displayedColumns: string[] = ['tipo', 'ancho', 'precioM2', 'precioM2mayoreo', 'acciones'];
  searchString: string = '';
  dataSource: MatTableDataSource<Lonas>;
  constructor(public dialog: MatDialog, private dataBaseRepositoryService: DataBaseRepositoryService) {
    this.dataSource = new MatTableDataSource<Lonas>();
  }
  ngOnInit(): void {
    this.fetchLonas();
  }

  applyFilter() {
    this.dataSource.filter = this.searchString.trim().toLowerCase();
  }

  edit(producto: Lonas): void {
    const dialogRef = this.dialog.open(EditDialogLonasComponent, {
      width: '500px',
      maxWidth: '95vw',
      data: producto
    });

    dialogRef.afterClosed().subscribe((result: Lonas) => {
      if (result) {
        const index = this.dataSource.data.findIndex((x) => x.id === result.id);
        this.dataBaseRepositoryService.updateLonas(result).subscribe(
          (data) => {
            this.dataSource.data[index] = result;
            this.dataSource.data = [...this.dataSource.data];
          }
        );
      }
    });
  }

  delete(producto: Lonas): void {
    this.dataBaseRepositoryService.deleteLonas(producto.id).subscribe(
      (data) => {
        const index = this.dataSource.data.findIndex((x) => x.id === producto.id);
        this.dataSource.data.splice(index, 1);
        this.dataSource.data = [...this.dataSource.data];
      }
    );
  }

  add(): void {
    const dialogRef = this.dialog.open(EditDialogLonasComponent, {
      width: '500px',
      maxWidth: '95vw',
      data: {
        id: Guid.create().toString(),
        tipo: '',
        ancho: '',
        precioM2: 0,
        precioM2mayoreo: 0
      }
    });

    dialogRef.afterClosed().subscribe((result: Lonas) => {
      if (result) {
        this.dataBaseRepositoryService.addLonas(result).subscribe(
          (data) => {
            this.dataSource.data.push(result);
            this.sortData();
          }
        );
      }
    });
  }

  private fetchLonas() {
    this.dataBaseRepositoryService.getLonas().subscribe((data) => {
      this.dataSource.data = data;
      this.sortData();
    });
  }

  private sortData() {
    this.dataSource.data = this.dataSource.data.sort((a, b) => {
      if(a.tipo === b.tipo) {
          return a.ancho.localeCompare(b.ancho);
        }
        return a.tipo.localeCompare(b.tipo);
    });
  }
}
