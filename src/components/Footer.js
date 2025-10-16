import Link from 'next/link';
import { Heart, BookOpen, Mail, Shield, FileText } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/20 via-purple-900/20 to-pink-900/20"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Enhanced Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="relative">
                <BookOpen className="h-10 w-10 text-indigo-400" />
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full opacity-20 blur"></div>
              </div>
              <span className="text-3xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Modak StoryTime
              </span>
            </div>
            <p className="text-gray-300 mb-6 max-w-md text-lg leading-relaxed">
              Magical educational stories that inspire young minds and teach valuable life lessons. 
              Join us on adventures filled with friendship, courage, and wonder!
            </p>
            <div className="flex items-center space-x-2 text-gray-400">
              <span>Made with</span>
              <Heart className="h-5 w-5 text-pink-400 animate-pulse" />
              <span>for children everywhere</span>
            </div>
          </div>

          {/* Enhanced Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-white">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/stories" className="group flex items-center text-gray-300 hover:text-indigo-400 transition-all duration-200">
                  <span className="w-2 h-2 bg-indigo-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                  All Stories
                </Link>
              </li>
              <li>
                <Link href="/series" className="group flex items-center text-gray-300 hover:text-purple-400 transition-all duration-200">
                  <span className="w-2 h-2 bg-purple-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                  Story Series
                </Link>
              </li>
              <li>
                <Link href="/about" className="group flex items-center text-gray-300 hover:text-pink-400 transition-all duration-200">
                  <span className="w-2 h-2 bg-pink-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="group flex items-center text-gray-300 hover:text-indigo-400 transition-all duration-200">
                  <span className="w-2 h-2 bg-indigo-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Enhanced Legal Links */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-white">Legal</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/privacy" className="group flex items-center text-gray-300 hover:text-green-400 transition-all duration-200">
                  <Shield className="h-4 w-4 mr-2 group-hover:text-green-400 transition-colors duration-200" />
                  <span>Privacy Policy</span>
                </Link>
              </li>
              <li>
                <Link href="/terms" className="group flex items-center text-gray-300 hover:text-blue-400 transition-all duration-200">
                  <FileText className="h-4 w-4 mr-2 group-hover:text-blue-400 transition-colors duration-200" />
                  <span>Terms of Service</span>
                </Link>
              </li>
              <li>
                <Link href="/contact" className="group flex items-center text-gray-300 hover:text-purple-400 transition-all duration-200">
                  <Mail className="h-4 w-4 mr-2 group-hover:text-purple-400 transition-colors duration-200" />
                  <span>Support</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Enhanced Bottom Section */}
        <div className="relative mt-12 pt-8">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent"></div>
          <div className="text-center">
            <p className="text-gray-400 text-lg">
              © {currentYear} <span className="text-indigo-400 font-semibold">Modak StoryTime</span>. All rights reserved.
            </p>
            <p className="text-gray-500 mt-2">
              Creating magical moments through storytelling ✨
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
