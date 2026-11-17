
/* ============ PrintHub — shared site logic ============ */
const DB = {
  get(key, fallback){ try{ const v = localStorage.getItem('icafe_'+key); return v===null ? fallback : JSON.parse(v);}catch(e){ return fallback; } },
  set(key, val){ localStorage.setItem('icafe_'+key, JSON.stringify(val)); }
};

const BIZ_DEFAULTS = {
  name: "PrintHub Internet Café",
  tagline: "Printing, typing & digital services",
  address: "123 Main Road, Johannesburg, 2000",
  hours: "Mon–Fri: 08:00 – 17:00 | Sat: 08:00 – 13:00 | Sun: Closed",
  phone: "+27 60 000 0000",
  email: "info@printhub.co.za",
  whatsapp: "27600000000",
  mapQuery: "Johannesburg City Centre"
};
const PRICE_DEFAULTS = { bw: 3.00, colour: 5.00, colourEnabled: true };

function getBiz(){ return Object.assign({}, BIZ_DEFAULTS, DB.get('biz', {})); }
function getPrices(){ return Object.assign({}, PRICE_DEFAULTS, DB.get('prices', {})); }
function fmtR(n){ return "R" + Number(n).toFixed(2); }

/* ---- inject business info into [data-biz] elements ---- */
function renderBiz(){
  const biz = getBiz();
  document.querySelectorAll('[data-biz]').forEach(el => { el.textContent = biz[el.dataset.biz] ?? ''; });
  document.querySelectorAll('[data-biz-link="whatsapp"]').forEach(el => {
    el.href = "https://wa.me/" + biz.whatsapp.replace(/\D/g,'') + "?text=" + encodeURIComponent("Hi " + biz.name + "! I have a question.");
  });
  const map = document.getElementById('gmap');
  if(map) map.src = "https://www.google.com/maps?q=" + encodeURIComponent(biz.mapQuery || biz.address) + "&output=embed";
}

/* ---- mobile nav ---- */
function initNav(){
  const t = document.getElementById('navToggle'), nav = document.getElementById('nav');
  if(t) t.addEventListener('click', () => nav.classList.toggle('open'));
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('#nav a').forEach(a => {
    if(a.getAttribute('href') === page) a.classList.add('active');
  });
}

/* ---- WhatsApp floating button ---- */
function injectWhatsApp(){
  if(document.querySelector('.wa-float')) return;
  const biz = getBiz();
  const a = document.createElement('a');
  a.className = 'wa-float'; a.target = '_blank';
  a.href = "https://wa.me/" + biz.whatsapp.replace(/\D/g,'') + "?text=" + encodeURIComponent("Hi " + biz.name + "!");
  a.innerHTML = '<svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg><span>Chat with us</span>';
  document.body.appendChild(a);
}

/* ---- scroll reveal ---- */
function initReveal(){
  const io = new IntersectionObserver(es => es.forEach(e => { if(e.isIntersecting){ e.target.classList.add('visible'); io.unobserve(e.target);} }), {threshold:.12});
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
}

/* ---- footer year ---- */
document.addEventListener('DOMContentLoaded', () => {
  renderBiz(); initNav(); injectWhatsApp(); initReveal();
  const y = document.getElementById('year'); if(y) y.textContent = new Date().getFullYear();
});
