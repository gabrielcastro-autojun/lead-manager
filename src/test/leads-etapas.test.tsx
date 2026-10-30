import { render, screen, waitFor, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

const { from } = vi.hoisted(() => {
  const from = vi.fn(() => ({
    select: vi.fn(async () => ({
      data: [
        { EMPRESA: "empresa 1", VALOR: 5000, ETAPA: "Novo" },
        { EMPRESA: "empresa 3 supabase", VALOR: 300, ETAPA: null },
      ],
    })),
    insert: vi.fn(async () => ({})),
    update: vi.fn(() => ({ eq: vi.fn(async () => ({})) })),
  }));
  return { from };
});

vi.mock("@/integrations/supabase/client", () => ({ supabase: { from } }));

import { Route } from "@/routes/index";

const Page = Route.options.component as unknown as () => React.ReactElement;

const ETAPAS_PERMITIDAS = ["Novo", "Em contato", "Fechado"];

describe("Etapas do lead", () => {
  it("oferece exatamente Novo, Em contato e Fechado em todos os seletores", async () => {
    render(<Page />);
    await waitFor(() => expect(screen.getByText("empresa 1")).toBeInTheDocument());

    const selects = screen.getAllByRole("combobox");
    expect(selects.length).toBeGreaterThanOrEqual(2);

    for (const select of selects) {
      const options = within(select).getAllByRole("option").map((o) => o.textContent);
      expect(options).toEqual(ETAPAS_PERMITIDAS);
    }
  });

  it("não deixa uma etapa fora da lista sumir da linha do lead", async () => {
    from.mockImplementationOnce(() => ({
      select: vi.fn(async () => ({ data: [{ EMPRESA: "legada", VALOR: 10, ETAPA: "Proposta" }] })),
      insert: vi.fn(async () => ({})),
      update: vi.fn(() => ({ eq: vi.fn(async () => ({})) })),
    }));

    render(<Page />);
    await waitFor(() => expect(screen.getByText("legada")).toBeInTheDocument());

    const linha = screen.getByText("legada").closest("li") as HTMLElement;
    const options = within(within(linha).getByRole("combobox")).getAllByRole("option").map((o) => o.textContent);
    expect(options).toEqual(["Proposta", ...ETAPAS_PERMITIDAS]);
  });
});
