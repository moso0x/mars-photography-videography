import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { FooterNew } from "@/components/FooterNew";
import { PageTransition } from "@/components/PageTransition";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { supabase } from "@/integrations/supabase/client";
import { Smartphone, CreditCard } from "lucide-react";

const Checkout = () => {
  const { items, getTotalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState("mpesa");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    county: "",
    notes: "",
  });

  const tillNumber = "8817976";

  /* ------------------------------ AUTH CHECK ------------------------------ */
  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        toast.error("Please login to proceed with checkout");
        navigate("/auth");
        return;
      }

      setFormData((prev) => ({
        ...prev,
        email: session.user.email || "",
      }));

      setCheckingAuth(false);
    };

    checkAuth();
  }, [navigate]);

  /* ------------------------------ INPUT HANDLER ------------------------------ */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* ------------------------------ SUBMIT ORDER ------------------------------ */
  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.phone) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    setLoading(true);

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.user) return;

      const { data: order, error } = await supabase
        .from("orders")
        .insert({
          user_id: session.user.id,
          customer_name: formData.name,
          customer_email: formData.email,
          customer_phone: formData.phone,
          total_amount: getTotalPrice(),
          payment_method: paymentMethod,
          payment_status: "pending",
        })
        .select()
        .single();

      if (error) throw error;

      await supabase.from("order_items").insert(
        items.map((item) => ({
          order_id: order.id,
          product_title: item.title,
          product_price: item.price,
          quantity: item.quantity,
        }))
      );

      toast.success("Order placed successfully");
      clearCart();
      navigate("/");
    } catch (err) {
      toast.error("Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  if (checkingAuth) {
    return (
      <PageTransition>
        <div className="min-h-screen flex items-center justify-center text-xs">
          Loading...
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-slate-50 flex flex-col text-xs">
        <Header />

        <main className="container mx-auto px-4 py-8 flex-grow">
          <h1 className="font-bold mb-6 text-blue-700 text-xs">Checkout</h1>

          <div className="grid md:grid-cols-2 gap-6">
            {/* LEFT */}
            <div className="space-y-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xs text-blue-700">
                    Customer Info
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Input
                    name="name"
                    placeholder="Full Name"
                    className="text-xs h-8"
                    value={formData.name}
                    onChange={handleChange}
                  />
                  <Input
                    name="email"
                    placeholder="Email"
                    className="text-xs h-8"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  <Input
                    name="phone"
                    placeholder="Phone"
                    className="text-xs h-8"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xs text-blue-700">
                    Payment
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup
                    value={paymentMethod}
                    onValueChange={setPaymentMethod}
                    className="space-y-2"
                  >
                    <div
                      className="p-3 rounded-md bg-blue-50 hover:bg-blue-100 cursor-pointer"
                      onClick={() => setPaymentMethod("mpesa")}
                    >
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="mpesa" id="mpesa" />
                        <Label className="flex items-center gap-2 text-xs">
                          <Smartphone className="h-4 w-4 text-blue-600" />
                          <span className="font-medium text-blue-700">
                            M-Pesa
                          </span>
                        </Label>
                      </div>

                      {paymentMethod === "mpesa" && (
                        <div className="mt-3 space-y-2">
                          <Input
                            placeholder="Phone for STK push"
                            className="text-xs h-8"
                          />
                          <Button
                            size="sm"
                            className="bg-blue-600 hover:bg-blue-700 text-white text-xs h-8"
                          >
                            Send STK Push
                          </Button>

                          <div className="bg-white p-2 rounded text-center">
                            <p className="text-xs text-blue-600">
                              Till Number
                            </p>
                            <p className="font-bold text-xs text-blue-700">
                              {tillNumber}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2 p-3 rounded-md bg-slate-100 opacity-50">
                      <RadioGroupItem value="card" disabled />
                      <Label className="flex items-center gap-2 text-xs">
                        <CreditCard className="h-4 w-4 text-blue-600" />
                        Card (coming soon)
                      </Label>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>
            </div>

            {/* RIGHT */}
            <div className="space-y-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xs text-blue-700">
                    Order Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {items.map((item) => (
                    <div
                      key={item.title}
                      className="flex justify-between text-xs"
                    >
                      <span>
                        {item.title} × {item.quantity}
                      </span>
                      <span>Ksh. {item.price}</span>
                    </div>
                  ))}

                  <div className="border-t pt-2 flex justify-between font-bold text-blue-700 text-xs">
                    <span>Total</span>
                    <span>Ksh. {getTotalPrice().toLocaleString()}</span>
                  </div>

                  <Button
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs h-9"
                    onClick={handleSubmit}
                    disabled={loading}
                  >
                    {loading ? "Processing..." : "Place Order"}
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xs text-blue-700">
                    Shipping Info
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Input
                    name="address"
                    placeholder="Address"
                    className="text-xs h-8"
                    value={formData.address}
                    onChange={handleChange}
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      name="city"
                      placeholder="City"
                      className="text-xs h-8"
                      value={formData.city}
                      onChange={handleChange}
                    />
                    <Input
                      name="county"
                      placeholder="County"
                      className="text-xs h-8"
                      value={formData.county}
                      onChange={handleChange}
                    />
                  </div>
                  <Input
                    name="notes"
                    placeholder="Notes"
                    className="text-xs h-8"
                    value={formData.notes}
                    onChange={handleChange}
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </main>

        <FooterNew />
      </div>
    </PageTransition>
  );
};

export default Checkout;
