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
import {SubmitHandler, useForm} from "react-hook-form";

interface IFormInput {
    email: string;
    password: string;
}

export default function Home() {
    const {
        register,
        handleSubmit,
        formState: {errors},
        watch,
    } = useForm<IFormInput>();

    const onSubmit: SubmitHandler<IFormInput> = data => {
        console.log(data);
    };

    const formValues = watch();

    console.log(formValues);

    return (
        <LoginPageContainer>
            <LoginPageForm onSubmit={handleSubmit(onSubmit)}>
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
                        {errors.password && <ErrorSpan>Senha é obrigatório</ErrorSpan>}
                    </FormGroup>
                </InputsWrapper>
                <Wrapper>
                    <ConfirmButton type="submit" onClick={handleSubmit(onSubmit)}>
                        Entrar
                    </ConfirmButton>
                    <RegisterLink href={"/register"}>Não tem conta? cadastra-se aqui</RegisterLink>
                </Wrapper>
            </LoginPageForm>
        </LoginPageContainer>
    );
}
