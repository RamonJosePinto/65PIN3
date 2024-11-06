import styled from "styled-components";

export default function Layout({children}: {children: React.ReactNode}) {
    return <Container>{children}</Container>;
}

const Container = styled.div.attrs({
    className: "container",
})``;
