import { RangeControl, SelectControl, __experimentalUnitControl as UnitControl } from '@wordpress/components'
import { Stack, Row } from './layout'

const positionOptions = [
  { value: 'static', label: 'Static' },
  { value: 'relative', label: 'Relative' },
  { value: 'absolute', label: 'Absolute' },
  { value: 'fixed', label: 'Fixed' },
]

export const PositionControls = props => {
  const {
    onChange,
    position,
    inset,
    zIndex,
  } = props

  const attributes = {
    position,
    inset,
    zIndex,
  }

  const hasProp = propName => props[propName] !== undefined

  const onChangeHandler = (propName, value) => {
    attributes[propName] = value
    onChange(attributes)
  }

  const getInset = (value, index) => {
    if (value instanceof Array) {
      return value.concat()[index]
    } else {
      return ['auto', 'auto', 'auto', 'auto']
    }
  }

  const labels = ['Top', 'Right', 'Bottom', 'Left']

  return <Stack>
    {hasProp('position') &&
      <Row>
        <SelectControl
          label="Position"
          value={position}
          options={positionOptions}
          onChange={value => {
            onChangeHandler('position', value)
          }}
        />
      </Row>
    }
    {hasProp('inset') && <div style={{
        display: 'grid',
        gap: '.5rem .5rem',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gridTemplateRows: 'repeat(3, auto)',
      }}>
        {labels.map((label, index) => {
          const style = {}
          if (index === 0) {
            style.gridRow = '1/2'
            style.gridColumn = '2/4'
          }
          if (index === 3) {
            style.gridRow = '2/3'
            style.gridColumn = '1/3'
          }
          if (index === 1) {
            style.gridRow = '2/3'
            style.gridColumn = '3/5'
          }
          if (index === 2) {
            style.gridRow = '3/4'
            style.gridColumn = '2/4'
          }
          return <div style={style} key={index}>
            <UnitControl
              label={label}
              value={getInset(inset, index)}
              onChange={value => {
                value = value === '' ? 'auto' : value
                let newArray = ['auto', 'auto', 'auto', 'auto']
                if (inset instanceof Array) {
                  newArray = inset.concat()
                }
                newArray[index] = value
                onChangeHandler('inset', newArray)
              }}
            />
          </div>
        })}
      </div>
    }
    {hasProp('zIndex') &&
      <Row>
        <RangeControl
          label="Z index"
          value={zIndex}
          min={-100} max={1000} step={10}
          onChange={value => {
            onChangeHandler('zIndex', value)
          }}
        />
      </Row>
    }
  </Stack>
}
