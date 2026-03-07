import { useState } from "react";
import { mensagensChat, getFamiliar, familiares } from "@/data/mockData";
import { Send } from "lucide-react";

export default function ChatPage() {
  const [mensagens, setMensagens] = useState(mensagensChat);
  const [texto, setTexto] = useState("");

  const enviar = () => {
    if (!texto.trim()) return;
    setMensagens(prev => [...prev, {
      id: prev.length + 1,
      autor: 1,
      texto: texto.trim(),
      horario: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
    }]);
    setTexto("");
  };

  return (
    <div className="flex flex-col h-[calc(100vh-3.5rem)] md:h-[calc(100vh-3.5rem)]">
      {/* Header */}
      <div className="p-4 border-b border-card-border">
        <h1 className="font-display font-bold text-lg text-foreground">Família Costa</h1>
        <div className="flex gap-1.5 mt-1">
          {familiares.map(f => (
            <div key={f.id} className="avatar-pastel w-6 h-6 text-[8px]" style={{ background: f.cor, color: f.corTexto }}>{f.avatar}</div>
          ))}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-auto p-4 space-y-3">
        {mensagens.map(msg => {
          const fam = getFamiliar(msg.autor);
          const isMe = msg.autor === 1;
          return (
            <div key={msg.id} className={`flex gap-2 ${isMe ? "flex-row-reverse" : ""} animate-fade-in`}>
              {fam && (
                <div className="avatar-pastel w-8 h-8 text-[10px] flex-shrink-0 mt-1" style={{ background: fam.cor, color: fam.corTexto }}>
                  {fam.avatar}
                </div>
              )}
              <div className={`max-w-[75%] ${isMe ? "items-end" : ""}`}>
                {!isMe && <p className="text-[10px] font-body font-semibold mb-0.5" style={{ color: fam?.corTexto }}>{fam?.nome}</p>}
                <div
                  className="rounded-3xl px-4 py-2.5 text-sm font-body"
                  style={
                    isMe
                      ? { background: "rgba(168,200,232,0.3)", borderBottomRightRadius: 8 }
                      : { background: "hsl(var(--muted))", borderBottomLeftRadius: 8 }
                  }
                >
                  <p className="text-foreground">{msg.texto}</p>
                </div>
                <p className="text-[10px] text-muted-foreground mt-0.5 px-1">{msg.horario}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-card-border bg-card">
        <div className="flex gap-2 items-center">
          <input
            value={texto}
            onChange={e => setTexto(e.target.value)}
            onKeyDown={e => e.key === "Enter" && enviar()}
            placeholder="Digite sua mensagem..."
            className="flex-1 px-4 py-2.5 rounded-2xl bg-muted text-sm font-body text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/30"
          />
          <button
            onClick={enviar}
            className="w-10 h-10 rounded-2xl flex items-center justify-center transition-transform hover:scale-105"
            style={{ background: "linear-gradient(135deg, #A8C8E8, #D4C0E8)" }}
          >
            <Send className="w-4 h-4" style={{ color: "#4A7FA8" }} strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </div>
  );
}
