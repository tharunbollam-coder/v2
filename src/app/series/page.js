'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, BookOpen, Sparkles, X } from 'lucide-react';
import SeriesCard from '@/components/SeriesCard';
import Breadcrumbs from '@/components/Breadcrumbs';
import { series } from '@/data/series';
import { cn } from '@/utils/cn';

export default function Series() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  // Get unique categories and statuses for filters
  const categories = Array.from(new Set(series.map(s => s.category)));
  const statuses = Array.from(new Set(series.map(s => s.status)));

  // Filter series based on search and filters
  const filteredSeries = useMemo(() => {
    return series.filter(s => {
      const matchesSearch = s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           s.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           s.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = selectedCategory === "all" || s.category === selectedCategory;
      const matchesStatus = selectedStatus === "all" || s.status === selectedStatus;
      
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [searchTerm, selectedCategory, selectedStatus]);

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    setSelectedStatus("all");
  };

  const breadcrumbItems = [
    { label: 'Series', href: '/series' }
  ];

  if (series.length === 0) {
    return (
      <div className="min-h-screen py-8 px-4 flex items-center justify-center">
        <div className="container mx-auto text-center">
          <div className="text-6xl mb-4">🚀</div>
          <h1 className="font-kid text-4xl md:text-5xl text-gradient-rainbow mb-4">
            New Adventures Coming Soon!
          </h1>
          <p className="font-comic text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            We're busy writing exciting new story series for you. Check back soon!
          </p>
          <Link href="/stories">
            <button className="btn-primary shadow-colored hover:shadow-strong font-comic font-bold flex items-center justify-center space-x-2 px-8 py-4 mx-auto">
              <BookOpen className="w-5 h-5" />
              <span>Explore Stories While You Wait</span>
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto">
        <Breadcrumbs items={breadcrumbItems} />
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <BookOpen className="w-10 h-10 text-indigo-600 animate-bounce-gentle" />
            <h1 className="font-kid text-4xl md:text-5xl text-gradient-rainbow">
              Story Series
            </h1>
            <Sparkles className="w-10 h-10 text-yellow-500 animate-pulse" />
          </div>
          <p className="font-comic text-lg text-muted-foreground max-w-2xl mx-auto">
            Dive into ongoing adventures! Follow your favorite characters through multiple chapters and watch their stories unfold.
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
                placeholder="Search series by title, description, or tags..."
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

            {/* Status Filter */}
            <div className="w-full lg:w-auto">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background font-comic"
              >
                <option value="all">All Status</option>
                {statuses.map(status => (
                  <option key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Clear Filters */}
            {(searchTerm || selectedCategory !== "all" || selectedStatus !== "all") && (
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
          {(selectedCategory !== "all" || selectedStatus !== "all" || searchTerm) && (
            <div className="mt-4 flex flex-wrap gap-2">
              {searchTerm && (
                <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-comic">
                  Search: "{searchTerm}"
                </span>
              )}
              {selectedCategory !== "all" && (
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-comic">
                  Category: {selectedCategory}
                </span>
              )}
              {selectedStatus !== "all" && (
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-comic">
                  Status: {selectedStatus.charAt(0).toUpperCase() + selectedStatus.slice(1)}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="font-comic text-muted-foreground">
            {filteredSeries.length === series.length 
              ? `Showing all ${series.length} series`
              : `Found ${filteredSeries.length} of ${series.length} series`
            }
          </p>
        </div>

        {/* Series Grid */}
        {filteredSeries.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredSeries.map((s) => (
              <SeriesCard key={s.id} series={s} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="font-kid text-2xl text-foreground mb-2">No Series Found</h3>
            <p className="font-comic text-muted-foreground mb-6">
              Try adjusting your search terms or filters to find more series.
            </p>
            <button
              onClick={clearFilters}
              className="btn-primary shadow-colored hover:shadow-strong font-bold py-3 px-6"
            >
              Show All Series
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
