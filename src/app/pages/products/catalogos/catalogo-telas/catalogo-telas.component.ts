import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Telas } from '../../products-catalog.model';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { DataBaseRepositoryService } from '../../data-base-repository-service';
import { Guid } from 'guid-typescript';
import { EditDialogTelasComponent } from '../../dialogs/otros/edit-dialog-telas/edit-dialog-telas.component';

@Component({
  selector: 'app-catalogo-telas',
  templateUrl: './catalogo-telas.component.html',
  styleUrls: ['./catalogo-telas.component.scss']
})
export class CatalogoTelasComponent implements OnInit{
  displayedColumns: string[] = ['tipo', 'precioM2', 'precioM2mayoreo', 'acciones'];
  searchString: string = '';
  dataSource: MatTableDataSource<Telas>;
  constructor(public dialog: MatDialog, private dataBaseRepositoryService: DataBaseRepositoryService) {
    this.dataSource = new MatTableDataSource<Telas>();
  }
  ngOnInit(): void {
    this.fetchTelas();
  }

  applyFilter() {
    this.dataSource.filter = this.searchString.trim().toLowerCase();
  }

  edit(producto: Telas): void {
    const dialogRef = this.dialog.open(EditDialogTelasComponent, {
      width: '500px',
      maxWidth: '95vw',
      data: producto
    });

    dialogRef.afterClosed().subscribe((result: Telas) => {
      if (result) {
        const index = this.dataSource.data.findIndex((x) => x.id === result.id);
        this.dataBaseRepositoryService.updateTelas(result).subscribe(
          (data) => {
            this.dataSource.data[index] = result;
            this.dataSource.data = [...this.dataSource.data];
          }
        );
      }
    });
  }

  delete(producto: Telas): void {
    this.dataBaseRepositoryService.deleteTelas(producto.id).subscribe(
      (data) => {
        const index = this.dataSource.data.findIndex((x) => x.id === producto.id);
        this.dataSource.data.splice(index, 1);
        this.dataSource.data = [...this.dataSource.data];
      }
    );
  }

  add(): void {
    const dialogRef = this.dialog.open(EditDialogTelasComponent, {
      width: '500px',
      maxWidth: '95vw',
      data: {
        id: Guid.create().toString(),
        tipo: '',
        precioM2: 0,
        precioM2mayoreo: 0
      }
    });

    dialogRef.afterClosed().subscribe((result: Telas) => {
      if (result) {
        this.dataBaseRepositoryService.addTelas(result).subscribe(
          (data) => {
            this.dataSource.data.push(result);
            this.sortData();
          }
        );
      }
    });
  }

  private fetchTelas() {
    this.dataBaseRepositoryService.getTelas().subscribe((data) => {
      this.dataSource.data = data;
      this.sortData();
    });
  }

  private sortData() {
    this.dataSource.data = this.dataSource.data.sort((a, b) => {
        return a.tipo.localeCompare(b.tipo);
    });
  }
}

