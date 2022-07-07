import { registerBlockType  } from '@wordpress/blocks'
import edit from './edit'
import save from './save'

registerBlockType('my-extra-blocks/list', {
  apiVersion: 2,
  title: 'Extra List',
  description: 'List',
  icon: 'editor-ul',
  category: 'my-extra-blocks',
  attributes: {
    itemGap: {
      type: 'number',
      default: 0
    },
    listType: {
      type: 'string',
      default: 'ul'
    },
    markerPosition: {
      type: 'string',
      default: 'inside'
    },
    listMarker: {
      type: 'string',
      default: 'disc'
    },
    customMarker: {
      type: 'string',
      default: ''
    },
    icon: {
      type: 'string',
      default: ''
    },
    markerColor: {
      type: 'string',
      default: 'currentColor'
    },
    // Padding
    padding: {
      type: 'array',
      default: [0, 0, 0, 0]
    },
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
