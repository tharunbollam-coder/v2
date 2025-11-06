'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Clock, Users, Volume2, VolumeX, ChevronLeft, ChevronRight, BookOpen, Calendar } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import { client } from '@/sanity/client';
import { cn } from '@/utils/cn';

// Sanity query to fetch a single series by ID with its chapters
const SERIES_QUERY = `*[_type == "series" && _id == $id][0] {
  _id,
  title,
  "chapters": chapters[]->{
    _id,
    id,
    title,
    chapterNumber,
    content,
    isPublished,
    publishDate,
    readingTime,
    "image": image.asset->url
  } | order(chapterNumber asc)
}`;

export default function ChapterDetail() {
  const [isReading, setIsReading] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const [seriesData, setSeriesData] = useState(null);
  const [chapter, setChapter] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const params = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const seriesId = params.id;
        const chapterId = params.chapterId;
        
        // Fetch series data from Sanity
        const result = await client.fetch(SERIES_QUERY, { id: seriesId });
        
        if (!result) {
          throw new Error('Series not found');
        }
        
        setSeriesData(result);
        
        // Find the chapter by ID or chapter number
        let foundChapter = result.chapters?.find(
          (c) => c.id === chapterId || 
                c._id === chapterId ||
                c.id === `chapter-${chapterId}` ||
                c.chapterNumber?.toString() === chapterId
        );
        
        // If not found by ID, try to find by chapter number
        if (!foundChapter && !isNaN(chapterId)) {
          const chapterNum = parseInt(chapterId, 10);
          foundChapter = result.chapters?.find(c => c.chapterNumber === chapterNum);
        }
        
        if (!foundChapter) {
          throw new Error('Chapter not found');
        }
        
        setChapter(foundChapter);
      } catch (err) {
        setError(err.message || 'Failed to load chapter');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [params.id, params.chapterId]);
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-center">
          <div className="h-12 w-12 mx-auto mb-4 bg-gray-200 rounded-full"></div>
          <div className="h-6 w-48 bg-gray-200 rounded mx-auto mb-2"></div>
          <div className="h-4 w-64 bg-gray-200 rounded mx-auto"></div>
        </div>
      </div>
    );
  }

  if (error || !seriesData || !chapter) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😢</div>
          <h1 className="font-kid text-3xl text-gray-800 mb-4">
            {error || 'Chapter Not Found'}
          </h1>
          <p className="font-comic text-gray-600 mb-6">
            Oops! We couldn't find that chapter. Let's go back to the series!
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
    { label: seriesData.title, href: `/series/${seriesData._id || seriesData.id}` },
    { label: `Chapter ${chapter.chapterNumber}`, href: `/series/${seriesData._id || seriesData.id}/chapter/${chapter._id || chapter.id}` }
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

  // Find previous and next published chapters
  const currentChapterIndex = seriesData.chapters.findIndex(c => c.id === chapter.id || c._id === chapter.id);
  const previousChapter = seriesData.chapters
    .slice(0, currentChapterIndex)
    .reverse()
    .find(ch => ch.isPublished);
  
  const nextChapter = seriesData.chapters
    .slice(currentChapterIndex + 1)
    .find(ch => ch.isPublished);
    
  // Helper function to get the correct chapter URL
  const getChapterUrl = (chapter) => {
    if (!chapter) return '#';
    const chapterId = chapter.chapterNumber || chapter.id || chapter._id;
    return `/series/${seriesData._id || seriesData.id}/chapter/${chapterId}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Decorative Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
      </div>

      {/* Header Section */}
      <header className="relative bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')] opacity-10"></div>
        <div className="container mx-auto px-4 py-8 relative">
          <div className="flex items-center justify-between">
            <Link 
              href={`/series/${seriesData._id || seriesData.id}`} 
              className="flex items-center gap-2 hover:opacity-80 transition-all duration-300 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full hover:bg-white/20"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="font-medium">Back to Series</span>
            </Link>
            <div className="text-sm bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full font-medium shadow-sm">
              Chapter {chapter.chapterNumber}
            </div>
          </div>
          
          <div className="mt-10 max-w-3xl mx-auto text-center relative">
            <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-6xl text-white/10 font-serif">"</span>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">
              {chapter.title || `Chapter ${chapter.chapterNumber}`}
            </h1>
            <div className="flex items-center justify-center gap-6 text-sm text-blue-100 mt-6">
              <span className="flex items-center bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full">
                <Clock className="h-4 w-4 mr-1.5" />
                {chapter.readingTime || '5 min read'}
              </span>
              {chapter.publishDate && (
                <span className="flex items-center bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full">
                  <Calendar className="h-4 w-4 mr-1.5" />
                  {new Date(chapter.publishDate).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </span>
              )}
            </div>
          </div>

          <div className="mt-10 flex justify-center">
            <button
              onClick={handleReadAloud}
              className={`flex items-center gap-3 px-8 py-3.5 rounded-full font-medium text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 ${
                isReading 
                  ? 'bg-red-500 text-white hover:bg-red-600' 
                  : 'bg-white text-blue-700 hover:bg-blue-50 hover:text-blue-800'
              }`}
            >
              {isReading ? (
                <>
                  <VolumeX className="h-5 w-5" />
                  <span>Stop Reading</span>
                </>
              ) : (
                <>
                  <Volume2 className="h-5 w-5" />
                  <span>Listen to This Chapter</span>
                </>
              )}
            </button>
          </div>
        </div>
        <div className="absolute -bottom-1 left-0 right-0 h-4 bg-gradient-to-b from-blue-600/10 to-transparent"></div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 max-w-4xl relative z-10">
        {chapter.image && (
          <div className="mb-16 rounded-2xl overflow-hidden shadow-2xl border-4 border-white transform hover:scale-[1.01] transition-all duration-500">
            <div className="aspect-video relative">
              <Image
                src={chapter.image}
                alt={`${seriesData.title} - ${chapter.title}`}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </div>
          </div>
        )}

        {/* Chapter Summary */}
        {chapter.summary && (
          <div className="mb-16 p-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border-l-4 border-blue-400 shadow-sm relative overflow-hidden">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-blue-200 rounded-full opacity-20"></div>
            <h2 className="text-2xl font-bold text-blue-800 mb-4 flex items-center relative">
              <BookOpen className="h-6 w-6 mr-3 text-blue-500" />
              Chapter Summary
            </h2>
            <p className="text-blue-900 leading-relaxed text-lg relative">
              {chapter.summary}
            </p>
          </div>
        )}

        {/* Chapter Content */}
        <div className="prose prose-lg max-w-none space-y-12">
          {chapter.content?.map((section, index) => (
            <div 
              key={index} 
              className="relative group bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300"
            >
              {/* Section Number */}
              <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-blue-100 text-blue-600 font-bold flex items-center justify-center border-4 border-white shadow-sm">
                {index + 1}
              </div>
              
              {/* Text Content */}
              {section.text && (
                <div className="relative pt-2">
                  <div className="absolute -left-12 hidden md:block text-blue-100 text-7xl font-serif -mt-6 -ml-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    "
                  </div>
                  <p className="text-gray-800 leading-relaxed text-lg md:text-xl relative z-10 font-serif pl-2 border-l-4 border-blue-100 py-2">
                    {section.text}
                  </p>
                </div>
              )}
              
              {/* Image Content */}
              {section.image && (
                <div className={`mt-6 rounded-xl overflow-hidden border-2 border-gray-100 transform hover:scale-[1.01] transition-all duration-500 ${section.text ? 'mt-6' : ''}`}>
                  <div className="relative aspect-video">
                    <Image
                      src={section.image}
                      alt={`Illustration for section ${index + 1}: ${section.text?.substring(0, 30)}...`}
                      fill
                      className="object-cover"
                      priority={index < 2}
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-3 text-center text-white text-xs sm:text-sm bg-gradient-to-t from-black/70 to-transparent">
                      {seriesData.title} • Chapter {chapter.chapterNumber}
                    </div>
                  </div>
                </div>
              )}
              
              {/* Section Separator (only if not the last section) */}
              {index < chapter.content.length - 1 && (
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2">
                  <div className="w-12 h-12 rounded-full bg-white border-4 border-blue-50 flex items-center justify-center shadow-sm">
                    <div className="w-2 h-2 bg-blue-300 rounded-full"></div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Chapter Navigation */}
        <div className="mt-20 pt-10 border-t border-gray-200 relative">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white px-4 text-gray-400 text-sm">
            Continue Reading
          </div>
          
          <div className="flex flex-col sm:flex-row justify-between gap-6">
            {previousChapter ? (
              <Link
                href={getChapterUrl(previousChapter)}
                className="group flex items-center gap-4 px-6 py-4 rounded-xl border-2 border-gray-100 hover:border-blue-200 hover:bg-white transition-all duration-300 w-full sm:w-auto shadow-sm hover:shadow-md"
              >
                <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                  <ChevronLeft className="h-5 w-5 text-blue-500 group-hover:text-blue-600 transition-colors" />
                </div>
                <div className="text-left">
                  <div className="text-sm text-gray-500 group-hover:text-blue-600 transition-colors">Previous Chapter</div>
                  <div className="font-medium text-gray-900 group-hover:text-blue-700 transition-colors text-lg">
                    {previousChapter.title || `Chapter ${previousChapter.chapterNumber}`}
                  </div>
                </div>
              </Link>
            ) : (
              <div className="w-full sm:w-auto" />
            )}

            {nextChapter && nextChapter.isPublished && (
              <Link
                href={getChapterUrl(nextChapter)}
                className="group flex items-center justify-between gap-4 px-6 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white transition-all duration-300 shadow-md hover:shadow-lg w-full sm:w-auto"
              >
                <div className="text-right">
                  <div className="text-sm text-blue-100">Next Chapter</div>
                  <div className="font-medium text-lg">
                    {nextChapter.title || `Chapter ${nextChapter.chapterNumber}`}
                  </div>
                </div>
                <div className="p-2 bg-white/20 rounded-lg group-hover:bg-white/30 transition-colors">
                  <ChevronRight className="h-5 w-5 text-white" />
                </div>
              </Link>
            )}
          </div>

          <div className="mt-12 text-center">
            <Link 
              href={`/series/${seriesData._id || seriesData.id}`}
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium group transition-all duration-300 px-4 py-2 rounded-lg hover:bg-blue-50"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              <span>Back to {seriesData.title}</span>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
