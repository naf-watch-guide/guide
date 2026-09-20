areyousure = false

function optionsInit() {
    $("#swapper").on("click", () => {
        showOptions()
    })

    $("#options-swap-1").on("click", () => {
        swap(1)
        closeOverlay()
        click()
    })

    $("#options-swap-2").on("click", () => {
        swap(2)
        closeOverlay()
        click()
    })

    $("#options-progress-mode").on("click", () => {
        settingprogress = !settingprogress
        regenVideos()
        closeOverlay()
        click()
    })

    $("#options-reset").on("click", () => {
        if (!areyousure) {
            areyousure = true
            $("#options-reset").html(`<div class="sub-button">Are you SURE?</div>`)
            click()
            return
        }
        resetProgress()
        closeOverlay()
        portal()
        $("#options-reset").html(`<div class="sub-button">Reset This Season</div>`)
    })
}

function showOptions() {
    hideAll()
    $("#overlay").addClass("closeable")
    $("#overlay").addClass("overlay-visible")
    $("#options").removeClass("hidden")
}