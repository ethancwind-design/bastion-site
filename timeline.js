// What We Do timeline: stages along the bottom, two yellow segments per stage, auto-advance, arrows.
(function(){
  const root=document.getElementById('timeline');if(!root)return;
  const slides=[...root.querySelectorAll('.tl-slide')],segs=[...root.querySelectorAll('.tl-seg')],stages=[...root.querySelectorAll('.tl-stage')];
  const DUR=7000;let i=0,timer=null,start=0,paused=false,left=DUR;
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  function show(n){
    i=(n+slides.length)%slides.length;
    slides.forEach((s,k)=>{s.classList.toggle('on',k===i);s.setAttribute('aria-hidden',k!==i)});
    segs.forEach((s,k)=>{s.classList.toggle('done',k<i);s.classList.toggle('on',k===i);const b=s.querySelector('i');b.style.transition='none';b.style.width=k<i?'100%':'0%'});
    const st=+slides[i].dataset.stage;stages.forEach((s,k)=>s.classList.toggle('on',k===st));
    run(DUR);
  }
  function run(ms){
    clearTimeout(timer);if(reduce)return;left=ms;start=performance.now();
    const b=segs[i].querySelector('i');b.offsetWidth;b.style.transition='width '+ms+'ms linear';b.style.width='100%';
    timer=setTimeout(()=>show(i+1),ms);
  }
  function pause(){if(paused||reduce)return;paused=true;clearTimeout(timer);left=Math.max(0,left-(performance.now()-start));const b=segs[i].querySelector('i'),w=getComputedStyle(b).width;b.style.transition='none';b.style.width=w}
  function resume(){if(!paused)return;paused=false;run(left)}
  root.querySelector('.tl-prev').addEventListener('click',()=>show(i-1));
  root.querySelector('.tl-next').addEventListener('click',()=>show(i+1));
  segs.forEach((s,k)=>s.addEventListener('click',e=>{e.stopPropagation();show(k)}));
  stages.forEach((s,k)=>s.addEventListener('click',()=>show(slides.findIndex(x=>+x.dataset.stage===k))));
  root.addEventListener('mouseenter',pause);root.addEventListener('mouseleave',resume);
  root.addEventListener('focusin',pause);root.addEventListener('focusout',resume);
  // start when visible
  const io=new IntersectionObserver(es=>{if(es[0].isIntersecting){io.disconnect();show(0)}},{threshold:.3});io.observe(root);
})();
