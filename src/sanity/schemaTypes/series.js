export default {
  name: 'series',
  title: 'Series',
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
      name: 'description',
      title: 'Description',
      type: 'text',
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
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: ['ongoing', 'completed', 'on-hold'],
      },
    },
    {
      name: 'publishSchedule',
      title: 'Publish Schedule',
      type: 'string',
    },
    {
      name: 'coverImage',
      title: 'Cover Image URL',
      type: 'url',
      description: 'Paste your Cloudinary image link here',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    },
    {
      name: 'chapters',
      title: 'Chapters',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'chapter' }],
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
      imageUrl: 'coverImage',
    },
    prepare({ title, imageUrl }) {
      return {
        title: title,
        media: () => (
          <img 
            src={imageUrl} 
            alt={title || 'Series cover'}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ),
      };
    },
  },
};
