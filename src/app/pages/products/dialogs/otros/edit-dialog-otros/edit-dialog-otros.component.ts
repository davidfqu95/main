import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OtrosProductos } from '../../../products-catalog.model';

@Component({
  selector: 'app-edit-dialog-otros',
  templateUrl: './edit-dialog-otros.component.html',
  styleUrls: ['./edit-dialog-otros.component.scss']
})

export class EditDialogOtrosComponent implements OnInit{
  formInstance: FormGroup;
  operacion: string = 'Editar';
  
  constructor(
    public dialogRef: MatDialogRef<EditDialogOtrosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: OtrosProductos,
  ) {
    this.formInstance = new FormGroup({
      id: new FormControl(data.id, Validators.required),
      producto: new FormControl(data.producto, Validators.required),
      tipo: new FormControl(data.tipo),
      tipo2: new FormControl(data.tipo2),
      precio: new FormControl(data.precio, Validators.required),
      precioMayoreo: new FormControl(data.precioMayoreo),
    });
    this.formInstance.setValue(data);
  }
  ngOnInit(): void {
    if (this.data.producto === '') {
      this.operacion = 'Agregar';
    }
  }

  save(): void {
    this.dialogRef.close(this.formInstance.value);
  }
}
