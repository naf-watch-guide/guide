function overlayInit() {
    $("#overlay-yes").on("click", () => {
        iamwatching.progress += 1
        if (iamwatching.links[iamwatching.progress] === "skip") {
            iamwatching.progress += 1
        }
        $("#overlay").removeClass("overlay-visible")
        regenVideos()
        save()

        if (iamwatching.progress !== iamwatching.ending) {
            sound = new Audio(`assets/sound/click.ogg`)
            sound.volume = 0.18
            sound.play()
            if (iamwatching.progress !== 8) {
                sound = new Audio(`assets/sound/levelup.ogg`)
                sound.volume = 0.04
                sound.play()
            }
        } else {
            sound = new Audio(`assets/sound/fallbig.ogg`)
            sound.volume = 0.14
            sound.play()
        }
    })

    $("#intro-yes").on("click", () => {
        $("#intro-yes").addClass("hidden")
        $("#intro-no").addClass("hidden")
        $("#intro-okay").removeClass("hidden")
        $("#intro-explainer").html("I hope you give it a shot, I really love this series. Try watching some of rekrap2's first video!")
        sound = new Audio(`assets/sound/click.ogg`)
        sound.volume = 0.18
        sound.play()
    })

    $("#intro-no").on("click", () => {
        closeOverlay()
        localStorage.setItem("seenintro", true);
    })

    $("#intro-okay").on("click", () => {
        closeOverlay()
        localStorage.setItem("seenintro", true);
    })
}

function closeOverlay() {
    $("#overlay").removeClass("overlay-visible")
    sound = new Audio(`assets/sound/click.ogg`)
    sound.volume = 0.18
    sound.play()
}

function hideAll() {
    $("#intro").addClass("hidden")
    $("#video-popup").addClass("hidden")
    $("#options").addClass("hidden")
}

function showIntro() {
    hideAll()
    $("#overlay").addClass("overlay-visible")
    $("#intro").removeClass("hidden")
    $("#intro-yes").removeClass("hidden")
    $("#intro-no").removeClass("hidden")
    $("#intro-okay").addClass("hidden")
    $("#intro-explainer").html("Hello! Are you new to the series?")
}