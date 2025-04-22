import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../models/usuario';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


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
    private router: Router,
    private toastr: ToastrService
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
  
    this.usuarioService.buscarComFiltros(nome, email, cpf).subscribe({
      next: (response) => {
        const usuarios = response.body ?? [];
        this.usuarios = usuarios;
      },
      error: (err) => {
        console.log('Erro recebido:', err);
        if (err.status === 404) {
          this.usuarios = [];
          this.toastr.warning('Nenhum usuário encontrado com os filtros informados');
        } else {
          this.toastr.error('Erro ao buscar usuários');
        }
      }
    });
  }
  
  limparFiltros(): void {
    this.filtros = {
      nome: '',
      email: '',
      cpf: ''
    };
  
    this.usuarioService.buscarComFiltros('', '', '').subscribe({
      next: (response) => {
        const usuarios = response.body ?? [];
        this.usuarios = usuarios;
      },
      error: (err) => {
        console.log('Erro recebido 2:', err);
        if (err.status === 404) {
          this.usuarios = [];
          this.toastr.warning('Nenhum usuário encontrado');
        } else {
          this.toastr.error('Erro ao buscar usuários');
        }
      }
    });
  }
  
  irParaCadastro(): void {
    this.router.navigate(['/usuarios/novo']);
  }
}
