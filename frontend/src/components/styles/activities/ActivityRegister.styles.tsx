import {FormGeneric} from "@/components/Form.styles";
import styled from "styled-components";
import {Col6} from "../Columns.styles";

export const RegisterTitle = styled.h2`
    color: #363843;
    margin-bottom: 50px;
`;

export const RegisterActivityForm = styled(FormGeneric)`
    width: 100%;
    margin: 0 auto;
`;

export const FormLabel = styled.label``;

export const Col6Flex = styled(Col6)`
    display: flex;
    flex-direction: column;
    gap: 30px;
    padding: 0 40px;
    justify-content: space-between;
`;
