import { useState } from "react";
import { motion } from "framer-motion";
import {
  Camera,
  Video,
  Calendar,
  MessageSquare,
  User,
  Phone,
  ArrowLeft,
  Clock3,
  BadgeCheck,
  Sparkles
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { FooterNew } from "@/components/FooterNew";

const services = [
  { label: "Photography", icon: <Camera size={18} /> },
  { label: "Videography", icon: <Video size={18} /> },
  { label: "Both", icon: <Camera size={18} /> },
];

const eventTypes = [
  "Wedding",
  "Corporate Event",
  "Birthday",
  "Fashion Shoot",
  "Outdoor Session",
  "Studio Shoot",
];

const BookSession = () => {
  const navigate = useNavigate();

  const [selectedService, setSelectedService] = useState("");
  const [eventType, setEventType] = useState("");

  const [form, setForm] = useState({
    name: "",
    phone: "",
    date: "",
    message: "",
  });

  return (
    <>
      <Header />

      <section className="min-h-screen bg-white px-6 py-24">

        {/* Return */}
        <div className="max-w-6xl mx-auto mb-10">
          <button
            onClick={() => navigate("/")}
            className="
              inline-flex items-center gap-2
              rounded-full
              border border-gray-300
              px-5 py-3
              text-sm
              hover:bg-black
              hover:text-white
              transition
            "
          >
            <ArrowLeft size={18}/>
            Return to Website
          </button>
        </div>

        <motion.div
          initial={{opacity:0, y:40}}
          animate={{opacity:1, y:0}}
          className="
            max-w-6xl mx-auto
            grid lg:grid-cols-2
            rounded-[36px]
            overflow-hidden
            shadow-2xl
            border border-gray-100
            bg-white
          "
        >

          {/* LEFT PANEL */}
          <div className="bg-[#fafaf7] p-10 md:p-14">

            <span className="
              inline-block
              px-4 py-2
              rounded-full
              bg-[#AAC832]/15
              text-[#468C1E]
              mb-6
            ">
              Book a Creative Session
            </span>

            <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
              Let’s Plan Your
              <span className="block text-[#468C1E]">
                Next Shoot
              </span>
            </h1>

            <p className="text-gray-600 text-lg leading-relaxed mb-10">
              Reserve your photography or videography session and
              tell us about your vision. We’ll respond with availability,
              ideas and pricing.
            </p>

            <div className="space-y-5">

              <div className="bg-white rounded-3xl p-6 shadow-md flex gap-4">
                <Clock3 className="text-[#468C1E]" />
                <div>
                  <h3 className="font-semibold">
                    Fast Response
                  </h3>
                  <p className="text-sm text-gray-500">
                    Usually within 24 hours
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-6 shadow-md flex gap-4">
                <BadgeCheck className="text-[#468C1E]" />
                <div>
                  <h3 className="font-semibold">
                    Professional Planning
                  </h3>
                  <p className="text-sm text-gray-500">
                    Customized shoot guidance included
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-6 shadow-md flex gap-4">
                <Sparkles className="text-[#468C1E]" />
                <div>
                  <h3 className="font-semibold">
                    Creative Direction
                  </h3>
                  <p className="text-sm text-gray-500">
                    We help shape your concept visually
                  </p>
                </div>
              </div>

            </div>

          </div>


          {/* RIGHT FORM */}
          <div className="p-10 md:p-14">

            <h2 className="text-3xl font-bold mb-8">
              Session Details
            </h2>


            <div className="grid md:grid-cols-2 gap-6">

              <div className="relative">
                <User className="absolute left-4 top-4 text-gray-400"/>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="
                    w-full
                    pl-12 py-4
                    rounded-2xl
                    border
                    border-gray-200
                    bg-white
                    focus:border-[#AAC832]
                    outline-none
                  "
                  onChange={(e)=>
                    setForm({...form, name:e.target.value})
                  }
                />
              </div>


              <div className="relative">
                <Phone className="absolute left-4 top-4 text-gray-400"/>
                <input
                  type="text"
                  placeholder="Phone Number"
                  className="
                    w-full
                    pl-12 py-4
                    rounded-2xl
                    border border-gray-200
                    focus:border-[#AAC832]
                    outline-none
                  "
                  onChange={(e)=>
                    setForm({...form, phone:e.target.value})
                  }
                />
              </div>


              <div className="relative">
                <Calendar className="absolute left-4 top-4 text-gray-400"/>
                <input
                  type="date"
                  className="
                    w-full
                    pl-12 py-4
                    rounded-2xl
                    border border-gray-200
                    focus:border-[#AAC832]
                    outline-none
                  "
                  onChange={(e)=>
                    setForm({...form, date:e.target.value})
                  }
                />
              </div>


              <select
                className="
                  w-full
                  px-4 py-4
                  rounded-2xl
                  border border-gray-200
                  focus:border-[#AAC832]
                  outline-none
                "
                onChange={(e)=>setEventType(e.target.value)}
              >
                <option value="">
                  Select Event Type
                </option>

                {eventTypes.map((event)=>(
                  <option key={event}>
                    {event}
                  </option>
                ))}
              </select>

            </div>


            {/* SERVICES */}
            <div className="mt-10">
              <h3 className="font-semibold mb-4">
                Select Service
              </h3>

              <div className="flex flex-wrap gap-4">
                {services.map((service)=>(
                  <motion.button
                    key={service.label}
                    whileHover={{scale:1.03}}
                    whileTap={{scale:0.98}}
                    onClick={()=>
                      setSelectedService(service.label)
                    }
                    className={`
                      flex items-center gap-2
                      px-6 py-3
                      rounded-full
                      border
                      transition
                      ${
                        selectedService===service.label
                          ? "bg-[#AAC832] text-black border-[#AAC832]"
                          : "border-gray-300"
                      }
                    `}
                  >
                    {service.icon}
                    {service.label}
                  </motion.button>
                ))}
              </div>
            </div>


            {/* MESSAGE */}
            <div className="mt-10 relative">
              <MessageSquare className="absolute left-4 top-4 text-gray-400"/>

              <textarea
                placeholder="Tell us about your vision..."
                className="
                  w-full
                  pl-12 py-4
                  rounded-2xl
                  border border-gray-200
                  h-36
                  focus:border-[#AAC832]
                  outline-none
                "
                onChange={(e)=>
                  setForm({
                    ...form,
                    message:e.target.value
                  })
                }
              />
            </div>


            {/* SUBMIT */}
            <div className="mt-10">

              <Button
                className="
                  w-full
                  bg-black
                  text-white
                  rounded-full
                  py-6
                  text-lg
                  hover:bg-[#AAC832]
                  hover:text-black
                  transition
                "
              >
                Submit Booking
              </Button>

              <p className="text-center text-sm text-gray-500 mt-4">
                We respond within 24 hours with availability & pricing.
              </p>

            </div>

          </div>

        </motion.div>

      </section>

      <FooterNew />
    </>
  );
};

export default BookSession;