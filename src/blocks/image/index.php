<?php
add_action('init', function()
{
  register_block_type(
    'my-extra-blocks/image',
    [
      // Script tag
      'editor_script' => 'my-extra-blocks-script',
      // Style name
      'style' => 'my-extra-blocks-style',
      // Editor style name
      'editor_style' => 'my-extra-blocks-style-editor',
    ],
  );
} );
