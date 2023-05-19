/* funcionalidad de nav-bar */
document.addEventListener("DOMContentLoaded", function() {
  var navLinks = document.querySelectorAll(".navbar-nav a");

  navLinks.forEach(function(link) {
    link.addEventListener("click", function() {
      var navbarCollapse = document.querySelector(".navbar-collapse");
      if (navbarCollapse.classList.contains("show")) {
        navbarCollapse.classList.remove("show");
      }
    });
  });
});