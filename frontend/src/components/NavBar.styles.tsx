"use client";
import Link from "next/link";
import styled from "styled-components";

export const NavBarHeader = styled.div`
    padding: 20px 0;
    background: #fff;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    margin-bottom: 50px;
`;

export const NavBarContainer = styled.div.attrs({
    className: "container",
})``;

export const NavBarMenuList = styled.div`
    display: flex;
    gap: 70px;
`;

export const NavBarMenuItem = styled(Link)``;
