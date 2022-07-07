import { useBlockProps, InnerBlocks } from '@wordpress/block-editor'

const blockName = 'wp-block-my-extra-blocks-list'

export default props => {
  const {
    attributes: {
      itemGap,
      listType,
      listMarker,
      customMarker,
      icon,
      markerPosition,
      markerColor,
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
      // Typography
      fontFamily,
      fontSize,
      fontWeight,
      lineHeight,
      letterSpacing,
      isProportional,
      textAlign,
      // Margin
      marginTop,
      marginBottom,
    }
  } = props

  const blockProps = useBlockProps.save({
    className: `
      ${listMarker === 'custom' ? 'is-meb-custom-marker' : 'is-not-meb-custom-marker'}
      ${listMarker === 'icon' ? 'is-meb-icon-marker' : 'is-not-meb-icon-marker'}
      is-meb-marker-${markerPosition}
    `,
    style: {
      '--item-gap': `var(--meb-space-${itemGap})`,
      '--list-marker': listMarker,
      '--marker-position': markerPosition,
      '--custom-marker': `"${customMarker}"`,
      '--marker-color': markerColor,
      '--padding': padding.map(value => `var(--meb-space-${value})`).join(' '),
      '--bg-color': backgroundColor,
      '--color': textColor,
      '--border-color': borderColor,
      '--border-style': borderStyle,
      '--border-width': borderWidth.map(value => `var(--meb-border-width-${value})`).join(' '),
      '--border-radius': borderRadius.map(value => `var(--meb-border-radius-${value})`).join(' '),
      '--font-family': `var(--meb-font-${fontFamily})`,
      '--font-size': `var(--meb-font-size-${fontSize})`,
      '--font-weight': `var(--meb-font-weight-${fontWeight})`,
      '--font-feature': `var(--meb-font-feature-${isProportional ? 'proportional' : 'default'})`,
      '--text-align': textAlign,
      '--line-height': String(lineHeight),
      '--letter-spacing': `var(--meb-letter-spacing-${letterSpacing})`,
      '--margin-top': `var(--meb-space-${marginTop})`,
      '--margin-bottom': `var(--meb-space-${marginBottom})`,
    }
  })

  return <div
    {...blockProps}
  >
    {listType === 'ul' &&
      <ul className={`${blockName}__list`}>
        <InnerBlocks.Content />
      </ul>
    }
    {listType === 'ol' &&
      <ol className={`${blockName}__list`}>
        <InnerBlocks.Content />
      </ol>
    }
  </div>
}
