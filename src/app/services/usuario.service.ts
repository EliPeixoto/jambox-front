import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
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

  buscarComFiltros(nome: string, email: string, cpf: string): Observable<HttpResponse<Usuario[]>> {
    let params = new HttpParams();
    if (nome) params = params.set('nome', nome);
    if (email) params = params.set('email', email);
    if (cpf) params = params.set('cpf', cpf);

    return this.http.get<Usuario[]>(`${this.apiUrl}/buscar`, {
      params,
      observe: 'response'
    });
  }
  editar(id: number, usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.apiUrl}/${id}`, usuario);
  }
  
  buscarPorId(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}/${id}`);
  }
  
  
  
}
