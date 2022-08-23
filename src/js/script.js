
const icon = document.querySelector(".icon-bars");
const bar = document.querySelector(".bar");
const barTop = document.querySelector(".bar-top");
const barBottom = document.querySelector(".bar-bottom");
const overlay = document.querySelector('.overlay');
const nav = document.querySelector('header nav');
const menus = document.querySelectorAll('header ul li a');

// BOTÃO MENU MOBILE 
icon.addEventListener("click", transformIcon);

function transformIcon(e) {
  e.preventDefault;

  if (!bar.classList.contains("rotate")) {
    showMenu();
  } else {
    hideMenu();
  }
}

function hideMenu() {
  bar.classList.remove("rotate");
  barTop.classList.remove("rotate-top");
  barBottom.classList.remove("rotate-bottom");

  overlay.style.display = 'none';
  toggleMenu();
}

function showMenu() {
  bar.classList.add("rotate");
  barTop.classList.add("rotate-top");
  barBottom.classList.add("rotate-bottom");

  overlay.style.display = 'block';
  toggleMenu();
}


// ANIMAÇÃO MENU
function toggleMenu(){
  nav.classList.toggle('mobile-toggle');
}

overlay.addEventListener('click', hideMenu);


// Animação de scroll suave
menus.forEach((value) => value.addEventListener("click", scrollId));

function scrollId(e) {
  e.preventDefault();
  const element = e.target;
  const to = getScrollTop(element);

  scrollToPosition(to);
  hideMenu();
}

function getScrollTop(element) {
  if(element.getAttribute("href") !== '#' && element.getAttribute("href")){
    const id = element.getAttribute("href");
    return document.querySelector(id).offsetTop;
  }
}

function scrollToPosition(to) {
  // Funciona em alguns browsers
  // window.scroll({
  //     top: to,
  //     behavior: "smooth"
  // });

  smoothScrollTo(0, to, 2000);
}

/**
 * Smooth scroll animation
 * @param {int} endX: destination x coordinate
 * @param {int} endY: destination y coordinate
 * @param {int} duration: animation duration in ms
 */
function smoothScrollTo(endX, endY, duration) {
  const startX = window.scrollX || window.pageXOffset;
  const startY = window.scrollY || window.pageYOffset;
  const distanceX = endX - startX;
  const distanceY = endY - startY;
  const startTime = new Date().getTime();

  duration = typeof duration !== "undefined" ? duration : 400;

  // Easing function
  const easeInOutQuart = (time, from, distance, duration) => {
    if ((time /= duration / 2) < 1)
      return (distance / 2) * time * time * time * time + from;
    return (-distance / 2) * ((time -= 2) * time * time * time - 2) + from;
  };

  const timer = setInterval(() => {
    const time = new Date().getTime() - startTime;
    const newX = easeInOutQuart(time, startX, distanceX, duration);
    const newY = easeInOutQuart(time, startY, distanceY, duration);
    if (time >= duration) {
      clearInterval(timer);
    }
    window.scroll(newX, newY);
  }, 1000 / 60); // 60 fps
}