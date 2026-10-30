GRANT SELECT, INSERT, UPDATE ON public.leads TO anon, authenticated;
GRANT ALL ON public.leads TO service_role;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read leads" ON public.leads FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Public insert leads" ON public.leads FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Public update leads" ON public.leads FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);