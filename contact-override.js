document.addEventListener("DOMContentLoaded", () => {
  const heading = document.getElementById("contactHeading");
  if (heading) heading.innerHTML = "Got a story?<br><em>Let's cut to it.</em>";

  const cvPath = "assets/Akshay-Bhatt-CV.pdf?v=20260913-0630";
  ["heroCv", "footerCv"].forEach((id) => {
    const link = document.getElementById(id);
    if (link) link.href = cvPath;
  });
});
