import styled from "styled-components";

export const DetailContainer = styled.div`
    padding: 50px;
    background: #ffffff;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const DetailHeader = styled.div`
    border-bottom: 2px solid #eaeaed;
    padding-bottom: 20px;
    margin-bottom: 30px;

    h1 {
        color: #363843;
        font-size: 32px;
    }
`;

export const DetailSection = styled.div`
    margin-bottom: 40px;

    h2 {
        color: #363843;
        font-size: 24px;
        margin-bottom: 20px;
    }
`;

export const DetailItem = styled.p`
    font-size: 16px;
    color: #5f6368;
    margin-bottom: 10px;
`;

export const ButtonWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
    gap: 20px;
`;

export const RegisterActivityButton = styled.button`
    background-color: #4caf50;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #45a049;
    }
`;

const ProgressBarWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 20px 0;
`;

const ProgressBarContainer = styled.div`
    width: 100%;
    background-color: #e0e0e0;
    border-radius: 10px;
    overflow: hidden;
    height: 20px;
`;

const ProgressBarFill = styled.div<{percentage: number}>`
    height: 100%;
    background-color: ${props => (props.percentage >= 100 ? "#4caf50" : "#2196f3")};
    width: ${props => `${props.percentage}%`};
    transition: width 0.3s ease-in-out;
`;

const ProgressText = styled.div`
    margin-top: 5px;
    font-size: 14px;
    color: #333;
`;

export const ProgressBar = ({current, total}: {current: number; total: number}) => {
    const percentage = Math.min((current / total) * 100, 100); // Limita a 100%
    return (
        <ProgressBarWrapper>
            <ProgressBarContainer>
                <ProgressBarFill percentage={percentage} />
            </ProgressBarContainer>
            <ProgressText>
                {current} / {total} horas ({Math.round(percentage)}%)
            </ProgressText>
        </ProgressBarWrapper>
    );
};
