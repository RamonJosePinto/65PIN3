import axios from "axios";
import {Atividade, Estagiario, Estagio, Orientador, PostAtividade, PostEstagio, PostRelatorioFinal, RelatorioFinal} from "./ApiTypes";

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

    async createAtividade(data: { estagio: { idEstagio: number }; data: string; horasTrabalhadas: number; descricao: string }): Promise<void> {
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
            const response = await baseURL.get<Orientador>(`/orientadores?email=${email}`);
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

};

export default apiService;
