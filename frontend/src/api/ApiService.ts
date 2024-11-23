import axios from "axios";
import {
    Atividade,
    Curso,
    Empresa,
    Estagiario,
    Estagio,
    Orientador,
    PostAtividade,
    PostEmpresa,
    PostEstagio,
    PostRelatorioFinal,
    RelatorioFinal,
    Supervisor,
    VincularEstagioRequest,
} from "./ApiTypes";

const baseURL = axios.create({
    baseURL: "http://127.0.0.1:8080/api",
});

const apiService = {
    async getEstagios(): Promise<Estagio[]> {
        const response = await baseURL.get<Estagio[]>("/estagios");
        return response.data;
    },

    async createEstagio(data: PostEstagio): Promise<Estagio> {
        const response = await baseURL.post<Estagio>("/estagios", data);
        return response.data;
    },

    async getAtividades(): Promise<Atividade[]> {
        const response = await baseURL.get<Atividade[]>("/atividades");
        return response.data;
    },

    async createAtividade(data: {estagio: {idEstagio: number}; data: string; horasTrabalhadas: number; descricao: string}): Promise<void> {
        const response = await baseURL.post("/atividades", data);
        return response.data;
    },

    async getRelatorios(): Promise<RelatorioFinal[]> {
        const response = await baseURL.get<RelatorioFinal[]>("/relatorios");
        return response.data;
    },

    async createRelatorio(data: PostRelatorioFinal): Promise<RelatorioFinal> {
        const response = await baseURL.post<RelatorioFinal>("/relatorios", data);
        return response.data;
    },

    async getEstagiarioByEmail(email: string): Promise<Estagiario | null> {
        try {
            const response = await baseURL.get<Estagiario>(`/estagiarios/email?email=${email}`);
            return response.data;
        } catch {
            return null; // Retorna null se não encontrar o estagiário
        }
    },

    async getOrientadorByEmail(email: string): Promise<Orientador | null> {
        try {
            const response = await baseURL.get<Orientador>(`/orientadores/email?email=${email}`);
            return response.data;
        } catch {
            return null; // Retorna null se não encontrar o orientador
        }
    },

    async getCoordenadorByEmail(email: string): Promise<Orientador | null> {
        try {
            const response = await baseURL.get<Orientador>(`/coordenadores/email?email=${email}`);
            return response.data;
        } catch {
            return null; // Retorna null se não encontrar o orientador
        }
    },

    async createEstagiario(data: any): Promise<void> {
        await baseURL.post("/estagiarios", data);
    },

    async getEstagiosByEstagiario(idEstagiario: number): Promise<Estagio[]> {
        const response = await baseURL.get<Estagio[]>(`/estagios/estagiario/${idEstagiario}`);
        return response.data;
    },

    async getEstagiosByOrientador(idOrientador: number): Promise<Estagio[]> {
        const response = await baseURL.get<Estagio[]>(`/estagios/orientador/${idOrientador}`);
        return response.data;
    },

    async getEstagioById(idEstagio: number): Promise<Estagio> {
        const response = await baseURL.get<Estagio>(`/estagios/${idEstagio}`);
        return response.data;
    },

    async getAtividadesByEstagioId(idEstagio: number): Promise<Atividade[]> {
        const response = await baseURL.get<Atividade[]>(`/atividades/estagio/${idEstagio}`);
        return response.data;
    },

    // Função de criação de empresa
    async createEmpresa(data: PostEmpresa) {
        const response = await baseURL.post("/enterprise", data);
        return response.data;
    },

    async createSupervisor(supervisorData: Supervisor): Promise<Supervisor> {
        const response = await baseURL.post("http://localhost:8080/supervisor", supervisorData);
        return response.data;
    },
    async getCursos(): Promise<Curso[]> {
        const response = await baseURL.get<Curso[]>("/cursos");
        return response.data;
    },
    async createCurso(data: Omit<Curso, "idCurso">): Promise<Curso> {
        const response = await baseURL.post<Curso>("/cursos", data);
        return response.data;
    },
    async vincularEstagiarioAoCurso(courseId: number): Promise<void> {
        await baseURL.post(`/estagiario/vincularCurso/${courseId}`);
    },
    async vincularEstagio(data: VincularEstagioRequest): Promise<void> {
        await baseURL.post("/estagios/vincular", data);
    },
    async submitEstagio(idEstagio: number): Promise<void> {
        await baseURL.put(`/estagios/${idEstagio}/submit`);
    },
    async submitRelatorioFinal(data: {idEstagio: number; comentarioOrientador: string; status: string; nota: number}): Promise<void> {
        await baseURL.post("/relatorios/submeter", data);
    },
    async avaliarRelatorioFinal(id: number, updatedRelatorio: Partial<RelatorioFinal>): Promise<RelatorioFinal> {
        const response = await baseURL.put<RelatorioFinal>(`/relatorios/avaliar/${id}`, updatedRelatorio);
        return response.data;
    },
    async getSubmittedStages(): Promise<RelatorioFinal[]> {
        const response = await baseURL.get<RelatorioFinal[]>("/relatorios/pendentes");
        return response.data;
    },
    async getRelatorioFinalByEstagiarioId(id: number): Promise<RelatorioFinal[]> {
        const response = await baseURL.get<RelatorioFinal[]>(`/relatorios/estagiario/${id}`);
        return response.data;
    },
    async getRelatorioById(id: number): Promise<RelatorioFinal> {
        const response = await baseURL.get<RelatorioFinal>(`/relatorios/${id}`);
        return response.data;
    },
    async getRelatorioGeralEstagios(): Promise<Estagio[]> {
        const response = await baseURL.get<Estagio[]>("/relatorios/estagios");
        return response.data;
    },

    // Função para buscar relatórios gerais de atividades
    async getRelatorioGeralAtividades(): Promise<Atividade[]> {
        const response = await baseURL.get<Atividade[]>("/relatorios/atividades");
        return response.data;
    },

    // Função para buscar relatórios gerais de avaliações de relatórios finais
    async getRelatorioGeralAvaliacoes(): Promise<RelatorioFinal[]> {
        const response = await baseURL.get<RelatorioFinal[]>("/relatorios/avaliacoes");
        return response.data;
    },
    async getRelatorioAtividadesPorEstagiario(idEstagiario: number): Promise<Atividade[]> {
        const response = await baseURL.get<Atividade[]>(`/relatorios/atividades/estagiario/${idEstagiario}`);
        return response.data;
    },

    // Relatório de atividades submetidas em estágios orientados pelo orientador
    async getRelatorioAtividadesPorOrientador(idOrientador: number): Promise<Atividade[]> {
        const response = await baseURL.get<Atividade[]>(`/relatorios/atividades/orientador/${idOrientador}`);
        return response.data;
    },
    // Relatório de estágios do estagiário
    async getRelatorioEstagiosPorEstagiario(idEstagiario: number): Promise<Estagio[]> {
        const response = await baseURL.get<Estagio[]>(`/relatorios/estagios/estagiario/${idEstagiario}`);
        return response.data;
    },

    // Relatório de estágios orientados pelo orientador
    async getRelatorioEstagiosPorOrientador(idOrientador: number): Promise<Estagio[]> {
        const response = await baseURL.get<Estagio[]>(`/relatorios/estagios/orientador/${idOrientador}`);
        return response.data;
    },

    // Relatório de avaliações realizadas pelo orientador
    async getRelatorioAvaliacoesPorOrientador(idOrientador: number): Promise<RelatorioFinal[]> {
        const response = await baseURL.get<RelatorioFinal[]>(`/relatorios/avaliacoes/orientador/${idOrientador}`);
        return response.data;
    },
    async getSubmittedStagesByOrientador(idOrientador: number): Promise<RelatorioFinal[]> {
        const response = await baseURL.get<RelatorioFinal[]>(`/relatorios/pendentes/orientador/${idOrientador}`);
        return response.data;
    },
    async getRelatorioByEstagioId(idEstagio: number): Promise<RelatorioFinal | null> {
        try {
            const response = await baseURL.get<RelatorioFinal>(`/relatorios/estagio/${idEstagio}`);
            return response.data;
        } catch (error: any) {
            if (error.response?.status === 204) {
                return null; // Retorna null se nenhum relatório for encontrado
            }
            throw error;
        }
    },
    async registerOrientador(data: {nome: string; email: string; senha: string; telefone: string; dataNascimento: string; cursoId: number}): Promise<void> {
        await baseURL.post("/orientadores", data);
    },
    async login(email: string, senha: string, role: string): Promise<any> {
        const response = await baseURL.get(`/auth/login`, {
            params: {email, senha, role},
        });
        return response.data;
    },
};

export default apiService;
