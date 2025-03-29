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
  
  const characterProfiles = {
    1: {
      name: " Tepung Terigu Serbaguna & Gula Halus",
      img: "IMG_3901.jpeg",
      bio: `
      <strong>Age</strong>: 18<br>
      Height: 150 cm tall<br>
      Gender: female<br>
      Race: human<br><br>
      
      Once a shy and fragile girl, Reila Arvier comes from a long line of knights and was trained to wield a weapon 
      from a young age. She has always been motherly and nurturing, taking on the responsibility of raising her younger 
      siblings, Ren and Rena, after their parents passed away and their oldest brother suddenly disappeared. Reila adores 
      children, and in the absence of their parents, she naturally stepped into the role of a mother figure for the twins.<br>

      To Aaron, however, Reila is more than just a motherly presence; she is someone he deeply cherishes. Their bond goes beyond 
      familial warmth; Reila has cared for him in a way that feels almost akin to that of a devoted partner. She has loved him for 
      a long time, but since Lucid is Aaron’s close friend, she chooses to keep her feelings hidden, unwilling to risk their friendship.`
    },
    2: {
      name: "Aaron",
      img: "IMG_3900.jpeg",
      bio: `<h2>Aaron Grey</h2><br>
      Age: 23
      Height: 200 cm<br>
      Gender: Male<br>
      Race: human<br><br>
      
      As the adopted son of the Grey family and the younger brother of Kieran Grey, Aaron has always questioned his origins. 
      His striking diamond-colored eyes set him apart in the capital, making him feel like an outsider. However, his adoptive 
      parents embraced him as their own without hesitation, never treating him any differently.<br><br>

      Aaron grew close to the Arvier family, drawn to them by a sense of familiarity—after all, the Arviers were known for their 
      rare blue-purple crystal eyes. Through his bond with the eldest Arvier, Aaron became deeply connected to the family, especially 
      with Ren and Rena, whom he cared for as if they were his own siblings. But Reila was different; she held a special place in his 
      heart. His connection with her went deeper than mere friendship, though he never found the words to express it.<br><br>

      Before his disappearance, Lucid entrusted Aaron with a promise: if anything ever happened to him, Aaron would look after the rest 
      of the Arvier family. He honored that promise without hesitation. Whenever possible, he would join them for breakfast, lunch, or 
      dinner—sometimes even staying the night, falling asleep on the living room couch as if he were a part of their household.<br><br>`
    },
    3: {
      name: "Kieran",
      img: "download (2).jpeg",
      bio: `...`
    },
    4: {
      name: "Serena",
      img: "IMG_3904.jpeg",
      bio: `...`
    }
  };

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

 //timer application//
let timeRemaining = 0;
let timerInterval;
let animationInterval;
let currentImage = 1;
const timerElement = document.getElementById('timer');
const timerImage = document.getElementById('timer-image');

function updateTimerDisplay() {
    let hours = Math.floor(timeRemaining / 3600);
    let minutes = Math.floor((timeRemaining % 3600) / 60);
    let seconds = timeRemaining % 60;
    timerElement.textContent =
        (hours < 10 ? '0' : '') + hours + ":" +
        (minutes < 10 ? '0' : '') + minutes + ":" +
        (seconds < 10 ? '0' : '') + seconds;
}

function setTimer() {
    let h = parseInt(document.getElementById('hours').value) || 0;
    let m = parseInt(document.getElementById('minutes').value) || 0;
    let s = parseInt(document.getElementById('seconds').value) || 0;
    timeRemaining = (h * 3600) + (m * 60) + s;
    updateTimerDisplay();
}

function startTimer() {
    if (!timerInterval) {
        timerInterval = setInterval(() => {
            if (timeRemaining > 0) {
                timeRemaining--;
                updateTimerDisplay();
            } else {
                clearInterval(timerInterval);
                clearInterval(animationInterval);
                timerImage.src = "Untitled326_20250329130602.png"; // Gambar ketika waktu habis
            }
        }, 1000);

        // Mulai animasi gambar bergantian setiap 500ms
        animationInterval = setInterval(() => {
            currentImage = currentImage === 1 ? 2 : 1;
            timerImage.src = `pixil-frame-0 (1).png`;
        }, 500);
    }
}

function pauseTimer() {
    clearInterval(timerInterval);
    clearInterval(animationInterval);
    timerInterval = null;
    animationInterval = null;
}

function resetTimer() {
    clearInterval(timerInterval);
    clearInterval(animationInterval);
    timerInterval = null;
    animationInterval = null;
    timeRemaining = 0;
    timerImage.src = "pixil-frame-0.png"; // Kembali ke gambar awal
    updateTimerDisplay();
}

updateTimerDisplay();
