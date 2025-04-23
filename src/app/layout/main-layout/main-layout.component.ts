import { Component, ViewChild } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent {
  isSidebarCollapsed = false;

  @ViewChild(SidebarComponent) sidebarComponent!: SidebarComponent;

  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;

    if (this.isSidebarCollapsed) {
      this.sidebarComponent.fecharBuscaManual();
    }
  }

  expandirSidebar() {
    this.isSidebarCollapsed = false;
  }
}
