import { RangeControl } from '@wordpress/components'
import { Stack, Row } from './layout'

export const MarginControls = props => {
  const {
    onChange,
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
  } = props

  const hasProp = propName => props[propName] !== undefined

  const onChangeHandler = (propName, value) => {
    onChange({ [propName]: value })
  }

  return <Stack>
    {hasProp('marginTop') &&
      <Row>
        <RangeControl
          label="Margin top"
          value={marginTop}
          min={0} max={100} step={1}
          onChange={value => {
            onChangeHandler('marginTop', value)
          }}
        />
      </Row>
    }
    {hasProp('marginRight') &&
      <Row>
        <RangeControl
          label="Margin right"
          value={marginRight}
          min={0} max={100} step={1}
          onChange={value => {
            onChangeHandler('marginRight', value)
          }}
        />
      </Row>
    }
    {hasProp('marginBottom') &&
      <Row>
        <RangeControl
          label="Margin bottom"
          value={marginBottom}
          min={0} max={100} step={1}
          onChange={value => {
            onChangeHandler('marginBottom', value)
          }}
        />
      </Row>
    }
    {hasProp('marginLeft') &&
      <Row>
        <RangeControl
          label="Margin left"
          value={marginLeft}
          min={0} max={100} step={1}
          onChange={value => {
            onChangeHandler('marginLeft', value)
          }}
        />
      </Row>
    }
  </Stack>
}
