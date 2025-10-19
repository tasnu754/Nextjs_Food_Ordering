import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaUtensils,
  FaHeadset,
} from "react-icons/fa";
import { Oswald, Roboto } from "next/font/google";
import ContactPageWithRealMap from "@/components/Contact Page/ContactPageWithRealMap ";

const oswald = Oswald({
  subsets: ["latin"],
  weight: "500",
});
const roboto = Roboto({
  subsets: ["latin"],
  weight: "400",
});

const ContactPage = () => {
  const contactInfo = [
    {
      icon: FaPhone,
      title: "Call Us",
      details: "+0103-4729823",
      subtitle: "Mon-Sun: 7am-11pm",
      color: "from-orange-500 to-red-500",
    },
    {
      icon: FaEnvelope,
      title: "Email Us",
      details: "tasnu@gmail.com",
      subtitle: "We reply within 2 hours",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: FaMapMarkerAlt,
      title: "Visit Us",
      details: "Jatrabari, Dhaka",
      subtitle: "Come taste the magic",
      color: "from-green-500 to-teal-500",
    },
    {
      icon: FaClock,
      title: "Opening Hours",
      details: "7:00 AM - 11:00 PM",
      subtitle: "Every day of the week",
      color: "from-blue-500 to-cyan-500",
    },
  ];

  const faqs = [
    {
      question: "How long does delivery take?",
      answer:
        "Typically 25-40 minutes depending on your location and order size.",
    },
    {
      question: "Do you offer vegetarian options?",
      answer:
        "Yes! We have a wide range of delicious vegetarian and vegan burgers.",
    },
    {
      question: "Can I modify my burger?",
      answer:
        "Absolutely! Customize your burger with our build-your-own options.",
    },
    {
      question: "What's your cancellation policy?",
      answer:
        "You can cancel your order within 5 minutes of placing it for a full refund.",
    },
  ];

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 ${roboto.className}`}
    >
      <div className="relative bg-gradient-to-r from-orange-600 to-red-600 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/5 rounded-full -translate-x-40 translate-y-40"></div>

        <div className="relative max-w-6xl mx-auto px-4 text-center pt-12">
          <h1
            className={`!text-5xl md:text-7xl !font-extrabold  text-white mb-6 ${oswald.className}`}
          >
            GET IN <span className="text-amber-300">TOUCH</span>
          </h1>
          <p className="text-xl text-orange-100 max-w-2xl mx-auto">
            We're here to serve you the best burgers in town. Have questions?
            We've got answers!
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16 -mt-10 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-12">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-orange-100 rounded-2xl">
                <FaUtensils className="text-2xl text-orange-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800">
                Send us a Message
              </h2>
            </div>

            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-2xl border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-300"
                    placeholder="Tasnuva"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-2xl border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-300"
                    placeholder="Islam"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 rounded-2xl border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-300"
                  placeholder="tasnu@gmail.com"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Subject
                </label>
                <select className="w-full px-4 py-3 rounded-2xl border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-300">
                  <option>General Inquiry</option>
                  <option>Delivery Issue</option>
                  <option>Custom Order</option>
                  <option>Feedback</option>
                  <option>Complaint</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  rows={5}
                  className="w-full px-4 py-3 rounded-2xl border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-300 resize-none"
                  placeholder="Tell us how we can help you..."
                ></textarea>
              </div>
              <div className="flex justify-center items-center ">
                <button
                  className={`flex justify-center items-center !text-2xl gap-2 py-2 px-6 lg:px-12 ${oswald.className} text-[#642F21] hover:bg-[#642F21] hover:text-white border-2 border-[#642F21]  rounded-xl transition-colors duration-400`}
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>

          <div className="space-y-8">
            <div className="grid md:grid-cols-2 gap-6">
              {contactInfo.map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:transform hover:scale-105"
                >
                  <div
                    className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${item.color} mb-4`}
                  >
                    <item.icon className="text-2xl text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-lg font-semibold text-gray-900 mb-1">
                    {item.details}
                  </p>
                  <p className="text-sm text-gray-600">{item.subtitle}</p>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-3xl shadow-xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-orange-100 rounded-xl">
                  <FaHeadset className="text-xl text-orange-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Quick Answers
                </h2>
              </div>

              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="border-l-4 border-orange-500 pl-4 py-2"
                  >
                    <h3 className="font-semibold text-gray-800 mb-1">
                      {faq.question}
                    </h3>
                    <p className="text-sm text-gray-600">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>

            <ContactPageWithRealMap></ContactPageWithRealMap>
          </div>
        </div>
      </div>

      <div className="bg-[#642F21] py-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl !font-bold text-white mb-4">
            HUNGRY? ORDER NOW!
          </h2>
          <p className="text-orange-100 text-lg mb-6">
            Get your favorite burgers delivered hot and fresh to your doorstep
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-[#642F21] font-bold py-3 px-8 rounded-2xl hover:bg-gray-100 transform hover:scale-105 transition-all duration-300">
              Order Online
            </button>
            <button className="border-2 border-white text-white font-bold py-3 px-8 rounded-2xl  transform hover:scale-105 transition-all duration-300">
              Download App
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
