'use client';

import { useState } from 'react';
import { Mail, MessageCircle, Phone, MapPin, Send, Heart } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const breadcrumbItems = [
    { label: 'Contact', href: '/contact' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setSubmitted(true);
    setIsSubmitting(false);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      info: "hello@ekadantastories.com",
      description: "We'll get back to you within 24 hours"
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      info: "Available 9 AM - 5 PM EST",
      description: "Chat with our friendly support team"
    },
    {
      icon: Phone,
      title: "Call Us",
      info: "+1 (555) 123-KIDS",
      description: "Monday to Friday, 9 AM - 5 PM EST"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      info: "123 Story Lane, Reading City",
      description: "Our magical headquarters"
    }
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="font-kid text-2xl text-gray-800 mb-6">Send us a Message</h2>
            
            {submitted ? (
              <div className="text-center py-8">
                <div className="text-6xl mb-4">🎉</div>
                <h3 className="font-kid text-2xl text-green-600 mb-2">Message Sent!</h3>
                <p className="font-comic text-gray-600 mb-4">
                  Thank you for reaching out! We'll get back to you soon.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-2 px-6 rounded-full transition-all duration-200 hover:scale-105"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block font-comic font-bold text-gray-700 mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors duration-200"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block font-comic font-bold text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors duration-200"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block font-comic font-bold text-gray-700 mb-2">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors duration-200"
                  >
                    <option value="">Select a topic</option>
                    <option value="general">General Question</option>
                    <option value="story-request">Story Request</option>
                    <option value="technical">Technical Issue</option>
                    <option value="feedback">Feedback</option>
                    <option value="partnership">Partnership Inquiry</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block font-comic font-bold text-gray-700 mb-2">
                    Your Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors duration-200 resize-vertical"
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 hover:scale-105 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
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
                  <p className="font-comic text-sm text-gray-600">Absolutely! We love hearing story ideas from our community. Use the form to share yours!</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl p-8 text-white">
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
