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
      name: 'coverImage',
      title: 'Cover image',
      type: 'image',
      options: {
        hotspot: true,
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
              of: [{type: 'block'}],
            },
            {
              name: 'style',
              title: 'Style',
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
        // Image //
        {
          type: 'image',
          title: 'Image',
          fields: [
            {
              name: 'caption',
              title: 'Caption',
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
      ],
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
