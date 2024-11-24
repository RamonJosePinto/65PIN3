import apiService from "@/api/ApiService";
import {useForm, SubmitHandler} from "react-hook-form";
import {useState} from "react";

import {RegisterTitle, RegisterCursoForm, FormLabel, Col6Flex} from "@/components/styles/course/CourseRegister.styles";
import CursoCadastro from "@/components/CoordenadorCursoCadastro";
import {FormGroupGeneric, FormInputGeneric} from "@/components/Form.styles";
import {Row} from "@/components/styles/Columns.styles";
import {Line} from "@/components/styles/enterprise/EnterpriseRegister.styles";
import {ConfirmButtonGeneric} from "@/components/styles/Button.styles";
import Head from "next/head";

interface OrientadorFormData {
    nome: string;
    email: string;
    senha: string;
    telefone: string;
    dataNascimento: string;
    especializacao: string;
    cursoId?: number;
}

export default function OrientadorCadastro() {
    const {register, handleSubmit} = useForm<OrientadorFormData>();
    const [cursoId, setCursoId] = useState<number | null>(null);

    const onSubmit: SubmitHandler<OrientadorFormData> = async data => {
        if (!cursoId) {
            alert("Selecione ou cadastre um curso antes de continuar.");
            return;
        }

        try {
            const orientadorData = {...data, 
                curso: {idCurso: cursoId}
            };
            await apiService.registerOrientador(orientadorData);
            alert("Orientador cadastrado com sucesso!");
        } catch (error) {
            console.error("Erro ao cadastrar orientador:", error);
            alert("Erro ao cadastrar orientador. Tente novamente.");
        }
    };

    return (
        <div>
            <Head>
            <title>Cadastro de orientador</title>
            </Head>
            <RegisterTitle>Cadastrar Orientador</RegisterTitle>
            <RegisterCursoForm onSubmit={handleSubmit(onSubmit)}>
                <Row>
                    <Col6Flex>
                        <FormGroupGeneric>
                            <FormLabel htmlFor="nome">Nome</FormLabel>
                            <FormInputGeneric id="nome" {...register("nome", {required: "Nome é obrigatório"})} />
                        </FormGroupGeneric>
                        <FormGroupGeneric>
                            <FormLabel htmlFor="email">Email</FormLabel>
                            <FormInputGeneric id="email" type="email" {...register("email", {required: "Email é obrigatório"})} />
                        </FormGroupGeneric>
                    </Col6Flex>

                    <Col6Flex>
                        <FormGroupGeneric>
                            <FormLabel htmlFor="senha">Senha</FormLabel>
                            <FormInputGeneric id="senha" type="password" {...register("senha", {required: "Senha é obrigatória"})} />
                        </FormGroupGeneric>
                        <FormGroupGeneric>
                            <FormLabel htmlFor="telefone">Telefone</FormLabel>
                            <FormInputGeneric id="telefone" type="text" {...register("telefone", {required: "Telefone é obrigatório"})} />
                        </FormGroupGeneric>
                    </Col6Flex>

                    <Col6Flex style={{marginTop: 30}}>
                        <FormGroupGeneric>
                            <FormLabel htmlFor="dataNascimento">Data de Nascimento</FormLabel>
                            <FormInputGeneric id="dataNascimento" type="date" {...register("dataNascimento", {required: "Data de nascimento é obrigatória"})} />
                        </FormGroupGeneric>
                    </Col6Flex>
                    <Col6Flex style={{marginTop: 30}}>
                        <FormGroupGeneric>
                            <FormLabel htmlFor="especializacao">Especialização</FormLabel>
                            <FormInputGeneric id="especializacao" type="text" {...register("especializacao", {required: "Especialização é obrigatória"})} />
                        </FormGroupGeneric>
                    </Col6Flex>
                    <Line />
                    <CursoCadastro onCourseSelect={setCursoId} />
                    <Line />
                    <div style={{textAlign: "center"}}>
                        <ConfirmButtonGeneric style={{width: "100%"}} type="submit">
                            Cadastrar
                        </ConfirmButtonGeneric>
                    </div>
                </Row>
            </RegisterCursoForm>
        </div>
    );
}
