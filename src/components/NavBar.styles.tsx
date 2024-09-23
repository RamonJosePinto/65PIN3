"use client";
import Link from "next/link";
import styled from "styled-components";

export const NavBarHeader = styled.div`
    padding: 20px 0;
    background: #fff;
`;

export const NavBarContainer = styled.div.attrs({
    className: "container",
})``;

export const NavBarMenuList = styled.div`
    display: flex;
    gap: 70px;
`;

export const NavBarMenuItem = styled(Link)``;
