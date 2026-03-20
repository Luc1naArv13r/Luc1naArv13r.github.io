// --- 1. GLOBAL STATE & CONFIG ---
let charAnimationTimer = null;
const charList = ["riddle","ace","deuce","cater","trey", "leona","jack","ruggie", "azul","jade","floyd", "kalim","jamil", "vil",
    "epel","rook", "idia","ortho", "malleus", "silver", "sebek", "lilia"];
let activeChar = localStorage.getItem('activeChar') || "riddle";
let currentCharIndex = charList.indexOf(activeChar);
let cameraStream = null;
let currentAnimIndex = 0;

// Music Data
const myPlaylist = [
    { title: "Piece of my world - Night Ravens", file: "Piece of my world - Night Ravens.mp3"},
    { title: "Obedience", file: "Twisted Wonderland Heartslabyul Obedience PV with English Subs - aitaikimochi (1080p, h264).mp3"},
    { title: "Diadem", file: "Twisted Wonderland Savanaclaw Diadem PV with English Subs - aitaikimochi (1080p, h264).mp3"},
    { title: "Entanglement", file: "Twisted Wonderland Octavinelle Entanglement PV with English Subs - aitaikimochi (1080p, h264).mp3"},
    { title: "Far-Out", file: "Twisted Wonderland Scarabia “Far-Out” PV with English Subs - aitaikimochi (1080p, h264).mp3"},
    { title: "La Volonte", file: "Twisted Wonderland Pomefiore La Volonte PV with English Subs - aitaikimochi (1080p, h264).mp3"},
    { title: "Unrivaled Aeons Character Son", file: "Twisted Wonderland Ignihyde Unrivaled Aeons Character Son with English Subs - aitaikimochi (1080p, h264).mp3"},
    { title: "恣意天変", file: "Twisted Wonderland Diasomnia 恣意天変 PV with English Subs - aitaikimochi (1080p, h264).mp3"},
    { title: "RED HEART RAGE", file: "RED HEART RAGE.mp3"},
    { title: "Still Infallible, Until Tangible", file: "Still Infallible, Until Tangible.mp3"},
    { title: "Abyss", file: "Abyss.mp3"},
    { title: "The Snake and Blink", file: "The Snake and Blink.mp3"},
    { title: "crépuscule", file: "crépuscule.mp3"},
    { title: "ggwp", file: "ggwp.mp3"},
    { title: "祝福", file: "祝福.mp3"},
];
let currentSongIndex = 0;
let currentAudio = new Audio();

// Video Data
const videoPlaylist = [
    "assets/TWISTED WONDERLAND  OPENING GAME-SIZE  4K REMASTER - TWISTED WONDERLAND 4K REMASTER (1080p, h264).mp4",
    "assets/Piece of my world (The Animation ver) (From Disney Twisted-Wonderland The Animation_ツイステ) - HollywoodRecordsVEVO (1080p, h264).mp4",
    "assets/Twisted Wonderland Heartslabyul Obedience PV with English Subs - aitaikimochi (1080p, h264).mp4",
    "assets/Twisted Wonderland Savanaclaw Diadem PV with English Subs - aitaikimochi (1080p, h264).mp4",
    "assets/Twisted Wonderland Octavinelle Entanglement PV with English Subs - aitaikimochi (1080p, h264).mp4",
    "assets/Twisted Wonderland Scarabia “Far-Out” PV with English Subs - aitaikimochi (1080p, h264).mp4",
    "assets/Twisted Wonderland Pomefiore La Volonte PV with English Subs - aitaikimochi (1080p, h264).mp4",
    "assets/Twisted Wonderland Ignihyde Unrivaled Aeons Character Son with English Subs - aitaikimochi (1080p, h264).mp4",
    "assets/Twisted Wonderland Diasomnia 恣意天変 PV with English Subs - aitaikimochi (1080p, h264).mp4",
    "assets/MV 【RED HEART RAGE】Riddle Rosehearts Overblot Song「ツイステ」リドル・ローズハート (ENG Subs) - Koebichanx (1080p, h264).mp4",
    "assets/MV 【Still Infallible, Until Tangible] Leona Kingscholar Overblot Song「ツイステ」レオナキングスカラー (ENG Subs) - Koebichanx (1080p, h264).mp4",
    "assets/MV 「Abyss」Azul Ashengrotto Overblot Song 「ツイステ」アズール・アーシェングロット【アビス】(ENG Subs) - Koebichanx (720p, h264).mp4",
    "assets/「The Snake and Blink」Jamil Viper Overblot Songジャミル・バイパー【蛇と瞬き】(ENG Subs) - Koebichanx (720p, h264).mp4",
    "assets/MV [crépuscule] Vil Schoenheit Overblot Song「ツイステ」ヴィル・シェーンハイト (ENG subs) - Koebichanx (720p, h264).mp4",
    "assets/MV 「ggwp」 Idia Shroud Overblot Song 「ツイステ」イデア・シュラウド (ENG Subs) - Koebichanx (720p, h264).mp4",
    "assets/MV 【祝福】 (Blessing) Malleus Draconia Overblot Song 「ツイステ」マレウス・ドラコニア (ENG Subs) - Koebichanx (1080p, h264).mp4"
];
let vidIdx = 0;

// --- 2. MASTER NAVIGATION ---
function showTab(tabName) {
    const views = document.querySelectorAll('.view');
    views.forEach(v => v.classList.remove('active'));

    const activeView = document.getElementById('view-' + tabName);
    if (activeView) activeView.classList.add('active');

    // Tab Logic: Camera
    if (tabName === 'camera') startCamera();
    else stopCamera();

    // Tab Logic: Video (Pause if not on video tab)
    const vPlayer = document.getElementById('video-player');
    if (vPlayer) {
        if (tabName === 'video') vPlayer.play();
        else vPlayer.pause();
    }

    // Tab Logic: Tetris
    if (tabName === 'tetris') startTetris(); 
}

// --- 3. CLOCK & PERIOD ---
function updateClock() {
    const now = new Date();
    const hours = now.getHours();
    
    const timeDisplay = document.getElementById('time-display');
    if(timeDisplay) {
        timeDisplay.innerText = now.toLocaleTimeString('en-GB', { 
            hour: '2-digit', minute: '2-digit', hour12: false 
        }).replace(':', '.');
    }

    let period = "Night";
    if (hours >= 5 && hours < 12) period = "Morning";
    else if (hours >= 12 && hours < 17) period = "Afternoon";
    else if (hours >= 17 && hours < 21) period = "Evening";
    
    const dayPeriod = document.getElementById('day-period');
    if(dayPeriod) dayPeriod.innerText = period;

    const dateDisplay = document.getElementById('date-display');
    if(dateDisplay) {
        dateDisplay.innerText = now.toLocaleDateString('en-GB', {
            weekday: 'short', day: '2-digit', month: '2-digit', year: 'numeric'
        });
    }
}

// --- 4. CHARACTER LOGIC ---
function changeCharSelection(direction) {
    currentCharIndex = (currentCharIndex + direction + charList.length) % charList.length;
    updateCharPreview();
}

function updateCharPreview() {
    const previewImg = document.getElementById('preview-img');
    if (previewImg) previewImg.src = `assets/${charList[currentCharIndex]}_icon.png`;
}

function confirmCharacter() {
    activeChar = charList[currentCharIndex];
    localStorage.setItem('activeChar', activeChar);
    currentAnimIndex = 0; 
    if (charAnimationTimer) clearTimeout(charAnimationTimer); 
    showTab('home'); 
    updateCharacterSprite(); 
}

function updateCharacterSprite() {
    const charImg = document.getElementById('main-character');
    if (!charImg) return;
    if (charAnimationTimer) clearTimeout(charAnimationTimer);


    const sequence = [
        { name: 'walk_left',  move: 'walk-left' },
        { name: 'idle_left',  move: 'stay-left' },
        { name: 'walk_right', move: 'walk-right' },
        { name: 'idle_right', move: 'stay-right' }
    ];

    const current = sequence[currentAnimIndex];
    charImg.src = `assets/${activeChar}_${current.name}.gif`;
    charImg.className = 'character-sprite ' + current.move;

    currentAnimIndex = (currentAnimIndex + 1) % sequence.length;
    charAnimationTimer = setTimeout(updateCharacterSprite, 4000); 
}

// --- 5. MUSIC PLAYER ---
function loadPlaylistUI() {
    const listContainer = document.getElementById('playlist-list');
    if (!listContainer) return;
    listContainer.innerHTML = ""; 

    myPlaylist.forEach((song, index) => {
        const item = document.createElement('div');
        item.className = "playlist-item";
        item.innerText = `${index + 1}. ${song.title}`;
        item.onclick = () => playSongAtIndex(index);
        listContainer.appendChild(item);
    });
}

function playSongAtIndex(index) {
    currentSongIndex = index;
    const song = myPlaylist[index];
    currentAudio.src = `assets/${song.file}`;
    currentAudio.play();

    if (document.getElementById('track-name')) document.getElementById('track-name').innerText = song.title;
    if (document.getElementById('now-playing-img')) document.getElementById('now-playing-img').src = `assets/${song.img}`;
}

function togglePlay() {
    if (currentAudio.paused) currentAudio.play();
    else currentAudio.pause();
}

function nextTrack() {
    currentSongIndex = (currentSongIndex + 1) % myPlaylist.length;
    playSongAtIndex(currentSongIndex);
}

function prevTrack() {
    currentSongIndex = (currentSongIndex - 1 + myPlaylist.length) % myPlaylist.length;
    playSongAtIndex(currentSongIndex);
}

currentAudio.ontimeupdate = () => {
    const progressBar = document.getElementById('progress-bar');
    if (progressBar && currentAudio.duration) {
        progressBar.value = (currentAudio.currentTime / currentAudio.duration) * 100;
    }
};

function seekAudio(value) {
    currentAudio.currentTime = (value / 100) * currentAudio.duration;
}

// --- 6. CAMERA & VIDEO ---
async function startCamera() {
    if (cameraStream) return;
    const v = document.getElementById('webcam');
    try {
        cameraStream = await navigator.mediaDevices.getUserMedia({ video: true });
        v.srcObject = cameraStream;
    } catch (e) { console.error(e); }
}

function stopCamera() {
    if (cameraStream) {
        cameraStream.getTracks().forEach(t => t.stop());
        cameraStream = null;
    }
}

function initVideoPlaylist() {
    const player = document.getElementById('video-player');
    if (!player) return;
    player.src = videoPlaylist[vidIdx];
    player.onended = () => {
        vidIdx = (vidIdx + 1) % videoPlaylist.length;
        player.src = videoPlaylist[vidIdx];
        player.play();
    };
}

// --- 7. TETRIS ENGINE ---
let tetrisStarted = false;
const colors = [null, '#FF0D72', '#0DC2FF', '#0DFF72', '#F538FF', '#FF8E0D', '#FFE138', '#3877FF'];
let arena = createMatrix(12, 20);
let playerObj = { pos: {x: 0, y: 0}, matrix: null, score: 0 };

function createMatrix(w, h) {
    const m = [];
    while (h--) m.push(new Array(w).fill(0));
    return m;
}

function startTetris() {
    if (tetrisStarted) return;
    tetrisStarted = true;
    playerReset();
    updateTetris();
}

function playerReset() {
    const pieces = 'TJLOSZI';
    playerObj.matrix = createPiece(pieces[pieces.length * Math.random() | 0]);
    playerObj.pos.y = 0;
    playerObj.pos.x = 5;
}

function createPiece(t) {
    if (t === 'T') return [[0,7,0],[7,7,7],[0,0,0]];
    if (t === 'O') return [[4,4],[4,4]];
    return [[1,1,1],[0,1,0],[0,0,0]]; // Default
}

function updateTetris(time = 0) {
    drawTetris();
    if (tetrisStarted) requestAnimationFrame(updateTetris);
}

function drawTetris() {
    const canv = document.getElementById('tetris-canvas');
    if (!canv) return;
    const ctx = canv.getContext('2d');
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canv.width, canv.height);
}

// --- 8. INITIALIZE ---
window.onload = () => {
    setInterval(updateClock, 1000);
    updateClock();
    updateCharacterSprite();
    loadPlaylistUI();
    initVideoPlaylist();
    updateCharPreview();

    const noteArea = document.getElementById('note-pad');
    if (noteArea) {
        noteArea.value = localStorage.getItem('userNotes') || "";
        noteArea.oninput = () => localStorage.setItem('userNotes', noteArea.value);
    }
};