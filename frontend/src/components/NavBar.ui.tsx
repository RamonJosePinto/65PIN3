import {useUserContext} from "@/hooks/userContext";
import {NavBarContainer, NavBarHeader, NavBarMenuItem, NavBarMenuList} from "./NavBar.styles";

export default function NavBar() {
    const {user, logout} = useUserContext();

    return (
        <NavBarHeader>
            <NavBarContainer>
                <NavBarMenuList>
                    <NavBarMenuItem href={user && user != null ? "/user" : "/"}>{user && user != null ? "Perfil" : "Inicio"}</NavBarMenuItem>
                    <NavBarMenuItem href={"/reports"}>Relatórios</NavBarMenuItem>
                    <NavBarMenuItem href={"/internship/list"}>Estágios</NavBarMenuItem>
                    {user?.role === "coordenador" && <NavBarMenuItem href="/coordinator/register">Cadastrar Orientador</NavBarMenuItem>}
                    {user && (
                        // @ts-ignore
                        <NavBarMenuItem href={"/"} onClick={logout} style={{cursor: "pointer", background: "none", border: "none"}}>
                            Sair
                        </NavBarMenuItem>
                    )}
                </NavBarMenuList>
            </NavBarContainer>
        </NavBarHeader>
    );
}
