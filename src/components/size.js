import { Fragment } from '@wordpress/element'
import { ToggleControl, SelectControl, __experimentalUnitControl as UnitControl } from '@wordpress/components'
import { Stack, Row } from './layout'

const boxSizingOptions = [
  { value: 'border-box', label: 'Border' },
  { value: 'content-box', label: 'Content' },
]

const widthOptions = [
  { value: 'default', label: 'Default' },
  { value: 'xs', label: 'XS' },
  { value: 'sm', label: 'S' },
  { value: 'md', label: 'M' },
  { value: 'lg', label: 'L' },
  { value: 'xl', label: 'Xl' },
  { value: '2xl', label: '2Xl' },
  { value: 'custom', label: 'Custom' },
]

export const SizeControls = props => {
  const {
    onChange,
    boxSizing,
    width,
    customWidth,
    maxWidth,
    customMaxWidth,
    isCentered,
  } = props

  const hasProp = propName => props[propName] !== undefined

  const onChangeHandler = (propName, value) => {
    onChange({ [propName]: value })
  }

  return <Stack>
    {hasProp('boxSizing') &&
      <Row>
        <SelectControl
          label="Box sizing"
          value={boxSizing}
          options={boxSizingOptions}
          onChange={value => {
            onChangeHandler('boxSizing', value)
          }}
        />
      </Row>
    }
    {hasProp('width') &&
      <Fragment>
        <Row>
          <SelectControl
            label="Width"
            value={width}
            options={widthOptions}
            onChange={value => {
              onChangeHandler('width', value)
            }}
          />
        </Row>
        {width === 'custom' &&
          <Row>
            <UnitControl
              label="Custom width"
              value={customWidth}
              onChange={value => {
                onChangeHandler('customWidth', value)
              }}
              />
          </Row>
        }
      </Fragment>
    }
    {hasProp('maxWidth') &&
      <Fragment>
        <Row>
          <SelectControl
            label="Max width"
            value={maxWidth}
            options={widthOptions}
            onChange={value => {
              onChangeHandler('maxWidth', value)
            }}
          />
        </Row>
        {maxWidth === 'custom' &&
          <Row>
            <UnitControl
            label="Custom max width"
            value={customMaxWidth}
            onChange={value => {
              onChangeHandler('customMaxWidth', value)
            }}
            />
          </Row>
        }
      </Fragment>
    }
    {hasProp('isCentered') &&
      <Row>
        <ToggleControl
          label="Centered"
          checked={isCentered}
          onChange={value => {
            onChangeHandler('isCentered', value)
          }}
        />
      </Row>
    }
  </Stack>
}
