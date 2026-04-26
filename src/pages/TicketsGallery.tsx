import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { FooterNew } from "@/components/FooterNew";
import { motion } from "framer-motion";
import { MessageCircle, Search } from "lucide-react";
import { eventsData } from "@/data/eventsData";

export const TicketsGallery = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<"upcoming" | "past" | "all">("upcoming");

  // 🧠 Robust date parser
  const parseDate = (rawDate: string): Date | null => {
    const cleaned = rawDate
      .replace(/(\(|\)|\d+(AM|PM|am|pm)|till.*|–.*)/g, "")
      .replace(/(\d+)(st|nd|rd|th)/g, "$1")
      .replace(/(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)/gi, "")
      .trim();

    const parsed = new Date(cleaned);
    return isNaN(parsed.getTime()) ? null : parsed;
  };

  // 🗓 Prepare categorized events
  const now = new Date();
  const categorizedEvents = eventsData.map((event) => ({
    ...event,
    dateObj: parseDate(event.date),
  }));

  // 🔍 Filtering logic
  const filteredTickets = categorizedEvents
    .filter((event) => {
      if (!event.dateObj) return false; // skip if date invalid
      const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase());
      const isUpcoming = event.dateObj >= now;
      const isPast = event.dateObj < now;

      if (filter === "upcoming") return matchesSearch && isUpcoming;
      if (filter === "past") return matchesSearch && isPast;
      return matchesSearch;
    })
    .sort((a, b) => (a.dateObj! > b.dateObj! ? 1 : -1)); // sort chronologically

  // 📩 Navigation handlers
  const handleBookNow = (ticket: any) => {
    navigate(`/event/${ticket.id}`, { state: ticket });
  };

  const handleBookViaWhatsApp = (ticket: any) => {
    const phoneNumber = "254704904678";
    const message = `Hello! I’d like to book a ticket for *${ticket.title}* at Ksh ${ticket.price}. Please guide me through the booking.`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="py-8 px-4 container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8 text-brand-dark">
          Events & Tickets Booking 
          <p className="text-sm text-gray-600 pt-4"> Jelimo Creative is your trusted partner in event organization and ticketing. <br /> We plan, host, and promote exciting experiences — and now, you can seamlessly book your event tickets directly through our online portal.
       </p>
        </h2>

        {/* 🔎 Search & Filter Controls */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
          {/* Search Bar */}
          <div className="relative w-full md:w-1/2">
            <Search className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-blue"
            />
          </div>

          {/* Filter Buttons */}
          <div className="flex gap-3">
            {["upcoming", "past", "all"].map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type as any)}
                className={`px-5 py-2 rounded-full font-medium border transition-colors duration-200 ${
                  filter === type
                    ? "bg-brand-blue text-xs text-white border-brand-blue"
                    : "border-gray-300 text-gray-700 hover:bg-gray-100"
                }`}
              >
                {type === "upcoming"
                  ? "Upcoming Events"
                  : type === "past"
                  ? "Past Events"
                  : "All"}
              </button>
            ))}
          </div>
        </div>

        {/* 🎟️ Event Cards */}
        {filteredTickets.length > 0 ? (
          <div className="flex flex-wrap justify-around gap-y-6 gap-x-3">
            {filteredTickets.map((ticket, index) => (
              <motion.div
                key={ticket.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                whileHover={{ scale: 1.03 }}
                className="bg-white rounded-xl shadow-md hover:shadow-lg overflow-hidden flex flex-col transition-all duration-300 w-full sm:w-[45%] lg:w-[22%]"
              >
                {/* Image */}
                <div className="relative w-full h-72 bg-gray-100 flex items-center justify-center">
                  <img
                    src={ticket.image}
                    alt={ticket.title}
                    className="w-full h-full object-contain transition-transform duration-500 hover:scale-105"
                  />
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 justify-between p-4 text-center">
                  <div>
                    <h3 className="text-lg font-semibold mb-1 text-gray-800">
                      {ticket.title}
                    </h3>
                    <p className="text-gray-600 mb-1 text-sm">
                      Ticket Price:{" "}
                      <span className="font-medium">Ksh {ticket.price}</span>
                    </p>
                    <p className="text-xs text-gray-500">
                      Date:{" "}
                      {ticket.dateObj
                        ? ticket.dateObj.toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })
                        : "Date not available"}
                    </p>
                  </div>

                  {/* Buttons */}
                  <div className="flex flex-col sm:flex-row gap-2 mt-auto justify-center">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleBookViaWhatsApp(ticket)}
                      className="flex items-center justify-center gap-2 border border-green-500 text-green-600 hover:bg-green-500 hover:text-white font-medium px-5 py-2 rounded-full transition-colors duration-200 w-44"
                    >
                      <MessageCircle size={18} /> WhatsApp
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleBookNow(ticket)}
                      className="border border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white font-medium px-2 py-2 rounded-full transition-colors duration-200 w-36"
                    >
                      Book Now
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-10">
            No events found matching your search or filter.
          </p>
        )}
      </div>

      <FooterNew />
    </div>
  );
};
