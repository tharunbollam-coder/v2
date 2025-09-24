'use client';

import { useState, useMemo } from 'react';
import { Search, Filter, BookOpen, Sparkles, X } from 'lucide-react';
import StoryCard from '@/components/StoryCard';
import Breadcrumbs from '@/components/Breadcrumbs';
import { stories } from '@/data/stories';
import { cn } from '@/utils/cn';

export default function Stories() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedAgeGroup, setSelectedAgeGroup] = useState("all");

  // Get unique categories and age groups for filters
  const categories = Array.from(new Set(stories.map(story => story.category)));
  const ageGroups = Array.from(new Set(stories.map(story => story.ageGroup)));

  // Filter stories based on search and filters
  const filteredStories = useMemo(() => {
    return stories.filter(story => {
      const matchesSearch = story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           story.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           story.moralLesson.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "all" || story.category === selectedCategory;
      const matchesAgeGroup = selectedAgeGroup === "all" || story.ageGroup === selectedAgeGroup;
      
      return matchesSearch && matchesCategory && matchesAgeGroup;
    });
  }, [searchTerm, selectedCategory, selectedAgeGroup]);

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
            <h1 className="font-kid text-4xl md:text-5xl text-gradient-rainbow">
              All Stories
            </h1>
            <Sparkles className="w-10 h-10 text-yellow-500 animate-pulse" />
          </div>
          <p className="font-comic text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover {stories.length} magical tales filled with adventure, friendship, and important life lessons!
          </p>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredStories.map((story) => (
              <StoryCard key={story.id} story={story} />
            ))}
          </div>
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
