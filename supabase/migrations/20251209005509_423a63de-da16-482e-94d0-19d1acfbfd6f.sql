-- Fix Security Issue 1: Orders table - restrict access to owners and admins only
-- Drop the overly permissive SELECT policy
DROP POLICY IF EXISTS "Users can view all orders" ON public.orders;

-- Create restrictive policy: users can only view their own orders, admins can view all
CREATE POLICY "Users view own orders" 
ON public.orders 
FOR SELECT 
USING (auth.uid() = user_id OR has_role(auth.uid(), 'admin'));

-- Fix Security Issue 2: Order items - restrict access based on order ownership
-- Drop the overly permissive SELECT policy
DROP POLICY IF EXISTS "Users can view all order items" ON public.order_items;

-- Create restrictive policy: users can only view items from their own orders
CREATE POLICY "Users view own order items" 
ON public.order_items 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.orders 
    WHERE orders.id = order_items.order_id 
    AND (orders.user_id = auth.uid() OR has_role(auth.uid(), 'admin'))
  )
);

-- Fix Security Issue 3: Profiles - restrict access to own profile only
-- Drop the overly permissive SELECT policy
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON public.profiles;

-- Create restrictive policy: users can only view their own profile
CREATE POLICY "Users view own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = id);