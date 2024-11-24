import {FormGroupGeneric, FormInputGeneric, TextAreaGeneric} from "@/components/Form.styles";
import {ConfirmButtonGeneric} from "@/components/styles/Button.styles";
import {Row} from "@/components/styles/Columns.styles";
import {Col6Flex, FormLabel, RegisterActivityForm, RegisterTitle} from "@/components/styles/activities/ActivityRegister.styles";
import {SubmitHandler, useForm} from "react-hook-form";
import apiService from "@/api/ApiService";
import {useRouter} from "next/router";
import {useState} from "react";
import Head from "next/head";

// Definindo a interface para os inputs do formulário
interface IFormInput {
    date: string;
    hoursWorked: number;
    activityType: string;
    description: string;
}

export default function ActivityRegister() {
    const {
        register,
        handleSubmit,
        formState: {errors},
        reset,
    } = useForm<IFormInput>();

    const router = useRouter();
    const {estagioId} = router.query; // Pega o ID do estágio da URL
    console.log({estagioId});
    const [submitError, setSubmitError] = useState<string | null>(null);

    const onSubmit: SubmitHandler<IFormInput> = async data => {
        if (!estagioId) {
            setSubmitError("ID do estágio não encontrado.");
            return;
        }

        try {
            const postData = {
                estagio: {idEstagio: parseInt(estagioId as string, 10)},
                data: data.date,
                horasTrabalhadas: data.hoursWorked,
                descricao: data.description,
            };

            await apiService.createAtividade(postData);
            alert("Atividade cadastrada com sucesso!");
            reset();
            // Redireciona para a página de detalhes do estágio após o cadastro
            router.push(`/internship/activities/${estagioId}`);
        } catch (error) {
            console.error("Erro ao cadastrar atividade:", error);
            setSubmitError("Erro ao cadastrar atividade. Tente novamente.");
        }
    };

    return (
        <>
            <Head>
                <title>Cadastro de atividade</title>
            </Head>
            <RegisterTitle>Cadastre suas atividades</RegisterTitle>
            <RegisterActivityForm onSubmit={handleSubmit(onSubmit)}>
                <Row>
                    <Col6Flex>
                        <FormGroupGeneric>
                            <FormLabel>Data</FormLabel>
                            <FormInputGeneric type="date" {...register("date", {required: "Data é obrigatória"})} />
                            {errors.date && <span>{errors.date.message}</span>}
                        </FormGroupGeneric>

                        <FormGroupGeneric>
                            <FormLabel>Tipo da atividade</FormLabel>
                            <FormInputGeneric as="select" {...register("activityType", {required: "Tipo de atividade é obrigatório"})}>
                                <option value="Desenvolvimento do projeto">Desenvolvimento do projeto</option>
                                <option value="Reunião com a equipe">Reunião com a equipe</option>
                                <option value="Documentação">Documentação</option>
                                <option value="Outro">Outro</option>
                            </FormInputGeneric>
                            {errors.activityType && <span>{errors.activityType.message}</span>}
                        </FormGroupGeneric>

                        <FormGroupGeneric>
                            <FormLabel>Descrição</FormLabel>
                            <TextAreaGeneric {...register("description", {required: "Descrição é obrigatória"})} />
                            {errors.description && <span>{errors.description.message}</span>}
                        </FormGroupGeneric>
                    </Col6Flex>

                    <Col6Flex>
                        <FormGroupGeneric>
                            <FormLabel>Horas trabalhadas</FormLabel>
                            <FormInputGeneric type="number" {...register("hoursWorked", {required: "Horas trabalhadas são obrigatórias"})} />
                            {errors.hoursWorked && <span>{errors.hoursWorked.message}</span>}
                        </FormGroupGeneric>
                    </Col6Flex>
                </Row>
                {submitError && <span style={{color: "red"}}>{submitError}</span>}
                <ConfirmButtonGeneric type="submit" style={{marginTop: 40, width: "30%", margin: "50px auto 0 auto"}}>
                    Cadastrar
                </ConfirmButtonGeneric>
            </RegisterActivityForm>
        </>
    );
}
