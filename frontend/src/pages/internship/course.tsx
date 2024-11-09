import {FormGroupGeneric, FormInputGeneric} from "@/components/Form.styles";
import {ConfirmButtonGeneric} from "@/components/styles/Button.styles";
import {Row} from "@/components/styles/Columns.styles";
import {Col6Flex, FormLabel, RegisterCursoForm, RegisterTitle} from "@/components/styles/course/CourseRegister.styles";
import {SubmitHandler, useForm} from "react-hook-form";
import {useEffect, useState} from "react";
import apiService from "@/api/ApiService";
import {Curso} from "@/api/ApiTypes"; // Tipagem para Curso

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
            if (isNewCourse) {
                const cursoData = {
                    nome: data.courseName!,
                    campus: data.campus!,
                };
                await apiService.createCurso(cursoData); // Cria um novo curso
            } else if (data.selectedCourseId) {
                // Vincula o curso selecionado
                await apiService.vincularEstagiarioAoCurso(data.selectedCourseId);
            }
            alert("Curso cadastrado ou selecionado com sucesso!");
        } catch (error) {
            console.error("Erro ao processar curso:", error);
            alert("Erro ao processar curso. Tente novamente.");
        }
    };

    return (
        <>
            <RegisterTitle>Seleção do curso</RegisterTitle>
            <RegisterCursoForm>
                <Row>
                    <Col6Flex>
                        <FormGroupGeneric>
                            <FormLabel>Selecionar curso existente</FormLabel>
                            <select {...register("selectedCourseId")} onChange={e => setIsNewCourse(!e.target.value)}>
                                <option value="">Cadastrar novo curso</option>
                                {cursos.map(curso => (
                                    <option key={curso.idCurso} value={curso.idCurso}>
                                        {curso.nome} - {curso.campus}
                                    </option>
                                ))}
                            </select>
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
