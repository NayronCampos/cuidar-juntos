import { useState } from "react";
import { tarefas, getFamiliar, statusLabels, familiares } from "@/data/mockData";
import { Plus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const dias = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
const hoje = new Date();
const semana = Array.from({ length: 7 }, (_, i) => {
  const d = new Date(hoje);
  d.setDate(hoje.getDate() - hoje.getDay() + i);
  return d;
});

const gruposTarefas = [
  { label: "Hoje", filtro: "hoje" },
  { label: "Amanhã", filtro: "amanhã" },
  { label: "Próximos dias", filtro: "outros" },
];

export default function AgendaPage() {
  const [diaSelecionado, setDiaSelecionado] = useState(hoje.getDay());

  const filtrarTarefas = (filtro: string) => {
    if (filtro === "outros") return tarefas.filter(t => t.data !== "hoje" && t.data !== "amanhã");
    return tarefas.filter(t => t.data === filtro);
  };

  return (
    <div className="p-4 md:p-6 max-w-5xl mx-auto space-y-6">
      <div className="animate-fade-in">
        <h1 className="text-2xl font-display font-bold text-foreground">Agenda</h1>
        <p className="text-muted-foreground text-sm">Compromissos e programações</p>
      </div>

      {/* Semana */}
      <div className="card-pastel bg-card p-4 animate-fade-in">
        <div className="grid grid-cols-7 gap-2">
          {semana.map((d, i) => {
            const isHoje = d.toDateString() === hoje.toDateString();
            const isSel = i === diaSelecionado;
            return (
              <button
                key={i}
                onClick={() => setDiaSelecionado(i)}
                className={`flex flex-col items-center py-2 rounded-2xl transition-all duration-200 ${
                  isSel ? "shadow-soft" : "hover:bg-muted"
                }`}
                style={isSel ? { background: "rgba(168,200,232,0.3)" } : {}}
              >
                <span className="text-[10px] text-muted-foreground font-body">{dias[i]}</span>
                <span className={`text-sm font-display font-bold mt-0.5 ${isHoje ? "text-primary-foreground" : "text-foreground"}`}>
                  {d.getDate()}
                </span>
                {isHoje && <span className="w-1.5 h-1.5 rounded-full mt-1" style={{ background: "#A8C8E8" }} />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tarefas agrupadas */}
      {gruposTarefas.map(grupo => {
        const items = filtrarTarefas(grupo.filtro);
        if (items.length === 0) return null;
        return (
          <div key={grupo.label} className="animate-fade-in">
            <h2 className="font-display font-bold text-sm text-foreground mb-2">{grupo.label}</h2>
            <div className="space-y-2">
              {items.sort((a, b) => a.horario.localeCompare(b.horario)).map(tarefa => {
                const fam = getFamiliar(tarefa.responsavel);
                const st = statusLabels[tarefa.status];
                return (
                  <div key={tarefa.id} className="card-pastel flex items-center gap-3 p-3 bg-card">
                    <span className="text-sm font-body font-semibold text-muted-foreground w-12">{tarefa.horario}</span>
                    <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: fam?.cor }} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-body font-medium text-foreground truncate">{tarefa.titulo}</p>
                    </div>
                    {fam && (
                      <div className="avatar-pastel w-7 h-7 text-[10px] flex-shrink-0" style={{ background: fam.cor, color: fam.corTexto }}>
                        {fam.avatar}
                      </div>
                    )}
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold flex-shrink-0" style={{ background: st.bg, color: st.color }}>
                      {st.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      {/* FAB */}
      <Dialog>
        <DialogTrigger asChild>
          <button
            className="fixed bottom-24 md:bottom-6 right-6 w-14 h-14 rounded-full shadow-hover flex items-center justify-center transition-transform hover:scale-105 z-40"
            style={{ background: "linear-gradient(135deg, #A8C8E8, #D4C0E8)" }}
          >
            <Plus className="w-6 h-6" style={{ color: "#4A7FA8" }} strokeWidth={1.5} />
          </button>
        </DialogTrigger>
        <DialogContent className="rounded-3xl border-card-border">
          <DialogHeader>
            <DialogTitle className="font-display">Adicionar tarefa</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-2">
            <Input placeholder="Título da tarefa" className="rounded-2xl" />
            <div className="grid grid-cols-2 gap-3">
              <Input type="date" className="rounded-2xl" />
              <Input type="time" className="rounded-2xl" />
            </div>
            <Select>
              <SelectTrigger className="rounded-2xl"><SelectValue placeholder="Responsável" /></SelectTrigger>
              <SelectContent className="rounded-2xl">
                {familiares.map(f => (
                  <SelectItem key={f.id} value={String(f.id)}>{f.nome}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="rounded-2xl"><SelectValue placeholder="Categoria" /></SelectTrigger>
              <SelectContent className="rounded-2xl">
                {["Saúde", "Higiene", "Consulta", "Compras", "Exame", "Outro"].map(c => (
                  <SelectItem key={c} value={c.toLowerCase()}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button className="w-full rounded-2xl font-display font-semibold" style={{ background: "#A8C8E8", color: "#4A7FA8" }}>
              Salvar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
