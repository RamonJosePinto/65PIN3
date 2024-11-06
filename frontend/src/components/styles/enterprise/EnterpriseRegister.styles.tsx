import {FormGeneric} from "@/components/Form.styles";
import styled from "styled-components";
import {Col6} from "../Columns.styles";

export const RegisterTitle = styled.h2`
    color: #363843;
    margin-bottom: 50px;
`;

export const RegisterEmpresaForm = styled(FormGeneric)`
    width: 100%;
    margin: 0 auto;
`;

export const Line = styled.div`
    width: 100%;
    height: 1px;
    border: 1px solid #eaeaed;
    margin: 30px 0px 20px 0;
`;

export const FormLabel = styled.label``;

export const Col6Flex = styled(Col6)`
    display: flex;
    flex-direction: column;
    gap: 30px;
    padding: 0 40px;
    justify-content: space-between;
`;
