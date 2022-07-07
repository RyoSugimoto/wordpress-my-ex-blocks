import { useBlockProps, InspectorControls, BlockControls, InnerBlocks } from '@wordpress/block-editor'
import { PanelBody, TextareaControl, SelectControl } from '@wordpress/components'
import { Stack, Row } from '../../components/layout'
import { BorderControls, BorderRadiusControl, BorderWidthControl } from '../../components/border'
import { SizeControls } from '../../components/size'
import { ColorSchemeControls, ColorControl } from '../../components/color'
import { MarginControls } from '../../components/margin'

const blockName = 'wp-block-my-extra-blocks-svg'

const alignmentOptions = [
  { value: 'left', label: 'Left'},
  { value: 'center', label: 'Center'},
  { value: 'right', label: 'Right'},
]

export default props => {
  const {
    attributes: {
      code,
      fill,
      stroke,
      alignment,
      // Size
      width,
      customWidth,
      maxWidth,
      customMaxWidth,
      // Color scheme
      backgroundColor,
      textColor,
      // Margin
      marginTop,
      marginBottom,
    }, setAttributes, clientId
  } = props

  const blockProps = useBlockProps({
    className: `
      is-meb-align-${alignment}
      is-meb-width-${width}
      is-meb-max-width-${maxWidth}
      ${fill !== '' ? 'is-meb-svg-fill' : 'is-not-meb-svg-fill' }
      ${stroke !== '' ? 'is-meb-svg-stroke' : 'is-not-meb-svg-stroke' }
    `,
    style: {
      '--fill': fill,
      '--stroke': stroke,
      '--custom-width': customWidth,
      '--custom-max-width': customMaxWidth,
      '--bg-color': backgroundColor,
      '--color': textColor,
      '--margin-top': `var(--meb-space-${marginTop})`,
      '--margin-bottom': `var(--meb-space-${marginBottom})`,
    }
  })

  const isSvg = string => {
    const svgPattern = /^\s*<svg\b[^>]*\s*(viewBox=\"(\b[^"]*)\").*?>([\s\S]*?)<\/svg>\s*$/
    return svgPattern.test(string)
  }

  const getInspectorControls = () => {
    return <InspectorControls key={`inspector-controls-${clientId}`}>
      <PanelBody title="SVG" initialOpen={true}>
        <Stack>
          <Row>
            <TextareaControl
              label="Code"
              value={code}
              onChange={value => {
                setAttributes({
                  code: value
                })
              }}
            />
          </Row>
          <Row>
            <SizeControls
              width={width}
              customWidth={customWidth}
              maxWidth={maxWidth}
              customMaxWidth={customMaxWidth}
              onChange={value => {
                setAttributes(value)
              }}
            />
          </Row>
          <Row>
            <SelectControl
              label="Alignment"
              value={alignment}
              options={alignmentOptions}
              onChange={value => {
                setAttributes({
                  alignment: value
                })
              }}
            />
          </Row>
          <Row>
            <ColorControl
              label="Fill"
              color={fill}
              onChange={value => {
                const newValue = value === '' ? '' : value
                setAttributes({
                  fill: value
                })
              }}
            />
          </Row>
          <Row>
            <ColorControl
              label="Stroke"
              color={stroke}
              onChange={value => {
                const newValue = value === '' ? '' : value
                setAttributes({
                  stroke: value
                })
              }}
            />
          </Row>
        </Stack>
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

  return [
    getInspectorControls(),
    getBlockControls(),
    <div
      {...blockProps}
      key={`block-${clientId}`}
    >
      {isSvg(code) &&
        <span
          dangerouslySetInnerHTML={{__html: code}}
          className={`${blockName}__frame`}
        ></span>
      }
    </div>
  ]
}
