import { SelectControl } from '@wordpress/components'

export const icons = [
  {
    name: 'arrow-up',
    content: <svg width="44" height="44" viewBox="0 0 24 24">
    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="18" y1="11" x2="12" y2="5" />
    <line x1="6" y1="11" x2="12" y2="5" />
  </svg>
  },
  {
    name: 'arrow-right',
    content: <svg width="44" height="44" viewBox="0 0 24 24">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <line x1="5" y1="12" x2="19" y2="12" />
      <line x1="13" y1="18" x2="19" y2="12" />
      <line x1="13" y1="6" x2="19" y2="12" />
    </svg>
  },
  {
    name: 'arrow-down',
    content: <svg width="44" height="44" viewBox="0 0 24 24">
    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="18" y1="13" x2="12" y2="19" />
    <line x1="6" y1="13" x2="12" y2="19" />
  </svg>
  },
  {
    name: 'arrow-left',
    content: <svg width="44" height="44" viewBox="0 0 24 24">
    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
    <line x1="5" y1="12" x2="19" y2="12" />
    <line x1="5" y1="12" x2="11" y2="18" />
    <line x1="5" y1="12" x2="11" y2="6" />
  </svg>
  },
  {
    name: 'chevron-up',
    content: <svg width="44" height="44" viewBox="0 0 24 24">
    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
    <polyline points="6 15 12 9 18 15" />
  </svg>
  },
  {
    name: 'chevron-right',
    content: <svg width="44" height="44" viewBox="0 0 24 24">
    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
    <polyline points="9 6 15 12 9 18" />
  </svg>
  },
  {
    name: 'chevron-down',
    content: <svg width="44" height="44" viewBox="0 0 24 24">
    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
    <polyline points="6 9 12 15 18 9" />
  </svg>
  },
  {
    name: 'chevron-left',
    content: <svg width="44" height="44" viewBox="0 0 24 24">
    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
    <polyline points="15 6 9 12 15 18" />
  </svg>
  },
  {
    name: 'check',
    content: <svg width="44" height="44" viewBox="0 0 24 24">
    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
    <path d="M5 12l5 5l10 -10" />
  </svg>
  },
  {
    name: 'circle-check',
    content: <svg width="44" height="44" viewBox="0 0 24 24">
    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
    <circle cx="12" cy="12" r="9" />
    <path d="M9 12l2 2l4 -4" />
  </svg>
  },
  {
    name: 'square-check',
    content: <svg width="44" height="44" viewBox="0 0 24 24">
    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
    <rect x="4" y="4" width="16" height="16" rx="2" />
    <path d="M9 12l2 2l4 -4" />
  </svg>
  },
  {
    name: 'zoom-in',
    content: <svg width="44" height="44" viewBox="0 0 24 24">
    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
    <circle cx="10" cy="10" r="7" />
    <line x1="7" y1="10" x2="13" y2="10" />
    <line x1="10" y1="7" x2="10" y2="13" />
    <line x1="21" y1="21" x2="15" y2="15" />
  </svg>
  },
  {
    name: 'zoom-out',
    content: <svg width="44" height="44" viewBox="0 0 24 24">
    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
    <circle cx="10" cy="10" r="7" />
    <line x1="7" y1="10" x2="13" y2="10" />
    <line x1="21" y1="21" x2="15" y2="15" />
  </svg>
  },
  {
    name: 'search',
    content: <svg width="44" height="44" viewBox="0 0 24 24">
    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
    <circle cx="10" cy="10" r="7" />
    <line x1="21" y1="21" x2="15" y2="15" />
  </svg>
  },
  {
    name: 'map-search',
    content: <svg width="44" height="44" viewBox="0 0 24 24">
    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
    <path d="M11 18l-2 -1l-6 3v-13l6 -3l6 3l6 -3v10" />
    <path d="M9 4v13" />
    <path d="M15 7v5" />
    <circle cx="16.5" cy="17.5" r="2.5" />
    <path d="M18.5 19.5l2.5 2.5" />
  </svg>
  },
  {
    name: 'external-link',
    content: <svg width="44" height="44" viewBox="0 0 24 24">
    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
    <path d="M11 7h-5a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-5" />
    <line x1="10" y1="14" x2="20" y2="4" />
    <polyline points="15 4 20 4 20 9" />
  </svg>
  }
]

export const IconUi = ({iconName = ''}) => {
  const theIcon = icons.filter(icon => iconName === icon['name'])

  if (theIcon.length === 0) return <span className="meb-component-icon-ui is-meb-no-icon"></span>

  return <span className="meb-component-icon-ui">
    {theIcon[0]['content']}
  </span>
}

export const iconList = icons.map(icon => icon['name'])

export const IconControl = props => {
  const {
    onChange,
    icon,
    label,
  } = props

  const iconOptions = [
    { value: '', label: 'No icon' }
  ]

  return <SelectControl
    label={label || ''}
    value={icon}
    options={
      iconOptions.concat(iconList.map(iconName => {
        return { value: iconName, label: iconName }
      }))
    }
    onChange={value => {
      onChange(value)
    }}
  />
}
