/* =========================
   MIRA'S BIRTHDAY SITE
   EDIT THE PERSONALIZATION
   SECTION BELOW LATER.
========================= */

const PERSONAL = {
  name: "Mira",
  age: 18,

  // Change this to the actual birthday.
  // JavaScript months: January=0, February=1 ... December=11.
  birthday: new Date(2026, 9, 20, 0, 0, 0),

  opening: "A small digital surprise for someone who deserves a beautiful chapter.",

  letter: `Dear Mira,

Happy 18th birthday. ❤️

I hope this new chapter brings you countless little moments that make you genuinely happy.

Keep reading the stories you love, keep discovering new worlds, keep being wonderfully you, and never forget that the best chapters are often the ones we haven't written yet.

I hope 18 brings you beautiful memories, good people, peaceful days, exciting adventures and, obviously, plenty of dark chocolate.

This is only the beginning of your next chapter.

Happy birthday, Mira. ✨`,

  final: "May Chapter 18 be full of beautiful people, unforgettable memories, peaceful nights, exciting mornings, good books, dark chocolate and countless reasons to smile. ❤️",

  gifts: [
    "Gift 1: One year full of reasons to smile. ✨",
    "Gift 2: A lifetime supply of imaginary dark chocolate. 🍫",
    "Gift 3: And a reminder that someone is very glad you exist. ❤️"
  ]
};


/* ---------- Opening ---------- */

const openingText = document.getElementById("openingText");
let openIndex = 0;

function typeOpening() {
  if (openIndex < PERSONAL.opening.length) {
    openingText.textContent += PERSONAL.opening[openIndex++];
    setTimeout(typeOpening, 45);
  }
}
typeOpening();

document.getElementById("startBtn").addEventListener("click", () => {
  document.getElementById("opening").classList.add("hidden");
  document.getElementById("site").classList.remove("hidden");
  burstConfetti(90);
});


/* ---------- Floating particles ---------- */

const particleBox = document.getElementById("particles");

for (let i = 0; i < 35; i++) {
  const p = document.createElement("i");
  p.className = "particle";
  p.style.left = Math.random() * 100 + "%";
  p.style.animationDelay = Math.random() * 8 + "s";
  p.style.animationDuration = 6 + Math.random() * 8 + "s";
  particleBox.appendChild(p);
}


/* ---------- Smooth navigation ---------- */

document.querySelectorAll("[data-scroll]").forEach(button => {
  button.addEventListener("click", () => {
    document.getElementById(button.dataset.scroll)
      .scrollIntoView({ behavior: "smooth" });
  });
});


/* ---------- Countdown ---------- */

function updateCountdown() {
  const diff = PERSONAL.birthday - new Date();

  if (diff <= 0) {
    ["days", "hours", "minutes", "seconds"].forEach(id => {
      document.getElementById(id).textContent = "00";
    });
    return;
  }

  const days = Math.floor(diff / 86400000);
  const hours = Math.floor(diff / 3600000) % 24;
  const minutes = Math.floor(diff / 60000) % 60;
  const seconds = Math.floor(diff / 1000) % 60;

  document.getElementById("days").textContent = String(days).padStart(2, "0");
  document.getElementById("hours").textContent = String(hours).padStart(2, "0");
  document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
  document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");
}
updateCountdown();
setInterval(updateCountdown, 1000);


/* ---------- Letter ---------- */

const envelope = document.getElementById("envelope");
const letterCard = document.getElementById("letterCard");
const letterElement = document.getElementById("personalLetter");
let letterStarted = false;

envelope.addEventListener("click", () => {
  envelope.classList.add("hidden");
  letterCard.classList.remove("hidden");

  if (!letterStarted) {
    letterStarted = true;
    typeLetter();
  }
});

let letterIndex = 0;

function typeLetter() {
  if (letterIndex < PERSONAL.letter.length) {
    letterElement.textContent += PERSONAL.letter[letterIndex++];
    setTimeout(typeLetter, 18);
  }
}


/* ---------- 18 candles ---------- */

const candleBox = document.getElementById("candles");
let candlesOut = 0;

for (let i = 1; i <= PERSONAL.age; i++) {
  const candle = document.createElement("button");
  candle.className = "candle";
  candle.setAttribute("aria-label", "Candle " + i);

  const flame = document.createElement("span");
  flame.className = "flame";
  candle.appendChild(flame);

  candle.addEventListener("click", () => {
    if (candle.classList.contains("blown")) return;

    candle.classList.add("blown");
    candlesOut++;

    if (candlesOut === PERSONAL.age) {
      document.getElementById("wishMessage").textContent =
        "✨ All 18 candles are out. Make your wish, Mira. ✨";
      burstConfetti(140);
    }
  });

  candleBox.appendChild(candle);
}


/* ---------- Photo placeholders ---------- */

document.querySelectorAll(".photo-card").forEach(card => {
  card.addEventListener("click", () => {
    const filename = card.dataset.photo;
    showToast("Later, add " + filename + " to the website folder.");
  });
});


/*
  When you add photos later, change a card in index.html from:

  <button class="photo-card placeholder" data-photo="photo1.jpg">
    <span>01</span><b>Add photo 1</b>
  </button>

  to:

  <button class="photo-card" data-photo="photo1.jpg">
    <img src="photo1.jpg" alt="Memory 1">
    <span>01</span><b>A caption</b>
  </button>
*/


/* ---------- Gifts ---------- */

document.querySelectorAll(".gift").forEach(gift => {
  gift.addEventListener("click", () => {
    const number = Number(gift.dataset.gift);
    document.getElementById("giftMessage").textContent = PERSONAL.gifts[number];

    if (number === 2) burstConfetti(60);
  });
});


/* ---------- Chocolate secret ---------- */

document.getElementById("chocolateBtn").addEventListener("click", () => {
  document.getElementById("secretMessage").classList.remove("hidden");
  burstConfetti(45);
});


/* ---------- Music ---------- */

const music = document.getElementById("music");
const musicBtn = document.getElementById("musicBtn");

musicBtn.addEventListener("click", async () => {
  try {
    if (music.paused) {
      await music.play();
      musicBtn.textContent = "⏸ Pause";
    } else {
      music.pause();
      musicBtn.textContent = "▶ Play";
    }
  } catch {
    showToast("Add birthday.mp3 to the website folder first.");
  }
});


/* ---------- Final surprise ---------- */

document.getElementById("finalMessage").textContent = PERSONAL.final;

document.getElementById("finalBtn").addEventListener("click", () => {
  burstConfetti(180);
  document.getElementById("finalBtn").textContent = "Happy Birthday, Mira! ❤️";
  showToast("The final chapter begins.");
});


/* ---------- Confetti ---------- */

function burstConfetti(amount = 80) {
  const colors = ["#ff78aa", "#b99cff", "#ffd98a", "#ffffff", "#ffb5d0"];

  for (let i = 0; i < amount; i++) {
    const piece = document.createElement("i");
    piece.className = "confetti";
    piece.style.left = Math.random() * 100 + "vw";
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.animationDelay = Math.random() * .8 + "s";
    piece.style.transform = `rotate(${Math.random() * 360}deg)`;
    document.body.appendChild(piece);

    setTimeout(() => piece.remove(), 3600);
  }
}


/* ---------- Toast ---------- */

let toastTimer;

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("toast-show");

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove("toast-show");
  }, 2800);
}
