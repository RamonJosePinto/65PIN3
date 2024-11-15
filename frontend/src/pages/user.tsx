import InternshipList from "@/components/InternshipList";
import mockInternships from "@/mocks/intershipList.mock.json";
import userData from "@/mocks/user.mock.json";
import {UserProfile, ProfileDetails, DetailItem, UserWrapper, Row, ColLeft, ColRight, SubmittedStageItem, StatusText} from "@/components/styles/user/UserPage.styles";
import {useUserContext} from "@/hooks/userContext";
import {Estagio} from "@/api/ApiTypes";
import {useEffect, useState} from "react";
import apiService from "@/api/ApiService";
import {ConfirmButton} from "@/components/styles/LoginPage.styles";
import Link from "next/link";
import {useRouter} from "next/router";

export default function UserInternships() {
    const {user} = useUserContext(); // Obtém o usuário do contexto
    const [internships, setInternships] = useState<Estagio[]>([]);
    const [userData, setUserData] = useState<any>({});
    const [submittedStages, setSubmittedStages] = useState<Estagio[]>([]);
    const router = useRouter();

    console.log({submittedStages});

    useEffect(() => {
        if (user) {
            const fetchInternships = async () => {
                try {
                    let response;
                    if (user.role === "estagiario") {
                        response = await apiService.getEstagiosByEstagiario(user.idUsuario);
                    } else if (user.role === "orientador") {
                        response = await apiService.getEstagiosByOrientador(user.idUsuario);
                    }
                    if (response) {
                        setInternships(response);
                        setUserData({
                            name: user.nome,
                            role: user.role,
                            internshipsOriented: user.role === "orientador" ? response.length : 0,
                            openInternships: response.filter(estagio => !estagio.estagiario).length,
                            ongoingInternships: response.filter(estagio => estagio.estagiario).length,
                        });
                    }
                } catch (error) {
                    console.error("Erro ao buscar estágios:", error);
                }
            };

            fetchInternships();
        }
    }, [user]);

    useEffect(() => {
        if (user?.role === "orientador") {
            apiService.getSubmittedStages().then(setSubmittedStages).catch(console.error);
        } else {
            apiService.getRelatorioFinalByEstagiarioId(user?.idUsuario).then(setSubmittedStages).catch(console.error)
        }
    }, [user]);

    const handleStageReview = (idRelatorioFinal: number, idEstagio: number) => {
        if(user?.role === "orientador"){
            router.push(`/internship/review/${idRelatorioFinal}?stageId=${idEstagio}`); // Passa ambos os IDs
        } else {
            router.push(`/internship/activities/${idEstagio}`)
        }
    };

    return (
        <Row>
            <ColLeft>
                <UserWrapper>
                    <UserProfile>
                        <ProfileDetails>
                            <h3>{userData.name}</h3>
                            <p>{userData.role}</p>
                            {user?.role === "orientador" && (
                                <DetailItem>
                                    <Link href="/internship/register">
                                        <ConfirmButton>Cadastrar Estágio</ConfirmButton>
                                    </Link>
                                </DetailItem>
                            )}
                            {user?.role === "orientador" ? <DetailItem>Estágios orientados: {userData.internshipsOriented}</DetailItem> : null}
                            <DetailItem>Estágios em aberto: {userData.openInternships}</DetailItem>
                            <DetailItem>Estágios em andamento: {userData.ongoingInternships}</DetailItem>
                        </ProfileDetails>
                    </UserProfile>
                </UserWrapper>
                <div>
                    {user?.role === "orientador" && (
                        <section>
                            <h3>Estágios Submetidos para Avaliação</h3>
                            {submittedStages.length ? (
                                submittedStages.map(stage => (
                                    <SubmittedStageItem key={stage.idEstagio} onClick={() => handleStageReview(stage?.idRelatorioFinal, stage.estagio.idEstagio)}>
                                        <p>
                                            <strong>Estágio:</strong> {stage?.estagio?.descricao}
                                        </p>
                                        <p>
                                            <strong>Estagiário:</strong> {stage?.estagio?.estagiario?.nome}
                                        </p>
                                    </SubmittedStageItem>
                                ))
                            ) : (
                                <p>Nenhum estágio submetido no momento.</p>
                            )}
                        </section>
                    )}
                    {user?.role === "estagiario" && (
                        <section>
                            <h3>Estágios Submetidos e Avaliados</h3>
                            {submittedStages.length ? (
                                submittedStages.map(stage => {
                                    return (
                                    <SubmittedStageItem key={stage.idEstagio} onClick={() => handleStageReview(stage?.idRelatorioFinal, stage.estagio.idEstagio)}>
                                        <p>
                                            <strong>Estágio:</strong> {stage?.estagio?.descricao}
                                        </p>
                                        <p>
                                            <strong>Estagiário:</strong> {stage?.estagio?.estagiario?.nome}
                                        </p>
                                        <StatusText status={stage?.status}>
                                            <strong>Status:</strong> {stage?.status}
                                        </StatusText>
                                    </SubmittedStageItem>
                                )})
                            ) : (
                                <p>Nenhum estágio submetido no momento.</p>
                            )}
                        </section>
                    )}
                </div>
            </ColLeft>

            <ColRight>
                <InternshipList internships={internships} title="Meus estágios" titleOfDisableButton="Em andamento" allowDetails={true} />
            </ColRight>
        </Row>
    );
}
