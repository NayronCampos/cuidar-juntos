import { familiares, tarefas, getFamiliar } from "@/data/mockData";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const barData = familiares.map(f => ({
  nome: f.nome.split(" ")[0],
  Atribuídas: f.tarefasSemana,
  Concluídas: f.tarefasConcluidas,
  fill: f.cor,
}));

const pieData = familiares.map(f => ({
  name: f.nome.split(" ")[0],
  value: f.tarefasSemana,
  color: f.cor,
}));

const totalTarefas = familiares.reduce((s, f) => s + f.tarefasSemana, 0);
const totalConcluidas = familiares.reduce((s, f) => s + f.tarefasConcluidas, 0);
const pendentes = totalTarefas - totalConcluidas;

const proxEvento = tarefas.find(t => t.status !== "concluida");

export default function DashboardPage() {
  return (
    <div className="p-4 md:p-6 max-w-5xl mx-auto space-y-6">
      <div className="animate-fade-in">
        <h1 className="text-2xl font-display font-bold text-foreground">Painel de Cuidados</h1>
        <p className="text-muted-foreground text-sm">Semana atual — distribuição de responsabilidades</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Total de tarefas", value: totalTarefas, sub: "esta semana", cor: "#A8C8E8" },
          { label: "Concluídas", value: totalConcluidas, sub: `${Math.round((totalConcluidas / totalTarefas) * 100)}%`, cor: "#B8DFC8" },
          { label: "Pendentes", value: pendentes, sub: "a fazer", cor: "#F4C5A8" },
          { label: "Próximo evento", value: proxEvento?.titulo || "—", sub: proxEvento?.horario || "", cor: "#D4C0E8", isText: true },
        ].map((c, i) => (
          <div
            key={i}
            className="card-pastel p-4 animate-fade-in"
            style={{ background: `${c.cor}20`, borderColor: `${c.cor}40`, animationDelay: `${i * 80}ms` }}
          >
            <p className="text-xs text-muted-foreground font-body">{c.label}</p>
            <p className={`font-display font-bold mt-1 ${'isText' in c ? 'text-sm' : 'text-2xl'} text-foreground`}>
              {c.value}
            </p>
            <p className="text-xs text-muted-foreground">{c.sub}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="card-pastel p-4 bg-card animate-fade-in" style={{ animationDelay: "300ms" }}>
          <h3 className="font-display font-bold text-sm mb-4">Participação por familiar</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={barData} barGap={4}>
              <XAxis dataKey="nome" tick={{ fontSize: 12, fontFamily: "Nunito Sans" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ borderRadius: 16, border: "none", boxShadow: "0 4px 20px rgba(168,200,232,0.25)", fontFamily: "Nunito Sans" }}
              />
              <Bar dataKey="Atribuídas" radius={[8, 8, 0, 0]}>
                {barData.map((entry, i) => (
                  <Cell key={i} fill={entry.fill} opacity={0.5} />
                ))}
              </Bar>
              <Bar dataKey="Concluídas" radius={[8, 8, 0, 0]}>
                {barData.map((entry, i) => (
                  <Cell key={i} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="card-pastel p-4 bg-card animate-fade-in" style={{ animationDelay: "400ms" }}>
          <h3 className="font-display font-bold text-sm mb-4">Distribuição</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" outerRadius={80} innerRadius={40} dataKey="value" paddingAngle={4}>
                {pieData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: 16, border: "none", boxShadow: "0 4px 20px rgba(168,200,232,0.25)" }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-3 mt-2 justify-center">
            {pieData.map(p => (
              <div key={p.name} className="flex items-center gap-1.5 text-xs font-body">
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: p.color }} />
                {p.name} ({Math.round((p.value / totalTarefas) * 100)}%)
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Per-person cards */}
      <div className="grid md:grid-cols-2 gap-4">
        {familiares.map((f, i) => {
          const ft = tarefas.filter(t => t.responsavel === f.id).slice(0, 3);
          return (
            <div key={f.id} className="card-pastel p-4 bg-card animate-fade-in" style={{ animationDelay: `${500 + i * 100}ms` }}>
              <div className="flex items-center gap-3 mb-3">
                <div className="avatar-pastel w-10 h-10 text-sm" style={{ background: f.cor, color: f.corTexto }}>{f.avatar}</div>
                <div>
                  <p className="font-display font-bold text-sm">{f.nome}</p>
                  <p className="text-xs text-muted-foreground">{f.relacao}</p>
                </div>
                <span className="ml-auto text-xs font-semibold text-muted-foreground">{f.tarefasConcluidas}/{f.tarefasSemana}</span>
              </div>
              <Progress value={(f.tarefasConcluidas / f.tarefasSemana) * 100} className="h-2 rounded-full bg-muted mb-3" />
              <div className="space-y-1.5">
                {ft.map(t => (
                  <div key={t.id} className="flex items-center gap-2 text-xs">
                    <span className={`w-1.5 h-1.5 rounded-full ${t.status === 'concluida' ? 'bg-secondary' : 'bg-accent-peach'}`} />
                    <span className="text-foreground">{t.titulo}</span>
                    <span className="ml-auto text-muted-foreground">{t.horario}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
