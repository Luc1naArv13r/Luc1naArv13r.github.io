// Tab Navigation (Improved)
const tabLinks = document.querySelectorAll('.tab-link');
const tabContents = document.querySelectorAll('.tab-content');

function switchTab(tabName) {
    // Hide all tab contents
    tabContents.forEach(content => content.style.display = 'none');

    // Show selected tab content
    document.getElementById(tabName).style.display = 'block';

    // Remove "active" class from all tabs
    tabLinks.forEach(tab => tab.classList.remove('active'));

    // Add "active" class to the clicked tab
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
}

// Add click event listener to all tabs
tabLinks.forEach(tab => {
    tab.addEventListener('click', () => switchTab(tab.getAttribute('data-tab')));
});

// Set default active tab on page load
if (tabLinks.length > 0) {
    switchTab(tabLinks[0].getAttribute('data-tab'));
}



document.addEventListener("DOMContentLoaded", () => {
  const characters = document.querySelectorAll('.character');
  const modal = document.getElementById('character-popup');
  const closeBtn = document.querySelector('.close');
  const characterName = document.getElementById('character-name');
  const characterImg = document.getElementById('character-img-popup');
  const characterInfo = document.getElementById('character-info');

  characters.forEach(character => {
    character.addEventListener('click', () => {
      const characterId = character.getAttribute('data-character');
      const characterData = characterProfiles[characterId];

      characterName.textContent = characterData.name;
      characterImg.src = characterData.img;
      characterInfo.innerHTML = characterData.bio;

      modal.style.display = "flex";
      modal.classList.remove("hide"); // Reset animation class
    });
  });

  closeBtn.addEventListener('click', () => {
    modal.classList.add("hide"); // Add animation class
    setTimeout(() => {
      modal.style.display = "none";
      modal.classList.remove("hide"); // Reset class
    }, 400); // Match animation duration
  });

  window.addEventListener('click', (event) => {
    if (event.target === modal) {
      modal.classList.add("hide");
      setTimeout(() => {
        modal.style.display = "none";
        modal.classList.remove("hide");
      }, 400);
    }
  });
});
