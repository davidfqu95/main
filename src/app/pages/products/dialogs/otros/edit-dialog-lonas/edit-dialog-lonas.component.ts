import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Lonas } from '../../../products-catalog.model';

@Component({
  selector: 'app-edit-dialog-lonas',
  templateUrl: './edit-dialog-lonas.component.html',
  styleUrls: ['./edit-dialog-lonas.component.scss']
})
export class EditDialogLonasComponent implements OnInit{
  formInstance: FormGroup;
  operacion: string = 'Editar';
  
  constructor(
    public dialogRef: MatDialogRef<EditDialogLonasComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Lonas,
  ) {
    this.formInstance = new FormGroup({
      id: new FormControl(data.id, Validators.required),
      tipo: new FormControl(data.tipo, Validators.required),
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

