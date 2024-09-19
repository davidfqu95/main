import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material.module';
import { MatNativeDateModule } from '@angular/material/core';
import { HttpClientModule } from '@angular/common/http';
import { LonasComponent } from './lonas/lonas.component';
import { VinilesComponent } from './viniles/viniles.component';
import { DisplaysComponent } from './displays/displays.component';
import { TelasComponent } from './telas/telas.component';
import { LaminasComponent } from './laminas/laminas.component';
import { GeneradorManualComponent } from './generador-manual/generador-manual.component';
import { OtrosComponent } from './otros/otros.component';
import { TarjetasPresentacionComponent } from './tarjetas-presentacion/tarjetas-presentacion.component';
import { CatalogoOtrosComponent } from './catalogos/catalogo-otros/catalogo-otros.component';
import { CatalogoDisplaysComponent } from './catalogos/catalogo-displays/catalogo-displays.component';
import { CatalogoLonasComponent } from './catalogos/catalogo-lonas/catalogo-lonas.component';
import { CatalogoLaminasComponent } from './catalogos/catalogo-laminas/catalogo-laminas.component';
import { CatalogoTelasComponent } from './catalogos/catalogo-telas/catalogo-telas.component';
import { CatalogoTarjetasPresentacionComponent } from './catalogos/catalogo-tarjetas-presentacion/catalogo-tarjetas-presentacion.component';
import { CatalogoVinilesComponent } from './catalogos/catalogo-viniles/catalogo-viniles.component';
import { CatalogoCotizacionesComponent } from './catalogos/catalogo-cotizaciones/catalogo-cotizaciones.component';

import { EditDialogOtrosComponent } from './dialogs/otros/edit-dialog-otros/edit-dialog-otros.component';
import { EditDialogLonasComponent } from './dialogs/otros/edit-dialog-lonas/edit-dialog-lonas.component';
import { EditDialogDisplaysComponent } from './dialogs/otros/edit-dialog-displays/edit-dialog-displays.component';
import { EditDialogLaminasComponent } from './dialogs/otros/edit-dialog-laminas/edit-dialog-laminas.component';
import { EditDialogVinilesComponent } from './dialogs/otros/edit-dialog-viniles/edit-dialog-viniles.component';
import { EditDialogTelasComponent } from './dialogs/otros/edit-dialog-telas/edit-dialog-telas.component';

// icons
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';
import { ProductsRoutes } from './products.routing.module';

@NgModule({
    imports: [
      CommonModule,
      RouterModule.forChild(ProductsRoutes),
      MaterialModule,
      FormsModule,
      ReactiveFormsModule,
      TablerIconsModule.pick(TablerIcons),
      MatNativeDateModule,
      HttpClientModule,
    ],
    declarations: [
        LonasComponent,
        VinilesComponent,
        GeneradorManualComponent,
        DisplaysComponent,
        TelasComponent,
        LaminasComponent,
        TarjetasPresentacionComponent,
        OtrosComponent,
        CatalogoOtrosComponent,
        CatalogoDisplaysComponent,
        CatalogoLonasComponent,
        CatalogoLaminasComponent,
        CatalogoTelasComponent,
        CatalogoTarjetasPresentacionComponent,
        CatalogoVinilesComponent,
        CatalogoCotizacionesComponent,
        
        EditDialogOtrosComponent,
        EditDialogLonasComponent,
        EditDialogDisplaysComponent,
        EditDialogLaminasComponent,
        EditDialogVinilesComponent,
        EditDialogTelasComponent
    ],
  })
  export class ProductsModule {}