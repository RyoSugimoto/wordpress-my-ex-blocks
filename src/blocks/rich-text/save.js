import { useBlockProps, RichText } from '@wordpress/block-editor'

const blockName = 'wp-block-my-extra-blocks-rich-text'

export default props => {
  const {
    attributes: {
      content,
      tagName,
      isCushion,
      isTextGradient,
      gradient,
      // Typography
      fontFamily,
      fontSize,
      fontWeight,
      lineHeight,
      letterSpacing,
      isProportional,
      textAlign,
      // Color
      backgroundColor,
      textColor,
      // Margin
      marginTop,
      marginBottom,
    }
  } = props

  const blockProps = useBlockProps.save({
    className: `
      ${isCushion ? 'is-meb-cushion' : 'is-not-meb-cushion' }
      ${isTextGradient ? 'is-meb-text-gradient' : 'is-not-meb-text-gradient' }
    `,
    style: {
      '--gradient': gradient,
      '--font-family': `var(--meb-font-${fontFamily})`,
      '--font-size': `var(--meb-font-size-${fontSize})`,
      '--font-weight': `var(--meb-font-weight-${fontWeight})`,
      '--font-feature': `var(--meb-font-feature-${isProportional ? 'proportional' : 'default'})`,
      '--text-align': textAlign,
      '--line-height': String(lineHeight),
      '--letter-spacing': `var(--meb-letter-spacing-${letterSpacing})`,
      '--bg-color': backgroundColor,
      '--color': textColor,
      '--margin-top': `var(--meb-space-${marginTop})`,
      '--margin-bottom': `var(--meb-space-${marginBottom})`,
    }
  })

  const Wrapper = (tagName, attributes, children) => createElement(
    tagName,
    attributes,
    children
  )

  return Wrapper(
    tagName,
    {...blockProps},
    <RichText.Content
      className={`${blockName}__content`}
      tagName="span"
      value={content}
    />
  )
}
