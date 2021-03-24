export default class Animation {
  fadeOutOnLoad() {
    const elements = document.querySelectorAll(".fade-in, .image-fade-in");
    elements.forEach(elem => {
      elem.style.opacity = 0;
    });
  }

  fadeIn() {
    const elements = document.querySelectorAll(".fade-in, .image-fade-in");
    let delay = 0.25;

    elements.forEach(elem => {
      const top = elem.getBoundingClientRect().top;
      const bottom = elem.getBoundingClientRect().bottom;

      //if the top of the element is in view && if bottom of element is greater than 0, call animation
      if (top < window.innerHeight && bottom > 0) {
        elem.style.animation = `fadeIn ease-in 1s ${delay}s both`;
        delay += 0.05;
      } else {
        elem.style.opacity = 0;
        elem.style.animation = "";
      }
    });
  }

  scroll() {
    const toggle = document.querySelector("a.toggle-nav");
    document.addEventListener("scroll", function() {
      const pixels = window.pageYOffset.toFixed(0);
      const homepage = document.querySelector(".homepage");
      const threshold = homepage.offsetHeight + homepage.offsetTop;

      if (pixels >= threshold) {
        toggle.classList.remove("menu");
        toggle.innerHTML = `<a href='#' class='up-arrow'><img src="images/up-arrow.png"/>`;
      } else {
        toggle.classList.add("menu");
        toggle.innerHTML = `<img src="images/menu.svg"/>`;
      }
    });
  }
}
