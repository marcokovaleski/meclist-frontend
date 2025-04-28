import { useState, useEffect } from "react";
import { tMecanico } from "../../types/Mecanico";
import InputCustom from "../InputCustom/InputCustom";
import Modal from "../../layouts/Modal/Modal";
import Button from "../Button/Button";
import "./ModalEditarMecanico.css";
import { limparMascara, aplicarMascaraCpf, aplicarMascaraTelefone } from "../../utils/maskUtils";
import { showSuccessToast } from "../../utils/toast";


interface EditarMecanicoProps {
  isOpen: boolean;
  onClose: () => void;
  mecanico: tMecanico | null; 
  onSucess?: () => void;
}

export default function ModalEditarMecanico({ isOpen, onClose, mecanico, onSucess }: EditarMecanicoProps) {
  const [formData, setFormData] = useState<tMecanico>({
    id: 0,
    nome: '',
    email: '',
    telefone: '',
    cpf: '',
    situacao: "ATIVO"
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (mecanico) {
      setFormData(mecanico);
    }
  }, [mecanico]);

  

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const cleanedData = {
      ...formData,
      cpf: limparMascara(formData.cpf),
      telefone: limparMascara(formData.telefone),
    };

    try {
      const response = await fetch(`http://localhost:8080/mecanicos/${cleanedData.id}`, {
        method: 'PUT', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cleanedData),
      });
      const data = await response.json();

      if (!response.ok) {
        if (data.errors) {
          setErrors(data.errors);
        } else {
          setErrors({ geral: data.message || "Erro ao atualizar cadastro" });
        }
        return;
      }

      showSuccessToast(data.message);
      onSucess?.();
    } catch (error) {
      if (error instanceof Error) {
        console.error("Erro:", error.message);
        setErrors({ geral: error.message });
      } else {
        console.error("Erro desconhecido:", error);
        setErrors({ geral: "Erro de conexão. Tente novamente." });
      }
    }
  };

  if (!mecanico) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} header="Editar Mecânico">
      <form onSubmit={handleSubmit}>
        <InputCustom label="Nome" name="nome" type="text" value={formData.nome} onChange={handleFormChange} required error={errors.nome} placeholder="Nome completo" />
        <InputCustom label="CPF" name="cpf" type="text"  placeholder="000.000.000-00" value={aplicarMascaraCpf(formData.cpf)} onChange={handleFormChange} required error={errors.cpf} />
        <InputCustom label="Telefone" name="telefone" type="text"  value={aplicarMascaraTelefone(formData.telefone)}  onChange={handleFormChange} required error={errors.telefone} placeholder="(00) 00000-0000" />
        <InputCustom label="Email" name="email" type="email" value={formData.email} onChange={handleFormChange} required error={errors.email} placeholder="Digite o e-mail" />
        <div className="form-group">
          <label htmlFor="situacao">Situação:</label>
          <select name="situacao" id="situacao" value={formData.situacao } onChange={handleFormChange}>
            <option value="ATIVO">Ativo</option>
            <option value="INATIVO">Inativo</option>
          </select>
        </div>
        {errors.geral && <p className="error">{errors.geral}</p>}

        <div className="form-buttons">
          <button type="button" onClick={onClose}>Cancelar</button>
          <Button text="Salvar" secondary type="submit" />
        </div>
      </form>
    </Modal>
  );
}
