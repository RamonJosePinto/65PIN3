import styled from "styled-components";

export const UserWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 40px;
`;

export const UserProfile = styled.div`
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
    width: 100%;
    border: 1px solid #eaeaed;
`;

export const ProfileDetails = styled.div`
    text-align: center;
`;

export const DetailItem = styled.p`
    font-size: 16px;
    margin: 5px 0;
`;

export const Row = styled.div.attrs({
    className: "row",
})``;

export const ColLeft = styled.div.attrs({
    className: "col-4",
})``;

export const ColRight = styled.div.attrs({
    className: "col-8",
})``;

export const SubmittedStageItem = styled.div`
    background-color: #fff;
    padding: 15px;
    border-radius: 8px;
    border: 1px solid #eaeaed;
    margin-bottom: 10px;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
        background-color: #e6f7ff;
    }

    p {
        margin: 5px 0;
    }
`;
