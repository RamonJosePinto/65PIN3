import {FormGroupGeneric, FormInputGeneric} from "@/components/Form.styles";
import {ConfirmButtonGeneric} from "@/components/styles/Button.styles";
import {Row} from "@/components/styles/Columns.styles";
import {Col6Flex, FormLabel, Line, RegisterEmpresaForm, RegisterTitle} from "@/components/styles/enterprise/EnterpriseRegister.styles";
import {SubmitHandler, useForm} from "react-hook-form";
import {useRouter} from "next/router";
import apiService from "@/api/ApiService";
import {PostEmpresa} from "@/api/ApiTypes";
import { useSignUpContext } from "@/hooks/SignUpContext";

// Definindo a interface para os inputs do formulário
interface IFormInput {
    cnpj: string;
    companyName: string;
    companyPhone: string;
    companyEmail: string;
    supervisorName: string;
    supervisorRole: string;
    supervisorPhone: string;
}

export default function EmpresaRegister() {
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<IFormInput>();
    const { setCompanyId, estagioId, estagiarioId } = useSignUpContext();
    const router = useRouter();

    const onSubmit: SubmitHandler<IFormInput> = async data => {
        try {
            const empresaData: PostEmpresa = {
                cnpj: data.cnpj,
                nome: data.companyName,
                telefone: parseInt(data.companyPhone, 10),
                email: data.companyEmail,
                supervisores: [
                    {
                        nome: data.supervisorName,
                        cargo: data.supervisorRole,
                        telefone: parseInt(data.supervisorPhone, 10),
                    },
                ],
            };

           const response = await apiService.createEmpresa(empresaData);
            alert("Empresa e supervisor cadastrados com sucesso!");
            setCompanyId(response.id);
            router.push("/internship/course");
        } catch (error) {
            console.error("Erro ao cadastrar empresa e supervisor:", error);
            alert("Erro ao cadastrar empresa e supervisor. Tente novamente.");
        }
    };

    return (
        <>
            <RegisterTitle>Cadastro de Empresa e Supervisor</RegisterTitle>
            <RegisterEmpresaForm onSubmit={handleSubmit(onSubmit)}>
                <h3>Identificação da empresa</h3>
                <Row>
                    <Col6Flex>
                        <FormGroupGeneric>
                            <FormLabel>CNPJ</FormLabel>
                            <FormInputGeneric type="text" {...register("cnpj", {required: "CNPJ é obrigatório"})} />
                            {errors.cnpj && <span>{errors.cnpj.message}</span>}
                        </FormGroupGeneric>

                        <FormGroupGeneric>
                            <FormLabel>Telefone</FormLabel>
                            <FormInputGeneric type="tel" {...register("companyPhone", {required: "Telefone é obrigatório"})} />
                            {errors.companyPhone && <span>{errors.companyPhone.message}</span>}
                        </FormGroupGeneric>
                    </Col6Flex>

                    <Col6Flex>
                        <FormGroupGeneric>
                            <FormLabel>Nome / Razão Social</FormLabel>
                            <FormInputGeneric type="text" {...register("companyName", {required: "Nome é obrigatório"})} />
                            {errors.companyName && <span>{errors.companyName.message}</span>}
                        </FormGroupGeneric>

                        <FormGroupGeneric>
                            <FormLabel>Email</FormLabel>
                            <FormInputGeneric type="email" {...register("companyEmail", {required: "Email é obrigatório"})} />
                            {errors.companyEmail && <span>{errors.companyEmail.message}</span>}
                        </FormGroupGeneric>
                    </Col6Flex>
                </Row>

                <Line />

                <h3>Supervisor da empresa</h3>
                <Row>
                    <Col6Flex>
                        <FormGroupGeneric>
                            <FormLabel>Nome</FormLabel>
                            <FormInputGeneric type="text" {...register("supervisorName", {required: "Nome do supervisor é obrigatório"})} />
                            {errors.supervisorName && <span>{errors.supervisorName.message}</span>}
                        </FormGroupGeneric>

                        <FormGroupGeneric>
                            <FormLabel>Telefone</FormLabel>
                            <FormInputGeneric type="tel" {...register("supervisorPhone", {required: "Telefone é obrigatório"})} />
                            {errors.supervisorPhone && <span>{errors.supervisorPhone.message}</span>}
                        </FormGroupGeneric>
                    </Col6Flex>

                    <Col6Flex>
                        <FormGroupGeneric>
                            <FormLabel>Cargo</FormLabel>
                            <FormInputGeneric type="text" {...register("supervisorRole", {required: "Cargo é obrigatório"})} />
                            {errors.supervisorRole && <span>{errors.supervisorRole.message}</span>}
                        </FormGroupGeneric>
                    </Col6Flex>
                </Row>

                <ConfirmButtonGeneric type="submit" style={{marginTop: 40, width: "30%", margin: "50px auto 0 auto"}}>
                    Continuar
                </ConfirmButtonGeneric>
            </RegisterEmpresaForm>
        </>
    );
}
