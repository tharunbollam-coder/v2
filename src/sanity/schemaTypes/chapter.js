export default {
  name: 'chapter',
  title: 'Chapter',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'chapterNumber',
      title: 'Chapter Number',
      type: 'number',
      validation: (Rule) => Rule.required().integer().positive(),
    },
    {
      name: 'summary',
      title: 'Summary',
      type: 'text',
    },
    {
      name: 'readingTime',
      title: 'Reading Time',
      type: 'string',
    },
    {
      name: 'isPublished',
      title: 'Is Published',
      type: 'boolean',
      initialValue: true,
    },
    {
      name: 'publishDate',
      title: 'Publish Date',
      type: 'date',
    },
    {
      name: 'image',
      title: 'Chapter Image URL',
      type: 'url',
      description: 'Paste your Cloudinary image link here',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'content',
      title: 'Chapter Content',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'contentBlock',
          fields: [
            { name: 'text', type: 'text', title: 'Text' },
            { 
              name: 'image', 
              type: 'url', 
              title: 'Image URL',
              description: 'Paste your Cloudinary image link here',
              validation: (Rule) => Rule.required() 
            },
          ],
        },
      ],
    },
  ],
  orderings: [
    {
      title: 'Chapter Number, Asc',
      name: 'chapterNumberAsc',
      by: [{ field: 'chapterNumber', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      chapter: 'chapterNumber',
      imageUrl: 'image',
    },
    prepare({ title, chapter, imageUrl }) {
      return {
        title: `${chapter ? `Chapter ${chapter}: ` : ''}${title}`,
        media: imageUrl ? () => (
          <img 
            src={imageUrl} 
            alt={title || 'Chapter cover'}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : null,
      };
    },
  },
};
