import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from '../../../models/usuario';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html',
  styleUrls: ['./cadastro-usuario.component.scss']
})
export class CadastroUsuarioComponent implements OnInit {
  usuarioId?: number;
  modoEdicao = false;

  usuarioForm = this.fb.group({
    nome: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    cpf: [{ value: '', disabled: true }, Validators.required],
    tipoUsuario: ['', Validators.required],
    statusUsuario: ['ATIVO', Validators.required]
  });

  tipos = [
    { value: 'ADMIN', viewValue: 'Administrador' },
    { value: 'MUSICO', viewValue: 'Músico' },
    { value: 'CONVIDADO', viewValue: 'Convidado' }
  ];

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.usuarioId = +id;
       this.modoEdicao = true;
      this.carregarUsuario(this.usuarioId);
    }
  }

  carregarUsuario(id: number): void {
    this.usuarioService.buscarPorId(id).subscribe({
      next: (usuario) => {
        this.usuarioForm.patchValue(usuario);
      },
      error: () => {
        this.toastr.error('Erro ao carregar usuário');
        this.router.navigate(['/usuarios']);
      }
    });
  }

  onSubmit(): void {
    if (this.usuarioForm.invalid) return;

    const dados: Usuario = this.usuarioForm.value as Usuario;

    if (this.modoEdicao && this.usuarioId) {

        delete dados.id;
        delete dados.dataCriacao;

      // EDIÇÃO
      this.usuarioService.editar(this.usuarioId, dados).subscribe({
        next: () => {
          this.toastr.success('Usuário atualizado com sucesso!');
          this.router.navigate(['/usuarios']);
        },
        error: () => {
          this.toastr.error('Erro ao atualizar usuário.');
        }
      });
    } else {
      // NOVO CADASTRO
      this.usuarioService.cadastrar(dados).subscribe({
        next: () => {
          this.toastr.success('Usuário cadastrado com sucesso!');
          this.router.navigate(['/usuarios']);
        },
        error: () => {
          this.toastr.error('Erro ao cadastrar usuário.');
        }
      });
    }
  }

  voltar(): void {
    this.router.navigate(['/usuarios']);
  }
}
