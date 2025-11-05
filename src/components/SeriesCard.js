'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Clock, Users, Star, BookOpen, ArrowRight } from 'lucide-react';
import { cn } from '@/utils/cn';

export default function SeriesCard({ series, className }) {
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
    <div className={cn(
      "bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group hover:scale-102",
      className
    )}>
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={series.coverImage}
          alt={series.title}
          fill
          className="object-cover group-hover:scale-102 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        
        {/* Status Badge */}
        <div className="absolute top-4 right-4">
          <span className={cn(
            "text-white px-3 py-1 rounded-full text-sm font-medium",
            getStatusColor(series.status)
          )}>
            {getStatusText(series.status)}
          </span>
        </div>

        {/* Rating or New Badge */}
        <div className="absolute top-4 left-4 flex items-center space-x-1 bg-white/90 rounded-full px-2 py-1">
          {series.rating > 0 ? (
            <>
              <Star className="h-4 w-4 text-yellow-500 fill-current" />
              <span className="text-sm font-bold text-gray-800">{series.rating}</span>
            </>
          ) : (
            <span className="text-sm font-bold text-blue-600">New!</span>
          )}
        </div>

        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-white font-bold text-xl mb-1 line-clamp-2">
            {series.title}
          </h3>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        <h4 className="font-semibold text-gray-900 mb-2">About this series</h4>
        <p className="text-gray-600 mb-4 line-clamp-4 leading-relaxed text-sm">
          {series.description}
        </p>

        {/* Series Info */}
        <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="flex items-center space-x-2 text-gray-700">
              <BookOpen className="h-4 w-4 flex-shrink-0" />
              <div>
                <div className="font-medium">{series.publishedChapters} Chapters</div>
                <div className="text-xs text-gray-500">Available now</div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="flex items-center space-x-2 text-gray-700">
              <Users className="h-4 w-4 flex-shrink-0" />
              <div>
                <div className="font-medium">{series.ageGroup}</div>
                <div className="text-xs text-gray-500">Age group</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tags */}
        {Array.isArray(series.tags) && series.tags.length > 0 && (
          <div className="mb-4">
            <h5 className="text-xs font-medium text-gray-500 mb-2">THEMES</h5>
            <div className="flex flex-wrap gap-2">
              {series.tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className="bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-xs font-medium border border-purple-100"
                >
                  {tag}
                </span>
              ))}
              {series.tags.length > 3 && (
                <span className="bg-gray-50 text-gray-500 px-3 py-1 rounded-full text-xs border border-gray-100">
                  +{series.tags.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Schedule */}
        {series.publishSchedule && (
          <div className="bg-blue-50 rounded-lg p-3 mb-4 border border-blue-100">
            <div className="flex items-start space-x-2">
              <Clock className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
              <div>
                <div className="text-sm font-medium text-blue-800">New chapters</div>
                <div className="text-xs text-blue-600">{series.publishSchedule}</div>
              </div>
            </div>
          </div>
        )}

        {/* Action Button */}
        <Link
          href={`/series/${series._id || series.id}`}
          className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 group"
        >
          <span>Read Series</span>
          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
        </Link>
      </div>
    </div>
  );
}
