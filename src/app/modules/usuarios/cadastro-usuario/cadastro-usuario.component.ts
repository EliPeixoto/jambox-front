import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Usuario } from '../../../models/usuario';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html',
  styleUrl: './cadastro-usuario.component.scss'
})
export class CadastroUsuarioComponent {
  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private snackBar: MatSnackBar
  ) {} 

  usuarioForm = this.fb.group({
    nome: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    cpf: ['', Validators.required],
    tipoUsuario: ['', Validators.required],
    statusUsuario: ['ATIVO', Validators.required]
  });

  tipos = [
    { value: 'ADMIN', viewValue: 'Administrador' },
    { value: 'MUSICO', viewValue: 'Músico' },
    { value: 'CONVIDADO', viewValue: 'Convidado' }
  ];
  onSubmit(): void {
    if (this.usuarioForm.valid) {
      const usuario = this.usuarioForm.value as Usuario;
      this.usuarioService.cadastrar(usuario).subscribe({
        next: () => {
          this.snackBar.open('Usuário cadastrado com sucesso!', 'Fechar', { duration: 3000 });
          this.usuarioForm.reset({ statusUsuario: 'ATIVO' });
        },
        error: (err) => {
          console.error(err);
          this.snackBar.open('Erro ao cadastrar usuário.', 'Fechar', { duration: 3000 });
        }
      });
    }
  }

}
