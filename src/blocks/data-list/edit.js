import { useBlockProps, InspectorControls, BlockControls, InnerBlocks } from '@wordpress/block-editor'
import { PanelBody, RangeControl, SelectControl } from '@wordpress/components'
import { Stack, Row } from '../../components/layout'
import { ColorControl } from '../../components/color'
import { MarginControls } from '../../components/margin'

const blockName = 'wp-block-my-extra-blocks-data-list'

const breakpointOptions = [
  { value: 'xs', label: 'XS' },
  { value: 'sm', label: 'S' },
  { value: 'md', label: 'M' },
  { value: 'lg', label: 'L' },
  { value: 'xl', label: 'Xl' },
  { value: '2xl', label: '2XL' },
  { value: 'none', label: 'None' },
]

const styleOptions = [
  { value: 'default', label: 'Default' },
  { value: 'default-accent', label: 'Default Accent' },
  { value: 'bar', label: 'Bar' },
  { value: 'bar-accent', label: 'Bar Accent' },
]

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
    }, setAttributes, clientId
  } = props

  const blockProps = useBlockProps({
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

  const getInspectorControls = () => {
    return <InspectorControls key={`inspector-controls-${clientId}`}>
      <PanelBody title="Basic setting" initialOpen={true}>
        <Stack>
          <Row>
            <RangeControl
              label="Title width"
              value={titleWidth}
              min={0} max={100} step={1}
              onChange={value => {
                setAttributes({
                  titleWidth: value
                })
              }}
            />
          </Row>
          <Row>
            <RangeControl
              label="Gap between items"
              value={gap}
              min={0} max={100} step={1}
              onChange={value => {
                setAttributes({
                  gap: value
                })
              }}
            />
          </Row>
          <Row>
            <SelectControl
              label="Breakpoint"
              value={breakpoint}
              options={breakpointOptions}
              onChange={value => {
                setAttributes({
                  breakpoint: value
                })
              }}
            />
          </Row>
          <Row>
            <SelectControl
              label="Style"
              value={style}
              options={styleOptions}
              onChange={value => {
                setAttributes({
                  style: value
                })
              }}
            />
          </Row>
        </Stack>
      </PanelBody>
      <PanelBody title="Color" initialOpen={false}>
        <Stack>
          <Row>
            <ColorControl
              label="Color 1"
              color={color1}
              onChange={value => {
                setAttributes({
                  color1: value
                })
              }}
            />
          </Row>
          <Row>
            <ColorControl
              label="Color 2"
              color={color2}
              onChange={value => {
                setAttributes({
                  color2: value
                })
              }}
            />
          </Row>
          <Row>
            <ColorControl
              label="Color 3"
              color={color3}
              onChange={value => {
                setAttributes({
                  color3: value
                })
              }}
            />
          </Row>
          <Row>
            <ColorControl
              label="Color 4"
              color={color4}
              onChange={value => {
                setAttributes({
                  color4: value
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
      <dl className={`${blockName}__dl`}>
        <InnerBlocks allowedBlocks={['my-extra-blocks/data-list-item']} />
      </dl>
    </div>
  ]
}
