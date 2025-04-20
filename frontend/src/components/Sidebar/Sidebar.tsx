import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import "./sidebar.css";
import logo from "../../assets/logo.svg";
import m from "../../assets/m.svg";
import grid from "../../assets/grid.svg";
import lista from "../../assets/lista.svg";
import relatorio from "../../assets/relatorio.svg";
import cadastro from "../../assets/cadastro.svg";
import configuracoes from "../../assets/configuracoes.svg";
import userSvg from "../../assets/user.svg";
import suporte from "../../assets/suporte.svg";
import logoutSvg from "../../assets/logout.svg";
import setaLabelBaixo from "../../assets/setaLabelBaixo.svg";
import setaLabelLado from "../../assets/setaLabelLado.svg";


export function Sidebar() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [open, setOpen] = useState(false);
  const [cadastroOpen, setCadastroOpen] = useState(false);
  const [relatorioOpen, setRelatorioOpen] = useState(false);

  return (
    <aside className={`sidebar ${open ? "sidebar--open" : "sidebar--closed"}`}>
      <header className="sidebar-header">
        <button onClick={() => setOpen(!open)} className="sidebar-toggle">
          <img
            src={open ? logo : m}
            alt="Logo"
            className={`sidebar-logo ${open ? "logo-full" : "logo-mini"}`}
          />
          <span className="sidebar-chevron">{open ? "«" : "»"}</span>
        </button>
      </header>


      <nav className="sidebar-menu">
        <button onClick={() => navigate("/dashboard")}>
        <img src={grid} alt="grid" />
          Dashboard
        </button>

        <section className="sidebar-group">
          <button onClick={() => setCadastroOpen(!cadastroOpen)}>
          <img src={cadastro} alt="cadastro" />
            Cadastro <span>{cadastroOpen ? <img src={setaLabelBaixo} alt="seta" /> : <img src={setaLabelLado} alt="seta" />}</span>
          </button>
          {cadastroOpen && open && (
            <div className="sidebar-submenu">
              <button onClick={() => navigate("/cadastro-cliente")}>
                Cadastro de clientes
              </button>
              <button onClick={() => navigate("/cadastro-mecanico")}>
                Cadastro de mecânicos
              </button>
            </div>
          )}
        </section>

        <button onClick={() => navigate("/checklist")}>
        <img src={lista} alt="lista" />
          Checklist</button>

        <section className="sidebar-group">
          <button onClick={() => setRelatorioOpen(!relatorioOpen)}>
          <img src={relatorio} alt="relatorio" />
            Relatório <span>{relatorioOpen ? <img src={setaLabelBaixo} alt="seta" /> : <img src={setaLabelLado} alt="seta" />}</span>
          </button>
          {relatorioOpen && open && (
            <div className="sidebar-submenu">
              <button onClick={() => navigate("/relatorio/mensal")}>
                Faturamento mensal
              </button>
              <button onClick={() => navigate("/relatorio/status")}>
                Checklist por status
              </button>
              <button onClick={() => navigate("/relatorio/tempo")}>
                Tempo médio de execução
              </button>
            </div>
          )}
        </section>
      </nav>

      {open && (
        <footer className="sidebar-footer">
          <button onClick={() => navigate("/perfil")}>
          <img src={userSvg} alt="user" />
            {user?.email}
          </button>
          <button onClick={() => navigate("/configuracoes")}>
          <img src={configuracoes} alt="configuracaos" />
            Configurações
          </button>
          <button onClick={() => navigate("/suporte")}>
          <img src={suporte} alt="suporte" />
            Ajuda e suporte
          </button>
          <button onClick={logout} className="sidebar-logout">
          <img src={logoutSvg} alt="logout" />
            Sair
          </button>
        </footer>
      )}
    </aside>
  );
}
