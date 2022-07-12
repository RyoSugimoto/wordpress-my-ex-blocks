<?php
function render_my_extra_blocks_post_card(
  $attributes = [],
  $content = '',
  $wp_block)
{
  ob_start();

  $template_path = plugin_dir_path( __FILE__ ) . 'my_extra_blocks_post_card_content.php';

  $classString = ''
    . ' is-meb-post-card-button-style-' . $attributes['buttonStyle']
    . ' is-meb-breakpoint-' . $attributes['breakpoint']
  ;

  $styleString = ''
    . ' --margin-top: ' . 'var(--meb-space-' . $attributes['marginTop'] . ');'
    . ' --margin-bottom: ' . 'var(--meb-space-' . $attributes['marginBottom'] . ');'
  ;

  $has_whole_link = false;
  $has_thumbnail_link = false;
  $has_title_link = false;
  $has_button_link = false;

  switch ( $attributes['linkType'] ) {
    case 'title':
      $has_thumbnail_link = true;
      $has_title_link = true;
      break;
    case 'button':
      $has_thumbnail_link = true;
      $has_title_link = true;
      $has_button_link = true;
      break;
    case 'no-link':
      break;
    default:
      break;
  }

  /* **** Render start **** */ ?>

  <?php
    global $post;
    $the_post = get_post( $attributes['postId'] );
    if ( !$the_post || $the_post->post_status !== 'publish' ) {
      return '<div class="wp-block-my-extra-blocks-post-card__not-found">The post is not found.</div>';
    }
    $post = $the_post;
    setup_postdata( $post );
  ?>

  <?php // Outer element ?>
  <div
    <?php
      echo get_block_wrapper_attributes([
        'class' => $classString,
        'style' => $styleString,
      ]);
    ?>
  >

    <?php include( $template_path ); ?>

  </div>
  <?php // /Outer element ?>

  <?php /* **** /Render end **** */

  wp_reset_postdata();
  $output = ob_get_contents();
  ob_clean();
  return $output;
}
