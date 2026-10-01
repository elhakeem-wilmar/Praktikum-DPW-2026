// Membaca data dinamis dari Dashboard/localStorage
document.addEventListener("DOMContentLoaded", () => {
  const data = JSON.parse(localStorage.getItem("weddingData"));
  if (!data) return;

  // 1. Update Nama Singkat Pasangan
  document
    .querySelectorAll(
      ".cover-name, .top-name, .story-name, .couple-name, .gallery-name, .wish-couple-name, .thank-right-name",
    )
    .forEach((el) => {
      if (el.classList.contains("cover-name")) {
        el.innerHTML = `<span>${data.groomShort} &</span><span>${data.brideShort}</span>`;
      } else {
        el.innerHTML = `${data.groomShort} &amp;<br>${data.brideShort}`;
      }
    });

  // 2. Update Detail Groom (Fazl)
  const groomTitle = document.querySelector("#page3 .profile-info h1");
  if (groomTitle) groomTitle.innerText = data.groomFull;

  // 3. Update Detail Bride (Nadya)
  const brideTitle = document.querySelector("#page4 .profile-info h1");
  if (brideTitle) brideTitle.innerText = data.brideFull;

  // 4. Update Tanggal Acara
  const dateSpans = document.querySelectorAll(".date-stack span");
  if (dateSpans.length === 3) {
    dateSpans[0].innerText = data.eventDay;
    dateSpans[1].innerText = data.eventMonth;
    dateSpans[2].innerText = data.eventYear;
  }
});

// Menangkap Form Ucapan dari Landing Page & Memasukkan ke Dashboard
const wishForm = document.getElementById("wishForm");
if (wishForm) {
  wishForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("guestName").value;
    const message = document.getElementById("message").value;

    const wishes = JSON.parse(localStorage.getItem("weddingWishes")) || [];
    wishes.unshift({ name, message, time: new Date().toISOString() });
    localStorage.setItem("weddingWishes", JSON.stringify(wishes));

    alert("Terima kasih atas ucapan dan doa retunya!");
    wishForm.reset();
  });
}

document.body.classList.remove("invitation-open");

function openInvitation() {
  document.body.classList.add("invitation-open");
  const music = document.getElementById("music");
  music.play().catch(function (error) {
    console.log(error);
  });
  document.getElementById("page2").scrollIntoView({
    behavior: "smooth",
  });
}

document.getElementById("musicBtn").addEventListener("click", function () {
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

  document.getElementById("hours").textContent = String(hours).padStart(2, "0");

  document.getElementById("minutes").textContent = String(minutes).padStart(
    2,
    "0",
  );

  document.getElementById("seconds").textContent = String(seconds).padStart(
    2,
    "0",
  );
}

updateCountdown();
setInterval(updateCountdown, 1000);
