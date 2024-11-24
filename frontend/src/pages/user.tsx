import InternshipList from "@/components/InternshipList";
import mockInternships from "@/mocks/intershipList.mock.json";
import userData from "@/mocks/user.mock.json";
import {UserProfile, ProfileDetails, DetailItem, UserWrapper, Row, ColLeft, ColRight, SubmittedStageItem, StatusText} from "@/components/styles/user/UserPage.styles";
import {useUserContext} from "@/hooks/userContext";
import {Estagio, RelatorioFinal} from "@/api/ApiTypes";
import {useEffect, useState} from "react";
import apiService from "@/api/ApiService";
import {ConfirmButton} from "@/components/styles/LoginPage.styles";
import Link from "next/link";
import {useRouter} from "next/router";
import userProfileImage from "@/assets/images/user-profile.png";
import Image from "next/image";
import Head from "next/head";

export default function UserInternships() {
    const {user} = useUserContext(); // Obtém o usuário do contexto
    const [internships, setInternships] = useState<Estagio[]>([]);
    const [userData, setUserData] = useState<any>({});
    const [submittedStages, setSubmittedStages] = useState<RelatorioFinal[]>([]);
    const router = useRouter();

    console.log({submittedStages});

    useEffect(() => {
        if (user) {
            setUserData({
                name: user.nome,
                role: user.role,
                internshipsOriented: 0, // Será atualizado dentro do response se necessário
                openInternships: 0, // Será atualizado dentro do response se necessário
                ongoingInternships: 0, // Será atualizado dentro do response se necessário
            });
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
                        // setUserData({
                        //     name: user.nome,
                        //     role: user.role,
                        //     internshipsOriented: user.role === "orientador" ? response.length : 0,
                        //     openInternships: response.filter(estagio => !estagio.estagiario).length,
                        //     ongoingInternships: response.filter(estagio => estagio.estagiario).length,
                        // });
                        setUserData((prev: any) => ({
                            ...prev,
                            internshipsOriented: user.role === "orientador" ? response.length : 0,
                            openInternships: response.filter((estagio: any) => !estagio.estagiario).length,
                            ongoingInternships: response.filter((estagio: any) => estagio.estagiario).length,
                        }));
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
            apiService
                .getSubmittedStagesByOrientador(user.idUsuario)
                .then(data => setSubmittedStages(Array.isArray(data) ? data : []))
                .catch(console.error);
        } else {
            apiService
                // @ts-ignore
                .getRelatorioFinalByEstagiarioId(user?.idUsuario)
                .then(data => setSubmittedStages(Array.isArray(data) ? data : []))
                .catch(console.error);
        }
    }, [user]);

    const mapReportsToStages = (stages: Estagio[], reports: RelatorioFinal[]) => {
        const reportMap = new Map(reports.map(report => [report.estagio.idEstagio, report]));
        return stages.map(stage => ({
            ...stage,
            relatorio: reportMap.get(stage.idEstagio) || null, // Adiciona o relatório correspondente ou null
        }));
    };

    const stagesWithReports = mapReportsToStages(internships, submittedStages);

    console.log({stagesWithReports});

    const handleStageReview = (idRelatorioFinal: number, idEstagio: number) => {
        if (user?.role === "orientador") {
            router.push(`/internship/review/${idRelatorioFinal}?stageId=${idEstagio}`); // Passa ambos os IDs
        } else {
            router.push(`/internship/activities/${idEstagio}`);
        }
    };

    const formatUserRole = (role: string): string => {
        switch (role) {
            case "estagiario":
                return "Estagiário";
            case "orientador":
                return "Orientador";
            default:
                return role?.charAt(0)?.toUpperCase() + role?.slice(1); // Fallback para outros tipos
        }
    };

    const getUserMetrics = () => {
        // Estágios em aberto: sem estagiário vinculado
        const openInternships = stagesWithReports.filter(stage => !stage.estagiario).length;

        // Estágios em andamento: com estagiário vinculado, sem relatório final aprovado/reprovado
        const ongoingInternships = stagesWithReports.filter(
            stage => stage.estagiario && (!stage.relatorio || (stage.relatorio.status !== "Aprovado" && stage.relatorio.status !== "Reprovado"))
        ).length;

        // Estágios aprovados: relatório com status "Aprovado"
        const approvedInternships = stagesWithReports.filter(stage => stage.relatorio?.status === "Aprovado").length;

        // Estágios reprovados: relatório com status "Reprovado"
        const rejectedInternships = stagesWithReports.filter(stage => stage.relatorio?.status === "Reprovado").length;

        // Estágios orientados: todos os estágios vinculados ao orientador
        const internshipsOriented = stagesWithReports.length;

        return {
            openInternships,
            ongoingInternships,
            approvedInternships,
            rejectedInternships,
            internshipsOriented,
        };
    };

    // Calcula as métricas
    const metrics = getUserMetrics();

    return (
        <Row>
            <Head>
                <title>Perfil do usuário</title>
            </Head>
            <ColLeft>
                <UserWrapper>
                    <UserProfile>
                        <ProfileDetails>
                            <Image src={userProfileImage} alt="Foto do Usuário" width={100} height={100} style={{borderRadius: "50%"}} />
                            <h3>{user?.nome}</h3>
                            {/* @ts-ignore */}
                            <p>{formatUserRole(user?.role)}</p>
                            {user?.role === "orientador" && (
                                <DetailItem>
                                    <Link href="/internship/register">
                                        <ConfirmButton>Cadastrar Estágio</ConfirmButton>
                                    </Link>
                                </DetailItem>
                            )}
                            {user?.role === "orientador" && <DetailItem>Estágios orientados: {metrics.internshipsOriented}</DetailItem>}
                            <DetailItem>Estágios em aberto: {metrics.openInternships}</DetailItem>
                            {user?.role === "estagiario" && <DetailItem>Estágios em andamento: {metrics.ongoingInternships}</DetailItem>}
                            {user?.role === "estagiario" && <DetailItem>Estágios aprovados: {metrics.approvedInternships}</DetailItem>}
                        </ProfileDetails>
                    </UserProfile>
                </UserWrapper>
                <div>
                    {user?.role === "orientador" && (
                        <section>
                            <h3>Estágios Submetidos para Avaliação</h3>
                            {submittedStages.length ? (
                                submittedStages.map(stage => (
                                    <SubmittedStageItem key={stage.estagio.idEstagio} onClick={() => handleStageReview(stage?.idRelatorioFinal, stage.estagio.idEstagio)}>
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
                                ))
                            ) : (
                                <SubmittedStageItem>
                                    {" "}
                                    <p>Nenhum estágio submetido no momento.</p>
                                </SubmittedStageItem>
                            )}
                        </section>
                    )}
                    {user?.role === "estagiario" && (
                        <section>
                            <h3>Estágios Submetidos e Avaliados</h3>
                            {submittedStages.length ? (
                                submittedStages.map(stage => {
                                    return (
                                        <SubmittedStageItem key={stage.estagio.idEstagio} onClick={() => handleStageReview(stage?.idRelatorioFinal, stage.estagio.idEstagio)}>
                                            <p>
                                                <strong>Estágio:</strong> {stage?.estagio?.descricao}
                                            </p>
                                            <p>
                                                <strong>Descrição:</strong> {stage?.estagio?.descricao}
                                            </p>
                                            <StatusText status={stage?.status}>
                                                <strong>Status:</strong> {stage?.status}
                                            </StatusText>
                                        </SubmittedStageItem>
                                    );
                                })
                            ) : (
                                <SubmittedStageItem>
                                    {" "}
                                    <p>Nenhum estágio submetido no momento.</p>
                                </SubmittedStageItem>
                            )}
                        </section>
                    )}
                </div>
            </ColLeft>

            <ColRight>
                {internships && internships.length > 0 ? (
                    <InternshipList internships={stagesWithReports} title="Meus estágios" titleOfDisableButton="Em andamento" allowDetails={true} />
                ) : (
                    <SubmittedStageItem>Nenhum estágio iniciado no momento</SubmittedStageItem>
                )}
            </ColRight>
        </Row>
    );
}
