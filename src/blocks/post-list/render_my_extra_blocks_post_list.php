<?php
function render_my_extra_blocks_post_list(
  $attributes = [],
  $content = '',
  $wp_block)
{
  ob_start();

  $item_template_path = plugin_dir_path( __FILE__ ) . '../post-card/my_extra_blocks_post_card_content.php';

  $class_string = '';

  $breakpoint_keys = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];
  $columns_props = '';
  foreach( $breakpoint_keys as $index => $columns ) {
    $columns_props .= ' --columns-' . $breakpoint_keys[$index] . ': repeat(' . $attributes['columns'][$index] . ', 1fr);';
  }

  $style_string = ''
    . ' --margin-top: ' . 'var(--meb-space-' . $attributes['marginTop'] . ');'
    . ' --margin-bottom: ' . 'var(--meb-space-' . $attributes['marginBottom'] . ');'
    . ' --gap-x: ' . 'var(--meb-space-' . $attributes['gapX'] . ');'
    . ' --gap-y: ' . 'var(--meb-space-' . $attributes['gapY'] . ');'
    . $columns_props
  ;

  $item_class_string = ''
    . ' is-meb-post-card-button-style-' . $attributes['buttonStyle']
    . ' is-meb-breakpoint-' . $attributes['breakpoint']
  ;

  $item_style_string = '';

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
    $query = [
      'post_type' => $attributes['postType'],
      'posts_per_page' => $attributes['perPage'],
    ];

    if ( $attributes['taxQueryTax'] && $attributes['taxQueryTerms'] ) {
      $query['tax_query'] = [
        [
          'operator' => $attributes['taxQueryRelation'],
          'taxonomy' => $attributes['taxQueryTax'],
          'field' => 'term_id',
          'terms' => $attributes['taxQueryTerms'],
        ]
      ];
    }

    $posts = get_posts($query);

    if ( !$posts ) return '<div class="">No posts.</div>';

    global $post;
  ?>

  <?php // Outer element ?>
  <div
    <?php
      echo get_block_wrapper_attributes([
        'class' => $class_string,
        'style' => $style_string,
      ]);
    ?>
  >
    <div class="wp-block-my-extra-blocks-post-list__container">

      <?php
        // posts loop
        foreach ( $posts as $a_post ):

        $the_post = get_post( $a_post->ID );
        $post = $the_post;
        setup_postdata( $post );
      ?>

      <div
        class="
          wp-block-my-extra-blocks-post-card
          <?php echo $item_class_string; ?>
        "
        style="<?php echo $item_style_string; ?>"
      >
        <?php include( $item_template_path ); ?>
      </div>

      <?php endforeach; // / Posts loop ?>

    </div>
  </div>
  <?php // /Outer element ?>

  <?php
  /* **** /Render end **** */

  wp_reset_postdata();
  $output = ob_get_contents();
  ob_clean();
  return $output;
}
