const $ = (s, el=document) => el.querySelector(s);
const $$ = (s, el=document) => [...el.querySelectorAll(s)];
let qr=null, logoData=null;

function toast(msg){
  let t = document.getElementById('toast');
  if(!t){ t=document.createElement('div'); t.id='toast'; document.body.appendChild(t); }
  t.textContent = msg; t.style.cssText='position:fixed;right:18px;bottom:18px;z-index:9999;background:#0f172a;color:#fff;padding:12px 16px;border-radius:14px;box-shadow:0 14px 40px rgba(15,23,42,.18);font-weight:600;max-width:320px';
  clearTimeout(toast._t); toast._t = setTimeout(()=>t.remove(), 2200);
}

function setEmpty(show){ $('#qr-empty').classList.toggle('hidden', !show); }
function qrContent(){ return ($('#qr-input').value||'').trim(); }
function buildTemplate(t){
  const m = {
    website:'https://example.com',
    whatsapp:'https://wa.me/91XXXXXXXXXX',
    wifi:'WIFI:T:WPA;S:YourWifiName;P:YourPassword;;',
    upi:'upi://pay?pa=yourupi@bank&pn=YourName&cu=INR',
    contact:'BEGIN:VCARD\nVERSION:3.0\nFN:Your Name\nTEL:+91XXXXXXXXXX\nEMAIL:you@example.com\nEND:VCARD'
  };
  $('#qr-input').value = m[t] || '';
  $('#qr-input').focus();
}

function logoHandler(file){
  if(!file){ logoData=null; return; }
  const fr = new FileReader();
  fr.onload = () => logoData = fr.result;
  fr.readAsDataURL(file);
}

async function renderQR(){
  const content = qrContent();
  if(!content){ alert('Please enter content first'); return; }
  const size = parseInt($('#qr-size').value, 10) || 300;
  const ecl = $('#qr-error').value || 'M';
  const fg = $('#qr-fg').value;
  const bg = $('#qr-bg').value;
  qr = new QRCodeStyling({
    width: size,
    height: size,
    data: content,
    type: 'svg',
    margin: 12,
    qrOptions: { errorCorrectionLevel: ecl },
    dotsOptions: { color: fg, type: 'rounded' },
    cornersSquareOptions: { color: fg, type: 'extra-rounded' },
    cornersDotOptions: { color: fg, type: 'dot' },
    backgroundOptions: { color: bg },
    image: logoData || undefined,
    imageOptions: { margin: 6, imageSize: 0.22, hideBackgroundDots: true }
  });
  const out = $('#qr-output'); out.innerHTML=''; qr.append(out);
  setEmpty(false);
  $('#download-png').disabled = false;
  $('#download-svg').disabled = false;
  document.querySelector('#qr-section').scrollIntoView({behavior:'smooth', block:'start'});
}

async function downloadQR(type){
  if(!qr) return toast('Generate a QR code first');
  const blob = await qr.getRawData(type);
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = `flexqr.${type}`; a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function esc(s){
  return String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#39;');
}

function renderStyles(){
  const name = ($('#name-input').value||'').trim();
  const q = ($('#style-search').value||'').trim().toLowerCase();
  const box = $('#style-results');
  if(!name){
    box.innerHTML = `<div class="style-card" style="grid-column:1/-1;text-align:center;padding:28px"><div class="style-text" style="font-size:18px">Type your name and press Generate Styles</div><div class="style-small">You will see 500+ stylish versions here.</div></div>`;
    $('#style-count').textContent = '500+ styles available';
    $('#copy-best').onclick = () => toast('Type a name first');
    return;
  }
  const styles = FONT_STYLES.filter(s => !q || `${s.name} ${s.category}`.toLowerCase().includes(q));
  $('#style-count').textContent = `${styles.length} styles shown • 500+ total`;
  $('#copy-best').onclick = () => copyText(styles[0] ? styles[0].transform(name) : name);
  const frag = document.createDocumentFragment();
  styles.forEach(style => {
    const value = style.transform(name);
    const el = document.createElement('div');
    el.className = 'style-card';
    el.innerHTML = `
      <div class="style-meta"><div class="style-name">${esc(style.name)}</div><button class="style-copy" type="button">Copy</button></div>
      <div class="style-text">${esc(value)}</div>
      <div class="style-small">${esc(style.category)}</div>
    `;
    el.addEventListener('click', () => copyText(value));
    el.querySelector('.style-copy').addEventListener('click', e => { e.stopPropagation(); copyText(value); });
    frag.appendChild(el);
  });
  box.innerHTML=''; box.appendChild(frag);
}

function copyText(text){
  navigator.clipboard?.writeText(text).then(() => toast('Copied to clipboard!')).catch(() => {
    const ta = document.createElement('textarea');
    ta.value = text; document.body.appendChild(ta); ta.select(); document.execCommand('copy'); ta.remove(); toast('Copied to clipboard!');
  });
}

function init(){
  setEmpty(true);
  $$('.chip').forEach(btn => btn.addEventListener('click', () => buildTemplate(btn.dataset.template)));
  $('#qr-generate').addEventListener('click', renderQR);
  $('#download-png').addEventListener('click', () => downloadQR('png'));
  $('#download-svg').addEventListener('click', () => downloadQR('svg'));
  $('#qr-logo').addEventListener('change', e => logoHandler(e.target.files[0]));
  $('#name-generate').addEventListener('click', renderStyles);
  $('#name-input').addEventListener('input', renderStyles);
  $('#style-search').addEventListener('input', renderStyles);
  renderStyles();
}

document.addEventListener('DOMContentLoaded', init);
