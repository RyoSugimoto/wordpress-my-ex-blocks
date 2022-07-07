import { registerBlockType  } from '@wordpress/blocks'
import edit from './edit'
import save from './save'

registerBlockType('my-extra-blocks/data-list-item', {
  apiVersion: 2,
  title: 'Extra Data List Item',
  description: 'Data list item',
  icon: 'text',
  category: 'my-extra-blocks',
  parent: ['my-extra-blocks/data-list'],
  attributes: {
    title: {
      type: 'string',
      default: '',
    },
    description: {
      type: 'string',
      default: '',
    },
  },
  edit,
  save,
})
