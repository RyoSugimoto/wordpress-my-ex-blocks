<?php
require_once( plugin_dir_path( __FILE__ ) . 'render_my_extra_blocks_post_list.php' );

add_action('init', function()
{
  register_block_type(
    'my-extra-blocks/post-list',
    [
      'api_version' => 2,
      // Script tag
      'editor_script' => 'my-extra-blocks-script',
      // Style name
      'style' => 'my-extra-blocks-style',
      // Editor style name
      'editor_style' => 'my-extra-blocks-style-editor',
      'render_callback' => 'render_my_extra_blocks_post_list',
      'attributes' => [
        // Grid
        'columns' => [
          'type' => 'array',
          'default' => [1, 2, 2, 3, 3, 4]
        ],
        'gapX' => [
          'type' => 'number',
          'default' => 8
        ],
        'gapY' => [
          'type' => 'number',
          'default' => 8
        ],
        // Post
        'postType' => [
          'type' => 'string',
          'default' => 'post'
        ],
        'taxQueryRelation' => [
          'type' => 'string',
          'default' => 'IN'
        ],
        'taxQueryTax' => [
          'type' => 'string',
          'default' => ''
        ],
        'taxQueryTerms' => [
          'type' => 'array',
          'default' => []
        ],
        'perPage' => [
          'type' => 'number',
          'default' => 10
        ],
        'termIds' => [
          'type' => 'array',
          'default' => []
        ],
        'taxonomies' => [
          'type' => 'array',
          'default' => []
        ],
        'linkType' => [
          'type' => 'string',
          'default' => 'block'
        ],
        'hasDate' => [
          'type' => 'boolean',
          'default' => true
        ],
        'hasExcerpt' => [
          'type' => 'boolean',
          'default' => true
        ],
        'titleMaxLength' => [
          'type' => 'number',
          'default' => 45
        ],
        'excerptMaxLength' => [
          'type' => 'number',
          'default' => 90
        ],
        'metaFields' => [
          'type' => 'array',
          'default' => []
        ],
        'buttonText' => [
          'type' => 'string',
          'default' => 'Read more'
        ],
        'buttonStyle' => [
          'type' => 'string',
          'default' => 'default'
        ],
        'breakpoint' => [
          'type' => 'string',
          'default' => 'no-break'
        ],
        // Margin
        'marginTop' => [
          'type' => 'number',
          'default' => 0
        ],
        'marginBottom' => [
          'type' => 'number',
          'default' => 0
        ],
      ],
    ],
  );
} );
