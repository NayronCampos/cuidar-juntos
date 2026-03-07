import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { MobileNav } from "@/components/MobileNav";
import { Bell } from "lucide-react";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <div className="hidden md:block">
          <AppSidebar />
        </div>
        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-14 flex items-center justify-between border-b border-card-border px-4">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="hidden md:flex" />
              <div className="md:hidden flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, #A8C8E8, #D4C0E8)" }}>
                  <span className="text-xs font-bold" style={{ color: "#4A7FA8" }}>C</span>
                </div>
                <span className="font-display font-bold text-foreground">CuidarJuntos</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="relative p-2 rounded-2xl hover:bg-muted transition-colors">
                <Bell className="w-5 h-5 text-muted-foreground" strokeWidth={1.5} />
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full text-[10px] font-bold flex items-center justify-center" style={{ background: "#F4C5A8", color: "#C0724A" }}>
                  3
                </span>
              </button>
              <div className="avatar-pastel w-8 h-8 text-xs" style={{ background: "#A8C8E8", color: "#4A7FA8" }}>
                AC
              </div>
            </div>
          </header>
          <main className="flex-1 overflow-auto pb-20 md:pb-0">
            {children}
          </main>
        </div>
        <MobileNav />
      </div>
    </SidebarProvider>
  );
}
