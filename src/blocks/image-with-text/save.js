import { useBlockProps, InnerBlocks } from '@wordpress/block-editor'

const blockName = 'wp-block-my-extra-blocks-image-with-text'

export default props => {
  const {
    attributes: {
      imagePosition,
      alignment,
      innerAlignment,
      gap,
      breakpoint,
      imageHeightIsAdjustedText,
      minHeight,
      // Media
      mediaId,
      mediaUrl,
      // Frame
      frameWidth,
      frameIsAutoHeight,
      frameVerticalRatio,
      frameFit,
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
      // Margin
      marginTop,
      marginBottom,
    }
  } = props

  const blockProps = useBlockProps.save({
    className: `
      is-meb-breakpoint-${breakpoint}
      is-meb-image-position-${imagePosition}
      is-meb-alignment-${alignment}
      ${frameIsAutoHeight ? 'is-meb-frame-auto-height' : 'is-not-meb-frame-auto-height' }
      ${imageHeightIsAdjustedText ? 'is-meb-image-height-adjusted-text' : 'is-not-meb-image-height-adjusted-text'}
    `,
    style: {
      '--gap': `var(--meb-space-${gap})`,
      '--alignment': alignment,
      '--min-height': minHeight,
      '--inner-alignment': innerAlignment,
      '--frame-width': frameWidth,
      '--frame-fit': frameFit,
      '--frame-vertical-ratio': `${String(frameVerticalRatio)}%`,
      '--padding': padding.map(value => `var(--meb-space-${value})`).join(' '),
      '--bg-color': backgroundColor,
      '--color': textColor,
      '--border-color': borderColor,
      '--border-style': borderStyle,
      '--border-width': borderWidth.map(value => `var(--meb-border-width-${value})`).join(' '),
      '--border-radius': borderRadius.map(value => `var(--meb-border-radius-${value})`).join(' '),
      '--margin-top': `var(--meb-space-${marginTop})`,
      '--margin-bottom': `var(--meb-space-${marginBottom})`,
    }
  })

  return <div
    {...blockProps}
  >
    <div className={`${blockName}__container`}>
      <div className={`${blockName}__image-container`}>
        <span className={`${blockName}__image-frame`}>
          {mediaId === 0 &&
            <span className={`${blockName}__placeholder`}>
            </span>
          }
          {mediaId !== 0 &&
            <img
              className={`${blockName}__image`}
              src={mediaUrl}
              alt=""
            ></img>
          }
        </span>
      </div>
      <div className={`${blockName}__text-container`}>
        <div className={`${blockName}__text-container__inner`}>
          <InnerBlocks.Content />
        </div>
      </div>
    </div>
  </div>
}
