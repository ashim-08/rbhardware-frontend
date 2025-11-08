import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send, Navigation } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const contactInfo = [
    {
      icon: MapPin,
      title: "Address",
      details: [
        "RB Hardware And Sanitary House",
        "Saja Bajar Road, RBSH",
        "Pokhara-32, Sathmuhana",
      ],
    },
    {
      icon: Phone,
      title: "Phone",
      details: ["+977 9846223416", "+977 9804171613"],
    },
    {
      icon: Mail,
      title: "Email",
      details: ["info@rbhardware73.com"],
    },
    {
      icon: Clock,
      title: "Store Hours",
      details: ["Sun-Fri: 6:00 AM - 7:00 PM", "Saturday: 7:00 AM - 7:00 PM"],
    },
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    alert("Thank you for your message! We will get back to you soon.");
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div className="min-h-screen py-8">
      {/* Header */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
          <p className="text-xl text-primary-100">
            Get in touch with our expert team for all your hardware needs
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Contact Info Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {contactInfo.map((info, index) => {
            const IconComponent = info.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-lg shadow-sm border p-6 text-center hover:shadow-md transition-shadow"
              >
                <div className="bg-primary-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <IconComponent className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  {info.title}
                </h3>
                <div className="space-y-1">
                  {info.details.map((detail, idx) => (
                    <p key={idx} className="text-gray-600 text-sm">
                      {detail}
                    </p>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Contact Form & Map */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-sm border p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Send us a Message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="input-field"
                    placeholder="First Name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Last Name *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="input-field"
                    placeholder="Last Name"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="input-field"
                  placeholder="name@example.com"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="input-field"
                  placeholder="+977 98765 43210"
                />
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="input-field"
                  placeholder="How can we help you?"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="input-field resize-none"
                  placeholder="Tell us about your project or question..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full btn-primary inline-flex items-center justify-center"
              >
                <Send className="mr-2 h-5 w-5" />
                Send Message
              </button>
            </form>
          </div>

          {/* Map & Store Info */}
          <div className="space-y-8">
            {/* Interactive Map */}
            <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
              <div className="h-80 bg-gray-100 relative">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d277.74347252388566!2d84.09936364922734!3d28.132305983664864!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3995bdc7d50f1433%3A0x2c53da16bf2aa66e!2sRB.Hardware.%26Sanatary.House!5e1!3m2!1sen!2snp!4v1758464093170!5m2!1sen!2snp"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="RB Hardware Location"
                ></iframe>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Visit Our Store
                </h3>
                <p className="text-gray-600 mb-4">
                  Located in the heart of the main market district, our spacious
                  showroom features the latest tools and hardware supplies. Free
                  parking available for customers.
                </p>
                <div className="flex gap-3">
                  <a
                    href="https://maps.app.goo.gl/jKKcwJhSd9c5UrD96"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary inline-flex items-center"
                  >
                    <Navigation className="mr-2 h-4 w-4" />
                    Get Directions
                  </a>
                  <a
                    href="tel:+9779846223416"
                    className="btn-secondary inline-flex items-center"
                  >
                    <Phone className="mr-2 h-4 w-4" />
                    Call Now
                  </a>
                </div>
              </div>
            </div>

            {/* Store Features */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Why Visit RB Hardware?
              </h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>
                    Expert consultation from experienced professionals
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>
                    Largest selection of tools and hardware in the area
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>Competitive pricing with bulk discounts available</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>Same-day delivery for local orders</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>Free parking and easy store access</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>9+ years of trusted community service</span>
                </li>
              </ul>
            </div>

            {/* Emergency Contact */}
            <div className="bg-gradient-to-r from-accent-500 to-accent-600 text-white rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-2">Emergency Service</h3>
              <p className="text-accent-100 mb-4">
                Need urgent hardware supplies? We offer emergency service for
                critical repairs.
              </p>
              <a
                href="tel:+9779846223416"
                className="bg-white text-accent-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors inline-flex items-center"
              >
                <Phone className="mr-2 h-4 w-4" />
                Emergency Hotline
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
