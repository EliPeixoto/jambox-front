import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import {CadastroUsuarioComponent} from '../app/modules/usuarios/cadastro-usuario/cadastro-usuario.component'

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'usuarios', loadChildren: () => import('./modules/usuarios/usuarios.module').then(m => m.UsuariosModule) },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {path: 'usuarios/editar/:id',component: CadastroUsuarioComponent}
    ]
  },
  { path: '**', redirectTo: '' } // rota de fallback
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
