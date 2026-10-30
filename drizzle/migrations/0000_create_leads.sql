CREATE TABLE public.leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  empresa TEXT NOT NULL,
  valor NUMERIC NOT NULL DEFAULT 0,
  etapa TEXT NOT NULL DEFAULT 'Novo',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.leads TO anon, authenticated;
GRANT ALL ON public.leads TO service_role;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read" ON public.leads FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "public insert" ON public.leads FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "public update" ON public.leads FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
INSERT INTO public.leads (empresa, valor, etapa) VALUES
('Acme Ltda', 15000, 'Novo'),('Beta Tech', 42000, 'Proposta'),('Gama S.A.', 8000, 'Negociação');