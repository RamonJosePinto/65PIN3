import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import apiService from "@/api/ApiService";
import {Estagio, Atividade, RelatorioFinal} from "@/api/ApiTypes";
import {useUserContext} from "@/hooks/userContext";
import {
    DetailContainer,
    DetailHeader,
    DetailSection,
    DetailItem,
    ButtonWrapper,
    RegisterActivityButton,
    ProgressBar,
    RelatorioContainer,
    RelatorioHeader,
    RelatorioItem,
    EstagiarioContainer,
    EstagiarioHeader,
    SideBySideContainer,
} from "@/components/styles/activities/ActivityDetails.styles";
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
    const [aprovedMessage, setAprovedMessage] = useState<string | null>(null);
    const [podeInscrever, setPodeInscrever] = useState<boolean>(true);

    const {setEstagioId} = useSignUpContext();

    console.log({stage});

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

    useEffect(() => {
        if (user?.role === "estagiario") {
            apiService.verificarEstagioEmAndamento(user.idUsuario).then(response => {
                // Verifica se o estágio atual é o mesmo em andamento
                if (response === "Você já está vinculado a um estágio em andamento.") {
                    if (isVinculado()) {
                        // O estágio detalhado é o mesmo em andamento
                        setErrorMessage(null); // Não exibe mensagem de erro
                        if (relatorioFinal?.status === "Aprovado") {
                            setAprovedMessage("Seu estágio foi aprovado.");
                        } else {
                            setAprovedMessage(null); // Sem mensagem de aprovação
                        }
                    } else {
                        // Estágio em andamento é diferente do atual
                        setErrorMessage("Você já está vinculado a um estágio em andamento.");
                        setAprovedMessage(null);
                    }
                    setPodeInscrever(false); // Usuário não pode se inscrever
                } else {
                    // O usuário não tem estágio em andamento
                    setErrorMessage(null);
                    setPodeInscrever(true); // Usuário pode se inscrever
                    setAprovedMessage(null);
                }
            });
        }
    }, [user, relatorioFinal, stage]);

    console.log({horasEsperadas, horasGastas});
    

    const handleSubmitStage = async () => {
        
        if (horasGastas < horasEsperadas || horasGastas <= 0) {
            // Define a mensagem de erro e remove-a após 5 segundos
            setErrorMessage("Você não possui o tempo mínimo suficiente para submeter o estágio.");
            setTimeout(() => setErrorMessage(null), 10000);
            return;
        }

        if (!stage || !activities) return;

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

    if (!stage) return <p>Carregando...</p>;

    return (
        <>
            <DetailContainer>
                <Head>
                    <title>Detalhes do Estágio</title>
                </Head>
                <DetailHeader>
                    <h1>Detalhes do Estágio</h1>
                    {isVinculado() && !aprovedMessage && <ProgressBar current={horasGastas} total={horasEsperadas} />}
                    {/* Exibir mensagem para estágios aprovados */}
                    {aprovedMessage && <p style={{color: "green", marginTop: "10px"}}>{aprovedMessage}</p>}
                    {/* Exibir mensagem para estágios em andamento */}
                    {!aprovedMessage && errorMessage && <p style={{color: "red", marginTop: "10px"}}>{errorMessage}</p>}
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
                    {user?.role === "estagiario" && !stage.estagiario && podeInscrever ? (
                        // Exibe o botão para inscrever-se no estágio, caso não esteja vinculado e possa se inscrever
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

                {/* Exibir mensagens de erro ou aprovação */}
                <div style={{display: "flex", justifyContent: "end", marginTop: 10}}>
                    {!aprovedMessage && errorMessage && <ErrorSpan>{errorMessage}</ErrorSpan>}
                    {aprovedMessage && <ErrorSpan style={{color: "green"}}>{aprovedMessage}</ErrorSpan>}
                </div>
            </DetailContainer>

            {(relatorioFinal || stage?.estagiario) && (
                <SideBySideContainer>
                    {relatorioFinal && (
                        <DetailContainer>
                            <DetailHeader style={{borderColor: "#4CAF50"}}>
                                <h1 style={{color: "#4CAF50"}}>Relatório Final</h1>
                            </DetailHeader>
                            <DetailSection>
                                <DetailItem>
                                    <strong>Status:</strong> {relatorioFinal.status}
                                </DetailItem>
                                <DetailItem>
                                    <strong>Comentário do Orientador:</strong> {relatorioFinal.comentarioOrientador || "Não há comentários disponíveis."}
                                </DetailItem>
                                <DetailItem>
                                    <strong>Nota:</strong> {relatorioFinal.nota || "Não houve nota informada"}
                                </DetailItem>
                            </DetailSection>
                        </DetailContainer>
                    )}

                    {stage?.estagiario && (
                        <DetailContainer>
                            <DetailHeader style={{borderColor: "#007BFF"}}>
                                <h1 style={{color: "#007BFF"}}>Informações do Estagiário</h1>
                            </DetailHeader>
                            <DetailSection>
                                <DetailItem>
                                    <strong>Nome:</strong> {stage.estagiario.nome}
                                </DetailItem>
                                <DetailItem>
                                    <strong>Email:</strong> {stage.estagiario.email}
                                </DetailItem>
                                <DetailItem>
                                    {/* @ts-ignore */}
                                    <strong>Curso:</strong> {stage.estagiario.curso || "Informação indisponível"}
                                </DetailItem>
                            </DetailSection>
                            {stage?.empresa && (
                                <>
                                    <DetailHeader style={{borderColor: "#007BFF"}}>
                                        <h2 style={{color: "#007BFF"}}>Informações da Empresa</h2>
                                    </DetailHeader>
                                    <DetailSection>
                                        <DetailItem>
                                            <strong>Nome da Empresa:</strong> {stage.empresa.nome}
                                        </DetailItem>
                                        <DetailItem>
                                            <strong>Email da Empresa:</strong> {stage.empresa.email}
                                        </DetailItem>
                                    </DetailSection>
                                </>
                            )}
                        </DetailContainer>
                    )}
                </SideBySideContainer>
            )}
        </>
    );
}
