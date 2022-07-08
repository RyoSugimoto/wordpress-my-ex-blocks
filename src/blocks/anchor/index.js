import { registerBlockType  } from '@wordpress/blocks'
import edit from './edit'
import save from './save'

registerBlockType('my-extra-blocks/anchor', {
  apiVersion: 2,
  title: 'Extra Block Anchor',
  description: 'Anchor',
  icon: 'sticky',
  category: 'my-extra-blocks',
  attributes: {
    id: {
      type: 'string',
      default: ''
    },
    note: {
      type: 'string',
      default: ''
    },
  },
  edit,
  save,
})
