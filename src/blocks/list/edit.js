import { useBlockProps, InspectorControls, BlockControls, InnerBlocks } from '@wordpress/block-editor'
import { resolveSelect, dispatch } from '@wordpress/data'
import { PanelBody, TextControl, SelectControl, RangeControl, __experimentalRadio as Radio, __experimentalRadioGroup as RadioGroup } from '@wordpress/components'
import { Stack, Row, Spacer } from '../../components/layout'
import { BorderControls, BorderRadiusControl } from '../../components/border'
import { PaddingControl } from '../../components/padding'
import { ColorSchemeControls, ColorControl } from '../../components/color'
import { TypographyControls } from '../../components/typography'
import { MarginControls } from '../../components/margin'
import { IconControl } from '../../components/icon'

const blockName = 'wp-block-my-extra-blocks-list'

const listMarkerOptions = [
  { value: 'disc', label: 'disc' },
  { value: 'circle', label: 'circle' },
  { value: 'square', label: 'square' },
  { value: 'decimal', label: 'decimal' },
  { value: 'georgian', label: 'georgian' },
  { value: 'trad-chinese-informal', label: 'trad-chinese-informal' },
  { value: 'kannada', label: 'kannada' },
  { value: 'custom', label: 'Custom' },
  { value: 'icon', label: 'Icon' },
]

export default props => {
  const {
    attributes: {
      itemGap,
      listType,
      listMarker,
      customMarker,
      icon,
      markerPosition,
      markerColor,
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
      // Typography
      fontFamily,
      fontSize,
      fontWeight,
      lineHeight,
      letterSpacing,
      isProportional,
      textAlign,
      // Margin
      marginTop,
      marginBottom,
    }, setAttributes, clientId
  } = props

  const blockProps = useBlockProps({
    className: `
      ${listMarker === 'custom' ? 'is-meb-custom-marker' : 'is-not-meb-custom-marker'}
      ${listMarker === 'icon' ? 'is-meb-icon-marker' : 'is-not-meb-icon-marker'}
      is-meb-marker-${markerPosition}
    `,
    style: {
      '--item-gap': `var(--meb-space-${itemGap})`,
      '--list-marker': listMarker,
      '--marker-position': markerPosition,
      '--custom-marker': `"${customMarker}"`,
      '--marker-color': markerColor,
      '--padding': padding.map(value => `var(--meb-space-${value})`).join(' '),
      '--bg-color': backgroundColor,
      '--color': textColor,
      '--border-color': borderColor,
      '--border-style': borderStyle,
      '--border-width': borderWidth.map(value => `var(--meb-border-width-${value})`).join(' '),
      '--border-radius': borderRadius.map(value => `var(--meb-border-radius-${value})`).join(' '),
      '--font-family': `var(--meb-font-${fontFamily})`,
      '--font-size': `var(--meb-font-size-${fontSize})`,
      '--font-weight': `var(--meb-font-weight-${fontWeight})`,
      '--font-feature': `var(--meb-font-feature-${isProportional ? 'proportional' : 'default'})`,
      '--text-align': textAlign,
      '--line-height': String(lineHeight),
      '--letter-spacing': `var(--meb-letter-spacing-${letterSpacing})`,
      '--margin-top': `var(--meb-space-${marginTop})`,
      '--margin-bottom': `var(--meb-space-${marginBottom})`,
    }
  })

  /**
   * Change an attribute of the children
   * @param {string} propName 
   * @param {any} value 
   */
  const updateChildren = (propName, value) => {
    if (typeof propName !== 'string' || value === undefined) {
      console.log('Error: ', 'List/updateChildren')
      return
    }
    const parent = resolveSelect('core/block-editor').getBlocksByClientId(clientId)
    parent
    .then(data => {
      const children = data[0].innerBlocks
      children.forEach(child => {
        dispatch('core/block-editor').updateBlockAttributes(child.clientId, {
          [propName]: value
        })
      })
    })
    .catch(error => {
      console.log('Error: ', 'List/updateChildren' ,error)
    })
  }

  const getInspectorControls = () => {
    return <InspectorControls key={`inspector-controls-${clientId}`}>
      <PanelBody title="List" initialOpen={true}>
        <Stack>
          <Row>
            <RangeControl
              label="Gap between items"
              value={itemGap}
              min={0} max={50} step={1}
              onChange={value => {
                setAttributes({
                  itemGap: value
                })
              }}
            />
          </Row>
          <Row title="List type">
            <RadioGroup
              label="List type"
              checked={listType}
              onChange={value => {
                setAttributes({
                  listType: value
                })
              }}
            >
              <Radio value="ul">Unordered</Radio>
              <Radio value="ol">Ordered</Radio>
            </RadioGroup>
            <Spacer size=".75rem" />
          </Row>
          <Row title="Marker position">
            <RadioGroup
              label="Marker position"
              checked={markerPosition}
              onChange={value => {
                setAttributes({
                  markerPosition: value
                })
              }}
            >
              <Radio value="inside">Inside</Radio>
              <Radio value="outside">Outside</Radio>
            </RadioGroup>
            <Spacer size=".75rem" />
          </Row>
          <Row>
            <SelectControl
              label="List marker"
              value={listMarker}
              options={listMarkerOptions}
              onChange={value => {
                updateChildren('hasIcon', value === 'icon')
                setAttributes({
                  listMarker: value
                })
              }}
            />
          </Row>
          {listMarker === 'icon' &&
            <Row>
              <IconControl
                icon={icon}
                onChange={value => {
                  updateChildren('icon', value)
                  setAttributes({
                    icon: value
                  })
                }}
              />
            </Row>
          }
          {listMarker === 'custom' &&
            <Row>
              <TextControl
                label="Custom marker"
                value={customMarker}
                onChange={value => {
                  setAttributes({
                    customMarker: value
                  })
                }}
                />
            </Row>
          }
          <Row title="Marker color">
            <ColorControl
              color={markerColor}
              onChange={value => {
                setAttributes({
                  markerColor: value
                })
              }}
            />
            <Spacer size=".75rem" />
          </Row>
        </Stack>
      </PanelBody>
      <PanelBody title="Padding" initialOpen={false}>
        <PaddingControl
          padding={padding}
          onChange={value => {
            setAttributes({
              padding: value
            })
          }}
        />
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
      <PanelBody title="Typography" initialOpen={false}>
        <TypographyControls
          fontFamily={fontFamily}
          fontSize={fontSize}
          fontWeight={fontWeight}
          lineHeight={lineHeight}
          letterSpacing={letterSpacing}
          isProportional={isProportional}
          textAlign={textAlign}
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
      {listType === 'ul' &&
        <ul className={`${blockName}__list`}>
          <InnerBlocks allowedBlocks={['my-extra-blocks/list-item']} />
        </ul>
      }
      {listType === 'ol' &&
        <ol className={`${blockName}__list`}>
          <InnerBlocks allowedBlocks={['my-extra-blocks/list-item']} />
        </ol>
      }
    </div>
  ]
}
