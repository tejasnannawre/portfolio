(() => {
const $ = (s, a = document) => a.querySelector(s), $$ = (s, a = document) => [...a.querySelectorAll(s)];
const calm = matchMedia('(prefers-reduced-motion:reduce)').matches, fine = matchMedia('(hover:hover)').matches;

/* kinetic name: letters react to the cursor */
const nm = $('#name'); let li = 0;
nm.innerHTML = nm.textContent.trim().split(' ').map(w => `<span class="wd">${[...w].map(c => `<span class="ch" style="--i:${li++}">${c}</span>`).join('')}</span>`).join('');
const chars = $$('.ch', nm);
addEventListener('mousemove', e => { chars.forEach(c => { const r = c.getBoundingClientRect(), d = Math.hypot(e.clientX - (r.left + r.width / 2), e.clientY - (r.top + r.height / 2)); c.style.setProperty('--k', Math.max(0, 1 - d / 190).toFixed(2)); }); });

/* hero photo: duotone with a colour spotlight under the cursor */
const hero = $('#top'), arch = $('.arch');
const clock = () => $('#clock').textContent = 'Pune, India  ' + new Date().toLocaleTimeString('en-IN', {timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', hour12: false}) + ' IST';
clock(); setInterval(clock, 30000);

/* projects (horizontal pinned scroll) */
const P = [
 {t:'College Conference Website', k:'College project, built with a friend', lt:'Visit the live site', l:'https://conference.imedpune.org/',
  d:'The official website for the International Conference 2027, "Scaling AI for Sustainable Impact", hosted by Bharati Vidyapeeth\'s IMED, Pune with the University of Salford. We built it from scratch with HTML, CSS and JavaScript, and it is live on the college domain.',
  s:[['Explore','Visitors see the conference theme, dates, subthemes, speakers, schedule, venue and FAQ, plus a countdown and an add-to-calendar option.'],['Register','A registration form leads to a payment page: pay by QR or UPI, then enter the transaction ID and upload proof.'],['Submit a paper','Authors pick a subtheme, upload their manuscript and receive a Submission ID.'],['Track status','Using the Submission ID, authors can check whether a paper is pending, under review, accepted or needs revisions.']],
  g:['HTML','CSS','JavaScript']},
 {t:'Civic Issue Reporting Platform', k:'Webathon project', l:'https://github.com/tejasnannawre/city-issue-reporting-dashboard', d:'A social-media-style platform connecting citizens with the Public Works Department (PWD) to report broken roads, garbage sites and other civic issues.',
  s:[['Citizen','Captures a live photo of the problem with the in-app camera.'],['Geotag','The photo is tagged with its exact location.'],['Public feed','Reports appear in an Instagram/Twitter-style feed with likes and comments.'],['PWD team','Public Works users view reported issues and resolve them.'],['Proof','A proof-of-resolution photo is posted for public visibility.']],
  g:['Python','Node.js','MongoDB']},
 {t:'College Internship Tracker', k:'Final-year group project', d:'A multi-role internship management system built with a team, with separate Student, Mentor and TPO/Admin tiers.',
  s:[['Student','Applies for an internship through the portal.'],['Mentor','Reviews the application and passes it on.'],['TPO / Admin','Gives the final approval.'],['Confirmed','Internship confirmed. Geo-tracked attendance, AI-based attendance and an automated CV generator support the process.']], g:['Python','HTML','CSS','MySQL']},
 {t:'Serverless Image Compressor', k:'Cloud Computing mini project', d:'An image compression tool built on a Fission-based cloud function architecture.',
  s:[['Upload','The user uploads an image.'],['Filter','Picks a filter to apply during compression.'],['Cloud function','A Fission serverless function compresses the image.'],['Download','The user downloads the compressed file.']], g:['Fission','Node.js','Python']},
 {t:'Web Technology Assignments', k:'Coursework repository', l:'https://github.com/tejasnannawre/Web-Tech-Assignments',
  d:'My web technology coursework in one organised GitHub repository: five assignments plus a folder of mini-projects, tracked with Git.',
  s:[['Assignments 1 to 5','Five web technology assignments, each in its own folder.'],['Mini-projects','A separate folder for the smaller practice projects.'],['Version control','The whole repository is tracked with Git.'],['On GitHub','Published on GitHub so anyone can browse the code.']], g:['Web Technologies','Git','GitHub']}
];

const track = $('#track');
P.forEach((p, i) => {
  const d = document.createElement('div'); d.className = 'pn';
  d.innerHTML = `<span class="num">0${i + 1}</span><div class="pt"><span class="kind">${p.k}</span><h3>${p.t}</h3><p>${p.d}</p><div class="tags">${p.g.map(x => `<em>${x}</em>`).join('')}</div>${p.l ? `<a class="l" href="${p.l}" target="_blank" rel="noopener">${p.lt || 'View on GitHub'}</a>` : ''}</div>
  <ol class="steps">${p.s.map(s => `<li><b>${s[0]}</b><p><span>${s[1]}</span></p></li>`).join('')}</ol>`;
  track.append(d); p.el = $('.steps', d); p.i = 0; p.n = p.s.length;
});
function lit(p, i) { p.i = i; $$('li', p.el).forEach((li, j) => { li.classList.toggle('on', j === i); li.classList.toggle('done', j < i); }); p.el.style.setProperty('--f', i / (p.n - 1) * 100); }
P.forEach(p => { lit(p, 0); $$('li', p.el).forEach((li, j) => { li.onmouseenter = li.onclick = () => { p.hold = 1; lit(p, j); }; li.onmouseleave = () => p.hold = 0; }); });
if (!calm) setInterval(() => P.forEach(p => { if (!p.hold) lit(p, (p.i + 1) % p.n); }), 2400);

const hs = $('#work'), hp = $('#hprog'), nums = $$('.pn .num'); let maxX = 0;
const wide = () => innerWidth > 860;
function layout() { if (wide()) { maxX = track.scrollWidth - innerWidth; hs.style.height = (maxX + innerHeight) + 'px'; } else { hs.style.height = ''; track.style.transform = ''; } }
function pan() { if (!wide()) return; const p = Math.max(0, Math.min(1, (scrollY - hs.offsetTop) / (hs.offsetHeight - innerHeight))); track.style.transform = `translate3d(${-p * maxX}px,0,0)`; hp.style.transform = `scaleX(${p})`; nums.forEach(n => n.style.transform = `translateX(${p * 160}px)`); }
layout(); addEventListener('resize', () => { layout(); pan(); }); addEventListener('load', () => { layout(); pan(); });

/* statement words fill in as you scroll */
const sc = $('#scrub'); sc.innerHTML = sc.textContent.trim().split(' ').map(w => `<span>${w}</span>`).join(' '); const ws = $$('span', sc);
function scrub() { const r = sc.getBoundingClientRect(), p = Math.max(0, Math.min(1, (innerHeight * .85 - r.top) / (r.height + innerHeight * .25))); ws.forEach((w, i) => w.classList.toggle('on', i < p * ws.length + .5)); }

/* skills sphere */
const U = {Python:['Civic Issue Reporting','Internship Tracker','Image Compressor'], 'Node.js':['Civic Issue Reporting','Image Compressor'], MongoDB:['Civic Issue Reporting'], MySQL:['Internship Tracker'], HTML:['College Conference Website','Internship Tracker'], CSS:['College Conference Website','Internship Tracker'], JavaScript:['College Conference Website'], Fission:['Image Compressor'], Git:['Civic Issue Reporting','Web Technology Assignments'], GitHub:['Civic Issue Reporting','Web Technology Assignments']};
const W = ['Python', 'Java', 'JavaScript', 'C', 'C++', 'Node.js', 'HTML', 'CSS', 'MySQL', 'MongoDB', 'Fission', 'Git', 'GitHub', 'DBMS', 'OOP', 'Cloud Computing', 'IoT', 'Data Science'];
const sp = $('#sphere'), info = $('#info'), base = info.textContent;
const pts = W.map((w, i) => { const y = 1 - i / (W.length - 1) * 2, r = Math.sqrt(1 - y * y), t = i * 2.39996; const b = document.createElement('button'); b.textContent = w; sp.append(b);
  b.onmouseenter = b.onfocus = b.onclick = () => { $$('button', sp).forEach(x => x.classList.toggle('on', x === b)); hold = 1; info.innerHTML = U[w] ? `<b>${w}</b> is used in: ${U[w].join(', ')}.` : `<b>${w}</b> is part of my academic coursework and practice.`; };
  b.onmouseleave = b.onblur = () => { hold = 0; b.classList.remove('on'); info.textContent = base; };
  return {b, x: Math.cos(t) * r, y, z: Math.sin(t) * r}; });
let ay = 0, ax = 0, mxs = 0, mys = 0, hold = 0;
sp.addEventListener('mousemove', e => { const r = sp.getBoundingClientRect(); mxs = (e.clientX - r.left) / r.width - .5; mys = (e.clientY - r.top) / r.height - .5; });
sp.addEventListener('mouseleave', () => { mxs = 0; mys = 0; });
(function spin() {
  const R = sp.clientWidth * .42; if (!hold && !calm) ay += .004 + mxs * .02; ax += (mys * .9 - ax) * .06;
  const ca = Math.cos(ay), sa = Math.sin(ay), cb = Math.cos(ax), sb = Math.sin(ax);
  pts.forEach(p => { const x1 = p.x * ca + p.z * sa, z1 = -p.x * sa + p.z * ca, y2 = p.y * cb - z1 * sb, z2 = p.y * sb + z1 * cb, s = .65 + (z2 + 1) * .25;
    p.b.style.transform = `translate(-50%,-50%) translate(${x1 * R}px,${y2 * R}px) scale(${s})`; p.b.style.opacity = .3 + (z2 + 1) * .35; p.b.style.zIndex = Math.round((z2 + 1) * 10); });
  requestAnimationFrame(spin);
})();

/* nav: tone follows the section underneath, hides on scroll down */
const nav = $('#nav'), links = $$('#nav nav a'); let lastY = 0;
new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { nav.dataset.tone = e.target.dataset.tone; links.forEach(a => a.classList.toggle('on', a.getAttribute('href') === '#' + e.target.id)); } }), {rootMargin: '0px 0px -92% 0px'}).observe && $$('[data-tone]:not(#nav)').forEach(s => new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { nav.dataset.tone = s.dataset.tone; links.forEach(a => a.classList.toggle('on', a.getAttribute('href') === '#' + s.id)); } }), {rootMargin: '0px 0px -92% 0px'}).observe(s));
addEventListener('scroll', () => { const y = scrollY; nav.classList.toggle('hide', y > lastY && y > 300); lastY = y; $('#bar').style.width = y / (document.documentElement.scrollHeight - innerHeight) * 100 + '%'; pan(); scrub(); }, {passive: true}); scrub();

/* cursor ring + magnetic buttons */
if (fine) {
  const c = $('#cur'); let x = 0, y = 0, tx = 0, ty = 0;
  addEventListener('mousemove', e => { tx = e.clientX; ty = e.clientY; });
  (function f() { x += (tx - x) * .18; y += (ty - y) * .18; c.style.left = x + 'px'; c.style.top = y + 'px'; requestAnimationFrame(f); })();
  $$('a,button,li,.lc').forEach(el => { el.addEventListener('mouseenter', () => c.classList.add('big')); el.addEventListener('mouseleave', () => c.classList.remove('big')); });
  $$('.mag').forEach(b => { b.addEventListener('mousemove', e => { const r = b.getBoundingClientRect(); b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * .25}px,${(e.clientY - r.top - r.height / 2) * .35}px)`; }); b.addEventListener('mouseleave', () => b.style.transform = ''); });
}
$('#copy').onclick = async e => { const m = 'tejasnannawre@gmail.com'; try { await navigator.clipboard.writeText(m); } catch { const t = document.createElement('textarea'); t.value = m; document.body.append(t); t.select(); document.execCommand('copy'); t.remove(); } e.target.textContent = 'Copied!'; setTimeout(() => e.target.textContent = 'Copy email', 1800); };

/* experience: left index follows the stacking cards */
const cxs = $$('.cx'), idx = $$('#idx li'), cn = $('#cn');
function expUpd() { let a = 0; cxs.forEach((c, i) => { if (c.getBoundingClientRect().top <= 110 + i * 26 + innerHeight * .35) a = i; }); idx.forEach((l, i) => l.classList.toggle('on', i === a)); cn.textContent = '0' + (a + 1); }
addEventListener('scroll', expUpd, {passive: true}); expUpd();
})();
