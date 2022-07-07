import { useBlockProps, RichText, InspectorControls, BlockControls } from '@wordpress/block-editor'
import { createElement } from '@wordpress/element'
import { PanelBody, SelectControl, ToggleControl } from '@wordpress/components'
import { Stack, Row } from '../../components/layout'
import { TypographyControls } from '../../components/typography'
import { ColorSchemeControls } from '../../components/color'
import { MarginControls } from '../../components/margin'
import { EffectControls } from '../../components/effect'

const blockName = 'wp-block-my-extra-blocks-rich-text'

const tagNameOptions = [
  { value: 'div', label: 'div' },
  { value: 'p', label: 'p' },
  { value: 'h1', label: 'h1' },
  { value: 'h2', label: 'h2' },
  { value: 'h3', label: 'h3' },
  { value: 'h4', label: 'h4' },
  { value: 'h5', label: 'h5' },
  { value: 'h6', label: 'h6' },
  { value: 'span', label: 'span' },
]

export default props => {
  const {
    attributes: {
      content,
      tagName,
      isCushion,
      isTextClip,
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
    }, setAttributes, clientId
  } = props

  const blockProps = useBlockProps({
    className: `
      ${isCushion ? 'is-meb-cushion' : 'is-not-meb-cushion' }
      ${isTextClip ? 'is-meb-text-clip' : 'is-not-meb-text-clip' }
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

  const getInspectorControls = () => {
    return <InspectorControls key={`inspector-controls-${clientId}`}>
      <PanelBody title="Basic settings" initialOpen={true}>
        <Stack>
          <Row>
            <SelectControl
              label="Tag"
              value={tagName}
              options={tagNameOptions}
              onChange={value => {
                setAttributes({
                  tagName: value
                })
              }}
            />
          </Row>
          <Row>
            <ToggleControl
              label="Cushion"
              checked={isCushion}
              onChange={value => {
                setAttributes({
                  isCushion: value
                })
              }}
            />
          </Row>
          <Row>
            <EffectControls
              gradient={gradient}
              onChange={value => {
                setAttributes(value)
              }}
            />
          </Row>
          <Row>
            <ToggleControl
              label="Text clip"
              checked={isTextClip}
              onChange={value => {
                setAttributes({
                  isTextClip: value
                })
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
      <PanelBody title="Margin" initialOpen={false}>
        <MarginControls
          marginTop={marginTop}
          marginBottom={marginBottom}
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

  const Wrapper = (tagName, attributes, children) => createElement(
    tagName,
    attributes,
    children
  )

  return [
    getInspectorControls(),
    getBlockControls(),
    Wrapper(
      tagName,
      {
        ...blockProps,
        key: `block-${clientId}`
      },
      <RichText
        className={`${blockName}__content`}
        placeholder="Write text..."
        tagName="span"
        value={content}
        onChange={content => {
          setAttributes({ content })
        }}
      />
    )
  ]
}
