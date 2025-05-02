import {defineField, defineType} from 'sanity'

export const skillType = defineType({
  name: 'skills',
  title: 'Skills',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
  ],
})
