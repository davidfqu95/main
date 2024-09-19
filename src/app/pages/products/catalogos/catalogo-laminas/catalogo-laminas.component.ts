import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Laminas } from '../../products-catalog.model';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { EditDialogLaminasComponent } from '../../dialogs/otros/edit-dialog-laminas/edit-dialog-laminas.component';
import { DataBaseRepositoryService } from '../../data-base-repository-service';
import { Guid } from 'guid-typescript';


@Component({
  selector: 'app-catalogo-laminas',
  templateUrl: './catalogo-laminas.component.html',
  styleUrls: ['./catalogo-laminas.component.scss']
})
export class CatalogoLaminasComponent implements OnInit{
  displayedColumns: string[] = ['tipo','subtipo','ancho', 'unidad', 'metros', 'precioM2', 'precioM2mayoreo', 'acciones'];
  searchString: string = '';
  dataSource: MatTableDataSource<Laminas>;
  constructor(public dialog: MatDialog, private dataBaseRepositoryService: DataBaseRepositoryService) {
    this.dataSource = new MatTableDataSource<Laminas>();
  }
  ngOnInit(): void {
    this.fetchLaminas();
  }

  applyFilter() {
    this.dataSource.filter = this.searchString.trim().toLowerCase();
  }

  edit(producto: Laminas): void {
    const dialogRef = this.dialog.open(EditDialogLaminasComponent, {
      width: '500px',
      maxWidth: '95vw',
      data: producto
    });

    dialogRef.afterClosed().subscribe((result: Laminas) => {
      if (result) {
        const index = this.dataSource.data.findIndex((x) => x.id === result.id);
        this.dataBaseRepositoryService.updateDisplays(result).subscribe(
          (data) => {
            this.dataSource.data[index] = result;
            this.dataSource.data = [...this.dataSource.data];
          }
        );
      }
    });
  }

  delete(producto: Laminas): void {
    this.dataBaseRepositoryService.deleteLaminas(producto.id).subscribe(
      (data) => {
        const index = this.dataSource.data.findIndex((x) => x.id === producto.id);
        this.dataSource.data.splice(index, 1);
        this.dataSource.data = [...this.dataSource.data];
      }
    );
  }

  add(): void {
    const dialogRef = this.dialog.open(EditDialogLaminasComponent, {
      width: '500px',
      maxWidth: '95vw',
      data: {
        id: Guid.create().toString(),
        tipo: '',
        subtipo: '',
        metros: '',
        ancho: '',
        unidad: '',
        precioM2: 0,
        precioM2mayoreo: 0
      },
    });

    dialogRef.afterClosed().subscribe((result: Laminas) => {
      if (result) {
        this.dataBaseRepositoryService.addLaminas(result).subscribe(
          (data) => {
            this.dataSource.data.push(result);
            this.sortData();
          }
        );
      }
    });
  }

  private fetchLaminas() {
    this.dataBaseRepositoryService.getLaminas().subscribe((data) => {
      this.dataSource.data = data;
      this.sortData();
    });
  }

  private sortData() {
  }
}


