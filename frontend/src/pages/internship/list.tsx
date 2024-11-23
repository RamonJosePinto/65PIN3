import mockInternships from "@/mocks/intershipList.mock.json";
import {
    ListTitle,
    InternshipCard,
    MentorLabel,
    InfoLabel,
    Status,
    RegisterButton,
    InternshipListWrapper,
    Bolder,
    Container,
    ColumnWrapper,
} from "@/components/styles/internship/List.styles";
import InternshipListComponent from "@/components/InternshipList";
import {useEffect, useState} from "react";
import {Estagio} from "@/api/ApiTypes";
import apiService from "@/api/ApiService";
import Head from "next/head";

export default function InternshipList() {
    const [internships, setInternships] = useState<Estagio[]>([]);

    useEffect(() => {
        async function fetchInternships() {
            try {
                const data = await apiService.getEstagios();
                setInternships(data);
            } catch (error) {
                console.error("Erro ao buscar os estágios:", error);
            }
        }
        fetchInternships();
    }, []);

    return (
        <>
            <Head>
                <title>Lista de estágios</title>
            </Head>
            <InternshipListComponent internships={internships} title="Listas de Estágios" allowDetails={true} />
        </>
    );
}
