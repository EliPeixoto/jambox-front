import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';                     // <-- IMPORTADO
import { ToastrService } from 'ngx-toastr';    
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
    private router: Router,
    private toastr: ToastrService
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
    const dados: Usuario = {
      nome: this.usuarioForm.get('nome')?.value!,
      email: this.usuarioForm.get('email')?.value!,
      cpf: this.usuarioForm.get('cpf')?.value!,
      tipoUsuario: this.usuarioForm.get('tipoUsuario')?.value!,
      statusUsuario: 'ATIVO' 
    };

    if (this.usuarioForm.valid) {
      const dados: Usuario = {
        nome: this.usuarioForm.get('nome')?.value!,
        email: this.usuarioForm.get('email')?.value!,
        cpf: this.usuarioForm.get('cpf')?.value!,
        tipoUsuario: this.usuarioForm.get('tipoUsuario')?.value!,
        statusUsuario: 'ATIVO'
      };
  
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
