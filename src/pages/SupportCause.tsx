import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { FooterNew } from "@/components/FooterNew";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { motion } from "framer-motion";
import { TreePine, Recycle, Droplets, Leaf, Phone, Mail, User } from "lucide-react";
import { toast } from "react-hot-toast";

const causes = [
  {
    id: "tree",
    icon: TreePine,
    title: "Plant a Tree",
    description:
      "For every 100 prints, we plant a tree in partnership with local conservation groups.",
    suggestedAmount: 50,
    color: "text-[#00C4B3]", // Jelimo teal
  },
  {
    id: "recycled",
    icon: Recycle,
    title: "Recycled Paper",
    description: "Choose 100% recycled paper for your prints and reduce environmental impact.",
    suggestedAmount: 30,
    color: "text-[#1E1E2E]", // deep navy
  },
  {
    id: "water",
    icon: Droplets,
    title: "Water Conservation",
    description:
      "Support water-saving printing technologies and sustainable ink production.",
    suggestedAmount: 40,
    color: "text-[#FF6B00]", // Jelimo orange
  },
];

export default function SupportCause() {
  const navigate = useNavigate();
  const [selectedCause, setSelectedCause] = useState("");
  const [amount, setAmount] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedCause || !amount || !customerName || !customerPhone) {
      toast.error("Please fill in all required fields");
      return;
    }

    const amountNum = parseFloat(amount);
    if (isNaN(amountNum) || amountNum < 10) {
      toast.error("Amount must be at least Ksh. 10");
      return;
    }

    setIsSubmitting(true);
    try {
      toast.success(
        `Thank you for supporting ${
          causes.find((c) => c.id === selectedCause)?.title
        }! You'll receive an M-Pesa prompt shortly.`
      );

      setSelectedCause("");
      setAmount("");
      setCustomerName("");
      setCustomerEmail("");
      setCustomerPhone("");

      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F9FAFB] dark:bg-[#0B0B0F]">
      <Header />

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          {/* HEADER */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <div className="flex items-center justify-center gap-3 mb-3">
              <Leaf className="w-10 h-10 text-[#00C4B3]" />
              <h1 className="text-3xl font-bold text-[#1E1E2E] dark:text-white">
                Support Our Environmental Causes
              </h1>
            </div>
            <p className="text-muted-foreground max-w-2xl text-sm mx-auto">
              Choose a cause that matters to you and make a difference. Every contribution
              helps us build a greener future.
            </p>
          </motion.div>

          {/* CARD */}
          <Card className="p-6 shadow-md border border-[#E5E7EB] dark:border-[#1E1E2E]/40">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Select Cause */}
              <div>
                <Label className="text-base font-semibold mb-3 block text-[#1E1E2E] dark:text-white">
                  Select a Cause
                </Label>
                <RadioGroup value={selectedCause} onValueChange={setSelectedCause}>
                  <div className="grid gap-3">
                    {causes.map((cause) => {
                      const Icon = cause.icon;
                      return (
                        <label
                          key={cause.id}
                          className={`flex items-start gap-4 p-3 rounded-lg border cursor-pointer transition-all ${
                            selectedCause === cause.id
                              ? "border-[#FF6B00] bg-[#FF6B00]/5"
                              : "border-border hover:border-[#00C4B3]"
                          }`}
                        >
                          <RadioGroupItem value={cause.id} id={cause.id} className="mt-1" />
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <Icon className={`w-5 h-5 ${cause.color}`} />
                              <h3 className="font-semibold">{cause.title}</h3>
                            </div>
                            <p className="text-sm text-muted-foreground mb-1">
                              {cause.description}
                            </p>
                            <p className="text-sm font-medium text-[#FF6B00]">
                              Suggested: Ksh. {cause.suggestedAmount}
                            </p>
                          </div>
                        </label>
                      );
                    })}
                  </div>
                </RadioGroup>
              </div>

              {/* Amount */}
              <div>
                <Label
                  htmlFor="amount"
                  className="text-base font-semibold mb-2 block text-[#1E1E2E] dark:text-white"
                >
                  Donation Amount (Ksh.)
                </Label>
                <Input
                  id="amount"
                  type="number"
                  min="10"
                  step="1"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />
              </div>

              {/* Customer Info */}
              <div className="space-y-4">
                <h3 className="text-base font-semibold text-[#1E1E2E] dark:text-white">
                  Your Information
                </h3>

                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="Your full name"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">M-Pesa Phone Number *</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="0700000000"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    You'll receive an M-Pesa prompt on this number.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email (Optional)</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Info */}
              <div className="bg-[#00C4B3]/10 p-3 rounded-lg border border-[#00C4B3]/30">
                <h3 className="font-semibold mb-1 flex items-center gap-2 text-[#1E1E2E] dark:text-white">
                  <Phone className="w-4 h-4" />
                  Payment Method: M-Pesa
                </h3>
                <p className="text-sm text-muted-foreground">
                  You will receive an M-Pesa STK push notification on your phone.
                </p>
              </div>

              {/* Buttons */}
              <div className="flex gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/")}
                  className="flex-1 border-[#1E1E2E] text-[#1E1E2E] hover:bg-[#1E1E2E]/10"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-[#FF6B00] hover:bg-[#e86000] text-white"
                >
                  {isSubmitting ? "Processing..." : "Support This Cause"}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </main>

      <FooterNew />
    </div>
  );
}
