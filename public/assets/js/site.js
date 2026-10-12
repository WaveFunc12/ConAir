document.addEventListener('DOMContentLoaded', function(){
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var desktop = matchMedia('(min-width: 901px)').matches;

  /* Traffic source: ?src=tiktok or utm_source=tiktok is stored with the lead and in the WhatsApp text */
  var q = new URLSearchParams(location.search);
  var src = q.get('src') || q.get('utm_source');
  if (src) document.getElementById('source').value = src;
  var waText = 'היי, הגעתי מהאתר' + (src === 'tiktok' ? ' דרך טיקטוק' : '') + ' ואשמח לתאם ביקור';
  document.querySelectorAll('.js-wa').forEach(function(a){ a.href = 'https://wa.me/972509990735?text=' + encodeURIComponent(waText); });

  /* Header: compact, tuck on scroll down on phones, active link */
  var hdr = document.getElementById('hdr'), dock = document.getElementById('dock');
  var lastY = 0, hero = document.getElementById('top');
  function onScroll(){
    var y = window.scrollY;
    hdr.classList.toggle('compact', y > 40);
    if (innerWidth <= 640) hdr.classList.toggle('tuck', y > lastY && y > 200);
    else hdr.classList.remove('tuck');
    dock.classList.toggle('show', y > (hero ? hero.offsetHeight * .7 : 160));
    lastY = y;
  }
  addEventListener('scroll', onScroll, {passive:true}); onScroll();
  var links = document.querySelectorAll('.nav a');
  var io = new IntersectionObserver(function(es){ es.forEach(function(e){ if(e.isIntersecting){ links.forEach(function(l){ l.classList.toggle('on', l.getAttribute('href') === '#'+e.target.id); }); } }); }, {rootMargin:'-45% 0px -50% 0px'});
  ['pick','story','projects','process','faq'].forEach(function(id){ var el = document.getElementById(id); if (el) io.observe(el); });

  /* Phone menu */
  var sheet = document.getElementById('sheet'), mb = document.querySelector('.menu-btn');
  function setMenu(open){ sheet.classList.toggle('open', open); mb.setAttribute('aria-expanded', open); document.body.style.overflow = open ? 'hidden' : ''; if(open) sheet.querySelector('.sheet-close').focus(); }
  mb.addEventListener('click', function(){ setMenu(true); });
  sheet.querySelector('.sheet-close').addEventListener('click', function(){ setMenu(false); mb.focus(); });
  sheet.querySelectorAll('a').forEach(function(a){ a.addEventListener('click', function(){ setMenu(false); }); });
  addEventListener('keydown', function(e){ if(e.key === 'Escape' && sheet.classList.contains('open')){ setMenu(false); mb.focus(); } });

  /* Everything below is for the home page only */
  if (!document.getElementById('pick')) return;

  /* Property selector */
  var data = {
    villa:{img:'assets/img/loft.webp',alt:'בית פרטי בגובה כפול עם גלריה',sys:'ההמלצה שלנו: וי־אר־אף',h:'מנוע אחד לכל הבית, ושליטה נפרדת בכל חדר',li:['מתכננים בשלב השלד, כדי שהצנרת תיכנס לפני הטיח','גוף מיזוג נסתר בתקרה בכל חדר, בלי קופסאות על הקירות','מנוע מודולרי שמותאם לגודל הבית']},
    flat:{img:'assets/img/window.webp',alt:'פינת מגורים מוארת בדירה',sys:'ההמלצה שלנו: מיני וי־אר־אף או מולטי',h:'מנוע אחד במרפסת השירות, וכל החדרים קרירים',li:['במקום שורת מנועים על הקיר, מנוע אחד','גופים שקטים שמשתלבים בתקרה או בקיר','מתאים גם לשיפוץ של דירה קיימת']},
    office:{img:'assets/img/lounge.webp',alt:'חלל משרדים פתוח',sys:'ההמלצה שלנו: וי־אר־אף',h:'כל חדר ישיבות בטמפרטורה משלו',li:['חלוקה לאזורים לפי שעות ושימוש','שליטה מרכזית לכל המשרד','צריכת חשמל נמוכה יותר ממזגנים נפרדים']},
    tower:{img:'assets/img/kitchen.webp',alt:'חלל פתוח ומואר',sys:'ההמלצה שלנו: פן־קויל וצ\'ילרים',h:'מערכת מים קרים אחת לבניין שלם',li:['מתאים לרבי קומות, מגדלים ובתי מסחר','שליטה נפרדת לכל יחידה וקומה','תכנון מלא מול צוות הבנייה']}
  };
  var tabs = document.querySelectorAll('.tab'), pImg = document.getElementById('pick-img'), pBody = document.getElementById('pick-body');
  function show(k){
    var d = data[k];
    tabs.forEach(function(t){ var on = t.dataset.k === k; t.setAttribute('aria-selected', on); t.tabIndex = on ? 0 : -1; });
    pImg.src = d.img; pImg.alt = d.alt;
    pBody.querySelector('.pick-sys').textContent = d.sys;
    pBody.querySelector('h3').textContent = d.h;
    pBody.querySelector('ul').innerHTML = d.li.map(function(x){ return '<li>'+x+'</li>'; }).join('');
    pBody.classList.remove('fade-swap'); void pBody.offsetWidth; pBody.classList.add('fade-swap');
    var f = document.getElementById('f-type'); f.selectedIndex = {villa:0,flat:1,office:2,tower:3}[k];
  }
  tabs.forEach(function(t, i){
    t.addEventListener('click', function(){ show(t.dataset.k); });
    t.addEventListener('keydown', function(e){
      var n = e.key === 'ArrowLeft' ? 1 : e.key === 'ArrowRight' ? -1 : 0; /* RTL: left is next */
      if(!n) return; var j = (i + n + tabs.length) % tabs.length; tabs[j].focus(); show(tabs[j].dataset.k);
    });
  });

  /* Form */
  var form = document.getElementById('form');
  form.addEventListener('submit', function(e){
    e.preventDefault();
    var ok = true, name = form.name.value.trim(), tel = form.phone.value.replace(/[^\d+]/g,'');
    document.getElementById('e-name').textContent = name ? '' : 'צריך שם כדי שנדע למי לחזור';
    document.getElementById('e-tel').textContent = tel.length >= 9 ? '' : 'מספר טלפון עם 9 ספרות לפחות';
    document.getElementById('e-consent').textContent = form.consent.checked ? '' : 'צריך לאשר כדי שנוכל לחזור אליכם';
    if (!name || tel.length < 9 || !form.consent.checked) return;
    var body = new URLSearchParams(new FormData(form)).toString();
    fetch('/', {method:'POST', headers:{'Content-Type':'application/x-www-form-urlencoded'}, body:body})
      .then(function(r){ if(!r.ok) throw 0; document.getElementById('form-ok').hidden = false; document.getElementById('form-bad').hidden = true; form.querySelector('button').hidden = true; })
      .catch(function(){ document.getElementById('form-bad').hidden = false; });
  });

  if (reduce || !window.gsap) return;
  gsap.registerPlugin(ScrollTrigger);

  /* Smooth scroll on desktop */
  if (desktop && window.Lenis) {
    var lenis = new Lenis({lerp:.1});
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(function(t){ lenis.raf(t * 1000); }); gsap.ticker.lagSmoothing(0);
    document.querySelectorAll('a[href^="#"]').forEach(function(a){ a.addEventListener('click', function(e){ var id = a.getAttribute('href'); if(id.length > 1 && document.querySelector(id)){ e.preventDefault(); lenis.scrollTo(id, {offset:-90}); } }); });
  }

  /* Hero: the room cools from 31 to 22 on load */
  var deg = document.getElementById('deg'), t = {v:31};
  var tl = gsap.timeline({defaults:{ease:'expo.out'}});
  tl.fromTo('.hero h1 .l', {yPercent:40, opacity:0}, {yPercent:0, opacity:1, duration:1.2, stagger:.12, clearProps:'transform,opacity'})
    .fromTo('.hero .lead', {y:16, opacity:0}, {y:0, opacity:1, duration:1, clearProps:'transform,opacity'}, .25)
    .fromTo('.hero-cta .btn', {y:14, opacity:0}, {y:0, opacity:1, duration:.9, stagger:.08, clearProps:'transform,opacity'}, .35)
    .fromTo('.hero-media', {clipPath:'inset(8% 0 8% 0 round 20px)', scale:1.04}, {clipPath:'inset(0% 0 0% 0 round 20px)', scale:1, duration:1.6, clearProps:'clipPath,transform'}, 0)
    .fromTo('.heat', {opacity:1}, {opacity:0, duration:2.6, ease:'power2.inOut'}, .6)
    .fromTo('.chill', {opacity:0}, {opacity:1, duration:2.2, ease:'power2.out'}, 1.2)
    .fromTo(t, {v:31}, {v:22, duration:2.6, ease:'power2.inOut', onUpdate:function(){ deg.textContent = Math.round(t.v) + '°'; }}, .6)
    .fromTo('.thermo, .thermo-meta', {y:20, opacity:0}, {y:0, opacity:1, duration:.9, stagger:.1, clearProps:'transform,opacity'}, .4);

  /* Story: six units become one, scrubbed and pinned */
  var steps = document.getElementById('steps'); steps.classList.add('js-story');
  var cnt = document.getElementById('count'), cntT = document.getElementById('count-t');
  var pipe = document.getElementById('pipe'), len = pipe.getTotalLength();
  gsap.set(pipe, {strokeDasharray:len, strokeDashoffset:len});
  gsap.set('#stB .roof-unit', {opacity:0, scale:.6, transformOrigin:'50% 50%'});
  gsap.set('#stB .slots line', {opacity:0, scaleX:0, transformOrigin:'50% 50%'});
  gsap.set('#stB .temps text', {opacity:0, y:8});
  gsap.set('#stB', {opacity:1}); gsap.set('#stA', {opacity:1});
  cnt.textContent = '6'; cntT.textContent = 'מנועים, אחד לכל חדר';
  var st = gsap.timeline({scrollTrigger:{trigger:'#story', start:'top top', end:'+=2200', pin:'.story-pin', scrub:.6, anticipatePin:1,
    onUpdate:function(s){ var p = s.progress; cnt.textContent = p < .42 ? '6' : '1'; cntT.textContent = p < .42 ? 'מנועים, אחד לכל חדר' : 'מנוע אחד לכל החדרים'; }}});
  st.to({}, {duration:.6})
    .to('#steps .s1', {opacity:0, duration:.3}, .6)
    .to('#steps .s2', {opacity:1, duration:.3}, .8)
    .to('#stA .odus g', {opacity:0, x:function(i){ return 565 - [425,265,105,425,265,105][i]; }, y:function(i){ return i < 3 ? -12 : -390; }, duration:.7, stagger:.04}, .7)
    .to('#stA .wallunit', {opacity:0, duration:.4, stagger:.03}, .8)
    .to('#stA .hot text', {opacity:0, duration:.4}, .9)
    .to('#stB .roof-unit', {opacity:1, scale:1, duration:.5, ease:'back.out(1.6)'}, 1.1)
    .to(pipe, {strokeDashoffset:0, duration:1.1, ease:'none'}, 1.3)
    .to('#stB .slots line', {opacity:1, scaleX:1, duration:.4, stagger:.05}, 2.1)
    .to('#steps .s2', {opacity:0, duration:.3}, 2.5)
    .to('#steps .s3', {opacity:1, duration:.3}, 2.7)
    .to('#stB .temps text', {opacity:1, y:0, duration:.5, stagger:.06}, 2.6)
    .to({}, {duration:.5});

  ScrollTrigger.create({trigger:'#story', start:'top 60px', end:'bottom 60px', toggleClass:{targets:'#hdr', className:'dark'}});

  /* Projects: horizontal pan on desktop */
  if (desktop) {
    var track = document.getElementById('proj-track');
    document.querySelector('.projects').classList.add('pan-on');
    var dist = function(){ return Math.max(0, track.scrollWidth - innerWidth + 80); };
    gsap.to(track, {x:function(){ return dist(); }, ease:'none', scrollTrigger:{trigger:'.proj-pin', start:'center center', end:function(){ return '+=' + dist(); }, pin:'.projects', scrub:.8, invalidateOnRefresh:true}});
  }

  /* Process: the line fills as you read */
  gsap.fromTo('#tl-fill', {scaleY:0}, {scaleY:1, ease:'none', scrollTrigger:{trigger:'#tl', start:'top 70%', end:'bottom 60%', scrub:true}});
});
