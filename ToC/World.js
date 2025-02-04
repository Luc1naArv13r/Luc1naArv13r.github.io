document.addEventListener("DOMContentLoaded", () => {
  // Reference elements
  const tribePopup = document.getElementById('location-tribe-popup');
  const closeTribePopup = document.querySelector('.close');
  const tribeName = document.getElementById('tribe-name');
  const tribeImgPopup = document.getElementById('tribe-img-popup');
  const tribeInfo = document.getElementById('tribe-info');
  const citizensInfo = document.getElementById('citizens-info');

  // Tribe data stored in an object instead of separate JSON files
  const tribeData = {
    Old_Adamante: {
      name: "Diamond Tribe",
      imgSrc: "diamond_tribe.jpg",
      description: `A noble tribe known for their strength and wisdom.`,
      citizens: ["Eldrin", "Saphira", "Doran"]
    },
    obsidian: {
      name: "Obsidian Tribe", 
      imgSrc: "obsidian_tribe.jpg",
      description: "A mysterious tribe with a deep connection to the earth.",
      citizens: ["Kael", "Mira", "Toran"]
    },
    loria: {
      name: "Loria Tribe",
      imgSrc: "loria_tribe.jpg",
      description: "A peaceful tribe living in harmony with nature.",
      citizens: ["Lyra", "Finn", "Eloise"]
    }
  };

  // Function to load tribe data
  const loadTribeData = (tribeKey) => {
    const tribe = tribeData[tribeKey];

    if (tribe) {
      tribeName.textContent = tribe.name;
      tribeImgPopup.src = tribe.imgSrc;
      tribeInfo.textContent = tribe.description;
      citizensInfo.innerHTML = tribe.citizens.join(", ");

      // Show modal
      tribePopup.style.display = "flex";
    }
  };

  // Event listeners for tribe buttons
  document.getElementById('diamond-tribe-btn').addEventListener('click', () => loadTribeData('Old Adamante'));
  document.getElementById('obsidian-tribe-btn').addEventListener('click', () => loadTribeData('obsidian'));
  document.getElementById('loria-tribe-btn').addEventListener('click', () => loadTribeData('loria'));

  // Close modal
  closeTribePopup.addEventListener('click', () => {
    tribePopup.style.display = 'none';
  });

  // Close modal when clicking outside of it
  window.addEventListener('click', (event) => {
    if (event.target === tribePopup) {
      tribePopup.style.display = 'none';
    }
  });
});
