import { useState } from "react";
import { documentos, categoriaDocumentos, getFamiliar } from "@/data/mockData";
import { FileText, Upload, Filter, Search, Calendar, User, Eye, X } from "lucide-react";

const categorias = ["todas", "receita", "exame", "laudo", "outro"] as const;

export default function DocumentosPage() {
  const [filtro, setFiltro] = useState<string>("todas");
  const [busca, setBusca] = useState("");
  const [documentoSelecionado, setDocumentoSelecionado] = useState<string | null>(null);

  const docs = documentos
    .filter(d => filtro === "todas" || d.categoria === filtro)
    .filter(d => d.nome.toLowerCase().includes(busca.toLowerCase()));

  return (
    <div className="p-4 md:p-6 max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between animate-fade-in">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">Documentos</h1>
          <p className="text-muted-foreground text-sm">Receitas, exames, laudos e outros arquivos</p>
        </div>
        <button
          className="flex items-center gap-2 px-4 py-2.5 rounded-2xl text-sm font-body font-semibold transition-all hover:scale-105"
          style={{ background: "#83B4DF", color: "#fff" }}
        >
          <Upload className="w-4 h-4" strokeWidth={1.5} />
          Enviar arquivo
        </button>
      </div>

      {/* Categoria counts */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 animate-fade-in">
        {Object.entries(categoriaDocumentos).map(([key, cat]) => {
          const count = documentos.filter(d => d.categoria === key).length;
          return (
            <button
              key={key}
              onClick={() => setFiltro(filtro === key ? "todas" : key)}
              className={`card-pastel p-4 text-left transition-all ${filtro === key ? "ring-2 scale-[1.02]" : ""}`}
              style={{
                background: `${cat.cor}20`,
                borderColor: `${cat.cor}40`,
                ...(filtro === key ? { ringColor: cat.cor } : {}),
              }}
            >
              <FileText className="w-5 h-5 mb-2" style={{ color: cat.corTexto }} strokeWidth={1.5} />
              <p className="font-display font-bold text-lg" style={{ color: cat.corTexto }}>{count}</p>
              <p className="text-xs text-muted-foreground font-body">{cat.label}</p>
            </button>
          );
        })}
      </div>

      {/* Search */}
      <div className="relative animate-fade-in">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
        <input
          value={busca}
          onChange={e => setBusca(e.target.value)}
          placeholder="Buscar documento..."
          className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-muted text-sm font-body text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/30"
        />
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 overflow-x-auto animate-fade-in">
        {categorias.map(cat => (
          <button
            key={cat}
            onClick={() => setFiltro(cat)}
            className={`px-4 py-1.5 rounded-full text-xs font-body font-semibold whitespace-nowrap transition-all ${
              filtro === cat ? "text-white" : "bg-muted text-muted-foreground"
            }`}
            style={filtro === cat ? { background: "#307EC2" } : {}}
          >
            {cat === "todas" ? "Todos" : categoriaDocumentos[cat]?.label}
          </button>
        ))}
      </div>

      {/* Documents grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 animate-fade-in" style={{ animationDelay: "200ms" }}>
        {docs.map(doc => {
          const cat = categoriaDocumentos[doc.categoria];
          const fam = getFamiliar(doc.adicionadoPor);
          return (
            <div key={doc.id} className="card-pastel p-4 bg-card flex gap-3 items-start hover:shadow-hover transition-all cursor-pointer">
              <div
                className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0"
                style={{ background: `${cat.cor}30` }}
              >
                <FileText className="w-5 h-5" style={{ color: cat.corTexto }} strokeWidth={1.5} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-body font-medium text-foreground truncate">{doc.nome}</p>
                <div className="flex items-center gap-3 mt-1.5">
                  <span
                    className="px-2 py-0.5 rounded-full text-[10px] font-semibold"
                    style={{ background: `${cat.cor}30`, color: cat.corTexto }}
                  >
                    {cat.label}
                  </span>
                  <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                    <Calendar className="w-3 h-3" strokeWidth={1.5} />
                    {doc.data}
                  </span>
                  <span className="text-[10px] text-muted-foreground">{doc.tamanho}</span>
                </div>
              </div>
              {fam && (
                <div
                  className="avatar-pastel w-7 h-7 text-[10px] flex-shrink-0"
                  style={{ background: fam.cor, color: fam.corTexto }}
                >
                  {fam.avatar}
                </div>
              )}
              {doc.url && (
                <button
                  onClick={() => setDocumentoSelecionado(doc.url as string)}
                  className="w-8 h-8 rounded-full bg-muted flex items-center justify-center self-center ml-2 transition-all hover:bg-primary/20 hover:text-primary"
                >
                  <Eye className="w-4 h-4 text-muted-foreground" />
                </button>
              )}
            </div>
          );
        })}
      </div>

      {docs.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <FileText className="w-12 h-12 mx-auto mb-3 opacity-30" strokeWidth={1.5} />
          <p className="font-body text-sm">Nenhum documento encontrado</p>
        </div>
      )}

      {/* Image Preview Modal */}
      {documentoSelecionado && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 animate-in fade-in"
          onClick={() => setDocumentoSelecionado(null)}
        >
          <div className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center">
            <button 
              className="absolute -top-10 right-0 p-2 text-white/70 hover:text-white transition-colors"
              onClick={() => setDocumentoSelecionado(null)}
            >
              <X className="w-6 h-6" />
            </button>
            <img 
              src={documentoSelecionado} 
              alt="Visualização do Documento" 
              className="max-w-full max-h-[85vh] object-contain rounded-lg border border-white/10 shadow-2xl" 
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  );
}
