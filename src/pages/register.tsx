import {
    ColumnWrapper,
    ConfirmButton,
    ErrorSpan,
    FormGroup,
    FormInput,
    FormLabel,
    FormTitle,
    InputsWrapper,
    RegisterPageContainer,
    RegisterPageForm,
    Row,
    Wrapper,
} from "@/components/styles/RegisterPage.styles";
import {SubmitHandler, useForm} from "react-hook-form";

interface IFormInput {
    name: string;
    password: string;
    phone: number;
    email: string;
    bornDate: Date;
    registrationNumber: number;
}

export default function RegisterPage() {
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
        <RegisterPageContainer>
            <RegisterPageForm onSubmit={handleSubmit(onSubmit)}>
                <FormTitle>Efetue seu Cadastro</FormTitle>
                <InputsWrapper>
                    <Row>
                        <ColumnWrapper>
                            <FormGroup>
                                <FormLabel>Nome completo</FormLabel>
                                <FormInput type="text" {...register("name", {required: true})} />
                                {errors.name && <ErrorSpan>Nome é obrigatório</ErrorSpan>}
                            </FormGroup>
                            <FormGroup>
                                <FormLabel>Senha</FormLabel>
                                <FormInput type="password" {...register("password", {required: true})} />
                                {errors.password && <ErrorSpan>Senha é obrigatório</ErrorSpan>}
                            </FormGroup>
                            <FormGroup>
                                <FormLabel>Telefone</FormLabel>
                                <FormInput type="number" {...register("phone", {required: true})} />
                                {errors.phone && <ErrorSpan>Telefone é obrigatório</ErrorSpan>}
                            </FormGroup>
                        </ColumnWrapper>
                        <ColumnWrapper>
                            <FormGroup>
                                <FormLabel>Email acadêmico</FormLabel>
                                <FormInput type="email" {...register("email", {required: true})} />
                                {errors.email && <ErrorSpan>Email é obrigatório</ErrorSpan>}
                            </FormGroup>
                            <FormGroup>
                                <FormLabel>Data de nascimento</FormLabel>
                                <FormInput type="date" {...register("bornDate", {required: true})} />
                                {errors.bornDate && <ErrorSpan>Data de Nascimento é obrigatório</ErrorSpan>}
                            </FormGroup>
                            <FormGroup>
                                <FormLabel>Número de matricula</FormLabel>
                                <FormInput type="number" {...register("registrationNumber", {required: true})} />
                                {errors.registrationNumber && <ErrorSpan>matricula é obrigatório</ErrorSpan>}
                            </FormGroup>
                        </ColumnWrapper>
                    </Row>
                </InputsWrapper>
                <Wrapper>
                    <ConfirmButton type="submit" onClick={handleSubmit(onSubmit)}>
                        Enviar
                    </ConfirmButton>
                </Wrapper>
            </RegisterPageForm>
        </RegisterPageContainer>
    );
}
