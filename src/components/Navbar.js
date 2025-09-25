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
    <nav className="bg-card border-b border-border sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 font-kid text-2xl">
            <Book className="w-8 h-8 text-primary" />
            <span className="text-gradient-rainbow">
              KidsStories
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-200 font-comic font-bold text-foreground hover:bg-secondary hover:scale-105"
                  >
                    <Icon className="w-5 h-5" />
                    <span className="hidden sm:inline">{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-foreground hover:bg-secondary p-2 rounded-full transition-all duration-200"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={cn(
          "md:hidden transition-all duration-300 ease-in-out",
          isOpen ? "max-h-64 opacity-100 pb-4" : "max-h-0 opacity-0 overflow-hidden"
        )}>
          <div className="px-2 pt-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center space-x-2 px-4 py-3 rounded-full font-comic font-bold text-foreground hover:bg-secondary transition-all duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
