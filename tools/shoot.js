const { chromium } = require(process.env.PLAYWRIGHT || 'playwright');
const OUT=process.env.OUT || 'shots/';
(async()=>{const b=await chromium.launch();
for (const [n,v,m] of [['d',{width:1440,height:900},false],['m',{width:390,height:844},true]]){
 const p=await b.newPage({viewport:v,isMobile:m,hasTouch:m,deviceScaleFactor:m?2:1});
 const errs=[]; p.on('pageerror',e=>errs.push(e.message)); p.on('console',c=>{if(c.type()==='error')errs.push(c.text())});
 await p.goto('http://localhost:8765/',{waitUntil:'networkidle'});
 await p.waitForTimeout(600); await p.screenshot({path:OUT+n+'-00-hero-early.png'});
 await p.waitForTimeout(3200); await p.screenshot({path:OUT+n+'-01-hero.png'});
 const H=await p.evaluate(()=>document.documentElement.scrollHeight);
 console.log(n,'height',H,'overflow',await p.evaluate(()=>[document.documentElement.scrollWidth,innerWidth]),'errs',errs);
 const ids=['pick','story','systems','projects','process','faq','contact'];
 let i=2;
 for(const id of ids){
   const y=await p.evaluate(id=>{const e=document.getElementById(id);return e.getBoundingClientRect().top+scrollY},id);
   if(id==='story'){
     for(const f of [0,0.3,0.55,0.8,1.0]){ await p.evaluate(y=>window.scrollTo(0,y),y+f*2200); await p.waitForTimeout(900); await p.screenshot({path:OUT+`${n}-${String(i++).padStart(2,'0')}-story-${f}.png`}); }
     continue;
   }
   if(id==='projects' && n==='d'){
     for(const f of [0,0.5,1]){ await p.evaluate(([y,f])=>window.scrollTo(0,y+f*1600),[y,f]); await p.waitForTimeout(900); await p.screenshot({path:OUT+`${n}-${String(i++).padStart(2,'0')}-proj-${f}.png`}); }
     continue;
   }
   await p.evaluate(y=>window.scrollTo(0,y-90),y); await p.waitForTimeout(900);
   await p.screenshot({path:OUT+`${n}-${String(i++).padStart(2,'0')}-${id}.png`});
   if(m && ['systems','process','contact'].includes(id)){ await p.evaluate(()=>window.scrollBy(0,innerHeight*.85)); await p.waitForTimeout(700); await p.screenshot({path:OUT+`${n}-${String(i++).padStart(2,'0')}-${id}-b.png`}); }
 }
 console.log(n,'errs after',errs);
 await p.close();
}
await b.close();})();
