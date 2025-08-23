function overlayInit() {
    $("#overlay-yes").on("click", () => {
        iamwatching.progress += 1
        if (iamwatching.links[iamwatching.progress] === "skip") {
            iamwatching.progress += 1
        }
        $("#overlay").removeClass("overlay-visible")
        regenVideos()
        save()

        finishVideoSound()
    })

    $("#overlay-no").on("click", () => {
        closeOverlay()
        click()
    })

    $("#intro-yes").on("click", () => {
        $("#intro-yes").addClass("hidden")
        $("#intro-no").addClass("hidden")
        $("#intro-okay").removeClass("hidden")
        $("#intro-explainer").html("1. Each column has one person's videos.<br>2. Right now, you can only see the first video from each person.<br>3. Watching a video reveals the next one by the same person.<br>4. There is no watch order for creators.")
        click()
    })

    $("#intro-no").on("click", () => {
        closeOverlay()
        click()
    })

    $("#intro-okay").on("click", () => {
        closeOverlay()
        click()
        localStorage.setItem("seenintro", true);
    })

    $("#overlay-confirm-no").on("click", () => {
        closeOverlay()
        click()
    })

    $("#overlay").on("click", (e) => {
        if ($(e.target).is(".closeable")) {
            closeOverlay()
        }
    })
}

function closeOverlay() {
    areyousure = false
    $("#options-reset").html(`<div class="sub-button">Reset This Season</div>`)
    $("#overlay").removeClass("overlay-visible")
}

function hideAll() {
    $("#overlay").removeClass("closeable")
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
    $("#overlay").addClass("closeable")
    $("#video-confirm").removeClass("hidden")

    $("#video-link").attr("href", VIDEO_PREFIX + linkobj.links[chapter - 1])

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
        getPlayVideoSound(chapter).play()

        if (linkobj.progress === chapter - 1) {
            showDidYouWatch()
        } else {
            closeOverlay(false)
        }
    })

    orb()
}