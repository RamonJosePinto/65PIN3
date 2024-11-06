import styled from "styled-components";
import {FormGeneric, FormGroupGeneric, FormInputGeneric} from "../Form.styles";
import {ConfirmButtonGeneric} from "./Button.styles";

export const RegisterPageContainer = styled.div.attrs({
    className: "container",
})`
    display: flex;
    align-items: center;
    justify-content: center;
    height: calc(100vh - 64px);
`;

export const RegisterPageForm = styled(FormGeneric).attrs({})`
    gap: 30px;
    padding: 70px;
    width: 880px;
`;

export const InputsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

export const FormTitle = styled.h2.attrs({})`
    font-weight: 600;
    color: #363843;
    font-size: 32px;
    text-align: center;
`;

export const FormLabel = styled.label``;

export const FormGroup = styled(FormGroupGeneric)``;

export const FormInput = styled(FormInputGeneric)``;

export const ConfirmButton = styled(ConfirmButtonGeneric)`
    width: 80%;
`;

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;
`;

export const ColumnWrapper = styled.div.attrs({
    className: "col-6",
})`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

export const Row = styled.div.attrs({
    className: "row",
})``;

export const ErrorSpan = styled.span.attrs({
    className: "row",
})`
    color: red;
    display: contents;
`;
