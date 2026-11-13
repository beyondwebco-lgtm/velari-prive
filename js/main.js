/**
 * VELARI PRIVÉ — Digital Flagship Core Logic
 * High-performance, luxury interactions for the four core pages:
 * 1. Home (/)
 * 2. The Science (/the-science)
 * 3. Private Discovery (/private-discovery)
 * 4. Exclusive Access (/exclusive-access)
 */

(function () {
  'use strict';

  // --- PRIVACY-FIRST ANALYTICS HOOK ---
  window.velariTrackEvent = function (eventName, eventParams = {}) {
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
    delete sanitizedParams.message;

    if (window.dataLayer && Array.isArray(window.dataLayer)) {
      window.dataLayer.push({
        event: eventName,
        ...sanitizedParams
      });
    }
  };

  document.addEventListener('DOMContentLoaded', function () {
    // ------------------------------------------------------------------------
    // 1. SCROLL HEADER STATE
    // ------------------------------------------------------------------------
    const header = document.querySelector('.site-header');
    if (header) {
      const handleScroll = () => {
        if (window.scrollY > 30) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      };
      window.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll();
    }

    // ------------------------------------------------------------------------
    // 2. MOBILE NAVIGATION DRAWER
    // ------------------------------------------------------------------------
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

    // Close on Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        toggleMobileNav(false);
      }
    });

    // ------------------------------------------------------------------------
    // 3. ACTIVE NAV HIGHLIGHTING
    // ------------------------------------------------------------------------
    const currentPath = window.location.pathname.replace(/\/$/, '') || '/';
    document.querySelectorAll('.nav-link, .mobile-nav-link').forEach((link) => {
      const href = link.getAttribute('href');
      if (!href) return;
      const cleanHref = href.replace(/\/$/, '') || '/';
      if (
        cleanHref === currentPath ||
        (currentPath.includes('the-science') && cleanHref.includes('the-science')) ||
        (currentPath.includes('personal-discovery') && cleanHref.includes('personal-discovery')) ||
        (currentPath.includes('private-discovery') && (cleanHref.includes('private-discovery') || cleanHref.includes('personal-discovery'))) ||
        (currentPath.includes('exclusive-access') && cleanHref.includes('exclusive-access')) ||
        (currentPath === '/' && (cleanHref === '/' || cleanHref === '/index.html'))
      ) {
        link.classList.add('active');
      }
    });

    // ------------------------------------------------------------------------
    // 4. HERO VIDEO AUTOPLAY & LOADING PROGRESS BAR CONTROLLER
    // ------------------------------------------------------------------------
    const heroLoader = document.getElementById('heroVideoLoader');
    const heroLoaderBar = document.getElementById('heroLoaderBar');
    const heroLoaderPercent = document.getElementById('heroLoaderPercent');
    const heroPrimaryVideo = document.querySelector('.hero-film-video');

    if (heroLoader && heroPrimaryVideo) {
      let currentPercent = 0;
      let targetPercent = 14; // Initial anticipation
      let isCompleted = false;
      let animationFrameId = null;

      const updateUI = () => {
        if (heroLoaderBar) {
          heroLoaderBar.style.width = `${currentPercent.toFixed(1)}%`;
        }
        if (heroLoaderPercent) {
          heroLoaderPercent.textContent = `${Math.round(currentPercent)}%`;
        }
      };

      const finishLoading = () => {
        if (isCompleted) return;
        isCompleted = true;
        targetPercent = 100;
        
        // Attempt play immediately
        heroPrimaryVideo.play().catch(() => {});

        // Graceful glide to 100%
        const finishInterval = setInterval(() => {
          currentPercent += (100 - currentPercent) * 0.35 + 1.2;
          if (currentPercent >= 100) {
            currentPercent = 100;
            updateUI();
            clearInterval(finishInterval);
            if (animationFrameId) cancelAnimationFrame(animationFrameId);

            setTimeout(() => {
              heroLoader.classList.add('is-loaded');
              setTimeout(() => {
                heroLoader.style.display = 'none';
              }, 900);
            }, 260);
          } else {
            updateUI();
          }
        }, 25);
      };

      // Smooth RAF progression loop
      const tick = () => {
        if (!isCompleted) {
          currentPercent += (targetPercent - currentPercent) * 0.085;
          updateUI();
          animationFrameId = requestAnimationFrame(tick);
        }
      };
      animationFrameId = requestAnimationFrame(tick);

      // Listen to buffer and load progression
      const updateBufferedProgress = () => {
        if (isCompleted) return;
        try {
          if (heroPrimaryVideo.buffered && heroPrimaryVideo.buffered.length > 0) {
            const bufferedEnd = heroPrimaryVideo.buffered.end(heroPrimaryVideo.buffered.length - 1);
            const requiredBuffer = Math.min(heroPrimaryVideo.duration || 6, 6);
            const bufferRatio = Math.min(1, bufferedEnd / requiredBuffer);
            targetPercent = Math.max(targetPercent, Math.round(20 + bufferRatio * 75));
          }
        } catch (e) {}
      };

      heroPrimaryVideo.addEventListener('progress', updateBufferedProgress);
      heroPrimaryVideo.addEventListener('loadedmetadata', () => {
        targetPercent = Math.max(targetPercent, 35);
      });
      heroPrimaryVideo.addEventListener('loadeddata', () => {
        targetPercent = Math.max(targetPercent, 72);
      });
      heroPrimaryVideo.addEventListener('canplay', () => {
        targetPercent = Math.max(targetPercent, 95);
        setTimeout(finishLoading, 220);
      });
      heroPrimaryVideo.addEventListener('canplaythrough', finishLoading);
      heroPrimaryVideo.addEventListener('playing', finishLoading);

      // Handle already cached / ready video
      if (heroPrimaryVideo.readyState >= 3) {
        finishLoading();
      } else {
        // Continuous steady progress heartbeat
        const heartbeat = setInterval(() => {
          if (isCompleted) {
            clearInterval(heartbeat);
            return;
          }
          if (targetPercent < 90) {
            targetPercent += 3.5;
          }
        }, 160);

        // Fail-safe timeout ensures the site is never blocked on restricted mobile networks
        setTimeout(() => {
          clearInterval(heartbeat);
          finishLoading();
        }, 3800);
      }
    }

    const heroVideos = document.querySelectorAll('.hero-film-video, video[autoplay]');
    heroVideos.forEach((video) => {
      video.muted = true;
      video.defaultMuted = true;
      video.setAttribute('muted', '');
      video.setAttribute('playsinline', '');
      video.setAttribute('webkit-playsinline', '');
      
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn('Autoplay deferred:', err);
          const playOnInteraction = () => {
            video.play().catch(() => {});
            window.removeEventListener('touchstart', playOnInteraction);
            window.removeEventListener('click', playOnInteraction);
            window.removeEventListener('scroll', playOnInteraction);
          };
          window.addEventListener('touchstart', playOnInteraction, { once: true, passive: true });
          window.addEventListener('click', playOnInteraction, { once: true, passive: true });
          window.addEventListener('scroll', playOnInteraction, { once: true, passive: true });
        });
      }
    });

    // 4B. HERO SCROLL CUE DYNAMIC FADE ON SCROLL
    const heroScrollCue = document.querySelector('.hero-scroll-cue');
    if (heroScrollCue) {
      window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
          heroScrollCue.style.opacity = '0';
          heroScrollCue.style.pointerEvents = 'none';
        } else {
          heroScrollCue.style.opacity = '1';
          heroScrollCue.style.pointerEvents = 'auto';
        }
      }, { passive: true });
    }

    // ------------------------------------------------------------------------
    // 5. PERSONAL / PRIVATE DISCOVERY: CONCERN CARDS SELECTION
    // ------------------------------------------------------------------------
    const concernCards = document.querySelectorAll('.concern-card');
    const selectedConcerns = new Set();

    concernCards.forEach((card) => {
      card.addEventListener('click', () => {
        const concern = card.dataset.concern;
        if (!concern) return;

        // Toggle selected state
        if (card.classList.contains('selected')) {
          card.classList.remove('selected');
          selectedConcerns.delete(concern);
        } else {
          // Highlight card
          card.classList.add('selected');
          selectedConcerns.add(concern);
        }

        // Sync with enquiry form (pd-concern or discovery-interest)
        const targetSelect = document.getElementById('pd-concern') || document.getElementById('discovery-interest');
        if (targetSelect && concern) {
          targetSelect.value = concern;
        }

        window.velariTrackEvent('concern_card_toggled', {
          concern: concern,
          total_selected: selectedConcerns.size
        });
      });
    });

    // ------------------------------------------------------------------------
    // 6. PRIVATE DISCOVERY: MULTI-STEP QUESTIONNAIRE
    // ------------------------------------------------------------------------
    const questionnaireContainer = document.querySelector('.questionnaire-container');
    if (questionnaireContainer) {
      let currentStep = 1;
      const totalSteps = 4;
      const userAnswers = {
        primaryInterest: '',
        currentRoutine: '',
        priorityQuality: '',
        liaisonPreference: ''
      };

      const steps = questionnaireContainer.querySelectorAll('.questionnaire-step');
      const progressPills = questionnaireContainer.querySelectorAll('.progress-pill');
      const resultCard = document.getElementById('questionnaire-result-card');
      const resultPreferencesList = document.getElementById('result-preferences-list');

      function updateStepView() {
        steps.forEach((step, idx) => {
          step.classList.toggle('active', idx + 1 === currentStep);
        });

        progressPills.forEach((pill, idx) => {
          pill.classList.remove('active', 'completed');
          if (idx + 1 === currentStep) {
            pill.classList.add('active');
          } else if (idx + 1 < currentStep) {
            pill.classList.add('completed');
          }
        });
      }

      // Option selection inside choice tiles
      questionnaireContainer.querySelectorAll('.choice-tile').forEach((tile) => {
        tile.addEventListener('click', () => {
          const stepEl = tile.closest('.questionnaire-step');
          if (!stepEl) return;

          stepEl.querySelectorAll('.choice-tile').forEach((t) => t.classList.remove('selected'));
          tile.classList.add('selected');

          const stepNum = parseInt(stepEl.dataset.step, 10);
          const value = tile.dataset.value || tile.querySelector('.choice-label')?.textContent?.trim();

          if (stepNum === 1) userAnswers.primaryInterest = value;
          if (stepNum === 2) userAnswers.currentRoutine = value;
          if (stepNum === 3) userAnswers.priorityQuality = value;
          if (stepNum === 4) userAnswers.liaisonPreference = value;

          // Enable next button for this step
          const nextBtn = stepEl.querySelector('[data-questionnaire-next]');
          if (nextBtn) nextBtn.removeAttribute('disabled');
        });
      });

      // Next & Back Buttons
      questionnaireContainer.querySelectorAll('[data-questionnaire-next]').forEach((btn) => {
        btn.addEventListener('click', () => {
          if (currentStep < totalSteps) {
            currentStep++;
            updateStepView();
          } else {
            // Completed questionnaire
            completeQuestionnaire();
          }
        });
      });

      questionnaireContainer.querySelectorAll('[data-questionnaire-prev]').forEach((btn) => {
        btn.addEventListener('click', () => {
          if (currentStep > 1) {
            currentStep--;
            updateStepView();
          }
        });
      });

      function completeQuestionnaire() {
        steps.forEach((s) => s.classList.remove('active'));
        if (resultCard) {
          resultCard.style.display = 'block';
          if (resultPreferencesList) {
            resultPreferencesList.innerHTML = '';
            Object.values(userAnswers)
              .filter(Boolean)
              .forEach((val) => {
                const chip = document.createElement('span');
                chip.className = 'preference-chip';
                chip.textContent = val;
                resultPreferencesList.appendChild(chip);
              });
          }
          resultCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }

        // Prefill enquiry form
        const formInterest = document.getElementById('discovery-interest');
        if (formInterest && userAnswers.primaryInterest) {
          formInterest.value = userAnswers.primaryInterest;
        }

        window.velariTrackEvent('questionnaire_completed', userAnswers);
      }
    }

    // ------------------------------------------------------------------------
    // 7. PRIVATE DISCOVERY & EXCLUSIVE ACCESS FORMS
    // ------------------------------------------------------------------------
    function setupEnquiryForm(formId, statusId, eventName, successHeading, successBody) {
      const form = document.getElementById(formId);
      const statusBox = document.getElementById(statusId);
      if (!form) return;

      form.addEventListener('submit', function (e) {
        e.preventDefault();
        const submitBtn = form.querySelector('button[type="submit"]');

        // Validation
        const requiredFields = form.querySelectorAll('[required]');
        let valid = true;
        requiredFields.forEach((field) => {
          if (field.type === 'checkbox') {
            if (!field.checked) valid = false;
          } else if (!field.value.trim()) {
            valid = false;
            field.style.borderColor = 'rgba(240, 120, 120, 0.6)';
          } else {
            field.style.borderColor = '';
          }
        });

        if (!valid) {
          if (statusBox) {
            statusBox.className = 'form-status error';
            statusBox.textContent = 'Please complete all required fields and accept the privacy notice.';
          }
          return;
        }

        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.textContent = 'Transmitting Privately...';
        }

        setTimeout(() => {
          if (statusBox) {
            statusBox.className = 'form-status success';
            statusBox.innerHTML = `<strong>${successHeading}</strong><br>${successBody}`;
          }
          form.reset();
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Transmitted Securely';
          }
          window.velariTrackEvent(eventName, { status: 'submitted' });
        }, 1100);
      });
    }

    setupEnquiryForm(
      'personal-discovery-form',
      'pd-form-status',
      'personal_discovery_enquiry_submitted',
      'Your Private Enquiry Has Been Lodged.',
      'Thank you. Your cosmetic preferences and details have been transmitted to the VELARI PRIVÉ Private Client Liaison. A personal introduction will follow with utmost discretion.'
    );

    setupEnquiryForm(
      'private-discovery-form',
      'discovery-form-status',
      'private_discovery_enquiry_submitted',
      'Your Private Discovery Has Been Lodged.',
      'Thank you. Your cosmetic preferences and confidential details have been received by the VELARI PRIVÉ Private Client Liaison. A personal introduction will follow with utmost discretion.'
    );

    setupEnquiryForm(
      'exclusive-access-form',
      'access-form-status',
      'exclusive_access_enquiry_submitted',
      'Private Access Request Received.',
      'Thank you. Your allocation request has been routed to our private client team. Allocations are confirmed individually, ensuring considered presentation and direct liaison.'
    );

    // ------------------------------------------------------------------------
    // 8. THE SCIENCE: INTERACTIVE INGREDIENT EXPLORER
    // ------------------------------------------------------------------------
    const ingredientData = {
      botanical: {
        title: 'Botanical Antioxidant Matrix',
        subtitle: 'Australian formulation botanical synergy',
        function: 'Cosmetic Scalp Comfort & Free-Radical Defense',
        rationale: 'Exposed to urban dust, UV radiation, and environmental stress, the scalp surface requires protective co-factors. Carefully balanced botanical fractions provide soothing cosmetic comfort without disrupting the scalp’s lipid mantle.',
        visualAlt: 'Botanical matrix close-up'
      },
      hydration: {
        title: 'Biomimetic Hydration Complex',
        subtitle: 'Micro-aqueous moisture balance',
        function: 'Lightweight Scalp Hydration & Moisture Retention',
        rationale: 'Unlike heavy cosmetic oils that coat the follicle opening, this biomimetic humectant complex mimics natural moisture factors (NMF), locking in aqueous comfort with zero stickiness or residue.',
        visualAlt: 'Clear aqueous hydration droplet'
      },
      peptide: {
        title: 'Tri-Peptide Conditioning Blend',
        subtitle: 'Strand & cuticle smoothing',
        function: 'Hair Manageability, Tactile Silkiness & Lustre',
        rationale: 'Targeted peptide chains condition the hair fiber along the emerging shaft, imparting exceptional glide, structural softeness, and reflective radiance under natural light.',
        visualAlt: 'Microscopic fiber peptide interaction'
      },
      barrier: {
        title: 'Scalp Barrier Co-Factors',
        subtitle: 'Protective acid mantle support',
        function: 'Microbiome Harmony & Surface Barrier Equilibrium',
        rationale: 'Formulated at physiological scalp pH (~5.5), these co-factors preserve the integrity of the stratum corneum, supporting calm comfort and balanced sebum dynamics.',
        visualAlt: 'Hydrolipidic barrier protection model'
      }
    };

    const ingredientTabs = document.querySelectorAll('.ingredient-tab-btn');
    const ingredientCardTitle = document.getElementById('ingredient-card-title');
    const ingredientCardSub = document.getElementById('ingredient-card-sub');
    const ingredientCardFunction = document.getElementById('ingredient-card-function');
    const ingredientCardRationale = document.getElementById('ingredient-card-rationale');

    if (ingredientTabs.length > 0 && ingredientCardTitle) {
      ingredientTabs.forEach((btn) => {
        btn.addEventListener('click', () => {
          const key = btn.dataset.ingredient;
          if (!key || !ingredientData[key]) return;

          ingredientTabs.forEach((b) => b.classList.remove('active'));
          btn.classList.add('active');

          const data = ingredientData[key];
          ingredientCardTitle.textContent = data.title;
          ingredientCardSub.textContent = data.subtitle;
          if (ingredientCardFunction) ingredientCardFunction.textContent = data.function;
          if (ingredientCardRationale) ingredientCardRationale.textContent = data.rationale;

          window.velariTrackEvent('ingredient_tab_viewed', { ingredient: key });
        });
      });
    }

    // ------------------------------------------------------------------------
    // 9. EXCLUSIVE ACCESS: ALLOCATION SELECTION
    // ------------------------------------------------------------------------
    const allocationCards = document.querySelectorAll('.allocation-card');
    const allocationInput = document.getElementById('access-allocation');
    allocationCards.forEach((card) => {
      card.addEventListener('click', () => {
        allocationCards.forEach((c) => c.classList.remove('selected'));
        card.classList.add('selected');
        const alloc = card.dataset.allocation;
        if (allocationInput && alloc) {
          allocationInput.value = alloc;
        }
      });
    });

    // ------------------------------------------------------------------------
    // 10. EDITORIAL REVELATION SECTION OBSERVER
    // ------------------------------------------------------------------------
    const revelationSection = document.querySelector('.editorial-revelation-section');
    if (revelationSection) {
      if ('IntersectionObserver' in window) {
        const revObserver = new IntersectionObserver(
          (entries, obs) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                revelationSection.classList.add('revealed');
                obs.unobserve(entry.target);
              }
            });
          },
          { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
        );
        revObserver.observe(revelationSection);
      } else {
        revelationSection.classList.add('revealed');
      }
    }

    // ------------------------------------------------------------------------
    // 11. GLOBAL LUXURY IMAGE INTERACTION & FULLSCREEN LIGHTBOX
    // ------------------------------------------------------------------------
    initLuxuryLightbox();

    function initLuxuryLightbox() {
      const containerSelectors = [
        '.editorial-revelation-card',
        '.editorial-revelation-media',
        '.intro-gallery-card',
        '.ritual-media-card',
        '.ritual-media-frame',
        '.discovery-campaign-card',
        '.principle-image-wrap',
        '.science-flacon-card',
        '.exclusive-coffret-card',
        '.velari-zoomable',
        '[data-lightbox]'
      ];

      // Identify all eligible content image containers without duplicating images
      const rawContainers = Array.from(document.querySelectorAll(containerSelectors.join(', ')));
      if (!rawContainers.length) return;

      const seenImages = new Set();
      const containers = [];

      rawContainers.forEach((container) => {
        const img = container.tagName === 'IMG' ? container : container.querySelector('img');
        if (!img || seenImages.has(img)) return;

        // Skip decorative backgrounds, logos, or icon images
        if (
          img.classList.contains('science-hero-bg') ||
          img.closest('.brand-wordmark') ||
          img.closest('header') ||
          img.closest('.site-nav')
        ) {
          return;
        }

        seenImages.add(img);
        containers.push(container);
      });

      if (!containers.length) return;

      const galleryItems = [];

      containers.forEach((container) => {
        const img = container.tagName === 'IMG' ? container : container.querySelector('img');
        if (!img) return;

        // Apply zoomable container class
        container.classList.add('velari-zoomable');

        // Add minimal luxury expand badge if not present
        if (!container.querySelector('.velari-zoom-badge')) {
          const badge = document.createElement('div');
          badge.className = 'velari-zoom-badge';
          badge.setAttribute('aria-hidden', 'true');
          badge.innerHTML = `
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 2H14M14 2V6M14 2L9 7M6 14H2M2 14V10M2 14L7 9" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          `;
          container.appendChild(badge);
        }

        const itemIndex = galleryItems.length;
        const captionText = img.getAttribute('alt') || 'ANAGÈNESE by VELARI PRIVÉ — Haute Beauté';

        galleryItems.push({
          src: img.currentSrc || img.src,
          alt: img.getAttribute('alt') || '',
          caption: captionText,
          element: container
        });

        // Click to open fullscreen
        container.addEventListener('click', (e) => {
          // Avoid triggering if clicking an actual link inside the container
          if (e.target.closest('a') && e.target.closest('a') !== container) return;
          e.preventDefault();
          openLightbox(itemIndex);
        });

        // Keyboard accessibility on container (Enter / Space opens)
        if (!container.getAttribute('tabindex') && container.tagName !== 'BUTTON' && container.tagName !== 'A') {
          container.setAttribute('tabindex', '0');
          container.setAttribute('role', 'button');
          container.setAttribute('aria-label', `View ${img.getAttribute('alt') || 'image'} in fullscreen`);
          container.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              openLightbox(itemIndex);
            }
          });
        }
      });

      if (!galleryItems.length) return;

      // ----------------------------------------------------------------------
      // Build & Inject Single Global Lightbox Modal
      // ----------------------------------------------------------------------
      let lightbox = document.getElementById('velari-lightbox');
      if (!lightbox) {
        lightbox = document.createElement('div');
        lightbox.id = 'velari-lightbox';
        lightbox.className = 'velari-lightbox';
        lightbox.setAttribute('role', 'dialog');
        lightbox.setAttribute('aria-modal', 'true');
        lightbox.setAttribute('aria-label', 'Image Fullscreen View');
        lightbox.setAttribute('tabindex', '-1');

        lightbox.innerHTML = `
          <div class="velari-lightbox-backdrop" aria-hidden="true"></div>
          <div class="velari-lightbox-header">
            <div class="velari-lightbox-counter" id="velari-lightbox-counter">01 / 01</div>
            <div class="velari-lightbox-brand">VELARI PRIVÉ · HAUTE BEAUTÉ</div>
            <button type="button" class="velari-lightbox-close" id="velari-lightbox-close" aria-label="Close fullscreen view">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.5 3.5L14.5 14.5M14.5 3.5L3.5 14.5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
              </svg>
            </button>
          </div>
          <div class="velari-lightbox-viewport" id="velari-lightbox-viewport">
            <button type="button" class="velari-lightbox-nav prev" id="velari-lightbox-prev" aria-label="Previous image">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 19L8 12L15 5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
            <div class="velari-lightbox-stage" id="velari-lightbox-stage">
              <img src="" alt="" class="velari-lightbox-image" id="velari-lightbox-img">
            </div>
            <button type="button" class="velari-lightbox-nav next" id="velari-lightbox-next" aria-label="Next image">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 5L16 12L9 19" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
          <div class="velari-lightbox-footer">
            <div class="velari-lightbox-caption" id="velari-lightbox-caption"></div>
            <div class="velari-lightbox-hints">
              <span><kbd>ESC</kbd> Close</span>
              <span><kbd>←</kbd> <kbd>→</kbd> Navigate</span>
            </div>
          </div>
        `;
        document.body.appendChild(lightbox);
      }

      const backdrop = lightbox.querySelector('.velari-lightbox-backdrop');
      const closeBtn = document.getElementById('velari-lightbox-close');
      const prevBtn = document.getElementById('velari-lightbox-prev');
      const nextBtn = document.getElementById('velari-lightbox-next');
      const imgElem = document.getElementById('velari-lightbox-img');
      const counterElem = document.getElementById('velari-lightbox-counter');
      const captionElem = document.getElementById('velari-lightbox-caption');
      const viewport = document.getElementById('velari-lightbox-viewport');

      let currentIndex = 0;
      let lastFocusedElement = null;

      function updateLightboxView(index, smoothTransition = false) {
        currentIndex = (index + galleryItems.length) % galleryItems.length;
        const item = galleryItems[currentIndex];

        if (smoothTransition) {
          imgElem.style.opacity = '0';
          imgElem.style.transform = 'scale(0.96)';
          setTimeout(() => {
            imgElem.src = item.src;
            imgElem.alt = item.alt;
            counterElem.textContent = `${String(currentIndex + 1).padStart(2, '0')} / ${String(galleryItems.length).padStart(2, '0')}`;
            captionElem.textContent = item.caption;
            imgElem.style.opacity = '1';
            imgElem.style.transform = 'scale(1)';
          }, 180);
        } else {
          imgElem.src = item.src;
          imgElem.alt = item.alt;
          counterElem.textContent = `${String(currentIndex + 1).padStart(2, '0')} / ${String(galleryItems.length).padStart(2, '0')}`;
          captionElem.textContent = item.caption;
        }

        // Hide navigation if only one image
        if (galleryItems.length <= 1) {
          prevBtn.style.display = 'none';
          nextBtn.style.display = 'none';
        } else {
          prevBtn.style.display = 'flex';
          nextBtn.style.display = 'flex';
        }
      }

      function openLightbox(index) {
        lastFocusedElement = document.activeElement;
        updateLightboxView(index, false);
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
        lightbox.focus();

        window.velariTrackEvent('lightbox_opened', {
          image_src: galleryItems[currentIndex].src,
          total_images: galleryItems.length
        });
      }

      function closeLightbox() {
        if (!lightbox.classList.contains('active')) return;
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
        if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
          lastFocusedElement.focus();
        }
      }

      function showNext() {
        if (galleryItems.length <= 1) return;
        updateLightboxView(currentIndex + 1, true);
      }

      function showPrev() {
        if (galleryItems.length <= 1) return;
        updateLightboxView(currentIndex - 1, true);
      }

      // Close events
      closeBtn.addEventListener('click', closeLightbox);
      backdrop.addEventListener('click', closeLightbox);

      // Nav click events
      nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        showNext();
      });
      prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        showPrev();
      });

      // Prevent closing when clicking on the image stage
      viewport.addEventListener('click', (e) => {
        if (e.target === viewport || e.target.closest('.velari-lightbox-stage')) {
          if (e.target === viewport) closeLightbox();
        }
      });

      // Keyboard Controls & Focus Trap
      document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;

        if (e.key === 'Escape') {
          e.preventDefault();
          closeLightbox();
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          showNext();
        } else if (e.key === 'ArrowLeft') {
          e.preventDefault();
          showPrev();
        } else if (e.key === 'Tab') {
          // Trap focus inside lightbox
          const focusable = [closeBtn, prevBtn, nextBtn].filter((b) => b && b.style.display !== 'none');
          if (!focusable.length) return;
          const first = focusable[0];
          const last = focusable[focusable.length - 1];

          if (e.shiftKey) {
            if (document.activeElement === first) {
              e.preventDefault();
              last.focus();
            }
          } else {
            if (document.activeElement === last) {
              e.preventDefault();
              first.focus();
            }
          }
        }
      });

      // Touch & Mobile Swipe Gestures
      let touchStartX = 0;
      let touchStartY = 0;
      let touchEndX = 0;
      let touchEndY = 0;

      viewport.addEventListener(
        'touchstart',
        (e) => {
          if (e.touches.length === 1) {
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
          }
        },
        { passive: true }
      );

      viewport.addEventListener(
        'touchend',
        (e) => {
          if (e.changedTouches.length === 1) {
            touchEndX = e.changedTouches[0].clientX;
            touchEndY = e.changedTouches[0].clientY;
            handleSwipe();
          }
        },
        { passive: true }
      );

      function handleSwipe() {
        const deltaX = touchEndX - touchStartX;
        const deltaY = touchEndY - touchStartY;
        const absX = Math.abs(deltaX);
        const absY = Math.abs(deltaY);

        // Horizontal swipe (next / prev)
        if (absX > 45 && absX > absY) {
          if (deltaX < 0) {
            showNext();
          } else {
            showPrev();
          }
        }
        // Vertical swipe down (dismiss lightbox)
        else if (deltaY > 80 && absY > absX) {
          closeLightbox();
        }
      }
    }
  });
})();
