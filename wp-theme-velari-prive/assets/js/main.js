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
    // 4. OPENING HERO FILM: NORMAL AUTOPLAY CONTROLLER
    // ------------------------------------------------------------------------
    const heroVideo = document.getElementById('heroFilmVideo') || document.querySelector('.hero-film-video');

    if (heroVideo) {
      heroVideo.muted = true;
      heroVideo.defaultMuted = true;
      heroVideo.loop = true;
      heroVideo.playsInline = true;
      heroVideo.setAttribute('muted', '');
      heroVideo.setAttribute('playsinline', '');
      heroVideo.setAttribute('webkit-playsinline', '');
      heroVideo.setAttribute('autoplay', '');

      const playVideo = () => {
        const promise = heroVideo.play();
        if (promise !== undefined) {
          promise.catch(() => {
            // Autoplay policy fallback: resume playback on first user touch/click/scroll
            const resumeOnInteraction = () => {
              if (heroVideo.paused) {
                heroVideo.play().catch(() => {});
              }
            };
            window.addEventListener('touchstart', resumeOnInteraction, { once: true, passive: true });
            window.addEventListener('click', resumeOnInteraction, { once: true, passive: true });
            window.addEventListener('scroll', resumeOnInteraction, { once: true, passive: true });
          });
        }
      };

      // Loop fail-safe for iOS Safari and mobile browsers
      heroVideo.addEventListener('ended', () => {
        heroVideo.currentTime = 0;
        heroVideo.play().catch(() => {});
      });

      // Immediate play attempt
      playVideo();
      if (heroVideo.readyState < 2) {
        heroVideo.addEventListener('loadeddata', playVideo, { once: true });
        heroVideo.addEventListener('canplay', playVideo, { once: true });
      }

      // First-interaction safety net
      window.addEventListener('touchstart', () => { if (heroVideo.paused) heroVideo.play().catch(() => {}); }, { once: true, passive: true });
      window.addEventListener('click', () => { if (heroVideo.paused) heroVideo.play().catch(() => {}); }, { once: true, passive: true });
      window.addEventListener('scroll', () => { if (heroVideo.paused) heroVideo.play().catch(() => {}); }, { once: true, passive: true });
    }

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
    // 5. PERSONAL DISCOVERY: SCALP CATEGORIES & CONCIERGE INTEGRATION
    // ------------------------------------------------------------------------
    const categoryRadios = document.querySelectorAll('input[name="scalp_category"]');
    const formFocusDisplay = document.getElementById('formFocusDisplay');
    const formCategoryInput = document.getElementById('pd-category-input');

    function syncSelectedCategory(categoryValue) {
      if (!categoryValue) return;

      if (formFocusDisplay) formFocusDisplay.textContent = categoryValue;
      if (formCategoryInput) formCategoryInput.value = categoryValue;

      // Update card visual selected classes
      document.querySelectorAll('.scalp-category-item .concern-card').forEach((card) => {
        card.classList.remove('selected');
      });
      const activeRadio = Array.from(categoryRadios).find(r => r.value === categoryValue);
      if (activeRadio) {
        const activeLabel = document.querySelector(`label[for="${activeRadio.id}"]`);
        if (activeLabel) activeLabel.classList.add('selected');
      }

      try {
        sessionStorage.setItem('velari_selected_category', categoryValue);
      } catch (e) {}

      window.velariTrackEvent('scalp_category_selected', { category: categoryValue });
    }

    if (categoryRadios.length > 0) {
      // Initialize with currently checked radio or default
      const checkedRadio = Array.from(categoryRadios).find(r => r.checked) || categoryRadios[0];
      if (checkedRadio) {
        syncSelectedCategory(checkedRadio.value);
      }

      categoryRadios.forEach((radio) => {
        radio.addEventListener('change', () => {
          if (radio.checked) {
            syncSelectedCategory(radio.value);
          }
        });
      });
    }

    // ------------------------------------------------------------------------
    // 5B. NEUTRAL FEEDBACK BANNER ON RETURN FROM EMAIL CLIENT
    // ------------------------------------------------------------------------
    const feedbackBanner = document.getElementById('mailto-feedback-banner');
    const closeBannerBtn = document.getElementById('btn-close-feedback-banner');

    function checkMailtoReturn() {
      if (!feedbackBanner) return;
      try {
        const openedTimeStr = sessionStorage.getItem('velari_mailto_opened');
        if (openedTimeStr) {
          const elapsed = Date.now() - parseInt(openedTimeStr, 10);
          // If within 15 minutes of clicking email link
          if (elapsed < 15 * 60 * 1000) {
            feedbackBanner.style.display = 'block';
          }
        }
      } catch (e) {}
    }

    if (closeBannerBtn && feedbackBanner) {
      closeBannerBtn.addEventListener('click', () => {
        feedbackBanner.style.display = 'none';
        try {
          sessionStorage.removeItem('velari_mailto_opened');
        } catch (e) {}
      });
    }

    // Check on visibility change and window focus
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') {
        checkMailtoReturn();
      }
    });
    window.addEventListener('focus', checkMailtoReturn);

    // Initial check on load
    checkMailtoReturn();

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
    // 7. SECURE SERVER-SIDE ENQUIRY DISPATCH & RESILIENT ERROR HANDLING
    // ------------------------------------------------------------------------
    function setupEnquiryForm(formId, statusId, eventName, successHeading, successBody) {
      const form = document.getElementById(formId);
      const statusBox = document.getElementById(statusId);
      if (!form) return;

      const formLoadTime = Date.now();

      form.addEventListener('submit', async function (e) {
        e.preventDefault();
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn ? submitBtn.textContent : 'Submit';

        // Client-side validation
        const requiredFields = form.querySelectorAll('[required]');
        let valid = true;
        requiredFields.forEach((field) => {
          if (field.type === 'checkbox') {
            if (!field.checked) {
              valid = false;
              field.style.outline = '2px solid rgba(240, 120, 120, 0.8)';
            } else {
              field.style.outline = '';
            }
          } else if (!field.value.trim()) {
            valid = false;
            field.style.borderColor = 'rgba(240, 120, 120, 0.6)';
          } else {
            field.style.borderColor = '';
          }
        });

        // Email regex check
        const emailInput = form.querySelector('input[type="email"]');
        if (emailInput && emailInput.value.trim()) {
          const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailPattern.test(emailInput.value.trim())) {
            valid = false;
            emailInput.style.borderColor = 'rgba(240, 120, 120, 0.6)';
          }
        }

        if (!valid) {
          if (statusBox) {
            statusBox.className = 'form-status error';
            statusBox.innerHTML = '<strong>Incomplete Details</strong><br>Please complete all required fields with a valid email and accept the confidentiality terms.';
            statusBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }
          return;
        }

        // Honeypot spam field check
        const hpField = form.querySelector('input[name="hp_organization"]');
        if (hpField && hpField.value.trim()) {
          // Drop bot submission gracefully
          if (statusBox) {
            statusBox.className = 'form-status success';
            statusBox.innerHTML = `<strong>${successHeading}</strong><br>${successBody}`;
          }
          return;
        }

        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.textContent = 'Transmitting Privately...';
        }
        if (statusBox) {
          statusBox.className = 'form-status';
          statusBox.textContent = '';
        }

        // Compile payload
        const payload = {
          name: form.querySelector('#pd-name, #access-name, input[name="name"]')?.value?.trim() || '',
          email: form.querySelector('#pd-email, #access-email, input[type="email"]')?.value?.trim() || '',
          phone: form.querySelector('#pd-phone, #access-phone, input[type="tel"]')?.value?.trim() || '',
          scalp_category: form.querySelector('#pd-category-input')?.value || '',
          allocation: form.querySelector('#access-allocation')?.value || '',
          location: form.querySelector('#access-location')?.value?.trim() || '',
          message: form.querySelector('#pd-message, #access-notes, textarea')?.value?.trim() || '',
          consent: !!form.querySelector('input[type="checkbox"][required]')?.checked,
          hp_organization: hpField ? hpField.value.trim() : '',
          submit_time: formLoadTime
        };

        const targetEmail = 'enquiries@velariprive.com';

        // Direct email dispatch flow for Personal Discovery consultation form
        if (form.id === 'personal-discovery-form') {
          const directSubject = encodeURIComponent(`VELARI PRIVÉ Consultation Enquiry: ${payload.scalp_category || 'General'} - ${payload.name}`);
          const directBody = encodeURIComponent(
`Dear VELARI PRIVÉ Private Client Concierge,

I am writing to submit a private consultation enquiry for ANAGÈNESE.

--- CLIENT & CONSULTATION DETAILS ---
Full Name: ${payload.name}
Email Address: ${payload.email}
Phone / WhatsApp: ${payload.phone}
Selected Area of Focus: ${payload.scalp_category || 'Category 01: Dryness & Scalp Comfort'}

--- SPECIFIC CONCERNS & NOTES ---
${payload.message || 'No additional notes provided.'}

---
I understand that ANAGÈNESE is an ultra-concentrated cosmeceutical scalp elixir and look forward to receiving a personal introduction with utmost discretion.

Kind regards,
${payload.name}`
          );
          const directMailto = `mailto:${targetEmail}?subject=${directSubject}&body=${directBody}`;

          if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span>Redirecting to Email App...</span>';
          }

          // Asynchronous backup logging to server API
          fetch('/api/enquiry', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify(payload)
          }).catch(() => {});

          if (statusBox) {
            statusBox.className = 'form-status success';
            statusBox.innerHTML = 
              `<strong>Launching Your Email Application...</strong><br>` +
              `Your private consultation enquiry has been prepared and addressed to <strong>${targetEmail}</strong>.<br>` +
              `<div style="margin-top: 1rem;"><a href="${directMailto}" class="btn btn-champagne" style="font-size: 0.76rem; padding: 0.65rem 1.4rem; display: inline-flex; align-items: center; gap: 0.5rem; text-decoration: none;">Click here if your email client didn't open automatically ↗</a></div>`;
          }

          // Redirect to user's configured email application
          window.location.href = directMailto;

          setTimeout(() => {
            if (submitBtn) {
              submitBtn.disabled = false;
              submitBtn.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <rect width="20" height="16" x="2" y="4" rx="2"/>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                </svg>
                <span>SUBMIT & OPEN EMAIL APP</span>
                <span class="btn-arrow" aria-hidden="true">↗</span>
              `;
            }
          }, 2000);

          window.velariTrackEvent(eventName, { status: 'redirected_to_email', category: payload.scalp_category });
          return;
        }

        const fallbackSubject = encodeURIComponent(`VELARI PRIVÉ Consultation Enquiry: ${payload.scalp_category || payload.allocation || 'General'}`);
        const fallbackBody = encodeURIComponent(
`Dear VELARI PRIVÉ Concierge,

Please receive my consultation enquiry:

Full Name: ${payload.name}
Direct Email: ${payload.email}
Phone: ${payload.phone}
${payload.location ? `Location: ${payload.location}\n` : ''}Selected Area: ${payload.scalp_category || payload.allocation}

Notes:
${payload.message || 'None provided'}
`
        );
        const fallbackMailto = `mailto:${targetEmail}?subject=${fallbackSubject}&body=${fallbackBody}`;

        try {
          const response = await fetch('/api/enquiry', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify(payload)
          });

          const data = await response.json().catch(() => ({}));

          if (response.ok && data.success) {
            // SUCCESS CONFIRMED BY SERVER
            if (statusBox) {
              statusBox.className = 'form-status success';
              statusBox.innerHTML = 
                `<strong>${successHeading}</strong><br>` +
                `${successBody}<br>` +
                `<span style="font-size: 0.8rem; color: var(--color-champagne); margin-top: 0.6rem; display: block;">Routed to monitored inbox: ${targetEmail}</span>`;
            }
            form.reset();
            if (submitBtn) {
              submitBtn.disabled = false;
              submitBtn.textContent = 'Enquiry Lodged';
            }
            window.velariTrackEvent(eventName, { status: 'success', recipient: targetEmail });
          } else {
            // ERROR: PRESERVE USER-ENTERED FIELDS (DO NOT RESET FORM)
            throw new Error(data.error || data.message || 'Server delivery unconfirmed');
          }
        } catch (error) {
          console.warn('[Enquiry Submission Fallback]', error);
          if (statusBox) {
            statusBox.className = 'form-status error';
            statusBox.innerHTML = 
              `<strong>Delivery Notice</strong><br>` +
              `We were unable to verify automatic server dispatch at this moment. <em>Your entered information has been preserved.</em><br>` +
              `You may retry submission or click below to deliver your details directly via your email app to <strong>${targetEmail}</strong>:<br>` +
              `<div style="margin-top: 1rem;"><a href="${fallbackMailto}" class="btn btn-champagne" style="font-size: 0.76rem; padding: 0.65rem 1.4rem; display: inline-flex; align-items: center; gap: 0.5rem; text-decoration: none;">Launch Email App ↗</a></div>`;
          }
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Retry Submission';
          }
          window.velariTrackEvent(eventName, { status: 'fallback_offered', error: error.message });
        }
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
        '.science-image-frame',
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
              <span><kbd>Click Image</kbd> / <kbd>ESC</kbd> Close</span>
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
      const stageElem = document.getElementById('velari-lightbox-stage');

      let currentIndex = 0;
      let lastFocusedElement = null;
      let savedScrollY = 0;
      let isTransitioning = false;

      // Make the fullscreen image interactive with clear accessibility
      if (imgElem) {
        imgElem.setAttribute('tabindex', '0');
        imgElem.setAttribute('role', 'button');
        imgElem.setAttribute('aria-label', 'Fullscreen image. Click again or press Escape to close.');
        imgElem.setAttribute('title', 'Click image to return to page');
      }

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
        if (lightbox.classList.contains('active') || isTransitioning) return;
        isTransitioning = true;
        savedScrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0;
        lastFocusedElement = document.activeElement;

        updateLightboxView(index, false);
        lightbox.classList.remove('closing');
        lightbox.classList.add('active');
        document.documentElement.style.overflow = 'hidden';
        document.body.style.overflow = 'hidden';
        lightbox.focus();

        setTimeout(() => {
          isTransitioning = false;
        }, 320);

        window.velariTrackEvent('lightbox_opened', {
          image_src: galleryItems[currentIndex].src,
          total_images: galleryItems.length
        });
      }

      function closeLightbox() {
        if (!lightbox.classList.contains('active') || isTransitioning) return;
        isTransitioning = true;
        lightbox.classList.add('closing');
        lightbox.classList.remove('active');
        
        // Restore normal page scrolling
        document.documentElement.style.overflow = '';
        document.body.style.overflow = '';

        // Restore previous scroll position faithfully
        if (typeof savedScrollY === 'number') {
          window.scrollTo({
            top: savedScrollY,
            left: 0,
            behavior: 'instant'
          });
        }

        setTimeout(() => {
          lightbox.classList.remove('closing');
          isTransitioning = false;
          if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
            lastFocusedElement.focus();
          }
        }, 380);

        window.velariTrackEvent('lightbox_closed', {
          image_src: galleryItems[currentIndex]?.src
        });
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
      closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        closeLightbox();
      });

      backdrop.addEventListener('click', (e) => {
        e.stopPropagation();
        closeLightbox();
      });

      // Click directly on the fullscreen image toggles / closes fullscreen mode
      imgElem.addEventListener('click', (e) => {
        e.stopPropagation();
        closeLightbox();
      });

      // Keyboard toggle when image is focused (Enter or Space closes)
      imgElem.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          closeLightbox();
        }
      });

      // Click on stage around the image closes fullscreen mode
      if (stageElem) {
        stageElem.addEventListener('click', (e) => {
          e.stopPropagation();
          closeLightbox();
        });
      }

      // Click on viewport background outside nav buttons closes fullscreen mode
      viewport.addEventListener('click', (e) => {
        if (e.target.closest('.velari-lightbox-nav')) return;
        closeLightbox();
      });

      // Nav click events
      nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        showNext();
      });
      prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        showPrev();
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
