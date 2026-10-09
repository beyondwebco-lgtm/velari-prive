<?php
/**
 * VELARI PRIVÉ — Header Template
 * 
 * @package VelariPrive
 */
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
  <meta charset="<?php bloginfo('charset'); ?>">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="icon" type="image/svg+xml" href="<?php echo esc_url(get_template_directory_uri() . '/assets/favicon.svg'); ?>">
  <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<header class="site-header" role="banner">
  <div class="container header-inner">
    <a href="<?php echo esc_url(home_url('/')); ?>" class="brand-wordmark" aria-label="VELARI PRIVÉ Home">
      <span class="brand-title">VELARI PRIVÉ</span>
      <span class="brand-sub">Haute Beauté Dermaceutique</span>
    </a>

    <!-- Desktop Navigation -->
    <nav class="desktop-nav" role="navigation" aria-label="<?php esc_attr_e('Main Navigation', 'velari-prive'); ?>">
      <a href="<?php echo esc_url(home_url('/#anagenese')); ?>" class="nav-link">ANAGÈNESE</a>
      <a href="<?php echo esc_url(home_url('/the-house/')); ?>" class="nav-link">THE HOUSE</a>
      <a href="<?php echo esc_url(home_url('/the-ritual/')); ?>" class="nav-link">THE RITUAL</a>
      <a href="<?php echo esc_url(home_url('/journal/')); ?>" class="nav-link">JOURNAL</a>
      <a href="<?php echo esc_url(home_url('/professional/')); ?>" class="nav-link">PROFESSIONAL</a>
      <button type="button" class="nav-link nav-link-science" data-trigger-science-modal>
        THE SCIENCE
        <svg viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1.5 8.5L8.5 1.5M8.5 1.5H3.5M8.5 1.5V6.5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
        </svg>
      </button>
    </nav>

    <div class="header-actions">
      <a href="<?php echo esc_url(home_url('/private-discovery/')); ?>" class="btn-private-discovery-link">
        PRIVATE DISCOVERY
      </a>
      <button class="mobile-nav-toggle" aria-label="Toggle navigation drawer" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
    </div>
  </div>
</header>

<!-- Mobile Navigation Drawer -->
<div class="mobile-nav-backdrop"></div>
<aside class="mobile-nav-drawer" role="dialog" aria-modal="true" aria-label="Mobile Navigation">
  <div class="mobile-nav-list">
    <a href="<?php echo esc_url(home_url('/')); ?>" class="mobile-nav-link">Home</a>
    <a href="<?php echo esc_url(home_url('/#anagenese')); ?>" class="mobile-nav-link">ANAGÈNESE</a>
    <a href="<?php echo esc_url(home_url('/the-house/')); ?>" class="mobile-nav-link">The House</a>
    <a href="<?php echo esc_url(home_url('/the-ritual/')); ?>" class="mobile-nav-link">The Ritual</a>
    <a href="<?php echo esc_url(home_url('/journal/')); ?>" class="mobile-nav-link">Journal</a>
    <a href="<?php echo esc_url(home_url('/professional/')); ?>" class="mobile-nav-link">Professional</a>
    <a href="#" class="mobile-nav-link" data-trigger-science-modal>The Science (36AUS)</a>
    <a href="<?php echo esc_url(home_url('/private-discovery/')); ?>" class="mobile-nav-link">Private Discovery</a>
  </div>
  <div class="mobile-nav-footer">
    <p>VELARI PRIVÉ • MELBOURNE & BOMBAY</p>
    <p style="color: var(--color-silver-muted); font-size: 0.72rem;">Curated Professional Distribution</p>
  </div>
</aside>
