import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Displays } from '../../../products-catalog.model';

@Component({
  selector: 'app-edit-dialog-displays',
  templateUrl: './edit-dialog-displays.component.html',
  styleUrls: ['./edit-dialog-displays.component.scss']
})
export class EditDialogDisplaysComponent implements OnInit{
  formInstance: FormGroup;
  operacion: string = 'Editar';
  
  constructor(
    public dialogRef: MatDialogRef<EditDialogDisplaysComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Displays,
  ) {
    this.formInstance = new FormGroup({
      id: new FormControl(data.id, Validators.required),
      tipo: new FormControl(data.tipo, Validators.required),
      unidad: new FormControl(data.unidad),
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

