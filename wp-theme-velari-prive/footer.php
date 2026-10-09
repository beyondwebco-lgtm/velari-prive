<?php
/**
 * VELARI PRIVÉ — Footer Template
 * 
 * @package VelariPrive
 */
?>
<footer class="site-footer" role="contentinfo">
  <div class="container">
    <div class="footer-top">
      <div class="footer-brand">
        <div class="brand-title">VELARI PRIVÉ</div>
        <div class="brand-sub">Haute Beauté Dermaceutique</div>
        <p class="footer-desc">
          An international luxury house celebrating considered beauty, Australian-led formulation vision, and meticulous precision manufacturing.
        </p>
        <div style="margin-top: 1.25rem;">
          <span class="badge-silver">Melbourne • Bombay</span>
        </div>
      </div>

      <div>
        <div class="footer-heading">The Flagship</div>
        <nav class="footer-nav">
          <a href="<?php echo esc_url(home_url('/#anagenese')); ?>">ANAGÈNESE</a>
          <a href="<?php echo esc_url(home_url('/the-house/')); ?>">The House</a>
          <a href="<?php echo esc_url(home_url('/the-ritual/')); ?>">The Ritual</a>
          <a href="<?php echo esc_url(home_url('/journal/')); ?>">Journal</a>
          <a href="<?php echo esc_url(home_url('/professional/')); ?>">Professional</a>
          <a href="<?php echo esc_url(home_url('/private-discovery/')); ?>">Private Discovery</a>
        </nav>
      </div>

      <div>
        <div class="footer-heading">Governance</div>
        <nav class="footer-nav">
          <a href="<?php echo esc_url(home_url('/the-house/#craft')); ?>">Craft & Metallurgy</a>
          <a href="<?php echo esc_url(home_url('/the-house/#manufacturing')); ?>">Formulation Ethics</a>
          <a href="<?php echo esc_url(home_url('/privacy-policy/')); ?>">Privacy Notice</a>
          <a href="<?php echo esc_url(home_url('/terms/')); ?>">Terms & Conditions</a>
          <a href="mailto:concierge@velariprive.au">Direct Enquiry</a>
        </nav>
      </div>

      <div>
        <div class="footer-heading">Scientific Companion</div>
        <div class="footer-science-card">
          <p>
            In-depth botanical profiling, bio-active analytical data, and cleanroom validation are hosted independently.
          </p>
          <button type="button" class="btn-editorial-link" data-trigger-science-modal>
            Visit 36AUS BIOTECH
            <svg viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1.5 8.5L8.5 1.5M8.5 1.5H3.5M8.5 1.5V6.5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
            </svg>
          </button>
        </div>
      </div>
    </div>

    <div class="footer-bottom">
      <div>
        &copy; <?php echo date('Y'); ?> VELARI PRIVÉ. All rights reserved. Australian English release.
      </div>
      <div class="footer-credits-note">
        Digital Flagship by Beyond Webco • Fixed Launch Release
      </div>
    </div>
  </div>
</footer>

<!-- 36AUS BIOTECH SCIENTIFIC BRIDGE MODAL -->
<div class="modal-backdrop" id="science-bridge-modal" role="dialog" aria-modal="true" aria-labelledby="wp-science-modal-title">
  <div class="modal-dialog">
    <button class="modal-close-btn" data-close-science-modal aria-label="Close scientific bridge modal">
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 1L13 13M1 13L13 1" stroke="currentColor" stroke-width="1.5"/></svg>
    </button>
    <span class="eyebrow eyebrow-silver">CROSS-DOMAIN SCIENTIFIC REPOSITORY</span>
    <h3 id="wp-science-modal-title" style="margin-bottom: 1rem; color: #FFFFFF;">Proceeding to 36AUS BIOTECH</h3>
    <p>You are navigating from the VELARI PRIVÉ luxury flagship to our connected scientific platform at <strong>36ausbiotech.com</strong>.</p>
    <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid var(--color-silver-border); padding: 1.25rem; border-radius: var(--radius-xs); margin: 1.5rem 0;">
      <div style="font-family: var(--font-serif); font-size: 1.1rem; color: var(--color-silver-bright); margin-bottom: 0.35rem;">What to expect on 36ausbiotech.com:</div>
      <ul style="font-size: 0.82rem; color: var(--color-text-secondary); line-height: 1.7; padding-left: 1.25rem; list-style-type: disc;">
        <li>Independent botanical matrix assays & active compound concentrations</li>
        <li>Cleanroom manufacturing parameters & batch verification</li>
        <li>Transparent separation between supplier ingredients and finished product testing</li>
      </ul>
    </div>
    <div style="display: flex; gap: 1rem; justify-content: flex-end; flex-wrap: wrap;">
      <button type="button" class="btn btn-secondary" data-close-science-modal>Return to Flagship</button>
      <a href="https://36ausbiotech.com/" target="_blank" rel="noopener noreferrer" class="btn btn-primary">Continue to 36AUS BIOTECH</a>
    </div>
  </div>
</div>

<?php wp_footer(); ?>
</body>
</html>
