import apiService from "@/api/ApiService";
import {Estagio} from "@/api/ApiTypes";
import {
    ConfirmButton,
    ErrorSpan,
    FormGroup,
    FormInput,
    FormLabel,
    FormTitle,
    InputsWrapper,
    LoginPageContainer,
    LoginPageForm,
    RegisterLink,
    Wrapper,
} from "@/components/styles/LoginPage.styles";
import Link from "next/link";
import {useEffect, useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {useUserContext} from "@/hooks/userContext";
import {SelectGeneric} from "@/components/Form.styles";
import {useRouter} from "next/router";

interface IFormInput {
    email: string;
    password: string;
    userType: "estagiario" | "orientador"; // Tipo de usuário
}

export default function Home() {
    const {setUser, user} = useUserContext(); // Hook para atualizar o contexto do usuário
    const [loginError, setLoginError] = useState<string | null>(null);
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: {errors},
        watch,
    } = useForm<IFormInput>();

    const onSubmit: SubmitHandler<IFormInput> = async data => {
        try {
            let user;
            if (data.userType === "estagiario") {
                user = await apiService.getEstagiarioByEmail(data.email);
            } else {
                user = await apiService.getOrientadorByEmail(data.email);
            }

            // Verifica se o usuário tem as propriedades necessárias
            if (user && user.idUsuario && user.nome) {
                const userContextData = {
                    idUsuario: user.idUsuario,
                    nome: user.nome,
                    role: data.userType,
                };
                console.log({userContextData});
                setUser(userContextData); // Atualiza o contexto com o usuário mapeado
                alert("Login realizado com sucesso!");
                console.log("Usuário logado:", user);
                router.push("/user");
            } else {
                setLoginError("Usuário ou senha inválidos.");
                console.log("Login falhou: usuário não encontrado ou dados incompletos.");
            }
        } catch (error) {
            console.error("Erro ao realizar login:", error);
            setLoginError("Erro ao realizar login. Tente novamente.");
        }
    };

    const formValues = watch();

    return (
        <LoginPageContainer>
            <form
                style={{
                    background: "#fff",
                    border: "2px solid #eaeaed",
                    borderRadius: "10px",
                    display: "flex",
                    flexDirection: "column",
                    padding: "70px",
                    gap: "30px",
                    width: "580px",
                }}
                onSubmit={handleSubmit(onSubmit)}
            >
                <FormTitle>Efetue seu Login</FormTitle>
                <InputsWrapper>
                    <FormGroup>
                        <FormLabel>Email</FormLabel>
                        <FormInput type="email" {...register("email", {required: true})} />
                        {errors.email && <ErrorSpan>Email é obrigatório</ErrorSpan>}
                    </FormGroup>
                    <FormGroup>
                        <FormLabel>Senha</FormLabel>
                        <FormInput type="password" {...register("password", {required: true})} />
                        {errors.password && <ErrorSpan>Senha é obrigatória</ErrorSpan>}
                    </FormGroup>
                    <FormGroup>
                        <FormLabel>Tipo de Usuário</FormLabel>
                        <SelectGeneric {...register("userType", {required: true})}>
                            <option value="">Selecione</option>
                            <option value="estagiario">Estagiário</option>
                            <option value="orientador">Orientador</option>
                        </SelectGeneric>
                        {errors.userType && <ErrorSpan>Tipo de usuário é obrigatório</ErrorSpan>}
                    </FormGroup>
                </InputsWrapper>
                <Wrapper>
                    <ConfirmButton type="submit">Entrar</ConfirmButton>
                    {loginError && <ErrorSpan>{loginError}</ErrorSpan>}
                    <RegisterLink href={"/register"}>Não tem conta? Cadastre-se aqui</RegisterLink>
                </Wrapper>
            </form>
        </LoginPageContainer>
    );
}
