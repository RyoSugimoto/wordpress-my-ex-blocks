import { registerBlockType  } from '@wordpress/blocks'
import edit from './edit'
import save from './save'

registerBlockType('my-extra-blocks/data-list', {
  apiVersion: 2,
  title: 'Extra Data List',
  description: 'Data list',
  icon: 'editor-table',
  category: 'my-extra-blocks',
  attributes: {
    gap: {
      type: 'number',
      default: 0
    },
    titleWidth: {
      type: 'number',
      default: 12
    },
    breakpoint: {
      type: 'string',
      default: 'md'
    },
    style: {
      type: 'string',
      default: 'default'
    },
    color1: {
      type: 'string',
      default: '#000000'
    },
    color2: {
      type: 'string',
      default: '#eeeeee'
    },
    color3: {
      type: 'string',
      default: '#000000'
    },
    color4: {
      type: 'string',
      default: '#000000'
    },
    // Padding
    paddingTop: {
      type: 'number',
      default: 0
    },
    paddingRight: {
      type: 'number',
      default: 0
    },
    paddingBottom: {
      type: 'number',
      default: 0
    },
    paddingLeft: {
      type: 'number',
      default: 0
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
