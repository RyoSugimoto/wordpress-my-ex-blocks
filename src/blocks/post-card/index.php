<?php
require_once( plugin_dir_path( __FILE__ ) . 'render_my_extra_blocks_post_card.php' );

add_action('init', function()
{
  register_block_type(
    'my-extra-blocks/post-card',
    [
      'api_version' => 2,
      // Script tag
      'editor_script' => 'my-extra-blocks-script',
      // Style name
      'style' => 'my-extra-blocks-style',
      // Editor style name
      'editor_style' => 'my-extra-blocks-style-editor',
      'render_callback' => 'render_my_extra_blocks_post_card',
      'attributes' => [
        'postType' => [
          'type' => 'string',
          'default' => 'post'
        ],
        'postId' => [
          'type' => 'number',
          'default' => 0
        ],
        'taxonomies' => [
          'type' => 'array',
          'default' => ['category']
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
          'default' => 'sm'
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
