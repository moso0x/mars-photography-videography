import { useLocation } from "react-router-dom";
import { useState } from "react";

export const PaymentPage = () => {
  const location = useLocation();
  const ticket = location.state;
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();

    // Here you'd call your backend M-Pesa API (Daraja, etc.)
    alert(`Payment initiated for ${ticket?.title}.\nReceipt will be sent to ${email}.`);
  };

  if (!ticket)
    return <p className="text-center mt-10 text-gray-600">No ticket selected.</p>;

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50 px-4">
      <form
        onSubmit={handlePayment}
        className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-brand-dark">
          Complete Your Booking
        </h2>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Event
          </label>
          <input
            type="text"
            value={ticket.title}
            disabled
            className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-100"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Email Address
          </label>
          <input
            type="email"
            required
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">
            M-Pesa Number
          </label>
          <input
            type="tel"
            required
            placeholder="07XXXXXXXX"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-brand-blue hover:bg-brand-green text-white font-semibold py-2 rounded transition-colors"
        >
          Pay Ksh {ticket.price}
        </button>
      </form>
    </div>
  );
};
