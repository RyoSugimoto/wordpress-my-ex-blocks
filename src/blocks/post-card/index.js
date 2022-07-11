import { registerBlockType  } from '@wordpress/blocks'
import edit from './edit'

registerBlockType('my-extra-blocks/post-card', {
  apiVersion: 2,
  title: 'Extra Post Card',
  description: 'Post card',
  icon: 'embed-post',
  category: 'my-extra-blocks',
  attributes: {
    postType: {
      type: 'string',
      default: 'post'
    },
    postId: {
      type: 'number',
      default: 0
    },
    taxonomies: {
      type: 'array',
      default: ['category']
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
      default: 'sm'
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
