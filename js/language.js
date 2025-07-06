// Language management system for multi-language support
const translations = {
  en: {
    nav: { home: "Home", products: "Products", about: "About", contact: "Contact" },
    hero: { title: "Premium Date Palms", subtitle: "Experience the finest quality dates, grown with passion and tradition.", cta: "Shop Now" },
    products: {
      title: "Our Products",
      product1: { name: "Ajwa Dates", description: "Premium black dates from Medina, known for their rich flavor and health benefits" },
      product2: { name: "Medjool Dates", description: "Large, soft and sweet dates often called the 'King of Dates'" },
      product3: { name: "Deglet Noor", description: "Light golden dates with a firm texture and delicate sweetness" },
      product4: { name: "Barhi Dates", description: "Fresh yellow dates with a soft, caramel-like texture" },
      product5: { name: "Sukkary Dates", description: "Premium sweet dates with a rich, honey-like flavor" },
      product6: { name: "Khalas Dates", description: "Traditional dates with a perfect balance of sweetness and texture" },
      inquire: "Inquire"
    },
    about: { title: "About Us", text: "We are dedicated to delivering the highest quality date palms, combining tradition with modern agricultural practices for a sustainable future." },
    contact: {
      title: "Contact Us",
      name: "Name",
      email: "Email",
      message: "Message",
      send: "Send",
      whatsapp: "Send via WhatsApp",
      hours: "Business Hours: 9:00 - 18:00"
    }
  },
  fr: {
    nav: { home: "Accueil", products: "Produits", about: "À propos", contact: "Contact" },
    hero: { title: "Dattes de Qualité Supérieure", subtitle: "Découvrez les meilleures dattes, cultivées avec passion et tradition.", cta: "Acheter" },
    products: {
      title: "Nos Produits",
      product1: { name: "Dattes Ajwa", description: "Dattes noires premium de Médine, connues pour leur saveur riche et leurs bienfaits pour la santé" },
      product2: { name: "Dattes Medjool", description: "Grosses dattes douces et sucrées souvent appelées le 'Roi des Dattes'" },
      product3: { name: "Deglet Noor", description: "Dattes dorées claires avec une texture ferme et une douceur délicate" },
      product4: { name: "Dattes Barhi", description: "Dattes jaunes fraîches avec une texture douce, semblable au caramel" },
      product5: { name: "Dattes Sukkary", description: "Dattes sucrées premium avec une saveur riche, semblable au miel" },
      product6: { name: "Dattes Khalas", description: "Dattes traditionnelles avec un équilibre parfait entre douceur et texture" },
      inquire: "Demander"
    },
    about: { title: "À propos de nous", text: "Nous nous engageons à fournir les meilleures dattes, alliant tradition et pratiques agricoles modernes pour un avenir durable." },
    contact: {
      title: "Contactez-nous",
      name: "Nom",
      email: "E-mail",
      message: "Message",
      send: "Envoyer",
      whatsapp: "Envoyer via WhatsApp",
      hours: "Heures d'ouverture : 9h00 - 18h00"
    }
  },
  ar: {
    nav: { home: "الرئيسية", products: "المنتجات", about: "من نحن", contact: "اتصل بنا" },
    hero: { title: "تمور نخيل فاخرة", subtitle: "اكتشف أجود أنواع التمور المزروعة بشغف وتقاليد.", cta: "تسوق الآن" },
    products: {
      title: "منتجاتنا",
      product1: { name: "تمر عجوة", description: "تمور سوداء فاخرة من المدينة المنورة، معروفة بنكهتها الغنية وفوائدها الصحية" },
      product2: { name: "تمر المجهول", description: "تمور كبيرة ناعمة وحلوة غالباً ما تسمى 'ملك التمور'" },
      product3: { name: "دقلة نور", description: "تمور ذهبية فاتحة بقوام صلب وحلاوة رقيقة" },
      product4: { name: "تمر البرحي", description: "تمور صفراء طازجة بقوام ناعم يشبه الكراميل" },
      product5: { name: "تمر السكري", description: "تمور حلوة فاخرة بنكهة غنية تشبه العسل" },
      product6: { name: "تمر خلاص", description: "تمور تقليدية بتوازن مثالي بين الحلاوة والقوام" },
      inquire: "استفسار"
    },
    about: { title: "من نحن", text: "نحن ملتزمون بتقديم أجود أنواع التمور، نجمع بين التقاليد وأحدث الممارسات الزراعية من أجل مستقبل مستدام." },
    contact: {
      title: "اتصل بنا",
      name: "الاسم",
      email: "البريد الإلكتروني",
      message: "رسالتك",
      send: "إرسال",
      whatsapp: "إرسال عبر واتساب",
      hours: "ساعات العمل: 9:00 - 18:00"
    }
  }
};

function getSavedLanguage() {
  return localStorage.getItem('lang') || null;
}
function detectLanguage() {
  const saved = getSavedLanguage();
  if (saved) return saved;
  const browserLang = navigator.language.slice(0,2);
  if (['en','fr','ar'].includes(browserLang)) return browserLang;
  return 'en';
}
function switchLanguage(lang) {
  if (!['en','fr','ar'].includes(lang)) lang = 'en';
  localStorage.setItem('lang', lang);
  document.documentElement.lang = lang;
  document.documentElement.setAttribute('data-lang', lang);
  updateContent(lang);
  toggleRTL(lang === 'ar');
}
function updateContent(lang) {
  const t = translations[lang];
  // Nav
  document.querySelectorAll('[data-i18n="home"]').forEach(e => e.textContent = t.nav.home);
  document.querySelectorAll('[data-i18n="products"]').forEach(e => e.textContent = t.nav.products);
  document.querySelectorAll('[data-i18n="about"]').forEach(e => e.textContent = t.nav.about);
  document.querySelectorAll('[data-i18n="contact"]').forEach(e => e.textContent = t.nav.contact);
  // Hero
  const hero = t.hero;
  const heroSection = document.getElementById('hero');
  if (heroSection) {
    heroSection.querySelector('[data-i18n="hero.title"]').textContent = hero.title;
    heroSection.querySelector('[data-i18n="hero.subtitle"]').textContent = hero.subtitle;
    heroSection.querySelector('[data-i18n="hero.cta"]').textContent = hero.cta;
  }
  // Products
  const prod = t.products;
  document.querySelector('[data-i18n="products.title"]').textContent = prod.title;
  for (let i = 1; i <= 6; i++) {
    const productName = document.querySelector(`[data-i18n="products.product${i}.name"]`);
    const productDesc = document.querySelector(`[data-i18n="products.product${i}.description"]`);
    if (productName) productName.textContent = prod[`product${i}`].name;
    if (productDesc) productDesc.textContent = prod[`product${i}`].description;
  }
  document.querySelectorAll('[data-i18n="products.inquire"]').forEach(e => e.textContent = prod.inquire);
  // About
  document.querySelector('[data-i18n="about.title"]').textContent = t.about.title;
  document.querySelector('[data-i18n="about.text"]').textContent = t.about.text;
  // Contact
  const c = t.contact;
  document.querySelector('[data-i18n="contact.title"]').textContent = c.title;
  document.querySelector('[data-i18n="contact.name"]').textContent = c.name;
  document.querySelector('[data-i18n="contact.email"]').textContent = c.email;
  document.querySelector('[data-i18n="contact.message"]').textContent = c.message;
  document.querySelector('[data-i18n="contact.send"]').textContent = c.send;
  document.querySelector('[data-i18n="contact.whatsapp"]').textContent = c.whatsapp;
  document.querySelector('[data-i18n="contact.hours"]').textContent = c.hours;
  // Footer nav
  document.querySelectorAll('.footer-links [data-i18n="home"]').forEach(e => e.textContent = t.nav.home);
  document.querySelectorAll('.footer-links [data-i18n="products"]').forEach(e => e.textContent = t.nav.products);
  document.querySelectorAll('.footer-links [data-i18n="about"]').forEach(e => e.textContent = t.nav.about);
  document.querySelectorAll('.footer-links [data-i18n="contact"]').forEach(e => e.textContent = t.nav.contact);
  // Title
  document.querySelector('title').textContent = t.hero.title;
}
function toggleRTL(isRTL) {
  document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
}
// Language switcher event
window.addEventListener('DOMContentLoaded', () => {
  const lang = detectLanguage();
  switchLanguage(lang);
  document.querySelectorAll('.lang-switcher button').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    btn.addEventListener('click', e => {
      switchLanguage(btn.getAttribute('data-lang'));
      document.querySelectorAll('.lang-switcher button').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });
}); 