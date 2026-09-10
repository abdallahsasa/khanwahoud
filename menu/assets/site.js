(function () {
  var header = document.querySelector("header");
  var burger = document.querySelector(".burger");
  if (burger) burger.addEventListener("click", function () { header.classList.toggle("open"); });

  function onScroll() { header.classList.toggle("solid", window.scrollY > 40); }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // OG-style year counter: 1736 -> 2025, eased, once.
  var yearEl = document.getElementById("yearCount");
  if (yearEl) {
    var start = +yearEl.dataset.start, end = +yearEl.dataset.end;
    if (reduced) { yearEl.textContent = end; }
    else {
      var t0 = null, dur = 2400;
      var tick = function (t) {
        if (!t0) t0 = t;
        var p = Math.min((t - t0) / dur, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        yearEl.textContent = Math.round(start + (end - start) * eased);
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }
  }
  var els = document.querySelectorAll(".reveal");
  if (reduced || !("IntersectionObserver" in window)) {
    els.forEach(function (el) { el.classList.add("in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px" });
    els.forEach(function (el) { io.observe(el); });
  }

  // Forms: submit via fetch, show inline result, never navigate away.
  document.querySelectorAll("form.inquiry").forEach(function (form) {
    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var ok = form.querySelector("[data-ok]");
      var err = form.querySelector("[data-err]");
      ok.classList.add("hidden"); err.classList.add("hidden");
      var btn = form.querySelector("button[type=submit]");
      btn.disabled = true;
      fetch(form.action, { method: "POST", body: new FormData(form) })
        .then(function (r) { if (!r.ok) throw 0; return r.json(); })
        .then(function (d) {
          if (!d.ok) throw 0;
          ok.classList.remove("hidden");
          form.querySelectorAll("input:not([type=hidden]), textarea").forEach(function (i) { i.value = ""; });
        })
        .catch(function () { err.classList.remove("hidden"); })
        .finally(function () { btn.disabled = false; });
    });
  });
})();
