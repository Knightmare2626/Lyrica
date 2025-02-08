const apiKey = "Your API key here";

document.getElementById("searchForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const artist = document.querySelector(".artist-name").value.trim();
    const album = document.querySelector(".album-name").value.trim();
    if (!artist || !album) {
        alert("Please enter both artist and album name.");
        return;
    }

    const url = `http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=${apiKey}&artist=${encodeURIComponent(artist)}&album=${encodeURIComponent(album)}&format=json`;

    try {
        const response = await fetch(url);
        const info = await response.json();

        if (info.album.image) {
            const albumTitle = info.album.name;
            const albumImage = info.album.image.find(img => img.size === "extralarge")["#text"] || "/public/images/placeholder.jpg";

            document.querySelector(".album-title").textContent = albumTitle;
            document.querySelector(".album-art").src = albumImage;
        } else {
            alert("Album not found! Check your spelling.");
        }
    } catch (error) {
        console.error("Error fetching album data:", error);
        alert("Error fetching album data. Please try again.");
    }
});
