import Link from "next/link";
import styled from "styled-components";

export const RegisterPageContainer = styled.div.attrs({
    className: "container",
})`
    display: flex;
    align-items: center;
    justify-content: center;
    height: calc(100vh - 64px);
`;

export const RegisterPageForm = styled.div.attrs({})`
    background: #fff;
    border: 2px solid #eaeaed;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
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

export const FormGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    color: #363843;
`;

export const FormInput = styled.input`
    border: 1px solid #eaeaed;
    border-radius: 5px;
    padding: 6px 10px;
`;

export const ConfirmButton = styled.button.attrs({
    className: "btn",
})`
    background: #28a745;
    color: #fff;
    width: 80%;
    padding: 8px;
    font-size: 20px;
    font-weight: 600;
    &:hover {
        background: #2e9345;
        color: #fff;
    }

    &:focus-visible,
    &:target,
    &:focus {
        background: #28a745 !important;
        color: #fff !important;
    }
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
