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

    $("#overlay-no").on("click", () => {
        $("#overlay").removeClass("overlay-visible")
        sound = new Audio(`assets/sound/click.ogg`)
        sound.volume = 0.18
        sound.play()
    })
}