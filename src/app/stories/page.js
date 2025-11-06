'use client';

import { useState, useMemo, useEffect } from 'react';
import { Search, Filter, BookOpen, Sparkles, X, Loader2 } from 'lucide-react';
import StoryCard from '@/components/StoryCard';
import Breadcrumbs from '@/components/Breadcrumbs';
import { cn } from '@/utils/cn';
import { client } from '@/sanity/client';

// Server-side data fetching


// Sanity query to fetch all stories
const ALL_STORIES_QUERY = `*[_type == "story"] | order(_createdAt desc) {
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
  ageGroup,
  wordHelpers[] {
    word,
    definition,
    pronunciation
  }
}`;

export default function Stories() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedAgeGroup, setSelectedAgeGroup] = useState("all");
  const [stories, setStories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  // Fetch stories from Sanity
  useEffect(() => {
    const fetchStories = async () => {
      try {
        const data = await client.fetch(ALL_STORIES_QUERY);
        setStories(data || []);
      } catch (err) {
        setError('Failed to load stories. Please try again later.');
        setStories([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStories();
  }, []);

  // Debounce search term to reduce re-renders
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearchTerm(searchTerm), 200);
    return () => clearTimeout(t);
  }, [searchTerm]);

  // Ensure stories is an array before processing
  const safeStories = Array.isArray(stories) ? stories : [];
  
  // Get unique categories and age groups for filters
  const categories = ['all', ...new Set(safeStories.map(story => story?.category).filter(Boolean))];
  const ageGroups = ['all', ...new Set(safeStories.map(story => story?.ageGroup).filter(Boolean))];

  // Filter stories based on search and filters
  const filteredStories = useMemo(() => {
    if (!Array.isArray(safeStories)) return [];
    
    return safeStories.filter(story => {
      if (!story || !story.title || !story.summary || !story.moralLesson) return false;
      
      const matchesSearch = story.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
                           story.summary.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
                           story.moralLesson.toLowerCase().includes(debouncedSearchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "all" || story.category === selectedCategory;
      const matchesAgeGroup = selectedAgeGroup === "all" || story.ageGroup === selectedAgeGroup;
      
      return matchesSearch && matchesCategory && matchesAgeGroup;
    });
  }, [debouncedSearchTerm, selectedCategory, selectedAgeGroup, safeStories]);

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    setSelectedAgeGroup("all");
  };

  const breadcrumbItems = [
    { label: 'Stories', href: '/stories' }
  ];

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto">
        <Breadcrumbs items={breadcrumbItems} />
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <BookOpen className="w-10 h-10 text-purple-600 animate-bounce-gentle" />
            <h1 className="font-kid text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
              Our Magical Stories
            </h1>
            <Sparkles className="w-10 h-10 text-yellow-400 animate-pulse" />
          </div>
          {isLoading ? (
            <div className="flex items-center justify-center py-4">
              <Loader2 className="h-6 w-6 animate-spin text-purple-500 mr-2" />
              <span className="text-purple-600">Loading stories...</span>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center gap-4">
              <p className="font-comic text-lg text-red-600 max-w-2xl mx-auto">
                {error}
              </p>
              <button 
                onClick={() => window.location.reload()}
                className="btn-primary font-comic font-bold py-2 px-6 rounded-full"
              >
                Try Again
              </button>
            </div>
          ) : (
            <p className="font-comic text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover {safeStories.length} magical {safeStories.length === 1 ? 'tale' : 'tales'} filled with adventure, friendship, and important life lessons!
            </p>
          )}
        </div>

        {/* Search and Filters */}
        <div className="card-modern mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search */}
            <div className="relative flex-1 w-full lg:w-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <input
                type="text"
                placeholder="Search stories by title, summary, or lesson..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background font-comic"
              />
            </div>

            {/* Category Filter */}
            <div className="w-full lg:w-auto">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background font-comic"
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Age Group Filter */}
            <div className="w-full lg:w-auto">
              <select
                value={selectedAgeGroup}
                onChange={(e) => setSelectedAgeGroup(e.target.value)}
                className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background font-comic"
              >
                <option value="all">All Ages</option>
                {ageGroups.map(ageGroup => (
                  <option key={ageGroup} value={ageGroup}>{ageGroup}</option>
                ))}
              </select>
            </div>

            {/* Clear Filters */}
            {(searchTerm || selectedCategory !== "all" || selectedAgeGroup !== "all") && (
              <button
                onClick={clearFilters}
                className="flex items-center space-x-2 px-4 py-3 bg-muted hover:bg-muted/80 rounded-xl transition-colors duration-200 font-comic"
              >
                <X className="h-4 w-4" />
                <span>Clear</span>
              </button>
            )}
          </div>

          {/* Active Filters Display */}
          {(selectedCategory !== "all" || selectedAgeGroup !== "all" || searchTerm) && (
            <div className="mt-4 flex flex-wrap gap-2">
              {searchTerm && (
                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-comic">
                  Search: "{searchTerm}"
                </span>
              )}
              {selectedCategory !== "all" && (
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-comic">
                  Category: {selectedCategory}
                </span>
              )}
              {selectedAgeGroup !== "all" && (
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-comic">
                  Age: {selectedAgeGroup}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="font-comic text-muted-foreground">
            {filteredStories.length === stories.length 
              ? `Showing all ${stories.length} stories`
              : `Found ${filteredStories.length} of ${stories.length} stories`
            }
          </p>
        </div>

        {/* Stories Grid */}
        {filteredStories.length > 0 ? (
          isLoading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-12 w-12 animate-spin text-purple-500" />
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-500 font-comic text-lg">{error}</p>
            </div>
          ) : filteredStories.length === 0 ? (
            <div className="text-center py-12 col-span-full">
              <p className="text-gray-500 font-comic text-lg">
                {searchTerm || selectedCategory !== 'all' || selectedAgeGroup !== 'all' 
                  ? 'No stories match your filters. Try adjusting your search.'
                  : 'No stories found. Please check back later.'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredStories.map((story) => (
                <StoryCard key={story._id} story={story} />
              ))}
            </div>
          )
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="font-kid text-2xl text-foreground mb-2">No Stories Found</h3>
            <p className="font-comic text-muted-foreground mb-6">
              Try adjusting your search terms or filters to find more stories.
            </p>
            <button
              onClick={clearFilters}
              className="btn-primary shadow-colored hover:shadow-strong font-bold py-3 px-6"
            >
              Show All Stories
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
