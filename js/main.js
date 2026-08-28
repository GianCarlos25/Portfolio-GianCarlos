/* ==========================================================================
   Gian Carlos Samaniego - Portfolio
   JS sin dependencias externas: menú móvil, animaciones de scroll,
   contador de estadísticas, fondo de canvas y listado de proyectos vía
   la API pública de GitHub (con caché, estado de carga y de error).
   ========================================================================== */

(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------- Menú móvil ---------------- */
  var navToggle = document.getElementById("navToggle");
  var navLinks = document.getElementById("navLinks");

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", function () {
      var isOpen = navLinks.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
      navToggle.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
    });

    navLinks.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navLinks.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.setAttribute("aria-label", "Abrir menú");
      });
    });
  }

  /* ---------------- Año dinámico en el footer ---------------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = "© " + new Date().getFullYear();

  /* ---------------- Revelado al hacer scroll ---------------- */
  var revealTargets = document.querySelectorAll(
    ".hero__copy > *, .hero__visual, .about__copy > *, .skill-group, " +
    ".timeline__item, .project-card, .other-projects__head, .repo-grid, " +
    ".services__intro > *, .service-list li, .contact__inner > *"
  );

  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealTargets.forEach(function (el) { el.classList.add("reveal", "is-visible"); });
  } else {
    var seenParents = new WeakMap();
    revealTargets.forEach(function (el) {
      el.classList.add("reveal");
      var parent = el.parentElement;
      var index = seenParents.has(parent) ? seenParents.get(parent) : 0;
      el.style.transitionDelay = Math.min(index * 60, 300) + "ms";
      seenParents.set(parent, index + 1);
    });

    var revealObserver = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    revealTargets.forEach(function (el) { revealObserver.observe(el); });
  }

  /* ---------------- Contadores de estadísticas ---------------- */
  function formatStat(value, compact) {
    if (compact && value >= 1000) {
      return Math.round(value / 1000) + "k";
    }
    return String(Math.round(value));
  }

  function animateCount(el) {
    var target = parseFloat(el.getAttribute("data-count"), 10) || 0;
    var suffix = el.getAttribute("data-suffix") || "";
    var compact = el.getAttribute("data-compact") === "true";

    if (reduceMotion) {
      el.textContent = formatStat(target, compact) + suffix;
      return;
    }

    var duration = 1200;
    var start = null;

    function step(timestamp) {
      if (start === null) start = timestamp;
      var progress = Math.min((timestamp - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      var current = target * eased;
      el.textContent = formatStat(current, compact) + suffix;
      if (progress < 1) window.requestAnimationFrame(step);
    }

    window.requestAnimationFrame(step);
  }

  var statEls = document.querySelectorAll(".stat dd[data-count]");
  if (statEls.length) {
    if ("IntersectionObserver" in window) {
      var statObserver = new IntersectionObserver(
        function (entries, observer) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              animateCount(entry.target);
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.4 }
      );
      statEls.forEach(function (el) { statObserver.observe(el); });
    } else {
      statEls.forEach(animateCount);
    }
  }

  /* ---------------- Copiar email ---------------- */
  var copyBtn = document.getElementById("copyEmailBtn");
  var copyNote = document.getElementById("copyNote");

  if (copyBtn && copyNote) {
    copyBtn.addEventListener("click", function () {
      var email = copyBtn.getAttribute("data-email") || "";
      var done = function () { copyNote.textContent = "Copiado: " + email; };
      var fallback = function () {
        var input = document.createElement("input");
        input.value = email;
        input.setAttribute("readonly", "");
        input.style.position = "absolute";
        input.style.left = "-9999px";
        document.body.appendChild(input);
        input.select();
        try { document.execCommand("copy"); done(); }
        catch (err) { copyNote.textContent = email; }
        document.body.removeChild(input);
      };

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(done, fallback);
      } else {
        fallback();
      }
    });
  }

  /* ---------------- Fondo de canvas: red de nodos ---------------- */
  var canvas = document.getElementById("networkCanvas");
  if (canvas && canvas.getContext) {
    var ctx = canvas.getContext("2d");
    var nodes = [];
    var width = 0, height = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);
    var rafId = null;

    function resize() {
      var rect = canvas.parentElement.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      var count = Math.max(18, Math.round((width * height) / 22000));
      nodes = [];
      for (var i = 0; i < count; i++) {
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.18,
          vy: (Math.random() - 0.5) * 0.18,
          r: Math.random() * 1.4 + 0.8
        });
      }
    }

    function drawFrame() {
      ctx.clearRect(0, 0, width, height);
      var linkDist = Math.min(150, width / 4);

      for (var i = 0; i < nodes.length; i++) {
        var a = nodes[i];
        a.x += a.vx;
        a.y += a.vy;
        if (a.x < 0 || a.x > width) a.vx *= -1;
        if (a.y < 0 || a.y > height) a.vy *= -1;

        for (var j = i + 1; j < nodes.length; j++) {
          var b = nodes[j];
          var dx = a.x - b.x, dy = a.y - b.y;
          var dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < linkDist) {
            ctx.strokeStyle = "rgba(239,131,84," + (0.16 * (1 - dist / linkDist)) + ")";
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      for (var k = 0; k < nodes.length; k++) {
        var n = nodes[k];
        ctx.fillStyle = "rgba(237,233,227,0.55)";
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function loop() {
      drawFrame();
      rafId = window.requestAnimationFrame(loop);
    }

    resize();
    if (reduceMotion) {
      drawFrame();
    } else {
      loop();
      window.addEventListener("resize", function () {
        window.cancelAnimationFrame(rafId);
        resize();
        loop();
      });
    }
  }

  /* ---------------- Proyectos vía la API de GitHub ---------------- */
  var GITHUB_USER = "GianCarlos25";
  var CACHE_KEY = "gh_repos_cache_v1_" + GITHUB_USER;
  var CACHE_TTL = 60 * 60 * 1000; // 1 hora
  var MAX_REPOS = 6;

  var repoGrid = document.getElementById("repoGrid");
  var featuredLinks = document.querySelectorAll(".project-card__links[data-repo-match]");

  function readCache() {
    try {
      var raw = window.localStorage.getItem(CACHE_KEY);
      if (!raw) return null;
      var parsed = JSON.parse(raw);
      if (Date.now() - parsed.timestamp > CACHE_TTL) return null;
      return parsed.data;
    } catch (err) {
      return null;
    }
  }

  function writeCache(data) {
    try {
      window.localStorage.setItem(CACHE_KEY, JSON.stringify({ timestamp: Date.now(), data: data }));
    } catch (err) { /* almacenamiento no disponible, seguimos sin caché */ }
  }

  function escapeHtml(str) {
    var div = document.createElement("div");
    div.textContent = str || "";
    return div.innerHTML;
  }

  function timeAgo(dateStr) {
    var diff = Date.now() - new Date(dateStr).getTime();
    var days = Math.floor(diff / 86400000);
    if (days < 1) return "hoy";
    if (days < 30) return "hace " + days + (days === 1 ? " día" : " días");
    var months = Math.floor(days / 30);
    if (months < 12) return "hace " + months + (months === 1 ? " mes" : " meses");
    var years = Math.floor(months / 12);
    return "hace " + years + (years === 1 ? " año" : " años");
  }

  function linkFeaturedProjects(repos) {
    featuredLinks.forEach(function (container) {
      var keywords = (container.getAttribute("data-repo-match") || "")
        .split(",")
        .map(function (k) { return k.trim().toLowerCase(); })
        .filter(Boolean);

      var match = repos.find(function (repo) {
        var name = repo.name.toLowerCase();
        return keywords.some(function (k) { return name.indexOf(k) !== -1; });
      });

      if (match) {
        var link = container.querySelector(".project-link");
        if (link) link.href = match.html_url;
      }
    });
  }

  function renderRepos(repos) {
    if (!repoGrid) return;

    if (!repos.length) {
      repoGrid.innerHTML =
        '<div class="repo-grid__empty">' +
        "<p>No hay más repositorios públicos por aquí ahora mismo.</p>" +
        '<a class="btn btn--ghost" href="https://github.com/' + GITHUB_USER + '" target="_blank" rel="noopener noreferrer">Ver perfil de GitHub</a>' +
        "</div>";
      return;
    }

    repoGrid.innerHTML = repos.map(function (repo) {
      var desc = repo.description ? escapeHtml(repo.description) : "Sin descripción todavía.";
      var lang = repo.language ? escapeHtml(repo.language) : "Código";
      return (
        '<article class="repo-card reveal is-visible">' +
        "<h4><a href=\"" + repo.html_url + "\" target=\"_blank\" rel=\"noopener noreferrer\">" + escapeHtml(repo.name) + "</a></h4>" +
        "<p>" + desc + "</p>" +
        '<div class="repo-card__meta">' +
        '<span class="repo-card__lang">' + lang + "</span>" +
        (repo.stargazers_count > 0 ? "<span>★ " + repo.stargazers_count + "</span>" : "") +
        "<span>" + timeAgo(repo.updated_at) + "</span>" +
        "</div>" +
        "</article>"
      );
    }).join("");
  }

  function renderError() {
    if (!repoGrid) return;
    repoGrid.innerHTML =
      '<div class="repo-grid__empty">' +
      "<p>No se pudieron cargar más proyectos ahora mismo. Puedes verlos directamente en GitHub.</p>" +
      '<a class="btn btn--ghost" href="https://github.com/' + GITHUB_USER + '" target="_blank" rel="noopener noreferrer">Ver perfil de GitHub</a>' +
      "</div>";
  }

  function loadRepos() {
    var cached = readCache();
    if (cached) {
      renderRepos(cached.slice(0, MAX_REPOS));
      linkFeaturedProjects(cached);
      return;
    }

    fetch("https://api.github.com/users/" + GITHUB_USER + "/repos?sort=updated&per_page=100")
      .then(function (res) {
        if (!res.ok) throw new Error("GitHub API " + res.status);
        return res.json();
      })
      .then(function (allRepos) {
        var repos = allRepos.filter(function (r) { return !r.fork; });
        linkFeaturedProjects(repos);

        var featuredKeywords = [];
        featuredLinks.forEach(function (c) {
          (c.getAttribute("data-repo-match") || "").split(",").forEach(function (k) {
            if (k.trim()) featuredKeywords.push(k.trim().toLowerCase());
          });
        });

        var rest = repos.filter(function (r) {
          var name = r.name.toLowerCase();
          return !featuredKeywords.some(function (k) { return name.indexOf(k) !== -1; });
        });

        writeCache(repos);
        renderRepos(rest.slice(0, MAX_REPOS));
      })
      .catch(function () {
        renderError();
      });
  }

  if (repoGrid) loadRepos();
})();
