import styled from "styled-components";

export const ConfirmButtonGeneric = styled.button.attrs({
    className: "btn",
})`
    background: #28a745;
    color: #fff;
    font-weight: 600;
    font-size: 20px;
    font-size: 20px;
    padding: 8px;
    padding: 8px;
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
