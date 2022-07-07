import { useBlockProps, RichText } from '@wordpress/block-editor'

const blockName = 'wp-block-my-extra-blocks-data-list-item'

export default props => {
  const {
    attributes: {
      title,
      description,
    }
  } = props

  const blockProps = useBlockProps.save({
    //
  })

  return <div {...blockProps} >
    <dt>
      <RichText.Content
        value={title}
        tagName="span"
      />
    </dt>
    <dd>
      <RichText.Content
        value={description}
        tagName="span"
      />
    </dd>
  </div>
}
