const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');
const startBtn = document.getElementById('start-btn');
const resetBtn = document.getElementById('reset-btn');
const mainCard = document.getElementById('main-card');
const greetingScreen = document.getElementById('greeting-screen');
const celebration = document.getElementById('celebration');
const heartsBg = document.getElementById('hearts-bg');
const interactiveHeart = document.getElementById('interactive-heart');

let yesScale = 1;
let noClickCount = 0;

const phrases = [
    "No",
    "Are you sure?",
    "Really sure?",
    "Think again!",
    "Last chance!",
    "Surely not?",
    "You might regret this!",
    "Give it another thought!",
    "Are you absolutely sure?",
    "This could be a mistake!",
    "Have a heart!",
    "Don't be so cold!",
    "Change of heart?",
    "Wouldn't you reconsider?",
    "Is that your final answer?",
    "You're breaking my heart ;("
];

// Start the experience
startBtn.addEventListener('click', () => {
    greetingScreen.classList.add('hidden');
    mainCard.classList.remove('hidden');
});

// Function to move the "No" button randomly and grow "Yes"
const handleNoClick = () => {
    noClickCount++;
    
    // Change "No" button text
    noBtn.innerText = phrases[Math.min(noClickCount, phrases.length - 1)];
    
    // Make "Yes" button bigger
    yesScale += 0.5;
    yesBtn.style.transform = `scale(${yesScale})`;
    
    // Move "No" button randomly
    const x = Math.random() * (window.innerWidth - noBtn.offsetWidth);
    const y = Math.random() * (window.innerHeight - noBtn.offsetHeight);
    
    noBtn.style.position = 'fixed';
    noBtn.style.left = `${x}px`;
    noBtn.style.top = `${y}px`;
};

noBtn.addEventListener('mouseover', handleNoClick);
noBtn.addEventListener('click', handleNoClick);

// Celebration when "Yes" is clicked
yesBtn.addEventListener('click', () => {
    mainCard.classList.add('hidden');
    celebration.classList.remove('hidden');
    noBtn.style.display = 'none';
    startHearts();
    confetti();
});

// Interactive heart click
interactiveHeart.addEventListener('click', () => {
    const heart = interactiveHeart.querySelector('.heart');
    heart.style.transform = 'rotate(-45deg) scale(1.5)';
    setTimeout(() => {
        heart.style.transform = 'rotate(-45deg) scale(1)';
    }, 200);
    createHeart();
});

// Reset for another try
resetBtn.addEventListener('click', () => {
    location.reload();
});

// Floating hearts background
function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('bg-heart');
    heart.innerHTML = '❤️';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = Math.random() * 2 + 3 + 's';
    heart.style.fontSize = Math.random() * 20 + 10 + 'px';
    
    heartsBg.appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, 5000);
}

function startHearts() {
    setInterval(createHeart, 200);
}

// Simple confetti effect
function confetti() {
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.classList.add('bg-heart');
            heart.innerHTML = ['❤️', '💖', '💝', '💕', '🌸'][Math.floor(Math.random() * 5)];
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.top = '100vh';
            heart.style.fontSize = Math.random() * 30 + 15 + 'px';
            heart.style.animation = `float ${Math.random() * 2 + 2}s linear forwards`;
            heartsBg.appendChild(heart);
        }, i * 50);
    }
}

// Initial subtle hearts
setInterval(createHeart, 1000);
