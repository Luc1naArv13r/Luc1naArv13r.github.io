// Dorm data with characters
const dormData = {
    heartslabyul: [
        { name: "Riddle Rosehearts", img: "Img/riddle.png", bio: "Leader of Heartslabyul dorm." },
        { name: "Ace Trappola", img: "Img/ace.png", bio: "A mischievous first-year student." },
        { name: "Deuce Spade", img: "Img/deuce.png", bio: "An earnest first-year student." },
        { name: "Trey Clover", img: "Img/trey.png", bio: "A second-year with a calm demeanor." },
        { name: "Cater Diamond", img: "Img/cater.png", bio: "A second-year and a social media enthusiast." }
    ],
    savanaclaw: [
        { name: "Leona Kingscholar", img: "Img/leona.png", bio: "King of the savanna, dorm leader." },
        { name: "Ruggie Bucchi", img: "Img/ruggie.png", bio: "A sly fox and a hard worker." },
        { name: "Jack Howl", img: "Img/jack.png", bio: "A serious and dependable wolf." }
    ],
    octavinelle: [
        { name: "Azul Ashengrotto", img: "Img/azul.png", bio: "A business-savvy octopus." },
        { name: "Jade Leech", img: "Img/jade.png", bio: "Azul's calm and composed right-hand man." },
        { name: "Floyd Leech", img: "Img/floyd.png", bio: "Azul's energetic and unpredictable twin brother." }
    ]
};

// Select dorm to view characters
function selectDorm(dorm) {
    const characters = dormData[dorm];
    const container = document.getElementById("characters-container");
    container.innerHTML = ""; // Clear existing content

    characters.forEach(character => {
        const card = document.createElement("div");
        card.className = "character-card";
        card.innerHTML = `
            <img src="${character.img}" alt="${character.name}">
            <h3>${character.name}</h3>
            <p>${character.bio}</p>
        `;
        container.appendChild(card);
    });

    // Show character selection
    document.getElementById("character-selection").classList.remove("hidden");
    document.querySelector(".dorm-container").classList.add("hidden");
}

// Go back to dorm selection
function goBack() {
    document.querySelector(".dorm-container").classList.remove("hidden");
    document.getElementById("character-selection").classList.add("hidden");
}