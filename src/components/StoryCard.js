'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Clock, Users, Lightbulb, ArrowRight, BookOpen } from 'lucide-react';
import { cn } from '@/utils/cn';

export default function StoryCard({ story, className }) {
  return (
    <div className={cn(
      "card-modern group animate-slide-up",
      className
    )}>
      {/* Image Section */}
      <div className="relative h-52 overflow-hidden rounded-xl mb-6 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
        {story.imageUrl ? (
          <>
            <Image
              src={story.imageUrl}
              alt={story.title}
              fill
              className="object-cover group-hover:scale-102 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          </>
        ) : (
          <div className="text-center p-4">
            <BookOpen className="w-12 h-12 mx-auto mb-2 text-primary" />
            <span className="text-foreground/70 font-medium">{story.title}</span>
          </div>
        )}
        <div className="absolute top-4 right-4">
          <span className="glass text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-md">
            {story.category || 'Story'}
          </span>
        </div>
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-white font-kid text-xl mb-1 line-clamp-2 drop-shadow-lg">
            {story.title}
          </h3>
        </div>
      </div>

      {/* Content Section */}
      <div className="space-y-6">
        <p className="font-comic text-muted-foreground leading-relaxed line-clamp-3">
          {story.summary}
        </p>

        {/* Story Info */}
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center space-x-2 bg-muted rounded-lg px-3 py-2">
            <Clock className="h-4 w-4 text-indigo-500" />
            <span className="font-comic font-medium">{story.readingTime}</span>
          </div>
          <div className="flex items-center space-x-2 bg-muted rounded-lg px-3 py-2">
            <Users className="h-4 w-4 text-emerald-500" />
            <span className="font-comic font-medium">{story.ageGroup}</span>
          </div>
        </div>

        {/* Moral Lesson Preview */}
        {story.moralLesson && (
          <div className="bg-gradient-warm rounded-xl p-4">
            <div className="flex items-start space-x-3">
              <Lightbulb className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <p className="text-amber-800 text-sm line-clamp-2 font-comic font-medium">
                {story.moralLesson}
              </p>
            </div>
          </div>
        )}

        {/* Action Button */}
        <Link
          href={`/story/${story.slug?.current || story._id}`}
          className="btn-primary w-full flex items-center justify-center space-x-2 group shadow-colored hover:shadow-strong font-bold"
        >
          <span>Read Story</span>
          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
        </Link>
      </div>
    </div>
  );
}
