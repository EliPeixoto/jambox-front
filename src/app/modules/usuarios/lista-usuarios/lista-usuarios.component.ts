import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../models/usuario';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarExclusaoComponent } from '../../../../app/shared/modals/confirmar-exclusao.component';


@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.scss']
})
export class ListaUsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];
  colunas: string[] = ['nome', 'email', 'cpf', 'acoes'];

  filtros = {
    nome: '',
    email: '',
    cpf: ''
  };

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private toastr: ToastrService,
    private dialog: MatDialog,
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

  editarUsuario(id: number): void {
    this.router.navigate(['/usuarios/editar', id]);
  }
  
  excluirUsuario(id: number): void {
    // Aqui você pode implementar a lógica futuramente
    console.log('Excluir usuário ID:', id);
  }

  abrirConfirmacao(id: number): void {
    const dialogRef = this.dialog.open(ConfirmarExclusaoComponent, {
      width: '350px',
      data: { id }
    });
  
    dialogRef.afterClosed().subscribe(confirmado => {
      if (confirmado) {
        this.usuarioService.excluirUsuario(id).subscribe({
          next: () => {
            this.filtrar(); // recarrega a lista com filtros aplicados
            this.toastr.success('Usuário excluído com sucesso! 👋', 'Sucesso');
          },
          error: (err) => {
            this.toastr.error('Erro ao excluir o usuário.', 'Erro');
            console.error(err);
          }
        });
      }
    });
  }
  
}
