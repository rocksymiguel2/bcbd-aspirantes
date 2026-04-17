document.addEventListener('DOMContentLoaded', () => {
  const allNodes = document.querySelectorAll('.org-node');
  // exclude parent-summary nodes that should not open the modal
  const nodes = Array.from(allNodes).filter(n => !n.classList.contains('no-modal'));
  const modal = document.getElementById('org-modal');
  const modalRole = modal && modal.querySelector('.org-modal-role');
  const modalRank = modal && modal.querySelector('.org-modal-rank');
  const modalName = modal && modal.querySelector('.org-modal-name');
  const modalDesc = modal && modal.querySelector('.org-modal-desc');
  const modalPhoto = modal && modal.querySelector('.org-modal-photo');
  const chart = document.querySelector('.org-chart');
  // Prepare SVG overlay for connector lines
  let svg = null;
  if (chart) {
    svg = chart.querySelector('.org-svg');
    if (!svg) {
      svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.classList.add('org-svg');
      svg.setAttribute('aria-hidden', 'true');
      chart.insertBefore(svg, chart.firstChild);
    }
  }

  // Define explicit logical connections (parentId -> childId)
  const connections = [
    ['node-j1', 'node-j2'],
    ['node-j2', 'node-jb1'],
    ['node-j2', 'node-jb2'],
    ['node-jcom', 'node-jc1'],
    ['node-jcom', 'node-jc2'],
    ['node-jcom', 'node-jc3'],
    ['node-jcom', 'node-jc4'],
    ['node-jcom', 'node-jc5'],
    // commanders group connections
    ['node-cc', 'node-cc1'],
    ['node-cc', 'node-cc2'],
    ['node-cc', 'node-cc3'],
    ['node-cc', 'node-cc4'],
    ['node-cc', 'node-cc5'],
    ['node-cc', 'node-cc6'],
    ['node-cc', 'node-cc7'],
    ['node-cc', 'node-cc8'],
    ['node-cc', 'node-cc9'],
    // single volunteer block under commanders
    ['node-cc', 'node-pv']
  ];

  function getCenterRelative(el) {
    const elRect = el.getBoundingClientRect();
    const chartRect = chart.getBoundingClientRect();
    return {
      x: elRect.left + elRect.width / 2 - chartRect.left,
      y: elRect.top + elRect.height / 2 - chartRect.top
    };
  }

  function drawConnections() {
    if (!svg || !chart) return;
    // set svg size to chart size
    const rect = chart.getBoundingClientRect();
    svg.setAttribute('width', rect.width);
    svg.setAttribute('height', rect.height);
    svg.setAttribute('viewBox', `0 0 ${rect.width} ${rect.height}`);
    // clear previous
    while (svg.firstChild) svg.removeChild(svg.firstChild);

    connections.forEach(([fromId, toId]) => {
      const from = document.getElementById(fromId);
      const to = document.getElementById(toId);
      if (!from || !to) return;
      const a = getCenterRelative(from);
      const b = getCenterRelative(to);

      // create a smooth path between a and b
      const dx = Math.abs(b.x - a.x);
      const dy = Math.abs(b.y - a.y);
      const curvature = Math.max(20, Math.min(100, dy / 2 + dx / 4));
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      const d = `M ${a.x} ${a.y} C ${a.x} ${a.y + curvature} ${b.x} ${b.y - curvature} ${b.x} ${b.y}`;
      path.setAttribute('d', d);
      path.setAttribute('stroke', '#c7cdd6');
      path.setAttribute('stroke-width', '2');
      path.setAttribute('fill', 'none');
      path.setAttribute('stroke-linecap', 'round');
      svg.appendChild(path);
    });
  }

  // Efficient redraw scheduling
  let rafId = null;
  function scheduleDraw() {
    if (rafId) cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(() => { drawConnections(); rafId = null; });
  }

  // Initial draw and listeners
  if (svg) {
    scheduleDraw();
    window.addEventListener('resize', scheduleDraw);
    // capture scroll events in case container moves
    window.addEventListener('scroll', scheduleDraw, true);
    // also observe mutations to handle layout changes
    const ro = new ResizeObserver(scheduleDraw);
    ro.observe(chart);
    document.querySelectorAll('.org-node').forEach(n => ro.observe(n));
  }

  function openModalFromNode(node) {
    const role = node.dataset.role || '';
    const rank = node.dataset.rank || '';
    const name = node.dataset.name || '';
    const desc = node.dataset.desc || '';
    if (!modal) return;
    modalRole.textContent = role;
    modalRank.textContent = rank;
    modalName.textContent = name;
    modalDesc.textContent = desc;
    modalPhoto.textContent = name !== '-' ? name.split(' ').map(n=>n[0]).join('') : '';
    modal.setAttribute('aria-hidden','false');
    modal.classList.add('org-modal--open');
    // focus panel for accessibility
    const panel = modal.querySelector('.org-modal-panel');
    if (panel) panel.focus();
  }

  function closeModal() {
    if (!modal) return;
    modal.setAttribute('aria-hidden','true');
    modal.classList.remove('org-modal--open');
  }

  nodes.forEach(n => {
    n.addEventListener('click', () => openModalFromNode(n));
    n.addEventListener('keypress', (e) => { if (e.key === 'Enter') openModalFromNode(n); });
  });

  // Close handlers
  modal && modal.addEventListener('click', (e) => {
    if (e.target && e.target.dataset && e.target.dataset.close !== undefined) closeModal();
  });
  const closeButtons = modal ? modal.querySelectorAll('[data-close]') : [];
  closeButtons.forEach(b => b.addEventListener('click', closeModal));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });
});
