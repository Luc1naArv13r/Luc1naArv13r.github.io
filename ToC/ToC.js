document.addEventListener("DOMContentLoaded", () => {
  const characters = document.querySelectorAll('.character');
  const modal = document.getElementById('character-popup');
  const closeBtn = document.querySelector('.close');
  const characterName = document.getElementById('character-name');
  const characterImg = document.getElementById('character-img-popup');
  const characterInfo = document.getElementById('character-info');
  

  const characterProfiles = {
    1: {
      name: "Reila",
      img: "IMG_3901.jpeg",
      bio: `
        <strong>Full name:</strong> Reila Arvier<br>
        <strong>Age:</strong> 18<br>
        <strong>Height:</strong> 150 cm<br>
        <strong>Gender:</strong> Female<br>
        <strong>Race:</strong> Human<br><br>

        <strong>Features:</strong><br>
        <strong>Eye Color:</strong> Crystal Blue-Purple eyes<br>
        <strong>Ability:</strong> Able to wield Magic<br>
        <strong>Weapon of Choice:</strong> Twin Dagger<br>
        <strong>Other features:</strong> Blonde hair, pale skin, plump lips <br><br>

        Once a shy and weak girl but as an Arvier family who is a long line of knighthood blood, she was trained to wield a weapon at young age.<br><br>

        Reila is known to be motherly and nurturing since she had to raise her younger siblings, Ren and Rena. She loves children and since her parents death and her 
        older brother sudden dissappearance, Reila took upon herself being a mother figure to the twins.<br><br>

        While to Aaron, Reila is more than just a mother but she is someone he cared about. Reila treated him like a married couple and she did love him for long time since Lucid 
        were a friend to Aaron. But not going to ruin their friendship, she kept it silent.`
    },
    2: {
      name: "Aaron",
      img: "IMG_3900.jpeg",
      bio: `
        <strong>Full name:</strong> Aaron Grey<br>
        <strong>Age:</strong> 23<br>
        <strong>Height:</strong> 200 cm<br>
        <strong>Gender:</strong> Male<br>
        <strong>Race:</strong> Human<br><br>

        <strong>Features:</strong><br>
        <strong>Eye Color:</strong> Diamond eyes<br>
        <strong>Ability:</strong> Able to wield Light Magic<br>
        <strong>Weapon of Choice:</strong> Sword<br>
        <strong>Other features:</strong> Long White hair, light skinned, well built and strong
        <br>
        <br>
      

        The adopted son of Grey Family and the brother to Kieran Grey. He always questioned who he actually is since he had a diamond eyes and
        being the odd ones in the capital but his parents didn’t mind at all.<br><br>
        He is close to the Arvier family since he felt similar because the Arvier Family knowns for their Blue-purple crystal eyes.
         He cared for Ren and Rena since befriending the oldest Arvier. And to him, Reila is something special and the Arvier twins 
         felt like a children of his own. And he also promise to Lucid if anything happen to him, 
        Aaron had to take care of the rest of the Arvier.<br><br>
        
        Every time he had time, he will had breakfast/lunch/ dinner with the Arvier family, sometimes
        even stays there and sleep on the living room  couch.
      `
    },
    3: {
      name: "Kieran",
      img: "Kieran Grey.jpeg",
      bio:`
      <strong>Full name:</strong> Kieran Grey <br>
      <strong>Age:</strong> 23<br>
      <strong>Height:</strong> 200 cm<br>
      <strong>Gender:</strong> Male<br>
      <strong>Race:</strong> Human<br><br>

      <strong>Features:</strong><br>
      <strong>Eye Color:</strong> Gray eyes<br>
      <strong>Ability:</strong> -<br>
      <strong>Weapon of Choice:</strong> Sword<br>
      <strong>Other features:</strong> Slight long black hair, light skin, well built body
      <br>
      <br>
    

The son of the Grey family and had an adopted brother, Aaron. He is much more playful and can be more serious when needed. 
Kieran always teasing Aaron between the relationship of him and Reila.<br><br>

He always accept Aaron despite having a diamond eyes alone. He is also proud of Aaron for able to become the Captain of Knight. 
Till this day, he help Aaron find his origin as a friend and as a brother.<br><br>

Even after the whole teasing between Aaron and Reila, In the end, he fall easily for a street singer in Garnetia City. 
And not took too long for being together.<br><br>

He once called a womanizer even though he never play with woman and always respect woman.`
    },
    4: {
      name: "Serena",
      img: "IMG_3904.jpeg",
      bio:`
      <strong>Full name:</strong> Serena Melody <br>
      <strong>Age:</strong> 20<br>
      <strong>Height:</strong> 160 cm<br>
      <strong>Gender:</strong> Female<br>
      <strong>Race:</strong> Human<br><br>

      <strong>Features:</strong><br>
      <strong>Eye Color:</strong> Gray eyes<br>
      <strong>Ability:</strong> -<br>
      <strong>Weapon of Choice:</strong> Sword<br>
      <strong>Other features:</strong> Slight long black hair, light skin, well built body
      <br>
      <br>
      
      An orphan as a baby, Serena grow up in the orphanage and become a famous street singer. <br><br>
      
      Each time she earns money, she donate some to the orphanage she raised in. She eventually like a 
      mother for the orphanage. Yet among those eyes in Garnetia City, she had Amethyst eyes.<br><br>
      
      However the moment she met Kieran, she instantly fell for him. But keep hold her feeling back knowing 
      if she with someone, she had to leave the orphanage.<br><br>

      She even keep having a question to the former ‘mother’ of the orphanage and keep asking where did she was
      founded so she could trace who she was. Since she had Amethyst eyes.`
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
    });
  });

  closeBtn.addEventListener('click', () => {
    modal.style.display = "none";
  });

  window.addEventListener('click', (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
});