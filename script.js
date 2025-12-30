// DARK MODE
const toggleBtn = document.getElementById('darkModeToggle');
toggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  toggleBtn.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
});

// COUNTERS
document.querySelectorAll('.counter').forEach(counter => {
  const update = () => {
    const target = +counter.dataset.target;
    const count = +counter.innerText;
    const inc = target / 200;
    if (count < target) {
      counter.innerText = Math.ceil(count + inc);
      setTimeout(update, 15);
    } else counter.innerText = target;
  };
  const obs = new IntersectionObserver(e => {
    if (e[0].isIntersecting) { update(); obs.unobserve(counter); }
  });
  obs.observe(counter);
});

// SKILLS PROGRESS
const skillBars = document.querySelectorAll('.progress-bar');
const skillObs = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) {
    skillBars.forEach(bar => bar.style.width = bar.dataset.width);
    skillObs.unobserve(entries[0].target);
  }
}, { threshold: 0.5 });
skillObs.observe(document.querySelector('#skills'));

// FADE-IN
const faders = document.querySelectorAll('.fade-section');
const appear = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('appear'); appear.unobserve(e.target); }
  });
}, { threshold: 0.3 });
faders.forEach(f => appear.observe(f));

// EMAILJS CONTACT FORM
(function(){ emailjs.init("TnDnAoR0cCRFd5VXY"); })();
document.getElementById("contact-form").addEventListener("submit", function(e) {
  e.preventDefault();
  emailjs.sendForm("service_b49zgn9", "template_tjucnna", this)
  .then(() => {
    document.getElementById("form-status").innerText = "✅ Message sent successfully!";
    this.reset();
  }, () => {
    document.getElementById("form-status").innerText = "❌ Failed to send. Try again.";
  });
});
