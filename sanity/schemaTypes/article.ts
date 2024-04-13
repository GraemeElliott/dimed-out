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
      description: 'Optional CSS class to apply to the title for styling',
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
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: {type: 'author'},
    }),
    defineField({
      name: 'articleImage',
      title: 'Article thumbnail image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'hoverImage',
      title: 'Hover image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'coverImageCredit',
      title: 'Cover Image Credit',
      type: 'string',
    }),
    defineField({
      name: 'coverImageStyle',
      title: 'Cover Image Styles',
      type: 'string', // Even though it's a select dropdown, the type is still 'string'
      description: 'Select the Cover Image style for the article.',
      options: {
        list: [
          {title: 'Greyscale', value: 'grayscale'},
          {title: 'Brightness 50', value: 'brightness-50'},
          {title: 'Brightness 75', value: 'brightness-75'},
        ], // Define the options for the dropdown
        // You can also set the layout of the options to 'radio' if you want them displayed as radio buttons in the Sanity Studio
        layout: 'dropdown', // Explicitly specifying the layout as dropdown
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
      title: 'Summary Text',
      type: 'text', // 'text' type for plain text, multiline input
      description: 'Summary of article',
    }),
    defineField({
      name: 'summaryTextCssClass',
      title: 'Summary Text CSS Class',
      description: 'Optional CSS class to apply to the summary text for styling',
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
            {
              name: 'cssClass',
              title: 'Custom CSS Classes',
              type: 'string',
              description: 'Optional CSS class to apply to this block',
            },
            // You can add more fields here as needed for layout/style.
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
        // Article headings
        {
          type: 'object',
          name: 'heading',
          title: 'Article Heading',
          fields: [
            {
              name: 'heading',
              title: 'Article Heading',
              type: 'string', // 'text' type for plain text, multiline input
              description: 'Article Heading',
            },
            {
              name: 'cssClass',
              title: 'Custom CSS Classes',
              type: 'string',
              description: 'Optional CSS class to apply to this quote block',
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
              description: 'Optional CSS class to apply to this block',
            },
            {
              name: 'caption',
              title: 'Caption',
              type: 'string',
            },
            {
              name: 'credit',
              title: 'Credit',
              type: 'string',
            },
            {
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
            },
            // Include other fields as necessary, such as for styling or layout
          ],
          options: {
            hotspot: true, // Enables image cropping, hotspot, and focal point selection
          },
        },
        // Adding the new 'quote' field
        {
          type: 'object',
          name: 'quote',
          title: 'Quote',
          fields: [
            {
              name: 'quote',
              title: 'Quote',
              type: 'text', // 'text' type for plain text, multiline input
              description: 'Optional quote to include in the content',
            },
            {
              name: 'quoteCaption',
              title: 'Quote Caption',
              type: 'string', // 'text' type for plain text, multiline input
              description: 'Optional quote caption to include in the content',
            },
            {
              name: 'cssClass',
              title: 'Custom CSS Classes',
              type: 'string',
              description: 'Optional CSS class to apply to this quote block',
            },
          ],
        },
        {
          type: 'object',
          name: 'youtubeID',
          title: 'YouTube Video ID',
          fields: [
            {
              name: 'videoID',
              title: 'Video ID',
              type: 'string', // 'text' type for plain text, multiline input
              description: 'Youtube Video ID',
            },
            {
              name: 'cssClass',
              title: 'Custom CSS Classes',
              type: 'string',
              description: 'Optional CSS class to apply to this quote block',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'noteFromTheAuthor',
      title: 'A Note From The Author',
      type: 'array', // Change type to array for rich text
      of: [{type: 'block'}], // Specify that the array contains 'block' types for rich text
      description: 'A note from the author',
    }),
    defineField({
      name: 'sources',
      title: 'Sources',
      type: 'array', // Change type to array for rich text
      of: [{type: 'block'}], // Specify that the array contains 'block' types for rich text
      description: 'List of article sources',
    }),
    defineField({
      name: 'pdfFile',
      title: 'Article PDF File',
      type: 'file',
      options: {
        accept: '.pdf', // Only allow PDF files to be uploaded
      },
    }),
  ],

  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
    },
    prepare(selection) {
      const {author} = selection
      return {...selection, subtitle: author && `by ${author}`}
    },
  },
})
