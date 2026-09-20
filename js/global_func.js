function resetProgress() {
    linkparams.links.forEach(element => {
        localStorage.setItem(element.username + linkparams.season, 0);
        element.progress = 0
    });

    regenVideos()
}

function swap(button_num) {
    save()

    linkparams.season = button_num === 1 ? (linkparams.season === 1 ? 2 : 1) : (linkparams.season === 3 ? 2 : 3)
    
    const first_season = linkparams.season === 1 ? 2 : 1
    const second_season = linkparams.season === 3 ? 2 : 3

    $("#options-swap-1").html(`<div class="sub-button">Swap to Season ${first_season}</div>`)
    $("#swap-text-1").html(`See the Season ${first_season} tracker.`)
    $("#options-swap-2").html(`<div class="sub-button">Swap to Season ${second_season}</div>`)
    $("#swap-text-2").html(`See the Season ${second_season} tracker.`)

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