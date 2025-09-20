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
  // Modal Elements
  const modal = document.getElementById("bookModal");
  const modalImg = document.getElementById("modalImg");
  const modalTitle = document.getElementById("modalTitle");
  const modalInfo = document.getElementById("modalInfo");
  const modalLink = document.getElementById("modalLink");
  const closeBtn = document.querySelector(".close");

  // Open modal when book is clicked
  document.querySelectorAll(".book").forEach(book => {
    book.addEventListener("click", () => {
      modal.style.display = "flex";
      modalImg.src = book.dataset.img;
      modalTitle.innerText = book.dataset.title;
      modalInfo.innerHTML = book.dataset.info;
      modalLink.href = book.dataset.link;
    });
  });

  // Close modal
  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // Close modal if clicked outside
  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
