import { registerBlockType  } from '@wordpress/blocks'
import edit from './edit'
import save from './save'

registerBlockType('my-extra-blocks/image', {
  apiVersion: 2,
  title: 'Extra Image',
  description: 'Image',
  icon: 'format-image',
  category: 'my-extra-blocks',
  attributes: {
    mediaId: {
      type: 'number',
      default: 0,
    },
    mediaUrl: {
      type: 'string',
      default: '',
    },
    alt: {
      type: 'string',
      default: '',
    },
    caption: {
      type: 'string',
      default: '',
    },
    mobileMediaId: {
      type: 'number',
      default: 0,
    },
    mobileMediaUrl: {
      type: 'string',
      default: '',
    },
    breakpoint: {
      type: 'string',
      default: '640px',
    },
    // Alignment
    alignment: {
      type: 'string',
      default: 'left',
    },
    // Frame
    frameWidth: {
      type: 'string',
      default: '640px',
    },
    frameIsAutoHeight: {
      type: 'boolean',
      default: true,
    },
    frameVerticalRatio: {
      type: 'number',
      default: 100,
    },
    frameFit: {
      type: 'string',
      default: 'cover',
    },
    // Border radius
    borderRadius: {
      type: 'array',
      default: [0, 0, 0, 0],
    },
    // Effect
    hasShadow: {
      type: 'boolean',
      default: false
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
  save,
})
