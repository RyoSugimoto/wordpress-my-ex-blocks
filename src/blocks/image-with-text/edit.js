import { useBlockProps, InspectorControls, BlockControls, InnerBlocks } from '@wordpress/block-editor'
import { PanelBody, SelectControl, RangeControl, ToggleControl, __experimentalUnitControl as UnitControl, __experimentalRadio as Radio, __experimentalRadioGroup as RadioGroup } from '@wordpress/components'
import { Stack, Row, Spacer } from '../../components/layout'
import { BorderControls, BorderRadiusControl } from '../../components/border'
import { FrameControls } from '../../components/frame'
import { MediaSelectControl } from '../../components/media'
import { PaddingControl } from '../../components/padding'
import { ColorSchemeControls } from '../../components/color'
import { MarginControls } from '../../components/margin'

const blockName = 'wp-block-my-extra-blocks-image-with-text'

const breakpointOptions = [
  { label: 'XS', value: 'xs' },
  { label: 'S', value: 'sm' },
  { label: 'M', value: 'md' },
  { label: 'L', value: 'lg' },
  { label: 'XL', value: 'xl' },
  { label: '2XL', value: '2xl' },
  { label: 'No break', value: 'no-break' },
]

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
    }, setAttributes, clientId
  } = props

  const blockProps = useBlockProps({
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

  const getInspectorControls = () => {
    return <InspectorControls key={`inspector-controls-${clientId}`}>
      <PanelBody title="Basic settings" initialOpen={true}>
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
          <Row title="Image position">
            <RadioGroup
              label="Image position"
              checked={imagePosition}
              onChange={value => {
                setAttributes({
                  imagePosition: value
                })
              }}
            >
              <Radio value="left">Left</Radio>
              <Radio value="right">Right</Radio>
            </RadioGroup>
          </Row>
          <Row title="Alignment">
            <RadioGroup
              label="Alignment"
              checked={alignment}
              onChange={value => {
                setAttributes({
                  alignment: value
                })
              }}
            >
              <Radio value="center">Center</Radio>
              <Radio value="flex-start">Top</Radio>
              <Radio value="flex-end">Bottom</Radio>
              <Radio value="stretch">Str</Radio>
            </RadioGroup>
          </Row>
          <Row title="Inner alignment">
            <RadioGroup
              label="Inner alignment"
              checked={innerAlignment}
              onChange={value => {
                setAttributes({
                  innerAlignment: value
                })
              }}
            >
              <Radio value="center">Center</Radio>
              <Radio value="flex-start">Top</Radio>
              <Radio value="flex-end">Bottom</Radio>
            </RadioGroup>
            <Spacer size=".5rem" />
          </Row>
          <Row>
            <UnitControl
              label="Text min height"
              value={minHeight}
              onChange={value => {
                setAttributes({
                  minHeight: value
                })
              }}
            />
          </Row>
          <Row>
            <ToggleControl
              label="Adjust image height to text"
              checked={imageHeightIsAdjustedText}
              onChange={value => {
                setAttributes({ 
                  imageHeightIsAdjustedText: value
                })
              }}
            />
          </Row>
          <Row>
            <RangeControl
              label="Gap"
              value={gap}
              min={0} max={50} step={1}
              onChange={value => {
                setAttributes({
                  gap: value
                })
              }}
            />
          </Row>
          <Row>
            <SelectControl
              label="Breakpoint"
              value={breakpoint}
              options={breakpointOptions}
              onChange={value => {
                setAttributes({
                  breakpoint: value
                })
              }}
            />
          </Row>
        </Stack>
      </PanelBody>
      <PanelBody title="Image frame" initialOpen={true}>
        <Stack>
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
        </Stack>
      </PanelBody>
      <PanelBody title="Padding" initialOpen={false}>
        <Stack>
          <Row>
            <PaddingControl
              padding={padding}
              onChange={value => {
                setAttributes({
                  padding: value
                })
              }}
            />
          </Row>
        </Stack>
      </PanelBody>
      <PanelBody title="Color" initialOpen={false}>
        <ColorSchemeControls
          background={backgroundColor}
          text={textColor}
          onChange={value => {
            setAttributes({
              backgroundColor: value.background,
              textColor: value.text
            })
          }}
        />
      </PanelBody>
      <PanelBody title="Border" initialOpen={false}>
        <Stack>
          <Row title="Border radius">
            <BorderRadiusControl
              borderRadius={borderRadius}
              onChange={value => {
                setAttributes(value)
              }}
            />
          </Row>
          <Row title="Border">
            <BorderControls
              borderWidth={borderWidth}
              borderStyle={borderStyle}
              borderColor={borderColor}
              onChange={value => {
                setAttributes(value)
              }}
            />
          </Row>
        </Stack>
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
            <InnerBlocks
              template={[
                ['my-extra-blocks/rich-text', {}],
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  ]
}
