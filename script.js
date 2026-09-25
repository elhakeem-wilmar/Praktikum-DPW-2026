/* ==================================================
   MEMBUKA UNDANGAN
================================================== */

const openInvitation = document.getElementById("openInvitation");
const cover = document.getElementById("cover");
const mainWebsite = document.getElementById("mainWebsite");
const musicButton = document.getElementById("musicButton");

const backgroundMusic = document.getElementById("backgroundMusic");


openInvitation.addEventListener("click", function () {

    cover.style.opacity = "0";

    setTimeout(function () {

        cover.style.display = "none";

        mainWebsite.style.display = "block";

        musicButton.style.display = "block";

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }, 700);


    /* Memulai musik */

    backgroundMusic.play().catch(function () {
        console.log("Musik membutuhkan izin browser.");
    });

});


/* ==================================================
   TOMBOL MUSIK
================================================== */

musicButton.addEventListener("click", function () {

    if (backgroundMusic.paused) {

        backgroundMusic.play();

        musicButton.innerHTML = "♫";

    } else {

        backgroundMusic.pause();

        musicButton.innerHTML = "🔇";

    }

});


/* ==================================================
   COUNTDOWN
================================================== */

/*
   Tanggal acara:
   30 Desember 2026
*/

const weddingDate = new Date("December 30, 2026 00:00:00").getTime();


function updateCountdown() {

    const now = new Date().getTime();

    const distance = weddingDate - now;


    /* Jika tanggal sudah lewat */

    if (distance < 0) {

        document.getElementById("days").innerHTML = "0";
        document.getElementById("hours").innerHTML = "0";
        document.getElementById("minutes").innerHTML = "0";
        document.getElementById("seconds").innerHTML = "0";

        return;
    }


    /* Perhitungan */

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


    /* Menampilkan */

    document.getElementById("days").innerHTML = days;

    document.getElementById("hours").innerHTML = hours;

    document.getElementById("minutes").innerHTML = minutes;

    document.getElementById("seconds").innerHTML = seconds;

}


/* Jalankan countdown */

updateCountdown();

setInterval(updateCountdown, 1000);


/* ==================================================
   SIMPAN KALENDER
================================================== */

const calendarButton = document.getElementById("calendarButton");
const calendarButton2 = document.getElementById("calendarButton2");


function saveCalendar() {

    /*
       Format tanggal untuk file kalender
    */

    const calendarData =
`BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:Wedding Hadi & Claud
DTSTART:20261230T080000
DTEND:20261230T160000
LOCATION:Bekasi
DESCRIPTION:Undangan Pernikahan Hadi & Claud
END:VEVENT
END:VCALENDAR`;


    const blob = new Blob(
        [calendarData],
        {
            type: "text/calendar"
        }
    );


    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    link.download = "Wedding-Hadi-Claud.ics";

    link.click();

    URL.revokeObjectURL(url);

}


/* Tombol kalender pertama */

calendarButton.addEventListener(
    "click",
    saveCalendar
);


/* Tombol kalender kedua */

calendarButton2.addEventListener(
    "click",
    saveCalendar
);