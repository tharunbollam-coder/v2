import Link from 'next/link';
import { ArrowLeft, Home, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md mx-auto">
        <div className="text-8xl mb-6">🔍</div>
        
        <h1 className="font-kid text-4xl md:text-5xl text-gradient-rainbow mb-4">
          Oops! Page Not Found
        </h1>
        
        <p className="font-comic text-lg text-gray-600 mb-8 leading-relaxed">
          Looks like this page went on its own adventure! 
          Don't worry, we'll help you find your way back to the magical stories.
        </p>

        <div className="bg-yellow-50 border-l-4 border-yellow-400 rounded-r-xl p-4 mb-8">
          <div className="flex items-center">
            <div className="text-2xl mr-3">💡</div>
            <div>
              <p className="font-comic text-yellow-800 text-sm">
                <strong>Tip:</strong> Try checking the URL for typos, or use our navigation menu to find what you're looking for!
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 px-6 rounded-full transition-all duration-200 hover:scale-105"
          >
            <Home className="w-4 h-4" />
            <span>Go Home</span>
          </Link>
          
          <Link
            href="/stories"
            className="inline-flex items-center space-x-2 bg-white text-purple-600 hover:bg-purple-50 border-2 border-purple-500 font-bold py-3 px-6 rounded-full transition-all duration-200 hover:scale-105"
          >
            <Search className="w-4 h-4" />
            <span>Browse Stories</span>
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <Link
            href="/stories"
            className="p-4 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
          >
            <div className="text-3xl mb-2 group-hover:animate-bounce-gentle">📚</div>
            <div className="font-comic font-bold text-gray-800">Stories</div>
            <div className="font-comic text-sm text-gray-600">Read magical tales</div>
          </Link>
          
          <Link
            href="/series"
            className="p-4 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
          >
            <div className="text-3xl mb-2 group-hover:animate-bounce-gentle">📖</div>
            <div className="font-comic font-bold text-gray-800">Series</div>
            <div className="font-comic text-sm text-gray-600">Follow adventures</div>
          </Link>
          
          <Link
            href="/about"
            className="p-4 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
          >
            <div className="text-3xl mb-2 group-hover:animate-bounce-gentle">❤️</div>
            <div className="font-comic font-bold text-gray-800">About</div>
            <div className="font-comic text-sm text-gray-600">Learn about us</div>
          </Link>
        </div>
      </div>
    </div>
  );
}
