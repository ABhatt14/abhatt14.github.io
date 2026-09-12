document.addEventListener("DOMContentLoaded", function () {

  // Make every hidden/reveal element visible
  document.querySelectorAll(".reveal").forEach(function (el) {
    el.classList.add("visible");
    el.style.opacity = "1";
    el.style.visibility = "visible";
    el.style.transform = "none";
  });

  // Contact heading
  const contactHeading = document.getElementById("contactHeading");

  if (contactHeading) {
    contactHeading.innerHTML = "Got a story?<br><em>Let's cut to it.</em>";
    contactHeading.style.opacity = "1";
    contactHeading.style.visibility = "visible";
  }

  // Contact email
  const contactEmail = document.getElementById("contactEmail");

  if (contactEmail) {
    contactEmail.href =
      "mailto:akkibhatt05@gmail.com?subject=Video%20Editing%20Project";
  }

  // Current year
  const currentYear = document.getElementById("currentYear");

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

});
