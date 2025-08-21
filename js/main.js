iamwatching = ""

previous_position = { username: "4CVIT", chapter: 0 }

linkparams = {
    season: 1,
    get links() {
        return linkparams.season === 1 ? links_s1 : links_s2
    }
}

seenintro = false

function main() {
    load()

    overlayInit()
    optionsInit()
    tableInit()

    if (!seenintro) {
        showIntro()
    }
}


$(() => {
    main()
    console.log("YEAH!")
})