/**
 * VELARI PRIVÉ — Digital Flagship Core Logic
 * Architectural Script: Navigation, Analytics Hooks, Modals, Forms
 */

(function () {
  'use strict';

  // --- ANALYTICS EVENT HOOK (GA4 / GTM / Meta Pixel Ready) ---
  window.velariTrackEvent = function (eventName, eventParams = {}) {
    // Sanitise: Never send PII (names, emails, phone numbers)
    const sanitizedParams = {
      event_category: 'velari_flagship',
      brand: 'VELARI PRIVÉ',
      product: 'ANAGÈNESE',
      timestamp: new Date().toISOString(),
      ...eventParams
    };
    delete sanitizedParams.name;
    delete sanitizedParams.email;
    delete sanitizedParams.phone;
    delete sanitizedParams.applicant_name;

    // GA4 dataLayer push
    if (window.dataLayer && Array.isArray(window.dataLayer)) {
      window.dataLayer.push({
        event: eventName,
        ...sanitizedParams
      });
    }

    // Console logging for verification in dev
    console.log(`[VELARI ANALYTICS EVENT]: ${eventName}`, sanitizedParams);
  };

  document.addEventListener('DOMContentLoaded', function () {
    // 1. SCROLL HEADER STATE
    const header = document.querySelector('.site-header');
    if (header) {
      const handleScroll = () => {
        if (window.scrollY > 40) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      };
      window.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll();
    }

    // 2. MOBILE NAVIGATION DRAWER
    const mobileToggle = document.querySelector('.mobile-nav-toggle');
    const mobileDrawer = document.querySelector('.mobile-nav-drawer');
    const mobileBackdrop = document.querySelector('.mobile-nav-backdrop');

    function toggleMobileNav(open) {
      const isOpen = open !== undefined ? open : !mobileDrawer?.classList.contains('open');
      if (mobileToggle) {
        mobileToggle.classList.toggle('open', isOpen);
        mobileToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      }
      if (mobileDrawer) {
        mobileDrawer.classList.toggle('open', isOpen);
      }
      if (mobileBackdrop) {
        mobileBackdrop.classList.toggle('open', isOpen);
      }
      document.body.style.overflow = isOpen ? 'hidden' : '';
    }

    if (mobileToggle) {
      mobileToggle.addEventListener('click', () => toggleMobileNav());
    }

    if (mobileBackdrop) {
      mobileBackdrop.addEventListener('click', () => toggleMobileNav(false));
    }

    document.querySelectorAll('.mobile-nav-link').forEach((link) => {
      link.addEventListener('click', () => toggleMobileNav(false));
    });

    // 3. SCIENTIFIC MODAL BRIDGE (36AUS BIOTECH)
    const scienceModal = document.getElementById('science-bridge-modal');
    const scienceTriggers = document.querySelectorAll('[data-trigger-science-modal]');
    const closeScienceBtns = document.querySelectorAll('[data-close-science-modal]');

    function openScienceModal(e) {
      if (e) e.preventDefault();
      if (scienceModal) {
        scienceModal.classList.add('open');
        document.body.style.overflow = 'hidden';
        window.velariTrackEvent('science_navigation_click', {
          destination_domain: '36ausbiotech.com',
          trigger_location: e?.target?.dataset?.location || 'nav'
        });
      }
    }

    function closeScienceModal() {
      if (scienceModal) {
        scienceModal.classList.remove('open');
        document.body.style.overflow = '';
      }
    }

    scienceTriggers.forEach((btn) => btn.addEventListener('click', openScienceModal));
    closeScienceBtns.forEach((btn) => btn.addEventListener('click', closeScienceModal));

    if (scienceModal) {
      scienceModal.addEventListener('click', function (e) {
        if (e.target === scienceModal) closeScienceModal();
      });
    }

    // 4. PRIVATE DISCOVERY MODAL
    const discoveryModal = document.getElementById('private-discovery-modal');
    const discoveryTriggers = document.querySelectorAll('[data-trigger-discovery-modal]');
    const closeDiscoveryBtns = document.querySelectorAll('[data-close-discovery-modal]');

    function openDiscoveryModal(e) {
      if (e) e.preventDefault();
      if (discoveryModal) {
        discoveryModal.classList.add('open');
        document.body.style.overflow = 'hidden';
        window.velariTrackEvent('private_discovery_opened', {
          entry_point: e?.target?.dataset?.entry || 'header_button'
        });
      }
    }

    function closeDiscoveryModal() {
      if (discoveryModal) {
        discoveryModal.classList.remove('open');
        document.body.style.overflow = '';
      }
    }

    discoveryTriggers.forEach((btn) => btn.addEventListener('click', openDiscoveryModal));
    closeDiscoveryBtns.forEach((btn) => btn.addEventListener('click', closeDiscoveryModal));

    if (discoveryModal) {
      discoveryModal.addEventListener('click', function (e) {
        if (e.target === discoveryModal) closeDiscoveryModal();
      });
    }

    // Close modals on Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        closeScienceModal();
        closeDiscoveryModal();
        toggleMobileNav(false);
      }
    });

    // 5. PROFESSIONAL EOI FORM HANDLER
    const professionalForm = document.getElementById('professional-eoi-form');
    if (professionalForm) {
      // Track input start
      let formStarted = false;
      professionalForm.addEventListener('focusin', () => {
        if (!formStarted) {
          formStarted = true;
          window.velariTrackEvent('professional_enquiry_start');
        }
      });

      professionalForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const statusBox = document.getElementById('eoi-form-status');
        const submitBtn = professionalForm.querySelector('button[type="submit"]');

        // Validation
        const requiredFields = professionalForm.querySelectorAll('[required]');
        let valid = true;
        requiredFields.forEach((field) => {
          if (!field.value.trim() || (field.type === 'checkbox' && !field.checked)) {
            valid = false;
            field.classList.add('error');
          } else {
            field.classList.remove('error');
          }
        });

        if (!valid) {
          if (statusBox) {
            statusBox.className = 'form-status error';
            statusBox.textContent = 'Please complete all required fields and accept the privacy notice.';
          }
          return;
        }

        // Simulate secure submission
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.textContent = 'Transmitting Privately...';
        }

        setTimeout(() => {
          if (statusBox) {
            statusBox.className = 'form-status success';
            statusBox.innerHTML = '<strong>Enquiry Transmitted Privately.</strong><br>Thank you. Your Expression of Interest has been received by the VELARI PRIVÉ Directorship. A senior representative will review your profile with discretion.';
          }
          professionalForm.reset();
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Submit Expression of Interest';
          }

          window.velariTrackEvent('professional_enquiry_submit', {
            status: 'success'
          });
        }, 1200);
      });
    }

    // 6. PRIVATE CONCIERGE FORM HANDLER
    const conciergeForm = document.getElementById('concierge-enquiry-form');
    if (conciergeForm) {
      conciergeForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const statusBox = document.getElementById('concierge-form-status');
        const submitBtn = conciergeForm.querySelector('button[type="submit"]');

        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.textContent = 'Transmitting Securely...';
        }

        setTimeout(() => {
          if (statusBox) {
            statusBox.className = 'form-status success';
            statusBox.innerHTML = '<strong>Private Introduction Lodged.</strong><br>Your request has been dispatched directly to the Velari Privé Private Client Concierge. All correspondence remains strictly confidential.';
          }
          conciergeForm.reset();
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Submit Private Enquiry';
          }

          window.velariTrackEvent('private_discovery_submit', {
            status: 'success'
          });
        }, 1000);
      });
    }

    // 7. TRACK PRODUCT DISCOVERY CLICKS
    document.querySelectorAll('[data-track-discovery]').forEach((btn) => {
      btn.addEventListener('click', () => {
        window.velariTrackEvent('product_discovery_click', {
          target: btn.getAttribute('href') || 'product_view'
        });
      });
    });

    // 8. 360° HERO FILM AUTOPLAY & GRACEFUL FALLBACK
    const heroFilmVideo = document.querySelector('.hero-film-video');
    const heroFallbackLayer = document.querySelector('.hero-film-fallback-layer');
    if (heroFilmVideo) {
      const startAutoplay = function () {
        const promise = heroFilmVideo.play();
        if (promise !== undefined) {
          promise.catch(function () {
            // If browser blocks autoplay, activate graceful fallback image layer
            if (heroFallbackLayer) heroFallbackLayer.classList.add('visible');
          });
        }
      };

      heroFilmVideo.addEventListener('error', function () {
        if (heroFallbackLayer) heroFallbackLayer.classList.add('visible');
      });

      heroFilmVideo.addEventListener('playing', function () {
        if (heroFallbackLayer) heroFallbackLayer.classList.remove('visible');
      });

      startAutoplay();
    }

    // 9. CINEMATIC FULL-SCREEN VIDEO HERO WITH SCROLL-DRIVEN SHRINK TRANSITION
    function initHeroScrollCinematic() {
      const track = document.querySelector('.hero-scroll-track');
      const stage = document.querySelector('.hero-sticky-stage');
      const frame = document.querySelector('.hero-cinematic-frame');
      const target = document.querySelector('.hero-film-target');
      const cue = document.querySelector('.hero-scroll-cue');

      if (!track || !stage || !frame || !target) return;

      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
      if (prefersReducedMotion.matches) {
        document.documentElement.classList.add('hero-reduced-motion');
        return;
      }

      document.documentElement.classList.add('hero-scroll-enabled');

      // Staggered threshold configurations for editorial typography
      const textElements = [
        { el: stage.querySelector('.hero-eyebrow'), start: 0.15, end: 0.52 },
        { el: stage.querySelector('.hero-title'), start: 0.22, end: 0.60 },
        { el: stage.querySelector('.hero-headline'), start: 0.28, end: 0.68 },
        { el: stage.querySelector('.hero-body'), start: 0.36, end: 0.76 },
        { el: stage.querySelector('.hero-cta-group'), start: 0.44, end: 0.84 }
      ].filter(item => item.el !== null);

      let stageRect = { left: 0, top: 0, width: window.innerWidth, height: window.innerHeight };
      let targetX = 0;
      let targetY = 0;
      let targetW = 0;
      let targetH = 0;
      let maxScroll = 1;
      let isTicking = false;

      function measure() {
        const sRect = stage.getBoundingClientRect();
        const tRect = target.getBoundingClientRect();

        stageRect = {
          left: sRect.left,
          top: sRect.top,
          width: stage.offsetWidth || window.innerWidth,
          height: stage.offsetHeight || window.innerHeight
        };

        targetX = tRect.left - sRect.left;
        targetY = tRect.top - sRect.top;
        targetW = tRect.width;
        targetH = tRect.height;

        maxScroll = Math.max(1, track.offsetHeight - window.innerHeight);
      }

      function smoothstep(min, max, value) {
        const x = Math.max(0, Math.min(1, (value - min) / (max - min)));
        return x * x * (3 - 2 * x);
      }

      function easeInOutCubic(x) {
        return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
      }

      let lastAppliedT = -1;

      function applyFrameTransform(t) {
        const easedT = easeInOutCubic(t);

        const curX = targetX * easedT;
        const curY = targetY * easedT;
        const curW = stageRect.width + (targetW - stageRect.width) * easedT;
        const curH = stageRect.height + (targetH - stageRect.height) * easedT;
        const curRadius = 4 * easedT;
        const curShadowAlpha = 0.45 * easedT;
        const curBorderAlpha = 0.12 * easedT;

        frame.style.transform = `translate3d(${curX.toFixed(2)}px, ${curY.toFixed(2)}px, 0)`;
        frame.style.width = `${curW.toFixed(2)}px`;
        frame.style.height = `${curH.toFixed(2)}px`;
        frame.style.borderRadius = `${curRadius.toFixed(2)}px`;
        frame.style.boxShadow = curShadowAlpha > 0.01 
          ? `0 24px 60px -12px rgba(0, 0, 0, ${curShadowAlpha.toFixed(3)})` 
          : 'none';
        frame.style.borderColor = curBorderAlpha > 0.01 
          ? `rgba(242, 239, 233, ${curBorderAlpha.toFixed(3)})` 
          : 'transparent';

        textElements.forEach(item => {
          const itemProgress = smoothstep(item.start, item.end, t);
          const translateY = (1 - itemProgress) * 16;
          item.el.style.opacity = itemProgress.toFixed(3);
          item.el.style.transform = `translateY(${translateY.toFixed(2)}px)`;
        });
      }

      function update() {
        const scrollY = window.scrollY || window.pageYOffset || 0;
        const progress = Math.max(0, Math.min(1, scrollY / maxScroll));

        // Milestones:
        // 0% -> 20%: Full-screen video hold (t = 0)
        // 20% -> 60%: Smooth shrink transition to 45-50% width on right (t: 0 -> 1)
        // 60% -> 100%: Holds final split hero layout
        let t = 0;
        if (progress <= 0.20) {
          t = 0;
        } else if (progress >= 0.60) {
          t = 1;
        } else {
          t = (progress - 0.20) / (0.60 - 0.20);
        }

        if (Math.abs(t - lastAppliedT) > 0.0005 || lastAppliedT === -1) {
          applyFrameTransform(t);
          lastAppliedT = t;
        }

        if (cue) {
          const cueAlpha = Math.max(0, 1 - (progress / 0.12));
          cue.style.opacity = cueAlpha.toFixed(3);
          cue.style.pointerEvents = cueAlpha <= 0.01 ? 'none' : 'auto';
        }

        isTicking = false;
      }

      function onScroll() {
        if (!isTicking) {
          isTicking = true;
          requestAnimationFrame(update);
        }
      }

      function onResize() {
        measure();
        lastAppliedT = -1;
        update();
      }

      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onResize, { passive: true });
      window.addEventListener('orientationchange', onResize, { passive: true });

      measure();
      update();

      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(() => {
          measure();
          update();
        });
      }
    }

    initHeroScrollCinematic();
  });
})();
