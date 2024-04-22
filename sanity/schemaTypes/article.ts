import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'article',
  title: 'Article',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'titleCssClass',
      title: 'Title CSS Class',
      description: 'Optional Tailwind CSS class to apply to the title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Indicates if the article is featured on the homepage',
      initialValue: false,
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: {type: 'author'},
    }),

    defineField({
      name: 'articleImage',
      title: 'Main article image displayed on article cards',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'hoverImage',
      title: 'Main article on-hover image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'coverImage',
      title: 'Article cover image on article page',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'coverImageCredit',
      title: 'Cover image credit',
      type: 'string',
    }),
    defineField({
      name: 'coverImageStyle',
      title: 'Cover image styles',
      type: 'string',
      description: 'Select the Cover Image style for the article. Values use Tailwind CSS.',
      options: {
        list: [
          {title: 'Greyscale', value: 'grayscale'},
          {title: 'Brightness 50', value: 'brightness-50'},
          {title: 'Brightness 75', value: 'brightness-75'},
        ],
        layout: 'dropdown',
      },
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{type: 'reference', to: {type: 'category'}}],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
    }),

    defineField({
      name: 'summaryText',
      title: 'Article summary Text',
      type: 'text',
      description: 'Summary of article',
    }),
    defineField({
      name: 'summaryTextCssClass',
      title: 'Summary Text CSS Class',
      description: 'Optional Tailwind CSS class to apply to the summary text',
      type: 'string',
    }),

    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        // Text Block //
        {
          type: 'object',
          title: 'Text Block',
          fields: [
            {
              name: 'text',
              title: 'Text',
              type: 'array',
              of: [
                {
                  type: 'block',
                },
              ],
            },
          ],
          preview: {
            select: {
              title: 'text',
              subtitle: 'style',
            },
            prepare(value) {
              const block = (value.title || []).find(
                (block: {_type: string}) => block._type === 'block',
              )
              const text = block
                ? block.children
                    .filter((child: {_type: string}) => child._type === 'span')
                    .map((span: {text: any}) => span.text)
                    .join('')
                : 'No text'
              return {
                title: text.substring(0, 50),
                subtitle: value.style ? `Style: ${value.style}` : 'No specific style',
              }
            },
          },
        },
        // Article heading
        {
          type: 'object',
          name: 'heading',
          title: 'Article Heading',
          fields: [
            {
              name: 'heading',
              title: 'Article Heading',
              type: 'string',
              description: 'Article heading',
            },
            {
              name: 'cssClass',
              title: 'Custom CSS Classes',
              type: 'string',
              description: 'Optional Tailwind CSS class to apply to the heading',
            },
          ],
        },

        // Image //
        {
          type: 'image',
          title: 'Image',
          fields: [
            {
              name: 'cssClass',
              title: 'Custom CSS Classes',
              type: 'string',
              description: 'Optional Tailwind CSS class to apply to images',
            },
            {
              name: 'caption',
              title: 'Image caption',
              type: 'string',
            },
            {
              name: 'credit',
              title: 'Image credit',
              type: 'string',
            },
            {
              name: 'alt',
              title: 'Image alt Text',
              type: 'string',
            },
          ],
          options: {
            hotspot: true,
          },
        },
        // Quote //
        {
          type: 'object',
          name: 'quote',
          title: 'Quote',
          fields: [
            {
              name: 'quote',
              title: 'Quote',
              type: 'text',
            },
            {
              name: 'quoteCaption',
              title: 'Quote Caption',
              type: 'string',
            },
            {
              name: 'cssClass',
              title: 'Custom CSS Classes',
              type: 'string',
              description: 'Optional Tailwind CSS class to apply to quote block',
            },
          ],
        },
        {
          type: 'object',
          name: 'youtubeID',
          title: 'YouTube video ID',
          fields: [
            {
              name: 'videoID',
              title: 'Video video ID',
              type: 'string',
              description: 'Youtube video ID',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'noteFromTheAuthor',
      title: 'A Note From The Author',
      type: 'array',
      of: [{type: 'block'}],
      description: 'A note from the author',
    }),
    defineField({
      name: 'sources',
      title: 'Sources',
      type: 'array',
      of: [{type: 'block'}],
      description: 'List of article sources',
    }),
    defineField({
      name: 'pdfFile',
      title: 'Article PDF File',
      type: 'file',
      options: {
        accept: '.pdf',
      },
    }),
  ],

  preview: {
    select: {
      title: 'title',
      authorName: 'author.name',
      media: 'mainImage',
    },
    prepare(selection) {
      const {authorName} = selection
      return {...selection, subtitle: authorName && `by ${authorName}`}
    },
  },
})
