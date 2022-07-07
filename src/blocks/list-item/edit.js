import { useBlockProps, InspectorControls, BlockControls, RichText } from '@wordpress/block-editor'
import { PanelBody } from '@wordpress/components'
import { ColorSchemeControls } from '../../components/color'
import { IconUi } from '../../components/icon'

const blockName = 'wp-block-my-extra-blocks-list-item'

export default props => {
  const {
    attributes: {
      content,
      icon,
      hasIcon,
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
    <li
      {...blockProps}
      key={`block-${clientId}`}
    >
      {(icon !== '' && hasIcon) &&
        <span className={`${blockName}__icon`}>
          <IconUi iconName={icon} />
        </span>
      }
      <RichText
        className={`${blockName}__content`}
        tagName="span"
        value={content}
        placeholder="Write text..."
        onChange={value => {
          setAttributes({
            content: value
          })
        }}
      />
    </li>
  ]
}
