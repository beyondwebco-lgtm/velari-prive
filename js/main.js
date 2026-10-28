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
    // 4. HERO VIDEO AUTOPLAY WITH GRACEFUL FALLBACK
    // ------------------------------------------------------------------------
    const heroVideos = document.querySelectorAll('.hero-film-video, video[autoplay]');
    heroVideos.forEach((video) => {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          video.closest('.video-container')?.classList.add('playback-fallback');
        });
      }
    });

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
  });
})();
