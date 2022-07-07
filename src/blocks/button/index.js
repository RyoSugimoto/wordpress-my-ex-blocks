import { registerBlockType  } from '@wordpress/blocks'
import edit from './edit'
import save from './save'

registerBlockType('my-extra-blocks/button', {
  apiVersion: 2,
  title: 'Extra Button',
  description: 'Button',
  icon: 'button',
  category: 'my-extra-blocks',
  attributes: {
    // Button
    text: {
      type: 'string',
      default: 'Button text'
    },
    href: {
      type: 'string',
      default: ''
    },
    isExternal: {
      type: 'boolean',
      default: false
    },
    iconBefore: {
      type: 'string',
      default: ''
    },
    iconAfter: {
      type: 'string',
      default: ''
    },
    style: {
      type: 'string',
      default: 'filled'
    },
    shape: {
      type: 'string',
      default: 'square'
    },
    size: {
      type: 'string',
      default: 'sm'
    },
    display: {
      type: 'string',
      default: 'block'
    },
    // Button/Color
    colorPreset: {
      type: 'string',
      default: 'default'
    },
    backgroundColor: {
      type: 'string',
      default: 'transparent'
    },
    textColor: {
      type: 'string',
      default: 'inherit'
    },
    borderColor: {
      type: 'string',
      default: 'transparent'
    },
    // Button/Effect
    gradient: {
      type: 'string',
      default: 'none'
    },
    hasShadow: {
      type: 'boolean',
      default: false
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
    // Margin
    marginTop: {
      type: 'number',
      default: 0
    },
    marginRight: {
      type: 'number',
      default: 0
    },
    marginBottom: {
      type: 'number',
      default: 0
    },
    marginLeft: {
      type: 'number',
      default: 0
    },
  },
  edit,
  save,
})
