import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  ArrowRight,
  Wrench,
  Shield,
  Award,
  Users,
  Star,
  Truck,
  Clock,
  CheckCircle,
} from "lucide-react";
import api from "../utils/api";

const Home = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await api.get("/reviews");
      setReviews(response.data.slice(0, 3)); // Show only 3 reviews
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  const features = [
    {
      icon: Wrench,
      title: "Quality Tools",
      description:
        "Premium hardware tools from trusted brands for all your professional and DIY needs.",
    },
    {
      icon: Shield,
      title: "Reliable Service",
      description:
        "Over 9 years of experience serving the community with dedication and expertise.",
    },
    {
      icon: Award,
      title: "Expert Advice",
      description:
        "Our knowledgeable staff helps you find the perfect solution for any project.",
    },
    {
      icon: Users,
      title: "Customer Focus",
      description:
        "Building lasting relationships with personalized service and competitive pricing.",
    },
  ];

  const categories = [
    {
      name: "Plumbing",
      image:
        "https://tse4.mm.bing.net/th/id/OIP.F0LG9roxJoTgVzctmWxwQQHaE6?rs=1&pid=ImgDetMain&o=7&rm=3",
      count: "100+ Products",
      description:
        "Tips for choosing the right pipes and fittings for your plumbing projects, with quality products available at RB Hardware.",
    },
    {
      name: "Color",
      image:
        "https://tse4.mm.bing.net/th/id/OIP.w9rKoNjtZ98OeR9ULGr_4QHaEK?rs=1&pid=ImgDetMain&o=7&rm=3",
      count: "150+ Products",
      description:
        "Explore premium Berger paints for long-lasting, vibrant colors—perfect for all your interior and exterior painting needs at RB Hardware.",
    },
    {
      name: "building items",
      image:
        "https://th.bing.com/th/id/R.66af6c2cd03903d70a481050b9d7fc90?rik=KOJ9WAQXlmOxNg&riu=http%3a%2f%2fcement.org.au%2fwp-content%2fuploads%2f2020%2f07%2fiStock-476199756-1024x870.jpg&ehk=UmMGNWbwe3sl3AZ%2bLwmxZDaliXclTD7sZ1jg5Ndyd0o%3d&risl=&pid=ImgRaw&r=0",
      count: "30+ Products",
      description:
        "Find high-quality building materials at RB Hardware, including cement, sand, bricks, and aggregates for strong and durable construction. ",
    },
    {
      name: "tractor Digging",
      image:
        "https://tse4.mm.bing.net/th/id/OIP.90qF55QqCea2jCyOI49VKAHaE7?rs=1&pid=ImgDetMain&o=7&rm=3",
      count: "Land Digging",
      description:
        "Powerful tractors and digging equipment available at RB Hardware for efficient earthmoving, excavation, and construction tasks.",
    },
  ];

  const services = [
    {
      icon: Truck,
      title: "Free Delivery",
      description: "Free delivery on orders above Rs.2000 within city limits",
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description: "Round-the-clock customer support for urgent requirements",
    },
    {
      icon: CheckCircle,
      title: "Quality Guarantee",
      description:
        "All products come with manufacturer warranty and our quality assurance",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative text-white py-20 overflow-hidden">
        {/* Background Video */}
        <video
          className="absolute inset-0 w-full h-full object-cover opacity-70"
          src="bg-video.mp4"
          autoPlay
          loop
          muted
        ></video>
        <div className="absolute inset-0 bg-gray-800/50"></div>
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="fade-in">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Your Trusted Hardware Partner
              </h1>
              <p className="text-xl mb-8 text-primary-100 leading-relaxed">
                RB Hardware And Sanitary House - Serving the community with
                quality tools, plumbing supplies, and expert service for over
                two decades. Your one-stop solution for all hardware needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/products"
                  className="btn-primary bg-white text-primary-600 hover:bg-gray-100 inline-flex items-center justify-center"
                >
                  Browse Products
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  to="/contact"
                  className="btn-secondary border-white text-black
                  hover:bg-white hover:text-primary-600 inline-flex items-center justify-center"
                >
                  Contact Us
                </Link>
              </div>
            </div>
            <div className="relative">
              <img
                src="profile.jpg"
                alt="Hardware Store"
                className="rounded-lg shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-accent-500 text-white p-6 rounded-lg shadow-lg">
                <div className="text-3xl font-bold">9+</div>
                <div className="text-sm">Years Experience</div>
              </div>
              <div className="absolute -top-6 -right-6 bg-white text-primary-600 p-4 rounded-lg shadow-lg">
                <div className="text-2xl font-bold">5000+</div>
                <div className="text-sm">Happy Customers</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <div
                  key={index}
                  className="text-center p-6 rounded-lg border border-gray-100 hover:border-primary-200 hover:shadow-md transition-all"
                >
                  <div className="bg-primary-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="h-8 w-8 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-600">{service.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Why Choose RB Hardware?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We're committed to providing exceptional service and quality
              products that meet all your hardware and sanitary needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="bg-primary-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary-100 transition-colors">
                    <IconComponent className="h-8 w-8 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Product Categories
            </h2>
            <p className="text-xl text-gray-600">
              Explore our comprehensive range of quality hardware and sanitary
              products
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category, index) => (
              <Link
                key={index}
                to="/products"
                className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100"
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {category.name}
                  </h3>
                  <p className="text-primary-600 font-medium mb-2">
                    {category.count}
                  </p>
                  <p className="text-gray-600 text-sm">
                    {category.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-xl text-gray-600">
              Don't just take our word for it - hear from our satisfied
              customers
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {loading ? (
              <div className="col-span-3 text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto mb-2"></div>
                <p className="text-gray-500">Loading reviews...</p>
              </div>
            ) : reviews.length > 0 ? (
              reviews.map((review) => (
                <div
                  key={review._id}
                  className="bg-white rounded-lg shadow-sm border p-6"
                >
                  <div className="flex text-yellow-400 mb-4">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-current" />
                    ))}
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-2">
                    {review.title}
                  </h4>
                  <p className="text-gray-600 mb-4 italic">
                    "{review.content}"
                  </p>
                  <div>
                    <p className="font-semibold text-gray-800">
                      {review.userName}
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center py-8">
                <Star className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-600">No reviews yet</p>
                <p className="text-gray-500 text-sm">
                  Be the first to share your experience!
                </p>
              </div>
            )}
          </div>

          {reviews.length > 0 && (
            <div className="text-center mt-8">
              <Link
                to="/reviews"
                className="btn-secondary inline-flex items-center"
              >
                View All Reviews
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Share Your Experience
            </h2>
            <p className="text-xl text-gray-600">
              Help others by sharing your experience with RB Hardware
            </p>
          </div>

          <div className="text-center">
            <Link
              to="/reviews"
              className="btn-primary inline-flex items-center"
            >
              Write a Review
              <Star className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Your Next Project?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Visit our store today or contact us for expert advice and
            competitive pricing on all your hardware needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="btn-primary bg-white text-primary-600 hover:bg-gray-100"
            >
              Visit Our Store
            </Link>
            <a
              href="tel:+977 9804171613 "
              className="btn-secondary border-white text-black hover:bg-white hover:text-primary-600"
            >
              Call Now: +977 9804171613
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
