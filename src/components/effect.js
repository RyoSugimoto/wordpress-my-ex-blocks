import { ToggleControl, GradientPicker } from '@wordpress/components'
import { Stack, Row } from './layout'

export const EffectControls = props => {
  const {
    onChange,
    gradient,
    hasShadow,
  } = props

  const attributes = {
    gradient,
    hasShadow,
  }

  const hasProp = propName => props[propName] !== undefined

  const onChangeHandler = (propName, value) => {
    attributes[propName] = value
    onChange(attributes)
  }

  return <Stack>
    {hasProp('gradient') &&
      <Row title="Gradation overlay">
        <input
          type="text"
          aria-label="Gradation overlay"
          value={gradient}
          style={{ width: '100%' }}
          onChange={event => {
            onChangeHandler('gradient', event.target.value)
          }}
        />
        <GradientPicker
          value={gradient}
          onChange={value => {
            onChangeHandler('gradient', value)
          }}
        />
      </Row>
    }
    {hasProp('hasShadow') &&
      <Row title="Drop shadow">
        <ToggleControl
          label="Add shadow"
          checked={hasShadow}
          onChange={value => {
            onChangeHandler('hasShadow', value)
          }}
        />
      </Row>
    }
  </Stack>
}
