<?php
/**
 * VELARI PRIVÉ — Standard Page Template
 * 
 * @package VelariPrive
 */

get_header();
?>

<main id="main-content" style="padding-top: calc(var(--header-height) + 3rem); padding-bottom: 6rem;">
  <?php while (have_posts()) : the_post(); ?>
    <div class="container-editorial">
      <h1 style="font-size: clamp(2.2rem, 4.5vw, 3.8rem); margin-bottom: 2rem;"><?php the_title(); ?></h1>
      <div style="font-size: 1.05rem; line-height: 1.85; color: var(--color-silver-bright);">
        <?php the_content(); ?>
      </div>
    </div>
  <?php endwhile; ?>
</main>

<?php get_footer(); ?>
