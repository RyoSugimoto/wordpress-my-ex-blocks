import { RangeControl } from '@wordpress/components'
import { Stack, Row } from './layout'

export const PaddingControl = props => {
  const {
    onChange,
    padding,
  } = props

  const onChangeHandler = value => {
    onChange(value)
  }

  const getPadding = (value, index) => {
    if (value instanceof Array) {
      return value.concat()[index]
    } else {
      return [0, 0, 0, 0]
    }
  }

  const labels = ['Top', 'Right', 'Bottom', 'Left']

  return <div style={{
    display: 'grid',
    gap: '0 1rem',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gridTemplateRows: 'repeat(3, auto)',
  }}>
    {
      labels.map((label, index) => {
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
          <RangeControl
            label={label}
            value={getPadding(padding, index)}
            max={150} min={0} step={1}
            onChange={value => {
              let newArray = [0, 0, 0, 0]
              if (padding instanceof Array) {
                newArray = padding.concat()
              }
              newArray[index] = value
              onChangeHandler(newArray)
            }}
          />
        </div>
      })
    }
  </div>
}

export const PaddingControls = props => {
  const {
    onChange,
    paddingTop,
    paddingRight,
    paddingBottom,
    paddingLeft,
  } = props

  const hasProp = propName => props[propName] !== undefined

  const onChangeHandler = (propName, value) => {
    onChange({ [propName]: value })
  }

  return <Stack>
    {hasProp('paddingTop') &&
      <Row>
        <RangeControl
          label="Padding top"
          value={paddingTop}
          min={0} max={100} step={1}
          onChange={value => {
            onChangeHandler('paddingTop', value)
          }}
        />
      </Row>
    }
    {hasProp('paddingRight') &&
      <Row>
        <RangeControl
          label="Padding right"
          value={paddingRight}
          min={0} max={100} step={1}
          onChange={value => {
            onChangeHandler('paddingRight', value)
          }}
        />
      </Row>
    }
    {hasProp('paddingBottom') &&
      <Row>
        <RangeControl
          label="Padding bottom"
          value={paddingBottom}
          min={0} max={100} step={1}
          onChange={value => {
            onChangeHandler('paddingBottom', value)
          }}
        />
      </Row>
    }
    {hasProp('paddingLeft') &&
      <Row>
        <RangeControl
          label="Padding left"
          value={paddingLeft}
          min={0} max={100} step={1}
          onChange={value => {
            onChangeHandler('paddingLeft', value)
          }}
        />
      </Row>
    }
  </Stack>
}
