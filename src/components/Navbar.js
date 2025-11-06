'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, Book, Home, Library, BookMarked, Info, Mail } from 'lucide-react';
import { cn } from '@/utils/cn';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/stories', label: 'Stories', icon: Library },
    { href: '/series', label: 'Series', icon: BookMarked },
    { href: '/about', label: 'About', icon: Info },
    { href: '/contact', label: 'Contact', icon: Mail }
  ];

  return (
    <nav className="bg-gradient-to-r from-white/95 via-indigo-50/95 to-purple-50/95 backdrop-blur-xl border-b border-indigo-200/50 sticky top-0 z-50 shadow-xl shadow-indigo-100/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-18">
          {/* Enhanced Logo */}
          <Link href="/" className="flex items-center space-x-3 font-kid text-2xl group transition-all duration-300 hover:scale-105">
            <div className="relative">
              <Book className="w-10 h-10 text-indigo-600 group-hover:text-purple-600 transition-colors duration-300 drop-shadow-sm" />
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full opacity-0 group-hover:opacity-20 blur transition-opacity duration-300"></div>
            </div>
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent font-bold tracking-wide drop-shadow-sm group-hover:drop-shadow-md transition-all duration-300">
              Modak StoryTime
            </span>
          </Link>

          {/* Enhanced Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex space-x-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="group relative flex items-center space-x-2 px-5 py-3 rounded-full transition-all duration-300 font-comic font-bold text-gray-700 hover:text-white hover:scale-105 hover:shadow-lg overflow-hidden"
                  >
                    {/* Background gradient on hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
                    
                    {/* Content */}
                    <div className="relative z-10 flex items-center space-x-2">
                      <Icon className="w-5 h-5 group-hover:animate-bounce-gentle transition-all duration-300" />
                      <span className="hidden sm:inline text-sm font-bold tracking-wide">{item.label}</span>
                    </div>
                    
                    {/* Subtle glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-400 opacity-0 group-hover:opacity-30 blur-md transition-opacity duration-300 rounded-full"></div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Enhanced Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="relative group p-3 rounded-full transition-all duration-300 hover:scale-110 overflow-hidden"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
              aria-controls="mobile-nav"
            >
              {/* Background */}
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
              
              {/* Icon */}
              <div className="relative z-10">
                {isOpen ? 
                  <X className="h-6 w-6 text-gray-700 group-hover:text-white transition-colors duration-300" /> : 
                  <Menu className="h-6 w-6 text-gray-700 group-hover:text-white transition-colors duration-300" />
                }
              </div>
              
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-400 opacity-0 group-hover:opacity-30 blur-md transition-opacity duration-300 rounded-full"></div>
            </button>
          </div>
        </div>

        {/* Enhanced Mobile Navigation */}
        <div id="mobile-nav" className={cn(
          "md:hidden transition-all duration-500 ease-in-out bg-gradient-to-br from-white/98 via-indigo-50/98 to-purple-50/98 backdrop-blur-xl border-t border-indigo-200/50 shadow-lg",
          isOpen ? "max-h-[500px] opacity-100 pb-6" : "max-h-0 opacity-0 overflow-hidden"
        )}>
          <div className="px-4 pt-4 pb-2 space-y-1">
            {navItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group relative flex items-center space-x-3 px-4 py-3 rounded-xl font-comic font-bold transition-all duration-300 hover:scale-102 overflow-hidden"
                  onClick={() => setIsOpen(false)}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {/* Background gradient */}
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 group-hover:from-indigo-500 group-hover:via-purple-500 group-hover:to-pink-500 transition-all duration-300 rounded-xl"></div>
                  
                  {/* Content */}
                  <div className="relative z-10 flex items-center space-x-3">
                    <div className="p-2 rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 group-hover:from-white/20 group-hover:to-white/20 transition-all duration-300">
                      <Icon className="w-5 h-5 text-indigo-600 group-hover:text-white transition-colors duration-300" />
                    </div>
                    <span className="text-gray-700 group-hover:text-white font-bold tracking-wide transition-colors duration-300">{item.label}</span>
                  </div>
                  
                  {/* Subtle glow */}
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-400 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300 rounded-xl"></div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
