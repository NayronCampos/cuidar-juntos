export const paciente = {
  nome: "Maria das Graças",
  idade: 78,
  condicao: "Alzheimer leve + Hipertensão",
  medico: "Dr. Carlos Menezes",
  proximaConsulta: "2024-02-15",
  tipoSanguineo: "O+",
  diagnosticos: [
    { nome: "Alzheimer leve", dataDeteccao: "2022-03-10", medico: "Dra. Fernanda Lima", observacao: "Estágio inicial, acompanhamento semestral" },
    { nome: "Hipertensão arterial", dataDeteccao: "2018-06-20", medico: "Dr. Carlos Menezes", observacao: "Controlada com medicação diária" },
    { nome: "Osteoporose", dataDeteccao: "2020-11-15", medico: "Dr. Ricardo Santos", observacao: "Suplementação de cálcio e vitamina D" },
  ],
  alergias: [
    { substancia: "Dipirona", tipo: "Medicamento", gravidade: "Moderada" },
    { substancia: "Camarão", tipo: "Alimento", gravidade: "Leve" },
    { substancia: "Látex", tipo: "Material", gravidade: "Leve" },
  ],
  medicacoes: [
    { nome: "Donepezila 5mg", horario: "08:00", frequencia: "Diário" },
    { nome: "Losartana 50mg", horario: "08:00", frequencia: "Diário" },
    { nome: "Hidroclorotiazida 25mg", horario: "08:00", frequencia: "Diário" },
    { nome: "Cálcio + Vit D", horario: "12:00", frequencia: "Diário" },
  ],
};

export interface Familiar {
  id: number;
  nome: string;
  relacao: string;
  cor: string;
  corTexto: string;
  avatar: string;
  tarefasSemana: number;
  tarefasConcluidas: number;
}

export const familiares: Familiar[] = [
  { id: 1, nome: "Ana Costa", relacao: "Filha", cor: "#83B4DF", corTexto: "#307EC2", avatar: "AC", tarefasSemana: 8, tarefasConcluidas: 6 },
  { id: 2, nome: "Pedro Costa", relacao: "Filho", cor: "#B8DFC8", corTexto: "#4A8A6A", avatar: "PC", tarefasSemana: 5, tarefasConcluidas: 3 },
  { id: 3, nome: "Lucia Ramos", relacao: "Filha", cor: "#F4C5A8", corTexto: "#C0724A", avatar: "LR", tarefasSemana: 7, tarefasConcluidas: 7 },
  { id: 4, nome: "Carlos Costa", relacao: "Filho", cor: "#D4C0E8", corTexto: "#7A5AA8", avatar: "CC", tarefasSemana: 4, tarefasConcluidas: 2 },
];

export interface Tarefa {
  id: number;
  titulo: string;
  responsavel: number;
  data: string;
  horario: string;
  categoria: string;
  status: string;
  recorrente: boolean;
}

export const tarefas: Tarefa[] = [
  { id: 1, titulo: "Medicação manhã", responsavel: 1, data: "hoje", horario: "08:00", categoria: "saude", status: "concluida", recorrente: true },
  { id: 2, titulo: "Fisioterapia", responsavel: 2, data: "hoje", horario: "10:00", categoria: "saude", status: "pendente", recorrente: false },
  { id: 3, titulo: "Medicação tarde", responsavel: 3, data: "hoje", horario: "14:00", categoria: "saude", status: "pendente", recorrente: true },
  { id: 4, titulo: "Consulta cardiologista", responsavel: 1, data: "amanhã", horario: "09:30", categoria: "consulta", status: "agendada", recorrente: false },
  { id: 5, titulo: "Compras farmácia", responsavel: 4, data: "amanhã", horario: "11:00", categoria: "compras", status: "agendada", recorrente: false },
  { id: 6, titulo: "Banho e higiene", responsavel: 2, data: "hoje", horario: "09:00", categoria: "higiene", status: "concluida", recorrente: true },
  { id: 7, titulo: "Almoço e medicação", responsavel: 3, data: "hoje", horario: "12:00", categoria: "saude", status: "concluida", recorrente: true },
  { id: 8, titulo: "Exame de sangue", responsavel: 1, data: "sex", horario: "07:00", categoria: "exame", status: "agendada", recorrente: false },
];

export const despesas = [
  { id: 1, data: "2024-02-01", descricao: "Medicamentos mensais", categoria: "Medicamentos", valor: 320, pagoPor: 1 },
  { id: 2, data: "2024-02-03", descricao: "Consulta cardiologista", categoria: "Consultas", valor: 280, pagoPor: 3 },
  { id: 3, data: "2024-02-05", descricao: "Cuidadora — semana 1", categoria: "Cuidador", valor: 400, pagoPor: 2 },
  { id: 4, data: "2024-02-07", descricao: "Fraldas geriátricas", categoria: "Outros", valor: 90, pagoPor: 4 },
  { id: 5, data: "2024-02-10", descricao: "Alimentação especial", categoria: "Alimentação", valor: 150, pagoPor: 1 },
];

export interface Documento {
  id: number;
  nome: string;
  categoria: "receita" | "exame" | "laudo" | "outro";
  data: string;
  tamanho: string;
  adicionadoPor: number;
  url?: string;
}

export const documentos: Documento[] = [
  { id: 1, nome: "Receita - Donepezila 5mg", categoria: "receita", data: "2024-02-01", tamanho: "245 KB", adicionadoPor: 1, url: "/receita.jpg" },
  { id: 2, nome: "Receita - Losartana 50mg", categoria: "receita", data: "2024-01-15", tamanho: "198 KB", adicionadoPor: 3 },
  { id: 3, nome: "Hemograma completo - Jan/24", categoria: "exame", data: "2024-01-20", tamanho: "1.2 MB", adicionadoPor: 1, url: "/hemograma.png" },
  { id: 4, nome: "Tomografia craniana", categoria: "exame", data: "2023-12-10", tamanho: "4.5 MB", adicionadoPor: 2 },
  { id: 5, nome: "Ecocardiograma", categoria: "exame", data: "2024-01-28", tamanho: "2.1 MB", adicionadoPor: 1, url: "/ecocardiograma.jpg" },
  { id: 6, nome: "Laudo neurológico - Alzheimer", categoria: "laudo", data: "2022-03-10", tamanho: "320 KB", adicionadoPor: 3 },
  { id: 7, nome: "Laudo cardiológico", categoria: "laudo", data: "2024-01-30", tamanho: "280 KB", adicionadoPor: 1 },
  { id: 8, nome: "Cartão do plano de saúde", categoria: "outro", data: "2024-01-01", tamanho: "150 KB", adicionadoPor: 4 },
  { id: 9, nome: "Procuração para saúde", categoria: "outro", data: "2023-06-15", tamanho: "890 KB", adicionadoPor: 1 },
];

export const categoriaDocumentos: Record<string, { label: string; cor: string; corTexto: string }> = {
  receita: { label: "Receitas", cor: "#83B4DF", corTexto: "#307EC2" },
  exame: { label: "Exames", cor: "#B8DFC8", corTexto: "#4A8A6A" },
  laudo: { label: "Laudos", cor: "#D4C0E8", corTexto: "#7A5AA8" },
  outro: { label: "Outros", cor: "#F4C5A8", corTexto: "#C0724A" },
};

export const getFamiliar = (id: number) => familiares.find(f => f.id === id);

export const categoriaCores: Record<string, string> = {
  saude: "#83B4DF",
  consulta: "#D4C0E8",
  compras: "#F8E8A0",
  higiene: "#B8DFC8",
  exame: "#F4C5A8",
  outro: "#E0E0E0",
};

export const statusLabels: Record<string, { label: string; color: string; bg: string }> = {
  concluida: { label: "Concluída", color: "#4A8A6A", bg: "#B8DFC8" },
  pendente: { label: "Pendente", color: "#C0724A", bg: "#F4C5A8" },
  agendada: { label: "Agendada", color: "#307EC2", bg: "#83B4DF" },
};
