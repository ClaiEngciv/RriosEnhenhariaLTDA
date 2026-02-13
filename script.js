document.addEventListener('DOMContentLoaded', () => {
  console.log('[RRios] script.js carregado ✅');

  const body = document.body;

  // ====== MENU LATERAL ======
  const btnMenu = document.getElementById('btnMenu');
  const sideMenu = document.getElementById('sideMenu');
  const btnCloseMenu = document.getElementById('btnCloseMenu');

  // ====== PESQUISA ======
  const btnSearch = document.getElementById('btnSearch');
  const searchModal = document.getElementById('searchModal');
  const btnCloseSearch = document.getElementById('btnCloseSearch');
  const searchInput = document.getElementById('searchInput');

  // ====== MODAL PROJETOS ======
  const projectModal = document.getElementById('projectModal');
  const pmClose = document.getElementById('pmClose');
  const pmTag = document.getElementById('pmTag');
  const pmTitle = document.getElementById('pmTitle');
  const pmMeta = document.getElementById('pmMeta');
  const pmDesc = document.getElementById('pmDesc');
  const pmScope = document.getElementById('pmScope');
  const pmHero = document.getElementById('pmHero');
  const pmThumbs = document.getElementById('pmThumbs');
  const pmLink = document.getElementById('pmLink');

  // ====== BUSCA (UI) ======
  const searchResults = document.getElementById('searchResults');
  const searchStatus = document.getElementById('searchStatus');
  const chips = searchModal?.querySelectorAll('.chip') || [];

  // ====== UTIL ======
  let lastFocus = null;
  const rememberFocus = () => { lastFocus = document.activeElement; };
  const restoreFocus = () => { lastFocus?.focus?.(); lastFocus = null; };

  const isAnyOpen = () =>
    sideMenu?.classList.contains('active') ||
    searchModal?.classList.contains('active') ||
    projectModal?.classList.contains('active');

  const syncScrollLock = () => {
    body.style.overflow = isAnyOpen() ? 'hidden' : '';
  };

  // ====== AÇÕES: MENU ======
  const openMenu = () => {
    if (!sideMenu) return;
    rememberFocus();
    sideMenu.classList.add('active');
    sideMenu.setAttribute('aria-hidden', 'false');
    syncScrollLock();
  };

  const closeMenu = () => {
    if (!sideMenu) return;
    sideMenu.classList.remove('active');
    sideMenu.setAttribute('aria-hidden', 'true');
    syncScrollLock();
    restoreFocus();
  };

  btnMenu?.addEventListener('click', openMenu);
  btnCloseMenu?.addEventListener('click', closeMenu);

  sideMenu?.addEventListener('click', (e) => {
    if (e.target === sideMenu) closeMenu();
  });

  // Fecha menu ao clicar em um link
  sideMenu?.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', closeMenu);
  });

  // ====== AÇÕES: BUSCA ======
  const openSearch = () => {
    if (!searchModal) return;
    rememberFocus();
    searchModal.classList.add('active');
    searchModal.setAttribute('aria-hidden', 'false');
    syncScrollLock();
    setTimeout(() => searchInput?.focus(), 0);
    renderResults(''); // sugestões
  };

  const closeSearch = () => {
    if (!searchModal) return;
    searchModal.classList.remove('active');
    searchModal.setAttribute('aria-hidden', 'true');
    syncScrollLock();

    if (searchInput) searchInput.value = '';
    if (searchResults) searchResults.innerHTML = '';
    if (searchStatus) searchStatus.textContent = '';
    activeIndex = -1;

    restoreFocus();
  };

  btnSearch?.addEventListener('click', openSearch);
  btnCloseSearch?.addEventListener('click', closeSearch);

  searchModal?.addEventListener('click', (e) => {
    if (e.target === searchModal) closeSearch();
  });

  // ====== AÇÕES: MODAL PROJETO ======
  const closeProjectModal = () => {
    if (!projectModal) return;
    projectModal.classList.remove('active');
    projectModal.setAttribute('aria-hidden', 'true');
    syncScrollLock();
    restoreFocus();
  };

  pmClose?.addEventListener('click', closeProjectModal);

  projectModal?.addEventListener('click', (e) => {
    if (e.target === projectModal) closeProjectModal();
  });

  // ESC fecha tudo
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    closeMenu();
    closeSearch();
    closeProjectModal();
  });

  // ====== CARDS PRINCIPAIS (1/2/3) texto automático + teclado ======
  const cards = document.querySelectorAll('.card');
  const areaMeta = {
    "engenharia-civil": "Projetos estruturais, laudos, inspeções e soluções técnicas completas.",
    "inovacao": "Compatibilização, BIM e processos que reduzem retrabalho e aumentam eficiência.",
    "planejamento": "EAP, cronogramas executivos e controle de prazos com relatórios gerenciais."
  };

  cards.forEach(card => {
    const img = card.querySelector('img');
    const content = card.querySelector('.content');
    const id = card.dataset.projeto;

    if (content && img && !content.textContent.trim()) {
      content.innerHTML = `<h2>${img.alt}</h2><p>${areaMeta[id] || ""}</p>`;
    }

    // Ação padrão (scroll para destaques ou você pode trocar depois)
    const open = () => {
      const alvo = document.getElementById('destaques');
      alvo?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    card.addEventListener('click', open);
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        open();
      }
    });
  });

  // ====== PROJETOS EM DESTAQUE (dados + render) ======
  const featuredGrid = document.getElementById('featuredGrid');

  const featuredProjects = [
    {
      slug: "reforco-estrutural-edificacao-comercial",
      titulo: "Reforço Estrutural – Edificação Comercial",
      categoria: "Engenharia Civil",
      local: "São Paulo • SP",
      ano: "2024",
      capa: "images/projetos/p1/capa.jpg",
      descricao: "Intervenções estruturais com foco em segurança e desempenho.",
      escopo: ["Vistoria técnica", "Modelagem estrutural", "Detalhamento executivo", "Acompanhamento técnico"],
      imagens: ["images/projetos/p1/1.jpg","images/projetos/p1/2.jpg","images/projetos/p1/3.jpg","images/projetos/p1/4.jpg"]
    },
    {
      slug: "compatibilizacao-bim-infraestrutura",
      titulo: "Compatibilização BIM – Infraestrutura",
      categoria: "Inovação",
      local: "Campinas • SP",
      ano: "2023",
      capa: "images/projetos/p2/capa.jpg",
      descricao: "Coordenação multidisciplinar em ambiente BIM.",
      escopo: ["Coordenação de disciplinas", "Detecção de interferências", "Padronização de modelos", "Relatórios técnicos"],
      imagens: ["images/projetos/p2/1.jpg","images/projetos/p2/2.jpg","images/projetos/p2/3.jpg","images/projetos/p2/4.jpg"]
    },
    {
      slug: "planejamento-cronograma-executivo",
      titulo: "Planejamento e Cronograma Executivo",
      categoria: "Planejamento",
      local: "Santos • SP",
      ano: "2024",
      capa: "images/projetos/p3/capa.jpg",
      descricao: "Estruturação de planejamento executivo completo.",
      escopo: ["EAP e marcos", "Cronograma executivo", "Controle de prazos", "Relatórios gerenciais"],
      imagens: ["images/projetos/p3/1.jpg","images/projetos/p3/2.jpg","images/projetos/p3/3.jpg","images/projetos/p3/4.jpg"]
    },
    {
      slug: "laudo-tecnico-adequacoes",
      titulo: "Laudo Técnico e Adequações",
      categoria: "Engenharia Civil",
      local: "Sorocaba • SP",
      ano: "2023",
      capa: "images/projetos/p4/capa.jpg",
      descricao: "Laudo técnico com recomendações e plano de ação.",
      escopo: ["Inspeção técnica", "Registro fotográfico", "Diagnóstico estrutural", "Plano de adequações"],
      imagens: ["images/projetos/p4/1.jpg","images/projetos/p4/2.jpg","images/projetos/p4/3.jpg","images/projetos/p4/4.jpg"]
    }
  ];

  const setHero = (src, title) => {
    if (!pmHero) return;
    pmHero.style.opacity = 0;
    setTimeout(() => {
      pmHero.src = src;
      pmHero.alt = `${title} — imagem principal`;
      pmHero.style.opacity = 1;
    }, 120);
  };

  const openProjectModal = (slug) => {
    const p = featuredProjects.find(x => x.slug === slug);
    if (!p || !projectModal) return;

    rememberFocus();

    pmTag && (pmTag.textContent = p.categoria);
    pmTitle && (pmTitle.textContent = p.titulo);
    pmMeta && (pmMeta.textContent = `${p.local} • ${p.ano}`);
    pmDesc && (pmDesc.textContent = p.descricao);
    pmScope && (pmScope.innerHTML = p.escopo.map(i => `<li>${i}</li>`).join(""));
    pmLink && (pmLink.href = `projetos.html#${encodeURIComponent(p.slug)}`);

    const imgs = (p.imagens && p.imagens.length) ? p.imagens : [p.capa];
    setHero(imgs[0], p.titulo);

    if (pmThumbs) {
      pmThumbs.innerHTML = imgs.map((src, idx) =>
        `<img class="pm-thumb ${idx === 0 ? 'active' : ''}" src="${src}" data-src="${src}" alt="Imagem ${idx + 1} - ${p.titulo}">`
      ).join("");

      pmThumbs.querySelectorAll('.pm-thumb').forEach(thumb => {
        thumb.addEventListener('click', () => {
          pmThumbs.querySelectorAll('.pm-thumb').forEach(t => t.classList.remove('active'));
          thumb.classList.add('active');
          setHero(thumb.dataset.src, p.titulo);
        });
      });
    }

    projectModal.classList.add('active');
    projectModal.setAttribute('aria-hidden', 'false');
    syncScrollLock();
  };

  const renderFeaturedProjects = () => {
    if (!featuredGrid) {
      console.warn('[RRios] #featuredGrid não encontrado');
      return;
    }

    featuredGrid.innerHTML = featuredProjects.map(p => `
      <article class="project-card" tabindex="0" role="button" data-slug="${p.slug}" aria-label="Abrir projeto: ${p.titulo}">
        <img class="project-card__img" src="${p.capa}" alt="${p.titulo}">
        <div class="project-card__overlay">
          <span class="project-card__tag">${p.categoria}</span>
          <h3 class="project-card__title">${p.titulo}</h3>
          <div class="project-card__meta">
            <span>${p.local}</span>
            <span>${p.ano}</span>
          </div>
        </div>
      </article>
    `).join("");

    featuredGrid.querySelectorAll('.project-card').forEach(card => {
      const open = () => openProjectModal(card.dataset.slug);
      card.addEventListener('click', open);
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          open();
        }
      });
    });

    console.log('[RRios] Projetos renderizados ✅');
  };

  // ====== BUSCA MELHORADA (ranking + highlight + teclado) ======
  let searchFilter = 'all'; // all | projects | pages
  let activeIndex = -1;

  const normalize = (s) =>
    (s || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim();

  const escapeHtml = (s) =>
    (s || '')
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#039;');

  const highlight = (text, query) => {
    const t = escapeHtml(text);
    const q = normalize(query);
    if (!q) return t;

    const tokens = q.split(/\s+/).filter(Boolean).slice(0, 6);
    let out = t;
    tokens.forEach(tok => {
      const safe = tok.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      out = out.replace(new RegExp(`(${safe})`, 'ig'), '<mark>$1</mark>');
    });
    return out;
  };

  const scoreItem = (item, queryNorm) => {
    if (!queryNorm) return 0;

    const hay = normalize(item.text);
    const tokens = queryNorm.split(/\s+/).filter(Boolean);
    let score = 0;

    const title = normalize(item.title);
    tokens.forEach(tok => {
      if (title.startsWith(tok)) score += 6;
      if (title.includes(tok)) score += 4;
      if (hay.includes(tok)) score += 2;
    });

    if (hay.includes(queryNorm)) score += 8;

    return score;
  };

  const getFiltered = (items) => {
    if (searchFilter === 'all') return items;
    return items.filter(i => i.type === searchFilter);
  };

  const setActiveItem = (idx) => {
    activeIndex = idx;
    const nodes = searchResults?.querySelectorAll('.search-item') || [];
    nodes.forEach((n, i) => n.classList.toggle('is-active', i === activeIndex));
    if (activeIndex >= 0 && nodes[activeIndex]) {
      nodes[activeIndex].scrollIntoView({ block: 'nearest' });
    }
  };

  const searchIndex = () => ([
    // Projetos em destaque (abre modal)
    ...featuredProjects.map(p => ({
      type: 'projects',
      title: p.titulo,
      badge: p.categoria,
      meta: `${p.local} • ${p.ano}`,
      text: `${p.titulo} ${p.categoria} ${p.local} ${p.ano} ${p.descricao} ${(p.escopo || []).join(' ')}`,
      action: () => openProjectModal(p.slug)
    })),

    // Páginas/Seções
    { type: 'pages', title: 'Áreas de atuação', badge: 'Seção', meta: 'Cards principais', text: 'areas atuação engenharia civil inovação planejamento', action: () => (location.hash = '#atuacao') },
    { type: 'pages', title: 'Projetos em destaque', badge: 'Seção', meta: 'Lista de projetos', text: 'projetos destaque portfolio seleção', action: () => (location.hash = '#destaques') },
    { type: 'pages', title: 'Quem somos', badge: 'Seção', meta: 'Sobre a RRios', text: 'quem somos sobre rrios engenharia', action: () => (location.hash = '#quem-somos') },
    { type: 'pages', title: 'Área do Cliente', badge: 'Página', meta: 'login.html', text: 'login area do cliente entrar', action: () => (window.location.href = 'login.html') },
    { type: 'pages', title: 'Ver mais projetos', badge: 'Página', meta: 'projetos.html', text: 'ver mais projetos todos projetos portfolio', action: () => (window.location.href = 'projetos.html') },
  ]);

  const renderResults = (query) => {
    if (!searchResults || !searchStatus) return;

    const q = normalize(query);
    activeIndex = -1;

    const itemsAll = getFiltered(searchIndex());

    // sugestões quando vazio
    if (!q) {
      const suggestions = itemsAll.slice(0, 6);

      searchStatus.textContent = suggestions.length
        ? 'Sugestões para você:'
        : 'Selecione um filtro ou digite para pesquisar.';

      searchResults.innerHTML = suggestions.map((item, idx) => `
        <li class="search-item" role="option" id="sr-${idx}" tabindex="-1" data-idx="${idx}">
          <div class="search-item__top">
            <div class="search-item__title">${escapeHtml(item.title)}</div>
            <span class="search-item__badge">${escapeHtml(item.badge)}</span>
          </div>
          <div class="search-item__meta">${escapeHtml(item.meta || '')}</div>
        </li>
      `).join('');

      searchResults.querySelectorAll('.search-item').forEach((el, i) => {
        el.addEventListener('mouseenter', () => setActiveItem(i));
        el.addEventListener('click', () => {
          suggestions[i]?.action?.();
          closeSearch();
        });
      });

      return;
    }

    const ranked = itemsAll
      .map(item => ({ item, score: scoreItem(item, q) }))
      .filter(x => x.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);

    searchStatus.textContent = ranked.length
      ? `${ranked.length} resultado(s) encontrado(s)`
      : 'Nenhum resultado. Tente outro termo.';

    searchResults.innerHTML = ranked.map((x, idx) => `
      <li class="search-item" role="option" id="sr-${idx}" tabindex="-1" data-idx="${idx}">
        <div class="search-item__top">
          <div class="search-item__title">${highlight(x.item.title, query)}</div>
          <span class="search-item__badge">${escapeHtml(x.item.badge)}</span>
        </div>
        <div class="search-item__meta">${highlight(x.item.meta || '', query)}</div>
      </li>
    `).join('');

    const resultsOnly = ranked.map(x => x.item);

    searchResults.querySelectorAll('.search-item').forEach((el, i) => {
      el.addEventListener('mouseenter', () => setActiveItem(i));
      el.addEventListener('click', () => {
        resultsOnly[i]?.action?.();
        closeSearch();
      });
    });
  };

  const debounce = (fn, wait = 180) => {
    let t;
    return (...args) => {
      clearTimeout(t);
      t = setTimeout(() => fn(...args), wait);
    };
  };

  const handleInput = debounce(() => renderResults(searchInput?.value || ''), 180);
  searchInput?.addEventListener('input', handleInput);

  // teclado ↑ ↓ Enter
  searchInput?.addEventListener('keydown', (e) => {
    if (!searchResults) return;
    const items = searchResults.querySelectorAll('.search-item');
    if (!items.length) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveItem(Math.min(activeIndex + 1, items.length - 1));
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveItem(Math.max(activeIndex - 1, 0));
    }
    if (e.key === 'Enter') {
      if (activeIndex < 0) return;
      e.preventDefault();
      items[activeIndex].click();
    }
  });

  // filtros chips
  chips.forEach(btn => {
    btn.addEventListener('click', () => {
      chips.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      searchFilter = btn.dataset.filter || 'all';
      renderResults(searchInput?.value || '');
      searchInput?.focus();
    });
  });

  // ====== INICIALIZA ======
  renderFeaturedProjects();
});
