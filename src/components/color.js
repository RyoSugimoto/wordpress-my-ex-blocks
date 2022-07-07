import { Fragment, useState } from '@wordpress/element'
import { SelectControl, Button, ColorPicker, __experimentalFlyout as Flyout } from '@wordpress/components'
import { Stack, Row, Spacer } from './layout'

const ColorSchemePresetOptions = [
  { value: 'default', label: 'Default' },
  { value: 'primary', label: 'Primary' },
  { value: 'secondary', label: 'Secondary' },
  { value: 'strong', label: 'Strong' },
  { value: 'emphasis', label: 'Emphasis' },
  { value: 'inverse', label: 'Inverse' },
  { value: 'custom', label: 'Custom' },
]

const ColorPreview = props => {
  const {
    color
  } = props

  return <span
    style={{
      background: color,
      borderRadius: '1em',
      display: 'inline-block',
      height: '1.25em',
      width: '1.25em',
      border: '1px solid #000',
      margin: '0 .5em 0 0',
    }}
  >
  </span>
}

export const ColorControl = props => {
  const {
    onChange,
    label,
    color,
  } = props
  const [colorValue, setColorValue] = useState(color || '')
  return <div>
    {label &&
      <div style={{ fontSize: '85%', marginBottom: '.5rem' }}>{label}</div>
    }
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Flyout
        maxWidth="216px"
        placement="left"
        trigger={
          <Button variant="link" style={{ marginRight: '.25rem' }}>
            <ColorPreview color={colorValue} />
          </Button>
        }
      >
        <ColorPicker
          enableAlpha={true}
          color={color}
          onChange={newValue => {
            newValue = newValue !== undefined ? newValue : 'transparent'
            setColorValue(newValue)
            onChange(newValue)
          }}
        />
      </Flyout>
      <input
        type="text"
        aria-label={label}
        value={color}
        onChange={event => {
          const newValue = event.target.value !== undefined ? event.target.value : 'transparent'
          setColorValue(newValue)
          onChange(newValue)
        }}
      />
    </div>
  </div>
}

export const ColorSchemeControls = props => {
  const {
    onChange,
    background,
    text,
    border,
  } = props

  const [backgroundValue, setBackgroundValue] = useState(background)
  const [textValue, setTextValue] = useState(text)
  const [borderValue, setBorderValue] = useState(border)

  const onChangeHandler = (propName, value) => {
    const attributes = {
      background,
      text,
      border,
    }
    attributes[propName] = value
    onChange(attributes)
  }

  return <Fragment>
    <Stack>
      {background &&
        <Row>
          <ColorControl
            label="Background"
            color={backgroundValue}
            onChange={value => {
              const newValue = value ? value : 'transparent'
              setBackgroundValue(value)
              onChangeHandler('background', newValue)
            }}
          />
        </Row>
      }
      {text &&
        <Row>
          <ColorControl
            label="Text"
            color={textValue}
            onChange={value => {
              const newValue = value ? value : 'inherit'
              setTextValue(value)
              onChangeHandler('text', newValue)
            }}
          />
        </Row>
      }
      {border &&
        <Row>
          <ColorControl
            label="Border"
            color={borderValue}
            onChange={value => {
              const newValue = value ? value : 'transparent'
              setBorderValue(value)
              onChangeHandler('border', newValue)
            }}
          />
        </Row>
      }
    </Stack>
    <Spacer size="1rem" />
  </Fragment>
}

export const ColorSchemeSelector = props => {
  const {
    onChange,
    preset,
    background,
    text,
    border
  } = props

  const hasProp = propName => props[propName] !== undefined

  const onChangeHandler = (propName, value) => {
    const attributes = {
      preset,
      background,
      text,
      border
    }
    attributes[propName] = value
    onChange(attributes)
  }

  const onChangeHandlerObject = object => {
    const attributes = {
      preset,
      background,
      text,
      border
    }
    onChange(Object.assign(attributes, object))
  }

  return <Fragment>
    <SelectControl
      label="Color scheme preset"
      value={preset}
      options={ColorSchemePresetOptions}
      onChange={value => {
        onChangeHandler('preset', value)
      }}
    />
    {
      (hasProp('background') || hasProp('text') || hasProp('border')) && preset === 'custom' &&
      <Fragment>
        <ColorSchemeControls
          background={background}
          text={text}
          border={border}
          onChange={value => {
            onChangeHandlerObject(value)
          }}
        />
      </Fragment>
    }
  </Fragment>
}
