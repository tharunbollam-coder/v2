'use client';

import { Mail, MessageCircle, Phone, MapPin, Heart } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';

export default function Contact() {
  const breadcrumbItems = [
    { label: 'Contact', href: '/contact' }
  ];

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      info: "modakstorytime@gmail.com",
      description: "We'll get back to you within 24 hours"
    },
  ];

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        <Breadcrumbs items={breadcrumbItems} />

        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <MessageCircle className="w-10 h-10 text-blue-500 animate-bounce-gentle" />
            <h1 className="font-kid text-4xl md:text-5xl text-gradient-rainbow">
              Contact Us
            </h1>
            <Heart className="w-10 h-10 text-red-500 animate-pulse" />
          </div>
          <p className="font-comic text-lg text-gray-600 max-w-2xl mx-auto">
            We'd love to hear from you! Whether you have questions, feedback, or just want to say hello, 
            we're here to help make your storytelling experience magical.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8">
              <h2 className="font-kid text-2xl text-gray-800 mb-6">Get in Touch</h2>
              <p className="font-comic text-gray-600 mb-6">
                We're always excited to hear from our readers, parents, and educators. 
                Choose the best way to reach us!
              </p>
              
              <div className="space-y-4">
                {contactInfo.map((item, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
                    <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                      <item.icon className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-comic font-bold text-gray-800 mb-1">{item.title}</h3>
                      <p className="font-comic text-purple-600 font-medium mb-1">{item.info}</p>
                      <p className="font-comic text-sm text-gray-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="font-kid text-xl text-gray-800 mb-4">Frequently Asked Questions</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-comic font-bold text-gray-700 mb-1">How often do you add new stories?</h4>
                  <p className="font-comic text-sm text-gray-600">We add new stories every week and update our series regularly!</p>
                </div>
                <div>
                  <h4 className="font-comic font-bold text-gray-700 mb-1">Are the stories really free?</h4>
                  <p className="font-comic text-sm text-gray-600">Yes! All our stories are completely free with no hidden costs or subscriptions.</p>
                </div>
                <div>
                  <h4 className="font-comic font-bold text-gray-700 mb-1">Can I suggest a story idea?</h4>
                  <p className="font-comic text-sm text-gray-600">Absolutely! We love hearing story ideas from our community.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl p-8 text-white mt-12">
          <h2 className="font-kid text-3xl mb-4">Join Our Community</h2>
          <p className="font-comic text-lg mb-6 max-w-2xl mx-auto">
            Stay updated with new stories, educational tips, and special events. 
            Be part of our growing family of young readers and their families!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/stories"
              className="bg-white text-blue-600 hover:bg-blue-50 font-bold py-3 px-6 rounded-full transition-all duration-200 hover:scale-105"
            >
              Start Reading
            </a>
            <a
              href="/series"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full transition-all duration-200 hover:scale-105 border-2 border-white"
            >
              Explore Series
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
