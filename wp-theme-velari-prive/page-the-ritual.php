<?php
/**
 * Template Name: The Ritual
 * 
 * @package VelariPrive
 */

get_header();
$theme_uri = get_template_directory_uri();
?>

<main id="main-content">
  <section class="section" style="padding-top: calc(var(--header-height) + 4rem); background: radial-gradient(circle at 50% 30%, #161622 0%, #060608 85%); text-align: center;">
    <div class="container-editorial">
      <span class="eyebrow eyebrow-silver">THE DAILY CEREMONY</span>
      <h1 style="font-size: clamp(2.4rem, 5vw, 4.2rem); margin-bottom: 1.25rem;">The ANAGÈNESE Ritual</h1>
      <p class="lead" style="max-width: 680px; margin: 0 auto 3rem;">
        A moment of deliberate sensory calm. Designed to transform hair and scalp application into an intentional daily discipline.
      </p>
    </div>

    <div class="container" style="max-width: 860px;">
      <div style="border: 1px solid var(--color-silver-border); border-radius: var(--radius-xs); overflow: hidden; box-shadow: var(--shadow-elevated);">
        <img src="<?php echo esc_url($theme_uri . '/assets/images/pipette-serum-macro.jpg'); ?>" alt="Graduated silver pipette drawing precise 1.0ml of Anagènese" style="width: 100%;">
      </div>
    </div>
  </section>

  <section class="section" style="background-color: var(--color-obsidian);">
    <div class="container-editorial">
      <div style="display: flex; flex-direction: column; gap: 4rem;">
        
        <div style="display: grid; grid-template-columns: 80px 1fr; gap: 2rem; border-bottom: 1px solid rgba(220, 220, 235, 0.1); padding-bottom: 3rem;">
          <div style="font-family: var(--font-serif); font-size: 3rem; color: #666675; line-height: 1;">01</div>
          <div>
            <span class="eyebrow eyebrow-silver">PURIFICATION & PARTING</span>
            <h2 style="font-size: 2rem; margin-bottom: 1rem;">The Scalp Reset</h2>
            <p>The ritual is optimal on clean, dry or lightly towel-damp hair. Part the hair in four parallel lines from the frontal hairline back toward the crown using your fingertips.</p>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 80px 1fr; gap: 2rem; border-bottom: 1px solid rgba(220, 220, 235, 0.1); padding-bottom: 3rem;">
          <div style="font-family: var(--font-serif); font-size: 3rem; color: #666675; line-height: 1;">02</div>
          <div>
            <span class="eyebrow eyebrow-silver">CALIBRATED MEASURE</span>
            <h2 style="font-size: 2rem; margin-bottom: 1rem;">The 1.0ml Micro-Dose</h2>
            <p>Depress the silver rubber bulb once to draw exactly 1.0ml of the crystal-clear elixir into the borosilicate pipette. A single calibrated pipette is sufficient for the complete scalp perimeter.</p>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 80px 1fr; gap: 2rem; border-bottom: 1px solid rgba(220, 220, 235, 0.1); padding-bottom: 3rem;">
          <div style="font-family: var(--font-serif); font-size: 3rem; color: #666675; line-height: 1;">03</div>
          <div>
            <span class="eyebrow eyebrow-silver">FOCUSED DISTRIBUTION</span>
            <h2 style="font-size: 2rem; margin-bottom: 1rem;">Targeted Sectioning</h2>
            <p>Release micro-droplets along parted furrows directly onto the scalp surface: 3 along hairline, 4 along the crown, and 2 across temporal zones.</p>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 80px 1fr; gap: 2rem; padding-bottom: 1rem;">
          <div style="font-family: var(--font-serif); font-size: 3rem; color: #666675; line-height: 1;">04</div>
          <div>
            <span class="eyebrow eyebrow-silver">SOMATIC STIMULATION</span>
            <h2 style="font-size: 2rem; margin-bottom: 1rem;">Acupressure Activation</h2>
            <p>Apply firm, circular pressure with fingertips beginning at the base of the skull and travelling upward to the vertex for 90 to 120 seconds. The elixir absorbs entirely within 3 minutes.</p>
          </div>
        </div>

      </div>
    </div>
  </section>
</main>

<?php get_footer(); ?>
