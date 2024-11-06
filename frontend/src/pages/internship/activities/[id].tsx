import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import apiService from "@/api/ApiService";
import {Estagio, Atividade} from "@/api/ApiTypes";
import {useUserContext} from "@/hooks/userContext";
import {DetailContainer, DetailHeader, DetailSection, DetailItem, ButtonWrapper, RegisterActivityButton} from "@/components/styles/activities/ActivityDetails.styles";

export default function StageDetail() {
    const {user} = useUserContext();
    const router = useRouter();
    const {id} = router.query;
    const [stage, setStage] = useState<Estagio | null>(null);
    const [activities, setActivities] = useState<Atividade[]>([]);

    useEffect(() => {
        if (id) {
            // Busca detalhes do estágio
            apiService
                .getEstagioById(Number(id))
                .then(response => setStage(response))
                .catch(error => console.error("Erro ao buscar estágio:", error));

            // Busca atividades relacionadas
            apiService
                .getAtividadesByEstagioId(Number(id))
                .then(response => setActivities(response))
                .catch(error => console.error("Erro ao buscar atividades:", error));
        }
    }, [id]);

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

            {user?.role === "estagiario" && (
                <ButtonWrapper>
                    <RegisterActivityButton onClick={() => router.push(`/internship/activities/register/${stage.idEstagio}`)}>Cadastrar Atividade</RegisterActivityButton>
                </ButtonWrapper>
            )}
        </DetailContainer>
    );
}
