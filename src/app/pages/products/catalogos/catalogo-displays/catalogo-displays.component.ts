import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Displays } from '../../products-catalog.model';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { EditDialogDisplaysComponent } from '../../dialogs/otros/edit-dialog-displays/edit-dialog-displays.component';
import { DataBaseRepositoryService } from '../../data-base-repository-service';
import { Guid } from 'guid-typescript';

@Component({
  selector: 'app-catalogo-displays',
  templateUrl: './catalogo-displays.component.html',
  styleUrls: ['./catalogo-displays.component.scss']
})
export class CatalogoDisplaysComponent implements OnInit{
  displayedColumns: string[] = ['tipo', 'unidad', 'precioM2', 'precioM2mayoreo', 'acciones'];
  searchString: string = '';
  dataSource: MatTableDataSource<Displays>;
  constructor(public dialog: MatDialog, private dataBaseRepositoryService: DataBaseRepositoryService) {
    this.dataSource = new MatTableDataSource<Displays>();
  }
  ngOnInit(): void {
    this.fetchDisplays();
  }

  applyFilter() {
    this.dataSource.filter = this.searchString.trim().toLowerCase();
  }

  edit(producto: Displays): void {
    const dialogRef = this.dialog.open(EditDialogDisplaysComponent, {
      width: '500px',
      maxWidth: '95vw',
      data: producto
    });

    dialogRef.afterClosed().subscribe((result: Displays) => {
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

  delete(producto: Displays): void {
    this.dataBaseRepositoryService.deleteDisplays(producto.id).subscribe(
      (data) => {
        const index = this.dataSource.data.findIndex((x) => x.id === producto.id);
        this.dataSource.data.splice(index, 1);
        this.dataSource.data = [...this.dataSource.data];
      }
    );
  }

  add(): void {
    const dialogRef = this.dialog.open(EditDialogDisplaysComponent, {
      width: '500px',
      maxWidth: '95vw',
      data: {
        id: Guid.create().toString(),
        tipo: '',
        unidad: '',
        precioM2: 0,
        precioM2mayoreo: 0
      },
    });

    dialogRef.afterClosed().subscribe((result: Displays) => {
      if (result) {
        this.dataBaseRepositoryService.addDisplays(result).subscribe(
          (data) => {
            this.dataSource.data.push(result);
            this.sortData();
          }
        );
      }
    });
  }

  private fetchDisplays() {
    this.dataBaseRepositoryService.getDisplays().subscribe((data) => {
      this.dataSource.data = data;
      this.sortData();
    });
  }

  private sortData() {
    
  }
}

