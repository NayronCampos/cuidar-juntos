import { paciente, tarefas, getFamiliar } from "@/data/mockData";
import { Calendar, Pill, TestTube, Heart, Droplets, AlertTriangle, Activity } from "lucide-react";

const consultas = tarefas.filter(t => t.categoria === "consulta" || t.categoria === "exame");

const diasSemana = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];
const historicoMed = diasSemana.map((dia, i) => ({
  dia,
  tomou: i < 5 ? (i !== 2) : null,
}));

const gravidadeCor: Record<string, { bg: string; text: string }> = {
  Leve: { bg: "#F8E8A030", text: "#8A7A30" },
  Moderada: { bg: "#F4C5A830", text: "#C0724A" },
  Grave: { bg: "#E8888830", text: "#A04040" },
};

export default function SaudePage() {
  return (
    <div className="p-4 md:p-6 max-w-5xl mx-auto space-y-6">
      <div className="animate-fade-in">
        <h1 className="text-2xl font-display font-bold text-foreground">Saúde</h1>
        <p className="text-muted-foreground text-sm">Perfil médico, medicações e consultas</p>
      </div>

      {/* Perfil médico */}
      <div
        className="rounded-3xl p-5 md:p-6 animate-fade-in"
        style={{
          background: "linear-gradient(135deg, rgba(131,180,223,0.15), rgba(212,192,232,0.15))",
          border: "1px solid rgba(131,180,223,0.25)",
        }}
      >
        <div className="flex items-center gap-4 mb-4">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center font-display font-bold text-xl flex-shrink-0"
            style={{ background: "linear-gradient(135deg, #83B4DF, #D4C0E8)", color: "#307EC2" }}
          >
            MG
          </div>
          <div>
            <h2 className="font-display font-bold text-lg text-foreground">{paciente.nome}</h2>
            <p className="text-sm text-muted-foreground">{paciente.idade} anos • {paciente.condicao}</p>
            <div className="flex items-center gap-2 mt-1">
              <Droplets className="w-4 h-4" style={{ color: "#C0724A" }} strokeWidth={1.5} />
              <span className="text-sm font-display font-bold" style={{ color: "#C0724A" }}>
                Tipo sanguíneo: {paciente.tipoSanguineo}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 animate-fade-in">
        {[
          { icon: Calendar, label: "Próxima consulta", value: paciente.proximaConsulta, sub: paciente.medico, cor: "#D4C0E8", corTexto: "#7A5AA8" },
          { icon: Pill, label: "Medicações ativas", value: `${paciente.medicacoes.length} medicamentos`, sub: "Uso contínuo", cor: "#83B4DF", corTexto: "#307EC2" },
          { icon: TestTube, label: "Próximo exame", value: "Exame de sangue", sub: "Sexta — 07:00", cor: "#F4C5A8", corTexto: "#C0724A" },
        ].map((c, i) => (
          <div
            key={i}
            className="card-pastel p-4"
            style={{ background: `${c.cor}20`, borderColor: `${c.cor}40` }}
          >
            <c.icon className="w-5 h-5 mb-2" style={{ color: c.corTexto }} strokeWidth={1.5} />
            <p className="text-xs text-muted-foreground font-body">{c.label}</p>
            <p className="font-display font-bold text-sm mt-1 text-foreground">{c.value}</p>
            <p className="text-xs text-muted-foreground">{c.sub}</p>
          </div>
        ))}
      </div>

      {/* Diagnósticos */}
      <div className="animate-fade-in" style={{ animationDelay: "100ms" }}>
        <h2 className="font-display font-bold text-lg mb-3 flex items-center gap-2">
          <Activity className="w-5 h-5" style={{ color: "#307EC2" }} strokeWidth={1.5} />
          Diagnósticos
        </h2>
        <div className="space-y-2">
          {paciente.diagnosticos.map((d, i) => (
            <div key={i} className="card-pastel p-4 bg-card">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-body font-semibold text-foreground">{d.nome}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{d.medico} • Detectado em {d.dataDeteccao}</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2 italic">{d.observacao}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Alergias */}
      <div className="animate-fade-in" style={{ animationDelay: "200ms" }}>
        <h2 className="font-display font-bold text-lg mb-3 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5" style={{ color: "#C0724A" }} strokeWidth={1.5} />
          Alergias
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          {paciente.alergias.map((a, i) => {
            const grav = gravidadeCor[a.gravidade] || gravidadeCor.Leve;
            return (
              <div key={i} className="card-pastel p-4 bg-card">
                <p className="text-sm font-body font-semibold text-foreground">{a.substancia}</p>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="text-[10px] text-muted-foreground px-2 py-0.5 rounded-full bg-muted">{a.tipo}</span>
                  <span
                    className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                    style={{ background: grav.bg, color: grav.text }}
                  >
                    {a.gravidade}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Medicações */}
      <div className="animate-fade-in" style={{ animationDelay: "300ms" }}>
        <h2 className="font-display font-bold text-lg mb-3 flex items-center gap-2">
          <Pill className="w-5 h-5" style={{ color: "#307EC2" }} strokeWidth={1.5} />
          Medicações em uso
        </h2>
        <div className="space-y-2">
          {paciente.medicacoes.map((m, i) => (
            <div key={i} className="card-pastel flex items-center gap-3 p-3 bg-card">
              <Pill className="w-4 h-4 text-muted-foreground flex-shrink-0" strokeWidth={1.5} />
              <span className="text-sm font-body font-semibold text-muted-foreground w-12">{m.horario}</span>
              <div className="flex-1">
                <p className="text-sm font-body text-foreground">{m.nome}</p>
              </div>
              <span className="text-[10px] text-muted-foreground px-2 py-0.5 rounded-full bg-muted">{m.frequencia}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Histórico semanal */}
      <div className="card-pastel p-4 bg-card animate-fade-in" style={{ animationDelay: "400ms" }}>
        <h3 className="font-display font-bold text-sm mb-3">Adesão à medicação — últimos 7 dias</h3>
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
      <div className="animate-fade-in" style={{ animationDelay: "500ms" }}>
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
