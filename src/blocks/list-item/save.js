import { useBlockProps, RichText } from '@wordpress/block-editor'
import { IconUi } from '../../components/icon'

const blockName = 'wp-block-my-extra-blocks-list-item'

export default props => {
  const {
    attributes: {
      content,
      icon,
      hasIcon,
    }
  } = props

  const blockProps = useBlockProps.save({
    className: `
    `,
    style: {
    }
  })

  return <li
    {...blockProps}
  >
    {(icon !== '' && hasIcon) &&
      <span className={`${blockName}__icon`}>
        <IconUi iconName={icon} />
      </span>
    }
    <RichText.Content
      className={`${blockName}__content`}
      tagName="span"
      value={content}
    />
  </li>
}
