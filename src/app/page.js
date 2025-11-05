

import Link from 'next/link';
import Image from 'next/image';
import { Sparkles, Star, Heart, BookOpen, Users, Clock, ArrowRight } from 'lucide-react';
import StoryCard from '@/components/StoryCard';
import { client } from "@/sanity/client";



const STORIES_QUERY = `*[_type == "story"] | order(_createdAt desc)[0...3] {
  _id,
  title,
  summary,
  "imageUrl": image,
  category,
  moralLesson,
  slug {
    current
  },
  readingTime,
  ageGroup
}`;

const SERIES_QUERY = `*[_type == "series"] | order(_createdAt desc)[0...3] {
  _id,
  title,
  description,
  "coverImage": coverImage,
  category,
  ageGroup,
  "chaptersCount": count(chapters[]->{_id})
}`;


export default async function Home() {
  
  const stories = await client.fetch(STORIES_QUERY);
  const series = await client.fetch(SERIES_QUERY);

  const featuredStories = stories;
  console.log(stories)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-soft overflow-hidden">
        <div className="absolute inset-0 bg-gradient-rainbow opacity-10"></div>
        <div className="container mx-auto text-center relative z-10">
          <div className="mb-8">
            <Image 
              src="https://res.cloudinary.com/dogmybs69/image/upload/v1758792316/file_00000000feec61fb932a2d919ac68153_1_pvsahw.png" 
              alt="Magical children's storybook with colorful illustrations showing fairy tale characters and educational themes for kids learning" 
              className="mx-auto rounded-3xl shadow-2xl max-w-4xl w-full object-contain"
              width={800}
              height={400}
              priority
            />
          </div>
          
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-8 h-8 text-rainbow-yellow animate-pulse" />
            <h1 className="font-kid text-4xl md:text-6xl text-gradient-rainbow">
              Welcome to Modak StoryTime!
            </h1>
            <Sparkles className="w-8 h-8 text-rainbow-pink animate-pulse" />
          </div>
          
          <p className="font-comic text-lg md:text-xl text-foreground/80 mb-8 max-w-2xl mx-auto leading-relaxed">
            🌟 Discover magical tales that teach valuable lessons! 🌟
            <br />
            Every story is an adventure filled with friendship, kindness, and learning!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/stories">
              <button className="font-comic font-bold text-lg px-8 py-6 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground transform hover:scale-105 transition-all duration-200 shadow-lg flex items-center space-x-2">
                <Heart className="w-5 h-5" />
                <span>Explore All Stories</span>
              </button>
            </Link>
            <button className="font-comic font-bold text-lg px-8 py-6 rounded-full bg-secondary hover:bg-secondary/90 text-secondary-foreground transform hover:scale-105 transition-all duration-200 shadow-lg flex items-center space-x-2">
              <Star className="w-5 h-5" />
              <span>Random Story</span>
            </button>
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
              <div key={story._id} style={{animationDelay: `${index * 0.2}s`}}>
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

      {/* Story Series Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10">
        <div className="container mx-auto">
          <div className="text-center mb-12 animate-slide-up">
            <h2 className="font-kid text-3xl md:text-4xl text-foreground mb-4">
              📖 New: Story Series! 📖
            </h2>
            <p className="font-comic text-lg text-muted-foreground max-w-2xl mx-auto">
              Follow amazing adventures chapter by chapter! Just like your favorite shows, but in stories!
            </p>
          </div>
          
          {series.length > 0 ? (
            <div className="card-modern backdrop-blur-sm max-w-6xl mx-auto animate-scale-in">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center">
                <div className="order-2 lg:order-1">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-4">
                    <Star className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500 fill-current flex-shrink-0" />
                    <span className="font-comic font-bold text-primary text-sm sm:text-base">NEW CHAPTERS WEEKLY!</span>
                  </div>
                  <h3 className="font-kid text-xl sm:text-2xl lg:text-3xl text-foreground mb-3 sm:mb-4">
                    {series[0]?.title}
                  </h3>
                  <p className="font-comic text-muted-foreground mb-4 sm:mb-6 text-sm sm:text-base leading-relaxed">
                    {series[0]?.description}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link href="/series" className="w-full sm:w-auto">
                      <button className="btn-primary shadow-colored hover:shadow-strong font-comic font-bold w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-3">
                        <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span>Explore Series</span>
                      </button>
                    </Link>
                    <Link href={`/series/${series[0]?._id || series[0]?.id}`} className="w-full sm:w-auto">
                      <button className="btn-secondary shadow-colored hover:shadow-strong font-comic font-bold w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-3">
                        <span>Start Reading →</span>
                      </button>
                    </Link>
                  </div>
                </div>
                <div className="relative order-1 lg:order-2">
                  <Image 
                    src={series[0]?.coverImage} 
                    alt={`${series[0]?.title} series cover showing magical adventures and educational themes for kids`}
                    width={600}
                    height={400}
                    className="w-full h-48 sm:h-64 lg:h-auto rounded-2xl shadow-2xl object-cover"
                    priority={false}
                  />
                  <div className="absolute top-2 sm:top-4 right-2 sm:right-4 bg-primary text-primary-foreground px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-comic font-bold">
                    Chapter {series[0]?.publishedChapters} Available!
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="card-modern backdrop-blur-sm max-w-4xl mx-auto animate-scale-in text-center py-12">
              <div className="text-6xl mb-4">🚀</div>
              <h3 className="font-kid text-2xl md:text-3xl text-foreground mb-4">New Adventures Coming Soon!</h3>
              <p className="font-comic text-lg text-muted-foreground mb-6">
                Our team is busy creating exciting new story series. Check back soon for more chapter-by-chapter fun!
              </p>
              <Link href="/stories">
                <button className="btn-primary shadow-colored hover:shadow-strong font-comic font-bold flex items-center justify-center space-x-2 px-6 py-3 mx-auto">
                  <BookOpen className="w-5 h-5" />
                  <span>Explore Other Stories</span>
                </button>
              </Link>
            </div>
          )}
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
