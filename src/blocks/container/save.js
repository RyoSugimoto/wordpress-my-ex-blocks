import { useBlockProps, InnerBlocks } from '@wordpress/block-editor'

const blockName = 'wp-block-my-extra-blocks-container'

export default props => {
  const {
    attributes: {
      // Padding
      padding,
      // Size
      boxSizing,
      maxWidth,
      customMaxWidth,
      isCentered,
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
      // Background image
      bgImageId,
      bgImageUrl,
      bgImageRepeat,
      bgImageSize,
      bgImageCustomSize,
      bgImagePosition,
      // Effect
      gradient,
      hasShadow,
      // Margin
      marginTop,
      marginBottom,
      // Position
      position,
      inset,
      zIndex,
    }
  } = props

  const blockProps = useBlockProps.save({
    className: `
      is-meb-max-width-${maxWidth}
      ${isCentered ? 'is-meb-centered' : 'is-not-meb-centered'}
      ${hasShadow ? 'is-meb-has-shadow' : 'is-not-meb-has-shadow'}
    `,
    style: {
      '--padding': padding.map(value => `var(--meb-space-${value})`).join(' '),
      '--box-sizing': boxSizing,
      '--custom-max-width': customMaxWidth,
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
      '--bg-image-url': `url(${bgImageUrl})`,
      '--bg-image-repeat': bgImageRepeat,
      '--bg-image-position': bgImagePosition,
      '--bg-image-size': `${bgImageSize === 'custom' ? bgImageCustomSize : bgImageSize}`,
      '--gradient': gradient,
      '--margin-top': `var(--meb-space-${marginTop})`,
      '--margin-bottom': `var(--meb-space-${marginBottom})`,
      '--position': position,
      '--inset': inset.map(value => value).join(' '),
      '--z-index': zIndex,
    }
  })

  return <div {...blockProps}>
    <InnerBlocks.Content />
  </div>
}
