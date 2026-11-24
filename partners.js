// Partnerships slider (Citadel careers style): tabs with n / N, image with quote, white card, arrows.
(function(){
  const root=document.getElementById('partner-slider');if(!root)return;
  const tabs=[...root.querySelectorAll('.ps-tab')],slides=[...root.querySelectorAll('.ps-slide')];let i=0;
  function show(n,dir){
    const prev=i;i=(n+slides.length)%slides.length;if(prev===i)return;
    dir=dir||(i>prev?'fwd':'back');
    slides.forEach((s,k)=>{s.classList.remove('on','out','fwd','back');s.setAttribute('aria-hidden',k!==i)});
    slides[prev].classList.add('out',dir);void slides[i].offsetWidth;slides[i].classList.add('on',dir);
    setTimeout(()=>slides[prev].classList.remove('out','fwd','back'),900);
    tabs.forEach((t,k)=>{t.classList.toggle('on',k===i);t.setAttribute('aria-selected',k===i)});
    tabs[i].scrollIntoView({block:'nearest',inline:'nearest',behavior:'smooth'});
  }
  tabs.forEach((t,k)=>t.addEventListener('click',()=>show(k)));
  root.querySelector('.ps-prev').addEventListener('click',()=>show(i-1,'back'));
  root.querySelector('.ps-next').addEventListener('click',()=>show(i+1,'fwd'));
})();
