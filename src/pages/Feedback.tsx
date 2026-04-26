import { Header } from "@/components/Header";
import { FooterNew } from "@/components/FooterNew";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PageTransition } from "@/components/PageTransition";
import toast from "react-hot-toast";
import feedback from "@/assets/feedback.png";


// Primary Green [#AAC832]
// Dark Green   #468C1E
const Feedback = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Thank you for your feedback!", {
      icon: "✨",
    });
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#F8FBFF] flex flex-col">
        <Header />

        <main className="flex-1 container mx-auto px-4 py-10">
          <div
            className="max-w-xl mx-auto bg-white rounded-xl shadow-md hover:shadow-lg 
                       transition-all duration-300 p-6"
          >
            {/* Image */}
            <div className="flex justify-center mb-3">
              <img
                src={feedback}
                className="w-[65px] drop-shadow-md"
                alt="Feedback illustration"
              />
            </div>

            {/* Heading */}
            <h1 className="text-3xl font-bold text-center text-[#468C1E] mb-2">
              Feedback
            </h1>
            <p className="text-center text-gray-600 mb-6 text-sm">
              We'd love to hear from you! Share your experience with us.
            </p>

            {/* Feedback Form */}
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <Label htmlFor="name" className="font-medium text-gray-700 text-sm">
                  Name
                </Label>
                <Input
                  id="name"
                  placeholder="Your name"
                  className="text-sm focus-visible:ring-[#AAC832]h-9"
                />
              </div>

              <div>
                <Label htmlFor="email" className="font-medium text-gray-700 text-sm">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  className="text-sm focus-visible:ring-[#AAC832]h-9"
                />
              </div>

              <div>
                <Label htmlFor="feedback" className="font-medium text-gray-700 text-sm">
                  Your Feedback
                </Label>
                <Textarea
                  id="feedback"
                  placeholder="Tell us what you think..."
                  rows={4}
                  className="text-sm focus-visible:ring-[#005DFF]"
                />
              </div>

              <div className="flex justify-center pt-2">
                <Button
                  className="bg-[#468C1E] hover:bg-[#AAC832] text-white font-semibold 
                             rounded-full px-6 py-2 text-xs shadow-md hover:shadow-lg transition-all"
                  type="submit"
                >
                  Submit Feedback
                </Button>
              </div>
            </form>
          </div>
        </main>

        <FooterNew />
      </div>
    </PageTransition>
  );
};

export default Feedback;
