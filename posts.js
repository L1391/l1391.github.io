const postTitles = [
    "hdiiwmf ~ socializing in college",
    "praise and blame",
    "on comparison",
    "what is wasted?",
    "",
];

    let explorationsContent = document.getElementById("explorations").getElementsByClassName("content")[0];

    for (const title of postTitles) {
        let postEl = document.createElement("p");
        postEl.className = "exploration-link";
        postEl.innerText = title;
        postEl.onclick = () => {
            let url = "explorations/index.html?"  + "title=" + title;
            window.open(url);
        };

        explorationsContent.append(postEl);
    }


