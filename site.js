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

// Client Login pop-up (placeholder: there is no real sign-in yet, so it always shows an error).
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
  document.getElementById('loginForm').addEventListener('submit',e=>{e.preventDefault();document.getElementById('loginErr').textContent='We could not sign you in. Client access is not available yet.'});
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
