import {FormGroupGeneric, FormInputGeneric} from "@/components/Form.styles";
import {ConfirmButtonGeneric} from "@/components/styles/Button.styles";
import {Row} from "@/components/styles/Columns.styles";
import {Col6Flex, FormLabel, RegisterCursoForm, RegisterTitle} from "@/components/styles/course/CourseRegister.styles";
import {SubmitHandler, useForm} from "react-hook-form";

// Definindo a interface para os inputs do formulário
interface IFormInput {
    courseName: string;
    semester: string;
    campus: string;
}

export default function CursoCadastro() {
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<IFormInput>();

    const onSubmit: SubmitHandler<IFormInput> = data => {
        console.log(data);
    };

    return (
        <>
            <RegisterTitle>Seleção do curso</RegisterTitle>
            <RegisterCursoForm>
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

                <ConfirmButtonGeneric type="submit" onClick={handleSubmit(onSubmit)} style={{marginTop: 40, width: "30%", margin: "50px auto 0 auto"}}>
                    Cadastrar
                </ConfirmButtonGeneric>
            </RegisterCursoForm>
        </>
    );
}
