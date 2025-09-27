'use client';

import { use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Clock, Users, Star, BookOpen, Play, Lock, Calendar } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import { series } from '@/data/series';
import { cn } from '@/utils/cn';

export default function SeriesDetail({ params }) {
  const resolvedParams = use(params);
  const seriesData = series.find((s) => s.id === resolvedParams.id);

  if (!seriesData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😢</div>
          <h1 className="font-kid text-3xl text-gray-800 mb-4">Series Not Found</h1>
          <p className="font-comic text-gray-600 mb-6">
            Oops! We couldn't find that series. Let's go back and find another adventure!
          </p>
          <Link
            href="/series"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-bold py-3 px-6 rounded-full transition-all duration-200 hover:scale-105"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Series</span>
          </Link>
        </div>
      </div>
    );
  }

  const breadcrumbItems = [
    { label: 'Series', href: '/series' },
    { label: seriesData.title, href: `/series/${resolvedParams.id}` }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'ongoing': return 'bg-green-500';
      case 'completed': return 'bg-blue-500';
      case 'hiatus': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'ongoing': return 'Ongoing';
      case 'completed': return 'Complete';
      case 'hiatus': return 'On Break';
      default: return 'Unknown';
    }
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        <Breadcrumbs items={breadcrumbItems} />

        {/* Enhanced Series Header */}
        <div className="card-modern overflow-hidden mb-8 animate-scale-in border-2 border-indigo-100">
          <div className="relative h-80 md:h-[500px]">
            <Image
              src={seriesData.coverImage}
              alt={seriesData.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
            
            {/* Top Badges */}
            <div className="absolute top-4 left-4 right-4">
              <div className="flex justify-end items-start">
                <div className="flex gap-2">
                  <div className="flex items-center space-x-1 bg-white/90 backdrop-blur-md rounded-full px-3 py-2 shadow-lg border border-white/30">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-bold text-gray-800">{seriesData.rating}</span>
                  </div>
                  <span className={cn(
                    "text-white px-3 py-2 rounded-full text-sm font-medium shadow-lg",
                    getStatusColor(seriesData.status)
                  )}>
                    {getStatusText(seriesData.status)}
                  </span>
                </div>
              </div>
            </div>

            {/* Series Title - Bottom overlay */}
            <div className="absolute bottom-0 left-0 right-0">
              <div className="bg-gradient-to-t from-black/80 via-black/60 to-transparent p-6 md:p-8">
                <div className="text-center text-white max-w-4xl mx-auto">
                  <h1 className="font-kid text-3xl md:text-5xl lg:text-6xl mb-4 drop-shadow-2xl leading-tight">
                    {seriesData.title}
                  </h1>
                  <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 inline-block">
                    <span className="font-comic text-sm md:text-base text-white/95">
                      🌟 {seriesData.publishedChapters} of {seriesData.totalChapters} chapters available! 🌟
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 md:p-8 bg-gradient-to-br from-indigo-50/50 to-purple-50/50">
            {/* Series Description */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-indigo-100 shadow-sm">
              <div className="flex items-start gap-3 mb-4">
                <div className="bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full p-2">
                  <span className="text-2xl">📖</span>
                </div>
                <div>
                  <h3 className="font-kid text-xl text-foreground mb-2">About This Series</h3>
                  <p className="font-comic text-lg text-muted-foreground leading-relaxed">
                    {seriesData.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Enhanced Series Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border-2 border-blue-100 hover:scale-102 transition-transform duration-200">
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-500 rounded-full p-2">
                    <BookOpen className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="font-comic text-sm text-blue-600 font-bold">Chapters</div>
                    <div className="font-kid text-lg text-foreground">{seriesData.publishedChapters}/{seriesData.totalChapters}</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border-2 border-green-100 hover:scale-102 transition-transform duration-200">
                <div className="flex items-center space-x-3">
                  <div className="bg-green-500 rounded-full p-2">
                    <Users className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="font-comic text-sm text-green-600 font-bold">Perfect For</div>
                    <div className="font-kid text-lg text-foreground">{seriesData.ageGroup}</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border-2 border-purple-100 hover:scale-102 transition-transform duration-200">
                <div className="flex items-center space-x-3">
                  <div className="bg-purple-500 rounded-full p-2">
                    <Calendar className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="font-comic text-sm text-purple-600 font-bold">Schedule</div>
                    <div className="font-kid text-sm text-foreground">{seriesData.publishSchedule}</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-4 border-2 border-yellow-100 hover:scale-102 transition-transform duration-200">
                <div className="flex items-center space-x-3">
                  <div className="bg-yellow-500 rounded-full p-2">
                    <Star className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="font-comic text-sm text-yellow-600 font-bold">Subscribers</div>
                    <div className="font-kid text-lg text-foreground">{seriesData.subscribers}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Progress Section */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-indigo-100 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-full p-2">
                  <span className="text-2xl">📊</span>
                </div>
                <div>
                  <h3 className="font-kid text-lg text-foreground">Series Progress</h3>
                  <span className="font-comic text-muted-foreground">
                    {Math.round((seriesData.publishedChapters / seriesData.totalChapters) * 100)}% Complete
                  </span>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-green-400 to-emerald-500 h-4 rounded-full transition-all duration-500 shadow-sm"
                  style={{ width: `${(seriesData.publishedChapters / seriesData.totalChapters) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Enhanced Tags */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-indigo-100 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-gradient-to-r from-pink-100 to-purple-100 rounded-full p-2">
                  <span className="text-2xl">🏷️</span>
                </div>
                <h3 className="font-kid text-lg text-foreground">Story Themes</h3>
              </div>
              <div className="flex flex-wrap gap-3">
                {seriesData.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-800 px-4 py-2 rounded-full text-sm font-bold border-2 border-indigo-200 hover:scale-105 transition-transform duration-200 shadow-sm"
                  >
                    ✨ {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Mobile-Friendly Chapters List */}
        <div className="card-modern p-4 md:p-8 animate-slide-up border-2 border-indigo-100">
          <div className="flex items-center gap-3 mb-6 md:mb-8">
            <div className="bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full p-2 md:p-3">
              <span className="text-2xl md:text-3xl">📖</span>
            </div>
            <div>
              <h2 className="font-kid text-xl md:text-2xl lg:text-3xl text-foreground">Story Chapters</h2>
              <p className="font-comic text-sm md:text-base text-muted-foreground">Click on any published chapter to start reading!</p>
            </div>
          </div>
          
          <div className="space-y-3 md:space-y-4">
            {seriesData.chapters.map((chapter) => (
              <div
                key={chapter.id}
                className={cn(
                  "border rounded-xl p-4 md:p-6 transition-all duration-200 hover-lift-subtle",
                  chapter.isPublished
                    ? "border-gray-200 hover:border-indigo-300 hover:shadow-colored bg-white"
                    : "border-gray-100 bg-gray-50"
                )}
              >
                {/* Mobile-First Layout */}
                <div className="space-y-3">
                  {/* Chapter Header */}
                  <div className="flex items-start gap-3">
                    <div className={cn(
                      "w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-sm md:text-base font-bold flex-shrink-0",
                      chapter.isPublished
                        ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-sm"
                        : "bg-gray-300 text-gray-600"
                    )}>
                      {chapter.chapterNumber}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className={cn(
                          "font-comic text-base md:text-lg font-bold truncate",
                          chapter.isPublished ? "text-gray-800" : "text-gray-500"
                        )}>
                          {chapter.title}
                        </h3>
                        {!chapter.isPublished && (
                          <Lock className="h-4 w-4 text-gray-400 flex-shrink-0" />
                        )}
                      </div>
                      
                      {/* Chapter Meta Info - Mobile Optimized */}
                      <div className="flex flex-wrap items-center gap-3 text-xs md:text-sm text-gray-500">
                        {chapter.isPublished && (
                          <>
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3 md:h-4 md:w-4" />
                              <span>{chapter.readingTime}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3 md:h-4 md:w-4" />
                              <span className="hidden sm:inline">Published </span>
                              <span>{new Date(chapter.publishDate).toLocaleDateString()}</span>
                            </div>
                          </>
                        )}
                        {!chapter.isPublished && chapter.publishDate && (
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3 md:h-4 md:w-4" />
                            <span>Coming {new Date(chapter.publishDate).toLocaleDateString()}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Chapter Summary */}
                  <p className={cn(
                    "font-comic text-sm md:text-base leading-relaxed pl-13 md:pl-15",
                    chapter.isPublished ? "text-gray-600" : "text-gray-400"
                  )}>
                    {chapter.summary}
                  </p>

                  {/* Action Button - Full Width on Mobile */}
                  <div className="pl-13 md:pl-15">
                    {chapter.isPublished ? (
                      <Link
                        href={`/series/${resolvedParams.id}/chapter/${chapter.id}`}
                        className="inline-flex items-center justify-center gap-2 w-full sm:w-auto bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-bold py-3 px-6 rounded-xl transition-smooth hover-lift shadow-sm min-h-[44px]"
                      >
                        <Play className="h-4 w-4" />
                        <span>Start Reading</span>
                      </Link>
                    ) : (
                      <div className="inline-flex items-center justify-center gap-2 w-full sm:w-auto bg-gray-300 text-gray-500 font-bold py-3 px-6 rounded-xl cursor-not-allowed min-h-[44px]">
                        <Lock className="h-4 w-4" />
                        <span>Coming Soon</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile-Friendly Empty State */}
          {seriesData.chapters.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4 animate-bounce-gentle">📚</div>
              <h3 className="font-kid text-xl md:text-2xl text-gray-600 mb-2">No Chapters Yet</h3>
              <p className="font-comic text-gray-500 max-w-md mx-auto">
                This series is just getting started! Check back soon for exciting new chapters.
              </p>
            </div>
          )}
        </div>

        {/* Enhanced Mobile-Friendly Navigation */}
        <div className="mt-8 space-y-4 sm:space-y-0 sm:flex sm:justify-between sm:items-center">
          <Link
            href="/series"
            className="flex items-center justify-center gap-2 w-full sm:w-auto bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-xl transition-smooth hover-lift shadow-sm min-h-[44px]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Series</span>
          </Link>

          {seriesData.chapters.some(c => c.isPublished) && (
            <Link
              href={`/series/${resolvedParams.id}/chapter/${seriesData.chapters.find(c => c.isPublished).id}`}
              className="flex items-center justify-center gap-2 w-full sm:w-auto bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-bold py-3 px-6 rounded-xl transition-smooth hover-lift shadow-sm min-h-[44px]"
            >
              <Play className="w-4 h-4" />
              <span>Start Reading</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
