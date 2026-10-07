CREATE TABLE public.wishes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL DEFAULT 'A friend',
  text text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT name_len CHECK (char_length(name) BETWEEN 1 AND 60),
  CONSTRAINT text_len CHECK (char_length(text) BETWEEN 1 AND 500)
);
GRANT SELECT, INSERT ON public.wishes TO anon, authenticated;
GRANT ALL ON public.wishes TO service_role;
ALTER TABLE public.wishes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read wishes" ON public.wishes FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Anyone can post wishes" ON public.wishes FOR INSERT TO anon, authenticated WITH CHECK (true);
ALTER PUBLICATION supabase_realtime ADD TABLE public.wishes;