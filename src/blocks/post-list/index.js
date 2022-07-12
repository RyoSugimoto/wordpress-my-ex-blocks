import { registerBlockType  } from '@wordpress/blocks'
import edit from './edit'

registerBlockType('my-extra-blocks/post-list', {
  apiVersion: 2,
  title: 'Extra Post List',
  description: 'Post list',
  icon: 'embed-post',
  category: 'my-extra-blocks',
  attributes: {
    // Grid
    columns: {
      type: 'array',
      default: [1, 2, 2, 3, 3, 4],
    },
    gapX: {
      type: 'number',
      default: 8
    },
    gapY: {
      type: 'number',
      default: 8
    },
    // Post
    postType: {
      type: 'string',
      default: 'post'
    },
    taxQueryRelation: {
      type: 'string',
      default: 'IN'
    },
    taxQueryTax: {
      type: 'string',
      default: ''
    },
    taxQueryTerms: {
      type: 'array',
      default: []
    },
    perPage: {
      type: 'number',
      default: 10
    },
    termIds: {
      type: 'array',
      default: []
    },
    taxonomies: {
      type: 'array',
      default: []
    },
    linkType: {
      type: 'string',
      default: 'block'
    },
    hasDate: {
      type: 'boolean',
      default: true
    },
    hasExcerpt: {
      type: 'boolean',
      default: true
    },
    titleMaxLength: {
      type: 'number',
      default: 45
    },
    excerptMaxLength: {
      type: 'number',
      default: 90
    },
    metaFields: {
      type: 'array',
      default: []
    },
    buttonText: {
      type: 'string',
      default: 'Read more'
    },
    buttonStyle: {
      type: 'string',
      default: 'default'
    },
    breakpoint: {
      type: 'string',
      default: 'no-break'
    },
    // Margin
    marginTop: {
      type: 'number',
      default: 0
    },
    marginBottom: {
      type: 'number',
      default: 0
    },
  },
  edit,
  save: () => null,
})
