(function(){
const F=window.FUND,$=id=>document.getElementById(id);
$('fNumber').textContent=F.number;$('fAum').textContent=F.aum;$('fStrat').textContent=F.strategy;
$('fMgrs').innerHTML=F.managers.map(m=>`<li>${m}</li>`).join('');
$('fAlloc').innerHTML=F.sectors.map(s=>`<li>${s.name} <span>${s.pct}%</span></li>`).join('');
const NS='http://www.w3.org/2000/svg',cx=420,cy=270;
const pt=(r,a)=>[cx+r*Math.cos(a),cy+r*Math.sin(a)];
function seg(r0,r1,a0,a1,off){
  const m=(a0+a1)/2,dx=off*Math.cos(m),dy=off*Math.sin(m),big=a1-a0>Math.PI?1:0;
  const [x0,y0]=pt(r1,a0),[x1,y1]=pt(r1,a1),[x2,y2]=pt(r0,a1),[x3,y3]=pt(r0,a0);
  return `M${x0+dx},${y0+dy}A${r1},${r1} 0 ${big} 1 ${x1+dx},${y1+dy}L${x2+dx},${y2+dy}A${r0},${r0} 0 ${big} 0 ${x3+dx},${y3+dy}Z`;
}
function render(){
  const svg=$('donut');let h='';const gap=.012,T=Math.PI*2,start=-Math.PI/2;
  let a=start;const tot=F.sectors.reduce((s,x)=>s+x.pct,0);
  const sec={};
  F.sectors.forEach(s=>{const span=s.pct/tot*T;sec[s.name]={a0:a,a1:a+span,color:s.color,used:a};a+=span});
  // outer ring + labels
  F.sectors.forEach(s=>{const o=sec[s.name],a0=o.a0+gap,a1=o.a1-gap,m=(o.a0+o.a1)/2;
    h+=`<path class="seg" d="${seg(150,232,a0,a1,10)}" fill="${s.color}"/>`;
    const [lx,ly]=pt(192+10,m),[ex,ey]=pt(262,m),right=Math.cos(m)>=0,tx=ex+(right?26:-26);
    h+=`<polyline points="${lx},${ly} ${ex},${ey} ${tx},${ey}" fill="none" stroke="#0b1533" stroke-width="1"/>`;
    h+=`<text class="lbl" x="${tx+(right?6:-6)}" y="${ey-4}" text-anchor="${right?'start':'end'}">${s.name}</text><text class="lbl" x="${tx+(right?6:-6)}" y="${ey+20}" text-anchor="${right?'start':'end'}">${s.pct}%</text>`;
  });
  // inner ring by position, grouped by sector order
  F.sectors.forEach(s=>{const o=sec[s.name];let b=o.a0;const ps=F.positions.filter(p=>p.sector===s.name),pt0=ps.reduce((x,p)=>x+p.pct,0)||1;
    ps.forEach((p,i)=>{const span=(o.a1-o.a0)*p.pct/pt0,a0=b+gap/2,a1=b+span-gap/2,m=(a0+a1)/2;b+=span;
      h+=`<path class="seg" d="${seg(66,128,a0,a1,0)}" fill="${s.color}" opacity="${(1-i*.17).toFixed(2)}"/>`;
      if(span>.2){const [tx,ty]=pt(97,m);h+=`<text class="tick" x="${tx}" y="${ty+4}" text-anchor="middle">${p.ticker}</text>`}
    });
  });
  svg.innerHTML=h;
}
render();
})();
