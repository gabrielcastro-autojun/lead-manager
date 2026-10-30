import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { supabase } from "@/integrations/supabase/client";

const ETAPAS: [string, ...string[]] = ["Novo", "Contato", "Proposta", "Negociação", "Ganho", "Perdido"];

type Lead = { id: string; empresa: string; valor: number; etapa: string };

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Leads — Funil de vendas" },
      { name: "description", content: "Liste, adicione e mova seus leads entre etapas." },
      { property: "og:title", content: "Leads — Funil de vendas" },
      { property: "og:description", content: "Liste, adicione e mova seus leads entre etapas." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Index,
});

const brl = (v: number) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

function Index() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [empresa, setEmpresa] = useState("");
  const [valor, setValor] = useState("");
  const [etapa, setEtapa] = useState(ETAPAS[0]);

  const load = async () => {
    const { data } = await supabase.from("leads").select("EMPRESA, VALOR, ETAPA");
    setLeads((data ?? []).map((r) => ({ id: r.EMPRESA, empresa: r.EMPRESA, valor: Number(r.VALOR), etapa: r.ETAPA ?? ETAPAS[0] })));
  };
  useEffect(() => { load(); }, []);

  const add = async (e: FormEvent) => {
    e.preventDefault();
    if (!empresa.trim()) return;
    await supabase.from("leads").insert({ EMPRESA: empresa.trim(), VALOR: Number(valor) || 0, ETAPA: etapa });
    setEmpresa(""); setValor(""); setEtapa(ETAPAS[0]);
    load();
  };

  const mudar = async (id: string, nova: string) => {
    setLeads((ls) => ls.map((l) => (l.id === id ? { ...l, etapa: nova } : l)));
    await supabase.from("leads").update({ ETAPA: nova }).eq("EMPRESA", id);
  };

  const field = "rounded-md border border-input bg-card px-3 py-2 text-sm text-foreground";

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold text-foreground">Leads</h1>
      <p className="mt-1 text-muted-foreground">Total: {brl(leads.reduce((s, l) => s + Number(l.valor), 0))}</p>

      <form onSubmit={add} className="mt-8 grid gap-3 rounded-lg border bg-card p-4 sm:grid-cols-4">
        <input className={`${field} sm:col-span-2`} placeholder="Empresa" value={empresa} onChange={(e) => setEmpresa(e.target.value)} required />
        <input className={field} type="number" min="0" step="0.01" placeholder="Valor" value={valor} onChange={(e) => setValor(e.target.value)} />
        <select className={field} value={etapa} onChange={(e) => setEtapa(e.target.value)}>
          {ETAPAS.map((s) => <option key={s}>{s}</option>)}
        </select>
        <button className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 sm:col-span-4">
          Adicionar lead
        </button>
      </form>

      <ul className="mt-8 divide-y rounded-lg border bg-card">
        {leads.map((l) => (
          <li key={l.id} className="flex items-center justify-between gap-4 p-4">
            <div>
              <p className="font-medium text-foreground">{l.empresa}</p>
              <p className="text-sm text-muted-foreground">{brl(Number(l.valor))}</p>
            </div>
            <select className={field} value={l.etapa} onChange={(e) => mudar(l.id, e.target.value)}>
              {(ETAPAS.includes(l.etapa) ? ETAPAS : [l.etapa, ...ETAPAS]).map((s) => <option key={s}>{s}</option>)}
            </select>
          </li>
        ))}
        {leads.length === 0 && <li className="p-4 text-sm text-muted-foreground">Nenhum lead ainda.</li>}
      </ul>
    </main>
  );
}
