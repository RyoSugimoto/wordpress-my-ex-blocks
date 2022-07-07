import { useBlockProps, InspectorControls, BlockControls, RichText } from '@wordpress/block-editor'

const blockName = 'wp-block-my-extra-blocks-data-list-item'

export default props => {
  const {
    attributes: {
      title,
      description,
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
      <dt>
        <RichText
          tagName="span"
          value={title}
          onChange={value => {
            setAttributes({
              title: value
            })
          }}
          placeholder="Title"
        />
      </dt>
      <dd>
        <RichText
          tagName="span"
          value={description}
          onChange={value => {
            setAttributes({
              description: value
            })
          }}
          placeholder="Description"
        />
      </dd>
    </div>
  ]
}
