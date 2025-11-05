'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, BookOpen, Play, Calendar, Clock, Bookmark, Share2 } from 'lucide-react';
import { client } from '@/sanity/client';

// Sanity query to fetch a single series by ID
const SERIES_QUERY = `*[_type == "series" && _id == $id][0] {
  _id,
  title,
  description,
  "coverImage": coverImage,
  category,
  status,
  ageGroup,
  publishSchedule,
  "chapters": chapters[]->{
    _id,
    title,
    chapterNumber,
    isPublished,
    publishDate,
    readingTime,
    "slug": slug.current,
    "image": image
  } | order(chapterNumber asc)
}`;

// Utility function to format date
const formatDate = (dateString) => {
  if (!dateString) return 'Coming Soon';
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

// Status badge component with modern styling
const StatusBadge = ({ status }) => {
  const statusStyles = {
    ongoing: 'bg-amber-100/80 text-amber-900',
    completed: 'bg-green-100/80 text-green-900',
    onhold: 'bg-gray-100/80 text-gray-700',
    upcoming: 'bg-blue-100/80 text-blue-900'
  };
  
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-lg text-xs font-medium ${statusStyles[status] || 'bg-gray-100 text-gray-700'}`}>
      {status?.charAt(0).toUpperCase() + status?.slice(1) || 'N/A'}
    </span>
  );
};

// Chapter card component
const ChapterCard = ({ chapter, seriesId, index }) => (
  <div className="group bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-200 hover:-translate-y-0.5">
    <div className="p-4 sm:p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center font-semibold">
            {index + 1}
          </div>
          <div>
            <h3 className="font-medium text-gray-900 group-hover:text-indigo-600 transition-colors">
              {chapter.title || `Chapter ${chapter.chapterNumber || index + 1}`}
            </h3>
            <div className="flex items-center gap-3 mt-1">
              {chapter.publishDate && (
                <span className="flex items-center text-xs text-gray-500">
                  <Calendar className="h-3 w-3 mr-1.5 text-gray-400" />
                  {formatDate(chapter.publishDate)}
                </span>
              )}
              {chapter.readingTime && (
                <span className="flex items-center text-xs text-gray-500">
                  <Clock className="h-3 w-3 mr-1.5 text-gray-400" />
                  {chapter.readingTime} read
                </span>
              )}
            </div>
          </div>
        </div>
        {chapter.isPublished ? (
          <Link
            href={`/series/${seriesId}/chapter/${chapter._id || chapter.id || chapter.chapterNumber}`}
            className="flex-shrink-0 inline-flex items-center justify-center w-9 h-9 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
            aria-label="Read chapter"
          >
            <Play className="h-4 w-4" />
          </Link>
        ) : (
          <div className="flex-shrink-0 inline-flex items-center justify-center w-9 h-9 rounded-lg bg-gray-100 text-gray-400">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
        )}
      </div>
    </div>
  </div>
);

export default function SeriesDetail() {
  const params = useParams();
  const [seriesData, setSeriesData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('chapters');

  // Fetch series data from Sanity
  useEffect(() => {
    const fetchSeries = async () => {
      try {
        // Ensure we have a valid ID
        const seriesId = params?.id;
        if (!seriesId) {
          setError('Invalid series ID');
          setIsLoading(false);
          return;
        }
        
        const data = await client.fetch(SERIES_QUERY, { id: seriesId });
        console.log('Fetched series data:', data); // Debug log
        
        if (!data) {
          setError('Series not found');
        } else {
          setSeriesData(data);
        }
      } catch (err) {
        console.error('Error fetching series:', err);
        setError('Failed to load series. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSeries();
  }, [params?.id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header Skeleton */}
          <div className="flex flex-col md:flex-row gap-8 mb-12">
            <div className="w-full md:w-1/3 lg:w-1/4">
              <div className="aspect-[2/3] bg-gray-200 rounded-xl animate-pulse"></div>
            </div>
            <div className="flex-1 space-y-4">
              <div className="h-8 bg-gray-200 rounded-full w-3/4 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded-full w-1/2 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded-full w-2/3 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded-full w-1/2 animate-pulse"></div>
              <div className="pt-4">
                <div className="h-4 bg-gray-200 rounded-full w-1/4 mb-2 animate-pulse"></div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-24 bg-gray-100 rounded-lg animate-pulse"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Chapters Skeleton */}
          <div className="space-y-4">
            <div className="h-8 bg-gray-200 rounded-full w-1/4 mb-6 animate-pulse"></div>
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-24 bg-white rounded-xl border border-gray-100 animate-pulse"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="text-center p-8 max-w-md bg-white rounded-2xl shadow-lg border border-gray-100">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-100 text-red-500 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Oops! Something went wrong</h1>
          <p className="text-gray-600 mb-6">{error || 'We could not load the series details. Please try again later.'}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/series"
              className="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 px-6 rounded-xl transition-all hover:shadow-md"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Series
            </Link>
            <button 
              onClick={() => window.location.reload()}
              className="inline-flex items-center justify-center gap-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-medium py-2.5 px-6 rounded-xl transition-all hover:shadow-md"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link href="/" className="text-xl font-bold text-gray-900 hover:text-indigo-600 transition-colors">
              Home
            </Link>
            <Link 
              href="/series" 
              className="inline-flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Series
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {seriesData ? (
          <div className="space-y-8">
            {/* Hero Banner - Image Only */}
            <div className="relative rounded-2xl overflow-hidden shadow-md h-48 sm:h-64 md:h-80 lg:h-96">
              {seriesData.coverImage?.asset?.url ? (
                <Image
                  src={seriesData.coverImage.asset.url}
                  alt={seriesData.title}
                  fill
                  className="object-cover w-full h-full"
                  priority
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-indigo-100 to-purple-100">
                  <BookOpen className="h-16 w-16 text-indigo-300" />
                </div>
              )}
            </div>

            {/* Series Info */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
              <div className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row gap-8">
                  {/* Series Title and Meta */}
                  <div className="flex-1">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                      {seriesData.title}
                    </h1>
                    <div className="flex flex-wrap items-center gap-2 mb-4">
                      <StatusBadge status={seriesData.status} />
                      {seriesData.category && (
                        <span className="text-xs font-medium px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg border border-gray-200">
                          {seriesData.category}
                        </span>
                      )}
                      {seriesData.ageGroup && (
                        <span className="text-xs font-medium px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg border border-gray-200">
                          {seriesData.ageGroup}
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-4 mb-6">
                      <div className="flex items-center text-sm text-gray-600 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                        <BookOpen className="h-4 w-4 mr-1.5 text-indigo-500" />
                        <span className="font-medium">{seriesData.chapters?.length || 0} Chapters</span>
                      </div>
                      {seriesData.publishSchedule && (
                        <div className="flex items-center text-sm text-gray-600 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                          <Calendar className="h-4 w-4 mr-1.5 text-indigo-500" />
                          <span className="font-medium">{seriesData.publishSchedule}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      {seriesData.chapters?.some(c => c.isPublished) ? (
                        <Link
                          href={`/series/${params.id}/chapter/${(seriesData.chapters.find(c => c.isPublished)?.chapterNumber) || 1}`}
                          className="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 px-6 rounded-lg transition-all hover:shadow-md hover:-translate-y-0.5"
                        >
                          <Play className="h-4 w-4" />
                          <span>Start Reading</span>
                        </Link>
                      ) : (
                        <button 
                          disabled
                          className="inline-flex items-center justify-center gap-2 bg-gray-50 text-gray-400 font-medium py-2.5 px-6 rounded-lg border border-gray-200 cursor-not-allowed"
                        >
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                          <span>Coming Soon</span>
                        </button>
                      )}
                      
                      
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Chapters Section */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Chapters</h2>
                    <p className="text-sm text-gray-500 mt-1">
                      {seriesData.chapters?.length || 0} chapters available
                    </p>
                  </div>
                  <div className="w-full sm:w-56 relative">
                    <select 
                      className="w-full pl-4 pr-10 py-2.5 text-sm text-gray-700 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none cursor-pointer hover:border-gray-300 transition-colors"
                    >
                      <option value="newest" className="py-2">Newest First</option>
                      <option value="oldest" className="py-2">Oldest First</option>
                      <option value="number" className="py-2">Chapter Number</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {seriesData.chapters?.length > 0 ? (
                <div className="grid gap-3 p-4 sm:p-6">
                  {seriesData.chapters.map((chapter, index) => (
                    <ChapterCard 
                      key={chapter._id || chapter.id} 
                      chapter={chapter} 
                      seriesId={params.id}
                      index={index}
                    />
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center">
                  <div className="text-5xl mb-4">📚</div>
                  <h3 className="text-lg font-medium text-gray-700 mb-2">No Chapters Yet</h3>
                  <p className="text-gray-500">Check back soon for new chapters!</p>
                </div>
              )}
            </div>

            {/* About Section */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-bold text-gray-900">About This Series</h2>
              </div>
              <div className="p-6">
                <div className="prose max-w-none text-gray-700">
                  <p className="text-lg text-gray-700 leading-relaxed">
                    {seriesData.description}
                  </p>
                  
                  <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-gray-100">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Status</h3>
                        <p className="mt-1 text-gray-900">
                          {seriesData.status ? seriesData.status.charAt(0).toUpperCase() + seriesData.status.slice(1) : 'N/A'}
                        </p>
                      </div>
                      {seriesData.publishSchedule && (
                        <div>
                          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Update Schedule</h3>
                          <p className="mt-1 text-gray-900">{seriesData.publishSchedule}</p>
                        </div>
                      )}
                    </div>
                    
                    <div className="bg-indigo-50 rounded-xl p-5">
                      <h3 className="text-sm font-medium text-indigo-800 uppercase tracking-wider mb-3">Reading Experience</h3>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                          <div className="flex-shrink-0 mt-0.5">
                            <div className="w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center">
                              <BookOpen className="h-3 w-3 text-indigo-600" />
                            </div>
                          </div>
                          <span className="text-sm text-gray-700">Perfect for {seriesData.ageGroup || 'young readers'}</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="flex-shrink-0 mt-0.5">
                            <div className="w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center">
                              <Clock className="h-3 w-3 text-indigo-600" />
                            </div>
                          </div>
                          <span className="text-sm text-gray-700">Short, engaging chapters perfect for bedtime or independent reading</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom CTA */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl overflow-hidden">
              <div className="px-6 py-12 text-center">
                <h2 className="text-2xl font-bold text-white mb-3">Ready for More Adventures?</h2>
                <p className="text-indigo-100 text-lg mb-8 max-w-2xl mx-auto">
                  Discover more amazing stories and series that will spark your child's imagination and love for reading.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link
                    href="/stories"
                    className="inline-flex items-center justify-center gap-2 bg-white text-indigo-700 hover:bg-indigo-50 font-medium py-2.5 px-6 rounded-lg transition-colors"
                  >
                    <BookOpen className="h-5 w-5" />
                    <span>Explore All Stories</span>
                  </Link>
                  <Link
                    href="/series"
                    className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-medium py-2.5 px-6 rounded-lg transition-colors border border-white/20"
                  >
                    <span>Browse All Series</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
            <div className="text-5xl mb-4">📚</div>
            <h3 className="text-xl font-medium text-gray-700 mb-2">Series Not Found</h3>
            <p className="text-gray-500 mb-6">The requested series could not be found.</p>
            <Link 
              href="/series" 
              className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-medium"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to All Series</span>
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
