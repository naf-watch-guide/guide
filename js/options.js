function optionsInit() {
    $("#swapper").on("click", () => {
        showOptions()
    })

    $("#options-swap").on("click", () => {
        swap()
        closeOverlay()
        click()
    })

    $("#options-progress-mode").on("click", () => {
        settingprogress = !settingprogress
        regenVideos()
        closeOverlay()
        click()
    })
}

function showOptions() {
    hideAll()
    $("#overlay").addClass("closeable")
    $("#overlay").addClass("overlay-visible")
    $("#options").removeClass("hidden")
}