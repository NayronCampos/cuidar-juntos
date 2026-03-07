import { paciente, tarefas, getFamiliar } from "@/data/mockData";
import { Calendar, Pill, TestTube } from "lucide-react";

const medicacoes = tarefas.filter(t => t.categoria === "saude");
const consultas = tarefas.filter(t => t.categoria === "consulta" || t.categoria === "exame");

const diasSemana = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];
const historicoMed = diasSemana.map((dia, i) => ({
  dia,
  tomou: i < 5 ? (i !== 2) : null,
}));

export default function SaudePage() {
  return (
    <div className="p-4 md:p-6 max-w-5xl mx-auto space-y-6">
      <div className="animate-fade-in">
        <h1 className="text-2xl font-display font-bold text-foreground">Saúde</h1>
        <p className="text-muted-foreground text-sm">Medicações, consultas e exames</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 animate-fade-in">
        {[
          { icon: Calendar, label: "Próxima consulta", value: paciente.proximaConsulta, sub: paciente.medico, cor: "#D4C0E8" },
          { icon: Pill, label: "Última medicação", value: "Medicação manhã", sub: "08:00 — Ana", cor: "#A8C8E8" },
          { icon: TestTube, label: "Próximo exame", value: "Exame de sangue", sub: "Sexta — 07:00", cor: "#F4C5A8" },
        ].map((c, i) => (
          <div
            key={i}
            className="card-pastel p-4"
            style={{ background: `${c.cor}20`, borderColor: `${c.cor}40` }}
          >
            <c.icon className="w-5 h-5 mb-2" style={{ color: c.cor.replace("E8", "A8").replace("C8", "6A") }} strokeWidth={1.5} />
            <p className="text-xs text-muted-foreground font-body">{c.label}</p>
            <p className="font-display font-bold text-sm mt-1 text-foreground">{c.value}</p>
            <p className="text-xs text-muted-foreground">{c.sub}</p>
          </div>
        ))}
      </div>

      {/* Medicações */}
      <div className="animate-fade-in" style={{ animationDelay: "200ms" }}>
        <h2 className="font-display font-bold text-lg mb-3">Medicações de hoje</h2>
        <div className="space-y-2">
          {medicacoes.map(t => {
            const fam = getFamiliar(t.responsavel);
            return (
              <div key={t.id} className="card-pastel flex items-center gap-3 p-3 bg-card">
                <Pill className="w-4 h-4 text-muted-foreground flex-shrink-0" strokeWidth={1.5} />
                <span className="text-sm font-body font-semibold text-muted-foreground w-12">{t.horario}</span>
                <div className="flex-1"><p className="text-sm font-body text-foreground">{t.titulo}</p></div>
                {fam && <div className="avatar-pastel w-7 h-7 text-[10px]" style={{ background: fam.cor, color: fam.corTexto }}>{fam.avatar}</div>}
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${t.status === "concluida" ? "bg-secondary text-secondary-foreground" : "bg-accent-peach text-accent-peach-foreground"}`}>
                  {t.status === "concluida" ? "✓" : "·"}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Histórico semanal */}
      <div className="card-pastel p-4 bg-card animate-fade-in" style={{ animationDelay: "300ms" }}>
        <h3 className="font-display font-bold text-sm mb-3">Histórico — últimos 7 dias</h3>
        <div className="grid grid-cols-7 gap-2 text-center">
          {historicoMed.map((d, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <span className="text-[10px] text-muted-foreground font-body">{d.dia}</span>
              <span
                className="w-8 h-8 rounded-xl flex items-center justify-center text-sm font-bold"
                style={
                  d.tomou === null
                    ? { background: "#EEF0F8", color: "#8A8AAA" }
                    : d.tomou
                    ? { background: "#B8DFC8", color: "#4A8A6A" }
                    : { background: "#F4C5A8", color: "#C0724A" }
                }
              >
                {d.tomou === null ? "—" : d.tomou ? "✓" : "✗"}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Consultas e exames */}
      <div className="animate-fade-in" style={{ animationDelay: "400ms" }}>
        <h2 className="font-display font-bold text-lg mb-3">Consultas e exames</h2>
        <div className="space-y-2">
          {consultas.map(t => {
            const fam = getFamiliar(t.responsavel);
            return (
              <div key={t.id} className="card-pastel flex items-center gap-3 p-4 bg-card">
                <Calendar className="w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
                <div className="flex-1">
                  <p className="text-sm font-body font-medium text-foreground">{t.titulo}</p>
                  <p className="text-xs text-muted-foreground">{t.data} — {t.horario}</p>
                </div>
                {fam && <div className="avatar-pastel w-7 h-7 text-[10px]" style={{ background: fam.cor, color: fam.corTexto }}>{fam.avatar}</div>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
