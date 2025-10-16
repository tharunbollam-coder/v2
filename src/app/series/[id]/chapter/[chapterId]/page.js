'use client';

import { useState, use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Clock, Users, Volume2, VolumeX, ChevronLeft, ChevronRight } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import { series } from '@/data/series';
import { cn } from '@/utils/cn';

export default function ChapterDetail({ params }) {
  const [isReading, setIsReading] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);

  const resolvedParams = use(params);
  const seriesData = series.find((s) => s.id === resolvedParams.id);
  const chapter = seriesData?.chapters.find((c) => c.id === resolvedParams.chapterId);

  if (!seriesData || !chapter) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😢</div>
          <h1 className="font-kid text-3xl text-gray-800 mb-4">Chapter Not Found</h1>
          <p className="font-comic text-gray-600 mb-6">
            Oops! We couldn't find that chapter. Let's go back to the series!
          </p>
          <Link
            href={`/series/${resolvedParams.id}`}
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-bold py-3 px-6 rounded-full transition-all duration-200 hover:scale-105"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Series</span>
          </Link>
        </div>
      </div>
    );
  }

  if (!chapter.isPublished) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔒</div>
          <h1 className="font-kid text-3xl text-gray-800 mb-4">Chapter Coming Soon</h1>
          <p className="font-comic text-gray-600 mb-6">
            This chapter hasn't been published yet. Check back later!
          </p>
          <Link
            href={`/series/${params.id}`}
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
    { label: seriesData.title, href: `/series/${seriesData.id}` },
    { label: `Chapter ${chapter.chapterNumber}`, href: `/series/${seriesData.id}/chapter/${chapter.id}` }
  ];

  const handleReadAloud = () => {
    if ('speechSynthesis' in window) {
      if (isReading) {
        window.speechSynthesis.cancel();
        setIsReading(false);
      } else {
        const fullText = chapter.content.map(section => section.text).join(' ');
        const utterance = new SpeechSynthesisUtterance(fullText);
        utterance.rate = 0.8;
        utterance.pitch = 1.1;
        utterance.onend = () => setIsReading(false);
        window.speechSynthesis.speak(utterance);
        setIsReading(true);
      }
    }
  };

  // Find previous and next chapters
  const currentChapterIndex = seriesData.chapters.findIndex(c => c.id === chapter.id);
  const previousChapter = currentChapterIndex > 0 ? seriesData.chapters[currentChapterIndex - 1] : null;
  const nextChapter = currentChapterIndex < seriesData.chapters.length - 1 ? seriesData.chapters[currentChapterIndex + 1] : null;

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        <Breadcrumbs items={breadcrumbItems} />

        {/* Enhanced Chapter Header */}
        <div className="card-modern overflow-hidden mb-8 animate-scale-in border-2 border-indigo-100">
          {/* Hero Image Section */}
          <div className="relative h-80 md:h-[500px]">
            <Image
              src={chapter.image}
              alt={`${seriesData.title} - ${chapter.title}`}
              fill
              className="object-cover"
              priority
            />
            {/* Lighter gradient to show more of the image */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
            
            {/* Floating Series Badge - Top corners only */}
            <div className="absolute top-4 left-4 right-4">
              <div className="flex justify-between items-start">
                <div className="bg-white/90 backdrop-blur-md rounded-full px-4 py-2 shadow-lg border border-white/30">
                  <span className="font-comic text-sm font-bold text-indigo-600">
                    📚 {seriesData.title}
                  </span>
                </div>
                <div className="bg-gradient-to-r from-green-400 to-emerald-500 text-white rounded-full px-3 py-1 shadow-lg">
                  <span className="font-comic text-xs font-bold">✨ NEW</span>
                </div>
              </div>
            </div>

            {/* Chapter Title - Bottom overlay only */}
            <div className="absolute bottom-0 left-0 right-0">
              <div className="bg-gradient-to-t from-black/80 via-black/60 to-transparent p-6 md:p-8">
                <div className="text-center text-white max-w-3xl mx-auto">
                  <div className="flex items-center justify-center mb-4">
                    <div className="bg-gradient-to-r from-indigo-500/90 to-purple-500/90 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/20 shadow-lg">
                      <span className="font-comic text-sm md:text-base font-bold text-indigo-100 uppercase tracking-wide">
                        Chapter {chapter.chapterNumber}
                      </span>
                    </div>
                  </div>
                  <h1 className="font-kid text-2xl md:text-4xl lg:text-5xl mb-3 drop-shadow-2xl leading-tight">
                    {chapter.title}
                  </h1>
                  <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 inline-block">
                    <span className="font-comic text-sm md:text-base text-white/95">
                      🌟 Ready for an adventure? 🌟
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-6 md:p-8 bg-gradient-to-br from-indigo-50/50 to-purple-50/50">
            {/* Chapter Summary */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-indigo-100 shadow-sm">
              <div className="flex items-start gap-3 mb-4">
                <div className="bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full p-2">
                  <span className="text-2xl">📝</span>
                </div>
                <div>
                  <h3 className="font-kid text-xl text-foreground mb-2">What's This Chapter About?</h3>
                  <p className="font-comic text-lg text-muted-foreground leading-relaxed">
                    {chapter.summary}
                  </p>
                </div>
              </div>
            </div>

            {/* Enhanced Chapter Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border-2 border-blue-100 hover:scale-102 transition-transform duration-200">
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-500 rounded-full p-2">
                    <Clock className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="font-comic text-sm text-blue-600 font-bold">Reading Time</div>
                    <div className="font-kid text-lg text-foreground">{chapter.readingTime}</div>
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
                    <span className="text-white text-sm">📅</span>
                  </div>
                  <div>
                    <div className="font-comic text-sm text-purple-600 font-bold">Published</div>
                    <div className="font-kid text-sm text-foreground">{new Date(chapter.publishDate).toLocaleDateString()}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleReadAloud}
                className="btn-primary shadow-colored hover:shadow-strong flex items-center justify-center space-x-3 px-6 py-4 text-lg font-bold group"
              >
                {isReading ? <VolumeX className="h-5 w-5 group-hover:scale-110 transition-transform" /> : <Volume2 className="h-5 w-5 group-hover:scale-110 transition-transform" />}
                <span>{isReading ? '🔇 Stop Reading' : '🔊 Listen to Story'}</span>
              </button>
              
              <div className="flex items-center justify-center space-x-2 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-xl px-4 py-3 border-2 border-yellow-200">
                <span className="text-2xl">🎯</span>
                <span className="font-comic text-sm font-bold text-orange-700">
                  Scroll down to start reading!
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Chapter Content - All Sections Sequential */}
        <div className="space-y-8 mb-8">
          <div className="text-center mb-8">
            <h2 className="font-kid text-2xl md:text-3xl text-foreground mb-4 flex items-center justify-center gap-2">
              📖 <span>Chapter Story</span> ✨
            </h2>
            <p className="font-comic text-muted-foreground">
              Read through the complete chapter below - no clicking needed!
            </p>
          </div>

          {/* All Sections Displayed Sequentially */}
          {chapter.content.map((section, index) => (
            <div key={index} className="card-modern animate-slide-up" style={{animationDelay: `${index * 0.2}s`}}>
              {/* Section Header */}
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-100 to-purple-100 px-4 py-2 rounded-full border-2 border-indigo-200">
                  <span className="text-lg">📚</span>
                  <span className="font-kid text-lg text-indigo-700 font-bold">
                    Part {index + 1}
                  </span>
                  <span className="text-lg">🌟</span>
                </div>
              </div>

              {/* Section Image */}
              {section.image && (
                <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden mb-6 shadow-lg">
                  <Image
                    src={section.image}
                    alt={`${chapter.title} - Part ${index + 1}`}
                    fill
                    className="object-cover hover:scale-102 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2">
                      <p className="font-comic text-sm text-gray-700 font-medium">
                        Part {index + 1} of {chapter.content.length}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Section Text */}
              <div className="prose prose-lg max-w-none">
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border-l-4 border-indigo-300">
                  <p className="font-comic text-lg leading-relaxed text-foreground whitespace-pre-line m-0">
                    {section.text}
                  </p>
                </div>
              </div>

              {/* Section Separator */}
              {index < chapter.content.length - 1 && (
                <div className="flex items-center justify-center mt-8">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <div className="h-px bg-gradient-to-r from-transparent via-indigo-300 to-transparent w-16"></div>
                    <span className="text-2xl">✨</span>
                    <div className="h-px bg-gradient-to-r from-transparent via-indigo-300 to-transparent w-16"></div>
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Chapter Completion Message */}
          <div className="card-modern text-center bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200">
            <div className="text-4xl mb-4">🎉</div>
            <h3 className="font-kid text-xl text-foreground mb-2">
              Great job reading the whole chapter!
            </h3>
            <p className="font-comic text-muted-foreground">
              You've completed all {chapter.content.length} parts of this chapter.
            </p>
          </div>
        </div>

        {/* Chapter Navigation */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="flex gap-3">
            <Link
              href={`/series/${seriesData.id}`}
              className="flex items-center space-x-2 bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 hover:scale-105"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Series</span>
            </Link>

            {previousChapter && previousChapter.isPublished && (
              <Link
                href={`/series/${seriesData.id}/chapter/${previousChapter.id}`}
                className="flex items-center space-x-2 bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 hover:scale-105"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous Chapter</span>
              </Link>
            )}
          </div>

          {nextChapter && nextChapter.isPublished && (
            <Link
              href={`/series/${seriesData.id}/chapter/${nextChapter.id}`}
              className="flex items-center space-x-2 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 hover:scale-105"
            >
              <span>Next Chapter</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
