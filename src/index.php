<?php
/*
Plugin Name: My Extra Blocks
Description: Set of blocks
Version: 0.1.0
Author: Ryo Sugimoto
*/

defined( 'ABSPATH' ) || exit;

// Load assets for the blocks

add_filter( 'should_load_separate_core_block_assets', '__return_true' );

// Register the category

add_filter( 'block_categories_all', function ( $block_categories, $editor_context )
{
  if ( !empty( $editor_context->post ) ) {
    array_unshift(
      $block_categories,
      [
        'slug' => 'my-extra-blocks',
        'title' => __( 'My Extra Blocks', 'my-extra-blocks' ),
        'icon' => null
      ]
    );
    return $block_categories;
  }
}, 10, 2 );

// Enqueue scripts and styles for 'editor'

add_action( 'enqueue_block_editor_assets', function()
{
  // Setting file

  $asset_file = include( plugin_dir_path( __FILE__ ) . 'my-extra-blocks' . '.asset.php' );

  wp_register_script(
    'my-extra-blocks' . '-script',
    plugins_url( 'my-extra-blocks.js', __FILE__ ),
    $asset_file['dependencies'],
    $asset_file['version']
  );
} );

// Enqueue scripts and styles for 'front'

add_action( 'init', function()
{
  $asset_file_front = include( plugin_dir_path( __FILE__ ) . 'my-extra-blocks' . '-front.asset.php' );

  // Register the script

  wp_register_script(
    'my-extra-blocks' . '-script-front',
    plugins_url( 'my-extra-blocks' . '-front.js', __FILE__ ),
    $asset_file_front['dependencies'],
    $asset_file_front['version']
  );

  // Register the style

  wp_register_style(
    'my-extra-blocks' . '-style',
    plugins_url( 'style-' . 'my-extra-blocks' . '.css', __FILE__ ),
    [],
    filemtime( plugin_dir_path( __FILE__ ) . 'style-' . 'my-extra-blocks' . '.css' )
  );

  // Register the style for 'editor'

  wp_register_style(
    'my-extra-blocks' . '-style-editor',
    plugins_url( 'my-extra-blocks' . '.css', __FILE__ ),
    [],
    filemtime( plugin_dir_path( __FILE__ ) . 'my-extra-blocks' . '.css' )
  );
} );

// ================
// Load blocks

// Rich text

include( plugin_dir_path( __FILE__ ) . 'blocks/rich-text/index.php' );

// Button

include( plugin_dir_path( __FILE__ ) . 'blocks/button/index.php' );

// List

include( plugin_dir_path( __FILE__ ) . 'blocks/list/index.php' );
include( plugin_dir_path( __FILE__ ) . 'blocks/list-item/index.php' );

// Data list

include( plugin_dir_path( __FILE__ ) . 'blocks/data-list/index.php' );
include( plugin_dir_path( __FILE__ ) . 'blocks/data-list-item/index.php' );

// Image

include( plugin_dir_path( __FILE__ ) . 'blocks/image/index.php' );

// SVG

include( plugin_dir_path( __FILE__ ) . 'blocks/svg/index.php' );

// Container

include( plugin_dir_path( __FILE__ ) . 'blocks/container/index.php' );

// Grid

include( plugin_dir_path( __FILE__ ) . 'blocks/grid/index.php' );
include( plugin_dir_path( __FILE__ ) . 'blocks/grid-item/index.php' );

// Image with text

include( plugin_dir_path( __FILE__ ) . 'blocks/image-with-text/index.php' );
