(function () {
  const { strategies, investmentCommittee } = window.FUND;
  const svg = document.getElementById('strategyPie');
  const list = document.getElementById('fundStrategies');
  const committee = document.getElementById('fundCommittee');
  const namespace = 'http://www.w3.org/2000/svg';
  const center = 260;
  const radius = 210;

  function point(angle, distance) {
    return [center + distance * Math.cos(angle), center + distance * Math.sin(angle)];
  }

  strategies.forEach((strategy, index) => {
    const start = -Math.PI / 2 + index * Math.PI / 2;
    const end = start + Math.PI / 2;
    const [x0, y0] = point(start, radius);
    const [x1, y1] = point(end, radius);
    const [labelX, labelY] = point((start + end) / 2, radius * .59);
    const link = document.createElementNS(namespace, 'a');
    const path = document.createElementNS(namespace, 'path');
    const label = document.createElementNS(namespace, 'text');
    link.setAttribute('href', strategy.href);
    link.setAttribute('aria-label', strategy.committee);
    path.setAttribute('d', `M ${center} ${center} L ${x0} ${y0} A ${radius} ${radius} 0 0 1 ${x1} ${y1} Z`);
    path.setAttribute('fill', strategy.color);
    label.setAttribute('x', labelX);
    label.setAttribute('y', labelY);
    label.setAttribute('text-anchor', 'middle');
    label.setAttribute('dominant-baseline', 'middle');
    label.setAttribute('fill', index === 3 ? '#0a2166' : '#fff');
    label.textContent = String(index + 1);
    link.append(path, label);
    svg.append(link);

    const row = document.createElement('a');
    row.className = 'strategy-row';
    row.href = strategy.href;
    const number = document.createElement('span');
    number.className = 'strategy-number';
    number.style.setProperty('--strategy-color', strategy.color);
    number.textContent = String(index + 1);
    const name = document.createElement('span');
    name.className = 'strategy-name';
    name.textContent = strategy.committee;
    const manager = document.createElement('span');
    manager.className = 'strategy-manager';
    manager.textContent = `Portfolio Manager · ${strategy.manager || 'To be announced'}`;
    row.append(number, name, manager);
    list.append(row);
  });

  investmentCommittee.forEach(person => {
    const item = document.createElement('div');
    item.className = 'oversight-person';
    const name = document.createElement('strong');
    name.textContent = person.name;
    const role = document.createElement('span');
    role.textContent = person.role;
    item.append(name, role);
    committee.append(item);
  });
})();
