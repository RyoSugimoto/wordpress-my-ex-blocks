import { useBlockProps, InnerBlocks } from '@wordpress/block-editor'

const blockName = 'wp-block-my-extra-blocks-grid'

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
      columns,
      gapX,
      gapY,
      // Margin
      marginTop,
      marginBottom,
    }
  } = props

  const columnsStyle = {}
  breakpoints.forEach(({label, key}, index) => {
    columnsStyle[`--columns-${key}`] = `repeat(${columns[index]}, 1fr)`
  })

  const blockProps = useBlockProps.save({
    className: `
    `,
    style: {
      ...columnsStyle,
      '--gap-x': `var(--meb-space-${gapX})`,
      '--gap-y': `var(--meb-space-${gapY})`,
      '--margin-top': `var(--meb-space-${marginTop})`,
      '--margin-bottom': `var(--meb-space-${marginBottom})`,
    }
  })

  return <div
    {...blockProps}
  >
    <div className={`${blockName}__grid`}>
      <InnerBlocks.Content />
    </div>
  </div>
}
