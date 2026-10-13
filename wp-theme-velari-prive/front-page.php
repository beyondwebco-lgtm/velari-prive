<?php
/**
 * VELARI PRIVÉ — Front Page Template (Homepage 11-Section Product Reveal)
 * 
 * @package VelariPrive
 */

get_header();
$theme_uri = get_template_directory_uri();
?>

<main id="main-content">
  <!-- SECTION 01 & 02: HERO OPENING & 360° PRODUCT FILM -->
  <section class="section-hero hero-wrapper" id="anagenese" aria-label="VELARI PRIVÉ ANAGÈNESE Editorial Hero">
    <div class="hero-ambient-glow"></div>
    
    <div class="container hero-editorial-grid">
      <!-- Left Column: Editorial Typography & Copy (45%) -->
      <div class="hero-editorial-column">
        <span class="hero-eyebrow">VELARI PRIVÉ · THE FLAGSHIP</span>
        <h1 class="hero-title">ANAGÈNESE</h1>
        <p class="hero-headline">The Art of Scalp Care.</p>
        <p class="hero-body">
          A considered daily ritual. A refined approach to scalp and hair care, shaped by formulation intent and quiet precision.
        </p>

        <div class="hero-cta-group">
          <a href="#craft-object" class="hero-primary-cta" data-track-discovery>
            DISCOVER THE ELIXIR
          </a>
          <a href="<?php echo esc_url(home_url('/the-house/')); ?>" class="hero-secondary-link">
            THE VELARI PRIVÉ ETHOS &rarr;
          </a>
        </div>
      </div>

      <!-- Right Column: Product Film (55%) -->
      <div class="hero-film-column">
        <div class="hero-film-container">
          <video 
            class="hero-film-video"
            autoplay 
            muted 
            loop 
            playsinline 
            preload="auto"
            poster="<?php echo esc_url($theme_uri . '/assets/images/anagenese-hero-bottle.jpg'); ?>"
            aria-label="ANAGÈNESE luxury elixir film featuring obsidian glass bottle and brushed silver pipette"
          >
            <source src="<?php echo esc_url($theme_uri . '/assets/videos/anagenese-hero.mp4'); ?>" type="video/mp4">
            <img 
              src="<?php echo esc_url($theme_uri . '/assets/images/anagenese-hero-bottle.jpg'); ?>" 
              alt="ANAGÈNESE by VELARI PRIVÉ obsidian glass bottle with brushed silver dropper cap" 
              class="hero-film-fallback"
              width="1200"
              height="896"
            >
          </video>
          <img 
            src="<?php echo esc_url($theme_uri . '/assets/images/anagenese-hero-bottle.jpg'); ?>" 
            alt="ANAGÈNESE by VELARI PRIVÉ obsidian glass bottle with brushed silver dropper cap" 
            class="hero-film-fallback-layer" 
            aria-hidden="true"
            loading="lazy"
            width="1200"
            height="896"
          >
        </div>
      </div>
    </div>
  </section>

  <!-- SECTION 03: THE HOUSE PHILOSOPHY -->
  <section class="section section-philosophy" id="house-philosophy">
    <div class="container">
      <div class="philosophy-grid">
        <div>
          <span class="eyebrow eyebrow-silver">THE VELARI PRIVÉ ETHOS</span>
          <h2 class="philosophy-statement">
            Beauty without compromise. Science communicated with <em>intelligence and restraint</em>.
          </h2>
          <p>
            VELARI PRIVÉ was conceived not merely to participate in luxury beauty, but to recalibrate expectations of hair and scalp care. We believe that true luxury lies in formulation rigour, intentional ingredient selection, and discretion.
          </p>
          <p>
            Our formulation vision is Australian-led, inspired by resilient botanical ecologies and examined under rigorous scientific criteria. Production is executed in state-of-the-art controlled cleanroom environments in India, uniting cross-continental expertise with strict quality governance.
          </p>
          <a href="<?php echo esc_url(home_url('/the-house/')); ?>" class="btn-editorial-link">
            Explore The House Philosophy
            <svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>
            </svg>
          </a>
        </div>

        <div class="pillar-list">
          <div class="pillar-item">
            <span class="pillar-num">01</span>
            <div>
              <h3 class="pillar-title">Purposeful Formulation</h3>
              <p class="pillar-desc">Every element exists with anatomical intent. We abstain from superfluous fillers, artificial dyes, and aggressive chemical surfactants.</p>
            </div>
          </div>
          <div class="pillar-item">
            <span class="pillar-num">02</span>
            <div>
              <h3 class="pillar-title">Dermaceutical Scalp Matrix</h3>
              <p class="pillar-desc">Treating the scalp as delicate, living skin requiring micro-nourishment, lipid balance, and follicular vitality.</p>
            </div>
          </div>
          <div class="pillar-item">
            <span class="pillar-num">03</span>
            <div>
              <h3 class="pillar-title">Discretion & Selective Access</h3>
              <p class="pillar-desc">Distributed exclusively through curated professional destinations, bespoke dermatology suites, and private discovery.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- SECTION 04: THE PRODUCT AS AN OBJECT OF CRAFT -->
  <section class="section section-craft" id="craft-object">
    <div class="container">
      <div class="craft-layout">
        <div class="craft-image-frame">
          <img 
            src="<?php echo esc_url($theme_uri . '/assets/images/packaging-craft-detail.jpg'); ?>" 
            alt="Velari Privé velvet-lined presentation coffret box and Anagènese black bottle"
            loading="lazy"
            width="600"
            height="450"
          >
        </div>

        <div>
          <span class="eyebrow eyebrow-silver">METALLURGY & GLASSMAKING</span>
          <h2>An Object of Tactile Craft</h2>
          <p class="lead">
            Conceived as an heirloom object before a single droplet is dispensed.
          </p>
          <p>
            ANAGÈNESE is housed in thick, UV-protective obsidian black glass engineered to shield light-sensitive bio-actives. The weighted cap and graduated pipette collar are crafted in brushed silver, balancing precision dosage with substantial, tactile presence.
          </p>

          <div class="craft-specs-grid">
            <div class="craft-spec-box">
              <div class="craft-spec-title">Vessel Material</div>
              <div class="craft-spec-val">UV-Filtering Obsidian Glass</div>
            </div>
            <div class="craft-spec-box">
              <div class="craft-spec-title">Closure Collar</div>
              <div class="craft-spec-val">Machined Brushed Silver</div>
            </div>
            <div class="craft-spec-box">
              <div class="craft-spec-title">Dispensing Pipette</div>
              <div class="craft-spec-val">Graduated 1.0ml Borosilicate</div>
            </div>
            <div class="craft-spec-box">
              <div class="craft-spec-title">Packaging Coffret</div>
              <div class="craft-spec-val">Velvet-Cradled Rigid Box</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- SECTION 05: THE ANAGÈNESE RITUAL -->
  <section class="section section-ritual-preview" id="ritual-preview">
    <div class="container">
      <div style="text-align: center; max-width: 680px; margin: 0 auto 3rem;">
        <span class="eyebrow eyebrow-silver">DAILY APPLICATION PROTOCOL</span>
        <h2>A Considered Personal Ritual</h2>
        <p>
          ANAGÈNESE is formulated to integrate seamlessly into morning or evening hair care rituals without residue, greasiness, or weight.
        </p>
      </div>

      <div class="ritual-steps-grid">
        <div class="ritual-step-card">
          <span class="step-number">01</span>
          <span class="step-phase">PREPARATION</span>
          <h3 class="step-title">Cleanse & Part</h3>
          <p class="step-desc">Section dry or towel-damp hair along the natural crown line. Ensure scalp surface is receptive and unburdened by heavy styling polymers.</p>
        </div>

        <div class="ritual-step-card">
          <span class="step-number">02</span>
          <span class="step-phase">PRECISION DOSAGE</span>
          <h3 class="step-title">Pipette Draw</h3>
          <p class="step-desc">Draw exactly 1.0ml of the crystal-clear elixir using the graduated silver pipette. The formula delivers concentrated micronutrients in measured drops.</p>
        </div>

        <div class="ritual-step-card">
          <span class="step-number">03</span>
          <span class="step-phase">DISTRIBUTION</span>
          <h3 class="step-title">Direct Micro-Droplets</h3>
          <p class="step-desc">Release targeted micro-droplets along parted sections directly onto the scalp surface, concentrating on the hairline, crown, and areas of focus.</p>
        </div>

        <div class="ritual-step-card">
          <span class="step-number">04</span>
          <span class="step-phase">ACTIVATION</span>
          <h3 class="step-title">Acupressure Motion</h3>
          <p class="step-desc">Gently press fingertips in circular motions for 90 seconds. The elixir absorbs immediately without altering hair volume or texture.</p>
        </div>
      </div>

      <div style="text-align: center; margin-top: 3.5rem;">
        <a href="<?php echo esc_url(home_url('/the-ritual/')); ?>" class="btn btn-secondary">
          View Complete Ritual & Etiquette Guide
        </a>
      </div>
    </div>
  </section>

  <!-- SECTION 06: FASHION HAIR SEQUENCE -->
  <section class="section section-hair-sequence" id="hair-sequence">
    <div class="container">
      <div class="hair-editorial-wrapper">
        <div class="hair-media-frame">
          <img 
            src="<?php echo esc_url($theme_uri . '/assets/images/hair-editorial-movement.jpg'); ?>" 
            alt="High-fashion hair movement editorial with natural fiber shine and volume"
            loading="lazy"
            width="640"
            height="480"
          >
        </div>

        <div class="hair-quote-card">
          <span class="eyebrow eyebrow-silver">EDITORIAL PERSPECTIVE</span>
          <blockquote class="hair-quote-quote">
            “Hair is living sculpture in perpetual motion. True health is perceived in natural fluidity, tensile resilience, and authentic fiber sheen.”
          </blockquote>
          <p>
            We decline the artificial illusion of temporary silicone coatings. ANAGÈNESE acts at the follicular root and hair fiber interface to cultivate lasting vitality, weightless bounce, and scalp comfort.
          </p>
          <div style="display: flex; gap: 2rem; margin-top: 2rem; border-top: 1px solid rgba(220, 220, 235, 0.08); padding-top: 1.5rem;">
            <div>
              <strong style="display:block; font-family: var(--font-serif); font-size: 1.2rem; color: #FFF;">Weightless</strong>
              <span style="font-size: 0.76rem; color: var(--color-silver-muted);">Non-greasy rapid dry-down</span>
            </div>
            <div>
              <strong style="display:block; font-family: var(--font-serif); font-size: 1.2rem; color: #FFF;">Clean Finish</strong>
              <span style="font-size: 0.76rem; color: var(--color-silver-muted);">No residue on pillow or styling</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- SECTION 07: THE SCIENCE CONNECTION -->
  <section class="section section-science-bridge" id="the-science">
    <div class="container">
      <div class="science-bridge-container">
        <img src="<?php echo esc_url($theme_uri . '/assets/images/anagenese-seal.svg'); ?>" alt="36AUS BIOTECH and Velari Privé scientific seal" class="science-seal-img">
        <span class="eyebrow eyebrow-silver">CONNECTED SCIENTIFIC PLATFORM</span>
        <h2 class="science-quote">
          “Considered in formulation. Examined with rigour.”
        </h2>
        <p class="science-explanation">
          Ingredient selection, bio-active compatibility, cleanroom manufacturing, and analytical verification are distinct chapters in our development journey. Detailed cellular research, botanical profiling, and supplier certifications are hosted transparently on our companion scientific platform.
        </p>

        <div class="science-pathway-box">
          <div>
            <div style="font-family: var(--font-serif); font-size: 1.15rem; color: #FFFFFF; margin-bottom: 0.25rem;">
              36AUS BIOTECH Research Archive
            </div>
            <div style="font-size: 0.8rem; color: var(--color-silver-muted);">
              Independent botanical assays, safety parameters & manufacturing protocols
            </div>
          </div>
          <button type="button" class="btn btn-secondary" data-trigger-science-modal>
            Access 36ausbiotech.com
          </button>
        </div>
      </div>
    </div>
  </section>

  <!-- SECTION 08: THE JOURNAL -->
  <section class="section section-journal-spotlight" id="journal">
    <div class="container">
      <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 2.5rem; flex-wrap: wrap; gap: 1rem;">
        <div>
          <span class="eyebrow eyebrow-silver">THE EDITORIAL JOURNAL</span>
          <h2>Notes on Formulation & Beauty</h2>
        </div>
        <a href="<?php echo esc_url(home_url('/journal/')); ?>" class="btn-editorial-link">
          Explore All Editions
          <svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>
          </svg>
        </a>
      </div>

      <div class="journal-cards-grid">
        <article class="journal-card">
          <div class="journal-card-thumb">
            <img src="<?php echo esc_url($theme_uri . '/assets/images/pipette-serum-macro.jpg'); ?>" alt="Macro drop of Anagènese serum on pipette" loading="lazy">
          </div>
          <div class="journal-card-body">
            <span class="journal-meta">FOLIO I • INGREDIENT LITERACY</span>
            <h3 class="journal-title">The Follicular Microclimate</h3>
            <p class="journal-excerpt">Understanding the delicate sebum balance and capillary nourishment required for enduring scalp vitality.</p>
            <a href="<?php echo esc_url(home_url('/journal/')); ?>" class="btn-editorial-link">Read Folio</a>
          </div>
        </article>

        <article class="journal-card">
          <div class="journal-card-thumb">
            <img src="<?php echo esc_url($theme_uri . '/assets/images/packaging-craft-detail.jpg'); ?>" alt="Anagènese bottle within custom velvet coffret" loading="lazy">
          </div>
          <div class="journal-card-body">
            <span class="journal-meta">FOLIO II • CRAFT & METALLURGY</span>
            <h3 class="journal-title">The Geometry of Obsidian Glass</h3>
            <p class="journal-excerpt">Why photochemical protection in ultra-dense black glass preserves bioactive potency over shelf longevity.</p>
            <a href="<?php echo esc_url(home_url('/journal/')); ?>" class="btn-editorial-link">Read Folio</a>
          </div>
        </article>

        <article class="journal-card">
          <div class="journal-card-thumb">
            <img src="<?php echo esc_url($theme_uri . '/assets/images/hair-editorial-movement.jpg'); ?>" alt="Editorial model hair movement in studio light" loading="lazy">
          </div>
          <div class="journal-card-body">
            <span class="journal-meta">FOLIO III • RITUAL ETIQUETTE</span>
            <h3 class="journal-title">A Symphony of Touch</h3>
            <p class="journal-excerpt">The physiology of micro-acupressure: How mechanical fingertip stimulation enhances dermal absorption.</p>
            <a href="<?php echo esc_url(home_url('/journal/')); ?>" class="btn-editorial-link">Read Folio</a>
          </div>
        </article>
      </div>
    </div>
  </section>

  <!-- SECTION 09 & 10: PROFESSIONAL & PRIVATE DISCOVERY -->
  <section class="section section-destinations-split" id="destinations-split">
    <div class="container">
      <div class="split-destinations-grid">
        <div class="destination-panel">
          <div>
            <span class="eyebrow eyebrow-silver">EXCLUSIVE PROFESSIONAL NETWORK</span>
            <h3 style="font-size: 1.85rem; color: #FFF; margin-bottom: 1rem;">Founding Destinations</h3>
            <p>
              VELARI PRIVÉ partners with an invitation-led constellation of premier hair ateliers, trichology suites, aesthetic dermatology clinics, and luxury hospitality destinations.
            </p>
          </div>
          <div style="margin-top: 2rem;">
            <a href="<?php echo esc_url(home_url('/professional/')); ?>" class="btn btn-secondary" style="width: 100%;">
              Express Interest in Destination Status
            </a>
          </div>
        </div>

        <div class="destination-panel">
          <div>
            <span class="eyebrow eyebrow-silver">DISCREET CONCIERGE</span>
            <h3 style="font-size: 1.85rem; color: #FFF; margin-bottom: 1rem;">Private Discovery</h3>
            <p>
              A confidential introduction service established for high-profile cinema, media, and private patrons requiring absolute discretion, private formulation guidance, and bespoke delivery.
            </p>
          </div>
          <div style="margin-top: 2rem;">
            <a href="<?php echo esc_url(home_url('/private-discovery/')); ?>" class="btn btn-primary" style="width: 100%;">
              Enquire Privately
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</main>

<?php get_footer(); ?>
