export interface Usuario {
    dataCriacao: any;
    id?: number;
    nome: string;
    email: string;
    cpf: string;
    tipoUsuario: string; // 'ADMIN', 'MUSICO', 'CONVIDADO'
    statusUsuario: string; // 'ATIVO', 'INATIVO'
  }
  
