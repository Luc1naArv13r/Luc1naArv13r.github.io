    // Smooth transition from welcome to main page
    setTimeout(() => {
      const welcome = document.getElementById("welcomeScreen");
      const mainPage = document.getElementById("mainPage");

      welcome.style.opacity = 0;

      setTimeout(() => {
        welcome.style.display = "none";
        mainPage.style.display = "flex";

        setTimeout(() => {
          mainPage.style.opacity = 1;
        }, 50);

      }, 1000);
    }, 4000);

    // Sidebar toggle
    function toggleMenu() {
      document.getElementById("sidebar").classList.toggle("active");
    }
    function showPage(pageId) {
  // Hide all pages
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));

  // Show the selected page
  document.getElementById(pageId).classList.add('active');

  // Close sidebar after selecting
  toggleMenu();
}
