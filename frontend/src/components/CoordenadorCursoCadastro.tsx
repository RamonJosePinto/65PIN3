import {FormGroupGeneric, FormInputGeneric, SelectGeneric} from "@/components/Form.styles";
import {Row} from "@/components/styles/Columns.styles";
import {Col6Flex, FormLabel, RegisterTitle} from "@/components/styles/course/CourseRegister.styles";
import {useEffect, useState} from "react";
import apiService from "@/api/ApiService";
import {Curso} from "@/api/ApiTypes";
import {ConfirmButtonGeneric} from "./styles/Button.styles";

interface CursoCadastroProps {
    onCourseSelect: (courseId: number) => void; // Callback para informar o curso selecionado
}

export default function CursoCadastro({onCourseSelect}: CursoCadastroProps) {
    const [cursos, setCursos] = useState<Curso[]>([]);
    const [isNewCourse, setIsNewCourse] = useState<boolean>(true);

    useEffect(() => {
        async function fetchCursos() {
            try {
                const response = await apiService.getCursos();
                setCursos(response);
            } catch (error) {
                console.error("Erro ao buscar cursos:", error);
            }
        }
        fetchCursos();
    }, []);

    const handleCourseSelection = (selectedCourseId: number | "") => {
        if (selectedCourseId) {
            setIsNewCourse(false);
            onCourseSelect(Number(selectedCourseId));
        } else {
            setIsNewCourse(true);
        }
    };

    const handleNewCourseCreation = async (nome: string, campus: string) => {
        try {
            const newCourse = await apiService.createCurso({nome, campus});
            onCourseSelect(newCourse.idCurso);
            alert("Curso criado com sucesso!");
        } catch (error) {
            console.error("Erro ao criar curso:", error);
            alert("Erro ao criar curso. Tente novamente.");
        }
    };

    return (
        <>
            <RegisterTitle>Seleção do curso</RegisterTitle>
            <Row>
                <Col6Flex>
                    <FormGroupGeneric>
                        <FormLabel>Selecionar curso existente</FormLabel>
                        {/* @ts-ignore */}
                        <SelectGeneric onChange={e => handleCourseSelection(e.target.value)}>
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
                                <FormInputGeneric type="text" id="new-course-name" placeholder="Nome do curso" />
                            </FormGroupGeneric>
                        </Col6Flex>

                        <Col6Flex>
                            <FormGroupGeneric>
                                <FormLabel>Campus</FormLabel>
                                <FormInputGeneric type="text" id="new-course-campus" placeholder="Campus do curso" />
                            </FormGroupGeneric>
                        </Col6Flex>
                    </Row>

                    <ConfirmButtonGeneric
                        style={{width: "50%", margin: "30px auto"}}
                        type="button"
                        onClick={() => {
                            const nome = (document.getElementById("new-course-name") as HTMLInputElement).value;
                            const campus = (document.getElementById("new-course-campus") as HTMLInputElement).value;
                            if (nome && campus) {
                                handleNewCourseCreation(nome, campus);
                            } else {
                                alert("Preencha todos os campos para cadastrar um novo curso.");
                            }
                        }}
                    >
                        Cadastrar Curso
                    </ConfirmButtonGeneric>
                </>
            )}
        </>
    );
}
