import React, {useEffect, useState, useContext} from "react";
import {Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend} from "chart.js";
import {Bar} from "react-chartjs-2";
import {useUserContext} from "@/hooks/userContext";
import {Atividade, Estagio, RelatorioFinal} from "@/api/ApiTypes";
import apiService from "@/api/ApiService";
import { formatDate } from "@/utils/DateFormat";

// Registrar componentes do Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Reports = () => {
    const {user} = useUserContext(); // Obtém o usuário logado
    const [stageData, setStageData] = useState<Estagio[]>([]);
    const [activityData, setActivityData] = useState<Atividade[]>([]);
    const [evaluationData, setEvaluationData] = useState<RelatorioFinal[]>([]);
    const [activeReport, setActiveReport] = useState<string>("");

    useEffect(() => {
        if (!user) return;

        if (activeReport === "estagios") {
            if (user.role === "estagiario") {
                apiService.getRelatorioEstagiosPorEstagiario(user.idUsuario).then(setStageData).catch(console.error);
            } else if (user.role === "orientador") {
                apiService.getRelatorioEstagiosPorOrientador(user.idUsuario).then(setStageData).catch(console.error);
            } else if (user.role === "coordenador") {
                apiService.getRelatorioGeralEstagios().then(setStageData).catch(console.error);
            }
        } else if (activeReport === "atividades") {
            if (user.role === "estagiario") {
                apiService.getRelatorioAtividadesPorEstagiario(user.idUsuario).then(setActivityData).catch(console.error);
            } else if (user.role === "orientador") {
                apiService.getRelatorioAtividadesPorOrientador(user.idUsuario).then(setActivityData).catch(console.error);
            } else if (user.role === "coordenador") {
                apiService.getRelatorioGeralAtividades().then(setActivityData).catch(console.error);
            }
        } else if (activeReport === "avaliacoes") {
            if (user.role === "orientador") {
                apiService.getRelatorioAvaliacoesPorOrientador(user.idUsuario).then(setEvaluationData).catch(console.error);
            } else if (user.role === "coordenador") {
                apiService.getRelatorioGeralAvaliacoes().then(setEvaluationData).catch(console.error);
            }
        }
    }, [activeReport, user]);

    // Configuração de dados do gráfico com base no relatório ativo
    const getChartData = () => {
        if (activeReport === "estagios") {
            return {
                labels: stageData.map(stage => stage.empresa?.nome || "Desconhecida"),
                datasets: [
                    {
                        label: "Duração dos Estágios (em meses)",
                        data: stageData.map(stage => {
                            const start = new Date(stage.duracaoInicio).getTime();
                            const end = new Date(stage.duracaoFim).getTime();
                            return (end - start) / (1000 * 60 * 60 * 24 * 30); // Converter ms para meses
                        }),
                        backgroundColor: "rgba(75, 192, 192, 0.6)",
                    },
                ],
            };
        } else if (activeReport === "atividades") {
            return {
                labels: activityData.map(activity => formatDate(activity.data)),
                datasets: [
                    {
                        label: "Horas Trabalhadas",
                        data: activityData.map(activity => activity.horasTrabalhadas),
                        backgroundColor: "rgba(255, 159, 64, 0.6)",
                    },
                ],
            };
        } else if (activeReport === "avaliacoes") {
            return {
                labels: evaluationData.map(evaluation => evaluation.estagio.empresa?.nome || "Desconhecida"),
                datasets: [
                    {
                        label: "Notas das Avaliações",
                        data: evaluationData.map(evaluation => evaluation.nota),
                        backgroundColor: "rgba(153, 102, 255, 0.6)",
                    },
                ],
            };
        }
        return {labels: [], datasets: []};
    };

    // Botões de relatórios com base no tipo de usuário
    const renderButtons = () => {
        if (user.role === "estagiario") {
            return (
                <>
                    <button onClick={() => setActiveReport("estagios")}>Relatório de Estágios</button>
                    <button onClick={() => setActiveReport("atividades")}>Relatório de Atividades</button>
                </>
            );
        } else if (user.role === "orientador") {
            return (
                <>
                    <button onClick={() => setActiveReport("estagios")}>Relatório de Estágios Orientados</button>
                    <button onClick={() => setActiveReport("atividades")}>Relatório de Atividades Orientadas</button>
                    <button onClick={() => setActiveReport("avaliacoes")}>Relatório de Avaliações</button>
                </>
            );
        } else if (user.role === "coordenador") {
            return (
                <>
                    <button onClick={() => setActiveReport("estagios")}>Relatório Geral de Estágios</button>
                    <button onClick={() => setActiveReport("atividades")}>Relatório Geral de Atividades</button>
                    <button onClick={() => setActiveReport("avaliacoes")}>Relatório Geral de Avaliações</button>
                </>
            );
        }
        return null;
    };

    return (
        <div>
            <h1>Relatórios</h1>
            <div>{renderButtons()}</div>
            <Bar data={getChartData()} key={activeReport} />
        </div>
    );
};

export default Reports;
