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
      "bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group hover:scale-105",
      className
    )}>
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden">
        <div className="w-full h-full bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 flex items-center justify-center">
          <div className="text-center text-white">
            <BookOpen className="h-16 w-16 mx-auto mb-2 animate-bounce-gentle" />
            <p className="font-bold">Series Cover</p>
          </div>
        </div>
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

        {/* Rating */}
        <div className="absolute top-4 left-4 flex items-center space-x-1 bg-white/90 rounded-full px-2 py-1">
          <Star className="h-4 w-4 text-yellow-500 fill-current" />
          <span className="text-sm font-bold text-gray-800">{series.rating}</span>
        </div>

        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-white font-bold text-xl mb-1 line-clamp-2">
            {series.title}
          </h3>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
          {series.description}
        </p>

        {/* Series Info */}
        <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-gray-500">
          <div className="flex items-center space-x-1">
            <BookOpen className="h-4 w-4" />
            <span>{series.publishedChapters}/{series.totalChapters} chapters</span>
          </div>
          <div className="flex items-center space-x-1">
            <Users className="h-4 w-4" />
            <span>{series.ageGroup}</span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {series.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs font-medium"
            >
              {tag}
            </span>
          ))}
          {series.tags.length > 3 && (
            <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs font-medium">
              +{series.tags.length - 3} more
            </span>
          )}
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm text-gray-600">Progress</span>
            <span className="text-sm text-gray-600">
              {Math.round((series.publishedChapters / series.totalChapters) * 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(series.publishedChapters / series.totalChapters) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Schedule */}
        <div className="bg-blue-50 rounded-lg p-3 mb-4">
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4 text-blue-600" />
            <span className="text-blue-800 text-sm font-medium">
              {series.publishSchedule}
            </span>
          </div>
        </div>

        {/* Action Button */}
        <Link
          href={`/series/${series.id}`}
          className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 group"
        >
          <span>Read Series</span>
          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
        </Link>
      </div>
    </div>
  );
}
