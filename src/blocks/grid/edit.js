import { useBlockProps, InspectorControls, BlockControls, InnerBlocks } from '@wordpress/block-editor'
import { PanelBody, RangeControl } from '@wordpress/components'
import { Stack, Row } from '../../components/layout'
import { MarginControls } from '../../components/margin'

const blockName = 'wp-block-my-extra-blocks-grid'

const breakpoints = [
  { label: 'XS', key: 'xs' },
  { label: 'S', key: 'sm' },
  { label: 'M', key: 'md' },
  { label: 'L', key: 'lg' },
  { label: 'XL', key: 'xl' },
  { label: '2XL', key: '2xl' },
]

export default props => {
  const {
    attributes: {
      columns,
      gapX,
      gapY,
      // Margin
      marginTop,
      marginBottom,
    }, setAttributes, clientId
  } = props

  const columnsStyle = {}
  breakpoints.forEach(({label, key}, index) => {
    columnsStyle[`--columns-${key}`] = `repeat(${columns[index]}, 1fr)`
  })

  const blockProps = useBlockProps({
    className: `
    `,
    style: {
      ...columnsStyle,
      '--gap-x': `var(--meb-space-${gapX})`,
      '--gap-y': `var(--meb-space-${gapY})`,
      '--margin-top': `var(--meb-space-${marginTop})`,
      '--margin-bottom': `var(--meb-space-${marginBottom})`,
    }
  })

  const getInspectorControls = () => {
    return <InspectorControls key={`inspector-controls-${clientId}`}>
      <PanelBody title="Grid" initialOpen={true}>
        <Stack>
          <Row>
            <RangeControl
              label="Gap X"
              value={gapX}
              min={1} max={50} step={1}
              onChange={value => {
                setAttributes({
                  gapX: value
                })
              }}
            />
          </Row>
          <Row>
            <RangeControl
              label="Gap Y"
              value={gapY}
              min={1} max={50} step={1}
              onChange={value => {
                setAttributes({
                  gapY: value
                })
              }}
            />
          </Row>
          <Row title="Columns">
            <table style={{width: '100%'}}>
              <thead><tr><th>Viewport</th><th>Columns</th></tr></thead>
              <tbody>{breakpoints.map(({label, key}, index) => {
                return <tr key={index}><td>{label}</td>
                <td><RangeControl
                  label={label}
                  hideLabelFromVision
                  value={columns[index]}
                  min={1} max={12} step={1}
                  onChange={value => {
                    const newValue = columns.concat()
                    newValue[index] = value
                    setAttributes({
                      columns: newValue
                    })
                  }}
                /></td></tr>
              })}</tbody>
            </table>
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
      <div className={`${blockName}__grid`}>
        <InnerBlocks allowedBlocks={['my-extra-blocks/grid-item', 'my-extra-blocks/container']} />
      </div>
    </div>
  ]
}
