import React from "react";
import { Calendar } from "lucide-react";
import { Roboto } from "next/font/google";
import Image from "next/image";

const roboto = Roboto({
  subsets: ["latin"],
  weight: "400",
});

const EventsCateringSection = () => {
  const events = [
    {
      id: 1,
      image: "/event1.jfif",
      date: "MARCH 16, 2025",
      title: "TRUFFLE BURGER NIGHT",
      description:
        "Exclusive gourmet burgers with black truffle aioli, wagyu beef, and special sauce. Limited edition menu with live music and craft beer pairing.",
    },
    {
      id: 2,
      image: "/event2.jfif",
      date: "MARCH 18, 2024",
      title: "PIZZA MAKING WORKSHOP",
      description:
        "Learn authentic Neapolitan pizza techniques from our master chef. Hands-on dough making, sauce preparation, and wood-fired oven cooking included.",
    },
    {
      id: 3,
      image: "/event3.jfif",
      date: "SEPTEMBER 20, 2024",
      title: "BBQ RIBS FESTIVAL",
      description:
        "Fall-off-the-bone pork ribs with signature BBQ glaze, craft beers, and live music. Unlimited sides including coleslaw and cornbread.",
    },
  ];

  return (
    <div className="bg-white py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl !md:text-6xl font-black !text-[#5C3D2E] mb-6 tracking-tight">
            EVENTS & CATERING
          </h2>
          <p
            className={`text-gray-500  md:text-lg max-w-3xl mt-4 mx-auto leading-relaxed ${roboto.className}`}
          >
            From intimate gatherings to grand celebrations, we bring
            restaurant-quality cuisine to your special moments. Custom menus,
            professional service, and unforgettable flavors tailored to your
            event.
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <div key={event.id} className="group cursor-pointer">
              {/* Image Container */}
              <div className="relative overflow-hidden mb-6 aspect-[4/3]">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover transform transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />

                {/* Date Badge */}
                <div className="absolute top-6 left-6 bg-red-600 text-white px-4 py-2 flex items-center gap-2 shadow-lg">
                  <Calendar className="w-4 h-4" />
                  <span className="text-xs font-bold tracking-wide">
                    {event.date}
                  </span>
                </div>
              </div>
              {/* Content */}
              <div>
                <h3 className="!text-[#5C3D2E] text-xl md:text-2xl font-bold mb-4 leading-tight group-hover:text-red-600 transition-colors duration-300">
                  {event.title}
                </h3>
                <p className={`text-gray-500  ${roboto.className}`}>
                  {event.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventsCateringSection;
