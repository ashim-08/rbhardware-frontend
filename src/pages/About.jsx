import { Award, Users, Clock, MapPin } from "lucide-react";

const About = () => {
  const milestones = [
    {
      year: "2073",
      title: "Store Founded",
      description: "Started as a small family business",
    },
    {
      year: "2074",
      title: "Expanded Inventory",
      description: "Added plumbing and electrical supplies",
    },
    {
      year: "2078",
      title: "Modern Upgrade",
      description: "Renovated store with latest facilities",
    },
    {
      year: "2080",
      title: "Online Growth",
      description: "Expanded digital services and delivery",
    },
    {
      year: "2082",
      title: "Digital Presence",
      description: "Launched online catalog and ordering",
    },
  ];

  return (
    <div className="min-h-screen py-8">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            About RB Hardware
          </h1>
          <p className="text-xl text-primary-100">
            Building trust, one project at a time since 2000
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Our Story
              </h2>
              <p className="text-gray-600 mb-4">
                RB Hardware And Sanitary House began as a vision to serve our
                community with quality tools, hardware, and plumbing supplies.
                What started as a small family-owned business has grown into the
                region's most trusted hardware destination.
              </p>
              <p className="text-gray-600 mb-4">
                For over two decades, we've been committed to providing not just
                products, but solutions. Our experienced team understands that
                every project is unique, and we take pride in helping our
                customers find exactly what they need.
              </p>
              <p className="text-gray-600">
                From professional contractors to weekend DIY enthusiasts, we
                serve everyone with the same dedication to quality and service
                that has made us a cornerstone of the community.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img
                src="shop.jpg"
                alt="Hardware store interior"
                className="rounded-lg shadow-lg"
              />
              <img
                src="profile.jpg"
                alt="Owner"
                className="rounded-lg shadow-lg mt-8"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="card">
              <Award className="h-12 w-12 text-primary-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-800 mb-2">9+</div>
              <div className="text-gray-600">Years of Service</div>
            </div>
            <div className="card">
              <Users className="h-12 w-12 text-primary-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-800 mb-2">5000+</div>
              <div className="text-gray-600">Happy Customers</div>
            </div>
            <div className="card">
              <Clock className="h-12 w-12 text-primary-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-800 mb-2">500+</div>
              <div className="text-gray-600">Products Available</div>
            </div>
            <div className="card">
              <MapPin className="h-12 w-12 text-primary-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-800 mb-2">1</div>
              <div className="text-gray-600">Convenient Location</div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Our Journey
          </h2>
          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex items-center space-x-6">
                <div className="flex-shrink-0 w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold">
                  {milestone.year}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {milestone.title}
                  </h3>
                  <p className="text-gray-600">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-primary-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Our Values
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Quality
              </h3>
              <p className="text-gray-600">
                We source only the highest quality products from trusted
                manufacturers to ensure our customers get the best value for
                their investment.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Service
              </h3>
              <p className="text-gray-600">
                Our knowledgeable team is always ready to provide expert advice
                and personalized service to help you complete your projects
                successfully.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Reliability
              </h3>
              <p className="text-gray-600">
                Count on us for consistent availability, fair pricing, and
                dependable service that has earned the trust of our community
                for over 9 years.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
