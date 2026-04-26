import { Star } from "lucide-react";

const reviews = [
  {
    name: "Sarah Johnson",
    rating: 5,
    comment: "Excellent quality prints! Very professional service and fast delivery.",
    date: "2 weeks ago",
    avatar: "https://i.pravatar.cc/40?img=1",
  },
  {
    name: "David Kimani",
    rating: 5,
    comment: "Best printing service in Nairobi. Highly recommend for business cards!",
    date: "1 month ago",
    avatar: "https://i.pravatar.cc/40?img=2",
  },
  {
    name: "Grace Wanjiru",
    rating: 5,
    comment: "Amazing work on our wedding invitations. Thank you so much!",
    date: "3 weeks ago",
    avatar: "https://i.pravatar.cc/40?img=3",
  },
  {
    name: "Michael Ochieng",
    rating: 4,
    comment: "Great quality and reasonable prices. Will definitely come back.",
    date: "1 week ago",
    avatar: "https://i.pravatar.cc/40?img=4",
  },
  {
    name: "Patricia Akinyi",
    rating: 5,
    comment: "Professional team and beautiful results. Very satisfied with the mugs!",
    date: "2 months ago",
    avatar: "https://i.pravatar.cc/40?img=5",
  },
  {
    name: "John Mwangi",
    rating: 5,
    comment: "Fast turnaround and excellent customer service. Highly recommended!",
    date: "3 days ago",
    avatar: "https://i.pravatar.cc/40?img=6",
  },
  {
    name: "Lucy Wambui",
    rating: 5,
    comment: "Perfect quality for our company letterheads. Very impressed!",
    date: "1 month ago",
    avatar: "https://i.pravatar.cc/40?img=7",
  },
  {
    name: "James Otieno",
    rating: 5,
    comment: "Outstanding print quality and great attention to detail.",
    date: "2 weeks ago",
    avatar: "https://i.pravatar.cc/40?img=8",
  },
];

const ReviewCard = ({ name, rating, comment, date, avatar }: typeof reviews[0]) => (
  <div
    className="flex-shrink-0 w-80 bg-white border border-[#005DFF]/30 
               rounded-xl p-6 mx-4 shadow-sm hover:shadow-lg transition-all 
               duration-300 hover:border-[#00D45A]/50"
  >
    <div className="flex items-center gap-3 mb-3">
      {/* Profile Image */}
      <img
        src={avatar}
        alt={name}
        className="w-10 h-10 rounded-full object-cover"
      />
      {/* Rating Stars */}
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-5 w-5 ${
              i < rating ? "text-[#FF5B2E] fill-[#FF5B2E]" : "text-gray-300"
            }`}
          />
        ))}
      </div>
    </div>

    <p className="text-gray-700 mb-3 leading-relaxed line-clamp-3">
      {comment}
    </p>

    <div className="flex items-center justify-between text-sm">
      <p className="font-semibold text-[#005DFF]">{name}</p>
      <p className="text-gray-500">{date}</p>
    </div>
  </div>
);

export const RatingsSection = () => {
  const duplicatedReviews = [...reviews, ...reviews];

  return (
    <section className="py-16 bg-[#F8FBFF] overflow-hidden">
      <div className="container mx-auto px-4 mb-8 text-center">
        <h2 className="text-3xl font-extrabold text-[#005DFF] mb-2">
          What Our Customers Say
        </h2>
        <p className="text-gray-600">
          Trusted by hundreds of satisfied clients
        </p>
        <div className="w-24 h-1 bg-[#00D45A] mx-auto mt-3 rounded-full" />
      </div>

      <div className="relative">
        <div className="flex animate-marquee-rtl text-xs">
          {duplicatedReviews.map((review, index) => (
            <ReviewCard key={index} {...review} />
          ))}
        </div>

        {/* Soft gradient overlay edges */}
        <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#F8FBFF] to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#F8FBFF] to-transparent pointer-events-none" />
      </div>
    </section>
  );
};
