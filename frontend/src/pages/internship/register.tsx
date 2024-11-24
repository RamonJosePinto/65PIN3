import {FormGroupGeneric, FormInputGeneric, TextAreaGeneric} from "@/components/Form.styles";
import {ConfirmButtonGeneric} from "@/components/styles/Button.styles";
import {Row} from "@/components/styles/Columns.styles";
import {Col6Flex, FormLabel, RegisterInternshipForm, RegisterTitle} from "@/components/styles/internship/Register.styles";
import {SubmitHandler, useForm} from "react-hook-form";
import apiService from "@/api/ApiService";
import {useUserContext} from "@/hooks/userContext";
import {PostEstagio} from "@/api/ApiTypes";
import {useRouter} from "next/router";
import Head from "next/head";

interface IFormInput {
    durationStart: string;
    durationEnd: string;
    typeOfInternship: string;
    description: string;
    requirements: string;
    // observations: string;
    empresaId?: number; // ID da empresa é opcional
}

export default function InternshipRegister() {
    const {user} = useUserContext(); // Pega o usuário do contexto
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<IFormInput>();

    const onSubmit: SubmitHandler<IFormInput> = async data => {
        try {
            if (!user || user.role !== "orientador") {
                alert("Apenas orientadores podem cadastrar estágios.");
                return;
            }

            const postData: PostEstagio = {
                duracaoInicio: data.durationStart,
                duracaoFim: data.durationEnd,
                tipo: data.typeOfInternship,
                descricao: data.description,
                requisitos: data.requirements,
                orientador: {idUsuario: user.idUsuario},
                // @ts-ignore
                empresa: data.empresaId ? {id: data.empresaId} : null, // Agora pode ser undefined
                // @ts-ignore
                estagiario: null, // Pode ser omitido ou passado como undefined
            };

            const response = await apiService.createEstagio(postData);
            console.log("Estágio cadastrado com sucesso:", response);
            alert("Estágio cadastrado com sucesso!");
            router.push("/user");
        } catch (error) {
            console.error("Erro ao cadastrar estágio:", error);
            alert("Erro ao cadastrar estágio. Tente novamente.");
        }
    };

    return (
        <>
            <Head>
                <title>Cadastro de estágio</title>
            </Head>
            <RegisterTitle>Cadastro de estágio</RegisterTitle>
            <RegisterInternshipForm onSubmit={handleSubmit(onSubmit)}>
                <Row>
                    <Col6Flex>
                        <FormGroupGeneric>
                            <FormLabel>Início da Duração</FormLabel>
                            <FormInputGeneric type="date" {...register("durationStart", {required: "Data de início é obrigatória"})} />
                            {errors.durationStart && <span>{errors.durationStart.message}</span>}
                        </FormGroupGeneric>
                        {/* <FormGroupGeneric>
                            <FormLabel>Observações</FormLabel>
                            <TextAreaGeneric {...register("observations")} />
                        </FormGroupGeneric> */}
                        <FormGroupGeneric>
                            <FormLabel>Descrição do Estágio</FormLabel>
                            <TextAreaGeneric {...register("description", {required: "Descrição é obrigatória"})} />
                            {errors.description && <span>{errors.description.message}</span>}
                        </FormGroupGeneric>
                    </Col6Flex>
                    <Col6Flex>
                        <FormGroupGeneric>
                            <FormLabel>Fim da Duração</FormLabel>
                            <FormInputGeneric type="date" {...register("durationEnd", {required: "Data de término é obrigatória"})} />
                            {errors.durationEnd && <span>{errors.durationEnd.message}</span>}
                        </FormGroupGeneric>
                        <FormGroupGeneric>
                            <FormLabel>Tipo de Estágio</FormLabel>
                            <FormInputGeneric type="text" {...register("typeOfInternship", {required: "Tipo de estágio é obrigatório"})} />
                            {errors.typeOfInternship && <span>{errors.typeOfInternship.message}</span>}
                        </FormGroupGeneric>
                        <FormGroupGeneric>
                            <FormLabel>Requisitos</FormLabel>
                            <TextAreaGeneric {...register("requirements", {required: "Requisitos são obrigatórios"})} />
                            {errors.requirements && <span>{errors.requirements.message}</span>}
                        </FormGroupGeneric>
                        {/* <FormGroupGeneric>
                            <FormLabel>Empresa (ID)</FormLabel>
                            <FormInputGeneric type="number" {...register("empresaId")} />
                        </FormGroupGeneric> */}
                    </Col6Flex>
                </Row>
                <ConfirmButtonGeneric type="submit" style={{marginTop: 80, width: "40%", margin: "50px auto 0 auto"}}>
                    Enviar
                </ConfirmButtonGeneric>
            </RegisterInternshipForm>
        </>
    );
}
