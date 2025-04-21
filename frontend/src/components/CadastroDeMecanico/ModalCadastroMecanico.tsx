import { useState } from "react";
import { tMecanicoCadastro } from "../../types/Mecanico";
import InputCustom from "../InputCustom/InputCustom";
import Modal from "../../layouts/Modal/Modal";
import Button from "../Button/Button";
import "./ModalCadastroMecanico.css";


interface CadastroDeMecanicoProps {
  isOpen: boolean;
  onClose: () => void;
  onSucess?: () => void;
}

export default function ModalCadastroMecanico({ isOpen, onClose, onSucess}: CadastroDeMecanicoProps) {
  const [formData, setFormData] = useState<tMecanicoCadastro>({
    nome: '',
    email: '',
    telefone: '',
    senha: '',
    cpf: '',
  });
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [error, setError] = useState('');

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.senha !== confirmarSenha) {
      setError("As senhas não coincidem");
      return;
    }
    try {
      const response = await fetch('http://localhost:8080/mecanicos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log(data);
      if (!response.ok) throw new Error(data.message || "Erro ao realizar cadastro");
      alert(data.message);
      onSucess?.();
    } catch (error) {
        if (error instanceof Error) {
            console.error("Erro:", error.message);
            setError(error.message);
        } else {
            console.error("Erro desconhecido:", error);
            setError("Erro de conexão. Tente novamente.");
        }
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} header="Cadastro de Mecânico" >
      <form onSubmit={handleSubmit}>
        <InputCustom label="Nome" type="text" name="nome" value={formData.nome} onChange={handleFormChange} required />
        <InputCustom label="CPF" type="text" name="cpf" value={formData.cpf} onChange={handleFormChange} required />
        <InputCustom label="Telefone" type="text" name="telefone" value={formData.telefone} onChange={handleFormChange} required />
        <InputCustom label="Email" type="email" name="email" value={formData.email} onChange={handleFormChange} required />
        <InputCustom label="Senha" type="password" name="senha" value={formData.senha} onChange={handleFormChange} required />
        <InputCustom label="Confirmar Senha" type="password" name="confirmarSenha" value={confirmarSenha} onChange={(e) => setConfirmarSenha(e.target.value)} required />
        {error && <p className="error">{error}</p>}
        <div className="form-buttons">
          
          <button type="button" onClick={onClose}>Cancelar</button>
          <Button text="Cadastrar" secondary type="submit" />
        </div>
      </form>
    </Modal>
  );
}
