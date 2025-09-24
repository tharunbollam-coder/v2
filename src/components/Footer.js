import Link from 'next/link';
import { Heart, BookOpen, Mail, Shield, FileText } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <BookOpen className="h-8 w-8" />
              <span className="text-2xl font-bold">KidsStories</span>
            </div>
            <p className="text-purple-100 mb-4 max-w-md">
              Magical educational stories that inspire young minds and teach valuable life lessons. 
              Join us on adventures filled with friendship, courage, and wonder!
            </p>
            <div className="flex items-center space-x-1 text-pink-200">
              <span>Made with</span>
              <Heart className="h-4 w-4 text-red-400 animate-pulse" />
              <span>for children everywhere</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/stories" className="text-purple-100 hover:text-white transition-colors duration-200">
                  All Stories
                </Link>
              </li>
              <li>
                <Link href="/series" className="text-purple-100 hover:text-white transition-colors duration-200">
                  Story Series
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-purple-100 hover:text-white transition-colors duration-200">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-purple-100 hover:text-white transition-colors duration-200">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-purple-100 hover:text-white transition-colors duration-200 flex items-center space-x-1">
                  <Shield className="h-4 w-4" />
                  <span>Privacy Policy</span>
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-purple-100 hover:text-white transition-colors duration-200 flex items-center space-x-1">
                  <FileText className="h-4 w-4" />
                  <span>Terms of Service</span>
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-purple-100 hover:text-white transition-colors duration-200 flex items-center space-x-1">
                  <Mail className="h-4 w-4" />
                  <span>Support</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-purple-400 mt-8 pt-8 text-center">
          <p className="text-purple-100">
            © {currentYear} KidsStories. All rights reserved. Creating magical moments through storytelling.
          </p>
        </div>
      </div>
    </footer>
  );
}
