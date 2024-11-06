import styled from "styled-components";

export const FormGeneric = styled.form.attrs({})`
    background: #fff;
    border: 2px solid #eaeaed;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    padding: 70px;
`;

export const FormGroupGeneric = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    color: #363843;
`;

export const FormInputGeneric = styled.input`
    border: 1px solid #eaeaed;
    border-radius: 5px;
    padding: 6px 10px;
`;

export const TextAreaGeneric = styled.textarea`
    border: 1px solid #eaeaed;
    border-radius: 5px;
    min-height: 100px;
    padding: 10px;
    color: #363636;
`;

export const SelectGeneric = styled.select`
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #eaeaed;
`;
