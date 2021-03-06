
<?php // Container element ?>
<div class="wp-block-my-extra-blocks-post-card__container">

  <?php if ( $attributes['linkType'] === 'block' ): ?>
    <a
      class="wp-block-my-extra-blocks-post-card__link"
      href="<?php the_permalink(); ?>"
    ></a>
  <?php endif; ?>

  <div class="wp-block-my-extra-blocks-post-card__eye-catch">
    <?php if ( $has_thumbnail_link ): ?>
      <a class="wp-block-my-extra-blocks-post-card__frame" href="<?php the_permalink(); ?>">
    <?php else: ?>
      <span class="wp-block-my-extra-blocks-post-card__frame">
    <?php endif; ?>
      <?php if ( has_post_thumbnail() ): ?>
        <img src="<?php echo the_post_thumbnail_url(); ?>" alt="" />
      <?php else: ?>
        <span></span>
      <?php endif; ?>
    <?php if ( $has_thumbnail_link ): ?></a>
    <?php else: ?></span><?php endif; ?>
  </div>

  <div class="wp-block-my-extra-blocks-post-card__content">

    <?php if ( $attributes['taxonomies'] ): ?>
      <?php foreach ( $attributes['taxonomies'] as $tax_name ): ?>
        <ul
          class="wp-block-my-extra-blocks-post-card__taxonomy-list"
          data-taxonomy-name="<?php echo $tax_name; ?>"
        ><?php
          $tax = get_the_terms( $post->ID, $tax_name );
          foreach ( $tax as $term ):
        ?>
          <li
            class="wp-block-my-extra-blocks-post-card__taxonomy-term"
            data-term-slug="<?php echo $term->slug; ?>"
          ><span>
            <?php echo $term->name; ?>
          </span></li>
        <?php endforeach; ?></ul>
      <?php endforeach; ?>
    <?php endif; ?>

    <h2
      class="wp-block-my-extra-blocks-post-card__title"
    >
      <?php if ( $has_title_link ): ?><a href="<?php the_permalink(); ?>"><?php endif; ?>
      <?php echo mb_substr( get_the_title(), 0, $attributes['titleMaxLength'] ); ?>
      <?php if ( $has_title_link ): ?></a><?php endif; ?>
    </h2>

    <?php if ( $attributes['hasExcerpt'] ): ?>
      <div
        class="wp-block-my-extra-blocks-post-card__excerpt"
      ><?php echo mb_substr( get_the_excerpt(), 0, $attributes['excerptMaxLength'] ); ?></div>
    <?php endif; ?>

    <?php
      foreach( $attributes['metaFields'] as $meta_field ) {
        $meta_field_value = get_post_meta( $post->ID, $meta_field );
        if ( $meta_field_value ): ?>
          <div
            class="wp-block-my-extra-blocks-post-card__meta"
            data-meta-field-name="<?php echo $meta_field ?>"
          ><span><?php echo implode( ', ', $meta_field_value ); ?></span></div>
        <?php endif;
      }
    ?>

    <?php if ( $has_button_link ): ?>
      <div class="wp-block-my-extra-blocks-post-card__more">
        <a href="<?php the_permalink(); ?>"><?php echo ( $attributes['buttonText'] ? : 'Read more' ) ?></a>
      </div>
    <?php endif; ?>

    <?php if ( $attributes['hasDate'] ): ?>
      <div
        class="wp-block-my-extra-blocks-post-card__date"
      ><?php echo get_the_date(); ?></div>
    <?php endif; ?>
  </div>

</div>
<?php // /Container element ?>
