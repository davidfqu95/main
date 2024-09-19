import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Telas } from '../../../products-catalog.model';

@Component({
  selector: 'app-edit-dialog-telas',
  templateUrl: './edit-dialog-telas.component.html',
  styleUrls: ['./edit-dialog-telas.component.scss']
})
export class EditDialogTelasComponent implements OnInit{
  formInstance: FormGroup;
  operacion: string = 'Editar';
  
  constructor(
    public dialogRef: MatDialogRef<EditDialogTelasComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Telas,
  ) {
    this.formInstance = new FormGroup({
      id: new FormControl(data.id, Validators.required),
      tipo: new FormControl(data.tipo, Validators.required),
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
