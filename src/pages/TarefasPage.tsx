import { useState } from "react";
import { tarefas as tarefasIniciais, getFamiliar, statusLabels, familiares } from "@/data/mockData";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

type FiltroTab = "todas" | "hoje" | "semana";

export default function TarefasPage() {
  const [tarefasState, setTarefasState] = useState(tarefasIniciais);
  const [tab, setTab] = useState<FiltroTab>("todas");
  const [filtroResp, setFiltroResp] = useState<number | null>(null);

  const toggleConcluida = (id: number) => {
    setTarefasState(prev =>
      prev.map(t =>
        t.id === id ? { ...t, status: t.status === "concluida" ? "pendente" : "concluida" } : t
      )
    );
    toast.success("Tarefa atualizada!", { style: { borderRadius: 16 } });
  };

  let filtered = tarefasState;
  if (tab === "hoje") filtered = filtered.filter(t => t.data === "hoje");
  if (tab === "semana") filtered = filtered.filter(t => ["hoje", "amanhã"].includes(t.data));
  if (filtroResp !== null) filtered = filtered.filter(t => t.responsavel === filtroResp);

  const pendentes = filtered.filter(t => t.status !== "concluida");
  const concluidas = filtered.filter(t => t.status === "concluida");

  const tabs: { key: FiltroTab; label: string }[] = [
    { key: "todas", label: "Todas" },
    { key: "hoje", label: "Hoje" },
    { key: "semana", label: "Esta semana" },
  ];

  return (
    <div className="p-4 md:p-6 max-w-5xl mx-auto space-y-6">
      <div className="animate-fade-in">
        <h1 className="text-2xl font-display font-bold text-foreground">Tarefas</h1>
        <p className="text-muted-foreground text-sm">Rotina de cuidados</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 animate-fade-in">
        {tabs.map(t => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-4 py-1.5 rounded-full text-sm font-body font-medium transition-all duration-200 ${
              tab === t.key ? "shadow-soft text-primary-foreground" : "text-muted-foreground hover:bg-muted"
            }`}
            style={tab === t.key ? { background: "rgba(168,200,232,0.4)" } : {}}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Filtro por responsável */}
      <div className="flex gap-2 flex-wrap animate-fade-in">
        <button
          onClick={() => setFiltroResp(null)}
          className={`px-3 py-1 rounded-full text-xs font-body transition-all ${filtroResp === null ? "shadow-soft" : "hover:bg-muted"}`}
          style={filtroResp === null ? { background: "rgba(168,200,232,0.3)" } : {}}
        >
          Todos
        </button>
        {familiares.map(f => (
          <button
            key={f.id}
            onClick={() => setFiltroResp(f.id)}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-body transition-all hover:scale-105"
            style={filtroResp === f.id ? { background: `${f.cor}40` } : {}}
          >
            <span className="avatar-pastel w-5 h-5 text-[8px]" style={{ background: f.cor, color: f.corTexto }}>{f.avatar}</span>
            {f.nome.split(" ")[0]}
          </button>
        ))}
      </div>

      {/* Pendentes */}
      <div className="space-y-2">
        {pendentes.map(tarefa => {
          const fam = getFamiliar(tarefa.responsavel);
          return (
            <div key={tarefa.id} className="card-pastel flex items-center gap-3 p-3 bg-card animate-fade-in">
              <Checkbox
                checked={false}
                onCheckedChange={() => toggleConcluida(tarefa.id)}
                className="rounded-lg border-2"
                style={{ borderColor: fam?.cor }}
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-body font-medium text-foreground">{tarefa.titulo}</p>
                <p className="text-[10px] text-muted-foreground">{tarefa.horario} • {tarefa.data}</p>
              </div>
              {fam && (
                <div className="avatar-pastel w-7 h-7 text-[10px]" style={{ background: fam.cor, color: fam.corTexto }}>{fam.avatar}</div>
              )}
            </div>
          );
        })}
      </div>

      {/* Concluídas */}
      {concluidas.length > 0 && (
        <div>
          <h3 className="font-display font-bold text-sm text-muted-foreground mb-2">Concluídas ({concluidas.length})</h3>
          <div className="space-y-2">
            {concluidas.map(tarefa => {
              const fam = getFamiliar(tarefa.responsavel);
              return (
                <div key={tarefa.id} className="card-pastel flex items-center gap-3 p-3 bg-card opacity-60">
                  <Checkbox
                    checked={true}
                    onCheckedChange={() => toggleConcluida(tarefa.id)}
                    className="rounded-lg"
                    style={{ borderColor: "#B8DFC8", background: "#B8DFC8" }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-body font-medium text-foreground line-through">{tarefa.titulo}</p>
                    <p className="text-[10px] text-muted-foreground">{tarefa.horario}</p>
                  </div>
                  {fam && (
                    <div className="avatar-pastel w-7 h-7 text-[10px]" style={{ background: fam.cor, color: fam.corTexto }}>{fam.avatar}</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
