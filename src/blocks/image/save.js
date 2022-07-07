import { useBlockProps } from '@wordpress/block-editor'

const blockName = 'wp-block-my-extra-blocks-image'

export default props => {
  const {
    attributes: {
      mediaId,
      mediaUrl,
      alt,
      caption,
      mobileMediaId,
      mobileMediaUrl,
      breakpoint,
      alignment,
      // Frame
      frameWidth,
      frameIsAutoHeight,
      frameVerticalRatio,
      frameFit,
      // Border radius
      borderRadius,
      // Effect
      hasShadow,
      // Margin
      marginTop,
      marginBottom,
    }
  } = props

  const blockProps = useBlockProps.save({
    className: `
      is-meb-align-${alignment}
      ${frameIsAutoHeight ? 'is-meb-auto-height' : 'is-not-meb-auto-height'}
      ${hasShadow ? 'is-meb-has-shadow' : 'is-not-meb-has-shadow'}
    `,
    style: {
      '--width': frameWidth,
      '--fit': frameFit,
      '--vertical-ratio': `${String(frameVerticalRatio)}%`,
      '--border-radius': borderRadius.map(value => `var(--meb-border-radius-${value})`).join(' '),
      '--margin-top': `var(--meb-space-${marginTop})`,
      '--margin-bottom': `var(--meb-space-${marginBottom})`,
    }
  })

  return <figure {...blockProps}>
    <div className={`${blockName}__frame`}>
      {mobileMediaUrl &&
        <picture>
            <source
              media={`(min-width: ${breakpoint})`}
              srcSet={mediaUrl}
            />
          <img
            src={mobileMediaUrl}
            alt={alt}
          />
        </picture>
      }
      {!mobileMediaUrl &&
        <img
          src={mediaUrl}
          alt={alt}
        />
      }
    </div>
    {caption &&
      <figcaption className={`${blockName}__caption`}>
        {caption}
      </figcaption>
    }
  </figure>
}
