
import { useEffect, useState } from "react";
import { Sandwich, X, Clock, ArrowRight } from "lucide-react";
import "./Header.css";

type Funcionamento = {
  aberto: boolean;
  dia: string;
  mensagem: string;
};

function verificarFuncionamento(): Funcionamento {
  const agora = new Date();

  const partes = new Intl.DateTimeFormat("pt-BR", {
    timeZone: "America/Maceio",
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(agora);

  const dia = partes.find((p) => p.type === "weekday")?.value ?? "";
  const hora = Number(partes.find((p) => p.type === "hour")?.value);
  const minuto = Number(partes.find((p) => p.type === "minute")?.value);

  const diasAbertos = [
    "quarta-feira",
    "quinta-feira",
    "sexta-feira",
    "sábado",
  ];

  const dentroDoHorario =
    hora * 60 + minuto >= 18 * 60 &&
    hora * 60 + minuto < 23 * 60;

  const aberto = diasAbertos.includes(dia) && dentroDoHorario;

  return {
    aberto,
    dia,
    mensagem: aberto ? "Estamos abertos!" : "Estamos fechados",
  };
}

export default function Header() {
  const [funcionamento, setFuncionamento] = useState(
    verificarFuncionamento
  );

  const [mostrarAviso, setMostrarAviso] = useState(
    () => !verificarFuncionamento().aberto
  );

  useEffect(() => {
    let estavaAberto = verificarFuncionamento().aberto;

    const atualizarFuncionamento = () => {
      const novoStatus = verificarFuncionamento();

      setFuncionamento(novoStatus);

      // Esconde o aviso quando abrir.
      if (novoStatus.aberto) {
        setMostrarAviso(false);
      }

      // Mostra o aviso quando passar de aberto para fechado.
      if (estavaAberto && !novoStatus.aberto) {
        setMostrarAviso(true);
      }

      estavaAberto = novoStatus.aberto;
    };

    const intervalo = window.setInterval(
      atualizarFuncionamento,
      30_000
    );

    return () => window.clearInterval(intervalo);
  }, []);

  return (
    <header className="header">
      <div className="header-container">
        <a href="#inicio" className="logo" aria-label="Burger Geru - Início">
          <Sandwich className="header-logo-icon" size={30} strokeWidth={2.5} />

          <span className="logo-text">
            BURGER <span>GERU</span>
          </span>
        </a>

        <nav className="nav" aria-label="Navegação principal">
          <a href="#inicio">Início</a>
          <a href="#experiencia">Experiência</a>
          <a href="#menu">Cardápio</a>
          <a href="#contato">Contato</a>
        </nav>

        <div className="header-actions">
          <div
            className={`status-funcionamento ${
              funcionamento.aberto ? "aberto" : "fechado"
            }`}
            aria-live="polite"
          >
            <span className="status-bolinha" />
            {funcionamento.aberto ? "Aberto" : "Fechado"}
          </div>

          <a href="#menu" className="header-button">
            Ver cardápio
            <ArrowRight size={16} />
          </a>
        </div>
      </div>

      {mostrarAviso && !funcionamento.aberto && (
        <aside className="horario-aviso" role="status">
          <div className="aviso-icone">
            <Clock size={22} />
          </div>

          <div className="aviso-conteudo">
            <div className="aviso-titulo">
              No momento estamos fechados
            </div>

            <p>
              Mas já estamos preparando tudo para receber você!
            </p>

            <div className="aviso-horarios">
              <strong>Nosso horário de atendimento</strong>

              <div className="aviso-linha">
                <span>Domingo a terça-feira</span>
                <span>Fechado</span>
              </div>

              <div className="aviso-linha">
                <span>Quarta a sábado</span>
                <span>18h às 23h</span>
              </div>
            </div>

            <a
              href="#menu"
              className="aviso-link"
              onClick={() => setMostrarAviso(false)}
            >
              Conhecer o cardápio
              <ArrowRight size={15} />
            </a>
          </div>

          <button
            type="button"
            className="aviso-fechar"
            onClick={() => setMostrarAviso(false)}
            aria-label="Fechar aviso de funcionamento"
          >
            <X size={18} />
          </button>
        </aside>
      )}
    </header>
  );
}
