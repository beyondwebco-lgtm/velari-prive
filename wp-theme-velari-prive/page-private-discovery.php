<?php
/**
 * Template Name: Private Discovery
 * 
 * @package VelariPrive
 */

get_header();
?>

<main id="main-content">
  <section class="section" style="padding-top: calc(var(--header-height) + 4rem); background: radial-gradient(circle at 50% 30%, #171725 0%, #060608 85%); text-align: center;">
    <div class="container-narrow">
      <span class="eyebrow eyebrow-silver">DISCRETION & PRIVACY</span>
      <h1 style="font-size: clamp(2.4rem, 5vw, 4.4rem); margin-bottom: 1.25rem;">Private Discovery</h1>
      <p class="lead" style="max-width: 600px; margin: 0 auto 3rem;">
        A sanctuary reserved for international cinema, cultural figures, and private patrons requiring uncompromised discretion and bespoke liaison.
      </p>
    </div>
  </section>

  <section class="section" style="background-color: var(--color-obsidian); padding-top: 0;">
    <div class="container-narrow">
      <div class="card-luxury" style="margin-bottom: 3.5rem; border-color: rgba(220, 220, 240, 0.25);">
        <span class="eyebrow eyebrow-silver">PHYSICAL INVITATION HOLDER</span>
        <h2 style="font-size: 1.5rem; color: #FFF; margin-bottom: 0.5rem;">Have you received a Private Invitation Card or QR Pass?</h2>
        <p style="font-size: 0.85rem; margin-bottom: 1.5rem;">
          Patrons who possess an authentic VELARI PRIVÉ wax-sealed card may enter their private passkey for priority concierge handling.
        </p>

        <form id="passkey-validation-form" style="display: flex; gap: 1rem; flex-wrap: wrap;">
          <input type="text" id="passkey-input" class="form-input" style="flex: 1; min-width: 220px;" placeholder="e.g. VP-MEL-7789 or PASSKEY" required>
          <button type="submit" class="btn btn-primary">Verify Passkey</button>
        </form>
        <div id="passkey-status" class="form-status" style="margin-top: 1rem;"></div>
      </div>

      <div class="card-luxury" style="padding: clamp(2rem, 4vw, 3.5rem);">
        <span class="eyebrow eyebrow-silver">DIRECT CONCIERGE CONTACT</span>
        <h2 style="font-size: 1.75rem; color: #FFF; margin-bottom: 1rem;">Private Introduction Request</h2>
        <form id="private-page-enquiry-form">
          <div class="form-group">
            <label class="form-label" for="vip-name">Preferred Name or Appointed Liaison <span class="required-dot">*</span></label>
            <input type="text" id="vip-name" class="form-input" required>
          </div>
          <div class="form-group">
            <label class="form-label" for="vip-channel">Confidential Communication Channel <span class="required-dot">*</span></label>
            <input type="email" id="vip-channel" class="form-input" required>
          </div>
          <div class="form-group">
            <label class="form-label" for="vip-requirements">Specific Requests or Dispatch Preferences</label>
            <textarea id="vip-requirements" class="form-textarea" rows="4"></textarea>
          </div>
          <div class="form-checkbox-wrapper">
            <input type="checkbox" id="vip-consent" required>
            <label for="vip-consent">I understand that VELARI PRIVÉ operates under strict non-disclosure.</label>
          </div>
          <div id="vip-form-status" class="form-status"></div>
          <div style="margin-top: 2.5rem;">
            <button type="submit" class="btn btn-primary" style="width: 100%;">
              Submit Private Introduction
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>
</main>

<?php get_footer(); ?>
