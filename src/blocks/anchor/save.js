import { useBlockProps } from '@wordpress/block-editor'

const blockName = 'wp-block-my-extra-blocks-anchor'

export default props => {
  const {
    attributes: {
      id,
    }
  } = props

  const blockProps = useBlockProps.save({
    id
  })

  return <span {...blockProps}></span>
}
