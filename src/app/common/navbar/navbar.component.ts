import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  public openResponsiveMenu: boolean;

  constructor() {
    this.openResponsiveMenu = false;
  }

  public toggle(): void {
    this.openResponsiveMenu = !this.openResponsiveMenu;
  }
}
