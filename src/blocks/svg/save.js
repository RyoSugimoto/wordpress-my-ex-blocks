import { useBlockProps, InnerBlocks } from '@wordpress/block-editor'
import { SandBox } from '@wordpress/components'

const blockName = 'wp-block-my-extra-blocks-svg'

export default props => {
  const {
    attributes: {
      code,
      // Size
      boxSizing,
      maxWidth,
      customMaxWidth,
      isCentered,
      // Color scheme
      backgroundColor,
      textColor,
      // Margin
      marginTop,
      marginBottom,
    }
  } = props

  const blockProps = useBlockProps.save({
    className: `
      is-meb-max-width-${maxWidth}
      ${isCentered ? 'is-meb-centered' : 'is-not-meb-centered'}
    `,
    style: {
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

  return <div {...blockProps}>
    {isSvg(code) &&
      <span
        dangerouslySetInnerHTML={{__html: code}}
        className={`${blockName}__frame`}
      ></span>
    }
  </div>
}
