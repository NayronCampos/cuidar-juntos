import { LayoutDashboard, Calendar, CheckSquare, Wallet, Activity, FileText, Home } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import logo from "@/assets/logo.png";
import elderlyProfile from "@/assets/elderly-profile.jpg";
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
  { title: "Início", url: "/", icon: Home },
  { title: "Painel", url: "/dashboard", icon: LayoutDashboard },
  { title: "Agenda", url: "/agenda", icon: Calendar },
  { title: "Tarefas", url: "/tarefas", icon: CheckSquare },
  { title: "Saúde", url: "/saude", icon: Activity },
  { title: "Documentos", url: "/documentos", icon: FileText },
  { title: "Financeiro", url: "/financeiro", icon: Wallet },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();

  return (
    <Sidebar collapsible="icon" className="border-r-0">
      <div className="p-4 flex items-center gap-2">
        <img src={logo} alt="Cuida Comigo" className="w-9 h-9 object-contain" />
        {!collapsed && (
          <span className="font-display font-bold text-lg text-foreground">Cuida Comigo</span>
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
                        <item.icon className="mr-2 h-5 w-5" strokeWidth={1.5} style={isActive ? { color: "#307EC2" } : {}} />
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
          <img 
            src={elderlyProfile} 
            alt="Foto de perfil" 
            className="w-9 h-9 rounded-full object-cover"
          />
          {!collapsed && (
            <div>
              <p className="font-display font-semibold text-sm">Maria Silva</p>
              <p className="text-xs text-muted-foreground">Idosa</p>
            </div>
          )}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
