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

        {/* Series Header */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          <div className="relative h-64 md:h-80">
            <Image
              src={seriesData.coverImage}
              alt={seriesData.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white">
                <BookOpen className="h-24 w-24 mx-auto mb-4 animate-bounce-gentle" />
                <h1 className="font-kid text-2xl md:text-4xl">{seriesData.title}</h1>
              </div>
            </div>
            
            {/* Status and Rating Badges */}
            <div className="absolute top-4 right-4 flex gap-2">
              <div className="flex items-center space-x-1 bg-white/90 rounded-full px-3 py-1">
                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                <span className="text-sm font-bold text-gray-800">{seriesData.rating}</span>
              </div>
              <span className={cn(
                "text-white px-3 py-1 rounded-full text-sm font-medium",
                getStatusColor(seriesData.status)
              )}>
                {getStatusText(seriesData.status)}
              </span>
            </div>
          </div>

          <div className="p-6">
            <p className="font-comic text-lg text-gray-700 mb-6 leading-relaxed">
              {seriesData.description}
            </p>

            {/* Series Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="flex items-center space-x-2 text-gray-600">
                <BookOpen className="h-5 w-5" />
                <span className="font-comic">{seriesData.publishedChapters}/{seriesData.totalChapters} chapters</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Users className="h-5 w-5" />
                <span className="font-comic">{seriesData.ageGroup}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Calendar className="h-5 w-5" />
                <span className="font-comic">{seriesData.publishSchedule}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Star className="h-5 w-5" />
                <span className="font-comic">{seriesData.subscribers} subscribers</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="font-comic text-gray-600">Series Progress</span>
                <span className="font-comic text-gray-600">
                  {Math.round((seriesData.publishedChapters / seriesData.totalChapters) * 100)}% Complete
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-indigo-500 to-purple-500 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${(seriesData.publishedChapters / seriesData.totalChapters) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {seriesData.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Chapters List */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="font-kid text-2xl text-gray-800 mb-6">📖 Chapters</h2>
          
          <div className="space-y-4">
            {seriesData.chapters.map((chapter) => (
              <div
                key={chapter.id}
                className={cn(
                  "border rounded-xl p-4 transition-all duration-200",
                  chapter.isPublished
                    ? "border-gray-200 hover:border-indigo-300 hover:shadow-md bg-white"
                    : "border-gray-100 bg-gray-50"
                )}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold",
                        chapter.isPublished
                          ? "bg-indigo-500 text-white"
                          : "bg-gray-300 text-gray-600"
                      )}>
                        {chapter.chapterNumber}
                      </div>
                      <h3 className={cn(
                        "font-comic text-lg font-bold",
                        chapter.isPublished ? "text-gray-800" : "text-gray-500"
                      )}>
                        {chapter.title}
                      </h3>
                      {!chapter.isPublished && (
                        <Lock className="h-4 w-4 text-gray-400" />
                      )}
                    </div>
                    
                    <p className={cn(
                      "font-comic mb-3",
                      chapter.isPublished ? "text-gray-600" : "text-gray-400"
                    )}>
                      {chapter.summary}
                    </p>

                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      {chapter.isPublished && (
                        <>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>{chapter.readingTime}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4" />
                            <span>Published {new Date(chapter.publishDate).toLocaleDateString()}</span>
                          </div>
                        </>
                      )}
                      {!chapter.isPublished && chapter.publishDate && (
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>Coming {new Date(chapter.publishDate).toLocaleDateString()}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="ml-4">
                    {chapter.isPublished ? (
                      <Link
                        href={`/series/${resolvedParams.id}/chapter/${chapter.id}`}
                        className="flex items-center space-x-2 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-bold py-2 px-4 rounded-lg transition-all duration-200 hover:scale-105"
                      >
                        <Play className="h-4 w-4" />
                        <span>Read</span>
                      </Link>
                    ) : (
                      <div className="flex items-center space-x-2 bg-gray-300 text-gray-500 font-bold py-2 px-4 rounded-lg cursor-not-allowed">
                        <Lock className="h-4 w-4" />
                        <span>Locked</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-8 flex justify-between">
          <Link
            href="/series"
            className="flex items-center space-x-2 bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 hover:scale-105"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Series</span>
          </Link>

          {seriesData.chapters.some(c => c.isPublished) && (
            <Link
              href={`/series/${resolvedParams.id}/chapter/${seriesData.chapters.find(c => c.isPublished).id}`}
              className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 hover:scale-105"
            >
              Start Reading
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
