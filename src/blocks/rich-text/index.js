import { registerBlockType  } from '@wordpress/blocks'
import edit from './edit'
import save from './save'

registerBlockType('my-extra-blocks/rich-text', {
  apiVersion: 2,
  title: 'Extra Rich Text',
  description: 'Rich text',
  icon: 'text',
  category: 'my-extra-blocks',
  attributes: {
    content: {
      type: 'string',
      default: ''
    },
    tagName: {
      type: 'string',
      default: 'div'
    },
    isTextGradient: {
      type: 'boolean',
      default: false
    },
    isCushion: {
      type: 'boolean',
      default: false
    },
    gradient: {
      type: 'string',
      default: 'none'
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
