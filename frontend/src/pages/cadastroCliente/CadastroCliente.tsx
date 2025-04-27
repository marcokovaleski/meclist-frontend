import { useEffect, useState } from "react";
import "./cadastroCliente.css";
import { tCliente } from "../../types/Cliente";
import InputCustom from "../../components/InputCustom/InputCustom";
import Button from "../../components/Button/Button";
import { SelectCustom } from "../../components/Select/SelectCustom";
import { Pencil, UserPlus } from 'lucide-react';
import Loading from "../../components/Loading/Loading";
import ModalCadastroCliente from "../../components/CadastroDeCliente/ModalCadastroCliente";

export default function CadastroCliente() {
    const clientesMockados: tCliente[] = [
        {
          id: 1,
          nome: "João da Silva",
          cpf: "123.456.789-00",
          telefone: "(45) 99999-9999",
          email: "joao.silva@email.com",
          situacao: "ATIVO",
          veiculos: [],
        },
        {
          id: 2,
          nome: "Maria Souza",
          cpf: "987.654.321-00",
          telefone: "(45) 98888-8888",
          email: "maria.souza@email.com",
          situacao: "INATIVO",
          veiculos: [],
        },
        {
          id: 3,
          nome: "Carlos Pereira",
          cpf: "111.222.333-44",
          telefone: "(45) 97777-7777",
          email: "carlos.pereira@email.com",
          situacao: "ATIVO",
          veiculos: [],
        },
      ];
      
      
    const [clientes, setClientes] = useState<tCliente[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const statusOptions = [
        { label: "Todos", value: "todos" },
        { label: "Ativo", value: "ativo" },
        { label: "Inativo", value: "inativo" },
    ];
    const [filtro, setFiltro] = useState("Todos");
    const [modalOpen, setModalOpen] = useState(false);

    const bucarClientes = async () => {
        try {
            const response = await fetch("http://localhost:8080/clientes");
            if (!response.ok) {
                throw new Error("Erro ao buscar clientes");
            }
            const data: tCliente[] = await response.json();
            setClientes(data);
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
        setClientes(clientesMockados);
        setLoading(false);
      }, []);


    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <div className="loading">Erro: {error}</div>;
    }
    return (
        <div className="cadastro-mecanico-container">
            <h1>Cadastro de Clientes</h1>
            <section className="cadastro-mecanico-header">
                <SelectCustom options={statusOptions} value={filtro} onChange={setFiltro} />
                <div className="cadastro-mecanico-buscar">
                    <Button text="Cadastrar cliente" icon={<UserPlus />} iconPosition="left" secondary onClick={() => setModalOpen(true)} />
                    <div className="buscar-mecanico">
                        <InputCustom name="buscar" value="" onChange={() => { }} type="text" placeholder="Buscar cliente" />
                        <Button text="Buscar" />
                    </div>
                </div>
            </section>

            <div className="mecanico-table">

                <table>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Veículos</th>
                            <th>CPF</th>
                            <th>Telefone</th>
                            <th>E-mail</th>
                            <th>Situação</th>
                            <th>Editar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clientes.length > 0 ? (
                            clientes.map((cliente) => (
                                <tr key={cliente.id}>
                                    <td>{cliente.nome}</td>
                                    <td>{cliente.veiculos.length}</td>
                                    <td>{cliente.cpf}</td>
                                    <td>{cliente.telefone}</td>
                                    <td>{cliente.email}</td>
                                    <td>{cliente.situacao.charAt(0).toUpperCase() + cliente.situacao.slice(1).toLowerCase()}</td>
                                    <td className="coluna-edit">
                                        <button>
                                            <Pencil className="edit" />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5}>Nenhum cliente encontrado.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {modalOpen && (
                <ModalCadastroCliente
                    isOpen={modalOpen}
                    onClose={() => { setModalOpen(false) }}
                    onSucess={() => {
                        bucarClientes();
                        setModalOpen(false);
                    }}
                />

            )}

        </div>
    );
}