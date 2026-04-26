-- Create advertisements table
CREATE TABLE public.advertisements (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT,
  image TEXT NOT NULL,
  link TEXT,
  animation TEXT DEFAULT 'slideRight',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.advertisements ENABLE ROW LEVEL SECURITY;

-- Anyone can view active advertisements
CREATE POLICY "Anyone can view active advertisements"
ON public.advertisements
FOR SELECT
USING (is_active = true);

-- Admins can view all advertisements
CREATE POLICY "Admins can view all advertisements"
ON public.advertisements
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

-- Admins can insert advertisements
CREATE POLICY "Admins can insert advertisements"
ON public.advertisements
FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Admins can update advertisements
CREATE POLICY "Admins can update advertisements"
ON public.advertisements
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Admins can delete advertisements
CREATE POLICY "Admins can delete advertisements"
ON public.advertisements
FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Add trigger for updated_at
CREATE TRIGGER update_advertisements_updated_at
BEFORE UPDATE ON public.advertisements
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();