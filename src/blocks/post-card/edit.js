import { useBlockProps, InspectorControls, BlockControls } from '@wordpress/block-editor'
import { useState, useEffect, Fragment } from '@wordpress/element'
import { resolveSelect } from '@wordpress/data'
import { ServerSideRender } from '@wordpress/editor'
import { PanelBody, SelectControl, TextControl, ToggleControl, RangeControl } from '@wordpress/components'
import { Stack, Row, Spacer } from '../../components/layout'
import { PostList, MultipleValuesControl, CheckListControl } from '../../components/data'
import { MarginControls } from '../../components/margin'

const blockName = 'wp-block-my-extra-blocks-post-card'

const breakpointOptions = [
  { label: 'XS', value: 'xs' },
  { label: 'S', value: 'sm' },
  { label: 'M', value: 'md' },
  { label: 'L', value: 'lg' },
  { label: 'XL', value: 'xl' },
  { label: '2XL', value: '2xl' },
  { label: 'No break', value: 'no-break' },
  { label: 'All break', value: 'all-break' },
]

const getPostTypes = () => {
  return resolveSelect('core').getPostTypes({
    per_page: -1,
  })
}

const getPosts = (postTypeSlug, perPage = -1) => {
  return resolveSelect('core').getEntityRecords('postType', postTypeSlug, {
    per_page: perPage
  })
}

const linkTypeOptions = [
  { value: 'block', label: 'Whole block' },
  { value: 'title', label: 'Title and thumbnail' },
  { value: 'button', label: 'Button, title and thumbnail' },
  { value: 'no-link', label: 'No link' },
]

const buttonStyleOptions = [
  { value: 'default', label: 'Default' },
  { value: 'primary', label: 'Primary' },
  { value: 'secondary', label: 'Secondary' },
  { value: 'link', label: 'Link' },
]

export default props => {
  const {
    attributes: {
      postType,
      postId,
      taxonomies,
      linkType,
      hasDate,
      hasExcerpt,
      titleMaxLength,
      excerptMaxLength,
      metaFields,
      buttonText,
      buttonStyle,
      breakpoint,
      // Margin
      marginTop,
      marginBottom,
    }, setAttributes, clientId
  } = props

  const blockProps = useBlockProps({
    className: `
    `,
    style: {
    }
  })

  const [postTypes, setPostTypes] = useState([])
  const [posts, setPosts] = useState([])
  const [taxList, setTaxList] = useState([])
  const [filteredPosts, setFilteredPosts] = useState([])
  const [postFilterValue, setPostFilterValue] = useState('')

  if (!metaFields instanceof Array) {
    setAttributes({
      metaFields: []
    })
  }

  const getPostTypeFromSlug = (postTypeSlug, postTypes) => {
    return postTypes.filter(item => item.slug === postTypeSlug)[0]
  }

  const initialize = async() => {
    const postTypesData = await getPostTypes()
    setPostTypes(postTypesData)
    const postsData = await getPosts(postType, -1)
    setPosts(postsData)
    setFilteredPosts(postsData)

    const currentPostType = getPostTypeFromSlug(postType, postTypesData)

    if (currentPostType) {
      setTaxList(currentPostType.taxonomies)
    }
  }

  const taxSelectorId = `tax-selector-form-${clientId}`

  useEffect(() => {
    initialize();
  }, [])

  const getInspectorControls = () => {
    return <InspectorControls key={`inspector-controls-${clientId}`}>
      <PanelBody title="Post" initialOpen={true}>
        <Stack>
          <Row>
            <SelectControl
              label="Post type"
              value={postType}
              options={postTypes.map(item => {
                return {
                  value: item.slug,
                  label: item.labels.name
                }
              })}
              onChange={async(value) => {
                setAttributes({
                  postType: value
                })
                const newPosts = await getPosts(value, -1)
                setPosts(newPosts)
                setFilteredPosts(newPosts)
                setPostFilterValue('')
                setTaxList(getPostTypeFromSlug(value, postTypes).taxonomies)
              }}
            />
          </Row>
          <Row>
            <Stack title="Post">
              <Row>
                <TextControl
                  placeholder="Filter posts by title or ID"
                  type="search"
                  value={postFilterValue}
                  onChange={value => {
                    setPostFilterValue(value)
                    if ( value === '' ) {
                      setFilteredPosts(posts)
                    } else {
                      const filteredItems = posts.filter(item => {
                        return !!item.title.rendered.match(value) || item.id === parseInt(value)
                      })
                      setFilteredPosts(filteredItems)
                    }
                  }}
                />
              </Row>
              <Row>
                <PostList
                  posts={filteredPosts}
                  checked={postId}
                  isMultiple={false}
                  height="15rem"
                  onChange={value => {
                    if (value instanceof Array) {
                      if (postId.join(',') === value.join(',')) return
                    } else {
                      if (postId === value) return
                    }
                    setAttributes({
                      postId: value
                    })
                  }}
                />
              </Row>
            </Stack>
            <Spacer size=".5rem" />
          </Row>
        </Stack>
      </PanelBody>
      <PanelBody title="Display" initialOpen={true}>
        <Stack>
          <Row>
            <SelectControl
              label="Link type"
              value={linkType}
              options={linkTypeOptions}
              onChange={value => {
                setAttributes({
                  linkType: value
                })
              }}
            />
          </Row>
          <Row>
            <ToggleControl
              label="Show date"
              checked={hasDate}
              onChange={value => {
                setAttributes({
                  hasDate: value
                })
              }}
            />
          </Row>
          <Row>
            <ToggleControl
              label="Show excerpt"
              checked={hasExcerpt}
              onChange={value => {
                setAttributes({
                  hasExcerpt: value
                })
              }}
            />
          </Row>
          <Fragment>
            {taxList.length !== 0 &&
              <Row title="Taxonomies">
                <CheckListControl
                  options={taxList}
                  values={taxonomies}
                  onChange={values => {
                    setAttributes({
                      taxonomies: values
                    })
                  }}
                />
              </Row>
            }
            {taxList.length === 0 &&
              <Row title="Taxonomies">
                <span>Post type "{postType}" doesn't have any taxonomy.</span>
              </Row>
            }
          </Fragment>
          <Row>
            <RangeControl
              label="Title max length"
              value={titleMaxLength}
              min={1} max={100} step={1}
              onChange={value => {
                setAttributes({
                  titleMaxLength: value
                })
              }}
            />
          </Row>
          <Row>
            <RangeControl
              label="Excerpt max length"
              value={excerptMaxLength}
              min={1} max={400} step={1}
              onChange={value => {
                setAttributes({
                  excerptMaxLength: value
                })
              }}
            />
          </Row>
          <Row>
            <TextControl
              label="Button text"
              value={buttonText}
              onChange={value => {
                setAttributes({
                  buttonText: value
                })
              }}
            />
          </Row>
          <Row>
            <SelectControl
              label="Button style"
              value={buttonStyle}
              options={buttonStyleOptions}
              onChange={value => {
                setAttributes({
                  buttonStyle: value
                })
              }}
            />
          </Row>
          <Row title="Meta fields">
            <MultipleValuesControl
              tags={metaFields}
              onChange={value => {
                setAttributes({
                  metaFields: value
                })
              }}
            />
          </Row>
          <Row>
            <SelectControl
              label="Breakpoint"
              value={breakpoint}
              options={breakpointOptions}
              onChange={value => {
                setAttributes({
                  breakpoint: value
                })
              }}
            />
          </Row>
        </Stack>
      </PanelBody>
      <PanelBody title="Margin" initialOpen={false}>
        <MarginControls
          marginTop={marginTop}
          marginBottom={marginBottom}
          onChange={value => {
            setAttributes(value)
          }}
        />
      </PanelBody>
    </InspectorControls>
  }

  const getBlockControls = () => {
    return <BlockControls key={`block-controls-${clientId}`}>
    </BlockControls>
  }

  return [
    getInspectorControls(),
    getBlockControls(),
    <div
      {...blockProps}
      key={`block-${clientId}`}
    >
      <ServerSideRender
        block={props.name}
        attributes={{
          postType,
          postId,
          taxonomies,
          linkType,
          hasDate,
          hasExcerpt,
          titleMaxLength,
          excerptMaxLength,
          metaFields,
          breakpoint,
          marginTop,
          marginBottom,
        }}
      />
    </div>
  ]
}
