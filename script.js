/* =========================================================
   ELEMENTS
========================================================= */

const opening = document.getElementById("opening");
const openInvitation = document.getElementById("openInvitation");
const mainContent = document.getElementById("mainContent");

const music = document.getElementById("weddingMusic");
const musicButton = document.getElementById("musicButton");

const daysElement = document.getElementById("days");
const hoursElement = document.getElementById("hours");
const minutesElement = document.getElementById("minutes");
const secondsElement = document.getElementById("seconds");

const copyAccount = document.getElementById("copyAccount");
const accountNumber = document.getElementById("accountNumber");


/* =========================================================
   OPEN INVITATION
========================================================= */

openInvitation.addEventListener("click", async () => {

    /*
        Browser HP biasanya memblokir autoplay.

        Karena musik dimainkan setelah user menekan tombol,
        browser menganggapnya sebagai user interaction.
    */

    try {

        music.volume = 0.5;

        await music.play();

        musicButton.classList.add("show");
        musicButton.classList.add("playing");

    } catch (error) {

        console.log("Musik belum dapat dimainkan:", error);

        musicButton.classList.add("show");

    }


    opening.classList.add("hide");

    mainContent.classList.add("show");

    document.body.classList.remove("locked");

});


/* =========================================================
   MUSIC BUTTON
========================================================= */

musicButton.addEventListener("click", () => {

    if (music.paused) {

        music.play();

        musicButton.classList.add("playing");

    } else {

        music.pause();

        musicButton.classList.remove("playing");

    }

});


/* =========================================================
   COUNTDOWN
========================================================= */

const weddingDate = new Date(
    "October 20, 2026 08:00:00"
).getTime();


function updateCountdown() {

    const now = new Date().getTime();

    const distance = weddingDate - now;


    if (distance <= 0) {

        daysElement.textContent = "00";
        hoursElement.textContent = "00";
        minutesElement.textContent = "00";
        secondsElement.textContent = "00";

        return;

    }


    const days = Math.floor(
        distance / (1000 * 60 * 60 * 24)
    );

    const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24))
        / (1000 * 60 * 60)
    );

    const minutes = Math.floor(
        (distance % (1000 * 60 * 60))
        / (1000 * 60)
    );

    const seconds = Math.floor(
        (distance % (1000 * 60))
        / 1000
    );


    daysElement.textContent =
        String(days).padStart(2, "0");

    hoursElement.textContent =
        String(hours).padStart(2, "0");

    minutesElement.textContent =
        String(minutes).padStart(2, "0");

    secondsElement.textContent =
        String(seconds).padStart(2, "0");

}


updateCountdown();

setInterval(updateCountdown, 1000);


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements =
    document.querySelectorAll(".reveal");


const revealObserver =
    new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("active");

                }

            });

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach((element) => {

    revealObserver.observe(element);

});


/* =========================================================
   COPY REKENING
========================================================= */

copyAccount.addEventListener("click", async () => {

    const number =
        accountNumber.textContent.trim();


    try {

        await navigator.clipboard.writeText(number);

        copyAccount.textContent =
            "✓ Berhasil Disalin";

        setTimeout(() => {

            copyAccount.textContent =
                "Salin Rekening";

        }, 2000);

    } catch (error) {

        alert(
            "Nomor rekening: " + number
        );

    }

});


/* =========================================================
   PREVENT SCROLL BEFORE OPENING
========================================================= */

document.body.classList.add("locked");


/* =========================================================
   SMOOTH MUSIC EXPERIENCE
========================================================= */

music.addEventListener("ended", () => {

    music.currentTime = 0;

    music.play();

});


/* =========================================================
   TOUCH FEEDBACK
========================================================= */

document.querySelectorAll("button, a").forEach((element) => {

    element.addEventListener(
        "touchstart",
        () => {
            element.style.transform = "scale(0.97)";
        },
        {
            passive: true
        }
    );

    element.addEventListener(
        "touchend",
        () => {
            element.style.transform = "";
        },
        {
            passive: true
        }
    );

});