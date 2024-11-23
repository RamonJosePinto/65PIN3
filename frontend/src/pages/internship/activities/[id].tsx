import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import apiService from "@/api/ApiService";
import {Estagio, Atividade, RelatorioFinal} from "@/api/ApiTypes";
import {useUserContext} from "@/hooks/userContext";
import {DetailContainer, DetailHeader, DetailSection, DetailItem, ButtonWrapper, RegisterActivityButton, ProgressBar} from "@/components/styles/activities/ActivityDetails.styles";
import {SignUpProvider, useSignUpContext} from "@/hooks/SignUpContext";
import {ConfirmButtonGeneric} from "@/components/styles/Button.styles";
import Head from "next/head";
import {ErrorSpan} from "@/components/styles/LoginPage.styles";

export default function StageDetail({idExterno}: {idExterno: number}) {
    const {user} = useUserContext();
    const router = useRouter();
    const {id} = router.query;

    const [stage, setStage] = useState<Estagio | null>(null);
    const [activities, setActivities] = useState<Atividade[]>([]);
    const [relatorioFinal, setRelatorioFinal] = useState<RelatorioFinal | null>(null);
    const [horasGastas, setHorasGastas] = useState<number>(0);
    const [horasEsperadas, setHorasEsperadas] = useState<number>(0);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const {setEstagioId} = useSignUpContext();

    useEffect(() => {
        const stageId = idExterno ?? Number(id);
        if (stageId) {
            setEstagioId(Number(stageId));
            // Busca detalhes do estágio
            apiService
                .getEstagioById(Number(stageId))
                .then(response => {
                    setStage(response);
                    // Calcula as horas esperadas
                    const inicio = new Date(response.duracaoInicio);
                    const fim = new Date(response.duracaoFim);

                    const diasTotais = Math.floor((fim.getTime() - inicio.getTime()) / (1000 * 60 * 60 * 24));
                    const diasUteis = Math.ceil(diasTotais * (5 / 7)); // Aproximação de dias úteis
                    const horas = diasUteis * 6; // Supondo 6 horas/dia
                    setHorasEsperadas(horas);

                    return apiService.getRelatorioByEstagioId(Number(stageId));
                })
                .then(response => setRelatorioFinal(response))
                .catch(error => console.error("Erro ao buscar estágio:", error));

            // Busca atividades relacionadas
            apiService
                .getAtividadesByEstagioId(Number(stageId))
                .then(response => {
                    setActivities(response);
                    const horasTotais = response.reduce((total, atividade) => total + atividade.horasTrabalhadas, 0);
                    setHorasGastas(horasTotais);
                })
                .catch(error => console.error("Erro ao buscar atividades:", error));
        }
    }, [id, idExterno]);

    const handleSubmitStage = async () => {
        if (!stage || !activities) return;

        if (horasGastas < horasEsperadas) {
            // Define a mensagem de erro e remove-a após 5 segundos
            setErrorMessage("Você não possui o tempo mínimo suficiente para submeter o estágio.");
            setTimeout(() => setErrorMessage(null), 10000);
            return;
        }

        try {
            // Submete o estágio para criação de um relatório final com status "Pendente"
            const relatorioData = {
                estagio: {idEstagio: id},
                status: "Pendente",
                dataSubmissao: new Date().toISOString(),
                comentarioOrientador: null,
                nota: null,
            };

            // @ts-ignore
            await apiService.submitRelatorioFinal(relatorioData);
            alert("Estágio submetido para avaliação com sucesso!");
        } catch (error) {
            console.error("Erro ao submeter o estágio:", error);
            alert("Erro ao submeter o estágio para avaliação. Tente novamente.");
        }
    };

    const isVinculado = (): boolean => {
        // Verifica se o usuário é estagiário e está vinculado ou orientador do estágio
        if (user?.role === "estagiario") {
            return stage?.estagiario?.idUsuario === user.idUsuario;
        }
        if (user?.role === "orientador") {
            return stage?.orientador?.idUsuario === user.idUsuario;
        }
        return false;
    };

    if (!stage) return <p>Carregando...</p>;

    return (
        <DetailContainer>
            <Head>
                <title>Detalhes do Estágio</title>
            </Head>
            <DetailHeader>
                <h1>Detalhes do Estágio</h1>
                {isVinculado() && <ProgressBar current={horasGastas} total={horasEsperadas} />}
            </DetailHeader>
            <DetailSection>
                <DetailItem>
                    <strong>Tipo:</strong> {stage.tipo}
                </DetailItem>
                <DetailItem>
                    <strong>Descrição:</strong> {stage.descricao}
                </DetailItem>
                <DetailItem>
                    <strong>Início:</strong> {new Date(stage.duracaoInicio).toLocaleDateString()}
                </DetailItem>
                <DetailItem>
                    <strong>Fim:</strong> {new Date(stage.duracaoFim).toLocaleDateString()}
                </DetailItem>
                <DetailItem>
                    <strong>Requisitos:</strong> {stage.requisitos}
                </DetailItem>
            </DetailSection>

            <DetailSection>
                <h2>Atividades Cadastradas</h2>
                {activities.length > 0 ? (
                    activities.map(activity => (
                        <DetailItem key={activity.idAtividade}>
                            <strong>Data:</strong> {new Date(activity.data).toLocaleDateString()} -<strong>Descrição:</strong> {activity.descricao} -<strong>Horas:</strong>{" "}
                            {activity.horasTrabalhadas}
                        </DetailItem>
                    ))
                ) : (
                    <p>Nenhuma atividade cadastrada até o momento.</p>
                )}
            </DetailSection>

            <ButtonWrapper>
                {user?.role === "estagiario" && !stage.estagiario ? (
                    // Exibe o botão para inscrever-se no estágio, caso não esteja vinculado
                    <RegisterActivityButton onClick={() => router.push("/internship/enterprise")}>Inscrever-se no Estágio</RegisterActivityButton>
                ) : user?.role === "estagiario" && stage.estagiario?.idUsuario === user.idUsuario && !relatorioFinal ? (
                    <>
                        {/* Exibe o botão para cadastrar atividade */}
                        <RegisterActivityButton onClick={() => router.push(`/internship/activities/register/${stage.idEstagio}`)}>Cadastrar Atividade</RegisterActivityButton>
                        {/* Exibe o botão para submeter relatório */}
                        <RegisterActivityButton onClick={handleSubmitStage}>Submeter para Avaliação</RegisterActivityButton>
                    </>
                ) : null}
            </ButtonWrapper>
            <div style={{display: "flex", justifyContent: "end", marginTop: 10}}>{errorMessage && <ErrorSpan>{errorMessage}</ErrorSpan>}</div>
        </DetailContainer>
    );
}
