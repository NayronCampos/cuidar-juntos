import { Home, LayoutDashboard, Calendar, CheckSquare, Activity, FileText, Wallet } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const items = [
  { url: "/", icon: Home, label: "Início" },
  { url: "/dashboard", icon: LayoutDashboard, label: "Painel" },
  { url: "/agenda", icon: Calendar, label: "Agenda" },
  { url: "/tarefas", icon: CheckSquare, label: "Tarefas" },
  { url: "/saude", icon: Activity, label: "Saúde" },
  { url: "/documentos", icon: FileText, label: "Docs" },
  { url: "/financeiro", icon: Wallet, label: "Finanças" },
];

export function MobileNav() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-card-border md:hidden">
      <div className="flex items-center justify-around py-2 px-1">
        {items.map((item) => {
          const isActive = location.pathname === item.url;
          return (
            <Link
              key={item.url}
              to={item.url}
              className={`flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-2xl transition-all duration-200 ${
                isActive ? "text-primary-foreground" : "text-muted-foreground"
              }`}
            >
              <item.icon className="w-5 h-5" strokeWidth={1.5} />
              <span className="text-[9px] font-body font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
