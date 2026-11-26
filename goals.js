// "Bastion has three goals" accordion (Citadel offices style): rows open a panel with sub-items, text and a rotating image set.
(function(){
  const root=document.getElementById('goals');if(!root)return;
  const items=[...root.querySelectorAll('.gl-item')];
  function open(it,on){it.classList.toggle('open',on);it.querySelector('.gl-row').setAttribute('aria-expanded',on)}
  items.forEach(it=>{
    it.querySelector('.gl-row').addEventListener('click',()=>open(it,!it.classList.contains('open')));
    const subs=[...it.querySelectorAll('.gl-sub')],texts=[...it.querySelectorAll('.gl-text')],sets=[...it.querySelectorAll('.gl-set')];
    subs.forEach((b,k)=>b.addEventListener('click',()=>{
      [subs,texts,sets].forEach(a=>a.forEach((e,j)=>e.classList.toggle('on',j===k)));
    }));
  });
  // Rotate the images in each visible set.
  setInterval(()=>{root.querySelectorAll('.gl-item.open .gl-set.on').forEach(s=>{
    const im=[...s.querySelectorAll('img')];if(im.length<2)return;
    const k=im.findIndex(x=>x.classList.contains('on'));im[k].classList.remove('on');im[(k+1)%im.length].classList.add('on');
  })},3500);
  // Links like #internal open that goal.
  function fromHash(){const it=items.find(x=>'#'+x.id===location.hash);if(it){open(it,true);setTimeout(()=>it.scrollIntoView({behavior:'smooth',block:'start'}),60)}}
  addEventListener('hashchange',fromHash);fromHash();
})();
