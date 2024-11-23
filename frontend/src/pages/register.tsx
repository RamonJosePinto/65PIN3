import apiService from "@/api/ApiService";
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
import Head from "next/head";
import {useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import * as yup from "yup";

const schema = yup.object().shape({
    name: yup.string().required("Nome é obrigatório"),
    password: yup.string().required("Senha é obrigatória"),
    phone: yup
        .string()
        .matches(/^\d+$/, "O telefone deve conter apenas números")
        .required("Telefone é obrigatório")
        .transform(value => (value ? parseInt(value, 10) : undefined)),
    email: yup.string().email("Email inválido").required("Email é obrigatório"),
    bornDate: yup.date().required("Data de nascimento é obrigatória"),
    registrationNumber: yup.number().typeError("Número de matrícula deve ser numérico").required("Matrícula é obrigatória"),
});

interface IFormInput {
    name: string;
    password: string;
    phone: number;
    email: string;
    bornDate: string; // Tipo string para compatibilidade com input de data
    registrationNumber: number;
}

export default function RegisterPage() {
    const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);
    const [submitError, setSubmitError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<IFormInput>({
        // resolver: yupResolver(schema), // Adicionando o resolver Yup ao useForm
    });

    const onSubmit: SubmitHandler<IFormInput> = async data => {
        try {
            // Criar objeto para enviar para a API
            const newEstagiario = {
                nome: data.name,
                senha: data.password,
                telefone: Number(data.phone),
                email: data.email,
                dataNascimento: data.bornDate,
                numeroMatricula: data.registrationNumber,
                curso: null, // Curso nulo conforme solicitado
            };

            // Chamar o apiService para criar o estagiário
            await apiService.createEstagiario(newEstagiario);
            setSubmitSuccess("Estagiário cadastrado com sucesso!");
            console.log("Estagiário cadastrado:", newEstagiario);
        } catch (error) {
            console.error("Erro ao cadastrar estagiário:", error);
            setSubmitError("Erro ao cadastrar. Tente novamente.");
        }
    };

    return (
        <RegisterPageContainer>
             <Head>
                <title>Cadastro de usuário</title>
            </Head>
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
                                {errors.password && <ErrorSpan>Senha é obrigatória</ErrorSpan>}
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
                                {errors.bornDate && <ErrorSpan>Data de nascimento é obrigatória</ErrorSpan>}
                            </FormGroup>
                            <FormGroup>
                                <FormLabel>Número de matrícula</FormLabel>
                                <FormInput type="number" {...register("registrationNumber", {required: true})} />
                                {errors.registrationNumber && <ErrorSpan>Matrícula é obrigatória</ErrorSpan>}
                            </FormGroup>
                        </ColumnWrapper>
                    </Row>
                </InputsWrapper>
                <Wrapper>
                    <ConfirmButton type="submit">Enviar</ConfirmButton>
                    {submitSuccess && <p style={{color: "green"}}>{submitSuccess}</p>}
                    {submitError && <ErrorSpan>{submitError}</ErrorSpan>}
                </Wrapper>
            </RegisterPageForm>
        </RegisterPageContainer>
    );
}
