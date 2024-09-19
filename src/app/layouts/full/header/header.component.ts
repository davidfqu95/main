import {
  Component,
  Output,
  EventEmitter,
  Input,
  ViewEncapsulation,
  OnDestroy,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CotizacionService } from 'src/app/pages/products/cotizacion.service';
import { OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService, User } from 'src/app/pages/authentication/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent implements OnInit, OnDestroy{
  @Input() showToggle = true;
  @Input() toggleChecked = false;
  @Output() toggleMobileNav = new EventEmitter<void>();
  @Output() toggleMobileFilterNav = new EventEmitter<void>();
  @Output() toggleCollapsed = new EventEmitter<void>();
  subscription: Subscription;
  user : User | null = null;
  showFiller = false;
  cantidadEnCotizacion = 0;
  private userSub: Subscription;

  constructor(public dialog: MatDialog,  private cotizacionService: CotizacionService, private authService: AuthService) {}
  ngOnInit(): void {
    this.subscription = this.cotizacionService.cotizacionesChanged.subscribe(cotizaciones => {
      this.cantidadEnCotizacion = cotizaciones.length;
    });
    this.cantidadEnCotizacion = this.cotizacionService.getCotizaciones().length;
    this.userSub = this.authService.user.subscribe(user => {
      this.user = user;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.userSub.unsubscribe();
  }

  logout() {
    this.authService.logout();
  }
}
