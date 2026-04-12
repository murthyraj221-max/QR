function mapByArray(text, upper, lower, digits) {
  const U = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const L = 'abcdefghijklmnopqrstuvwxyz';
  const D = '0123456789';
  const map = {};
  if (upper) U.split('').forEach((c, i) => map[c] = upper[i] || c);
  if (lower) L.split('').forEach((c, i) => map[c] = lower[i] || c);
  if (digits) D.split('').forEach((c, i) => map[c] = digits[i] || c);
  return String(text).split('').map(ch => map[ch] ?? ch).join('');
}

function upperLower(upper, lower, digits = '0123456789') {
  return (t) => mapByArray(t, upper, lower, digits);
}

function spaced(text, gap = ' ') {
  return String(text).split('').join(gap);
}

function comb(text, mark = '\u0336') {
  return String(text).split('').map(ch => ch === ' ' ? ' ' : ch + mark).join('');
}

function mirror(text) {
  const m = {a:'ɒ',b:'d',c:'ɔ',d:'b',e:'ɘ',f:'ꟻ',g:'ƃ',h:'ʜ',i:'i',j:'ʝ',k:'ʞ',l:'l',m:'ɯ',n:'u',o:'o',p:'q',q:'p',r:'ɿ',s:'s',t:'ƚ',u:'n',v:'v',w:'w',x:'x',y:'ʎ',z:'z',A:'∀',B:'ᗺ',C:'Ɔ',D:'ᗡ',E:'Ǝ',F:'Ⅎ',G:'⅁',H:'H',I:'I',J:'ſ',K:'⋊',L:'˥',M:'W',N:'N',O:'O',P:'Ԁ',Q:'Ό',R:'ᴚ',S:'S',T:'┴',U:'∩',V:'Λ',W:'M',X:'X',Y:'⅄',Z:'Z',1:'Ɩ',2:'ᄅ',3:'Ɛ',4:'ㄣ',5:'ϛ',6:'9',7:'ㄥ',8:'8',9:'6',0:'0'};
  return String(text).split('').reverse().map(ch => m[ch] ?? ch).join('');
}

function upsideDown(text) {
  const m = {a:'ɐ',b:'q',c:'ɔ',d:'p',e:'ǝ',f:'ɟ',g:'ƃ',h:'ɥ',i:'ᴉ',j:'ɾ',k:'ʞ',l:'l',m:'ɯ',n:'u',o:'o',p:'d',q:'b',r:'ɹ',s:'s',t:'ʇ',u:'n',v:'ʌ',w:'ʍ',x:'x',y:'ʎ',z:'z',A:'∀',B:'𐐒',C:'Ɔ',D:'◖',E:'Ǝ',F:'Ⅎ',G:'פ',H:'H',I:'I',J:'ſ',K:'⋊',L:'˥',M:'W',N:'N',O:'O',P:'Ԁ',Q:'Ό',R:'ᴚ',S:'S',T:'┴',U:'∩',V:'Λ',W:'M',X:'X',Y:'⅄',Z:'Z',1:'Ɩ',2:'ᄅ',3:'Ɛ',4:'ㄣ',5:'ϛ',6:'9',7:'ㄥ',8:'8',9:'6',0:'0','.':'˙',',':"'",'"':'„','?':'¿','!':'¡','&':'⅋','(':'）',')':'(', '[':']',']':'[', '{':'}','}':'{'};
  return String(text).split('').reverse().map(ch => m[ch] ?? ch).join('');
}

function glitch(text) {
  const marks = ['\u0300','\u0301','\u0302','\u0303','\u0304','\u0307','\u0323','\u0334','\u0336'];
  let out = '';
  for (const ch of String(text)) {
    out += ch;
    if (ch !== ' ' && Math.random() < 0.55) out += marks[(Math.random() * marks.length) | 0] + marks[(Math.random() * marks.length) | 0];
  }
  return out;
}

const FULLWIDTH = upperLower('ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ', 'ａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚ', '０１２３４５６７８９');
const MONO = upperLower(
  String.fromCodePoint(...Array.from({length:26}, (_, i) => 0x1D670 + i)),
  String.fromCodePoint(...Array.from({length:26}, (_, i) => 0x1D68A + i)),
  String.fromCodePoint(...Array.from({length:10}, (_, i) => 0x1D7F6 + i))
);
const SANS_BOLD = upperLower(
  String.fromCodePoint(...Array.from({length:26}, (_, i) => 0x1D5D4 + i)),
  String.fromCodePoint(...Array.from({length:26}, (_, i) => 0x1D5EE + i)),
  String.fromCodePoint(...Array.from({length:10}, (_, i) => 0x1D7EC + i))
);
const SANS_ITALIC = upperLower(
  String.fromCodePoint(...Array.from({length:26}, (_, i) => 0x1D608 + i)),
  String.fromCodePoint(...Array.from({length:26}, (_, i) => 0x1D622 + i))
);
const SANS_BI = upperLower(
  String.fromCodePoint(...Array.from({length:26}, (_, i) => 0x1D63C + i)),
  String.fromCodePoint(...Array.from({length:26}, (_, i) => 0x1D656 + i))
);
const DSTRUCK = upperLower(
  ['𝔸','𝔹','ℂ','𝔻','𝔼','𝔽','𝔾','ℍ','𝕀','𝕁','𝕂','𝕃','𝕄','ℕ','𝕆','ℙ','ℚ','ℝ','𝕊','𝕋','𝕌','𝕍','𝕎','𝕏','𝕐','ℤ'],
  ['𝕒','𝕓','𝕔','𝕕','𝕖','𝕗','𝕘','𝕙','𝕚','𝕛','𝕜','𝕝','𝕞','𝕟','𝕠','𝕡','𝕢','𝕣','𝕤','𝕥','𝕦','𝕧','𝕨','𝕩','𝕪','𝕫'],
  ['𝟘','𝟙','𝟚','𝟛','𝟜','𝟝','𝟞','𝟟','𝟠','𝟡']
);
const SCRIPT = upperLower(
  ['𝒜','𝐵','𝒞','𝒟','𝐸','𝐹','𝒢','ℋ','ℐ','𝒥','𝒦','ℒ','𝑀','𝒩','𝒪','𝒫','𝒬','ℛ','𝒮','𝒯','𝒰','𝒱','𝒲','𝒳','𝒴','𝒵'],
  ['𝒶','𝒷','𝒸','𝒹','𝑒','𝒻','𝑔','𝒽','𝒾','𝒿','𝓀','𝓁','𝓂','𝓃','𝑜','𝓅','𝓆','𝓇','𝓈','𝓉','𝓊','𝓋','𝓌','𝓍','𝓎','𝓏']
);
const SCRIPT_BOLD = upperLower(
  ['𝓐','𝓑','𝓒','𝓓','𝓔','𝓕','𝓖','𝓗','𝓘','𝓙','𝓚','𝓛','𝓜','𝓝','𝓞','𝓟','𝓠','𝓡','𝓢','𝓣','𝓤','𝓥','𝓦','𝓧','𝓨','𝓩'],
  ['𝓪','𝓫','𝓬','𝓭','𝓮','𝓯','𝓰','𝓱','𝓲','𝓳','𝓴','𝓵','𝓶','𝓷','𝓸','𝓹','𝓺','𝓻','𝓼','𝓽','𝓾','𝓿','𝔀','𝔁','𝔂','𝔃']
);
const FRAKTUR = upperLower(
  ['𝔄','𝔅','ℭ','𝔇','𝔈','𝔉','𝔊','ℌ','ℑ','𝔍','𝔎','𝔏','𝔐','𝔑','𝔒','𝔓','𝔔','ℜ','𝔖','𝔗','𝔘','𝔙','𝔚','𝔛','𝔜','ℨ'],
  ['𝔞','𝔟','𝔠','𝔡','𝔢','𝔣','𝔤','𝔥','𝔦','𝔧','𝔨','𝔩','𝔪','𝔫','𝔬','𝔭','𝔮','𝔯','𝔰','𝔱','𝔲','𝔳','𝔴','𝔵','𝔶','𝔷']
);
const FRAKTUR_BOLD = upperLower(
  ['𝕬','𝕭','𝕮','𝕯','𝕰','𝕱','𝕲','𝕳','𝕴','𝕵','𝕶','𝕷','𝕸','𝕹','𝕺','𝕻','𝕼','𝕽','𝕾','𝕿','𝖀','𝖁','𝖂','𝖃','𝖄','𝖅'],
  ['𝖆','𝖇','𝖈','𝖉','𝖊','𝖋','𝖌','𝖍','𝖎','𝖏','𝖐','𝖑','𝖒','𝖓','𝖔','𝖕','𝖖','𝖗','𝖘','𝖙','𝖚','𝖛','𝖜','𝖝','𝖞','𝖟']
);
const SMALLCAPS = text => String(text).replace(/[a-zA-Z]/g, ch => {
  const m = {a:'ᴀ',b:'ʙ',c:'ᴄ',d:'ᴅ',e:'ᴇ',f:'ꜰ',g:'ɢ',h:'ʜ',i:'ɪ',j:'ᴊ',k:'ᴋ',l:'ʟ',m:'ᴍ',n:'ɴ',o:'ᴏ',p:'ᴘ',q:'ǫ',r:'ʀ',s:'ꜱ',t:'ᴛ',u:'ᴜ',v:'ᴠ',w:'ᴡ',x:'x',y:'ʏ',z:'ᴢ'};
  return m[ch.toLowerCase()] || ch;
});
const CIRCLED = upperLower(
  ['Ⓐ','Ⓑ','Ⓒ','Ⓓ','Ⓔ','Ⓕ','Ⓖ','Ⓗ','Ⓘ','Ⓙ','Ⓚ','Ⓛ','Ⓜ','Ⓝ','Ⓞ','Ⓟ','Ⓠ','Ⓡ','Ⓢ','Ⓣ','Ⓤ','Ⓥ','Ⓦ','Ⓧ','Ⓨ','Ⓩ'],
  ['ⓐ','ⓑ','ⓒ','ⓓ','ⓔ','ⓕ','ⓖ','ⓗ','ⓘ','ⓙ','ⓚ','ⓛ','ⓜ','ⓝ','ⓞ','ⓟ','ⓠ','ⓡ','ⓢ','ⓣ','ⓤ','ⓥ','ⓦ','ⓧ','ⓨ','ⓩ'],
  ['⓪','①','②','③','④','⑤','⑥','⑦','⑧','⑨']
);
const SQUARED = upperLower(
  ['🄰','🄱','🄲','🄳','🄴','🄵','🄶','🄷','🄸','🄹','🄺','🄻','🄼','🄽','🄾','🄿','🅀','🅁','🅂','🅃','🅄','🅅','🅆','🅇','🅈','🅉'],
  ['🄰','🄱','🄲','🄳','🄴','🄵','🄶','🄷','🄸','🄹','🄺','🄻','🄼','🄽','🄾','🄿','🅀','🅁','🅂','🅃','🅄','🅅','🅆','🅇','🅈','🅉']
);
const SUPERSCRIPT = text => String(text).replace(/[a-zA-Z0-9]/g, ch => ({a:'ᵃ',b:'ᵇ',c:'ᶜ',d:'ᵈ',e:'ᵉ',f:'ᶠ',g:'ᵍ',h:'ʰ',i:'ⁱ',j:'ʲ',k:'ᵏ',l:'ˡ',m:'ᵐ',n:'ⁿ',o:'ᵒ',p:'ᵖ',q:'ᑫ',r:'ʳ',s:'ˢ',t:'ᵗ',u:'ᵘ',v:'ᵛ',w:'ʷ',x:'ˣ',y:'ʸ',z:'ᶻ',A:'ᴬ',B:'ᴮ',D:'ᴰ',E:'ᴱ',G:'ᴳ',H:'ᴴ',I:'ᴵ',J:'ᴶ',K:'ᴷ',L:'ᴸ',M:'ᴹ',N:'ᴺ',O:'ᴼ',P:'ᴾ',R:'ᴿ',T:'ᵀ',U:'ᵁ',V:'ⱽ',W:'ᵂ',1:'¹',2:'²',3:'³',4:'⁴',5:'⁵',6:'⁶',7:'⁷',8:'⁸',9:'⁹',0:'⁰'}[ch] || ch));
const SUBSCRIPT = text => String(text).replace(/[a-z0-9]/gi, ch => ({a:'ₐ',e:'ₑ',h:'ₕ',i:'ᵢ',j:'ⱼ',k:'ₖ',l:'ₗ',m:'ₘ',n:'ₙ',o:'ₒ',p:'ₚ',r:'ᵣ',s:'ₛ',t:'ₜ',u:'ᵤ',v:'ᵥ',x:'ₓ',1:'₁',2:'₂',3:'₃',4:'₄',5:'₅',6:'₆',7:'₇',8:'₈',9:'₉',0:'₀'}[ch.toLowerCase()] || ch));
const WIDE = t => spaced(FULLWIDTH(t), ' ');
const SPACED = t => spaced(t, ' ');
const UNDERLINE = t => comb(t, '\u0332');
const STRIKE = t => comb(t, '\u0336');
const DOTTED = t => comb(t, '\u0323');
const RINGED = t => comb(t, '\u030a');
const BUBBLE = upperLower(
  ['🅰','🅱','🅲','🅳','🅴','🅵','🅶','🅷','🅸','🅹','🅺','🅻','🅼','🅽','🅾','🅿','🆀','🆁','🆂','🆃','🆄','🆅','🆆','🆇','🆈','🆉'],
  ['🅐','🅑','🅒','🅓','🅔','🅕','🅖','🅗','🅘','🅙','🅚','🅛','🅜','🅝','🅞','🅟','🅠','🅡','🅢','🅣','🅤','🅥','🅦','🅧','🅨','🅩']
);

const BASE_STYLES = [
  ['Plain','clean', t => String(t)],
  ['Fullwidth','wide', FULLWIDTH],
  ['Bold Sans','modern', SANS_BOLD],
  ['Italic Sans','modern', SANS_ITALIC],
  ['Bold Italic Sans','modern', SANS_BI],
  ['Monospace','tech', MONO],
  ['Double Struck','fancy', DSTRUCK],
  ['Script','elegant', SCRIPT],
  ['Script Bold','elegant', SCRIPT_BOLD],
  ['Fraktur','dark', FRAKTUR],
  ['Fraktur Bold','dark', FRAKTUR_BOLD],
  ['Small Caps','clean', SMALLCAPS],
  ['Circled','fun', CIRCLED],
  ['Squared','fun', SQUARED],
  ['Superscript','tiny', SUPERSCRIPT],
  ['Subscript','tiny', SUBSCRIPT],
  ['Wide','wide', WIDE],
  ['Spaced','clean', SPACED],
  ['Underline','clean', UNDERLINE],
  ['Strikethrough','clean', STRIKE],
  ['Dotted','clean', DOTTED],
  ['Ringed','clean', RINGED],
  ['Glitch','viral', glitch],
  ['Mirror','viral', mirror],
  ['Upside Down','viral', upsideDown],
  ['Bubble','gaming', BUBBLE]
];

const WRAPPERS = [
  ['Royal','gaming', t=>`꧁༒☬ ${t} ☬༒꧂`],
  ['Gamer','gaming', t=>`『 ${t} 』`],
  ['Neon','modern', t=>`✦ ${t} ✦`],
  ['Crown','royal', t=>`♛ ${t} ♛`],
  ['Fire','viral', t=>`🔥 ${t} 🔥`],
  ['Ice','viral', t=>`❄ ${t} ❄`],
  ['Diamond','premium', t=>`◇ ${t} ◇`],
  ['Premium','premium', t=>`✧ ${t} ✧`],
  ['Shadow','dark', t=>`▐ ${t} ▌`],
  ['Brackets','clean', t=>`【 ${t} 】`],
  ['Arrow','clean', t=>`⟦ ${t} ⟧`],
  ['Star','bright', t=>`★ ${t} ★`],
  ['Tribal','gaming', t=>`𓆩 ${t} 𓆪`],
  ['Mystic','gaming', t=>`⚡ ${t} ⚡`],
  ['Badge','modern', t=>`❖ ${t} ❖`],
  ['Slash','clean', t=>`// ${t} //`],
  ['Wave','modern', t=>`〰 ${t} 〰`],
  ['Dark','dark', t=>`☠ ${t} ☠`],
  ['Minimal','clean', t=>`• ${t} •`],
  ['Gold','premium', t=>`𓂀 ${t} 𓂀`],
  ['Spark','bright', t=>`✨ ${t} ✨`],
  ['Aura','bright', t=>`✺ ${t} ✺`],
  ['Line','clean', t=>`━━ ${t} ━━`],
  ['Oblique','clean', t=>`❘ ${t} ❘`]
];

const FONT_STYLES = [];
let idx = 1;
for (const [baseName, baseCat, baseFn] of BASE_STYLES) {
  for (const [wrapName, wrapCat, wrapFn] of WRAPPERS) {
    FONT_STYLES.push({
      id: `s${String(idx).padStart(3, '0')}`,
      name: `${wrapName} ${baseName}`,
      category: `${baseCat} • ${wrapCat}`,
      transform(text) { return wrapFn(baseFn(text)); }
    });
    idx++;
  }
}
window.FONT_STYLES = FONT_STYLES;
window.FONT_STYLE_TOTAL = FONT_STYLES.length;
