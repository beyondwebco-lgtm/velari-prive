<?php
/**
 * VELARI PRIVÉ — Index Fallback Template
 * 
 * @package VelariPrive
 */

get_header();
?>

<main id="main-content" style="padding-top: calc(var(--header-height) + 3rem); padding-bottom: 6rem;">
  <div class="container-editorial">
    <?php if (have_posts()) : while (have_posts()) : the_post(); ?>
      <article style="margin-bottom: 3.5rem;">
        <h2 style="font-size: 2rem; margin-bottom: 1rem;"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
        <div style="color: var(--color-silver-body);"><?php the_excerpt(); ?></div>
      </article>
    <?php endwhile; endif; ?>
  </div>
</main>

<?php get_footer(); ?>
