function optionsInit() {
    $("#swapper").on("click", () => {
        showOptions()
    })

    $("#options-swap").on("click", () => {
        swap()
        closeOverlay()
    })

    $("#options-progress-mode").on("click", () => {
        settingprogress = !settingprogress
        regenVideos()
        closeOverlay()
    })
}

function showOptions() {
    hideAll()
    $("#overlay").addClass("closeable")
    $("#overlay").addClass("overlay-visible")
    $("#options").removeClass("hidden")
}