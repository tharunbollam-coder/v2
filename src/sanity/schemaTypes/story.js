export default {
  name: 'story',
  title: 'Story',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'summary',
      title: 'Summary',
      type: 'text',
      description: 'A short summary of the story.',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'image',
      title: 'Cover Image URL',
      type: 'url',
      description: 'Paste your Cloudinary image link here',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
    },
    {
      name: 'ageGroup',
      title: 'Age Group',
      type: 'string',
    },
    {
      name: 'readingTime',
      title: 'Reading Time',
      type: 'string',
    },
    {
      name: 'moralLesson',
      title: 'Moral Lesson',
      type: 'text',
    },
    {
      name: 'youtubeUrl',
      title: 'YouTube URL',
      type: 'url',
    },
    {
      name: 'content',
      title: 'Story Content',
      type: 'array',
      description: 'The main body of the story. Each item is a paragraph with an optional image.',
      of: [
        {
          type: 'object',
          name: 'contentBlock',
          fields: [
            { 
              name: 'text', 
              type: 'text', 
              title: 'Text',
              validation: Rule => Rule.required()
            },
            { 
              name: 'image', 
              type: 'url', 
              title: 'Image URL (Optional)',
              description: 'Optional: Paste your Cloudinary image link here',
              validation: Rule => Rule.uri({
                scheme: ['http', 'https'],
                allowRelative: false
              })
            },
          ],
          preview: {
            select: {
              title: 'text',
              imageUrl: 'image',
            },
            prepare(selection) {
              const { title, imageUrl } = selection;
              const displayTitle = title ? `${title.substring(0, 30)}${title.length > 30 ? '...' : ''}` : 'No text provided';
              return {
                title: displayTitle,
                subtitle: imageUrl ? 'Image included' : 'Text only',
                media: imageUrl ? (
                  <img 
                    src={imageUrl} 
                    alt="Story content"
                    style={{
                      width: '100%',
                      height: '100px',
                      objectFit: 'cover',
                      borderRadius: '4px'
                    }}
                  />
                ) : null
              };
            }
          },
        },
      ],
    },
    {
      name: 'wordHelpers',
      title: 'Word Helpers',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'wordHelper',
          fields: [
            { name: 'word', type: 'string', title: 'Word' },
            { name: 'definition', type: 'text', title: 'Definition' },
            { name: 'pronunciation', type: 'string', title: 'Pronunciation' },
          ],
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
      imageUrl: 'image',
    },
    prepare({ title, imageUrl }) {
      return {
        title: title,
        media: () => (
          <img 
            src={imageUrl} 
            alt={title || 'Story cover'} 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ),
      };
    },
  },
};
