import { registerBlockType  } from '@wordpress/blocks'
import edit from './edit'
import save from './save'

registerBlockType('my-extra-blocks/grid-item', {
  apiVersion: 2,
  title: 'Extra Grid item',
  description: 'Grid item',
  icon: 'columns',
  category: 'my-extra-blocks',
  parent: ['my-extra-blocks/grid'],
  attributes: {
    columnStarts: {
      type: 'array',
      default: [0, 0, 0, 0, 0, 0]
    },
    columnEnds: {
      type: 'array',
      default: [0, 0, 0, 0, 0, 0]
    },
    // Padding
    padding: {
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
  },
  edit,
  save,
})
