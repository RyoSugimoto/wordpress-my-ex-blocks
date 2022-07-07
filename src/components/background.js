import { SelectControl, __experimentalUnitControl as UnitControl } from "@wordpress/components"
import { Stack, Row, Spacer } from "./layout"
import { MediaSelectControl } from "./media"

const repeatOptions = [
  { value: 'repeat', label: 'Repeat' },
  { value: 'no-repeat', label: 'No repeat' },
]

const sizeOptions = [
  { value: 'auto', label: 'Auto' },
  { value: 'cover', label: 'Cover' },
  { value: 'contain', label: 'Contain' },
  { value: 'custom', label: 'Custom' },
]

const positionOptions = [
  { value: 'left top', label: 'Left-Top' },
  { value: 'left center', label: 'Left-Center' },
  { value: 'left bottom', label: 'Left-Bottom' },
  { value: 'center top', label: 'Center-Top' },
  { value: 'center center', label: 'Center-Center' },
  { value: 'center bottom', label: 'Center-Bottom' },
  { value: 'right top', label: 'Right-Top' },
  { value: 'right center', label: 'Right-Center' },
  { value: 'right bottom', label: 'Right-Bottom' },
]

export const BackgroundImageControls = props => {
  const {
    onChange,
    mediaId,
    mediaUrl,
    repeat,
    size,
    customSize,
    position,
  } = props

  const attributes = {
    mediaId,
    mediaUrl,
    repeat,
    size,
    customSize,
    position,
  }

  const onChangeHandler = (propName, value ) => {
    attributes[propName] = value
    onChange(attributes)
  }

  const onChangeHandlerObject = object => {
    onChange(Object.assign(attributes, object))
  }

  const hasProp = propName => props[propName] !== undefined

  return <Stack>
    <Row>
      <MediaSelectControl
        id={mediaId}
        url={mediaUrl}
        allowType={['image']}
        onChange={media => {
          if (!media) {
            onChangeHandlerObject({
              mediaId: 0,
              mediaUrl: ''
            })
          } else {
            onChangeHandlerObject({
              mediaId: media.id,
              mediaUrl: media.url
            })
          }
        }}
      />
    </Row>
    <Row>
      <SelectControl
        label="Background repeat"
        value={repeat}
        options={repeatOptions}
        onChange={value => {
          onChangeHandler('repeat', value)
        }}
      />
    </Row>
    <Row>
      <SelectControl
        label="Background size"
        value={size}
        options={sizeOptions}
        onChange={value => {
          onChangeHandler('size', value)
        }}
      />
    </Row>
    {(size === 'custom' && hasProp('customSize')) &&
      <Row>
        <UnitControl
          label="Custom size"
          value={customSize}
          onChange={value => {
            onChangeHandler('customSize', value)
          }}
        />
        <Spacer size="1rem" />
      </Row>
    }
    <Row>
      <SelectControl
        label="Background position"
        value={position}
        options={positionOptions}
        onChange={value => {
          onChangeHandler('position', value)
        }}
      />
    </Row>
  </Stack>
}
