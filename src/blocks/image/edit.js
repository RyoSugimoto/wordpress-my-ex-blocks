import { useBlockProps, InspectorControls } from '@wordpress/block-editor'
import { PanelBody, SelectControl, __experimentalUnitControl as UnitControl, __experimentalRadio as Radio, __experimentalRadioGroup as RadioGroup, ToggleControl, TextareaControl } from '@wordpress/components'
import { Stack, Row } from '../../components/layout'
import { FrameControls } from '../../components/frame'
import { MediaSelectControl } from '../../components/media'
import { MarginControls } from '../../components/margin'
import { BorderRadiusControl } from '../../components/border'
import { EffectControls } from '../../components/effect'

const blockName = 'wp-block-my-extra-blocks-image'

const alignmentOptions = [
  { value: 'left', label: 'Left'},
  { value: 'center', label: 'Center'},
  { value: 'right', label: 'Right'},
]

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
    }, setAttributes, clientId
  } = props

  const blockProps = useBlockProps({
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

  const getInspectorControls = () => {
    return <InspectorControls key={`inspector-controls-${clientId}`}>
      <PanelBody title="Media" initialOpen={true}>
        <Stack>
          <Row>
            <MediaSelectControl
              id={mediaId}
              url={mediaUrl}
              onChange={media => {
                if (!media) {
                  setAttributes({
                    mediaId: 0,
                    mediaUrl: '',
                  })
                } else {
                  setAttributes({
                    mediaId: media.id,
                    mediaUrl: media.url,
                  })
                }
              }}
            />
          </Row>
          <Row>
            <FrameControls
              frameWidth={frameWidth}
              frameIsAutoHeight={frameIsAutoHeight}
              frameVerticalRatio={frameVerticalRatio}
              frameFit={frameFit}
              onChange={value => {
                setAttributes(value)
              }}
            />
          </Row>
          <Row>
            <SelectControl
              label="Alignment"
              value={alignment}
              options={alignmentOptions}
              onChange={value => {
                setAttributes({
                  alignment: value
                })
              }}
            />
          </Row>
          <Row>
            <TextareaControl
              label="Caption"
              rows={2}
              value={caption}
              onChange={value => {
                setAttributes({
                  caption: value
                })
              }}
            />
          </Row>
          <Row>
            <TextareaControl
              label="Alt"
              rows={2}
              value={alt}
              onChange={value => {
                setAttributes({
                  alt: value
                })
              }}
            />
          </Row>
        </Stack>
      </PanelBody>
      <PanelBody title="Mobile" initialOpen={false}>
        <Stack>
          <Row>
            <MediaSelectControl
              id={mobileMediaId}
              url={mobileMediaUrl}
              onChange={media => {
                if (!media) {
                  setAttributes({
                    mobileMediaId: 0,
                    mobileMediaUrl: '',
                  })
                } else {
                  setAttributes({
                    mobileMediaId: media.id,
                    mobileMediaUrl: media.url,
                  })
                }
              }}
            />
          </Row>
          <Row>
            <UnitControl
              label="Breakpoint"
              value={breakpoint}
              onChange={value => {
                setAttributes({
                  breakpoint: value
                })
              }}
            />
          </Row>
        </Stack>
      </PanelBody>
      <PanelBody title="Border radius" initialOpen={false}>
        <BorderRadiusControl
          borderRadius={borderRadius}
          onChange={value => {
            setAttributes(value)
          }}
        />
      </PanelBody>
      <PanelBody title="Effect" initialOpen={false}>
        <EffectControls
          hasShadow={hasShadow}
          onChange={value => {
            setAttributes(value)
          }}
        />
      </PanelBody>
      <PanelBody title="Margin" initialOpen={false}>
        <MarginControls
          marginTop={marginTop}
          marginBottom={marginBottom}
          onChange={value => {
            setAttributes(value)
          }}
        />
      </PanelBody>
    </InspectorControls>
  }

  return [
    getInspectorControls(),
    <figure
      {...blockProps}
      key={`block-${clientId}`}
    >
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
  ]
}
