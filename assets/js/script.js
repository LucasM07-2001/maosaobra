(() => {
    const config = {
      navbarScrollThreshold: 20,
      smoothScrollOffset: 80,
      activeSectionThreshold: 0.4,
      revealThreshold: 0.1,
      revealBaseDelayMs: 100
    };

    const dom = {
      navbar: document.getElementById('navbar'),
      hamburger: document.getElementById('hamburger'),
      menuMobile: document.getElementById('menu-mobile'),
      navLinks: Array.from(document.querySelectorAll('.nav-links a')),
      anchorLinks: Array.from(document.querySelectorAll('a[href^="#"]')),
      revealTargets: Array.from(document.querySelectorAll('.card-servico, .diferencial-item, .step, .card-depoimento'))
    };

    function init() {
      bindNavbarState();
      bindSectionTracking();
      bindMobileMenu();
      bindSmoothScroll();
      bindRevealAnimations();
    }

    function bindNavbarState() {
      if (!dom.navbar) return;

      const syncNavbarState = () => {
        dom.navbar.classList.toggle('scrolled', window.scrollY > config.navbarScrollThreshold);
      };

      window.addEventListener('scroll', syncNavbarState, { passive: true });
      syncNavbarState();
    }

    function bindSectionTracking() {
      const sections = Array.from(document.querySelectorAll('section[id]'));

      if (!sections.length || !dom.navLinks.length || !('IntersectionObserver' in window)) {
        return;
      }

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const activeId = `#${entry.target.id}`;
          dom.navLinks.forEach((link) => {
            link.classList.toggle('ativo', link.getAttribute('href') === activeId);
          });
        });
      }, { threshold: config.activeSectionThreshold });

      sections.forEach((section) => observer.observe(section));
    }

    function bindMobileMenu() {
      if (!dom.hamburger || !dom.menuMobile) return;

      const closeMenu = () => dom.menuMobile.classList.remove('aberto');

      dom.hamburger.addEventListener('click', () => {
        dom.menuMobile.classList.toggle('aberto');
      });

      dom.menuMobile.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', closeMenu);
      });
    }

    function bindSmoothScroll() {
      dom.anchorLinks.forEach((anchor) => {
        anchor.addEventListener('click', function (event) {
          const href = this.getAttribute('href');
          const target = href ? document.querySelector(href) : null;

          if (!target) return;

          event.preventDefault();
          const top = target.getBoundingClientRect().top + window.scrollY - config.smoothScrollOffset;
          window.scrollTo({ top, behavior: 'smooth' });
        });
      });
    }

    function bindRevealAnimations() {
      if (!dom.revealTargets.length) return;

      if (!('IntersectionObserver' in window)) {
        dom.revealTargets.forEach((element) => {
          element.style.opacity = '1';
          element.style.transform = 'none';
        });
        return;
      }

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        });
      }, { threshold: config.revealThreshold });

      dom.revealTargets.forEach((element, index) => {
        const delay = (index % 4) * config.revealBaseDelayMs;

        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = `opacity 0.5s ease ${delay}ms, transform 0.5s ease ${delay}ms, box-shadow 0.28s, border-color 0.28s`;
        observer.observe(element);
      });
    }
      document.addEventListener("DOMContentLoaded", () => {

      const mapa = document.getElementById("mapa-cidade");
      const regioes = document.querySelectorAll(".regiao-tag");

      regioes.forEach(regiao => {

        regiao.addEventListener("click", () => {

          regioes.forEach(item => {
            item.classList.remove("ativa");
          });

          regiao.classList.add("ativa");

          mapa.src = regiao.dataset.mapa;

        });

      });

      // ── MODAIS ──────────────────────────────────────────────
      function abrirModal(id) {
        const overlay = document.getElementById(id);
        if (!overlay) return;
        overlay.classList.add("aberto");
        document.body.style.overflow = "hidden";
        // foca no primeiro elemento focável para acessibilidade
        const focavel = overlay.querySelector("button, a, [tabindex]");
        if (focavel) focavel.focus();
      }

      function fecharModal(overlay) {
        overlay.classList.remove("aberto");
        document.body.style.overflow = "";
      }

      // Botões de abertura no footer
      const btnPrivacidade = document.getElementById("btn-privacidade");
      const btnTermos = document.getElementById("btn-termos");

      if (btnPrivacidade) {
        btnPrivacidade.addEventListener("click", (e) => {
          e.preventDefault();
          abrirModal("modal-privacidade");
        });
      }

      if (btnTermos) {
        btnTermos.addEventListener("click", (e) => {
          e.preventDefault();
          abrirModal("modal-termos");
        });
      }

      // Fechar ao clicar no botão ✕ ou no overlay
      document.querySelectorAll(".modal-overlay").forEach(overlay => {
        // Botão fechar
        overlay.querySelector(".modal-fechar").addEventListener("click", () => {
          fecharModal(overlay);
        });

        // Clique fora do modal-box
        overlay.addEventListener("click", (e) => {
          if (e.target === overlay) fecharModal(overlay);
        });
      });

      // Fechar com ESC
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
          document.querySelectorAll(".modal-overlay.aberto").forEach(overlay => {
            fecharModal(overlay);
          });
        }
      });

    });

    init();
    document.querySelectorAll('.card-servico-link').forEach(botao => {
    botao.style.cursor = 'pointer';

    botao.addEventListener('click', () => {
        const servico = botao.closest('.card-servico').querySelector('h3').textContent;

        const mensagem = encodeURIComponent(
            `Olá! Gostaria de solicitar um orçamento para o serviço de ${servico}.`
        );

        window.open(
            `https://wa.me/5541996900034?text=${mensagem}`,
            '_blank'
        );
    });
});
  })();