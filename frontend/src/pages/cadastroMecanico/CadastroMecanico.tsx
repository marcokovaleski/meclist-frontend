import { useEffect, useState } from "react";
import "./CadastroMecanico.css";
import { tMecanico } from "../../types/Mecanico";
import InputCustom from "../../components/InputCustom/InputCustom";
import Button from "../../components/Button/Button";
import { SelectCustom } from "../../components/Select/SelectCustom";
import { Pencil } from 'lucide-react';


export default function CadastroMecanico() {
    const [mecanicos, setMecanicos] = useState<tMecanico[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const statusOptions = [
        { label: "Todos", value: "todos" },
        { label: "Ativo", value: "ativo" },
        { label: "Inativo", value: "inativo" },
      ];
      const [filtro,setFiltro]= useState("Todos");

    const bucarMecanicos = async () => {
        try {
            const response = await fetch("http://localhost:8080/mecanico");
            if (!response.ok) {
                throw new Error("Erro ao buscar mecânicos");
            }
            const data: tMecanico[] = await response.json();
            setMecanicos(data);
        } catch (error) {
            if (error instanceof Error) {
                console.error("Erro:", error.message);
                setError(error.message);
            }
            console.error("Erro:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        bucarMecanicos();
    }, []);



    if (loading) {
        return <div className="loading">Carregando...</div>;
    }

    if (error) {
        return <div className="loading">Erro: {error}</div>;
    }
    return (
        <div className="cadastro-mecanico-container">
            <h1>Cadastro de Mecânicos</h1>
            <section className="cadastro-mecanico-header">
            <SelectCustom options={statusOptions} value={filtro} onChange={setFiltro} />
            <div className="cadastro-mecanico-buscar">
            <Button text="Cadastrar mecânico"   />
                <div className="buscar-mecanico">
                <InputCustom name="buscar" value="" onChange={() => {}} type="text" placeholder="Buscar mecânico" />
                <Button text="Buscar"   />
                </div>
            </div>
            </section>
            
            <div className="mecanico-table">
                
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Celular</th>
                            <th>E-mail</th>
                            <th>Situação</th>
                            <th>Editar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mecanicos.length > 0 ? (
                            mecanicos.map((mecanico) => (
                                <tr key={mecanico.id}>
                                    <td>MEC-{String(mecanico.id).padStart(3, '0')}</td>
                                    <td>{mecanico.nome}</td>
                                    <td>{mecanico.telefone}</td>
                                    <td>{mecanico.email}</td>
                                    <td>{mecanico.situacao.charAt(0).toUpperCase() + mecanico.situacao.slice(1).toLowerCase()}</td>
                                    <td className="coluna-edit">
                                        <button>
                                            <Pencil className="edit"/>
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5}>Nenhum mecânico encontrado.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

        </div>
    );
}