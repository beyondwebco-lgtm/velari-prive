<?php
/**
 * Template Name: Professional Destinations
 * 
 * @package VelariPrive
 */

get_header();
?>

<main id="main-content">
  <section class="section" style="padding-top: calc(var(--header-height) + 4rem); background: radial-gradient(circle at 50% 30%, #151522 0%, #060608 85%); text-align: center;">
    <div class="container-editorial">
      <span class="eyebrow eyebrow-silver">INVITATION-LED DISTRIBUTION</span>
      <h1 style="font-size: clamp(2.4rem, 5vw, 4.4rem); margin-bottom: 1.25rem;">Founding Destinations</h1>
      <p class="lead" style="max-width: 700px; margin: 0 auto 3rem;">
        A selective global constellation of distinguished salons, aesthetic dermatology clinics, trichology suites, and private lifestyle sanctuaries.
      </p>
    </div>
  </section>

  <section class="section" style="background-color: var(--color-obsidian);">
    <div class="container">
      <div style="max-width: 820px; margin: 0 auto 4rem; text-align: center;">
        <span class="eyebrow eyebrow-silver">THE PROGRAMME</span>
        <h2>A Partnership of Discretion & Excellence</h2>
        <p>VELARI PRIVÉ collaborates with select institutions that uphold superior client care and aesthetic discernment.</p>
      </div>

      <div class="ritual-steps-grid">
        <div class="card-luxury">
          <span class="step-number" style="font-size: 1.6rem;">01</span>
          <h3 style="color: #FFF; font-size: 1.2rem; margin-bottom: 0.6rem;">Founding Recognition</h3>
          <p style="font-size: 0.82rem; margin-bottom: 0;">Permanent attribution as a Founding ANAGÈNESE Destination.</p>
        </div>
        <div class="card-luxury">
          <span class="step-number" style="font-size: 1.6rem;">02</span>
          <h3 style="color: #FFF; font-size: 1.2rem; margin-bottom: 0.6rem;">Tactile Vitrines</h3>
          <p style="font-size: 0.82rem; margin-bottom: 0;">Handcrafted obsidian stone pedestals and brushed silver presentation trays.</p>
        </div>
        <div class="card-luxury">
          <span class="step-number" style="font-size: 1.6rem;">03</span>
          <h3 style="color: #FFF; font-size: 1.2rem; margin-bottom: 0.6rem;">Location QR Journey</h3>
          <p style="font-size: 0.82rem; margin-bottom: 0;">Unique establishment-specific QR pathways for patron authentication.</p>
        </div>
        <div class="card-luxury">
          <span class="step-number" style="font-size: 1.6rem;">04</span>
          <h3 style="color: #FFF; font-size: 1.2rem; margin-bottom: 0.6rem;">Private Commercials</h3>
          <p style="font-size: 0.82rem; margin-bottom: 0;">Favourable allocation arrangements and dedicated concierge support.</p>
        </div>
      </div>
    </div>
  </section>

  <section class="section" id="apply" style="background-color: var(--color-charcoal); border-top: 1px solid var(--color-silver-border);">
    <div class="container-narrow">
      <div style="text-align: center; margin-bottom: 3.5rem;">
        <span class="eyebrow eyebrow-silver">CONFIDENTIAL APPLICATION</span>
        <h2>Expression of Interest</h2>
        <p>Please provide your institutional credentials below.</p>
      </div>

      <form id="professional-eoi-form" class="card-luxury" style="padding: clamp(2rem, 4vw, 3.5rem);">
        <input type="text" name="hp_field" style="display: none;" tabindex="-1" autocomplete="off">

        <div style="display: grid; grid-template-columns: 1fr; gap: 1.5rem;" class="split-destinations-grid">
          <div class="form-group">
            <label class="form-label" for="establishment-name">Establishment Name <span class="required-dot">*</span></label>
            <input type="text" id="establishment-name" class="form-input" required>
          </div>
          <div class="form-group">
            <label class="form-label" for="contact-name">Contact Person's Name <span class="required-dot">*</span></label>
            <input type="text" id="contact-name" class="form-input" required>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr; gap: 1.5rem;" class="split-destinations-grid">
          <div class="form-group">
            <label class="form-label" for="professional-role">Professional Role <span class="required-dot">*</span></label>
            <input type="text" id="professional-role" class="form-input" required>
          </div>
          <div class="form-group">
            <label class="form-label" for="establishment-type">Classification <span class="required-dot">*</span></label>
            <select id="establishment-type" class="form-select" required>
              <option value="">Select Category...</option>
              <option value="haute_salon">Haute Hair Salon</option>
              <option value="dermatology_clinic">Aesthetic Dermatology Clinic</option>
              <option value="trichology_suite">Trichology Suite</option>
              <option value="resort_spa">Luxury Resort Spa</option>
            </select>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr; gap: 1.5rem;" class="split-destinations-grid">
          <div class="form-group">
            <label class="form-label" for="business-email">Business Email <span class="required-dot">*</span></label>
            <input type="email" id="business-email" class="form-input" required>
          </div>
          <div class="form-group">
            <label class="form-label" for="business-phone">Business Telephone <span class="required-dot">*</span></label>
            <input type="tel" id="business-phone" class="form-input" required>
          </div>
        </div>

        <div class="form-group">
          <label class="form-label" for="establishment-intro">Brief Introduction</label>
          <textarea id="establishment-intro" class="form-textarea" rows="4"></textarea>
        </div>

        <div class="form-checkbox-wrapper">
          <input type="checkbox" id="eoi-consent" required>
          <label for="eoi-consent">I consent to VELARI PRIVÉ evaluating this profile in accordance with their privacy policy.</label>
        </div>

        <div id="eoi-form-status" class="form-status"></div>

        <div style="margin-top: 2.5rem;">
          <button type="submit" class="btn btn-primary" style="width: 100%;">
            Submit Expression of Interest
          </button>
        </div>
      </form>
    </div>
  </section>
</main>

<?php get_footer(); ?>
