import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Viniles } from '../../../products-catalog.model';

@Component({
  selector: 'app-edit-dialog-viniles',
  templateUrl: './edit-dialog-viniles.component.html',
  styleUrls: ['./edit-dialog-viniles.component.scss']
})
export class EditDialogVinilesComponent implements OnInit{
  formInstance: FormGroup;
  operacion: string = 'Editar';
  
  constructor(
    public dialogRef: MatDialogRef<EditDialogVinilesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Viniles,
  ) {
    this.formInstance = new FormGroup({
      id: new FormControl(data.id, Validators.required),
      tipo: new FormControl(data.tipo, Validators.required),
      subtipo: new FormControl(data.subtipo),
      ancho: new FormControl(data.ancho),
      precioM2: new FormControl(data.precioM2, Validators.required),
      precioM2mayoreo: new FormControl(data.precioM2mayoreo),
    });
    this.formInstance.setValue(data);
  }
  ngOnInit(): void {
    if (this.data.tipo === '') {
      this.operacion = 'Agregar';
    }
  }

  save(): void {
    this.dialogRef.close(this.formInstance.value);
  }
}

