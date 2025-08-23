function resetProgress() {
    linkparams.links.forEach(element => {
        localStorage.setItem(element.username + linkparams.season, 0);
        element.progress = 0
    });

    regenVideos()
}

function swap() {
    save()
    $("#options-swap").html(`Swap to Season ${linkparams.season}`)
    linkparams.season = linkparams.season === 1 ? 2 : 1
    $("#subtitle").html(`The Season ${linkparams.season} Watch Tracker`)
    load()
    
    regenNames()
    chooseRandom()
    regenVideos()
}

function save() {
    linkparams.links.forEach(element => {
        localStorage.setItem(element.username + linkparams.season, element.progress);
    });
}

function load() {
    linkparams.links.forEach(element => {
        element.progress = localStorage.getItem(element.username + linkparams.season) ?? 0;
        element.progress = Number(element.progress)
    });

    seenintro = Boolean(localStorage.getItem("seenintro", true)) ?? false
}