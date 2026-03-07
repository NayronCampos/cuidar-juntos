import { Link } from "react-router-dom";
import { LayoutDashboard, Calendar, CheckSquare, Activity, Wallet, FileText } from "lucide-react";
import { paciente, familiares, tarefas, getFamiliar, statusLabels } from "@/data/mockData";
import { Progress } from "@/components/ui/progress";

const featureCards = [
  { icon: LayoutDashboard, titulo: "Painel Geral", subtitulo: "Divisão entre familiares", pill: "4 pessoas", cor: "#83B4DF", corTexto: "#307EC2", url: "/dashboard" },
  { icon: Calendar, titulo: "Agenda", subtitulo: "Próximos compromissos", pill: "3 esta semana", cor: "#B8DFC8", corTexto: "#4A8A6A", url: "/agenda" },
  { icon: CheckSquare, titulo: "Tarefas", subtitulo: "Rotina de cuidados", pill: "2 pendentes hoje", cor: "#F4C5A8", corTexto: "#C0724A", url: "/tarefas" },
  { icon: Activity, titulo: "Saúde", subtitulo: "Perfil médico e medicações", pill: "4 medicamentos", cor: "#D4C0E8", corTexto: "#7A5AA8", url: "/saude" },
  { icon: FileText, titulo: "Documentos", subtitulo: "Receitas, exames e laudos", pill: "9 arquivos", cor: "#83B4DF", corTexto: "#307EC2", url: "/documentos" },
  { icon: Wallet, titulo: "Financeiro", subtitulo: "Divisão de custos", pill: "R$ 1.240 este mês", cor: "#F8E8A0", corTexto: "#8A7A30", url: "/financeiro" },
];

const tarefasHoje = tarefas.filter(t => t.data === "hoje").sort((a, b) => a.horario.localeCompare(b.horario)).slice(0, 3);
const concluidas = tarefas.filter(t => t.data === "hoje" && t.status === "concluida").length;
const totalHoje = tarefas.filter(t => t.data === "hoje").length;

export default function HomePage() {
  return (
    <div className="p-4 md:p-6 max-w-5xl mx-auto space-y-6">
      <div className="animate-fade-in">
        <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground">
          Olá, Ana 👋
        </h1>
        <p className="text-muted-foreground font-body mt-1">Como podemos cuidar hoje?</p>
      </div>

      <div
        className="rounded-3xl p-5 md:p-6 animate-fade-in"
        style={{
          background: "linear-gradient(135deg, rgba(131,180,223,0.2), rgba(212,192,232,0.2))",
          border: "1px solid rgba(131,180,223,0.3)",
        }}
      >
        <div className="flex items-center gap-4">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center font-display font-bold text-xl flex-shrink-0"
            style={{ background: "linear-gradient(135deg, #83B4DF, #D4C0E8)", color: "#307EC2" }}
          >
            MG
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="font-display font-bold text-lg text-foreground">{paciente.nome}</h2>
            <p className="text-sm text-muted-foreground">{paciente.condicao}</p>
            <p className="text-xs text-muted-foreground mt-1">
              Próxima consulta: {paciente.proximaConsulta} • {paciente.medico}
            </p>
          </div>
        </div>
        <div className="mt-4">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-muted-foreground font-body">Progresso de hoje</span>
            <span className="font-display font-semibold text-foreground">{concluidas} de {totalHoje}</span>
          </div>
          <Progress value={(concluidas / totalHoje) * 100} className="h-2.5 rounded-full bg-muted" />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
        {featureCards.map((card, i) => (
          <Link
            key={card.url}
            to={card.url}
            className="card-pastel-hover p-4 md:p-5 animate-fade-in"
            style={{
              background: `linear-gradient(135deg, ${card.cor}30, ${card.cor}15)`,
              borderColor: `${card.cor}50`,
              animationDelay: `${i * 80}ms`,
            }}
          >
            <card.icon className="w-7 h-7 mb-3" style={{ color: card.corTexto }} strokeWidth={1.5} />
            <h3 className="font-display font-bold text-sm text-foreground">{card.titulo}</h3>
            <p className="text-xs text-muted-foreground mt-0.5">{card.subtitulo}</p>
            <span
              className="inline-block mt-3 px-2.5 py-1 rounded-full text-[10px] font-semibold font-body"
              style={{ background: `${card.cor}40`, color: card.corTexto }}
            >
              {card.pill}
            </span>
          </Link>
        ))}
      </div>

      <div className="animate-fade-in" style={{ animationDelay: "500ms" }}>
        <h2 className="font-display font-bold text-lg text-foreground mb-3">Próximas tarefas</h2>
        <div className="space-y-2">
          {tarefasHoje.map((tarefa) => {
            const fam = getFamiliar(tarefa.responsavel);
            const st = statusLabels[tarefa.status];
            return (
              <div key={tarefa.id} className="card-pastel flex items-center gap-3 p-3 md:p-4 bg-card">
                <span className="text-sm font-body font-semibold text-muted-foreground w-12">{tarefa.horario}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-body font-medium text-foreground truncate">{tarefa.titulo}</p>
                </div>
                {fam && (
                  <div className="avatar-pastel w-7 h-7 text-[10px] flex-shrink-0" style={{ background: fam.cor, color: fam.corTexto }}>
                    {fam.avatar}
                  </div>
                )}
                <span
                  className="px-2 py-0.5 rounded-full text-[10px] font-semibold flex-shrink-0"
                  style={{ background: st.bg, color: st.color }}
                >
                  {st.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
