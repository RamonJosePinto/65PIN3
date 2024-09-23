import {NavBarContainer, NavBarHeader, NavBarMenuItem, NavBarMenuList} from "./NavBar.styles";

export default function NavBar() {
    return (
        <NavBarHeader>
            <NavBarContainer>
                <NavBarMenuList>
                    <NavBarMenuItem href={"/"}>Inicio</NavBarMenuItem>
                    <NavBarMenuItem href={"/"}>Relatórios</NavBarMenuItem>
                    <NavBarMenuItem href={"/"}>Estágios</NavBarMenuItem>
                    <NavBarMenuItem href={"/"}>Vagas</NavBarMenuItem>
                </NavBarMenuList>
            </NavBarContainer>
        </NavBarHeader>
    );
}
