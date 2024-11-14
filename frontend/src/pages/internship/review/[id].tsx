import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import apiService from "@/api/ApiService";
import {Estagio, RelatorioFinal} from "@/api/ApiTypes";
import {ConfirmButtonGeneric} from "@/components/styles/Button.styles";
import {FormGroupGeneric, FormInputGeneric} from "@/components/Form.styles";
import StageDetail from "../activities/[id]";
import {FormLabel} from "@/components/styles/LoginPage.styles";

export default function StageEvaluation() {
    const router = useRouter();
    const {id: idRelatorioFinal} = router.query;
    const idEstagio = router.query.stageId as string;
    const [relatorio, setRelatorio] = useState<RelatorioFinal | null>(null);
    const [stage, setStage] = useState<Estagio | null>(null);
    const [comment, setComment] = useState("");
    const [status, setStatus] = useState("Pendente");
    const [grade, setGrade] = useState<number | null>(null);

    console.log(stage)

    useEffect(() => {
        if (idRelatorioFinal) {
            // Busca os detalhes do relatório final pelo ID
            apiService
                .getRelatorioById(Number(idRelatorioFinal)) // Você deve criar esse método no `apiService`
                .then(response => {
                    setRelatorio(response);
                    setComment(response.comentarioOrientador || "");
                    setStatus(response.status || "Pendente");
                    setGrade(response.nota ?? null);
                })
                .catch(error => console.error("Erro ao buscar relatório:", error));
        }
    }, [idRelatorioFinal]);

    useEffect(() => {
        if (idEstagio) {
            apiService
                .getEstagioById(Number(idEstagio))
                .then(response => setStage(response))
                .catch(error => console.error("Erro ao buscar estágio:", error));
        }
    }, [idEstagio]);

    const handleSubmitEvaluation = async () => {
        try {
            const relatorioData = {
                status: status,
                comentarioOrientador: comment,
                nota: grade,
            };

            await apiService.avaliarRelatorioFinal(id, relatorioData);
            alert("Avaliação enviada com sucesso!");
            router.push("/user"); // Redireciona para o perfil do usuário após a avaliação
        } catch (error) {
            console.error("Erro ao enviar avaliação:", error);
            alert("Erro ao enviar avaliação. Tente novamente.");
        }
    };

    return (
        // <Container>
        <div className="row">
            {/* Coluna com detalhes do estágio */}
            <div className="col-8">
                <StageDetail idExterno={Number(idEstagio)} /> {/* Passa o ID do estágio como prop para reutilizar StageDetail */}
            </div>

            {/* Coluna com o formulário de avaliação */}
            <div className="col-4">
                <div style={{background: "#fff", borderRadius: 5, border: "1px solid #eaeaed", padding: "10px 20px", display: "flex", flexDirection: "column", justifyContent: "center", alignContent: "center"}}>
                    <h2>Avaliação do Estágio</h2>
                    <FormGroupGeneric>
                        <FormLabel>Comentários:</FormLabel>
                        <textarea
                            value={comment}
                            onChange={e => setComment(e.target.value)}
                            rows={4}
                            style={{width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #ccc"}}
                        />
                    </FormGroupGeneric>

                    <FormGroupGeneric>
                        <FormLabel>Status:</FormLabel>
                        <select value={status} onChange={e => setStatus(e.target.value)} style={{width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #ccc"}}>
                            <option value="Aprovado">Aprovado</option>
                            <option value="Reprovado">Reprovado</option>
                            <option value="Pendente">Pendente</option>
                        </select>
                    </FormGroupGeneric>

                    <FormGroupGeneric>
                        <FormLabel>Nota:</FormLabel>
                        <FormInputGeneric type="number" value={grade ?? ""} onChange={e => setGrade(Number(e.target.value))} min={0} max={10} style={{width: "100%"}} />
                    </FormGroupGeneric>

                    <ConfirmButtonGeneric onClick={handleSubmitEvaluation} style={{marginTop: "20px"}}>
                        Enviar Avaliação
                    </ConfirmButtonGeneric>
                </div>
            </div>
        </div>
        // </Container>
    );
}
