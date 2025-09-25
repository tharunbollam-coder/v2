'use client';

import { useState, use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Clock, Users, Volume2, VolumeX, ChevronLeft, ChevronRight } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import { series } from '@/data/series';
import { cn } from '@/utils/cn';

export default function ChapterDetail({ params }) {
  const [currentSection, setCurrentSection] = useState(0);
  const [isReading, setIsReading] = useState(false);

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
        const utterance = new SpeechSynthesisUtterance(chapter.content[currentSection].text);
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

        {/* Chapter Header */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          <div className="relative h-64 md:h-80">
            <Image
              src={chapter.image}
              alt={`${seriesData.title} - ${chapter.title}`}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white">
                <div className="text-6xl mb-4">📖</div>
                <div className="bg-white/20 rounded-full px-4 py-2 mb-2">
                  <span className="text-sm font-medium">Chapter {chapter.chapterNumber}</span>
                </div>
                <h1 className="font-kid text-2xl md:text-4xl">{chapter.title}</h1>
              </div>
            </div>
          </div>

          <div className="p-6">
            <p className="font-comic text-lg text-gray-700 mb-6 leading-relaxed">
              {chapter.summary}
            </p>

            {/* Chapter Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="flex items-center space-x-2 text-gray-600">
                <Clock className="h-5 w-5" />
                <span className="font-comic">{chapter.readingTime}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Users className="h-5 w-5" />
                <span className="font-comic">{seriesData.ageGroup}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <span className="font-comic">Published {new Date(chapter.publishDate).toLocaleDateString()}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleReadAloud}
                className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
              >
                {isReading ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                <span>{isReading ? 'Stop Reading' : 'Read Aloud'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Chapter Content */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-kid text-2xl text-gray-800">Chapter Content</h2>
              {chapter.content.length > 1 && (
                <div className="text-sm text-gray-500">
                  Section {currentSection + 1} of {chapter.content.length}
                </div>
              )}
            </div>

            {/* Section Navigation */}
            {chapter.content.length > 1 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {chapter.content.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSection(index)}
                    className={cn(
                      "px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200",
                      currentSection === index
                        ? "bg-indigo-500 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    )}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Current Section */}
          <div className="space-y-6">
            {chapter.content[currentSection]?.image && (
              <div className="relative h-64 md:h-80 rounded-xl overflow-hidden">
                <Image
                  src={chapter.content[currentSection].image}
                  alt={`${chapter.title} - Section ${currentSection + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            <div className="prose prose-lg max-w-none">
              <p className="font-comic text-lg leading-relaxed text-gray-800 whitespace-pre-line">
                {chapter.content[currentSection]?.text}
              </p>
            </div>
          </div>

          {/* Section Navigation Buttons */}
          {chapter.content.length > 1 && (
            <div className="flex justify-between mt-8">
              <button
                onClick={() => setCurrentSection(Math.max(0, currentSection - 1))}
                disabled={currentSection === 0}
                className={cn(
                  "flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200",
                  currentSection === 0
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-indigo-500 hover:bg-indigo-600 text-white hover:scale-105"
                )}
              >
                <ChevronLeft className="h-4 w-4" />
                <span>Previous</span>
              </button>

              <button
                onClick={() => setCurrentSection(Math.min(chapter.content.length - 1, currentSection + 1))}
                disabled={currentSection === chapter.content.length - 1}
                className={cn(
                  "flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200",
                  currentSection === chapter.content.length - 1
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-indigo-500 hover:bg-indigo-600 text-white hover:scale-105"
                )}
              >
                <span>Next</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
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
