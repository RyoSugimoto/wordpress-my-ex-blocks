import { useBlockProps, InspectorControls, BlockControls, InnerBlocks } from '@wordpress/block-editor'
import { PanelBody, SelectControl } from '@wordpress/components'
import { Stack, Row } from '../../components/layout'
import { PaddingControl } from '../../components/padding'
import { BorderControls, BorderRadiusControl } from '../../components/border'
import { ColorSchemeControls } from '../../components/color'

const blockName = 'wp-block-my-extra-blocks-grid-item'

const breakpoints = [
  { label: 'XS', key: 'xs' },
  { label: 'S', key: 'sm' },
  { label: 'M', key: 'md' },
  { label: 'L', key: 'lg' },
  { label: 'XL', key: 'xl' },
  { label: '2XL', key: '2xl' },
]

const startPoints = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
const endPoints = [0, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]

export default props => {
  const {
    attributes: {
      columnStarts,
      columnEnds,
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
    }, setAttributes, clientId
  } = props

  const startStyles = {}
  breakpoints.forEach(({label, key}, index) => {
    startStyles[`--col-start-${key}`] = (columnStarts[index] === 0 ? 'auto' : String(columnStarts[index]))
  })

  const endStyles = {}
  breakpoints.forEach(({label, key}, index) => {
    endStyles[`--col-end-${key}`] = (columnEnds[index] === 0 ? 'auto' : String(columnEnds[index]))
  })

  const blockProps = useBlockProps({
    className: `
    `,
    style: {
      ...startStyles,
      ...endStyles,
      '--padding': padding.map(value => `var(--meb-space-${value})`).join(' '),
      '--bg-color': backgroundColor,
      '--color': textColor,
      '--border-color': borderColor,
      '--border-style': borderStyle,
      '--border-width': borderWidth.map(value => `var(--meb-border-width-${value})`).join(' '),
      '--border-radius': borderRadius.map(value => `var(--meb-border-radius-${value})`).join(' '),
    }
  })

  const getInspectorControls = () => {
    return <InspectorControls key={`inspector-controls-${clientId}`}>
      <PanelBody title="Column" initialOpen={true}>
        <Stack>
          <Row>
            <table>
              <thead>
                <tr>
                  <th>Viewport</th>
                  <th>Start</th>
                  <th>End</th>
                </tr>
              </thead>
              <tbody>
                {breakpoints.map(({label, key}, index) => {
                  return <tr key={index}>
                    <td>{label}</td>
                    <td>
                      <SelectControl
                        label="Column starts"
                        hideLabelFromVision
                        value={columnStarts[index]}
                        options={startPoints.map(value => ({ value: value, label: (value === 0 ? 'Auto' : value) }))}
                        onChange={value => {
                          const newStarts = columnStarts.concat()
                          newStarts[index] = parseInt(value)
                          setAttributes({
                            columnStarts: newStarts
                          })
                        }}
                      />
                    </td>
                    <td>
                      <SelectControl
                        label="Column ends"
                        hideLabelFromVision
                        value={columnEnds[index]}
                        options={endPoints.map(value => ({ value: value, label: (value === 0 ? 'Auto' : value) }))}
                        onChange={value => {
                          const newEnds = columnEnds.concat()
                          newEnds[index] = parseInt(value)
                          setAttributes({
                            columnEnds: newEnds
                          })
                        }}
                      />
                    </td>
                  </tr>
                })}
              </tbody>
            </table>
          </Row>
        </Stack>
      </PanelBody>
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
