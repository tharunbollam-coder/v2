'use client';

import { useState, use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Clock, Users, Lightbulb, Heart, Volume2, VolumeX, GamepadIcon, HelpCircle, BookOpen } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import YouTubeEmbed from '@/components/YouTubeEmbed';
import { stories } from '@/data/stories';
import { cn } from '@/utils/cn';

export default function StoryDetail({ params }) {
  const router = useRouter();
  const [showWordHelpers, setShowWordHelpers] = useState(false);
  const [isReading, setIsReading] = useState(false);

  const resolvedParams = use(params);
  const story = stories.find((s) => s.id === resolvedParams.id);

  if (!story) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😢</div>
          <h1 className="font-kid text-3xl text-foreground mb-4">Story Not Found</h1>
          <p className="font-comic text-muted-foreground mb-6">
            Oops! We couldn't find that story. Let's go back and find another adventure!
          </p>
          <Link
            href="/stories"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 px-6 rounded-full transition-all duration-200 hover:scale-105"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Stories</span>
          </Link>
        </div>
      </div>
    );
  }

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
