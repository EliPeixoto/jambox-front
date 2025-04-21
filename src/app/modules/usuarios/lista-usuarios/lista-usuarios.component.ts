import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../models/usuario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.scss']
})
export class ListaUsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];
  colunas: string[] = ['nome', 'email', 'cpf'];

  filtros = {
    nome: '',
    email: '',
    cpf: ''
  };

  constructor(
    private usuarioService: UsuarioService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.carregarUsuarios();
  }

  carregarUsuarios(): void {
    this.usuarioService.listarUsuarios().subscribe(dados => {
      this.usuarios = dados;
    });
  }

  filtrar(): void {
    const { nome, email, cpf } = this.filtros;

  this.usuarioService.buscarComFiltros(nome, email, cpf).subscribe(dados => {
    this.usuarios = dados;
  });
  }

  irParaCadastro(): void {
    this.router.navigate(['/usuarios/novo']);
  }
}
