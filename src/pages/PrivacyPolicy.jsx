import { Shield, Eye, Lock, Database, Mail } from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-sm border p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <Shield className="h-16 w-16 text-primary-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Privacy Policy</h1>
            <p className="text-gray-600">Last updated: January 2024</p>
          </div>

          <div className="prose max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                <Eye className="h-6 w-6 mr-2 text-primary-600" />
                Information We Collect
              </h2>
              <p className="text-gray-600 mb-4">
                At RB Hardware And Sanitary House, we collect information to provide better services to our customers. We collect information in the following ways:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li><strong>Personal Information:</strong> Name, email address, phone number, and address when you register or make purchases</li>
                <li><strong>Transaction Information:</strong> Purchase history, payment details, and order information</li>
                <li><strong>Usage Information:</strong> How you interact with our website and services</li>
                <li><strong>Device Information:</strong> Browser type, IP address, and device identifiers</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                <Database className="h-6 w-6 mr-2 text-primary-600" />
                How We Use Your Information
              </h2>
              <p className="text-gray-600 mb-4">
                We use the information we collect for the following purposes:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Process and fulfill your orders</li>
                <li>Provide customer support and respond to inquiries</li>
                <li>Send important updates about your orders and account</li>
                <li>Improve our products and services</li>
                <li>Prevent fraud and ensure security</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                <Lock className="h-6 w-6 mr-2 text-primary-600" />
                Information Security
              </h2>
              <p className="text-gray-600 mb-4">
                We take the security of your personal information seriously and implement appropriate measures to protect it:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Secure data transmission using SSL encryption</li>
                <li>Regular security audits and updates</li>
                <li>Limited access to personal information on a need-to-know basis</li>
                <li>Secure storage of data with backup and recovery procedures</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Information Sharing</h2>
              <p className="text-gray-600 mb-4">
                We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>With your explicit consent</li>
                <li>To comply with legal requirements or court orders</li>
                <li>To protect our rights, property, or safety</li>
                <li>With trusted service providers who assist in our operations (under strict confidentiality agreements)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Rights</h2>
              <p className="text-gray-600 mb-4">
                You have the following rights regarding your personal information:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li><strong>Access:</strong> Request a copy of the personal information we hold about you</li>
                <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
                <li><strong>Deletion:</strong> Request deletion of your personal information (subject to legal requirements)</li>
                <li><strong>Portability:</strong> Request transfer of your data to another service provider</li>
                <li><strong>Objection:</strong> Object to certain processing of your personal information</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Cookies and Tracking</h2>
              <p className="text-gray-600 mb-4">
                We use cookies and similar technologies to enhance your browsing experience:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Essential cookies for website functionality</li>
                <li>Analytics cookies to understand website usage</li>
                <li>Preference cookies to remember your settings</li>
              </ul>
              <p className="text-gray-600 mt-4">
                You can control cookie settings through your browser preferences.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Data Retention</h2>
              <p className="text-gray-600">
                We retain your personal information for as long as necessary to fulfill the purposes outlined in this privacy policy, unless a longer retention period is required by law. When we no longer need your information, we will securely delete or anonymize it.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Changes to This Policy</h2>
              <p className="text-gray-600">
                We may update this privacy policy from time to time. We will notify you of any significant changes by posting the new policy on our website and updating the "Last updated" date. We encourage you to review this policy periodically.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                <Mail className="h-6 w-6 mr-2 text-primary-600" />
                Contact Us
              </h2>
              <p className="text-gray-600 mb-4">
                If you have any questions about this privacy policy or our data practices, please contact us:
              </p>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-700"><strong>RB Hardware And Sanitary House</strong></p>
                <p className="text-gray-600">Pokhara-32, Sathmuhana, Kaski, Gandaki, Nepal</p>
                <p className="text-gray-600">Phone: +977 9846223416, +977 9802805613</p>
                <p className="text-gray-600">Email: info@rbhardware.com</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;