<?php
/**
 * VELARI PRIVÉ — Single Post Template
 * 
 * @package VelariPrive
 */

get_header();
?>

<main id="main-content" style="padding-top: calc(var(--header-height) + 3rem); padding-bottom: 6rem;">
  <?php while (have_posts()) : the_post(); ?>
    <article class="container-editorial">
      <div style="text-align: center; margin-bottom: 3rem;">
        <span class="eyebrow eyebrow-silver"><?php echo esc_html(get_the_date('F Y')); ?> • VELARI JOURNAL</span>
        <h1 style="font-size: clamp(2.2rem, 4.5vw, 3.8rem); margin-bottom: 1.5rem;"><?php the_title(); ?></h1>
      </div>

      <?php if (has_post_thumbnail()) : ?>
        <div style="border: 1px solid var(--color-silver-border); border-radius: var(--radius-xs); overflow: hidden; margin-bottom: 3.5rem;">
          <?php the_post_thumbnail('full', ['style' => 'width:100%; height:auto;']); ?>
        </div>
      <?php endif; ?>

      <div style="font-size: 1.05rem; line-height: 1.85; color: var(--color-silver-bright);">
        <?php the_content(); ?>
      </div>

      <div style="margin-top: 4rem; border-top: 1px solid var(--color-silver-border); padding-top: 2rem; display: flex; justify-content: space-between; align-items: center;">
        <a href="<?php echo esc_url(home_url('/journal/')); ?>" class="btn btn-secondary">
          &larr; Return to All Folios
        </a>
      </div>
    </article>
  <?php endwhile; ?>
</main>

<?php get_footer(); ?>
