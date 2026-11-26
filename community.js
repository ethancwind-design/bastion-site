// Citadel-style carousel for the Community Goal section.
(function(){
  const s=document.getElementById('community');if(!s)return;
  const track=s.querySelector('.cx-track'),cols=[...s.querySelectorAll('.cx-col')],dots=[...s.querySelectorAll('.cx-dot')],play=s.querySelector('.cx-play');
  let i=0,timer=null;
  function go(n){i=(n+cols.length)%cols.length;track.style.transform='translateX('+(cols[0].offsetLeft-cols[i].offsetLeft)+'px)';cols.forEach((c,k)=>c.classList.toggle('on',k===i));dots.forEach((d,k)=>d.classList.toggle('on',k===i))}
  function stop(){clearInterval(timer);timer=null;s.classList.remove('playing');play.setAttribute('aria-label','Play')}
  function start(){stop();timer=setInterval(()=>go(i+1),6000);s.classList.add('playing');play.setAttribute('aria-label','Pause')}
  s.querySelector('.cx-prev').onclick=()=>{stop();go(i-1)};
  s.querySelector('.cx-next').onclick=()=>{stop();go(i+1)};
  play.onclick=()=>timer?stop():start();
  dots.forEach((d,k)=>d.onclick=()=>{stop();go(k)});
  addEventListener('resize',()=>go(i));
  go(0);
})();
