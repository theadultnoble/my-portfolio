import {defineField, defineType} from 'sanity'

export const learningType = defineType({
  name: 'learning',
  title: 'Learning',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      type: 'image',
    }),
  ],
})
