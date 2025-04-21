import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListaUsuariosComponent } from './lista-usuarios/lista-usuarios.component';
import { UsuariosRoutingModule } from './usuarios-routing.module';
import { UsuariosComponent } from './usuarios.component';


const routes: Routes = [
  { path: '', component: ListaUsuariosComponent }
];
@NgModule({
  declarations: [
    UsuariosComponent
  ],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    RouterModule.forChild(routes)
  ]
})
export class UsuariosModule { }
