(() => {
  const slides = [...document.querySelectorAll(".hero-slide")];
  const dots = [...document.querySelectorAll(".dot")];
  const previous = document.querySelector(".slider-arrow.prev");
  const next = document.querySelector(".slider-arrow.next");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const nav = document.querySelector(".main-nav");
  const toggle = document.querySelector(".menu-toggle");
  let current = Math.max(0, slides.findIndex(slide => slide.classList.contains("active")));
  let timer = null, resumeTimer = null, paused = false;

  if (!reduceMotion && "IntersectionObserver" in window) {
    const revealItems = document.querySelectorAll(
      ".menu-card, .full-menu-card, .intro-copy, .intro-image, .promise-grid > div, " +
      ".special-feature, .special-list > div, .contact-card, .contact-detail, " +
      ".story-layout > *, .bakery-intro-copy, .bakery-intro-photo, .bakery-product-card, " +
      ".bakery-hero-content, .contact-layout > *"
    );
    revealItems.forEach((item, index) => {
      item.classList.add("reveal-ready");
      item.style.setProperty("--reveal-delay", `${(index % 4) * 80}ms`);
    });
    const observer = new IntersectionObserver((entries, obs) => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add("is-visible"); obs.unobserve(entry.target); }
    }), { threshold: 0.12, rootMargin: "0px 0px -30px 0px" });
    revealItems.forEach(item => observer.observe(item));
  }
  function showSlide(index) {
    if (!slides.length) return;
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => slide.classList.toggle("active", i === current));
    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === current);
      dot.setAttribute("aria-current", i === current ? "true" : "false");
    });
  }
  function stopAutoPlay() { clearInterval(timer); timer = null; }
  function startAutoPlay() {
    stopAutoPlay();
    if (slides.length > 1 && !reduceMotion && !paused && !document.hidden)
      timer = setInterval(() => showSlide(current + 1), 5000);
  }
  function pauseAutoPlay() { paused = true; stopAutoPlay(); clearTimeout(resumeTimer); }
  function resumeAutoPlaySoon() {
    clearTimeout(resumeTimer);
    resumeTimer = setTimeout(() => { paused = false; startAutoPlay(); }, 2500);
  }
  previous?.addEventListener("click", () => { showSlide(current - 1); pauseAutoPlay(); resumeAutoPlaySoon(); });
  next?.addEventListener("click", () => { showSlide(current + 1); pauseAutoPlay(); resumeAutoPlaySoon(); });
  dots.forEach((dot, i) => dot.addEventListener("click", () => { showSlide(i); pauseAutoPlay(); resumeAutoPlaySoon(); }));
  nav?.addEventListener("pointerenter", pauseAutoPlay);
  nav?.addEventListener("pointerleave", resumeAutoPlaySoon);
  nav?.addEventListener("focusin", pauseAutoPlay);
  nav?.addEventListener("focusout", resumeAutoPlaySoon);
  nav?.addEventListener("touchstart", pauseAutoPlay, { passive: true });
  nav?.addEventListener("touchend", resumeAutoPlaySoon, { passive: true });
  document.addEventListener("visibilitychange", () => document.hidden ? stopAutoPlay() : startAutoPlay());
  startAutoPlay();

  toggle?.addEventListener("click", () => {
    const open = nav?.classList.toggle("open") ?? false;
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
  });
  nav?.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
    nav.classList.remove("open");
    toggle?.setAttribute("aria-expanded", "false");
    toggle?.setAttribute("aria-label", "Open navigation");
  }));
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();