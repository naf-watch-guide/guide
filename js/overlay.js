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
            sound.volume = 0.15
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
        closeOverlay()
    })

    $("#intro-yes").on("click", () => {
        $("#intro-yes").addClass("hidden")
        $("#intro-no").addClass("hidden")
        $("#intro-okay").removeClass("hidden")
        $("#intro-explainer").html("1. Each column has one person's videos.<br>2. Right now, you can only see the first video from each person.<br>3. Watching a video reveals the next one by the same person.<br>4. There is no watch order for creators.")
        sound = new Audio(`assets/sound/click.ogg`)
        sound.volume = 0.15
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

    $("#overlay-confirm-no").on("click", () => {
        closeOverlay()
    })
}

function closeOverlay(sound = true) {
    $("#overlay").removeClass("overlay-visible")
    if (!sound) return
    sound = new Audio(`assets/sound/click.ogg`)
    sound.volume = 0.15
    sound.play()
}

function hideAll() {
    $("#intro").addClass("hidden")
    $("#video-popup").addClass("hidden")
    $("#options").addClass("hidden")
    $("#video-confirm").addClass("hidden")
}

function showDidYouWatch() {
    hideAll()
    $("#overlay").addClass("overlay-visible")
    $("#video-popup").removeClass("hidden")
}

function showIntro() {
    hideAll()
    $("#overlay").addClass("overlay-visible")
    $("#intro").removeClass("hidden")
    $("#intro-yes").removeClass("hidden")
    $("#intro-no").removeClass("hidden")
    $("#intro-okay").addClass("hidden")
    $("#intro-explainer").html("Hey, thanks for checking out the website!<br>It's easy to use, but it needs a short explanation.")
}

function showVideoConfirmation(linkobj, chapter) {
    hideAll()
    $("#overlay").addClass("overlay-visible")
    $("#video-confirm").removeClass("hidden")

    $("#video-link").attr("href", VIDEO_PREFIX + linkobj.links[chapter])

    let realCount = 0
    let done = false
    linkobj.links.forEach((element, idx) => {
        if (element !== "skip" && !done) {
            realCount++
        }
        if (idx + 1 === chapter) {
            done = true
        }
    });
    let extra = "th"
    if (realCount === 1) {extra = "st"}
    if (realCount === 2) {extra = "nd"}
    if (realCount === 3) {extra = "rd"}
    
    $("#overlay-confirm-watchwhat").html(`Open a link to ${linkobj.username}'s ${realCount}${extra} video?`)

    $("#overlay-confirm-yes").off()
    $("#overlay-confirm-yes").on("click", () => {
        iamwatching = linkobj

        let sound = "break/grass"
        let volume = 0.06
        let random = 4

        switch (chapter) {
            case 1:
                break;
            case 2:
                sound = "break/gravel"
                volume = 0.06
                random = 4
                break;
            case 4:
                sound = "endportal"
                volume = 0.04
                random = 0
                break;
            case 5:
                sound = "hurt"
                volume = 0.05
                random = 4
                break;
            default:
                sound = "stone"
                volume = 0.10
                random = 4
        }

        sound = new Audio(`assets/sound/${sound}${random !== 0 ? Math.ceil(Math.random()*random) : ""}.ogg`)
        sound.volume = volume
        sound.play()

        if (linkobj.progress === chapter - 1) {
            showDidYouWatch()
        } else {
            closeOverlay(false)
        }
    })

    sound = new Audio(`assets/sound/orb.ogg`)
    sound.volume = 0.05
    sound.play()
}