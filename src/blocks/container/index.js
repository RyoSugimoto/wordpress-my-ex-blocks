import { registerBlockType  } from '@wordpress/blocks'
import edit from './edit'
import save from './save'

registerBlockType('my-extra-blocks/container', {
  apiVersion: 2,
  title: 'Extra Container',
  description: 'Container',
  icon: 'block-default',
  category: 'my-extra-blocks',
  attributes: {
    // Padding
    padding: {
      type: 'array',
      default: [0, 0, 0, 0]
    },
    // Size
    boxSizing: {
      type: 'string',
      default: 'border-box'
    },
    maxWidth: {
      type: 'string',
      default: 'none'
    },
    customMaxWidth: {
      type: 'string',
      default: '100%'
    },
    isCentered: {
      type: 'boolean',
      default: false
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
    // Background image
    bgImageId: {
      type: 'number',
      default: 0,
    },
    bgImageUrl: {
      type: 'string',
      default: '',
    },
    bgImageRepeat: {
      type: 'string',
      default: 'repeat',
    },
    bgImageSize: {
      type: 'string',
      default: 'auto',
    },
    bgImageCustomSize: {
      type: 'string',
      default: '',
    },
    bgImagePosition: {
      type: 'string',
      default: 'left top',
    },
    // Typography
    fontFamily: {
      type: 'string',
      default: 'inherit'
    },
    fontSize: {
      type: 'number',
      default: 8
    },
    fontWeight: {
      type: 'string',
      default: 'normal'
    },
    lineHeight: {
      type: 'number',
      default: 1.5
    },
    letterSpacing: {
      type: 'number',
      default: 0
    },
    isProportional: {
      type: 'boolean',
      default: false
    },
    textAlign: {
      type: 'string',
      default: 'inherit'
    },
    // Effect
    gradient: {
      type: 'string',
      default: 'none',
    },
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
    // Position
    position: {
      type: 'string',
      default: 'relative',
    },
    inset: {
      type: 'array',
      default: ['auto', 'auto', 'auto', 'auto']
    },
    zIndex: {
      type: 'number',
      default: 0,
    },
  },
  edit,
  save,
})
