import { Shield, Eye, Lock, Users } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = {
  title: "Privacy Policy - Ekadanta Stories",
  description: "Learn how Ekadanta Stories protects your privacy and keeps children safe online. Our commitment to data protection and child safety.",
};

export default function Privacy() {
  const breadcrumbItems = [
    { label: 'Privacy Policy', href: '/privacy' }
  ];

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        <Breadcrumbs items={breadcrumbItems} />

        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Shield className="w-10 h-10 text-green-500 animate-bounce-gentle" />
            <h1 className="font-kid text-4xl md:text-5xl text-gradient-rainbow">
              Privacy Policy
            </h1>
            <Lock className="w-10 h-10 text-blue-500 animate-pulse" />
          </div>
          <p className="font-comic text-lg text-gray-600 max-w-2xl mx-auto">
            Your privacy and your child's safety are our top priorities. 
            Here's how we protect your information.
          </p>
          <p className="font-comic text-sm text-gray-500 mt-2">
            Last updated: January 1, 2024
          </p>
        </div>

        {/* Key Principles */}
        <div className="bg-green-50 border-l-4 border-green-400 rounded-r-2xl p-6 mb-8">
          <h2 className="font-kid text-2xl text-green-800 mb-4">🛡️ Our Privacy Principles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start space-x-3">
              <Eye className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-comic font-bold text-green-800">No Tracking</h3>
                <p className="font-comic text-green-700 text-sm">We don't track or profile children</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Lock className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-comic font-bold text-green-800">Secure Data</h3>
                <p className="font-comic text-green-700 text-sm">All data is encrypted and protected</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Users className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-comic font-bold text-green-800">No Sharing</h3>
                <p className="font-comic text-green-700 text-sm">We never sell or share personal data</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Shield className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-comic font-bold text-green-800">COPPA Compliant</h3>
                <p className="font-comic text-green-700 text-sm">We follow all child protection laws</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-lg p-8 space-y-8">
          <section>
            <h2 className="font-kid text-2xl text-gray-800 mb-4">Information We Collect</h2>
            <div className="font-comic text-gray-700 space-y-4">
              <p>
                <strong>We collect minimal information to provide our service:</strong>
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>No Personal Information:</strong> We don't require accounts, names, or personal details to read stories</li>
                <li><strong>Technical Data:</strong> Basic website analytics (page views, device type) to improve our service</li>
                <li><strong>Contact Forms:</strong> Only when you voluntarily contact us through our contact form</li>
                <li><strong>No Cookies:</strong> We don't use tracking cookies or store personal data locally</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="font-kid text-2xl text-gray-800 mb-4">How We Use Information</h2>
            <div className="font-comic text-gray-700 space-y-4">
              <p>Any information we collect is used solely to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Provide and improve our storytelling service</li>
                <li>Respond to your questions or feedback</li>
                <li>Ensure the website works properly on different devices</li>
                <li>Maintain security and prevent abuse</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="font-kid text-2xl text-gray-800 mb-4">Children's Privacy (COPPA)</h2>
            <div className="font-comic text-gray-700 space-y-4">
              <p>
                <strong>We are committed to protecting children's privacy:</strong>
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>We don't knowingly collect personal information from children under 13</li>
                <li>No registration or accounts are required to use our service</li>
                <li>We don't use behavioral advertising or tracking</li>
                <li>Parents can contact us anytime with privacy concerns</li>
                <li>We comply with all COPPA requirements and guidelines</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="font-kid text-2xl text-gray-800 mb-4">Data Security</h2>
            <div className="font-comic text-gray-700 space-y-4">
              <p>We protect your information through:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Secure HTTPS encryption for all data transmission</li>
                <li>Regular security audits and updates</li>
                <li>Limited access to any collected data</li>
                <li>No storage of unnecessary personal information</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="font-kid text-2xl text-gray-800 mb-4">Third-Party Services</h2>
            <div className="font-comic text-gray-700 space-y-4">
              <p>
                We use minimal third-party services, all of which are privacy-focused:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Hosting:</strong> Our website is hosted on secure, privacy-compliant servers</li>
                <li><strong>Analytics:</strong> We use privacy-focused analytics that don't track individuals</li>
                <li><strong>No Ads:</strong> We don't use advertising networks or tracking pixels</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="font-kid text-2xl text-gray-800 mb-4">Your Rights</h2>
            <div className="font-comic text-gray-700 space-y-4">
              <p>You have the right to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Use our service without providing personal information</li>
                <li>Contact us with any privacy questions or concerns</li>
                <li>Request information about any data we might have</li>
                <li>Ask us to delete any information you've provided</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="font-kid text-2xl text-gray-800 mb-4">Contact Us</h2>
            <div className="font-comic text-gray-700 space-y-4">
              <p>
                If you have any questions about this Privacy Policy or our practices, please contact us:
              </p>
              <div className="bg-gray-50 rounded-lg p-4">
                <p><strong>Email:</strong> privacy@ekadantastories.com</p>
                <p><strong>Address:</strong> 123 Story Lane, Reading City, RC 12345</p>
                <p><strong>Phone:</strong> +1 (555) 123-KIDS</p>
              </div>
            </div>
          </section>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl p-8 text-white mt-8">
          <h2 className="font-kid text-3xl mb-4">Questions About Privacy?</h2>
          <p className="font-comic text-lg mb-6 max-w-2xl mx-auto">
            We're always happy to explain our privacy practices. 
            Don't hesitate to reach out if you have any concerns.
          </p>
          <a
            href="/contact"
            className="bg-white text-green-600 hover:bg-green-50 font-bold py-3 px-6 rounded-full transition-all duration-200 hover:scale-105"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
}
