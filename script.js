document.body.classList.remove("invitation-open");

function openInvitation() {
    document.body.classList.add("invitation-open");
    const music = document.getElementById("music");
    music.play().catch(function(error) {
        console.log(error);
    });
    document.getElementById("page2").scrollIntoView({
        behavior: "smooth"
    });
}

document.getElementById("musicBtn").addEventListener("click", function() {
    const music = document.getElementById("music");
    if (music.paused) {
        music.play();
        this.innerHTML = "♫";
    } else {
        music.pause();
        this.innerHTML = "🔇";
    }
});


const tanggalAcara = new Date("December 31, 2026 19:00:00").getTime();
function updateCountdown() {
    const sekarang = new Date().getTime();
    const selisih = tanggalAcara - sekarang;


    if (selisih <= 0) {
        document.getElementById("hours").textContent = "00";
        document.getElementById("minutes").textContent = "00";
        document.getElementById("seconds").textContent = "00";
        return;
    }

    const hours = Math.floor(selisih / (1000 * 60 * 60));
    const minutes = Math.floor((selisih / (1000 * 60)) % 60);
    const seconds = Math.floor((selisih / 1000) % 60);

    document.getElementById("hours").textContent =
        String(hours).padStart(2, "0");

    document.getElementById("minutes").textContent =
        String(minutes).padStart(2, "0");

    document.getElementById("seconds").textContent =
        String(seconds).padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);