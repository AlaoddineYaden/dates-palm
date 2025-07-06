class WhatsAppService {
  constructor() {
    this.businessNumber = "+212603162237"; // Replace with actual number
    this.businessHours = { start: 9, end: 18 };
  }
  openChat(message = "") {
    const url = this.createWhatsAppURL(this.businessNumber, message);
    window.open(url, '_blank');
  }
  formatMessage(productName = '', inquiry = '') {
    return productName ? `Product Inquiry: ${productName}\n${inquiry}` : inquiry;
  }
  isBusinessHours() {
    const now = new Date();
    const hour = now.getHours();
    return hour >= this.businessHours.start && hour < this.businessHours.end;
  }
  createWhatsAppURL(number, message) {
    const encoded = encodeURIComponent(message);
    return `https://wa.me/${number.replace(/[^\d]/g, '')}?text=${encoded}`;
  }
}
const whatsappService = new WhatsAppService();
// Floating WhatsApp button
const floatBtn = document.getElementById('whatsapp-float-btn');
floatBtn && floatBtn.addEventListener('click', () => {
  whatsappService.openChat();
});
// Product inquiry buttons
const productInquireBtns = document.querySelectorAll('.inquire-btn');
productInquireBtns.forEach((btn, idx) => {
  btn.addEventListener('click', () => {
    const productName = btn.closest('.product-card').querySelector('h3').textContent;
    const message = whatsappService.formatMessage(productName, '');
    whatsappService.openChat(message);
  });
});
// Contact form WhatsApp button
const contactForm = document.getElementById('contactForm');
const whatsappBtn = document.querySelector('.whatsapp-btn');
if (contactForm && whatsappBtn) {
  whatsappBtn.addEventListener('click', () => {
    const name = contactForm.name.value;
    const email = contactForm.email.value;
    const message = contactForm.message.value;
    const fullMsg = `Contact Inquiry:\nName: ${name}\nEmail: ${email}\nMessage: ${message}`;
    whatsappService.openChat(fullMsg);
  });
}
// Business hours display (optional highlight)
window.addEventListener('DOMContentLoaded', () => {
  const hoursEl = document.querySelector('.business-hours');
  if (hoursEl && !whatsappService.isBusinessHours()) {
    hoursEl.classList.add('closed');
    hoursEl.innerHTML += ' <span style="color:#e74c3c">(Closed)</span>';
  }
}); 