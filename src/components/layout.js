export const Spacer = props => {
  return <div style={{
    height: props.size
  }}></div>
}

export const Stack = props => {
  const { children, title } = props

  return <div className="eb-editor-stack">
    {title &&
      <div style={{margin: '0 0 .5rem'}}>{title}</div>
    }
    <div
      style={{
        display: 'grid',
        gap: '.5rem',
      }}
    >
      {children}
    </div>
  </div>
}

export const Row = props => {
  const { children, title } = props

  return <div className="eb-editor-row">
  {title &&
    <div style={{margin: '0 0 .5rem'}}>{title}</div>
  }
    <div>
      {children}
    </div>
  </div>
}

export const Cluster = props => {
  const { children, title } = props

  return <div className="eb-editor-cluster">
  {title &&
    <div style={{margin: '0 0 .5rem'}}>{title}</div>
  }
    <div>
      {children}
    </div>
  </div>
}


