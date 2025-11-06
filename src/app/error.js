'use client';

import Link from 'next/link';

export default function GlobalError({ error, reset }) {
  return (
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center px-4">
          <div className="text-center max-w-md mx-auto">
            <div className="text-8xl mb-6">😕</div>
            <h1 className="font-kid text-4xl md:text-5xl text-gradient-rainbow mb-4">
              Something went wrong
            </h1>
            <p className="font-comic text-lg text-gray-600 mb-8 leading-relaxed">
              Please try again. If the problem persists, go back home and continue exploring stories.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => reset?.()}
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 px-6 rounded-full transition-all duration-200 hover:scale-105"
              >
                Try Again
              </button>
              <Link
                href="/"
                className="inline-flex items-center space-x-2 bg-white text-purple-600 hover:bg-purple-50 border-2 border-purple-500 font-bold py-3 px-6 rounded-full transition-all duration-200 hover:scale-105"
              >
                Go Home
              </Link>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}


