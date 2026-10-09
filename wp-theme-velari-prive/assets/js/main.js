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
  });
})();
