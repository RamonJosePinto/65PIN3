import {useUserContext} from "@/hooks/userContext";
import {NavBarContainer, NavBarHeader, NavBarMenuItem, NavBarMenuList} from "./NavBar.styles";

export default function NavBar() {
    const {user} = useUserContext();

    return (
        <NavBarHeader>
            <NavBarContainer>
                <NavBarMenuList>
                    <NavBarMenuItem href={user && user != null ? "/user" : "/"}>{user && user != null ? "Perfil" : "Inicio"}</NavBarMenuItem>
                    <NavBarMenuItem href={"/"}>Relatórios</NavBarMenuItem>
                    <NavBarMenuItem href={"/internship/list"}>Estágios</NavBarMenuItem>
                    <NavBarMenuItem href={"/"}>Vagas</NavBarMenuItem>
                </NavBarMenuList>
            </NavBarContainer>
        </NavBarHeader>
    );
}
