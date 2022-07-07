import { MediaUpload, MediaUploadCheck } from "@wordpress/block-editor"
import { Button } from "@wordpress/components"

export const MediaSelectControl = props => {
  const {
    onChange,
    id,
    url,
    allowType,
  } = props

  return <MediaUploadCheck>
    <MediaUpload
      onSelect={media => {
        onChange(media)
      }}
      allowType={allowType || ['image']}
      value={id}
      render={({open}) => {
        return <div
          style={{
            display: 'grid',
            gap: '.5rem',
          }}
        >
          <div
            style={{
              backgroundColor: '#eee',
              cursor: 'pointer',
              height: '0',
              paddingTop: '56%',
              position: 'relative',
              with: '100%',
            }}
            onClick={open}
          >
            {url &&
              <img
                style={{
                  height: '100%',
                  left: '0',
                  objectFit: 'cover',
                  position: 'absolute',
                  top: '0',
                  width: '100%',
                }}
                src={url}
                alt=""
              />
            }
          </div>
          <div style={{
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'flex-start',
          }}>
            <div>
              <Button
                onClick={open}
                variant="secondary"
              >Select media</Button>
            </div>
            {url &&
              <div style={{
                marginLeft: '.5rem'
              }}>
                <Button
                  onClick={() => {
                    onChange(null)
                  }}
                  variant="link"
                >Remove media</Button>
              </div>
            }
          </div>

        </div>
      }}
    />
  </MediaUploadCheck>
}
