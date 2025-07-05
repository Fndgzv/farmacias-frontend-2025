import { Component, EventEmitter, Input, OnInit, Output, signal } from '@angular/core';
import { NgIf, } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [NgIf, RouterModule, MatIconModule, FormsModule]
})
export class HeaderComponent implements OnInit {

  @Input() isSidebarOpen: boolean = false;
  @Output() toggleSidebar = new EventEmitter<void>();


  usuario: any = null;
  userNombre: string | null = null;
  userRol: string | null = null;

  farmaciaId: string | null = null;
  farmaciaNombre: string = '';


  isEditProfileVisible = false;

  menuOpen = false;

  searchQuery: string = '';

  @Output() userLoggedOut = new EventEmitter<void>();

  constructor(public authService: AuthService) {
    this.authService.userNombre$.subscribe(nombre => {
      this.userNombre = nombre;
    });

    this.authService.userRol$.subscribe(rol => {
      this.userRol = rol;
    });

    this.authService.isEditProfileVisible.subscribe(visible => {
      this.isEditProfileVisible = visible;
      if (visible) {
        this.menuOpen = false; // 🔹 Cierra el menú inmediatamente si edit-profile está abierto
      }
    });
  }

  ngOnInit(): void {
    this.authService.usuario$.subscribe(user => {
      this.usuario = user;
      this.userNombre = user?.nombre || null;
      this.userRol = user?.rol || null;
    });

    this.authService.farmacia$.subscribe(farmacia => {
      if (farmacia) {
        this.farmaciaId = farmacia._id;
        this.farmaciaNombre = farmacia.nombre;
      } else {
        this.farmaciaId = null;
        this.farmaciaNombre = '';
      }
    });

  }

  toggleMenu() {
    if (!this.isEditProfileVisible) {
      this.menuOpen = !this.menuOpen;
    }
  }


  logout() {
    this.authService.logout();
    this.userLoggedOut.emit();
  }


  openChangePassword() {
    this.menuOpen = false;
    this.authService.showChangePassword();
  }


  openUpdateProfile() {
    this.menuOpen = false;
    this.authService.showEditProfile();
  }

  clearSearch() {
    this.searchQuery = '';
  }

}
