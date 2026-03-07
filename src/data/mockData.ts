export const paciente = {
  nome: "Maria Oliveira",
  idade: 78,
  condicao: "Pós-cirurgia de quadril",
  medico: "Dr. Carlos Menezes",
  proximaConsulta: "2024-02-15",
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
  { id: 1, nome: "Ana Costa", relacao: "Filha", cor: "#A8C8E8", corTexto: "#4A7FA8", avatar: "AC", tarefasSemana: 8, tarefasConcluidas: 6 },
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

export const mensagensChat = [
  { id: 1, autor: 1, texto: "Bom dia! Já dei a medicação da manhã para a mãe. Ela está bem disposta hoje 😊", horario: "08:15" },
  { id: 2, autor: 3, texto: "Ótimo, Ana! Vou passar lá às 12h pro almoço e medicação da tarde.", horario: "08:30" },
  { id: 3, autor: 2, texto: "Pessoal, lembrem que amanhã tem consulta com o cardiologista às 9:30. Quem leva?", horario: "09:00" },
  { id: 4, autor: 1, texto: "Eu levo! Já está na minha agenda.", horario: "09:05" },
  { id: 5, autor: 4, texto: "Preciso comprar os medicamentos da farmácia amanhã. Alguém tem a lista atualizada?", horario: "10:20" },
  { id: 6, autor: 3, texto: "Vou te mandar a lista, Carlos. A Dra. atualizou a receita semana passada.", horario: "10:25" },
  { id: 7, autor: 2, texto: "A fisioterapia de hoje foi boa. Ela já está conseguindo dar alguns passos com o andador! 🎉", horario: "11:00" },
];

export const getFamiliar = (id: number) => familiares.find(f => f.id === id);

export const categoriaCores: Record<string, string> = {
  saude: "#A8C8E8",
  consulta: "#D4C0E8",
  compras: "#F8E8A0",
  higiene: "#B8DFC8",
  exame: "#F4C5A8",
  outro: "#E0E0E0",
};

export const statusLabels: Record<string, { label: string; color: string; bg: string }> = {
  concluida: { label: "Concluída", color: "#4A8A6A", bg: "#B8DFC8" },
  pendente: { label: "Pendente", color: "#C0724A", bg: "#F4C5A8" },
  agendada: { label: "Agendada", color: "#4A7FA8", bg: "#A8C8E8" },
};
