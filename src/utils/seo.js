export function generateWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "KidsStories",
    "description": "Educational stories for children with moral lessons, interactive reading activities, and games.",
    "url": "https://kidsstories.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://kidsstories.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };
}

export function generateStorySchema(story) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": story.title,
    "description": story.summary,
    "image": story.image,
    "author": {
      "@type": "Organization",
      "name": "KidsStories"
    },
    "publisher": {
      "@type": "Organization",
      "name": "KidsStories"
    },
    "datePublished": new Date().toISOString(),
    "articleSection": story.category,
    "keywords": [story.category, story.ageGroup, "children's stories", "moral lessons"].join(", ")
  };
}

export function generateBreadcrumbSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.label,
      "item": `https://kidsstories.com${item.href}`
    }))
  };
}

export function generateFAQSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What age groups are these stories for?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our stories are designed for children ages 3-12, with specific age recommendations for each story."
        }
      },
      {
        "@type": "Question",
        "name": "Are the stories educational?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! Each story includes moral lessons, vocabulary helpers, and interactive activities to support learning."
        }
      }
    ]
  };
}

export function generateStoryMetaDescription(story) {
  return `${story.summary} Perfect for ages ${story.ageGroup}. Reading time: ${story.readingTime}. Learn about ${story.moralLesson}`;
}

export function generateStoryKeywords(story) {
  return [
    story.category.toLowerCase(),
    story.ageGroup,
    "children's stories",
    "moral lessons",
    "educational stories",
    "kids reading",
    story.title.toLowerCase()
  ].join(", ");
}
