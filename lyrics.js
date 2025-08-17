let currentLyrics = [];
let lyricIndex = 0;

function parseTime(timeString) {
    const parts = timeString.split(':');        // ["MM", "SS.xx"]
    return parseInt(parts[0], 10) * 60 + parseFloat(parts[1]);
}

function loadLyrics(songFileName) {
    const lyricsDiv = document.getElementById("lyrics");
    const header = lyricsDiv.querySelector("h3"); // keep the header
    lyricsDiv.innerHTML = "";                     // clear previous lines
    lyricsDiv.appendChild(header);                // re-add the header

    fetch(`lyrics/${songFileName}.json`)
        .then(response => {
            if (!response.ok) throw new Error("Lyrics file not found");
            return response.json();
        })
        .then(data => {
            currentLyrics = data.map(item => ({
                line: item.line,
                time: parseTime(item.time)  // convert "MM:SS.xx" to seconds
            }));
            lyricIndex = 0;
            displayLyrics();
        })
        .catch(err => {
            console.error("Could not load lyrics:", err);
            const p = document.createElement("p");
            p.textContent = "No lyrics available for this song!";
            lyricsDiv.appendChild(p);
            currentLyrics = [];
        });
}



function displayLyrics() {
    const lyricsDiv = document.getElementById("lyrics");

    // Keep the h3, remove old lyrics
    Array.from(lyricsDiv.querySelectorAll("p")).forEach(p => p.remove());

    currentLyrics.forEach(item => {
        const p = document.createElement("p");
        p.textContent = item.line;
        lyricsDiv.appendChild(p);
    });
}



audioPlayer.addEventListener("timeupdate", () => {
    if (!currentLyrics.length) return;

    const lines = document.getElementById("lyrics").querySelectorAll("p");

    const currentTime = audioPlayer.currentTime;
    for (let i = 0; i < currentLyrics.length; i++) {
        if (currentTime >= currentLyrics[i].time) {
            lines[i].style.color = "yellow";   // highlight current line
            if (i > 0) lines[i-1].style.color = "white";
        }
    }
});
