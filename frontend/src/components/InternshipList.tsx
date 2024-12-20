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
    FilterButton,
    HeaderListContainer,
} from "@/components/styles/internship/List.styles";

import filterIcon from "@/assets/icons/filter-icon.svg";
import Image from "next/image";
import {Estagio, RelatorioFinal} from "@/api/ApiTypes";
import {formatDate} from "@/utils/DateFormat";
import {useRouter} from "next/router";
import { useUserContext } from "@/hooks/userContext";

interface InternshipListProps {
    internships: Estagio[];
    title: string;
    titleOfDisableButton?: string;
    allowDetails?: boolean;
}
export default function InternshipListComponent({internships, title, titleOfDisableButton = "Indisponível", allowDetails = false}: InternshipListProps) {
    const router = useRouter();
    const {user} = useUserContext();
    const handleCardClick = (internship: Estagio) => {
        console.log({allowDetails, internshipIdEstagio: internship.idEstagio});
        if (
            !internship?.estagiario || (allowDetails &&
            (internship?.estagiario?.idUsuario === user?.idUsuario || 
             internship?.orientador?.idUsuario === user?.idUsuario))
        ) {
            router.push(`/internship/activities/${internship.idEstagio}`);
        }
    };
    
    const getRegisterButtonText = (internship: Estagio & { relatorio?: RelatorioFinal | null }): string => {
        if (user?.role === "orientador") {
            return "Ver Detalhes";
        }
    
        if (internship.relatorio) {
            // Verifica o status do relatório e ajusta o texto
            if (internship.relatorio.status === "Aprovado") {
                return "Estágio Aprovado";
            } else if (internship.relatorio.status === "Reprovado") {
                return "Estágio Reprovado";
            } else if (internship.relatorio.status === "Pendente") {
                return "Aguardando Avaliação";
            }
        }
    
        return internship.estagiario ? titleOfDisableButton : "Inscrever-se";
    };

    return (
        <InternshipListWrapper>
            <HeaderListContainer>
                <ListTitle>{title}</ListTitle>
                <FilterButton>
                    <Image src={filterIcon} height={25} width={25} alt="Filtro" />
                </FilterButton>
            </HeaderListContainer>
            {internships.map(internship => (
                <InternshipCard key={internship.idEstagio} onClick={() => handleCardClick(internship)}>
                    <Container>
                        <ColumnWrapper>
                            <MentorLabel>
                                <Bolder>Orientador:</Bolder> {internship.orientador.nome}
                            </MentorLabel>
                            <InfoLabel>
                                <Bolder>Duração:</Bolder> {formatDate(internship.duracaoInicio)} - {formatDate(internship.duracaoFim)}
                            </InfoLabel>
                        </ColumnWrapper>
                        <ColumnWrapper>
                            <InfoLabel>
                                <Bolder>Tipo:</Bolder> {internship.tipo}
                            </InfoLabel>
                            <Status isAvailable={true}>{internship.descricao}</Status>
                        </ColumnWrapper>
                    </Container>
                    <Container>
                        {/* @ts-ignore */}
                        <RegisterButton isAvailable={!internship.estagiario}  status={internship?.relatorio?.status}>{getRegisterButtonText(internship)}</RegisterButton>
                    </Container>
                </InternshipCard>
            ))}
        </InternshipListWrapper>
    );
}
