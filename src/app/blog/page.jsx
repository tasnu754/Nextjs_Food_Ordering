import Footer from "@/components/Home Page/Footer";
import {
  FaCalendar,
  FaUser,
  FaClock,
  FaArrowRight,
  FaUtensils,
  FaFire,
  FaLeaf,
  FaHeart,
  FaShare,
  FaBookmark,
} from "react-icons/fa";
import { Oswald, Roboto } from "next/font/google";
import Image from "next/image";

const roboto = Roboto({
  subsets: ["latin"],
  weight: "400",
});

const oswald = Oswald({
  subsets: ["latin"],
  weight: "600",
});
const BlogPage = () => {
  const featuredPost = {
    id: 1,
    title: "The Art of Perfect Burger Crafting: Secrets from Our Master Chef",
    excerpt:
      "Discover the techniques and ingredients that transform ordinary burgers into extraordinary culinary experiences. Learn about meat selection, seasoning secrets, and cooking methods.",
    image: "/blog1.jfif",
    author: "Chef Marco Rodriguez",
    date: "March 15, 2024",
    readTime: "8 min read",
    category: "Cooking Tips",
    tags: ["Burgers", "Cooking", "Recipes", "Techniques"],
  };

  const blogPosts = [
    {
      id: 2,
      title: "Sustainable Sourcing: How We Choose Our Ingredients",
      excerpt:
        "Exploring our commitment to local farmers and sustainable practices that bring the freshest ingredients to your table.",
      image: "/blog2.jfif",
      author: "Sarah Chen",
      date: "March 12, 2024",
      readTime: "6 min read",
      category: "Sustainability",
      featured: true,
    },
    {
      id: 3,
      title: "The Science Behind Perfect Pizza Dough",
      excerpt:
        "Understanding fermentation, gluten development, and temperature control for that perfect crispy-yet-chewy crust.",
      image: "/blog3.jfif",
      author: "Tony Bianchi",
      date: "March 10, 2024",
      readTime: "7 min read",
      category: "Food Science",
    },
    {
      id: 4,
      title: "5 Secret Sauce Recipes You Can Make at Home",
      excerpt:
        "Unlock the flavors of our most popular sauces with these easy-to-follow recipes using common kitchen ingredients.",
      image: "/blog4.jfif",
      author: "Maria Gonzalez",
      date: "March 8, 2024",
      readTime: "5 min read",
      category: "Recipes",
    },
    {
      id: 5,
      title: "The Rise of Plant-Based Fast Food",
      excerpt:
        "How vegan and vegetarian options are revolutionizing the quick-service restaurant industry and what's next.",
      image: "/blog5.jfif",
      author: "Dr. Alex Thompson",
      date: "March 5, 2024",
      readTime: "10 min read",
      category: "Trends",
    },
  ];

  const categories = [
    { name: "Cooking Tips", count: 12, icon: FaUtensils },
    { name: "Recipes", count: 8, icon: FaFire },
    { name: "Sustainability", count: 5, icon: FaLeaf },
    { name: "Food Science", count: 7, icon: FaHeart },
    { name: "Industry Trends", count: 9, icon: FaBookmark },
  ];

  const popularTags = [
    "Burgers",
    "Recipes",
    "Cooking",
    "Sustainability",
    "Local",
    "Chef Tips",
    "Food Science",
    "Pairing",
    "Vegetarian",
    "Trends",
  ];

  return (
    <div
      className={`${roboto.className} min-h-screen bg-gradient-to-br from-orange-50 to-amber-50`}
    >
      {/* Header */}
      <div className="bg-amber-800 py-20 pt-30">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1
            className={`text-5xl md:text-7xl !font-bold text-white mb-6 ${oswald.className}`}
          >
            OUR <span className="text-amber-300">BLOGS</span>
          </h1>
          <p className="text-xl text-orange-100 max-w-2xl mx-auto">
            Recipes, tips, and stories from our kitchen to yours
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content - 3 columns */}
          <div className="lg:col-span-3">
            {/* Featured Post */}
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden mb-12 group cursor-pointer hover:shadow-3xl transition-all duration-500">
              <div className="relative overflow-hidden">
                <div className="w-full h-80 relative overflow-hidden">
                  <Image
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                    priority
                  />
                </div>
                <div className="absolute top-6 left-6">
                  <span className="bg-[#642F21] text-white px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wide">
                    Featured
                  </span>
                </div>
              </div>

              <div className="p-8">
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
                  <span className="flex items-center gap-2">
                    <FaCalendar className="text-orange-500" />
                    {featuredPost.date}
                  </span>
                  <span className="flex items-center gap-2">
                    <FaUser className="text-orange-500" />
                    {featuredPost.author}
                  </span>
                  <span className="flex items-center gap-2">
                    <FaClock className="text-[#642F21]" />
                    {featuredPost.readTime}
                  </span>
                </div>

                <h2 className="text-3xl font-black text-gray-900 mb-4 leading-tight">
                  {featuredPost.title}
                </h2>

                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  {featuredPost.excerpt}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {featuredPost.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-orange-100 text-[#642F21] px-3 py-1 rounded-full text-sm font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <button className="group inline-flex items-center gap-3 bg-amber-900 hover:bg-[#642F21] text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105">
                  Read Full Article
                  <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            </div>

            {/* Blog Posts Grid */}
            <div className="grid md:grid-cols-2 gap-8">
              {blogPosts.map((post) => (
                <article
                  key={post.id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden group cursor-pointer hover:shadow-2xl transition-all duration-500"
                >
                  <div className="relative overflow-hidden">
                    <div className="w-full h-48 relative overflow-hidden">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                    {post.featured && (
                      <div className="absolute top-4 left-4">
                        <span className="bg-red-700 text-white px-3 py-1 rounded-full text-xs font-bold uppercase">
                          Popular
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="bg-orange-100 text-[#642F21] px-3 py-1 rounded-full text-sm font-medium">
                        {post.category}
                      </span>
                      <span className="flex items-center gap-1 text-sm text-gray-500">
                        <FaClock className="text-[#642F21]" />
                        {post.readTime}
                      </span>
                    </div>

                    <h3 className="text-xl font-black text-gray-900 mb-3 leading-tight group-hover:text-orange-600 transition-colors duration-300">
                      {post.title}
                    </h3>

                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-[#642F21] rounded-full flex items-center justify-center">
                          <span className="text-white text-sm font-bold">
                            {post.author
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {post.author}
                          </p>
                          <p className="text-xs text-gray-500">{post.date}</p>
                        </div>
                      </div>

                      <button className="text-amber-700 hover:text-amber-900 transition-colors duration-300">
                        <FaArrowRight />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Sidebar - 1 column */}
          <div className="lg:col-span-1 space-y-8">
            {/* Categories */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-black text-gray-900 mb-4">
                Categories
              </h3>
              <div className="space-y-3">
                {categories.map((category, index) => (
                  <button
                    key={index}
                    className="flex items-center justify-between w-full p-3 rounded-xl hover:bg-orange-50 transition-all duration-300 group"
                  >
                    <div className="flex items-center gap-3">
                      <category.icon className="text-[#642F21] text-lg" />
                      <span className="font-medium text-gray-700 group-hover:text-[#642F21]">
                        {category.name}
                      </span>
                    </div>
                    <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-sm font-medium">
                      {category.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Popular Tags */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-black text-gray-900 mb-4">
                Popular Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {popularTags.map((tag, index) => (
                  <button
                    key={index}
                    className="bg-orange-100 text-[#642F21] px-3 py-2 rounded-xl text-sm font-medium hover:bg-orange-200 transition-all duration-300 hover:scale-105"
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div className="bg-[#642F21] rounded-2xl shadow-lg p-6 text-white">
              <h3 className="text-xl font-black mb-3">Stay Updated</h3>
              <p className="text-orange-100 mb-4">
                Get the latest recipes and cooking tips delivered to your inbox.
              </p>
              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 rounded-xl !mb-8 bg-white/20 placeholder-orange-200 text-white border border-orange-300 focus:border-white focus:ring-2 focus:ring-white/50 transition-all duration-300"
                />
                <button className="w-full bg-white text-[#642F21] font-bold py-3 px-4 rounded-xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-105">
                  Subscribe Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BlogPage;
