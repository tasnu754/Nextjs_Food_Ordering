import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaUtensils,
  FaHeadset,
} from "react-icons/fa";

const ContactPageWithRealMap = () => {
  // ... (same contactInfo and faqs arrays as above)

  return (
    <div className="min-h-[30vh] rounded relative">
      {/* Real Map Container */}
      <div className="absolute inset-0 bg-gray-800 rounded">
        {/* Google Maps Embed */}
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.177631294987!2d-73.98784428459418!3d40.72563597933033!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a3c1dc7b07%3A0x9ee3b3a5b0f5b3b!2s123%20Food%20St%2C%20New%20York%2C%20NY%2010002!5e0!3m2!1sen!2sus!4v1234567890"
          width="100%"
          height="100%"
          style={{
            border: 0,
            filter: "grayscale(100%) invert(90%) hue-rotate(180deg)",
          }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="opacity-40"
        ></iframe>
      </div>

      {/* Rest of the content remains the same as the first example */}
      <div className="relative z-10">
        {/* ... same content structure as above ... */}
      </div>
    </div>
  );
};

export default ContactPageWithRealMap;
