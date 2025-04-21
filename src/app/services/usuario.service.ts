import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';
import{ Usuario} from '../../app/models/usuario'

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = `${environment.apiUrl}/usuarios`;
  constructor(private http: HttpClient) { }

  listarUsuarios(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  cadastrar(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.apiUrl, usuario);
  }

  buscarComFiltros(nome?: string, email?: string, cpf?: string): Observable<Usuario[]> {
    const params: any = {};
    if (nome) params.nome = nome;
    if (email) params.email = email;
    if (cpf) params.cpf = cpf;
  
    return this.http.get<Usuario[]>(`${this.apiUrl}/buscar`, { params });
  }
  
}
