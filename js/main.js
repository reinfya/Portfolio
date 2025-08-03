// contact-btn
const button = document.querySelector(".contact-button");
const circle = button.querySelector(".circle-bg");
const arrow = button.querySelector(".arrow");

let isHovering = false;

document.addEventListener("mousemove", (e) => {
  const rect = button.getBoundingClientRect();
  const mouseX = e.clientX;
  const mouseY = e.clientY;
  const btnCenterX = rect.left + rect.width / 2;
  const btnCenterY = rect.top + rect.height / 2;

  const dx = mouseX - btnCenterX;
  const dy = mouseY - btnCenterY;
  const distance = Math.sqrt(dx * dx + dy * dy);

  if (distance < 130) {
    isHovering = true;
    gsap.to(button, {
      x: dx * 0.5,
      y: dy * 0.5,
      duration: 0.1,
      ease: "power2.out",
    });
  } else if (isHovering) {
    isHovering = false;
    gsap.to(button, {
      x: 0,
      y: 0,
      duration: 0.3,
      ease: "power2.out",
    });
  }
});

// section-line
gsap.registerPlugin(ScrollTrigger);

// すべての .section-box をループして適用
document.querySelectorAll(".section-box").forEach(section => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: "top 50%",
      toggleActions: "play none none none",
      markers: false // デバッグ時は true に
    }
  });

  // section-line のアニメーション
  tl.to(section.querySelector(".section-line"), {
    width: "100%",
    duration: 0.1,
    ease: "power2.out"
  })

    // section-en を上に出現
    .to(section.querySelector(".section-en"), {
      opacity: 1,
      y: -10,
      duration: 0.6,
      ease: "power2.out"
    }, "+=0.3")

    // section-ja を下に出現
    .to(section.querySelector(".section-ja"), {
      opacity: 1,
      y: 10,
      duration: 0.6,
      ease: "power2.out"
    }, "-=0.4");
});










// ハンバーガーメニュー

const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('.header-nav');
const overlay = document.querySelector('.menu-overlay');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  nav.classList.toggle('open');
  overlay.classList.toggle('active');

  const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
  hamburger.setAttribute('aria-expanded', !isExpanded);
});

overlay.addEventListener('click', () => {
  hamburger.classList.remove('active');
  nav.classList.remove('open');
  overlay.classList.remove('active');
  hamburger.setAttribute('aria-expanded', false);
});


// header splittext



gsap.registerPlugin(SplitText);

const navLinks = document.querySelectorAll('.header-nav a');

navLinks.forEach((link) => {
  const split = new SplitText(link, { type: "chars" });
  const chars = split.chars;

  // 各リンクごとにアニメ状態フラグを持つ
  let isAnimating = false;

  // 初期状態（通常表示）
  gsap.set(chars, { y: 0, opacity: 1 });

  link.addEventListener("mouseenter", () => {
    if (isAnimating) return;
    isAnimating = true;

    gsap.to(chars, {
      y: -20,
      opacity: 0,
      duration: 0.3,
      ease: "power1.in",
      stagger: 0.03,
      onComplete: () => {
        gsap.set(chars, { y: 20, opacity: 0 });
        gsap.to(chars, {
          y: 0,
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
          stagger: 0.03,
          onComplete: () => {
            isAnimating = false;
          }
        });
      }
    });
  });
});















// works view more
gsap.registerPlugin(SplitText);

document.querySelectorAll(".splittext").forEach((el) => {
  const split = new SplitText(el, { type: "chars" });
  const chars = split.chars;

  const line = el.closest(".works-arrow")?.querySelector(".line");
  const arrow = el.closest(".works-arrow")?.querySelector(".arrow");

  let isAnimating = false; // アニメーション中かどうか]]

  el.parentElement.addEventListener("mouseover", () => {
    if (isAnimating) return; // アニメーション中は無視
    isAnimating = true;
    console.log(arrow);

    line.style.animation = "none";
    arrow.style.animation = "none";

    void line.offsetWidth;
    line.style.animation = "line-flow 0.8s ease forwards";
    arrow.style.animation = "line-flow 0.8s ease forwards";

    // arrow.style.animation = "line-flow 0.8s ease forwards";

    gsap.to(chars, {
      y: -20,
      opacity: 0,
      duration: 0.3,
      ease: "power1.in",
      stagger: 0.03,
      onComplete: () => {
        gsap.set(chars, { y: 20, opacity: 0 });
        gsap.to(chars, {
          y: 0,
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
          stagger: 0.03,
          onComplete: () => {
            isAnimating = false; // 完了後にフラグ解除
          },
        });
      },
    });
  });

});

// works scroll
document.addEventListener("DOMContentLoaded", function () {
  gsap.registerPlugin(ScrollTrigger);

  const images = document.querySelectorAll(".works-img");
  let isScrolling = false;
  let scrollTimeout;
  let currentActiveImg = null;

  function updateImageScale() {
    let closestImg = null;
    let closestDistance = Infinity;
    const viewportCenter = window.innerHeight / 2;

    images.forEach((img) => {
      const rect = img.getBoundingClientRect();
      const imgCenter = rect.top + rect.height / 2;
      const distance = Math.abs(imgCenter - viewportCenter);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestImg = img;
      }
    });

    currentActiveImg = closestImg;

    images.forEach((img) => {
      if (img === closestImg) {
        gsap.to(img, {
          scale: 1.05,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
        });
      } else {
        gsap.to(img, {
          scale: 0.7,
          opacity: 0.7,
          duration: 0.6,
          ease: "power2.out",
        });
      }
    });
  }

  function onScroll() {
    isScrolling = true;
    updateImageScale();

    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      isScrolling = false;
    }, 200);
  }

  window.addEventListener("scroll", onScroll);
  window.addEventListener("resize", updateImageScale);
  updateImageScale(); // 初期呼び出し

  // works-img hover（スクロール中＆縮小状態のときは無効）
  document.querySelectorAll('.work-thumb').forEach((container) => {
    const img = container.querySelector('img.works-img');

    container.addEventListener('mouseenter', () => {
      if (!isScrolling && img === currentActiveImg) {
        gsap.to(img, { scale: 1.1, duration: 0.3, ease: 'power1.out' });
      }
    });

    container.addEventListener('mouseleave', () => {
      if (!isScrolling && img === currentActiveImg) {
        gsap.to(img, { scale: 1, duration: 0.3, ease: 'power1.out' });
      }
    });
  });
});










// 反転
function setupScrollTrigger() {
  const works = document.querySelector("#works");
  if (!works) return;

  // 初期状態はinvertなし
  document.body.classList.remove("invert");

  // works内にいる間invertをつけるトリガー
  ScrollTrigger.create({
    trigger: works,
    start: "top 50%",
    end: "bottom 10%",    // worksのbottomが画面上に来たら終了
    onEnter: () => document.body.classList.add("invert"),
    onLeave: () => document.body.classList.remove("invert"),
    onEnterBack: () => document.body.classList.add("invert"),
    onLeaveBack: () => document.body.classList.remove("invert"),
    markers: false,
  });

  ScrollTrigger.refresh();
}

window.addEventListener("DOMContentLoaded", setupScrollTrigger);
window.addEventListener("pageshow", setupScrollTrigger);





// 反転profile
ScrollTrigger.create({
  trigger: "#art",
  start: "top 50%",
  end: "bottom 40%",
  onEnter: () => document.body.classList.add("invert"),
  onEnterBack: () => document.body.classList.add("invert"), // 上に戻ったときも追加
  onLeave: () => document.body.classList.remove("invert"),
  onLeaveBack: () => document.body.classList.remove("invert"),
  markers: false, // true にすればデバッグ可
});



// fade up
gsap.registerPlugin(ScrollTrigger);



gsap.utils.toArray(".fadeup").forEach((el) => {
  gsap.fromTo(el,
    { y: 20, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: el,
        start: "top 55%",
        toggleActions: "play none none none"
      }
    }
  );
});

// art　丸く出てくる
gsap.registerPlugin(ScrollTrigger);

gsap.to(".art-bg", {
  clipPath: "circle(150% at 50% 50%)", // 全体が見える程度のサイズに拡大
  ease: "power2.out",
  scrollTrigger: {
    trigger: ".art-bg-mask",
    start: "top 80%",
    toggleActions: "play none none reverse"
  }
});


// ローディング画面

window.addEventListener("load", () => {
  const letters = document.querySelectorAll('.loading-text-words');
  const tl = gsap.timeline({ repeat: -1, repeatDelay: 0 });

  letters.forEach((letter, i) => {
    const delay = i * 0.15;

    // フェードアップ
    tl.to(letter, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power1.inOut"
    }, delay);

    // フェードダウン（少し後）
    tl.to(letter, {
      opacity: 0.1,
      y: 0,
      duration: 0.4,
      ease: "power1.inOut"
    }, delay + 0.8);
  });

});



const tl = gsap.timeline();

// loadingのアニメーション終了後にFVタイトル表示
tl.to(".circle-loader circle", {
  duration: 2.5,
  strokeDashoffset: 0,
  opacity: 0.8,
  ease: "power2.out",
})
  .to(".loading-text, .loading-section", {
    opacity: 0,
    duration: 0.4,
    ease: "power2.out"
  })
  .to(".curtain", {
    y: "-100%",
    duration: 0.7,
    ease: "power2.inOut"
  })
  .set("#loading", { display: "none" }) // loadingエリア非表示に






  // FVタイトル（左から順にふわっと）
  .to(".fv-timeline-1", {
    x: 0,
    opacity: 1,
    duration: 0.6,
    ease: "power2.out"
  }, "+=0.2")
  .to(".fv-timeline-2", {
    x: 0,
    opacity: 1,
    duration: 0.6,
    ease: "power2.out"
  }, "+=0.1")
  .to(".fv-timeline-3", {
    x: 0,
    opacity: 1,
    duration: 0.6,
    ease: "power2.out"
  }, "+=0.1");

const splitEn = new SplitText(".fv-en", { type: "chars" });

// 1文字ずつフェードインするアニメーションをタイムラインに追加
tl.from(splitEn.chars, {
  duration: 0.5,
  opacity: 0,
  y: 20,
  stagger: 0.03,
  ease: "power2.out"
}, "-=0.4");  // 前のアニメーションの途中から重ねて開始





