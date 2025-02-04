// Character Data
const characterData = {
  Vivian: {
    imgSrc: "drive-download-20250109T103339Z-001/InShot_20241227_204156586'.png",
    age: 20,
    height: "5'7\"",
    birthday: "March 14",
    sign: "Pisces",
    job: "Art Student, Deep Space Hunter",
    description: `A young college student in her 20s, she currently an art student and a hunter of deepspace hunter.
          She is known to be associates with Xavier and the others. She met Xavier when she is 18 years old. She knew who he
          is but kept it a secrets for him. She has a bestfriends at Campus, which is sometimes considered as twins due to their blonde hair.
          Vivian and Reila are such a close friendship that sometimes mistaking as twins by the faculty`,
  },
  Flora: {
    imgSrc: "drive-download-20250109T103339Z-001/InShot_20241227_204235740'.png",
    age: 24,
    height: "5'6\"",
    birthday: "July 22",
    sign: "Cancer",
    job: "Medic, Former Deep Space Hunter",
    description: `A childhood to Zayne and Caleb, Flora are from a medic graduate currently working at
          the hospital after resign from deepspace hunter. Owner of Fire evol. Usually help Zayne taking care of 
          his ice evol who went haywire. and when it does, her flames calms his ice. She married to Zayne but some 
          hospital worker sometimes never knew because Zayne rarely show effection infront of them`,
  },
  Reila: {
    imgSrc: "drive-download-20250109T103339Z-001/InShot_20241227_204402751'.png",
    age: 20,
    height: "5'8\"",
    birthday: "November 3",
    sign: "Scorpio",
    job: "Art Student, Deep Space Hunter",
    description: `A friends to Vivian and people mistaking them as twins sometimes due to their friendship and how
          close they are. She also an art student and sometimes asking Rafayel to do her homework with some ideas using her art style.
          She currently a deepspace hunter just like Vivian and the owner of Ice evol. She and Rafayel are in relationship even always 
          bickering like siblings but Thomas told them, a real couple sometimes bickers like siblings is shows how they are not toxic 
          with each other.`,
  },
  Lucina: {
    imgSrc: "drive-download-20250109T103339Z-001/InShot_20250106_094908647'.png",
    age: 18,
    height: "5'5\"",
    birthday: "January 10",
    sign: "Capricorn",
    job: "Magical Prodigy, Student Leader",
    description: `A calm girl at the age of 18. She along with Sylus lead Onychinus together. after Sylus finds her as a child, 
          Sylus took her in and vowed to raise her. In the end, they were meanr for each other and since Lucina's evol are the same as Sylus,
          he teach her how to use and control. At first, it was an unbelievable love story, knowing Lucina and Sylus has 10 years age gap, but 
          in the end, they manage to fake her id's but only Sylus knows. Sylus sent her to Linkon for school and for a better enviroment for her to
          grow up, so she knew what is like to feel sunlight`,
  },
  Clara: {
    imgSrc: "assets/placeholder.png",
    age: 17,
    height: "5'4\"",
    birthday: "May 18",
    sign: "Taurus",
    job: "High School Student",
    description: `Clara is the youngest of the group and a visionary artist. Known for her creativity and optimism, she shares a close bond with Flora and Caleb, bringing youthful energy to the group.`,
  },
};

function showPopup(name) {
  const popup = document.getElementById('popup');
  const popupImage = document.getElementById('popup-image');
  const popupTitle = document.getElementById('popup-title');
  const popupDetails = document.getElementById('popup-details');

  const character = characterData[name];

  if (character) {
    popupImage.src = character.imgSrc;
    popupTitle.textContent = name;

    popupDetails.innerHTML = `
      <p><strong>Age:</strong> ${character.age}</p>
      <p><strong>Height:</strong> ${character.height}</p>
      <p><strong>Birthday:</strong> ${character.birthday}</p>
      <p><strong>Sign:</strong> ${character.sign}</p>
      <p><strong>Job:</strong> ${character.job}</p>
      <p>${character.description}</p>
    `;

    popup.classList.remove('hidden');
  }
}

function closePopup() {
  const popup = document.getElementById('popup');
  popup.classList.add('hidden');
}
