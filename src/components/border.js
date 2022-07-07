import { RangeControl, SelectControl } from '@wordpress/components'
import { Stack, Row } from './layout'
import { ColorControl } from './color'

const borderStyleOptions = [
  { value: 'solid', label: 'Solid' },
  { value: 'dotted', label: 'Dotted' },
  { value: 'dashed', label: 'Dashed' },
  { value: 'double', label: 'Double' },
  { value: 'groove', label: 'Groove' },
  { value: 'ridge', label: 'Ridge' },
]

export const BorderWidthControl = props => {
  const {
    onChange,
    borderWidth
  } = props

  const onChangeHandler = value => {
    onChange(value)
  }

  const getWidth = (value, index) => {
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
            value={getWidth(borderWidth, index)}
            max={50} min={0} step={1}
            onChange={value => {
              let newArray = [0, 0, 0, 0]
              if (borderWidth instanceof Array) {
                newArray = borderWidth.concat()
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

export const BorderControls = props => {
  const {
    onChange,
    borderWidth,
    borderTop,
    borderRight,
    borderBottom,
    borderLeft,
    borderStyle,
    borderColor,
  } = props

  const attributes = {
    borderWidth,
    borderTop,
    borderRight,
    borderBottom,
    borderLeft,
    borderStyle,
    borderColor,
  }

  const hasProp = propName => props[propName] !== undefined

  const onChangeHandler = (propName, value) => {
    attributes[propName] = value
    onChange(attributes)
  }

  return <Stack>
    {hasProp('borderWidth') &&
      <Row title="Border width">
        <BorderWidthControl
          borderWidth={borderWidth}
          onChange={value => {
            onChangeHandler('borderWidth', value)
          }}
        />
      </Row>
    }
    {hasProp('borderStyle') &&
      <Row>
        <SelectControl
          label="Border style"
          value={borderStyle}
          options={borderStyleOptions}
          onChange={value => {
            onChangeHandler('borderStyle', value)
          }}
        />
      </Row>
    }
    {hasProp('borderColor') &&
      <Row title="Border color">
        <ColorControl
          color={borderColor}
          onChange={value => {
            onChangeHandler('borderColor', value)
          }}
        />
      </Row>
    }
  </Stack>
}

export const BorderRadiusControl = props => {
  const {
    onChange,
    borderRadius
  } = props

  const onChangeHandler = (propName, value) => {
    onChange({ [propName]: value })
  }

  const getRadius = (value, index) => {
    if (value instanceof Array) {
      return value.concat()[index]
    } else {
      return [0, 0, 0, 0]
    }
  }

  const labels = ['Top-Left', 'Top-Right', 'Bottom-Right', 'Bottom-Left']

  return <div style={{
    display: 'grid',
    gap: '.5rem 1rem',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gridTemplateRows: 'repeat(2, auto)',
  }}>
    {
      labels.map((label, index) => {
        const style = {}
        if (index === 2) {
          style.gridRow = '2/3'
          style.gridColumn = '2/3'
        }
        if (index === 3) {
          style.gridRow = '2/3'
          style.gridColumn = '1/2'
        }
        return <div style={style} key={index}>
          <RangeControl
            label={label}
            value={getRadius(borderRadius, index)}
            max={50} min={0} step={1}
            onChange={value => {
              let newArray = [0, 0, 0, 0]
              if (borderRadius instanceof Array) {
                newArray = borderRadius.concat()
              }
              newArray[index] = value
              onChangeHandler('borderRadius', newArray)
            }}
          />
        </div>
      })
    }
  </div>
}
