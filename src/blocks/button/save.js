import { useBlockProps } from '@wordpress/block-editor'
import { ButtonUi } from '../../components/button'

const blockName = 'wp-block-my-extra-blocks-button'

export default props => {
  const {
    attributes: {
      // Button
      text,
      href,
      isExternal,
      iconBefore,
      iconAfter,
      style,
      shape,
      size,
      display,
      // Button/Color
      colorPreset,
      backgroundColor,
      textColor,
      borderColor,
      // Button/Effect
      gradient,
      hasShadow,
      // Typography
      fontFamily,
      fontSize,
      fontWeight,
      lineHeight,
      letterSpacing,
      isProportional,
      // Margin
      marginTop,
      marginRight,
      marginBottom,
      marginLeft,
    },
  } = props

  const blockProps = useBlockProps.save({
    href,
    target: `${isExternal ? '_blank' : '_self'}`,
    rel: `${isExternal ? 'noopener' : 'noopener'}`,
    className: `
      is-meb-color-preset-${colorPreset}
      is-meb-button-style-${style}
      is-meb-shape-${shape}
      is-meb-size-${size}
      is-meb-display-${display}
      ${hasShadow ? 'is-meb-has-shadow' : 'is-not-meb-has-shadow' }
    `,
    style: {
      '--custom-color': textColor,
      '--custom-bg-color': backgroundColor,
      '--custom-border-color': borderColor,
      '--custom-gradient': gradient,
      '--font-family': `var(--meb-font-${fontFamily})`,
      '--font-size': `var(--meb-font-size-${fontSize})`,
      '--font-weight': `var(--meb-font-weight-${fontWeight})`,
      '--font-feature': `var(--meb-font-feature-${isProportional ? 'proportional' : 'default'})`,
      '--line-height': String(lineHeight),
      '--letter-spacing': `var(--meb-letter-spacing-${letterSpacing})`,
      '--margin-top': `var(--meb-space-${marginTop})`,
      '--margin-right': `var(--meb-space-${marginRight})`,
      '--margin-bottom': `var(--meb-space-${marginBottom})`,
      '--margin-left': `var(--meb-space-${marginLeft})`,
    },
  })

  return <ButtonUi
    blockProps={blockProps}
    blockName={blockName}
    text={text}
    iconBefore={iconBefore}
    iconAfter={iconAfter}
  />
}
