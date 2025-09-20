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
// Modal elements
const modal = document.getElementById("bookModal");
const modalCover = document.getElementById("modalCover");
const modalTitle = document.getElementById("modalTitle");
const modalSynopsis = document.getElementById("modalSynopsis");
const closeBtn = modal.querySelector(".close-modal");
const visitBtn = modal.querySelector(".visit-site");

let currentLink = "";

// Open modal when book clicked
document.querySelectorAll(".book").forEach(book => {
  book.addEventListener("click", () => {
    const title = book.dataset.title;
    const synopsis = book.dataset.synopsis;
    const cover = book.querySelector("img").src;
    currentLink = book.dataset.link;

    modalTitle.textContent = title;
    modalSynopsis.textContent = synopsis;
    modalCover.src = cover;

    modal.style.display = "block";
  });
});

// Close modal
closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

// Visit site
visitBtn.addEventListener("click", () => {
  if (currentLink) {
    window.open(currentLink, "_blank");
  }
});

// Close modal when clicking outside
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});
