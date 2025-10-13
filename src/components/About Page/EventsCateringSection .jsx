import React from "react";
import { Calendar } from "lucide-react";

const EventsCateringSection = () => {
  const events = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",
      date: "MARCH 16, 2021",
      title: "NEQUE DOLOR PRIMIS A LIBERO TEMPUS A TEMPOR",
      description:
        "Mauris donec ociis et magnis sapien etiam sapien sem sagittis congue tempor a gravi donec ipsum aporta justo",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&q=80",
      date: "MARCH 16, 2021",
      title: "TEMPOR BLANDIT SAPIEN AT GRAVIDA DONEC IPSUM",
      description:
        "Mauris donec ociis et magnis sapien etiam sapien sem sagittis congue tempor a grav donec ipsum aporta justo",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800&q=80",
      date: "MARCH 16, 2021",
      title: "QUAERAT NEQUE PURUS IPSUM NEQUE DOLOR",
      description:
        "Mauris donec ociis et magnis sapien etiam sapien sem sagittis congue tempor a gravi donec ipsum aporta justo",
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
          <p className="text-gray-500 !font-light md:text-lg max-w-3xl mx-auto leading-relaxed">
            Aliquam a augue suscipit, luctus neque purus ipsum neque undo dolor
            primis libero tempus, blandit a cursus varius magna
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <div key={event.id} className="group cursor-pointer">
              {/* Image Container */}
              <div className="relative overflow-hidden mb-6 aspect-[4/3]">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
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
                <p className="text-gray-500 !font-light leading-relaxed">
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
