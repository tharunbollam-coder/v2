import { Heart, BookOpen, Users, Star, Sparkles, Target } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = {
  title: "About Ekadanta Stories - Our Mission to Inspire Young Minds",
  description: "Learn about Ekadanta Stories' mission to create magical educational content that inspires children to read, learn, and grow through engaging storytelling.",
};

export default function About() {
  const breadcrumbItems = [
    { label: 'About', href: '/about' }
  ];

  const founder = {
    name: "Founder & Creator",
    role: "Solo Developer",
    description: "Passionate about creating educational content for children. Just starting this journey to build magical stories that inspire young minds.",
    icon: BookOpen
  };

  const values = [
    {
      title: "Educational Excellence",
      description: "Every story is carefully crafted to teach valuable life lessons while entertaining young readers.",
      icon: Target
    },
    {
      title: "Safe Environment",
      description: "We provide a completely safe, ad-free environment where children can explore and learn freely.",
      icon: Heart
    },
    {
      title: "Inclusive Stories",
      description: "Our tales celebrate diversity and include characters from all backgrounds and abilities.",
      icon: Users
    },
    {
      title: "Interactive Learning",
      description: "Beyond reading, we offer games, activities, and questions that reinforce learning outcomes.",
      icon: Sparkles
    }
  ];

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        <Breadcrumbs items={breadcrumbItems} />

        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Heart className="w-10 h-10 text-red-500 animate-pulse" />
            <h1 className="font-kid text-4xl md:text-5xl text-gradient-rainbow">
              About Ekadanta Stories
            </h1>
            <Heart className="w-10 h-10 text-red-500 animate-pulse" />
          </div>
          <p className="font-comic text-lg text-gray-600 max-w-2xl mx-auto">
            Inspiring young minds through magical storytelling and educational adventures
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="text-center mb-8">
            <BookOpen className="w-16 h-16 text-purple-600 mx-auto mb-4 animate-bounce-gentle" />
            <h2 className="font-kid text-3xl text-gray-800 mb-4">Our Mission</h2>
          </div>
          
          <div className="prose prose-lg max-w-none font-comic text-gray-700 leading-relaxed">
            <p className="text-center text-xl mb-6">
              At Ekadanta Stories, we believe that every child deserves access to magical, educational stories 
              that spark imagination, teach valuable life lessons, and foster a lifelong love of reading.
            </p>
            
            <p className="mb-4">
              Ekadanta Stories is a new project born from the passion to create educational content that 
              children will love. As a solo developer, I'm just beginning this journey to build 
              high-quality, educational stories that can engage young minds while delivering 
              meaningful learning experiences.
            </p>
            
            <p className="mb-4">
              This is the early stage of what I hope will become a wonderful collection of stories 
              that not only entertain but also help build character, emotional intelligence, and 
              critical thinking skills. Each story is being carefully crafted to be age-appropriate 
              while maintaining the magic and wonder that makes reading an adventure.
            </p>
            
            <p>
              I'm committed to providing a safe, ad-free environment where children can explore, 
              learn, and grow at their own pace. This is just the beginning, and I'm excited to 
              grow this collection of stories over time.
            </p>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-8">
          <h2 className="font-kid text-3xl text-center text-gray-800 mb-8">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="flex items-start space-x-4">
                  <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                    <value.icon className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-comic font-bold text-lg text-gray-800 mb-2">{value.title}</h3>
                    <p className="font-comic text-gray-600">{value.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Founder Section */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8 mb-8">
          <h2 className="font-kid text-3xl text-center text-gray-800 mb-8">About the Creator</h2>
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="bg-gradient-to-r from-purple-100 to-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <founder.icon className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="font-comic font-bold text-lg text-gray-800 mb-1">{founder.name}</h3>
              <p className="text-purple-600 font-medium mb-3">{founder.role}</p>
              <p className="font-comic text-sm text-gray-600">{founder.description}</p>
            </div>
          </div>
        </div>

        {/* Current Status Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="font-kid text-3xl text-center text-gray-800 mb-8">Current Status</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="p-4">
              <div className="text-3xl font-bold text-purple-600 mb-2">3</div>
              <div className="font-comic text-gray-600">Stories Available</div>
            </div>
            <div className="p-4">
              <div className="text-3xl font-bold text-indigo-600 mb-2">2</div>
              <div className="font-comic text-gray-600">Series Started</div>
            </div>
            <div className="p-4">
              <div className="text-3xl font-bold text-green-600 mb-2">100%</div>
              <div className="font-comic text-gray-600">Safe & Ad-Free</div>
            </div>
          </div>
          <div className="text-center mt-6">
            <p className="font-comic text-gray-600 text-sm">
              🌱 This is just the beginning! More stories and features are being added regularly.
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-8 text-white">
          <h2 className="font-kid text-3xl mb-4">Join Our Story</h2>
          <p className="font-comic text-lg mb-6 max-w-2xl mx-auto">
            Join me on this exciting journey to create magical, educational adventures for children. 
            This is just the beginning, and I'd love to hear your feedback and suggestions!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/stories"
              className="bg-white text-purple-600 hover:bg-purple-50 font-bold py-3 px-6 rounded-full transition-all duration-200 hover:scale-105"
            >
              Explore Stories
            </a>
            <a
              href="/contact"
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-full transition-all duration-200 hover:scale-105 border-2 border-white"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
