/* =========================================
   BIRTHDAY WEBSITE JAVASCRIPT
========================================= */


/* ================= OPENING TYPEWRITER ================= */

const typingText =
    "Someone made something special for you...";

let typingIndex = 0;

function typeOpeningText() {

    if (typingIndex < typingText.length) {

        document.getElementById("typingText").textContent +=
            typingText.charAt(typingIndex);

        typingIndex++;

        setTimeout(typeOpeningText, 60);
    }
}

typeOpeningText();


/* ================= START EXPERIENCE ================= */

document.getElementById("startBtn").addEventListener(
    "click",
    function () {

        document.getElementById("opening").style.display = "none";

        document.getElementById("mainContent")
            .classList.remove("hidden");

        launchConfetti();

        document.getElementById("mainContent")
            .scrollIntoView();

    }
);


/* ================= SCROLL ================= */

function scrollToSection(id) {

    document.getElementById(id)
        .scrollIntoView({
            behavior: "smooth"
        });
}


/* ================= LETTER TYPEWRITER ================= */

const letter = `
Today isn't just another day.

It's a reminder of how special you are
and how many beautiful moments are still
waiting for you.

I hope this new year of your life brings
you happiness, peace, laughter and
everything your heart wishes for.

Keep smiling.

Keep dreaming.

And never forget how loved you are. ❤️
`;

let letterIndex = 0;
let letterStarted = false;

function typeLetter() {

    if (letterIndex < letter.length) {

        document.getElementById("letterText")
            .textContent += letter.charAt(letterIndex);

        letterIndex++;

        setTimeout(typeLetter, 35);

    }
}


/* Start letter when user scrolls near it */

const letterObserver = new IntersectionObserver(
    function(entries) {

        if (entries[0].isIntersecting &&
            !letterStarted) {

            letterStarted = true;

            typeLetter();
        }

    },
    {
        threshold: .3
    }
);

letterObserver.observe(
    document.getElementById("letter")
);


/* ================= COUNTDOWN ================= */


/*
    CHANGE THIS DATE.

    Format:

    Year, Month-1, Day, Hour, Minute

    Example:
    December 25 2026 00:00

    Month starts from 0 in JavaScript.

    January = 0
    February = 1
    ...
    December = 11
*/

const birthdayDate =
    new Date(2026, 11, 25, 0, 0, 0);


function updateCountdown() {

    const now = new Date();

    const difference =
        birthdayDate - now;

    if (difference <= 0) {

        document.getElementById("days").textContent = "00";
        document.getElementById("hours").textContent = "00";
        document.getElementById("minutes").textContent = "00";
        document.getElementById("seconds").textContent = "00";

        return;
    }

    const days =
        Math.floor(
            difference / (1000 * 60 * 60 * 24)
        );

    const hours =
        Math.floor(
            (difference / (1000 * 60 * 60)) % 24
        );

    const minutes =
        Math.floor(
            (difference / (1000 * 60)) % 60
        );

    const seconds =
        Math.floor(
            (difference / 1000) % 60
        );


    document.getElementById("days")
        .textContent = String(days).padStart(2, "0");

    document.getElementById("hours")
        .textContent = String(hours).padStart(2, "0");

    document.getElementById("minutes")
        .textContent = String(minutes).padStart(2, "0");

    document.getElementById("seconds")
        .textContent = String(seconds).padStart(2, "0");
}

setInterval(updateCountdown, 1000);

updateCountdown();


/* ================= CAKE ================= */

let blownCandles = 0;

function blowCandle(candle) {

    if (candle.classList.contains("blown")) {
        return;
    }

    candle.classList.add("blown");

    blownCandles++;

    if (blownCandles === 3) {

        document.getElementById("wishMessage")
            .textContent =
            "✨ Make your wish! ✨";

        launchConfetti();
    }
}


/* ================= GIFTS ================= */

function openGift(number) {

    const message =
        document.getElementById("giftMessage");

    if (number === 1) {

        message.textContent =
            "💌 Your first gift: A beautiful memory.";

    }

    if (number === 2) {

        message.textContent =
            "✨ Your second gift: A year full of happiness.";

    }

    if (number === 3) {

        message.textContent =
            "❤️ Your final gift: You are deeply loved.";

        launchConfetti();
    }
}


/* ================= MUSIC ================= */

const music =
    document.getElementById("birthdayMusic");

const musicButton =
    document.getElementById("musicButton");

function toggleMusic() {

    if (music.paused) {

        music.play();

        musicButton.textContent =
            "⏸ Pause Music";

    } else {

        music.pause();

        musicButton.textContent =
            "▶ Play Music";
    }
}


/* ================= CONFETTI ================= */

function launchConfetti() {

    const container =
        document.getElementById("confetti");

    const colors = [
        "#ff4d8d",
        "#ffd166",
        "#06d6a0",
        "#4cc9f0",
        "#ffffff",
        "#c77dff"
    ];


    for (let i = 0; i < 80; i++) {

        const piece =
            document.createElement("div");

        piece.className =
            "confetti-piece";

        piece.style.left =
            Math.random() * 100 + "%";

        piece.style.backgroundColor =
            colors[
                Math.floor(
                    Math.random() * colors.length
                )
            ];

        piece.style.animationDelay =
            Math.random() * 1.5 + "s";

        piece.style.transform =
            `rotate(${Math.random() * 360}deg)`;

        container.appendChild(piece);


        setTimeout(
            () => piece.remove(),
            4500
        );
    }
}


/* ================= FINAL SURPRISE ================= */

function finalSurprise() {

    launchConfetti();

    const final =
        document.querySelector(".final-section");

    final.style.background =
        "radial-gradient(circle, #ff2d75, #35002f 70%)";

    document.querySelector(
        ".final-content h2"
    ).textContent =
        "🎉 HAPPY BIRTHDAY! 🎉";

    document.querySelector(
        ".final-content p"
    ).textContent =
        "May your life be filled with beautiful moments, amazing memories and endless reasons to smile. ❤️";

    document.querySelector(
        ".final-content button"
    ).textContent =
        "🎂 Have The Best Birthday!";
}


/* ================= RANDOM CONFETTI ================= */


/*
    Small surprise when the user
    taps anywhere on the final section.
*/

document
    .querySelector(".final-section")
    .addEventListener(
        "click",
        function(event) {

            if (event.target.tagName === "BUTTON") {
                return;
            }

            launchConfetti();
        }
    );
