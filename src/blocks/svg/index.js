import { registerBlockType  } from '@wordpress/blocks'
import edit from './edit'
import save from './save'

registerBlockType('my-extra-blocks/svg', {
  apiVersion: 2,
  title: 'Extra SVG',
  description: 'SVG',
  icon: 'chart-area',
  category: 'my-extra-blocks',
  attributes: {
    code: {
      type: 'string',
      default: ''
    },
    height: {
      type: 'string',
      default: 'auto'
    },
    fill: {
      type: 'string',
      default: ''
    },
    stroke: {
      type: 'string',
      default: ''
    },
    alignment: {
      type: 'string',
      default: 'left'
    },
    // Size
    width: {
      type: 'string',
      default: 'auto'
    },
    customWidth: {
      type: 'string',
      default: '100%'
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
