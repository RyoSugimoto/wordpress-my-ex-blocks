import { TextControl, ToggleControl, __experimentalRadio as Radio,
  __experimentalRadioGroup as RadioGroup } from '@wordpress/components'
import { Stack, Row, Spacer } from './layout'
import { IconControl, IconUi } from './icon'
import { ColorSchemeSelector } from './color'
import { EffectControls } from './effect'

export const ButtonControls = props => {
  const {
    onChange,
    text,
    href,
    isExternal,
    iconBefore,
    iconAfter,
    style,
    shape,
    size,
    display,
    colorPreset,
    backgroundColor,
    textColor,
    borderColor,
    gradient,
    hasShadow,
  } = props

  const onChangeHandler = (propName, value) => {
    onChange({ [propName]: value })
  }

  const onChangeHandlerObject = object => {
    onChange(object)
  }

  const hasProp = propName => props[propName] !== undefined

  return <Stack>
    {hasProp('text') &&
      <Row>
        <TextControl
          label="Text"
          value={text}
          onChange={value => {
            onChangeHandler('text', value)
          }}
        />
      </Row>
    }
    {hasProp('href') &&
      <Row>
        <TextControl
          label="Link URL"
          value={href}
          onChange={value => {
            onChangeHandler('href', value)
          }}
        />
      </Row>
    }
    {hasProp('isExternal') &&
      <Row>
        <ToggleControl
          label="Open in new tab"
          checked={isExternal}
          onChange={value => {
            onChangeHandler('isExternal', value)
          }}
        />
      </Row>
    }
    {hasProp('iconBefore') &&
      <Row>
        <IconControl
          label="Icon before"
          icon={iconBefore}
          onChange={value => {
            onChangeHandler('iconBefore', value)
          }}
        />
      </Row>
    }
    {hasProp('iconAfter') &&
      <Row>
        <IconControl
          label="Icon after"
          icon={iconAfter}
          onChange={value => {
            onChangeHandler('iconAfter', value)
          }}
        />
      </Row>
    }
    {hasProp('colorPreset') &&
      <Row>
        <ColorSchemeSelector
          preset={colorPreset}
          background={backgroundColor}
          text={textColor}
          border={borderColor}
          onChange={value => {
            onChangeHandlerObject({
              colorPreset: value.preset,
              backgroundColor: value.background,
              textColor: value.text,
              borderColor: value.border
            })
          }}
        />
      </Row>
    }
    {hasProp('style') &&
      <Row title="Style">
        <RadioGroup
          defaultChecked="filled"
          checked={style}
          onChange={value => {
            onChangeHandler('style', value)
          }}
        >
          <Radio value="filled">Filled</Radio>
          <Radio value="thick">Thick</Radio>
          <Radio value="outline">Outline</Radio>
        </RadioGroup>
      </Row>
    }
    {hasProp('shape') &&
      <Row title="Shape">
        <RadioGroup
          defaultChecked="square"
          checked={shape}
          onChange={value => {
            onChangeHandler('shape', value)
          }}
        >
          <Radio value="square">Square</Radio>
          <Radio value="rounded">Rounded</Radio>
          <Radio value="pill">Pill</Radio>
        </RadioGroup>
      </Row>
    }
    {hasProp('size') &&
      <Row title="Size">
        <RadioGroup
          defaultChecked="sm"
          checked={size}
          onChange={value => {
            onChangeHandler('size', value)
          }}
        >
          <Radio value="xs">XS</Radio>
          <Radio value="sm">S</Radio>
          <Radio value="md">M</Radio>
          <Radio value="lg">L</Radio>
          <Radio value="xl">XL</Radio>
        </RadioGroup>
      </Row>
    }
    {hasProp('display') &&
      <Row title="Display">
        <RadioGroup
          defaultChecked="block"
          checked={display}
          onChange={value => {
            onChangeHandler('display', value)
          }}
        >
          <Radio value="block">Block</Radio>
          <Radio value="inline">Inline</Radio>
        </RadioGroup>
        <Spacer size="1rem" />
      </Row>
    }
    {(hasProp('gradient') || hasProp('hasShadow')) &&
      <Row title="Effects">
        <EffectControls
          gradient={gradient}
          hasShadow={hasShadow}
          onChange={value => {
            onChangeHandlerObject(value)
          }}
        />
      </Row>
    }
  </Stack>
}

export const ButtonUi = props => {
  const {
    blockProps,
    blockName,
    text,
    iconBefore,
    iconAfter,
  } = props

  blockProps.className += ' meb-component-button-ui '

  return <a
    {...blockProps}
  >
    <span className={`${blockName}__stack`}>
      {iconBefore &&
        <span className={`${blockName}__icon-before`}>
          <IconUi iconName={iconBefore} />
        </span>
      }
      <span className={`${blockName}__text`}>{text}</span>
      {iconAfter &&
        <span className={`${blockName}__icon-after`}>
          <IconUi iconName={iconAfter} />
        </span>
      }
    </span>
  </a>
}
