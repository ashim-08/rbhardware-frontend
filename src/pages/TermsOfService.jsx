import { FileText, ShoppingCart, Shield, AlertTriangle, Scale } from 'lucide-react';

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-sm border p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <FileText className="h-16 w-16 text-primary-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Terms of Service</h1>
            <p className="text-gray-600">Last updated: January 2024</p>
          </div>

          <div className="prose max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Agreement to Terms</h2>
              <p className="text-gray-600 mb-4">
                By accessing and using the services of RB Hardware And Sanitary House, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                <ShoppingCart className="h-6 w-6 mr-2 text-primary-600" />
                Products and Services
              </h2>
              <p className="text-gray-600 mb-4">
                RB Hardware And Sanitary House provides construction materials, plumbing supplies, tools, and related services. We strive to provide accurate product descriptions and pricing, but we reserve the right to:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Modify or discontinue products without prior notice</li>
                <li>Correct pricing errors or inaccuracies</li>
                <li>Limit quantities available for purchase</li>
                <li>Refuse service to any customer at our discretion</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Ordering and Payment</h2>
              <p className="text-gray-600 mb-4">
                When you place an order with us, you agree to the following terms:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>All orders are subject to acceptance and availability</li>
                <li>Payment is required at the time of purchase or delivery</li>
                <li>We accept cash, bank transfers, and digital payments</li>
                <li>Prices are subject to change without notice</li>
                <li>You are responsible for providing accurate delivery information</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Delivery and Installation</h2>
              <p className="text-gray-600 mb-4">
                For delivery and installation services:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Delivery times are estimates and may vary due to weather or other factors</li>
                <li>Additional charges may apply for delivery to remote locations</li>
                <li>Installation services are provided by qualified professionals</li>
                <li>Customer must provide safe and accessible work environment</li>
                <li>We offer excavation services through our tractor and driver (Lalit)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Returns and Exchanges</h2>
              <p className="text-gray-600 mb-4">
                Our return and exchange policy includes:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Products must be returned in original condition within 7 days</li>
                <li>Custom or special-order items may not be returnable</li>
                <li>Customer is responsible for return shipping costs</li>
                <li>Refunds will be processed within 5-7 business days</li>
                <li>Defective products will be replaced or refunded at no charge</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                <Shield className="h-6 w-6 mr-2 text-primary-600" />
                Warranties and Disclaimers
              </h2>
              <p className="text-gray-600 mb-4">
                Product warranties and disclaimers:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Products are covered by manufacturer warranties where applicable</li>
                <li>We provide additional warranty on our installation services</li>
                <li>Warranty does not cover damage due to misuse or normal wear</li>
                <li>We are not liable for consequential or incidental damages</li>
                <li>Our liability is limited to the purchase price of the product</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                <AlertTriangle className="h-6 w-6 mr-2 text-primary-600" />
                Safety and Compliance
              </h2>
              <p className="text-gray-600 mb-4">
                Safety is our priority. Customers agree to:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Use products according to manufacturer instructions</li>
                <li>Provide proper safety equipment and measures during installation</li>
                <li>Comply with local building codes and regulations</li>
                <li>Obtain necessary permits for construction work</li>
                <li>Allow our team to work in safe conditions</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">User Accounts</h2>
              <p className="text-gray-600 mb-4">
                If you create an account with us:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>You are responsible for maintaining account security</li>
                <li>Provide accurate and current information</li>
                <li>Notify us immediately of any unauthorized use</li>
                <li>You are responsible for all activities under your account</li>
                <li>We may suspend or terminate accounts that violate these terms</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Intellectual Property</h2>
              <p className="text-gray-600 mb-4">
                All content on our website and materials are protected by intellectual property laws:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Trademarks and logos are property of their respective owners</li>
                <li>Website content may not be reproduced without permission</li>
                <li>Product images and descriptions are for reference only</li>
                <li>We respect the intellectual property rights of others</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                <Scale className="h-6 w-6 mr-2 text-primary-600" />
                Governing Law
              </h2>
              <p className="text-gray-600 mb-4">
                These terms are governed by the laws of Nepal:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Disputes will be resolved under Nepalese law</li>
                <li>Local courts in Kaski District have jurisdiction</li>
                <li>We will attempt to resolve disputes through mediation first</li>
                <li>These terms supersede any previous agreements</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact Information</h2>
              <p className="text-gray-600 mb-4">
                For questions about these terms of service, contact us:
              </p>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-700"><strong>RB Hardware And Sanitary House</strong></p>
                <p className="text-gray-600">Owners: Ramraj Adhikari & Sarala Adhikari</p>
                <p className="text-gray-600">Manager: Ashim Adhikari</p>
                <p className="text-gray-600">Address: Pokhara-32, Sathmuhana, Kaski, Gandaki, Nepal</p>
                <p className="text-gray-600">Phone: +977 9846223416, +977 9802805613</p>
                <p className="text-gray-600">Email: info@rbhardware.com</p>
                <p className="text-gray-600">Business Hours: Sun-Fri: 6:00 AM - 7:00 PM, Sat: 7:30 AM - 6:30 PM</p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Changes to Terms</h2>
              <p className="text-gray-600">
                We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting on our website. Your continued use of our services after changes constitutes acceptance of the new terms.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;