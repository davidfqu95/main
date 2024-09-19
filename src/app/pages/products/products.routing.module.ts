import { Routes } from '@angular/router';
import { LonasComponent } from './lonas/lonas.component';
import { VinilesComponent } from './viniles/viniles.component';
import { LaminasComponent } from './laminas/laminas.component';
import { TelasComponent } from './telas/telas.component';
import { DisplaysComponent } from './displays/displays.component';
import { GeneradorManualComponent } from './generador-manual/generador-manual.component';
import { TarjetasPresentacionComponent } from './tarjetas-presentacion/tarjetas-presentacion.component';
import { OtrosComponent } from './otros/otros.component';
import { CatalogoOtrosComponent } from './catalogos/catalogo-otros/catalogo-otros.component';
import { CatalogoDisplaysComponent } from './catalogos/catalogo-displays/catalogo-displays.component';
import { CatalogoLonasComponent } from './catalogos/catalogo-lonas/catalogo-lonas.component';
import { CatalogoLaminasComponent } from './catalogos/catalogo-laminas/catalogo-laminas.component';
import { CatalogoTelasComponent } from './catalogos/catalogo-telas/catalogo-telas.component';
import { CatalogoTarjetasPresentacionComponent } from './catalogos/catalogo-tarjetas-presentacion/catalogo-tarjetas-presentacion.component';
import { CatalogoVinilesComponent } from './catalogos/catalogo-viniles/catalogo-viniles.component';
import { CatalogoCotizacionesComponent } from './catalogos/catalogo-cotizaciones/catalogo-cotizaciones.component';
import { AuthGuard } from '../authentication/auth.guard';

export const ProductsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'lonas',
        component: LonasComponent,
      },
      {
        path: 'viniles',
        component: VinilesComponent,
      },
      {
        path: 'laminas',
        component: LaminasComponent,
      },
      {
        path: 'telas',
        component: TelasComponent,
      },
      {
        path: 'displays',
        component: DisplaysComponent,
      },
      {
        path: 'cotizacion',
        component: GeneradorManualComponent,
      },
      { path: 'cotizacion/:numero', component: GeneradorManualComponent },
      {
        path: 'tarjetas-presentacion',
        component: TarjetasPresentacionComponent,
      },
      {
        path: 'otros',
        component: OtrosComponent,
      },
      {
        path: 'otros/catalogo',
        component: CatalogoOtrosComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'displays/catalogo',
        component: CatalogoDisplaysComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'lonas/catalogo',
        component: CatalogoLonasComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'laminas/catalogo',
        component: CatalogoLaminasComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'telas/catalogo',
        component: CatalogoTelasComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'tarjetas-presentacion/catalogo',
        component: CatalogoTarjetasPresentacionComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'viniles/catalogo',
        component: CatalogoVinilesComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'cotizaciones',
        component: CatalogoCotizacionesComponent,
        canActivate: [AuthGuard],
      }
    ],
  },
];
