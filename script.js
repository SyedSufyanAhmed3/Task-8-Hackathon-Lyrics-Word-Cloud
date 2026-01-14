function generateCloud() {
    const artist = document.getElementById("artist").value;
    const song = document.getElementById("song").value;
    const status = document.getElementById("status");
    const img = document.getElementById("result");

    if (!artist || !song) {
        status.innerText = "Please enter artist and song name";
        return;
    }

    status.innerText = "Generating word cloud...";
    img.style.display = "none";

    fetch("/generate", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            artist: artist,
            song: song
        })
    })
    .then(res => {
        if (!res.ok) throw new Error("Lyrics not found");
        return res.json();
    })
    .then(data => {
        img.src = "/static/wordcloud.png?" + new Date().getTime();
        img.style.display = "block";
        status.innerText = "Done ✅";
    })
    .catch(err => {
        status.innerText = "Lyrics not found ❌";
    });
}
