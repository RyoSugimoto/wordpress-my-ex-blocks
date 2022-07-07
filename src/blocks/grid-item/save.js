import { useBlockProps, InnerBlocks } from '@wordpress/block-editor'

const blockName = 'wp-block-my-extra-blocks-grid-item'

const breakpoints = [
  { label: 'XS', key: 'xs' },
  { label: 'S', key: 'sm' },
  { label: 'M', key: 'md' },
  { label: 'L', key: 'lg' },
  { label: 'XL', key: 'xl' },
  { label: '2XL', key: '2xl' },
]

export default props => {
  const {
    attributes: {
      columnStarts,
      columnEnds,
      // Padding
      padding,
      // Color scheme
      backgroundColor,
      textColor,
      // Border
      borderWidth,
      borderStyle,
      borderColor,
      borderRadius,
    }
  } = props

  const startStyles = {}
  breakpoints.forEach(({label, key}, index) => {
    startStyles[`--col-start-${key}`] = (columnStarts[index] === 0 ? 'auto' : String(columnStarts[index]))
  })

  const endStyles = {}
  breakpoints.forEach(({label, key}, index) => {
    endStyles[`--col-end-${key}`] = (columnEnds[index] === 0 ? 'auto' : String(columnEnds[index]))
  })

  const blockProps = useBlockProps.save({
    className: `
    `,
    style: {
      ...startStyles,
      ...endStyles,
      '--padding': padding.map(value => `var(--meb-space-${value})`).join(' '),
      '--bg-color': backgroundColor,
      '--color': textColor,
      '--border-color': borderColor,
      '--border-style': borderStyle,
      '--border-width': borderWidth.map(value => `var(--meb-border-width-${value})`).join(' '),
      '--border-radius': borderRadius.map(value => `var(--meb-border-radius-${value})`).join(' '),
    }
  })

  return <div
    {...blockProps}
  >
    <InnerBlocks.Content />
  </div>
}
