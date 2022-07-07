import { __experimentalUnitControl as UnitControl, ToggleControl, SelectControl, RangeControl } from '@wordpress/components'
import { Stack, Row } from './layout.js'

export const FrameControls = props => {
  const {
    onChange,
    frameWidth,
    frameIsAutoHeight,
    frameVerticalRatio,
    frameFit,
  } = props

  const attributes = {
    frameWidth,
    frameIsAutoHeight,
    frameVerticalRatio,
    frameFit,
  }

  const hasProp = propName => props[propName] !== undefined

  const onChangeHandler = (propName, value) => {
    attributes[propName] = value
    onChange(attributes)
  }

  return <Stack>
    {hasProp('frameWidth') &&
      <Row>
        <UnitControl
          label="Width"
          value={frameWidth}
          units={[
            { value: '%', label: '%', default: 100 },
            { value: 'rem', label: 'rem', default: 15 },
            { value: 'em', label: 'em', default: 15 },
            { value: 'px', label: 'px', default: 240 },
          ]}
          onChange={value => {
            onChangeHandler('frameWidth', value)
          }}
        />
      </Row>
    }
    {hasProp('frameIsAutoHeight') &&
      <Row>
        <ToggleControl
          label="Use auto height"
          checked={frameIsAutoHeight}
          onChange={value => {
            onChangeHandler('frameIsAutoHeight', value)
          }}
        />
      </Row>
    }
    {hasProp('frameVerticalRatio') &&
      <Row>
        <RangeControl
          label="Vertical ratio(%)"
          min={1} max={200} step={1}
          value={frameVerticalRatio}
          onChange={value => {
            onChangeHandler('frameVerticalRatio', value)
          }}
        />
      </Row>
    }
    {hasProp('frameFit') &&
      <Row>
        <SelectControl
          label="Fit"
          options={[
            { value: 'cover', label: 'Cover' },
            { value: 'contain', label: 'Contain' },
            { value: 'scale-down', label: 'Scale down' },
            { value: 'fill', label: 'Fill' },
            { value: 'none', label: 'None' },
          ]}
          value={frameFit}
          onChange={value => {
            onChangeHandler('frameFit', value)
          }}
        />
      </Row>
    }
  </Stack>
}
