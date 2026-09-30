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
