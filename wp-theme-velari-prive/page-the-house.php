<?php
/**
 * Template Name: The House
 * 
 * @package VelariPrive
 */

get_header();
$theme_uri = get_template_directory_uri();
?>

<main id="main-content">
  <section class="section" style="padding-top: calc(var(--header-height) + 4rem); background: radial-gradient(circle at 50% 30%, #15151F 0%, #060608 85%);">
    <div class="container-editorial" style="text-align: center;">
      <span class="eyebrow eyebrow-silver">THE IDENTITY & ORIGIN</span>
      <h1 style="font-size: clamp(2.5rem, 5vw, 4.5rem); margin-bottom: 1.5rem;">The House of Velari Privé</h1>
      <p class="lead" style="max-width: 720px; margin: 0 auto 3rem;">
        Conceived at the intersection of haute couture aesthetics, Australian botanical curiosity, and exacting pharmaceutical precision.
      </p>
    </div>

    <div class="container" style="max-width: 1080px; margin-top: 1rem;">
      <div style="border: 1px solid var(--color-silver-border); border-radius: var(--radius-xs); overflow: hidden; box-shadow: var(--shadow-elevated);">
        <img src="<?php echo esc_url($theme_uri . '/assets/images/packaging-craft-detail.jpg'); ?>" alt="Velari Privé bespoke coffret" style="width: 100%;">
      </div>
    </div>
  </section>

  <section class="section" style="background-color: var(--color-obsidian);">
    <div class="container-editorial">
      <span class="eyebrow eyebrow-silver">PHILOSOPHY</span>
      <h2 style="margin-bottom: 1.5rem;">Beauty Without Compromise</h2>
      <p class="lead">
        Luxury beauty too often confuses volume with prestige, ornament with craftsmanship, and exaggerated claims with genuine efficacy.
      </p>
      <p>
        At VELARI PRIVÉ, we practice deliberate restraint. We treat hair and scalp care not as a transient cosmetic coating, but as an intimate dermaceutical discipline. Our elixirs are formulated for discerning individuals who value anatomical precision, tactile pleasure, and quiet longevity over mass-market trends.
      </p>
      <p>
        We make no hyperbolic medical assertions, no unverified promises to “cure”, and no fabricated testimonials. Our belief is steadfast: <em>Desire is created through the experience. Confidence is earned through the evidence.</em>
      </p>
    </div>
  </section>

  <section class="section" id="manufacturing" style="background-color: var(--color-charcoal); border-top: 1px solid var(--color-silver-border); border-bottom: 1px solid var(--color-silver-border);">
    <div class="container">
      <div class="craft-layout">
        <div>
          <span class="eyebrow eyebrow-silver">TRANSPARENT ARCHITECTURE</span>
          <h2>Australian Vision, Controlled Precision Manufacturing</h2>
          <p>VELARI PRIVÉ bridges two complementary worlds of expertise:</p>
          <div style="display: flex; flex-direction: column; gap: 1.75rem; margin-top: 2rem;">
            <div style="background: rgba(10, 10, 15, 0.7); border: 1px solid var(--color-silver-border); padding: 1.5rem; border-radius: var(--radius-xs);">
              <h3 style="font-size: 1.2rem; color: #FFF; margin-bottom: 0.5rem;">Australian-Led Formulation Vision</h3>
              <p style="font-size: 0.85rem; color: var(--color-text-secondary); margin-bottom: 0;">
                Guided by Australia’s rich biodiversity, resilient coastal botanicals, and progressive cosmetic science standards. The formulation architecture focuses on scalp lipid balance, antioxidant fortification, and follicular microclimate support.
              </p>
            </div>
            <div style="background: rgba(10, 10, 15, 0.7); border: 1px solid var(--color-silver-border); padding: 1.5rem; border-radius: var(--radius-xs);">
              <h3 style="font-size: 1.2rem; color: #FFF; margin-bottom: 0.5rem;">Precision Controlled Manufacturing in India</h3>
              <p style="font-size: 0.85rem; color: var(--color-text-secondary); margin-bottom: 0;">
                Executed in precision-controlled cGMP cleanroom facilities in India under strict microbiological and analytical surveillance.
              </p>
            </div>
          </div>
        </div>
        <div style="border: 1px solid var(--color-silver-border); border-radius: var(--radius-xs); overflow: hidden;">
          <img src="<?php echo esc_url($theme_uri . '/assets/images/pipette-serum-macro.jpg'); ?>" alt="Macro drop of Anagènese serum" style="width: 100%;">
        </div>
      </div>
    </div>
  </section>
</main>

<?php get_footer(); ?>
