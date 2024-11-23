import styled from "styled-components";

export const InternshipListWrapper = styled.div`
    padding: 20px;
`;

export const ListTitle = styled.h2`
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
    color: #363843;
`;

export const InternshipCard = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    border: 1px solid #eaeaed;
    padding: 20px;
    margin-bottom: 20px;
    border-radius: 10px;
    color: #363843;
    cursor: pointer;
    &:hover{
        background-color: #e6f7ff;
    }
`;

export const Bolder = styled.b``;

export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 80px;
`;

export const ColumnWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
`;

export const MentorLabel = styled.p`
    margin: 0;
    font-size: 18px;
`;

export const InfoLabel = styled.p`
    margin: 0;
    font-size: 18px;
`;

interface StatusProps {
    isAvailable: boolean;
}

export const Status = styled.p<StatusProps>`
    font-weight: bold;
    color: ${props => (props.isAvailable ? "#28A745" : "#A72828")};
    margin: 0;
    font-size: 18px;
`;

interface ButtonProps {
    isAvailable: boolean;
    status?: string; 
}

export const RegisterButton = styled.button<ButtonProps>`
    background-color: ${props => {
        switch (props.status) {
            case "Aprovado":
                return "#28A745"; // Verde
            case "Reprovado":
                return "#DC3545"; // Vermelho
            case "Em andamento":
                return "#17A2B8"; // Azul claro
            case "Indisponível":
                return "#DC3545"; // Vermelho
            case "Inscrever-se":
                return "#28A745"; // Verde
            default:
                return props.isAvailable ? "#28A745" : "#BFBFBF"; // Cinza padrão
        }
    }};
    width: 200px;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: ${props => (props.isAvailable ? "pointer" : "not-allowed")};
`;

export const FilterButton = styled.button`
    background: #fff;
    width: 50px;
    height: 50px;
    border-radius: 5px;
    border: 1px solid #eaeaed;
    position: relative;
    padding: 10px;
`;

export const HeaderListContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
`;
