import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import apiService from "@/api/ApiService";
import {Estagio, Atividade} from "@/api/ApiTypes";
import {useUserContext} from "@/hooks/userContext";
import {DetailContainer, DetailHeader, DetailSection, DetailItem, ButtonWrapper, RegisterActivityButton} from "@/components/styles/activities/ActivityDetails.styles";
import {SignUpProvider, useSignUpContext} from "@/hooks/SignUpContext";
import {ConfirmButtonGeneric} from "@/components/styles/Button.styles";

export default function StageDetail({idExterno}: {idExterno: number}) {
    const {user} = useUserContext();
    const router = useRouter();
    const {id} = router.query;
    const [stage, setStage] = useState<Estagio | null>(null);
    const [activities, setActivities] = useState<Atividade[]>([]);

    const {setEstagioId} = useSignUpContext();

    useEffect(() => {
        const stageId = idExterno ?? Number(id)
        if (stageId) {
            setEstagioId(Number(stageId));
            // Busca detalhes do estágio
            apiService
                .getEstagioById(Number(stageId))
                .then(response => setStage(response))
                .catch(error => console.error("Erro ao buscar estágio:", error));

            // Busca atividades relacionadas
            apiService
                .getAtividadesByEstagioId(Number(stageId))
                .then(response => setActivities(response))
                .catch(error => console.error("Erro ao buscar atividades:", error));
        }
    }, [id, idExterno]);

    const handleSubmitStage = async () => {
        try {
            // Submete o estágio para criação de um relatório final com status "Pendente"
            const relatorioData = {
                estagio: { idEstagio: id },
                status: "Pendente",
                dataSubmissao: new Date().toISOString(),
                comentarioOrientador: null,
                nota: null,
            };
    
            await apiService.submitRelatorioFinal(relatorioData);
            alert("Estágio submetido para avaliação com sucesso!");
        } catch (error) {
            console.error("Erro ao submeter o estágio:", error);
            alert("Erro ao submeter o estágio para avaliação. Tente novamente.");
        }
    };

    if (!stage) return <p>Carregando...</p>;

    return (
        <DetailContainer>
            <DetailHeader>
                <h1>Detalhes do Estágio</h1>
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
                            <strong>Data:</strong> {new Date(activity.data).toLocaleDateString()} - <strong>Descrição:</strong> {activity.descricao}
                        </DetailItem>
                    ))
                ) : (
                    <p>Nenhuma atividade cadastrada até o momento.</p>
                )}
            </DetailSection>

            <ButtonWrapper>
                {user?.role === "estagiario" && !stage.estagiario ? (
                    <RegisterActivityButton onClick={() => router.push("/internship/enterprise")}>Inscrever-se no Estágio</RegisterActivityButton>
                ) : user?.role === "estagiario" && stage.estagiario && stage.estagiario.idUsuario === user.idUsuario ? (
                    <RegisterActivityButton onClick={() => router.push(`/internship/activities/register/${stage.idEstagio}`)}>Cadastrar Atividade</RegisterActivityButton>
                ) : null}
                {user?.role === "estagiario" && <RegisterActivityButton onClick={handleSubmitStage}>Submeter para Avaliação</RegisterActivityButton>}
            </ButtonWrapper>
        </DetailContainer>
    );
}
