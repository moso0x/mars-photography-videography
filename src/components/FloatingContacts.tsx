import { Mail, Phone, MessageCircle } from "lucide-react";

const FloatingContacts = () => {
  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-4 z-50">

      <a
        href="https://wa.me/254704904678"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-500 p-4 rounded-full text-white shadow-xl animate-bounce hover:scale-110 transition"
      >
        <MessageCircle size={24} />
      </a>

      <a
        href="tel:+254704904678"
        className="bg-blue-500 p-4 rounded-full text-white shadow-xl hover:scale-110 transition animate-pulse"
      >
        <Phone size={24} />
      </a>

      <a
        href="mailto:jelimocreatives@gmail.com"
        className="bg-red-500 p-4 rounded-full text-white shadow-xl hover:scale-110 transition animate-bounce"
      >
        <Mail size={24} />
      </a>

    </div>
  );
};

export default FloatingContacts;
