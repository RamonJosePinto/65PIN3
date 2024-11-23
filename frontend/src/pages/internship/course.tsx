import {FormGroupGeneric, FormInputGeneric, SelectGeneric} from "@/components/Form.styles";
import {ConfirmButtonGeneric} from "@/components/styles/Button.styles";
import {Row} from "@/components/styles/Columns.styles";
import {Col6Flex, FormLabel, RegisterCursoForm, RegisterTitle} from "@/components/styles/course/CourseRegister.styles";
import {SubmitHandler, useForm} from "react-hook-form";
import {useEffect, useState} from "react";
import apiService from "@/api/ApiService";
import {Curso} from "@/api/ApiTypes"; // Tipagem para Curso
import {useSignUpContext} from "@/hooks/SignUpContext";
import {useRouter} from "next/router";
import {useUserContext} from "@/hooks/userContext";
import Head from "next/head";

// Interface para os inputs do formulário
interface IFormInput {
    courseName?: string;
    semester?: string;
    campus?: string;
    selectedCourseId?: number; // ID do curso selecionado (opcional)
}

export default function CursoCadastro() {
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<IFormInput>();

    const {companyId, setCourseId, courseId, estagioId, estagiarioId} = useSignUpContext();
    const {user} = useUserContext();
    const router = useRouter();

    const [cursos, setCursos] = useState<Curso[]>([]); // Estado para armazenar cursos existentes
    const [isNewCourse, setIsNewCourse] = useState<boolean>(true); // Controle para exibir campos de cadastro

    useEffect(() => {
        async function fetchCursos() {
            try {
                const response = await apiService.getCursos(); // Busca os cursos do banco
                setCursos(response);
            } catch (error) {
                console.error("Erro ao buscar cursos:", error);
            }
        }
        fetchCursos();
    }, []);

    const onSubmit: SubmitHandler<IFormInput> = async data => {
        try {
            let newCourseId = courseId; // Variável local para evitar dependência direta do estado

            if (isNewCourse) {
                const cursoData = {
                    nome: data.courseName!,
                    campus: data.campus!,
                };
                const newCourse = await apiService.createCurso(cursoData); // Cria um novo curso
                newCourseId = newCourse.idCurso; // Captura o ID do novo curso
                setCourseId(newCourse.idCurso); // Atualiza o estado para consistência futura
            } else if (data.selectedCourseId) {
                newCourseId = data.selectedCourseId; // Captura o curso selecionado
                setCourseId(data.selectedCourseId);
            }

            // Aguarda a vinculação do estágio usando o ID do curso atualizado
            await apiService.vincularEstagio({
                estagioId: estagioId!,
                estagiarioId: user?.idUsuario || 0,
                companyId: companyId!,
                courseId: newCourseId!,
            });

            console.log({
                estagioId,
                estagiarioId,
                companyId,
                courseId: newCourseId,
                user,
            });

            alert("Curso cadastrado ou selecionado e estágio vinculado com sucesso!");
            router.push("/user");
        } catch (error) {
            console.error("Erro ao processar curso ou vincular estágio:", error);
            alert("Erro ao processar curso ou vincular estágio. Tente novamente.");
        }
    };

    return (
        <>
            <Head>
                <title>Seleção do curso</title>
            </Head>
            <RegisterTitle>Seleção do curso</RegisterTitle>
            <RegisterCursoForm>
                <Row>
                    <Col6Flex>
                        <FormGroupGeneric>
                            <FormLabel>Selecionar curso existente</FormLabel>
                            <SelectGeneric {...register("selectedCourseId")} onChange={e => setIsNewCourse(!e.target.value)}>
                                <option value="">Cadastrar novo curso</option>
                                {cursos.map(curso => (
                                    <option key={curso.idCurso} value={curso.idCurso}>
                                        {curso.nome} - {curso.campus}
                                    </option>
                                ))}
                            </SelectGeneric>
                        </FormGroupGeneric>
                    </Col6Flex>
                </Row>

                {isNewCourse && (
                    <>
                        <Row>
                            <Col6Flex>
                                <FormGroupGeneric>
                                    <FormLabel>Nome</FormLabel>
                                    <FormInputGeneric type="text" {...register("courseName", {required: "Nome do curso é obrigatório"})} />
                                    {errors.courseName && <span>{errors.courseName.message}</span>}
                                </FormGroupGeneric>
                            </Col6Flex>

                            <Col6Flex>
                                <FormGroupGeneric>
                                    <FormLabel>Semestre atual</FormLabel>
                                    <FormInputGeneric type="text" {...register("semester", {required: "Semestre é obrigatório"})} />
                                    {errors.semester && <span>{errors.semester.message}</span>}
                                </FormGroupGeneric>
                            </Col6Flex>
                        </Row>

                        <Row>
                            <Col6Flex>
                                <FormGroupGeneric>
                                    <FormLabel>Campus</FormLabel>
                                    <FormInputGeneric type="text" {...register("campus", {required: "Campus é obrigatório"})} />
                                    {errors.campus && <span>{errors.campus.message}</span>}
                                </FormGroupGeneric>
                            </Col6Flex>
                        </Row>
                    </>
                )}

                <ConfirmButtonGeneric type="submit" onClick={handleSubmit(onSubmit)} style={{marginTop: 40, width: "30%", margin: "50px auto 0 auto"}}>
                    {isNewCourse ? "Cadastrar Curso" : "Vincular Curso"}
                </ConfirmButtonGeneric>
            </RegisterCursoForm>
        </>
    );
}
