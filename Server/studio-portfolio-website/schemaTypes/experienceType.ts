import {defineField, defineType} from 'sanity'

export const experienceType = defineType({
  name: 'experience',
  title: 'Experience',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'title'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      type: 'image',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'body',
      type: 'text',
    }),
    defineField({
      name: 'startDate',
      title: 'Start Date',
      type: 'date', // Or "datetime" if you want timestamps
      validation: (rule) => rule.required(),
      options: {
        dateFormat: 'MMM YYYY',
      },
    }),
    defineField({
      name: 'endDate',
      title: 'End Date',
      type: 'date', // Or "datetime" if you want timestamps
      options: {
        dateFormat: 'MMM YYYY',
      },
      validation: (rule) =>
        rule.custom((endDate, {document}) => {
          const startDate = document?.startDate
          if (startDate && endDate && endDate < startDate) {
            return 'End date must be after start date'
          }
          return true
        }),
    }),
  ],
})
