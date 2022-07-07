import { registerBlockType  } from '@wordpress/blocks'
import edit from './edit'
import save from './save'

registerBlockType('my-extra-blocks/list-item', {
  apiVersion: 2,
  title: 'Extra List Item',
  description: 'List item',
  icon: 'marker',
  category: 'my-extra-blocks',
  parent: ['my-extra-blocks/list'],
  attributes: {
    content: {
      type: 'string',
      default: ''
    },
    icon: {
      type: 'string',
      default: ''
    },
    hasIcon: {
      type: 'boolean',
      default: false
    },
  },
  edit,
  save,
})
