'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Sparkles, Star, Heart, BookOpen, Users, Clock, ArrowRight } from 'lucide-react';
import StoryCard from '@/components/StoryCard';
import { stories } from '@/data/stories';

export default function Home() {
  const featuredStories = stories.slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 px-4 bg-gradient-hero overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10"></div>
        <div className="container mx-auto text-center relative z-10">
          <div className="mb-12 animate-slide-up">
            <div className="mx-auto rounded-3xl shadow-strong max-w-4xl w-full h-72 md:h-96 bg-gradient-primary flex items-center justify-center glass-card">
              <div className="text-white text-center">
                <BookOpen className="h-24 w-24 mx-auto mb-6 animate-bounce-gentle" />
                <h2 className="text-2xl md:text-4xl font-heading">Magical Stories Await!</h2>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-center gap-2 mb-6 animate-scale-in">
            <Sparkles className="w-8 h-8 text-yellow-300 animate-pulse" />
            <h1 className="font-kid text-4xl md:text-6xl text-white text-balance">
              Welcome to KidsStories!
            </h1>
            <Sparkles className="w-8 h-8 text-pink-300 animate-pulse" />
          </div>
          
          <p className="font-comic text-lg md:text-xl text-white/95 mb-8 max-w-2xl mx-auto leading-relaxed animate-slide-up">
            🌟 Discover magical tales that teach valuable lessons! 🌟
            <br />
            Every story is an adventure filled with friendship, kindness, and learning!
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16 animate-scale-in">
            <Link
              href="/stories"
              className="btn-primary shadow-colored hover:shadow-strong flex items-center space-x-3 text-lg px-8 py-6 font-bold"
            >
              <Heart className="h-5 w-5" />
              <span>Explore All Stories</span>
            </Link>
            <Link
              href="/series"
              className="btn-secondary shadow-colored hover:shadow-strong flex items-center space-x-3 text-lg px-8 py-6 font-bold"
            >
              <Star className="h-5 w-5" />
              <span>Story Series</span>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto animate-slide-up">
            <div className="glass rounded-3xl p-8 text-white hover:scale-105 transition-all duration-300">
              <BookOpen className="h-12 w-12 mx-auto mb-4 animate-bounce-gentle text-amber-300" />
              <div className="text-3xl font-bold mb-2">{stories.length}+</div>
              <div className="text-white/90">Amazing Stories</div>
            </div>
            <div className="glass rounded-3xl p-8 text-white hover:scale-105 transition-all duration-300">
              <Users className="h-12 w-12 mx-auto mb-4 animate-bounce-gentle text-emerald-300" style={{animationDelay: '0.5s'}} />
              <div className="text-3xl font-bold mb-2">3-12</div>
              <div className="text-white/90">Age Range</div>
            </div>
            <div className="glass rounded-3xl p-8 text-white hover:scale-105 transition-all duration-300">
              <Heart className="h-12 w-12 mx-auto mb-4 animate-bounce-gentle text-pink-300" style={{animationDelay: '1s'}} />
              <div className="text-3xl font-bold mb-2">100%</div>
              <div className="text-white/90">Safe & Educational</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Stories */}
      <section className="py-24 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12 animate-slide-up">
            <h2 className="font-kid text-3xl md:text-4xl text-foreground mb-4">
              ✨ Featured Educational Stories ✨
            </h2>
            <p className="font-comic text-lg text-muted-foreground max-w-2xl mx-auto">
              Start your reading adventure with these wonderful tales full of life lessons!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {featuredStories.map((story, index) => (
              <div key={story.id} style={{animationDelay: `${index * 0.2}s`}}>
                <StoryCard story={story} />
              </div>
            ))}
          </div>

          <div className="text-center mt-12 animate-scale-in">
            <Link
              href="/stories"
              className="btn-primary shadow-colored hover:shadow-strong inline-flex items-center space-x-3 text-lg px-8 py-4 font-bold"
            >
              <span>See All Stories →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 bg-gradient-soft">
        <div className="container mx-auto">
          <div className="text-center mb-12 animate-slide-up">
            <h3 className="font-kid text-3xl md:text-4xl text-foreground mb-12">
              Why Kids Love Our Educational Stories? 🎈
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card-modern text-center animate-slide-up border-2 border-blue-200/50">
              <div className="text-6xl mb-4" role="img" aria-label="Books emoji">📚</div>
              <h4 className="font-kid text-xl mb-3 text-foreground">Educational Content</h4>
              <p className="font-comic text-muted-foreground">
                Every story teaches important life lessons about friendship, honesty, kindness, and moral values that shape character!
              </p>
            </div>
            
            <div className="card-modern text-center animate-slide-up border-2 border-green-200/50" style={{animationDelay: '0.2s'}}>
              <div className="text-6xl mb-4" role="img" aria-label="Art palette emoji">🎨</div>
              <h4 className="font-kid text-xl mb-3 text-foreground">Interactive Learning</h4>
              <p className="font-comic text-muted-foreground">
                Beautiful illustrations, spelling games, comprehension questions, and interactive activities make reading engaging and fun!
              </p>
            </div>
            
            <div className="card-modern text-center animate-slide-up border-2 border-purple-200/50" style={{animationDelay: '0.4s'}}>
              <div className="text-6xl mb-4" role="img" aria-label="Heart emoji">❤️</div>
              <h4 className="font-kid text-xl mb-3 text-foreground">Child-Safe Environment</h4>
              <p className="font-comic text-muted-foreground">
                All our stories are carefully curated to be age-appropriate, positive, and completely safe for children of all ages!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-24 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12 animate-slide-up">
            <h3 className="font-kid text-3xl md:text-4xl text-foreground mb-4">
              🌟 Discover Stories by Category 🌟
            </h3>
            <p className="font-comic text-lg text-muted-foreground max-w-3xl mx-auto mb-12">
              Find the perfect stories for every moment and learning goal!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link href="/stories" className="group">
              <div className="bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900/30 dark:to-purple-800/30 p-6 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-2 border-purple-200/50 dark:border-purple-700/50">
                <div className="text-5xl mb-3" role="img" aria-label="Moon emoji">🌙</div>
                <h4 className="font-kid text-lg mb-2 text-foreground">Bedtime Stories for Kids</h4>
                <p className="font-comic text-sm text-muted-foreground">
                  Gentle tales perfect for peaceful nights and sweet dreams
                </p>
              </div>
            </Link>
            
            <Link href="/stories" className="group">
              <div className="bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/30 p-6 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-2 border-green-200/50 dark:border-green-700/50">
                <div className="text-5xl mb-3" role="img" aria-label="Heart emoji">❤️</div>
                <h4 className="font-kid text-lg mb-2 text-foreground">Moral Stories for Kids</h4>
                <p className="font-comic text-sm text-muted-foreground">
                  Character-building tales that teach values and life lessons
                </p>
              </div>
            </Link>
            
            <Link href="/stories" className="group">
              <div className="bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 p-6 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-2 border-blue-200/50 dark:border-blue-700/50">
                <div className="text-5xl mb-3" role="img" aria-label="Book emoji">📖</div>
                <h4 className="font-kid text-lg mb-2 text-foreground">English Stories for Kids</h4>
                <p className="font-comic text-sm text-muted-foreground">
                  Fun stories that improve reading and language skills
                </p>
              </div>
            </Link>
            
            <Link href="/stories" className="group">
              <div className="bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-900/30 dark:to-orange-800/30 p-6 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-2 border-orange-200/50 dark:border-orange-700/50">
                <div className="text-5xl mb-3" role="img" aria-label="Star emoji">⭐</div>
                <h4 className="font-kid text-lg mb-2 text-foreground">Classic Tales for Children</h4>
                <p className="font-comic text-sm text-muted-foreground">
                  Timeless stories that have delighted generations
                </p>
              </div>
            </Link>
            
            <Link href="/stories" className="group">
              <div className="bg-gradient-to-br from-pink-100 to-pink-200 dark:from-pink-900/30 dark:to-pink-800/30 p-6 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-2 border-pink-200/50 dark:border-pink-700/50">
                <div className="text-5xl mb-3" role="img" aria-label="Rainbow emoji">🌈</div>
                <h4 className="font-kid text-lg mb-2 text-foreground">Fairy Tales for Kids</h4>
                <p className="font-comic text-sm text-muted-foreground">
                  Magical adventures with princesses, dragons, and wonder
                </p>
              </div>
            </Link>
            
            <Link href="/stories" className="group">
              <div className="bg-gradient-to-br from-yellow-100 to-yellow-200 dark:from-yellow-900/30 dark:to-yellow-800/30 p-6 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-2 border-yellow-200/50 dark:border-yellow-700/50">
                <div className="text-5xl mb-3" role="img" aria-label="Lightbulb emoji">💡</div>
                <h4 className="font-kid text-lg mb-2 text-foreground">Educational Stories</h4>
                <p className="font-comic text-sm text-muted-foreground">
                  Learning adventures that make education exciting
                </p>
              </div>
            </Link>
            
            <Link href="/stories" className="group">
              <div className="bg-gradient-to-br from-teal-100 to-teal-200 dark:from-teal-900/30 dark:to-teal-800/30 p-6 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-2 border-teal-200/50 dark:border-teal-700/50">
                <div className="text-5xl mb-3" role="img" aria-label="Paw emoji">🐾</div>
                <h4 className="font-kid text-lg mb-2 text-foreground">Animal Stories for Kids</h4>
                <p className="font-comic text-sm text-muted-foreground">
                  Heartwarming tales featuring lovable animal friends
                </p>
              </div>
            </Link>
            
            <Link href="/stories" className="group">
              <div className="bg-gradient-to-br from-indigo-100 to-indigo-200 dark:from-indigo-900/30 dark:to-indigo-800/30 p-6 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-2 border-indigo-200/50 dark:border-indigo-700/50">
                <div className="text-5xl mb-3" role="img" aria-label="Smile emoji">😊</div>
                <h4 className="font-kid text-lg mb-2 text-foreground">Short Stories for Kids</h4>
                <p className="font-comic text-sm text-muted-foreground">
                  Perfect bite-sized tales for busy little readers
                </p>
              </div>
            </Link>
          </div>

        </div>
      </section>
    </div>
  );
}
