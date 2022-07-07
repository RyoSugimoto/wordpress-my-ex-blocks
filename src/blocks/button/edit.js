import { useBlockProps, InspectorControls, BlockControls } from '@wordpress/block-editor'
import { PanelBody } from '@wordpress/components'
import { TypographyControls } from '../../components/typography'
import { MarginControls } from '../../components/margin'
import { ButtonControls, ButtonUi } from '../../components/button'

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
    }, setAttributes, clientId
  } = props

  const blockProps = useBlockProps({
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

  const getInspectorControls = () => {
    return <InspectorControls key={`inspector-controls-${clientId}`}>
      <PanelBody title="Basic settings" initialOpen={true}>
        <ButtonControls
          text={text}
          href={href}
          isExternal={isExternal}
          iconBefore={iconBefore}
          iconAfter={iconAfter}
          style={style}
          shape={shape}
          size={size}
          display={display}
          colorPreset={colorPreset}
          backgroundColor={backgroundColor}
          textColor={textColor}
          borderColor={borderColor}
          gradient={gradient}
          hasShadow={hasShadow}
          onChange={value => {
            setAttributes(value)
          }}
        />
      </PanelBody>
      <PanelBody title="Typography" initialOpen={false}>
        <TypographyControls
          fontFamily={fontFamily}
          fontSize={fontSize}
          fontWeight={fontWeight}
          lineHeight={lineHeight}
          letterSpacing={letterSpacing}
          isProportional={isProportional}
          onChange={value => {
            setAttributes(value)
          }}
        />
      </PanelBody>
      <PanelBody title="Margin" initialOpen={false}>
        <MarginControls
          marginTop={marginTop}
          marginRight={marginRight}
          marginBottom={marginBottom}
          marginLeft={marginLeft}
          onChange={value => {
            setAttributes(value)
          }}
        />
      </PanelBody>
    </InspectorControls>
  }

  const getBlockControls = () => {
    return <BlockControls key={`block-controls-${clientId}`}>
    </BlockControls>
  }

  return [
    getInspectorControls(),
    getBlockControls(),
    <ButtonUi
      key={clientId}
      blockProps={blockProps}
      blockName={blockName}
      text={text}
      iconBefore={iconBefore}
      iconAfter={iconAfter}
    />
  ]
}
