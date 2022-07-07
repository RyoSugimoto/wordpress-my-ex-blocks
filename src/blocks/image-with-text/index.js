import { registerBlockType  } from '@wordpress/blocks'
import edit from './edit'
import save from './save'

registerBlockType('my-extra-blocks/image-with-text', {
  apiVersion: 2,
  title: 'Extra Image With Text',
  description: 'Image with text',
  icon: 'align-pull-left',
  category: 'my-extra-blocks',
  attributes: {
    imagePosition: {
      type: 'string',
      default: 'left'
    },
    alignment: {
      type: 'string',
      default: 'center'
    },
    innerAlignment: {
      type: 'string',
      default: 'center'
    },
    gap: {
      type: 'number',
      default: 16
    },
    breakpoint: {
      type: 'string',
      default: 'md'
    },
    imageHeightIsAdjustedText: {
      type: 'boolean',
      default: false
    },
    minHeight: {
      type: 'string',
      default: '0'
    },
    // Media
    mediaId: {
      type: 'number',
      default: 0
    },
    mediaUrl: {
      type: 'string',
      default: ''
    },
    // Frame
    frameWidth: {
      type: 'string',
      default: '33%'
    },
    frameVerticalRatio: {
      type: 'number',
      default: 100
    },
    frameIsAutoHeight: {
      type: 'boolean',
      default: false
    },
    frameFit: {
      type: 'string',
      default: 'cover'
    },
    // Padding
    padding: {
      type: 'array',
      default: [0, 0, 0, 0]
    },
    // Border
    borderWidth: {
      type: 'array',
      default: [0, 0, 0, 0]
    },
    borderStyle: {
      type: 'string',
      default: 'solid'
    },
    borderColor: {
      type: 'string',
      default: 'currentColor'
    },
    borderRadius: {
      type: 'array',
      default: [0, 0, 0, 0]
    },
    // Color
    backgroundColor: {
      type: 'string',
      default: 'transparent'
    },
    textColor: {
      type: 'string',
      default: 'inherit'
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
