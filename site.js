// Shared behavior: mobile menu, hero video control, scroll reveals, count-up, parallax.
const burger=document.getElementById('burger'),nav=document.getElementById('nav');
if(burger)burger.onclick=()=>nav.classList.toggle('open');

const heroV=document.getElementById('heroVideo'),pb=document.getElementById('pause');
if(heroV&&pb)pb.onclick=()=>{const off=!heroV.paused;off?heroV.pause():heroV.play();pb.classList.toggle('off',off);pb.setAttribute('aria-label',off?'Play video':'Pause video')};

const fmt=(el,v)=>{el.textContent=(el.dataset.pre||'')+v+(el.dataset.suf||'')};
const io=new IntersectionObserver(es=>es.forEach(e=>{
  if(!e.isIntersecting)return;
  e.target.classList.add('in');io.unobserve(e.target);
  e.target.querySelectorAll('[data-to]').forEach(el=>{
    const to=+el.dataset.to,st=performance.now();
    (function s(n){const k=Math.min((n-st)/1400,1);fmt(el,Math.round(to*(1-Math.pow(1-k,3))));if(k<1)requestAnimationFrame(s)})(st);
  });
}),{threshold:.2});
document.querySelectorAll('.rv,.reveal').forEach(el=>io.observe(el));

const pars=[...document.querySelectorAll('[data-par]')],h1=document.querySelector('.hero h1');
function onScroll(){
  if(h1)h1.style.transform=`translateY(${scrollY*.12}px)`;
  pars.forEach(im=>{const r=im.parentElement.getBoundingClientRect();im.style.translate=`0 ${(r.top+r.height/2-innerHeight/2)*-.07}px`});
}
addEventListener('scroll',onScroll,{passive:true});onScroll();

// Admin sign-in: credentials are checked by the Apps Script (not in this file); data loads only after sign-in.
const BASTION_ADMIN_ENDPOINT='https://script.google.com/macros/s/AKfycbx-5JAkwXLPn2lSf8S6YmUPRGSe6agOHyMK9cB9wwMdCgqHth16wcEjSkdfMlWqdK8SwA/exec';
function bastionAdminFetch(user,pass){return fetch(BASTION_ADMIN_ENDPOINT,{method:'POST',headers:{'Content-Type':'text/plain;charset=utf-8'},body:JSON.stringify({action:'list',user:user,pass:pass})}).then(r=>r.json())}
function bastionAdminSession(){try{return JSON.parse(sessionStorage.getItem('bastionAdmin')||'null')}catch(e){return null}}
// Show an Admin tab in the menu while signed in.
(function(){
  if(!bastionAdminSession())return;
  const n=document.getElementById('nav');if(!n||n.querySelector('.nav-admin'))return;
  const a=document.createElement('a');a.href='/admin/';a.className='nav-admin';a.textContent='Admin';
  if(location.pathname.replace(/\/$/,'')==='/admin')a.classList.add('on');
  n.appendChild(a);
})();
// Client Login pop-up.
(function(){
  const m=document.createElement('div');m.className='modal';m.id='loginModal';m.setAttribute('role','dialog');m.setAttribute('aria-modal','true');m.setAttribute('aria-labelledby','loginTitle');
  m.innerHTML=`<div class="modal-card"><button class="modal-x" id="loginX" aria-label="Close"></button>
    <h2 id="loginTitle">Login</h2>
    <p class="terms">By logging in, you agree to the <a href="#">Terms of Use</a></p>
    <form id="loginForm" autocomplete="off" novalidate>
      <input type="text" name="u" id="loginUser" placeholder="Username" aria-label="Username" autocomplete="off">
      <input type="password" name="p" placeholder="Password" aria-label="Password" autocomplete="off">
      <button class="enter" type="submit">ENTER</button>
      <label class="remember"><input type="checkbox" name="r"> Remember Me</label>
      <div class="login-err" id="loginErr" role="alert"></div>
    </form></div>`;
  document.body.appendChild(m);
  const open=()=>{m.classList.add('open');document.getElementById('loginErr').textContent='';setTimeout(()=>document.getElementById('loginUser').focus(),30)};
  const close=()=>m.classList.remove('open');
  document.querySelectorAll('#loginBtn').forEach(b=>b.addEventListener('click',e=>{e.preventDefault();open()}));
  document.getElementById('loginX').onclick=close;
  m.addEventListener('mousedown',e=>{if(e.target===m)close()});
  addEventListener('keydown',e=>{if(e.key==='Escape')close()});
  m.querySelector('.terms a').addEventListener('click',e=>e.preventDefault());
  document.getElementById('loginForm').addEventListener('submit',async e=>{
    e.preventDefault();
    const f=e.target,err=document.getElementById('loginErr'),btn=f.querySelector('.enter');
    const user=f.u.value.trim(),pass=f.p.value;
    if(!user||!pass){err.textContent='Enter your username and password.';return}
    btn.disabled=true;err.textContent='Signing in...';
    try{
      const d=await bastionAdminFetch(user,pass);
      if(d.ok){try{sessionStorage.setItem('bastionAdmin',JSON.stringify({user:user,pass:pass}))}catch(x){}location.href='/admin/'}
      else err.textContent=d.error==='locked'?'Too many attempts. Try again in 10 minutes.':'We could not sign you in.';
    }catch(x){err.textContent='We could not reach the server. Try again.'}
    btn.disabled=false;
  });
})();

// "Under development" notice: shows once per visit (per browser session) when the site opens.
(function(){
  let seen=false;try{seen=sessionStorage.getItem('devNoticeSeen')==='1'}catch(e){}
  if(seen)return;
  const m=document.createElement('div');m.className='modal open notice';m.id='devNotice';m.setAttribute('role','dialog');m.setAttribute('aria-modal','true');m.setAttribute('aria-labelledby','devTitle');
  m.innerHTML=`<div class="modal-card"><button class="modal-x" id="devX" aria-label="Close"></button>
    <h2 id="devTitle">Under Development</h2>
    <p class="terms" style="margin-bottom:30px">This website is under development. Some pages and details are placeholders and will change.</p>
    <button class="enter" id="devOk" type="button">CONTINUE</button></div>`;
  document.body.appendChild(m);
  const close=()=>{m.classList.remove('open');try{sessionStorage.setItem('devNoticeSeen','1')}catch(e){}};
  document.getElementById('devX').onclick=close;document.getElementById('devOk').onclick=close;
  m.addEventListener('mousedown',e=>{if(e.target===m)close()});
  addEventListener('keydown',e=>{if(e.key==='Escape'&&m.classList.contains('open'))close()});
  setTimeout(()=>document.getElementById('devOk').focus(),50);
})();

// Apply button above the footer on every page (not on the application or admin pages).
(function(){
  if(/^\/(application|admin)/.test(location.pathname))return;
  const f=document.querySelector('footer');
  if(!f||document.querySelector('.apply-band'))return;
  const s=document.createElement('section');
  s.className='apply-band';
  s.innerHTML='<a class="apply-band-btn" href="/application.html">Apply</a>';
  f.parentNode.insertBefore(s,f);
})();
