(() => {
  const revealItems = [...document.querySelectorAll("[data-reveal]")];
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealItems.forEach(item => item.classList.add("is-visible"));
  } else {
    document.documentElement.classList.add("motion-ready");
    const revealObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -36px 0px" }
    );
    revealItems.forEach(item => revealObserver.observe(item));
  }

  if (reduceMotion || !("IntersectionObserver" in window)) return;

  document.querySelectorAll("[data-count]").forEach(element => {
    const target = Number(element.dataset.count);
    const number = element.querySelector("[data-count-value]");
    if (!number || !Number.isFinite(target)) return;

    const counterObserver = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        counterObserver.disconnect();
        const duration = 1200;
        let startTime = 0;
        const animate = time => {
          if (!startTime) startTime = time;
          const progress = Math.min((time - startTime) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          number.textContent = String(Math.round(target * eased));
          if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
      },
      { threshold: 0.45 }
    );
    counterObserver.observe(element);
  });
})();
