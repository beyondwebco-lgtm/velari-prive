<?php
/**
 * Template Name: Journal
 * 
 * @package VelariPrive
 */

get_header();
$theme_uri = get_template_directory_uri();
?>

<main id="main-content">
  <section class="section" style="padding-top: calc(var(--header-height) + 4rem); background: radial-gradient(circle at 50% 25%, #151520 0%, #060608 85%); text-align: center;">
    <div class="container-editorial">
      <span class="eyebrow eyebrow-silver">THE PUBLICATION</span>
      <h1 style="font-size: clamp(2.4rem, 5vw, 4.5rem); margin-bottom: 1.25rem;">The Velari Journal</h1>
      <p class="lead" style="max-width: 660px; margin: 0 auto;">
        Curated folios exploring trichological science, botanical intelligence, craftsmanship, and daily ritual.
      </p>
    </div>
  </section>

  <section class="section" style="background-color: var(--color-obsidian);">
    <div class="container">
      <div class="journal-cards-grid">
        <?php
        $journal_query = new WP_Query([
            'post_type'      => ['journal', 'post'],
            'posts_per_page' => 9,
        ]);

        if ($journal_query->have_posts()) :
            while ($journal_query->have_posts()) : $journal_query->the_post();
        ?>
            <article class="journal-card">
              <div class="journal-card-thumb">
                <?php if (has_post_thumbnail()) : ?>
                  <?php the_post_thumbnail('large'); ?>
                <?php else : ?>
                  <img src="<?php echo esc_url($theme_uri . '/assets/images/pipette-serum-macro.jpg'); ?>" alt="<?php the_title_attribute(); ?>">
                <?php endif; ?>
              </div>
              <div class="journal-card-body">
                <span class="journal-meta"><?php echo esc_html(get_the_date('M Y')); ?> • FOLIO</span>
                <h3 class="journal-title"><?php the_title(); ?></h3>
                <div class="journal-excerpt"><?php the_excerpt(); ?></div>
                <a href="<?php the_permalink(); ?>" class="btn-editorial-link">Read Folio</a>
              </div>
            </article>
        <?php
            endwhile;
            wp_reset_postdata();
        else :
        ?>
            <!-- Default Static Folios -->
            <article class="journal-card">
              <div class="journal-card-thumb">
                <img src="<?php echo esc_url($theme_uri . '/assets/images/pipette-serum-macro.jpg'); ?>" alt="Macro drop">
              </div>
              <div class="journal-card-body">
                <span class="journal-meta">VOL. 01 • INGREDIENT LITERACY</span>
                <h3 class="journal-title">The Follicular Microclimate</h3>
                <p class="journal-excerpt">Understanding the delicate sebum balance and capillary nourishment required for enduring scalp vitality.</p>
                <a href="<?php echo esc_url(home_url('/journal/#microclimate')); ?>" class="btn-editorial-link">Read Folio</a>
              </div>
            </article>

            <article class="journal-card">
              <div class="journal-card-thumb">
                <img src="<?php echo esc_url($theme_uri . '/assets/images/packaging-craft-detail.jpg'); ?>" alt="Coffret box">
              </div>
              <div class="journal-card-body">
                <span class="journal-meta">VOL. 02 • MATERIALITY & DESIGN</span>
                <h3 class="journal-title">The Geometry of Obsidian Glass</h3>
                <p class="journal-excerpt">Why photochemical protection in ultra-dense black glass preserves bioactive potency over shelf longevity.</p>
                <a href="<?php echo esc_url(home_url('/journal/#geometry')); ?>" class="btn-editorial-link">Read Folio</a>
              </div>
            </article>

            <article class="journal-card">
              <div class="journal-card-thumb">
                <img src="<?php echo esc_url($theme_uri . '/assets/images/hair-editorial-movement.jpg'); ?>" alt="Hair movement">
              </div>
              <div class="journal-card-body">
                <span class="journal-meta">VOL. 03 • RITUAL SCIENCE</span>
                <h3 class="journal-title">A Symphony of Touch</h3>
                <p class="journal-excerpt">The physiology of micro-acupressure: How mechanical fingertip stimulation enhances dermal absorption.</p>
                <a href="<?php echo esc_url(home_url('/journal/#touch')); ?>" class="btn-editorial-link">Read Folio</a>
              </div>
            </article>
        <?php endif; ?>
      </div>
    </div>
  </section>
</main>

<?php get_footer(); ?>
