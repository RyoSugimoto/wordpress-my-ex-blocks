import { Fragment } from '@wordpress/element'
import { ToggleControl, SelectControl, RangeControl, __experimentalRadio as Radio, __experimentalRadioGroup as RadioGroup } from '@wordpress/components'
import { Stack, Row } from './layout'

const fontFamilyOptions = [
  { value: 'inherit', label: 'Inherit' },
  { value: 'sans', label: 'Sans serif' },
  { value: 'serif', label: 'Serif' },
  { value: 'display', label: 'Display' },
  { value: 'cursive', label: 'Cursive' },
  { value: 'jp-gothic', label: 'JP Gothic' },
  { value: 'jp-mincho', label: 'JP Mincho' },
]

const textAlignOptions = [
  { value: 'inherit', label: 'Inherit' },
  { value: 'left', label: 'Left' },
  { value: 'center', label: 'Center' },
  { value: 'right', label: 'Right' },
  { value: 'justify', label: 'Justify' },
]

export const TypographyControls = props => {
  const {
    onChange,
    fontFamily,
    fontSize,
    fontWeight,
    lineHeight,
    letterSpacing,
    isProportional,
    textAlign,
  } = props

  const hasProp = propName => props[propName] !== undefined

  const onChangeHandler = (propName, value) => {
    onChange({ [propName]: value })
  }

  return <Fragment>
    <Stack>
      {hasProp('fontFamily') &&
        <Row>
          <SelectControl
            label="Font family"
            value={fontFamily}
            options={fontFamilyOptions}
            onChange={value => {
              onChangeHandler('fontFamily', value)
            }}
          />
        </Row>
      }
      {hasProp('fontSize') &&
        <Row>
          <RangeControl
            label="Font size"
            value={fontSize}
            min={0} max={64} step={1}
            onChange={value => {
              onChangeHandler('fontSize', value)
            }}
          />
        </Row>
      }
      {hasProp('fontWeight') &&
        <Row title="Font weight">
          <RadioGroup
            label="Font weight"
            checked={fontWeight}
            onChange={value => {
              onChangeHandler('fontWeight', value)
            }}
            style={{ marginBottom: '.5rem' }}
          >
            <Radio value="light">Light</Radio>
            <Radio value="normal">Normal</Radio>
            <Radio value="bold">Bold</Radio>
          </RadioGroup>
        </Row>
      }
      {hasProp('lineHeight') &&
        <Row>
          <RangeControl
            label="Line height"
            value={lineHeight}
            min={0} max={3} step={0.125}
            onChange={value => {
              onChangeHandler('lineHeight', value)
            }}
          />
        </Row>
      }
      {hasProp('letterSpacing') &&
        <Row>
          <RangeControl
            label="Letter spacing"
            value={letterSpacing}
            min={-500} max={1000} step={50}
            onChange={value => {
              onChangeHandler('letterSpacing', value)
            }}
          />
        </Row>
      }
      {hasProp('isProportional') &&
        <Row>
          <ToggleControl
            label="Proportional"
            checked={isProportional}
            onChange={value => {
              onChangeHandler('isProportional', value)
            }}
          />
        </Row>
      }
      {hasProp('textAlign') &&
        <Row>
          <SelectControl
            label="Text align"
            value={textAlign}
            options={textAlignOptions}
            onChange={value => {
              onChangeHandler('textAlign', value)
            }}
          />
        </Row>
      }
    </Stack>
  </Fragment>
}
