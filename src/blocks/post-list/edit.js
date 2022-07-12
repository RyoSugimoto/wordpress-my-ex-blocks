import { useBlockProps, InspectorControls, BlockControls } from '@wordpress/block-editor'
import { useState, useEffect, Fragment } from '@wordpress/element'
import { resolveSelect } from '@wordpress/data'
import { ServerSideRender } from '@wordpress/editor'
import { PanelBody, SelectControl, TextControl, ToggleControl, RangeControl, __experimentalRadio as Radio, __experimentalRadioGroup as RadioGroup } from '@wordpress/components'
import { Stack, Row, Spacer } from '../../components/layout'
import { PostList, MultipleValuesControl, CheckListControl } from '../../components/data'
import { MarginControls } from '../../components/margin'

const blockName = 'wp-block-my-extra-blocks-post-card'

const breakpoints = [
  { label: 'XS', key: 'xs' },
  { label: 'S', key: 'sm' },
  { label: 'M', key: 'md' },
  { label: 'L', key: 'lg' },
  { label: 'XL', key: 'xl' },
  { label: '2XL', key: '2xl' },
]

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

const getTerms = slug => {
  return resolveSelect('core').getEntityRecords('taxonomy', slug, {
    per_page: -1,
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
      // Grid
      columns,
      gapX,
      gapY,
      // Post
      perPage,
      postType,
      taxQueryRelation,
      taxQueryTax,
      taxQueryTerms,
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
  const [taxList, setTaxList] = useState([])
  const [termList, setTermList] = useState([])

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
    const currentPostType = getPostTypeFromSlug(postType, postTypesData)
    if (currentPostType) {
      setTaxList(currentPostType.taxonomies)
    }

    const terms = await getTerms(taxQueryTax)
    setTermList(terms || [])
  }

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
                setPosts(newPosts || [])
                setFilteredPosts(newPosts || [])
                setPostFilterValue('')
                setTaxList(getPostTypeFromSlug(value, postTypes).taxonomies)
              }}
            />
          </Row>
          <Row>
            <RangeControl
              label="Per page (Max number of items)"
              value={perPage}
              min={1} max={100} step={1}
              onChange={value => {
                setAttributes({
                  perPage: value
                })
              }}
            />
          </Row>
          <Row>
            <SelectControl
              label="Tax query"
              value={taxQueryTax}
              options={
                [{ value: '', label: 'No query' }].concat(taxList.map(item => {
                  return { value: item, label: item }
                }))
              }
              onChange={async(value) => {
                setAttributes({
                  taxQueryTax: value,
                  taxQueryTerms: []
                })
                const terms = await getTerms(value)
                setTermList(terms || [])
              }}
            />
          </Row>
          {(taxQueryTax !== '' && termList.length > 0) &&
            <Row title="Terms">
              <RadioGroup
                label="Search mode"
                checked={taxQueryRelation}
                onChange={value => {
                  setAttributes({
                    taxQueryRelation: value
                  })
                }}
              >
                <Radio value="IN">OR</Radio>
                <Radio value="AND">AND</Radio>
              </RadioGroup>
              <Spacer size=".5rem" />
              <PostList
                posts={termList}
                checked={taxQueryTerms}
                isMultiple={true}
                onChange={value => {
                  setAttributes({
                    taxQueryTerms: value
                  })
                }}
              />
              {taxQueryTerms.length &&
                <Fragment>
                  <Spacer size=".5rem" />
                  <div>
                    Selected: {termList.filter(item => {
                      return taxQueryTerms.indexOf(item.id) !== -1
                    }).map((item, index) => {
                      return item.name
                    }).join(', ')}
                  </div>
                </Fragment>
              }
            </Row>
          }
        </Stack>
        <Spacer size=".5rem" />
      </PanelBody>
      <PanelBody title="Grid">
        <Stack>
          <Row>
            <RangeControl
              label="Gap X"
              value={gapX}
              min={1} max={50} step={1}
              onChange={value => {
                setAttributes({
                  gapX: value
                })
              }}
            />
          </Row>
          <Row>
            <RangeControl
              label="Gap Y"
              value={gapY}
              min={1} max={50} step={1}
              onChange={value => {
                setAttributes({
                  gapY: value
                })
              }}
            />
          </Row>
          <Row title="Columns">
            <table style={{width: '100%'}}>
              <thead><tr><th>Viewport</th><th>Columns</th></tr></thead>
              <tbody>{breakpoints.map(({label, key}, index) => {
                return <tr key={index}><td>{label}</td>
                <td><RangeControl
                  label={label}
                  hideLabelFromVision
                  value={columns[index]}
                  min={1} max={12} step={1}
                  onChange={value => {
                    const newValue = columns.concat()
                    newValue[index] = value
                    setAttributes({
                      columns: newValue
                    })
                  }}
                /></td></tr>
              })}</tbody>
            </table>
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
          // Grid
          columns,
          gapX,
          gapY,
          // Post
          perPage,
          postType,
          taxQueryRelation,
          taxQueryTax,
          taxQueryTerms,
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
          marginTop,
          marginBottom,
        }}
      />
    </div>
  ]
}
