'use client';

import { useState, useEffect } from 'react';
import { use } from 'react';
import { client } from '@/sanity/client';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Clock, Users, Lightbulb, Heart, Volume2, VolumeX, GamepadIcon, HelpCircle, BookOpen } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import YouTubeEmbed from '@/components/YouTubeEmbed';
import { cn } from '@/utils/cn';

async function getStory(slug) {
  const story = await client.fetch(
    `*[_type == "story" && slug.current == $slug][0] {
      _id,
      title,
      summary,
      content,
      moralLesson,
      ageGroup,
      readingTime,
      category,
      youtubeUrl,
      wordHelpers,
      "imageUrl": image,
      slug {
        current
      }
    }`,
    { slug }
  );

  if (!story) {
    notFound();
  }

  return story;
}

// Client component wrapper for the story detail page
function StoryDetailClient({ story }) {
  const [isReading, setIsReading] = useState(false);

  const handleReadAloud = (text) => {
    if ('speechSynthesis' in window) {
      if (isReading) {
        window.speechSynthesis.cancel();
        setIsReading(false);
      } else {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.8;
        utterance.pitch = 1.1;
        utterance.onend = () => setIsReading(false);
        window.speechSynthesis.speak(utterance);
        setIsReading(true);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50">
      {/* Hero Section with Soft Curved Bottom */}
      <div className="relative bg-gradient-to-r from-blue-100 to-indigo-100 pt-16 pb-24 md:pt-24 md:pb-32">
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-sky-50 to-transparent"></div>
        <div className="absolute -bottom-10 left-0 right-0 h-20 bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50 rounded-t-[4rem]"></div>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Breadcrumbs
              items={[
                { label: 'Home', href: '/' },
                { label: 'Stories', href: '/stories' },
                { label: story.title, href: `#` },
              ]}
              className="mb-6"
            />
            
            <div className="flex flex-col items-center px-4">
              <div className="w-full max-w-5xl mx-auto text-center">
                <h1 className="font-kid text-5xl md:text-6xl lg:text-7xl mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 drop-shadow-sm">
                  {story.title}
                </h1>
                
                <p className="text-xl md:text-2xl text-gray-700 mb-8 font-comic max-w-3xl mx-auto leading-relaxed">
                  {story.summary}
                </p>
                
                <div className="relative w-full max-w-4xl mx-auto aspect-video rounded-2xl overflow-hidden shadow-xl border-4 border-white/80 bg-white/20 backdrop-blur-sm">
                  <Image
                    src={story.imageUrl || '/placeholder-story.jpg'}
                    alt={story.title}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 768px) 100vw, 80vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-black/5 to-transparent"></div>
                </div>

                <div className="flex flex-wrap justify-center gap-3 mt-8">
                  <div className="flex items-center space-x-2 px-5 py-2.5 bg-white/80 backdrop-blur-sm rounded-full text-indigo-700 shadow-md hover:shadow-lg transition-shadow">
                    <Clock className="h-5 w-5 text-indigo-500" />
                    <span className="font-bold">{story.readingTime || '5 min read'}</span>
                  </div>
                  <div className="flex items-center space-x-2 px-5 py-2.5 bg-white/80 backdrop-blur-sm rounded-full text-indigo-700 shadow-md hover:shadow-lg transition-shadow">
                    <Users className="h-5 w-5 text-indigo-500" />
                    <span className="font-bold">{story.ageGroup || 'All Ages'}</span>
                  </div>
                  {story.category && (
                    <div className="flex items-center space-x-2 px-5 py-2.5 bg-white/80 backdrop-blur-sm rounded-full text-indigo-700 shadow-md hover:shadow-lg transition-shadow">
                      <BookOpen className="h-5 w-5 text-indigo-500" />
                      <span className="font-bold">{story.category}</span>
                    </div>
                  )}
                </div>

                <div className="mt-8 flex justify-center">
                  <button
                    onClick={() => handleReadAloud(story.content?.map(c => c.text).join(' '))}
                    className={`flex items-center space-x-3 px-8 py-3.5 font-bold rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 ${
                      isReading 
                        ? 'bg-red-500 hover:bg-red-600 text-white' 
                        : 'bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white'
                    }`}
                  >
                    {isReading ? (
                      <VolumeX className="h-5 w-5" />
                    ) : (
                      <Volume2 className="h-5 w-5" />
                    )}
                    <span className="font-comic">{isReading ? '🔇 Stop Reading' : '🔊 Read Aloud'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Story Content */}
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Story Navigation */}
        <div className="flex items-center justify-between mb-12 px-2">
          <Link 
            href="/stories" 
            className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-800 font-comic font-medium transition-colors group"
          >
            <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
            <span>Back to Stories</span>
          </Link>
          
          <div className="flex items-center space-x-6">
            {story.youtubeUrl && (
              <a 
                href={`#watch`} 
                className="flex items-center space-x-2 text-red-500 hover:text-red-600 font-comic font-medium group transition-colors"
              >
                <span className="text-xl transition-transform group-hover:scale-110">▶️</span>
                <span>Watch Story</span>
              </a>
            )}
            {story.moralLesson && (
              <a 
                href="#moral" 
                className="flex items-center space-x-2 text-amber-500 hover:text-amber-600 font-comic font-medium group transition-colors"
              >
                <span className="text-xl transition-transform group-hover:scale-110">💡</span>
                <span>Moral Lesson</span>
              </a>
            )}
          </div>
        </div>
        {/* Story Content Sections */}
        <div className="space-y-12">
          {story.content?.map((section, sectionIndex) => (
            <div 
              key={sectionIndex} 
              className="bg-white rounded-2xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg"
            >
              <div className="p-6 md:p-10">
                {section.text && (
                  <div className="relative">
                    <p className="text-lg md:text-xl leading-relaxed text-gray-800 font-comic mb-8 pl-6 border-l-2 border-indigo-100 hover:border-indigo-200 transition-colors">
                      {section.text}
                    </p>
                  </div>
                )}
                
                {section.image && (
                  <div className="relative w-full h-64 md:h-[32rem] rounded-xl overflow-hidden my-8 shadow-md border border-gray-100">
                    <Image
                      src={section.image}
                      alt={`${story.title}`}
                      fill
                      className="object-cover transition-transform duration-500 hover:scale-105"
                      priority={sectionIndex < 2}
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {story.moralLesson && (
          <div id="moral" className="my-20 relative">
            {/* Decorative elements */}
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-48 h-48 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
            <div className="absolute -bottom-10 left-1/3 -translate-x-1/2 w-64 h-64 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
            <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-40 h-40 bg-gradient-to-br from-green-100 to-teal-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
            
            <div className="relative z-10">
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-2xl overflow-hidden border border-gray-100 transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
                  <div className="p-8 md:p-12">
                    <div className="flex flex-col items-center text-center">
                      {/* Icon with animation */}
                      <div className="relative mb-6">
                        <div className="absolute inset-0 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-full opacity-20 animate-ping"></div>
                        <div className="relative flex items-center justify-center w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl shadow-lg transform rotate-6 hover:rotate-0 transition-transform duration-300">
                          <Lightbulb className="h-10 w-10 text-white" />
                        </div>
                        <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full border-4 border-white"></div>
                      </div>
                      
                      {/* Title */}
                      <h3 className="font-kid text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-yellow-600 to-orange-600 mb-6">
                        The Moral of the Story
                      </h3>
                      
                      {/* Moral text with decorative elements */}
                      <div className="relative max-w-2xl">
                        <div className="absolute -left-6 top-0 bottom-0 w-1.5 bg-gradient-to-b from-yellow-300 via-orange-400 to-pink-400 rounded-full"></div>
                        <div className="absolute -right-6 top-0 bottom-0 w-1.5 bg-gradient-to-b from-yellow-300 via-orange-400 to-pink-400 rounded-full"></div>
                        
                        <div className="relative px-8 py-6 bg-white/50 backdrop-blur-sm rounded-xl border border-gray-100 shadow-inner">
                          <span className="absolute -top-4 -left-4 text-6xl text-yellow-200 font-serif leading-none">"</span>
                          <p className="text-gray-800 text-lg md:text-xl font-comic leading-relaxed relative z-10">
                            {story.moralLesson}
                          </p>
                          <span className="absolute -bottom-8 -right-4 text-6xl text-yellow-200 font-serif leading-none">"</span>
                        </div>
                        
                        <div className="flex justify-center mt-6 space-x-3">
                          {[1, 2, 3].map((i) => (
                            <div key={i} className="w-2 h-2 rounded-full bg-yellow-300 opacity-70"></div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Decorative corner elements */}
            <div className="absolute -top-6 -left-6 w-24 h-24 border-t-4 border-l-4 border-yellow-300 rounded-tl-3xl opacity-50"></div>
            <div className="absolute -bottom-6 -right-6 w-24 h-24 border-b-4 border-r-4 border-orange-300 rounded-br-3xl opacity-50"></div>
          </div>
        )}
        
        {/* Word Helpers Section */}
        {story.wordHelpers?.length > 0 && (
          <div id="word-helpers" className="mb-20">
            <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100">
              <div className="p-8 bg-gradient-to-r from-indigo-50 to-purple-50">
                <h3 className="font-kid text-3xl md:text-4xl text-center text-indigo-800 mb-4">
                  Word Helpers
                </h3>
                <p className="text-center text-indigo-600 font-comic mb-8 max-w-2xl mx-auto">
                  Learn these words to better understand the story
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {story.wordHelpers.map((word, i) => (
                    <div 
                      key={i} 
                      className="bg-white p-5 rounded-xl hover:shadow-md transition-shadow border border-gray-100"
                    >
                      <div className="flex items-start">
                        <div className="bg-indigo-100 text-indigo-600 rounded-lg p-2 mr-4 flex-shrink-0">
                          {i % 3 === 0 ? '🔍' : i % 3 === 1 ? '📖' : '💡'}
                        </div>
                        <div>
                          <h4 className="font-bold text-lg text-gray-800">
                            {word.word}
                          </h4>
                          <p className="text-gray-600 text-sm mt-1">{word.definition}</p>
                          {word.pronunciation && (
                            <div className="mt-2 flex items-center text-sm text-indigo-500">
                              <span className="mr-1">🔊</span>
                              <span className="italic">{word.pronunciation}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {story.youtubeUrl && (
          <div id="watch" className="mt-20 mb-16 p-2 bg-white rounded-3xl shadow-xl">
            <div className="bg-gradient-to-r from-red-500 to-pink-500 p-1 rounded-2xl">
              <div className="bg-white p-6 rounded-xl">
                <div className="flex items-center mb-6">
                  <div className="bg-red-100 p-2 rounded-full mr-3">
                    <span className="text-2xl">🎬</span>
                  </div>
                  <h3 className="font-kid text-3xl md:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-pink-500">
                    Watch the Story Come Alive!
                  </h3>
                </div>
                <div className="aspect-video w-full rounded-xl overflow-hidden shadow-lg border-4 border-gray-100">
                  <YouTubeEmbed url={story.youtubeUrl} />
                </div>
                <div className="mt-4 flex items-center justify-center space-x-2 text-gray-500 font-comic text-sm">
                  <span>🔊 Turn on sound</span>
                  <span>•</span>
                  <span>📺 Full screen recommended</span>
                </div>
              </div>
            </div>
          </div>
        )}


        {/* Next Steps */}
        <div className="mt-20 text-center">
          <h3 className="font-kid text-3xl text-gray-800 mb-6">
            What would you like to do next?
          </h3>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/stories"
              className="inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-bold py-4 px-8 rounded-full transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <BookOpen className="w-5 h-5" />
              <span>Read Another Story</span>
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center space-x-2 bg-white border-2 border-purple-200 text-purple-700 hover:bg-purple-50 font-bold py-4 px-8 rounded-full transition-all duration-200 hover:scale-105 shadow-md hover:shadow-lg"
            >
              <span>🏠</span>
              <span>Go to Home</span>
            </Link>
          </div>
          
          {/* Fun Decoration */}
          <div className="mt-12 flex justify-center space-x-6 opacity-50">
            <span className="text-3xl">📚</span>
            <span className="text-3xl">✨</span>
            <span className="text-3xl">🎨</span>
            <span className="text-3xl">📖</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function StoryDetail({ params }) {
  // Unwrap the params promise
  const { id } = use(params);
  const [story, setStory] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStory = async () => {
      try {
        const storyData = await getStory(id);
        if (!storyData) {
          notFound();
        }
        setStory(storyData);
      } catch (error) {
        notFound();
      } finally {
        setIsLoading(false);
      }
    };

    fetchStory();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-foreground/10 rounded-full"></div>
          <p className="text-foreground/80">Loading story...</p>
        </div>
      </div>
    );
  }

  if (!story) {
    notFound();
  }

  return <StoryDetailClient story={story} />;
}
