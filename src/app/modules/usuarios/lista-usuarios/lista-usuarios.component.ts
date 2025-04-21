import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';


@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html'
})
export class ListaUsuariosComponent implements OnInit {
  usuarios: any[] = [];

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit() {
    this.usuarioService.listarUsuarios().subscribe(dados => {
      this.usuarios = dados;
    });
  }
}