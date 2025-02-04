document.addEventListener("DOMContentLoaded", () => {
    const characters = document.querySelectorAll('.character');
    const modal = document.getElementById('character-popup');
    const closeBtn = document.querySelector('.close');
    const characterName = document.getElementById('character-name');
    const characterImg = document.getElementById('character-img-popup');
    const characterInfo = document.getElementById('character-info');
  
    const characterProfiles = {
      1: {
        name: "Rheala (Rhea) <Peony Unit No:R-3A>",
        img: "aria.jpg",
        bio: 
          `<strong>Full name:</strong> Rheala (Rhea)<br>
          <i>(Peony Unit No:R-3A)</i><br>
          <strong>Age:</strong> 18<br>
          <strong>Height:</strong> 145 cm <br>
          <strong>Gender:</strong> Female<br>
          <strong>Race:</strong> humanoid (Half human and half android)<br><br>
          <strong>Features:</strong><br>
          <strong>Eye Color:</strong>  Electrict blue with a hint of yellow<br>
          <strong>Ability:</strong> A former killing humanoid<br>
          <strong>Weapon of Choice:</strong> Sword<br>
          <strong>Other features:</strong> Pink hair, pale skin, plump lips, 
          Now with just tank top covered with long black jacket and shorts with long sock and boots<br><br>
          `
      }
    };
  
    characters.forEach(character => {
      character.addEventListener("click", function () {
        const id = this.getAttribute("data-character");
        const profile = characterProfiles[id];
  
        characterName.textContent = profile.name;
        characterImg.src = profile.img;
        characterInfo.innerHTML = profile.bio;
        
        modal.style.display = "flex";
      });
    });
  
    closeBtn.addEventListener('click', () => {
      modal.style.display = "none";
    });
  
    window.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
      }
    });
  });