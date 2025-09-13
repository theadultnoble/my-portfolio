import {defineField, defineType} from 'sanity'

export const toolType = defineType({
  name: 'tools',
  title: 'Tools',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
  ],
})
