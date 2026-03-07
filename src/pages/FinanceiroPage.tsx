import { despesas, familiares, getFamiliar } from "@/data/mockData";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const totalGasto = despesas.reduce((s, d) => s + d.valor, 0);

const porCategoria = despesas.reduce((acc, d) => {
  acc[d.categoria] = (acc[d.categoria] || 0) + d.valor;
  return acc;
}, {} as Record<string, number>);

const pieData = Object.entries(porCategoria).map(([name, value]) => ({ name, value }));
const pieCores = ["#A8C8E8", "#B8DFC8", "#F4C5A8", "#D4C0E8", "#F8E8A0"];

const porPagador = familiares.map(f => ({
  ...f,
  total: despesas.filter(d => d.pagoPor === f.id).reduce((s, d) => s + d.valor, 0),
}));

export default function FinanceiroPage() {
  return (
    <div className="p-4 md:p-6 max-w-5xl mx-auto space-y-6">
      <div className="animate-fade-in">
        <h1 className="text-2xl font-display font-bold text-foreground">Financeiro</h1>
        <p className="text-muted-foreground text-sm">Divisão de custos do mês</p>
      </div>

      {/* Resumo */}
      <div className="card-pastel p-5 animate-fade-in" style={{ background: "rgba(168,200,232,0.15)", borderColor: "rgba(168,200,232,0.3)" }}>
        <p className="text-xs text-muted-foreground font-body">Total gasto este mês</p>
        <p className="font-display font-bold text-3xl text-foreground mt-1">R$ {totalGasto.toLocaleString("pt-BR")}</p>
        <div className="mt-4 flex rounded-full overflow-hidden h-3">
          {porPagador.map(f => (
            <div key={f.id} style={{ width: `${(f.total / totalGasto) * 100}%`, background: f.cor }} title={`${f.nome}: R$ ${f.total}`} />
          ))}
        </div>
        <div className="flex flex-wrap gap-3 mt-3">
          {porPagador.map(f => (
            <div key={f.id} className="flex items-center gap-1.5 text-xs font-body">
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: f.cor }} />
              {f.nome.split(" ")[0]}: R$ {f.total}
            </div>
          ))}
        </div>
      </div>

      {/* Gráfico */}
      <div className="card-pastel p-4 bg-card animate-fade-in" style={{ animationDelay: "200ms" }}>
        <h3 className="font-display font-bold text-sm mb-4">Gastos por categoria</h3>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie data={pieData} cx="50%" cy="50%" outerRadius={75} innerRadius={35} dataKey="value" paddingAngle={4}>
              {pieData.map((_, i) => (
                <Cell key={i} fill={pieCores[i % pieCores.length]} />
              ))}
            </Pie>
            <Tooltip contentStyle={{ borderRadius: 16, border: "none", boxShadow: "0 4px 20px rgba(168,200,232,0.25)" }} formatter={(v: number) => `R$ ${v}`} />
          </PieChart>
        </ResponsiveContainer>
        <div className="flex flex-wrap gap-3 justify-center mt-2">
          {pieData.map((p, i) => (
            <span key={p.name} className="flex items-center gap-1.5 text-xs font-body">
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: pieCores[i % pieCores.length] }} />
              {p.name}
            </span>
          ))}
        </div>
      </div>

      {/* Lista de despesas */}
      <div className="animate-fade-in" style={{ animationDelay: "300ms" }}>
        <h2 className="font-display font-bold text-lg mb-3">Despesas</h2>
        <div className="space-y-2">
          {despesas.map(d => {
            const fam = getFamiliar(d.pagoPor);
            return (
              <div key={d.id} className="card-pastel flex items-center gap-3 p-3 bg-card">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-body font-medium text-foreground">{d.descricao}</p>
                  <p className="text-[10px] text-muted-foreground">{d.data} • {d.categoria}</p>
                </div>
                <span className="font-display font-bold text-sm text-foreground">R$ {d.valor}</span>
                {fam && <div className="avatar-pastel w-7 h-7 text-[10px]" style={{ background: fam.cor, color: fam.corTexto }}>{fam.avatar}</div>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
