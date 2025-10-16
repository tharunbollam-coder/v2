import { FileText, Users, Shield, Heart } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = {
  title: "Terms of Service - Modak StoryTime",
  description: "Read our Terms of Service to understand how to use Modak StoryTime responsibly and safely.",
};

export default function Terms() {
  const breadcrumbItems = [
    { label: 'Terms of Service', href: '/terms' }
  ];

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        <Breadcrumbs items={breadcrumbItems} />

        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <FileText className="w-10 h-10 text-blue-500 animate-bounce-gentle" />
            <h1 className="font-kid text-4xl md:text-5xl text-gradient-rainbow">
              Terms of Service
            </h1>
            <Shield className="w-10 h-10 text-green-500 animate-pulse" />
          </div>
          <p className="font-comic text-lg text-gray-600 max-w-2xl mx-auto">
            Simple, fair terms that protect everyone in our storytelling community.
          </p>
          <p className="font-comic text-sm text-gray-500 mt-2">
            Last updated: January 1, 2024
          </p>
        </div>

        {/* Key Points */}
        <div className="bg-blue-50 border-l-4 border-blue-400 rounded-r-2xl p-6 mb-8">
          <h2 className="font-kid text-2xl text-blue-800 mb-4">📋 Key Points</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start space-x-3">
              <Heart className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-comic font-bold text-blue-800">Free to Use</h3>
                <p className="font-comic text-blue-700 text-sm">All stories are completely free</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Users className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-comic font-bold text-blue-800">Family Friendly</h3>
                <p className="font-comic text-blue-700 text-sm">Safe content for all ages</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Shield className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-comic font-bold text-blue-800">Respectful Use</h3>
                <p className="font-comic text-blue-700 text-sm">Be kind and respectful</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <FileText className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-comic font-bold text-blue-800">Our Content</h3>
                <p className="font-comic text-blue-700 text-sm">Stories are protected by copyright</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-lg p-8 space-y-8">
          <section>
            <h2 className="font-kid text-2xl text-gray-800 mb-4">Welcome to Modak StoryTime</h2>
            <div className="font-comic text-gray-700 space-y-4">
              <p>
                Welcome to Modak StoryTime! These Terms of Service ("Terms") explain how you can use our website and services. 
                By using Modak StoryTime, you agree to these terms.
              </p>
              <p>
                We've written these terms in simple language because we believe everyone should understand the rules. 
                If you have questions, please contact us!
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-kid text-2xl text-gray-800 mb-4">Using Our Service</h2>
            <div className="font-comic text-gray-700 space-y-4">
              <p><strong>What you can do:</strong></p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Read all our stories for free</li>
                <li>Play our educational games</li>
                <li>Share stories with family and friends</li>
                <li>Use our content for personal, non-commercial purposes</li>
                <li>Contact us with feedback and suggestions</li>
              </ul>
              
              <p><strong>What you cannot do:</strong></p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Copy or republish our stories without permission</li>
                <li>Use our content for commercial purposes</li>
                <li>Try to hack or damage our website</li>
                <li>Post inappropriate or harmful content</li>
                <li>Pretend to be someone else</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="font-kid text-2xl text-gray-800 mb-4">Our Content</h2>
            <div className="font-comic text-gray-700 space-y-4">
              <p>
                All stories, games, and other content on Modak StoryTime are created by our team or licensed from other creators. 
                This content is protected by copyright and other intellectual property laws.
              </p>
              <p>
                <strong>You can:</strong>
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Read stories to your children</li>
                <li>Use stories in your classroom (teachers)</li>
                <li>Share links to our stories</li>
                <li>Print stories for personal use</li>
              </ul>
              
              <p>
                <strong>Please ask permission before:</strong>
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Using our stories in published materials</li>
                <li>Creating derivative works based on our content</li>
                <li>Using our content in commercial projects</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="font-kid text-2xl text-gray-800 mb-4">Community Guidelines</h2>
            <div className="font-comic text-gray-700 space-y-4">
              <p>
                Modak StoryTime is a family-friendly community. We expect everyone to be respectful and kind.
              </p>
              
              <p><strong>Be respectful:</strong></p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Treat others with kindness</li>
                <li>Use appropriate language</li>
                <li>Respect different opinions and backgrounds</li>
                <li>Help create a positive environment for children</li>
              </ul>
              
              <p><strong>Keep it safe:</strong></p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Don't share personal information</li>
                <li>Report any inappropriate content</li>
                <li>Follow all applicable laws</li>
                <li>Protect children's privacy and safety</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="font-kid text-2xl text-gray-800 mb-4">Privacy and Safety</h2>
            <div className="font-comic text-gray-700 space-y-4">
              <p>
                Your privacy and your child's safety are very important to us. Please read our 
                <a href="/privacy" className="text-blue-600 hover:text-blue-800 underline">Privacy Policy</a> 
                to understand how we protect your information.
              </p>
              
              <p><strong>Key points:</strong></p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>We don't collect personal information from children</li>
                <li>No registration required to read stories</li>
                <li>We don't use tracking or advertising</li>
                <li>All content is appropriate for children</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="font-kid text-2xl text-gray-800 mb-4">Disclaimers</h2>
            <div className="font-comic text-gray-700 space-y-4">
              <p>
                While we work hard to provide great content, please understand:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Our service is provided "as is" without warranties</li>
                <li>We may update or change content at any time</li>
                <li>We're not responsible for how you use our content</li>
                <li>Internet services can sometimes be interrupted</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="font-kid text-2xl text-gray-800 mb-4">Changes to These Terms</h2>
            <div className="font-comic text-gray-700 space-y-4">
              <p>
                We may update these Terms from time to time. When we do:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>We'll post the new Terms on this page</li>
                <li>We'll update the "Last updated" date</li>
                <li>We'll notify users of major changes</li>
                <li>Continued use means you accept the new Terms</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="font-kid text-2xl text-gray-800 mb-4">Contact Information</h2>
            <div className="font-comic text-gray-700 space-y-4">
              <p>
                Have questions about these Terms? We're here to help!
              </p>
              <div className="bg-gray-50 rounded-lg p-4">
                <p><strong>Email:</strong> modakstorytime@gmail.com</p>
              </div>
            </div>
          </section>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl p-8 text-white mt-8">
          <h2 className="font-kid text-3xl mb-4">Ready to Start Reading?</h2>
          <p className="font-comic text-lg mb-6 max-w-2xl mx-auto">
            Now that you understand our terms, dive into our magical collection of educational stories!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/stories"
              className="bg-white text-blue-600 hover:bg-blue-50 font-bold py-3 px-6 rounded-full transition-all duration-200 hover:scale-105"
            >
              Browse Stories
            </a>
            <a
              href="/contact"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full transition-all duration-200 hover:scale-105 border-2 border-white"
            >
              Ask Questions
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
