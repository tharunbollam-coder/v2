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
        console.error('Error fetching story:', error);
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

  const breadcrumbItems = [
    { label: 'Stories', href: '/stories' },
    { label: story.title, href: `/story/${resolvedParams.id}` }
  ];

  const handleReadAloud = () => {
    if ('speechSynthesis' in window) {
      if (isReading) {
        window.speechSynthesis.cancel();
        setIsReading(false);
      } else {
        // Read all story content
        const fullText = story.content.map(section => section.text).join(' ');
        const utterance = new SpeechSynthesisUtterance(fullText);
        utterance.rate = 0.8;
        utterance.pitch = 1.1;
        utterance.onend = () => setIsReading(false);
        window.speechSynthesis.speak(utterance);
        setIsReading(true);
      }
    }
  };

  return (
    <div className="min-h-screen py-4 md:py-8 px-2 md:px-4 bg-gradient-to-br from-rainbow-red/5 via-rainbow-yellow/5 to-rainbow-blue/5">
      <div className="container mx-auto max-w-4xl">
        <div className="animate-slide-up mb-4">
          <Breadcrumbs items={breadcrumbItems} />
        </div>

        {/* Story Header - Enhanced */}
        <div className="mb-6 md:mb-8 overflow-hidden border-4 border-rainbow-yellow/40 bg-gradient-to-br from-rainbow-red/10 via-rainbow-yellow/10 to-rainbow-blue/10 shadow-2xl hover:shadow-rainbow-purple/30 transition-all duration-500 hover:scale-102 rounded-3xl animate-scale-in">
          <div className="relative h-48 md:h-64 lg:h-80">
            <Image
              src={story.image}
              alt={story.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white">
                <h1 className="font-kid text-2xl md:text-3xl lg:text-5xl mb-2 drop-shadow-2xl text-shadow-lg">{story.title}</h1>
                <p className="text-white/95 text-base md:text-lg font-comic drop-shadow-lg">✨ An Educational Adventure ✨</p>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-rainbow-yellow/20"></div>
            <div className="absolute top-4 md:top-6 right-4 md:right-6">
              <span className="bg-rainbow-purple/90 text-white px-3 md:px-4 py-1 md:py-2 rounded-full text-xs md:text-sm font-comic font-bold border-2 border-white/20 shadow-lg">
                {story.category}
              </span>
            </div>
          </div>

          <div className="p-4 md:p-8">
            <div className="text-center mb-6 md:mb-8">
              <p className="font-comic text-base md:text-lg text-foreground leading-relaxed text-balance max-w-3xl mx-auto">
                {story.summary}
              </p>
            </div>

            {/* Story Info - Enhanced */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 mb-6 md:mb-8">
              <div className="p-3 md:p-4 text-center border-4 border-rainbow-blue/40 bg-gradient-to-br from-rainbow-blue/10 to-rainbow-blue/20 hover:scale-102 transition-all duration-300 rounded-2xl">
                <Users className="w-6 h-6 md:w-8 md:h-8 text-rainbow-blue mx-auto mb-2" />
                <div className="font-comic font-bold text-xs md:text-sm text-muted-foreground">Age Group</div>
                <div className="font-kid text-base md:text-lg text-foreground">{story.ageGroup}</div>
              </div>
              <div className="p-3 md:p-4 text-center border-4 border-rainbow-green/40 bg-gradient-to-br from-rainbow-green/10 to-rainbow-green/20 hover:scale-102 transition-all duration-300 rounded-2xl">
                <Clock className="w-6 h-6 md:w-8 md:h-8 text-rainbow-green mx-auto mb-2" />
                <div className="font-comic font-bold text-xs md:text-sm text-muted-foreground">Reading Time</div>
                <div className="font-kid text-base md:text-lg text-foreground">{story.readingTime}</div>
              </div>
              <div className="p-3 md:p-4 text-center border-4 border-rainbow-purple/40 bg-gradient-to-br from-rainbow-purple/10 to-rainbow-purple/20 hover:scale-102 transition-all duration-300 rounded-2xl">
                <Heart className="w-6 h-6 md:w-8 md:h-8 text-rainbow-purple mx-auto mb-2" />
                <div className="font-comic font-bold text-xs md:text-sm text-muted-foreground">Category</div>
                <div className="font-kid text-base md:text-lg text-foreground">{story.category}</div>
              </div>
            </div>

            {/* Enhanced Action Buttons */}
            <div className="text-center mb-4 md:mb-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              <button
                onClick={handleReadAloud}
                className="bg-rainbow-yellow/50 hover:bg-rainbow-yellow/70 text-white font-comic font-bold px-3 py-3 md:px-4 md:py-3 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 border-2 border-rainbow-yellow/60"
              >
                {isReading ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                <span className="hidden sm:inline text-xs md:text-sm">{isReading ? '🔇 Stop' : '🔊 Read'}</span>
              </button>
              
              {story.wordHelpers && story.wordHelpers.length > 0 && (
                <button
                  onClick={() => setShowWordHelpers(!showWordHelpers)}
                  className="bg-rainbow-purple/50 hover:bg-rainbow-purple/70 text-white font-comic font-bold px-3 py-3 md:px-4 md:py-3 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 border-2 border-rainbow-purple/60"
                >
                  <HelpCircle className="h-4 w-4" />
                  <span className="hidden sm:inline text-xs md:text-sm">📚 Words</span>
                </button>
              )}

              <Link
                href={`/spelling-game/${story.id}`}
                className="bg-rainbow-green/50 hover:bg-rainbow-green/70 text-white font-comic font-bold px-3 py-3 md:px-4 md:py-3 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 border-2 border-rainbow-green/60"
              >
                <GamepadIcon className="h-4 w-4" />
                <span className="hidden sm:inline text-xs md:text-sm">🎮 Spell</span>
              </Link>

              <Link
                href={`/story-questions/${story.id}`}
                className="bg-rainbow-blue/50 hover:bg-rainbow-blue/70 text-white font-comic font-bold px-3 py-3 md:px-4 md:py-3 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 border-2 border-rainbow-blue/60"
              >
                <HelpCircle className="h-4 w-4" />
                <span className="hidden sm:inline text-xs md:text-sm">❓ Quiz</span>
              </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Word Helpers */}
        {showWordHelpers && story.wordHelpers && (
          <div className="mb-6 md:mb-8 animate-slide-up">
            <div className="bg-gradient-to-br from-rainbow-purple/20 to-rainbow-pink/20 border-4 border-rainbow-purple/50 shadow-2xl hover:shadow-rainbow-pink/40 transition-all duration-500 rounded-3xl p-4 md:p-6">
              <div className="text-center mb-6">
                <h2 className="font-kid text-xl md:text-3xl text-foreground flex items-center justify-center gap-2 mb-2">
                  🧠 Smart Words! 📚
                </h2>
                <div className="inline-flex items-center gap-2 bg-rainbow-purple/30 px-4 py-2 md:px-6 md:py-3 rounded-full border-4 border-rainbow-purple/50">
                  <span className="text-base md:text-lg">✨</span>
                  <span className="font-comic font-bold text-sm md:text-base text-rainbow-purple">
                    Let's learn big words together!
                  </span>
                  <span className="text-base md:text-lg">🌟</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {story.wordHelpers.map((helper, index) => (
                  <div 
                    key={index} 
                    className="relative bg-white/80 p-4 md:p-6 rounded-2xl border-4 shadow-xl hover:scale-105 transition-all duration-300 hover:shadow-2xl"
                    style={{
                      borderColor: index % 3 === 0 ? 'hsl(var(--rainbow-red))' : 
                                 index % 3 === 1 ? 'hsl(var(--rainbow-blue))' : 
                                 'hsl(var(--rainbow-green))'
                    }}
                  >
                    {/* Decorative corner */}
                    <div className="absolute -top-3 -right-3 w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center shadow-lg"
                         style={{
                           backgroundColor: index % 3 === 0 ? 'hsl(var(--rainbow-red))' : 
                                          index % 3 === 1 ? 'hsl(var(--rainbow-blue))' : 
                                          'hsl(var(--rainbow-green))'
                         }}>
                      <span className="text-sm md:text-lg text-white font-bold">
                        {index + 1}
                      </span>
                    </div>
                    
                    {/* Word */}
                    <div className="text-center mb-4">
                      <div className="text-2xl md:text-3xl mb-2 md:mb-3">
                        {index % 3 === 0 ? '🎯' : index % 3 === 1 ? '🎪' : '🎨'}
                      </div>
                      <h3 className="font-kid text-lg md:text-2xl font-bold mb-2"
                          style={{
                            color: index % 3 === 0 ? 'hsl(var(--rainbow-red))' : 
                                   index % 3 === 1 ? 'hsl(var(--rainbow-blue))' : 
                                   'hsl(var(--rainbow-green))'
                          }}>
                        {helper.word}
                      </h3>
                      
                      {helper.pronunciation && (
                        <div className="text-sm text-gray-600 mb-3 font-comic font-medium bg-gray-100 px-3 py-1 rounded-full inline-block">
                          🔊 {helper.pronunciation}
                        </div>
                      )}
                      
                      {/* Simple meaning */}
                      <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-3 md:p-4 rounded-xl border-2 border-gray-200">
                        <div className="text-base md:text-lg mb-1 md:mb-2 font-bold text-gray-700">
                          This means:
                        </div>
                        <p className="font-comic text-sm md:text-base text-gray-800 leading-relaxed">
                          {helper.definition}
                        </p>
                      </div>
                    </div>
                    
                    {/* Fun interaction */}
                    <div className="text-center">
                      <button className="bg-gradient-to-r from-rainbow-yellow/60 to-rainbow-orange/60 hover:from-rainbow-yellow/80 hover:to-rainbow-orange/80 px-4 py-2 md:px-6 md:py-3 text-xs md:text-sm rounded-full border-3 border-rainbow-yellow/70 font-comic font-bold transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-xl">
                        <span className="mr-1 md:mr-2">🎵</span>
                        Got it!
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Encouragement section */}
              <div className="mt-6 md:mt-8 text-center">
                <div className="bg-gradient-to-r from-rainbow-purple/30 via-rainbow-pink/30 to-rainbow-purple/30 p-4 md:p-6 rounded-2xl border-4 border-dashed border-rainbow-purple/50">
                  <div className="text-3xl md:text-4xl mb-2 md:mb-3">🏆</div>
                  <h3 className="font-kid text-lg md:text-2xl mb-2 md:mb-3 text-foreground">
                    Wow! You're learning so many new words!
                  </h3>
                  <p className="font-comic text-muted-foreground text-sm md:text-base mb-3 md:mb-4">
                    Try to use these words when you talk today. You're getting smarter!
                  </p>
                  <div className="flex justify-center gap-2 md:gap-4 flex-wrap">
                    <div className="bg-rainbow-red/60 px-3 py-1 md:px-4 md:py-2 rounded-full border-2 border-rainbow-red/70">
                      <span className="font-comic font-bold text-xs md:text-sm text-white">📖 Smart Reader</span>
                    </div>
                    <div className="bg-rainbow-blue/60 px-3 py-1 md:px-4 md:py-2 rounded-full border-2 border-rainbow-blue/70">
                      <span className="font-comic font-bold text-xs md:text-sm text-white">🧠 Word Explorer</span>
                    </div>
                    <div className="bg-rainbow-green/60 px-3 py-1 md:px-4 md:py-2 rounded-full border-2 border-rainbow-green/70">
                      <span className="font-comic font-bold text-xs md:text-sm text-white">⭐ Learning Star</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* YouTube Embed */}
        {story.youtubeUrl && (
          <div className="mb-6 md:mb-8 animate-slide-up">
            <div className="bg-gradient-to-br from-rainbow-red/20 to-rainbow-pink/20 border-4 border-rainbow-red/50 shadow-2xl hover:shadow-rainbow-pink/40 transition-all duration-500 rounded-3xl p-4 md:p-6">
              <div className="text-center mb-6">
                <h2 className="font-kid text-xl md:text-3xl text-foreground flex items-center justify-center gap-2 mb-2">
                  🎬 Watch the Story! 🍿
                </h2>
              </div>
              <YouTubeEmbed url={story.youtubeUrl} />
            </div>
          </div>
        )}

        {/* Enhanced Story Content - Continuous Flow */}
        <div className="mb-6 md:mb-8 space-y-6 md:space-y-8 animate-slide-up">
          <div className="text-center mb-6 md:mb-8">
            <h2 className="font-kid text-xl md:text-3xl text-foreground flex items-center justify-center gap-3 mb-4">
              📖 <span>Let's Read Together!</span> 📚
            </h2>
            <div className="flex flex-col md:flex-row justify-center gap-2 md:gap-4">
              <div className="bg-rainbow-red/30 px-3 py-1 md:px-4 md:py-2 rounded-full font-comic text-xs md:text-sm border-2 border-rainbow-red/40">
                🎯 Follow along with the pictures!
              </div>
              <div className="bg-rainbow-blue/30 px-3 py-1 md:px-4 md:py-2 rounded-full font-comic text-xs md:text-sm border-2 border-rainbow-blue/40">
                🌟 Can you spot the lesson?
              </div>
            </div>
          </div>

          {/* All Story Scenes in Continuous Flow */}
          {story.content.map((section, index) => (
            <div key={index} className="space-y-4 md:space-y-8">
              {/* Large Image Section - More Prominent */}
              {section.image && (
                <div className="relative">
                  <div className="text-center mb-2 md:mb-4">
                    <div className="inline-flex items-center gap-2 bg-white/90 px-4 py-2 md:px-6 md:py-3 rounded-full border-4 border-rainbow-yellow/70 shadow-lg">
                      <span className="text-lg md:text-2xl">🎨</span>
                      <span className="font-kid text-base md:text-xl text-gray-800 font-bold">
                        Scene {index + 1}
                      </span>
                      <span className="text-lg md:text-2xl">✨</span>
                    </div>
                  </div>
                  
                  <div className="relative rounded-2xl md:rounded-3xl overflow-hidden border-4 border-rainbow-red/50 shadow-2xl transform hover:scale-105 transition-all duration-500 hover:shadow-rainbow-purple/40">
                    <Image
                      src={section.image}
                      alt={`${story.title} - Scene ${index + 1}`}
                      width={800}
                      height={400}
                      className="w-full h-48 md:h-64 lg:h-80 object-cover"
                      priority={index === 0}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-rainbow-purple/20 via-transparent to-rainbow-yellow/10 pointer-events-none"></div>
                    
                    {/* Keep only book icon */}
                    <div className="absolute bottom-2 left-2 md:bottom-4 md:left-4">
                      <div className="bg-rainbow-blue/95 rounded-full p-1 shadow-lg border-2 border-white/50">
                        <span className="text-base md:text-xl">📖</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Enhanced Text Section */}
              <div className="bg-gradient-to-br from-rainbow-red/10 via-rainbow-yellow/10 to-rainbow-blue/10 border-4 border-dashed border-rainbow-purple/40 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-102 rounded-2xl md:rounded-3xl p-4 md:p-8">
                <div className="space-y-3 md:space-y-6">
                  {section.text.split('\n\n').map((paragraph, pIndex) => (
                    <div key={pIndex} className="relative">
                      <div className="absolute -left-4 md:-left-6 top-0 text-xl md:text-3xl opacity-30">
                        {pIndex === 0 ? "📝" : pIndex % 2 === 0 ? "✨" : "🌟"}
                      </div>
                      <p className="font-comic text-foreground leading-relaxed text-base md:text-lg lg:text-xl pl-3 md:pl-4 hover:pl-6 transition-all duration-300 hover:text-rainbow-purple">
                        {paragraph}
                      </p>
                    </div>
                  ))}
                </div>
                
                {/* Interactive elements for engagement */}
                <div className="mt-4 md:mt-6 flex flex-wrap justify-center gap-2">
                  <button className="bg-rainbow-yellow/40 hover:bg-rainbow-yellow/60 px-3 py-1 md:px-4 md:py-2 text-xs md:text-sm rounded-full border-2 border-rainbow-yellow/60 font-comic font-bold transition-all duration-300 hover:scale-110">
                    🔊 Read Aloud
                  </button>
                  <button className="bg-rainbow-purple/40 hover:bg-rainbow-purple/60 px-3 py-1 md:px-4 md:py-2 text-xs md:text-sm rounded-full border-2 border-rainbow-purple/60 font-comic font-bold transition-all duration-300 hover:scale-110">
                    💭 What happens next?
                  </button>
                </div>
              </div>
              
              {/* Add visual separator between scenes (except for the last one) */}
              {index < story.content.length - 1 && (
                <div className="flex items-center justify-center py-4 md:py-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-1 bg-gradient-to-r from-transparent via-rainbow-purple to-transparent rounded-full"></div>
                    <div className="text-2xl md:text-3xl animate-bounce-gentle">⭐</div>
                    <div className="w-8 h-1 bg-gradient-to-r from-transparent via-rainbow-purple to-transparent rounded-full"></div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Enhanced Moral Lesson */}
        <div className="mb-6 md:mb-8 animate-slide-up">
          <div className="bg-gradient-to-br from-rainbow-yellow/20 to-rainbow-green/20 border-4 border-rainbow-yellow/50 shadow-2xl hover:shadow-rainbow-green/40 transition-all duration-500 hover:scale-105 rounded-3xl p-4 md:p-8">
            <div className="text-center mb-4 md:mb-6">
              <h2 className="font-kid text-lg md:text-2xl text-foreground flex items-center justify-center gap-2 mb-4">
                <Lightbulb className="w-6 h-6 md:w-8 md:h-8 text-rainbow-yellow animate-bounce-gentle" />
                Moral of the Story ✨
              </h2>
            </div>
            <div className="bg-rainbow-yellow/30 p-4 md:p-6 rounded-2xl border-2 border-rainbow-yellow/50">
              <p className="font-comic text-base md:text-lg text-foreground leading-relaxed text-center font-bold">
                💡 {story.moralLesson} 🌟
              </p>
            </div>
          </div>
        </div>

        {/* Enhanced Navigation */}
        <div className="animate-slide-up">
          <div className="bg-gradient-to-br from-rainbow-green/30 to-rainbow-blue/30 border-4 border-rainbow-green/50 shadow-2xl hover:shadow-rainbow-blue/40 transition-all duration-500 rounded-3xl p-4 md:p-6">
            <div className="text-center mb-4 md:mb-6">
              <h2 className="font-kid text-lg md:text-2xl text-foreground flex items-center justify-center gap-2">
                🎯 <span>Reading Activities</span> 🎮
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mb-6">
              <div className="space-y-3">
                <div className="bg-white/90 p-3 md:p-4 rounded-xl border-4 border-rainbow-yellow/60 hover:scale-105 transition-all duration-300 shadow-lg">
                  <h3 className="font-comic font-bold text-gray-800 mb-1 md:mb-2 text-sm flex items-center gap-2">
                    📚 Reading Challenge
                  </h3>
                  <div className="space-y-2">
                    <Link
                      href={`/spelling-game/${story.id}`}
                      className="w-full bg-rainbow-yellow/50 hover:bg-rainbow-yellow/70 px-3 py-2 md:px-4 md:py-3 text-xs md:text-sm rounded-lg border-2 border-rainbow-yellow/70 font-comic font-bold transition-all duration-300 hover:scale-105 text-white block text-center"
                    >
                      🔤 Spell the Characters' Names
                    </Link>
                    <button className="w-full bg-rainbow-blue/50 hover:bg-rainbow-blue/70 px-3 py-2 md:px-4 md:py-3 text-xs md:text-sm rounded-lg border-2 border-rainbow-blue/70 font-comic font-bold transition-all duration-300 hover:scale-105 text-white">
                      📖 Read Aloud Practice
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="bg-rainbow-purple/40 p-3 md:p-4 rounded-xl border-4 border-rainbow-purple/60 hover:scale-105 transition-all duration-300">
                  <h3 className="font-comic font-bold text-rainbow-purple mb-1 md:mb-2 text-sm flex items-center gap-2">
                    🧠 Think & Learn
                  </h3>
                  <div className="space-y-2">
                    <Link
                      href={`/story-questions/${story.id}`}
                      className="w-full bg-rainbow-purple/50 hover:bg-rainbow-purple/70 px-3 py-2 md:px-4 md:py-3 text-xs md:text-sm rounded-lg border-2 border-rainbow-purple/70 font-comic font-bold transition-all duration-300 hover:scale-105 text-white block text-center"
                    >
                      ❓ Story Questions
                    </Link>
                    <button className="w-full bg-rainbow-green/50 hover:bg-rainbow-green/70 px-3 py-2 md:px-4 md:py-3 text-xs md:text-sm rounded-lg border-2 border-rainbow-green/70 font-comic font-bold transition-all duration-300 hover:scale-105 text-white">
                      🎨 Draw Your Favorite Scene
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-rainbow-red/30 via-rainbow-yellow/30 to-rainbow-green/30 p-3 md:p-4 rounded-xl border-4 border-dashed border-rainbow-blue/50 mb-6">
              <div className="text-center">
                <h3 className="font-kid text-base md:text-xl mb-2 md:mb-3 text-foreground flex items-center justify-center gap-2">
                  🌟 Reading Level: Perfect for You! 🌟
                </h3>
                <div className="flex justify-center gap-2 md:gap-4 flex-wrap">
                  <div className="bg-rainbow-blue/60 px-2 py-1 md:px-4 md:py-2 rounded-full border-2 border-rainbow-blue/70">
                    <span className="font-comic font-bold text-xs md:text-sm text-white">📏 {story.readingTime}</span>
                  </div>
                  <div className="bg-rainbow-green/60 px-2 py-1 md:px-4 md:py-2 rounded-full border-2 border-rainbow-green/70">
                    <span className="font-comic font-bold text-xs md:text-sm text-white">👥 {story.ageGroup}</span>
                  </div>
                  <div className="bg-rainbow-purple/60 px-2 py-1 md:px-4 md:py-2 rounded-full border-2 border-rainbow-purple/70">
                    <span className="font-comic font-bold text-xs md:text-sm text-white">✨ Safe & Educational</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Final Navigation */}
            <div className="flex flex-col sm:flex-row gap-2 md:gap-4 justify-center">
              <Link
                href="/stories"
                className="bg-rainbow-blue/60 hover:bg-rainbow-blue/80 text-white font-comic font-bold py-3 md:py-4 px-6 md:px-8 rounded-2xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 border-2 border-rainbow-blue/70"
              >
                <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
                <span>📚 Read Another Story</span>
              </Link>
              <Link
                href="/"
                className="bg-rainbow-green/60 hover:bg-rainbow-green/80 text-white font-comic font-bold py-3 md:py-4 px-6 md:px-8 rounded-2xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 border-2 border-rainbow-green/70"
              >
                <span>🏠 Go Home</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
