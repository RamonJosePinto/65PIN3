import InternshipList from "@/components/InternshipList";
import mockInternships from "@/mocks/intershipList.mock.json";
import userData from "@/mocks/user.mock.json";
import {UserProfile, ProfileDetails, DetailItem, UserWrapper, Row, ColLeft, ColRight} from "@/components/styles/user/UserPage.styles";
import {useUserContext} from "@/hooks/userContext";
import {Estagio} from "@/api/ApiTypes";
import {useEffect, useState} from "react";
import apiService from "@/api/ApiService";
import {ConfirmButton} from "@/components/styles/LoginPage.styles";
import Link from "next/link";

export default function UserInternships() {
    const {user} = useUserContext(); // Obtém o usuário do contexto
    const [internships, setInternships] = useState<Estagio[]>([]);
    const [userData, setUserData] = useState<any>({});

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
            </ColLeft>

            <ColRight>
                <InternshipList internships={internships} title="Meus estágios" titleOfDisableButton="Em andamento" allowDetails={true} />
            </ColRight>
        </Row>
    );
}
