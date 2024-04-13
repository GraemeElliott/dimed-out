import { defineComponent, h } from 'vue';
import { PortableTextComponents } from '@portabletext/vue';
export const serializers: PortableTextComponents = {
  marks: {
    strong: (_, { slots }) => {
      return h('strong', {}, slots.default ? slots.default() : []);
    },
    em: (_, { slots }) => h('em', {}, slots.default ? slots.default() : []),
    underline: (_, { slots }) =>
      h('underline', {}, slots.default ? slots.default() : []),
    strikethrough: (_, { slots }) =>
      h('strikethrough', {}, slots.default ? slots.default() : []),

    link: defineComponent({
      props: ['value'],
      setup(props, { slots }) {
        return () =>
          h(
            'a',
            {
              href: props.value.href,
              target: '_blank',
              rel: 'noopener noreferrer',
              class: 'text-blue-500 hover:text-blue-700',
            },
            slots.default ? slots.default() : []
          );
      },
    }),
  },
  list: {
    bullet: (_, { slots }) => {
      return h(
        'ul',
        { class: 'list-disc list-inside block-element ml-6 my-6 leading-7' },
        slots.default ? slots.default() : []
      );
    },
    number: (_, { slots }) => {
      return h(
        'ol',
        { class: 'list-decimal list-inside block-element ml-6 my-6 leading-7' },
        slots.default ? slots.default() : []
      );
    },
  },
  listItem: (_, { slots }) => {
    return h('li', {}, slots.default ? slots.default() : []);
  },
};
