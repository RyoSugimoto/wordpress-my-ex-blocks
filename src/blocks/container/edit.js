import { useBlockProps, InspectorControls, BlockControls, InnerBlocks } from '@wordpress/block-editor'
import { PanelBody } from '@wordpress/components'
import { Stack, Row } from '../../components/layout'
import { BorderControls, BorderRadiusControl, BorderWidthControl } from '../../components/border'
import { SizeControls } from '../../components/size'
import { PaddingControl } from '../../components/padding'
import { ColorSchemeControls } from '../../components/color'
import { TypographyControls } from '../../components/typography'
import { MarginControls } from '../../components/margin'
import { BackgroundImageControls } from '../../components/background'
import { EffectControls } from '../../components/effect'
import { PositionControls } from '../../components/position'

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
    }, setAttributes, clientId
  } = props

  const blockProps = useBlockProps({
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

  const getInspectorControls = () => {
    return <InspectorControls key={`inspector-controls-${clientId}`}>
      <PanelBody title="Padding" initialOpen={false}>
        <Stack>
          <Row>
            <PaddingControl
              padding={padding}
              onChange={value => {
                setAttributes({
                  padding: value
                })
              }}
            />
          </Row>
        </Stack>
      </PanelBody>
      <PanelBody title="Size" initialOpen={false}>
        <SizeControls
          boxSizing={boxSizing}
          maxWidth={maxWidth}
          customMaxWidth={customMaxWidth}
          isCentered={isCentered}
          onChange={value => {
            setAttributes(value)
          }}
        />
      </PanelBody>
      <PanelBody title="Color" initialOpen={false}>
        <ColorSchemeControls
          background={backgroundColor}
          text={textColor}
          onChange={value => {
            setAttributes({
              backgroundColor: value.background,
              textColor: value.text
            })
          }}
        />
      </PanelBody>
      <PanelBody title="Border" initialOpen={false}>
        <Stack>
          <Row title="Border radius">
            <BorderRadiusControl
              borderRadius={borderRadius}
              onChange={value => {
                setAttributes(value)
              }}
            />
          </Row>
          <Row title="Border">
            <BorderControls
              borderWidth={borderWidth}
              borderStyle={borderStyle}
              borderColor={borderColor}
              onChange={value => {
                setAttributes(value)
              }}
            />
          </Row>
        </Stack>
      </PanelBody>
      <PanelBody title="Typography" initialOpen={false}>
        <TypographyControls
          fontFamily={fontFamily}
          fontSize={fontSize}
          fontWeight={fontWeight}
          lineHeight={lineHeight}
          letterSpacing={letterSpacing}
          isProportional={isProportional}
          textAlign={textAlign}
          onChange={value => {
            setAttributes(value)
          }}
        />
      </PanelBody>
      <PanelBody title="Background image" initialOpen={false}>
        <BackgroundImageControls
          mediaId={bgImageId}
          mediaUrl={bgImageUrl}
          repeat={bgImageRepeat}
          size={bgImageSize}
          customSize={bgImageCustomSize}
          position={bgImagePosition}
          onChange={value => {
            setAttributes({
              bgImageId: value.mediaId,
              bgImageUrl: value.mediaUrl,
              bgImageRepeat: value.repeat,
              bgImageSize: value.size,
              bgImageCustomSize: value.customSize,
              bgImagePosition: value.position
            })
          }}
        />
      </PanelBody>
      <PanelBody title="Effect" initialOpen={false}>
        <EffectControls
          gradient={gradient}
          hasShadow={hasShadow}
          onChange={value => {
            setAttributes(value)
          }}
        />
      </PanelBody>
      <PanelBody title="Margin" initialOpen={false}>
        <MarginControls
          marginTop={marginTop}
          marginBottom={marginBottom}
          onChange={value => {
            setAttributes(value)
          }}
        />
      </PanelBody>
      <PanelBody title="Position" initialOpen={false}>
        <PositionControls
          position={position}
          inset={inset}
          zIndex={zIndex}
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
    <div
      {...blockProps}
      key={`block-${clientId}`}
    >
      <InnerBlocks />
    </div>
  ]
}
