export type Estagiario = {
    idUsuario: number;
    nome: string;
    email: string;
    senha: string;
    telefone: number;
    dataNascimento: string; // ISO Date string
    numeroMatricula: number;
    curso: Curso;
};

export type Supervisor = {
    id: number;
    nome: string;
    telefone: number;
    cargo: string;
};

// Tipagem para Orientador
export type Orientador = {
    idUsuario: number;
    nome: string;
    email: string;
    senha: string;
    telefone: number;
    dataNascimento: string; // ISO Date string
    especializacao: string;
    curso: Curso;
};

// Tipagem para Coordenador
export type Coordenador = {
    idUsuario: number;
    nome: string;
    email: string;
    senha: string;
    telefone: number;
    dataNascimento: string; // ISO Date string
    curso: Curso;
};

// Tipagem para Curso
export type Curso = {
    idCurso: number;
    nome: string;
    campus: string;
};

// Tipagem para Empresa
export type Empresa = {
    id: number;
    cnpj: string;
    nome: string;
    telefone: number;
    email: string;
};

// Tipagem para Estagio
export type Estagio = {
    idEstagio: number;
    estagiario: Estagiario;
    orientador: Orientador;
    empresa: Empresa;
    duracaoInicio: string; // ISO Date string
    duracaoFim: string; // ISO Date string
    tipo: string;
    descricao: string;
    requisitos: number;
};

// Tipagem para Atividade
export type Atividade = {
    idAtividade: number;
    estagio: Estagio;
    data: string; // ISO Date string
    horasTrabalhadas: number;
    descricao: string;
};

// Tipagem para RelatorioFinal
export type RelatorioFinal = {
    idRelatorioFinal: number;
    dataSubmissao: string; // ISO Date string
    comentarioOrientador: string;
    status: string;
    nota: number;
    estagio: Estagio;
};

// Tipagens para métodos POST
// Tipagem de dados que serão enviados no POST de Estagio
export type PostEstagio = Omit<Estagio, "idEstagio" | "estagiario" | "empresa" | "orientador"> & {
    estagiario?: {idUsuario: number}; // Opcional
    orientador: {idUsuario: number}; // Apenas o ID
    empresa?: {id: number}; // Opcional
};

// Tipagem de dados que serão enviados no POST de Atividade
export type PostAtividade = Omit<Atividade, "idAtividade"> & {
    estagio: {idEstagio: number};
};

// Tipagem de dados que serão enviados no POST de RelatorioFinal
export type PostRelatorioFinal = Omit<RelatorioFinal, "idRelatorioFinal"> & {
    estagio: {idEstagio: number};
};

// Tipagem para POST de Empresa (exclui 'id')
export type PostEmpresa = Omit<Empresa, "id"> & {
    supervisores: Omit<Supervisor, "id" | "empresa">[]; // Exclui 'id' e 'empresa' de cada supervisor
};

// ApiTypes.ts
export type VincularEstagioRequest = {
    estagioId: number;
    estagiarioId: number;
    companyId: number;
    courseId: number;
};

export type PostSupervisor = Omit<Supervisor, "id">;
