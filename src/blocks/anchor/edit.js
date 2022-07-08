import { useBlockProps, InspectorControls, BlockControls, InnerBlocks } from '@wordpress/block-editor'
import { PanelBody, TextControl, TextareaControl } from '@wordpress/components'
import { Stack, Row } from '../../components/layout'

const blockName = 'wp-block-my-extra-blocks-anchor'

export default props => {
  const {
    attributes: {
      id,
      note,
    }, setAttributes, clientId
  } = props

  const blockProps = useBlockProps({
    className: `
    `,
    style: {
    }
  })

  const getInspectorControls = () => {
    return <InspectorControls key={`inspector-controls-${clientId}`}>
      <PanelBody title="Basic settings" initialOpen={true}>
        <Stack>
          <Row>
            <TextControl
              label="ID"
              value={id}
              onChange={value => {
                setAttributes({
                  id: value
                })
              }}
            />
          </Row>
          <Row>
            <TextareaControl
              label="Note"
              value={note}
              onChange={value => {
                setAttributes({
                  note: value
                })
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
    <span
      {...blockProps}
      key={`block-${clientId}`}
    >Anchor: #{id}</span>
  ]
}
