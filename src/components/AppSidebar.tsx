import { Heart, LayoutDashboard, Calendar, CheckSquare, MessageCircle, Wallet, Activity } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";

const items = [
  { title: "Início", url: "/", icon: Heart },
  { title: "Painel", url: "/dashboard", icon: LayoutDashboard },
  { title: "Agenda", url: "/agenda", icon: Calendar },
  { title: "Tarefas", url: "/tarefas", icon: CheckSquare },
  { title: "Saúde", url: "/saude", icon: Activity },
  { title: "Financeiro", url: "/financeiro", icon: Wallet },
  { title: "Conversa", url: "/chat", icon: MessageCircle },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();

  return (
    <Sidebar collapsible="icon" className="border-r-0">
      <div className="p-4 flex items-center gap-2">
        <div className="w-9 h-9 rounded-2xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, #A8C8E8, #D4C0E8)" }}>
          <Heart className="w-5 h-5" style={{ color: "#4A7FA8" }} strokeWidth={1.5} />
        </div>
        {!collapsed && (
          <span className="font-display font-bold text-lg text-foreground">CuidarJuntos</span>
        )}
      </div>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const isActive = location.pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink
                        to={item.url}
                        end={item.url === "/"}
                        className={`rounded-2xl transition-all duration-200 ${isActive ? "bg-primary/20" : "hover:bg-muted"}`}
                        activeClassName="bg-primary/20 font-semibold"
                      >
                        <item.icon className="mr-2 h-5 w-5" strokeWidth={1.5} style={isActive ? { color: "#4A7FA8" } : {}} />
                        {!collapsed && <span>{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <div className="flex items-center gap-3">
          <div className="avatar-pastel w-9 h-9 text-xs" style={{ background: "#A8C8E8", color: "#4A7FA8" }}>
            AC
          </div>
          {!collapsed && (
            <div>
              <p className="font-display font-semibold text-sm">Ana Costa</p>
              <p className="text-xs text-muted-foreground">Filha</p>
            </div>
          )}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
