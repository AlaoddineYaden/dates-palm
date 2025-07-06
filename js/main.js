// Mobile menu toggle
const menuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');
menuToggle && menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});
// Smooth scroll navigation
function smoothScrollTo(target) {
  const el = document.querySelector(target);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
}
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    navLinks.classList.remove('active');
    smoothScrollTo(link.getAttribute('href'));
  });
});
// Language switcher handled in language.js
// Form validation
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', handleFormSubmit);
}
function handleFormSubmit(e) {
  e.preventDefault();
  let valid = true;
  const name = contactForm.name;
  const email = contactForm.email;
  const message = contactForm.message;
  [name, email, message].forEach(input => {
    input.setAttribute('aria-invalid', 'false');
  });
  if (!name.value.trim()) {
    name.setAttribute('aria-invalid', 'true');
    valid = false;
  }
  if (!email.value.trim() || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.value)) {
    email.setAttribute('aria-invalid', 'true');
    valid = false;
  }
  if (!message.value.trim()) {
    message.setAttribute('aria-invalid', 'true');
    valid = false;
  }
  if (valid) {
    const formData = {
      name: name.value.trim(),
      email: email.value.trim(),
      message: message.value.trim(),
      timestamp: new Date().toISOString()
    };
    
    // Check if offline
    if (!navigator.onLine) {
      // Store for later submission
      const offlineSubmissions = JSON.parse(localStorage.getItem('offlineSubmissions') || '[]');
      offlineSubmissions.push(formData);
      localStorage.setItem('offlineSubmissions', JSON.stringify(offlineSubmissions));
      
      showNotification('Form saved offline. Will submit when connection is restored.', 'warning');
      contactForm.reset();
      return;
    }
    
    // Submit form
    submitForm(formData);
  }
}
function submitForm(formData) {
  // Show loading state
  const submitBtn = contactForm.querySelector('.submit-btn');
  const originalText = submitBtn.textContent;
  submitBtn.textContent = 'Sending...';
  submitBtn.disabled = true;
  
  // Simulate form submission (replace with actual endpoint)
  fetch('/api/contact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData)
  })
  .then(response => {
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
  })
  .then(data => {
    showNotification('Thank you! Your message has been sent.', 'success');
    contactForm.reset();
    
    // Track form submission
    if (typeof gtag !== 'undefined') {
      gtag('event', 'form_submit', {
        form_name: 'contact'
      });
    }
  })
  .catch(error => {
    console.error('Form submission error:', error);
    showNotification('Failed to send message. Please try again.', 'warning');
    
    // Store for retry
    const offlineSubmissions = JSON.parse(localStorage.getItem('offlineSubmissions') || '[]');
    offlineSubmissions.push(formData);
    localStorage.setItem('offlineSubmissions', JSON.stringify(offlineSubmissions));
  })
  .finally(() => {
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
  });
}
// Scroll-triggered animations
function animateOnScroll(elements) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  elements.forEach(el => observer.observe(el));
}
window.addEventListener('DOMContentLoaded', () => {
  animateOnScroll(document.querySelectorAll('.fade-in-up'));
  // Set current year in footer
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
  measurePerformance();
  initAnalytics();
  
  // Check for offline submissions on load
  const offlineSubmissions = JSON.parse(localStorage.getItem('offlineSubmissions') || '[]');
  if (offlineSubmissions.length > 0 && navigator.onLine) {
    showNotification(`${offlineSubmissions.length} offline submission(s) will be sent.`, 'info');
  }
});
// Image lazy loading (native fallback)
document.addEventListener('DOMContentLoaded', () => {
  if ('loading' in HTMLImageElement.prototype) return;
  document.querySelectorAll('img[loading="lazy"]').forEach(img => {
    if (!img.src) {
      img.src = img.dataset.src;
    }
  });
});
// Advanced Animation & Interactive Effects
function initScrollAnimations() {
  // Sequential fade-in for product cards
  const productCards = document.querySelectorAll('.product-card');
  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, idx) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('active'), idx * 120);
        cardObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  productCards.forEach(card => cardObserver.observe(card));

  // Statistics counter animation
  const statNumbers = document.querySelectorAll('.stat-number');
  let statsAnimated = false;
  if (statNumbers.length) {
    const statsSection = document.querySelector('.stats-section');
    const statsObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !statsAnimated) {
        statsAnimated = true;
        statNumbers.forEach(el => animateCounter(el, +el.dataset.count));
        statsObserver.disconnect();
      }
    }, { threshold: 0.3 });
    statsObserver.observe(statsSection);
  }
}
function animateCounter(el, target) {
  let current = 0;
  const duration = 1200;
  const start = performance.now();
  function update(now) {
    const progress = Math.min((now - start) / duration, 1);
    el.textContent = Math.floor(progress * (target - 0) + 0);
    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      el.textContent = target;
    }
  }
  requestAnimationFrame(update);
}
// Product hover: image zoom, price highlight handled by CSS
// Product click: show modal with details
function handleProductHover(productCard) {
  // Already handled by CSS for zoom and price highlight
}
function showProductDetails(productId) {
  // Simple modal implementation
  const product = document.querySelector(`[data-product-id="${productId}"]`);
  if (!product) return;
  let modal = document.getElementById('product-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'product-modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.tabIndex = -1;
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100vw';
    modal.style.height = '100vh';
    modal.style.background = 'rgba(0,0,0,0.5)';
    modal.style.display = 'flex';
    modal.style.alignItems = 'center';
    modal.style.justifyContent = 'center';
    modal.innerHTML = `<div class="modal-content" style="background:#fff;padding:2rem;border-radius:12px;max-width:400px;min-width:280px;position:relative;"><button class="close-modal" aria-label="Close" style="position:absolute;top:1rem;right:1rem;font-size:1.5rem;background:none;border:none;">&times;</button></div>`;
    document.body.appendChild(modal);
  }
  const content = modal.querySelector('.modal-content');
  content.innerHTML += product.innerHTML;
  modal.style.display = 'flex';
  modal.focus();
  modal.querySelector('.close-modal').onclick = () => {
    modal.style.display = 'none';
    content.innerHTML = '<button class="close-modal" aria-label="Close" style="position:absolute;top:1rem;right:1rem;font-size:1.5rem;background:none;border:none;">&times;</button>';
  };
  // Accessibility: close on Escape
  modal.onkeydown = (e) => {
    if (e.key === 'Escape') {
      modal.style.display = 'none';
      content.innerHTML = '<button class="close-modal" aria-label="Close" style="position:absolute;top:1rem;right:1rem;font-size:1.5rem;background:none;border:none;">&times;</button>';
    }
  };
}
document.querySelectorAll('.product-card').forEach((card, idx) => {
  card.setAttribute('data-product-id', idx+1);
  card.addEventListener('click', () => showProductDetails(idx+1));
});
// Page transitions
function fadeInSection(section) {
  section.classList.add('fade-in-up', 'active');
}
function slideInFromLeft(element) {
  element.classList.add('slide-in-left', 'active');
}
// Initialize advanced scroll animations
window.addEventListener('DOMContentLoaded', () => {
  initScrollAnimations();
});
// Service Worker Registration
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('SW registered: ', registration);
      })
      .catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

// Error Handling & Fallbacks
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error);
  // Send to analytics if available
  if (typeof gtag !== 'undefined') {
    gtag('event', 'exception', {
      description: event.error.message,
      fatal: false
    });
  }
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
  // Send to analytics if available
  if (typeof gtag !== 'undefined') {
    gtag('event', 'exception', {
      description: 'Unhandled promise rejection: ' + event.reason,
      fatal: false
    });
  }
});

// Offline Detection
window.addEventListener('online', () => {
  document.body.classList.remove('offline');
  // Show online notification
  showNotification('Connection restored', 'success');
});

window.addEventListener('offline', () => {
  document.body.classList.add('offline');
  // Show offline notification
  showNotification('You are offline. Some features may be limited.', 'warning');
});

// Performance Monitoring
function measurePerformance() {
  if ('performance' in window) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        const perfData = performance.getEntriesByType('navigation')[0];
        const loadTime = perfData.loadEventEnd - perfData.loadEventStart;
        const domContentLoaded = perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart;
        
        console.log('Page load time:', loadTime, 'ms');
        console.log('DOM content loaded:', domContentLoaded, 'ms');
        
        // Send to analytics if available
        if (typeof gtag !== 'undefined') {
          gtag('event', 'timing_complete', {
            name: 'load',
            value: loadTime
          });
        }
      }, 0);
    });
  }
}

// Notification System
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: ${type === 'success' ? '#4CAF50' : type === 'warning' ? '#FF9800' : '#2196F3'};
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    z-index: 10000;
    transform: translateX(100%);
    transition: transform 0.3s ease;
  `;
  
  document.body.appendChild(notification);
  
  // Animate in
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);
  
  // Auto remove after 5 seconds
  setTimeout(() => {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 5000);
}

// Analytics Integration (Google Analytics 4)
function initAnalytics() {
  // Google Analytics 4 tracking code
  if (typeof gtag !== 'undefined') {
    // Track page views
    gtag('config', 'GA_MEASUREMENT_ID', {
      page_title: document.title,
      page_location: window.location.href
    });
    
    // Track language changes
    document.addEventListener('languageChanged', (e) => {
      gtag('event', 'language_change', {
        language: e.detail.language
      });
    });
    
    // Track WhatsApp clicks
    document.querySelectorAll('[data-whatsapp]').forEach(btn => {
      btn.addEventListener('click', () => {
        gtag('event', 'whatsapp_click', {
          location: btn.dataset.whatsapp
        });
      });
    });
  }
}

// Process offline submissions when back online
window.addEventListener('online', () => {
  const offlineSubmissions = JSON.parse(localStorage.getItem('offlineSubmissions') || '[]');
  if (offlineSubmissions.length > 0) {
    offlineSubmissions.forEach(submission => {
      submitForm(submission);
    });
    localStorage.removeItem('offlineSubmissions');
  }
}); 