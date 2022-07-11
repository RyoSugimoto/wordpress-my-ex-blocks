import { useState } from '@wordpress/element'
import { TextControl, Button } from '@wordpress/components'

export const PostList = props => {
  const {
    posts,
    checked,
    isMultiple,
    height,
    onChange,
  } = props

  const componentName = 'meb-component-post-list'

  const testValue = (value) => {
    if (checked instanceof Array) {
      return checked.indexOf(value) !== -1
    }
    return value === checked
  }

  const onChangeHandler = checkedId => {
    onChange(checkedId)
  }

  const addValue = value => {
    value = parseInt(value)
    let newValue
    if (isMultiple) {
      newValue = checked.concat()
      if (newValue.indexOf(value) !== -1) return newValue
      newValue.push(value)
      return newValue
    }
    return value
  }

  const removeValue = value => {
    value = parseInt(value)
    if (isMultiple) {
      return checked.filter(item => value !== item)
    }
    return 0
  }

  return <div className={componentName} style={{
    '--height': height || '16rem'
  }}>
    <ul className={`${componentName}__list`}>
      {posts.map((item, index) => {
        return <li
          key={index}
          className={`
            ${componentName}__item
            ${testValue(item.id) ? 'is-meb-checked' : 'is-not-meb-checked'}
          `}
        >
          <label className={`
            ${componentName}__label
            ${testValue(item.id) ? 'is-meb-checked' : 'is-not-meb-checked'}
          `}
          >
            <span className={`${componentName}__checker`}>
              <input
                type={isMultiple ? 'checkbox' : 'radio' }
                value={item.id}
                checked={testValue(item.id)}
                onChange={event => {
                  const isChecked = event.target.checked
                  let newValue

                  if (isChecked) {
                    newValue = addValue(item.id)
                  } else {
                    newValue = removeValue(item.id)
                  }

                  onChangeHandler(newValue)
                }}
              />
            </span>
            <span className={`${componentName}__id`}>{item.id}</span>
            <span className={`${componentName}__title`}>{item.title.rendered}</span>
          </label>
        </li>
      })}
    </ul>
  </div>
}

export const MultipleValuesControl = props => {
  const componentName = 'meb-component-multiple-values-control'

  const {
    onChange,
    label,
    tags,
  } = props

  const [field, setField] = useState('')

  const onChangeHandler = value => {
    if ( tags.join('') !== value.join('') ) {
      onChange(value)
    }
  }

  return <div className={`${componentName}`}>
    <div>{label}</div>
    <div className={`${componentName}__input`}>
      <span><TextControl
        label="New tag"
        hideLabelFromVision
        placeholder="Input a new tag name"
        value={field}
        onChange={value => {
          setField(value)
        }}
      /></span>
      <Button
        label="Add"
        variant="secondary"
        onClick={event => {
          const value = field.replace(/\s/g, '')
          if (tags.indexOf(value) !== -1) return
          const newTags = tags.concat()
          newTags.push(value)
          onChangeHandler(newTags)
        }}
      >Add</Button>
    </div>
    <ul className={`${componentName}__tag-list`}>
      {tags.map((tag, index) => {
        return <li
          key={index}
          className={`${componentName}__tag-item`}
        >
          <span>{tag}</span>
          <button
            aria-label="Remove"
            onClick={event => {
              const newTags = tags.filter(item => item !== tag)
              onChangeHandler(newTags)
            }}
          >-</button>
        </li>
      })}
    </ul>
  </div>
}

export const CheckListControl = props => {
  const {
    onChange,
    options,
    values,
  } = props

  const onChangeHandler = (values) => {
    onChange(values)
  }

  const hasValue = value => values.indexOf(value) !== -1

  const addValue = value => {
    let newValues = values.concat()
    if (newValues.indexOf(value) !== -1) return newValues
    newValues.push(value)
    return newValues
  }

  const removeValue = value => {
    let newValues = values.filter(item => value !== item)
    return newValues
  }

  return <ul>
    {options.map((item, index) => {
      return <li key={index}>
        <label>
          <input
            type="checkbox"
            checked={hasValue(item)}
            value={item}
            onChange={event => {
              let newValues = []
              if (event.target.checked) {
                newValues = addValue(item)
              } else {
                newValues = removeValue(item)
              }
              onChangeHandler(newValues)
            }}
          /> {item}
        </label>
      </li>
    })}
  </ul>
}
