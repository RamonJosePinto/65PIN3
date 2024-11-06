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
import {Estagio} from "@/api/ApiTypes";
import {formatDate} from "@/utils/DateFormat";
import {useRouter} from "next/router";

interface InternshipListProps {
    internships: Estagio[];
    title: string;
    titleOfDisableButton?: string;
    allowDetails?: boolean;
}
export default function InternshipListComponent({internships, title, titleOfDisableButton = "Indisponível", allowDetails = false}: InternshipListProps) {
    const router = useRouter();

    const handleCardClick = (internshipId: number) => {
        console.log("teste")
        if (allowDetails) {
            router.push(`/internship/activities/${internshipId}`);
        }
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
                <InternshipCard key={internship.idEstagio} onClick={() => handleCardClick(internship.idEstagio)}>
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
                        <RegisterButton isAvailable={!internship.estagiario}>{internship.estagiario ? titleOfDisableButton : "Inscrever-se"}</RegisterButton>
                    </Container>
                </InternshipCard>
            ))}
        </InternshipListWrapper>
    );
}
