import { useBlockProps, InnerBlocks } from '@wordpress/block-editor'

const blockName = 'wp-block-my-extra-blocks-data-list'

export default props => {
  const {
    attributes: {
      gap,
      titleWidth,
      breakpoint,
      style,
      color1,
      color2,
      color3,
      color4,
      // Margin
      marginTop,
      marginBottom,
    }
  } = props

  const blockProps = useBlockProps.save({
    className: `
      is-meb-data-list-style-${style}
      is-meb-breakpoint-${breakpoint}
    `,
    style: {
      '--gap': `var(--meb-space-${gap})`,
      '--title-width': `${titleWidth / 2}em`,
      '--color-1': color1,
      '--color-2': color2,
      '--color-3': color3,
      '--color-4': color4,
      '--margin-top': `var(--meb-space-${marginTop})`,
      '--margin-bottom': `var(--meb-space-${marginBottom})`,
    }
  })

  return <div {...blockProps}>
    <dl className={`${blockName}__dl`}>
      <InnerBlocks.Content />
    </dl>
  </div>
}
