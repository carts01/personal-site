export default class Nav {
  toggleNav() {
    const toggle = document.querySelector("a.toggle-nav");

    const main = document.querySelector(".main");

    toggle.addEventListener("click", function() {
      if (toggle.classList.contains("menu")) {
        main.classList.toggle("open");
      }

      if (main.classList.contains("open")) {
        toggle.innerHTML = `<img src="images/close.svg"/>`;
      } else {
        toggle.innerHTML = `<img src="images/menu.svg"/>`;
      }
    });
  }

  closeNav() {
    const main = document.querySelector(".main");
    const links = document.querySelectorAll(".menu a");
    const toggle = document.querySelector("a.toggle-nav");

    links.forEach(link => {
      link.addEventListener("click", function() {
        main.classList.toggle("open");
        if (main.classList.contains("open")) {
          toggle.innerHTML = `<img src="images/close.svg"/>`;
        } else {
          toggle.innerHTML = `<a href='#' class='up-arrow'><img src="images/up-arrow.png"/>`;
          toggle.classList.remove("menu");
        }
      });
    });
  }
}
