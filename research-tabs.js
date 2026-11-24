// Research Teams tab bar: sliding blue block, hash links, arrow-key navigation.
(function(){
  const bar=document.querySelector('.rt-tabs');if(!bar)return;
  const tabs=[...bar.querySelectorAll('[role=tab]')],ind=bar.querySelector('.rt-ind');
  function place(t,instant){if(instant)ind.style.transition='none';ind.style.width=t.offsetWidth+'px';ind.style.transform='translateX('+t.offsetLeft+'px)';if(instant){ind.offsetWidth;ind.style.transition=''}}
  function show(t,focus,instant){
    tabs.forEach(x=>{const on=x===t;x.setAttribute('aria-selected',on);x.tabIndex=on?0:-1;const p=document.getElementById(x.getAttribute('aria-controls'));p.hidden=!on;p.classList.toggle('on',false)});
    const p=document.getElementById(t.getAttribute('aria-controls'));requestAnimationFrame(()=>p.classList.add('on'));
    place(t,instant);if(focus)t.focus();
    t.scrollIntoView({block:'nearest',inline:'nearest'});
  }
  tabs.forEach((t,i)=>{
    t.addEventListener('click',()=>{show(t);history.replaceState(null,'','#'+t.id.slice(2))});
    t.addEventListener('keydown',e=>{let j=null;if(e.key==='ArrowRight')j=(i+1)%tabs.length;if(e.key==='ArrowLeft')j=(i-1+tabs.length)%tabs.length;if(j!==null){e.preventDefault();tabs[j].click();tabs[j].focus()}});
  });
  const start=tabs.find(t=>'#'+t.id.slice(2)===location.hash)||tabs[0];
  show(start,false,true);
  addEventListener('resize',()=>place(tabs.find(t=>t.getAttribute('aria-selected')==='true'),true));
  document.fonts&&document.fonts.ready.then(()=>place(tabs.find(t=>t.getAttribute('aria-selected')==='true'),true));
})();
