import Ajax from "./ajax";
import Nav from "./nav";
import Animation from "./animation";
import SmoothScroll from "./smooth-scroll.js";

const ajax = new Ajax();
const nav = new Nav();
const animation = new Animation();

//Smooth scroll event
var scroll = new SmoothScroll('a[href*="#"]', {
  speed: 700,
  easing: "easeInOutCubic",
  speedAsDuration: true,
  topOnEmptyHash: true
});

animation.fadeOutOnLoad();

animation.fadeIn();

nav.toggleNav();

nav.closeNav();

animation.scroll();

document.addEventListener("scroll", function() {
  animation.fadeIn();
});

//Utility function using reg-exp to format the name of repository
function jsUcfirst(name) {
  const formattedName = name.replace(/_/g, " ");
  return formattedName.charAt(0).toUpperCase() + formattedName.slice(1);
}

ajax
  .getRepos(
    "https://api.github.com/users/nlcarter/repos?client_id=b9f658e21aa993af4c40&client_secret=934b77059e66218c4a940f469c7f7661b2a0304"
  )
  .then(data => displayRepos(data))
  .catch(err => console.log(err));

function displayRepos(data) {
  let output = "";

  data.forEach(function(repo) {
    output += `<div class="repo">
                  <h4 class="repo-heading">${jsUcfirst(repo.name)}</h4>
                  <p class="repo-desc">${repo.description}</p>
                  <a href=${
                    repo.html_url
                  } target="_blank" class="repo-link"><img src="images/pointer-right.png" /> GitHub Repository</a>
                </div>`;
  });

  document.querySelector(".projects-repo").innerHTML = output;
}
