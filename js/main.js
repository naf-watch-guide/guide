iamwatching = ""

previous_position = { username: "4CVIT", chapter: 0 }

linkparams = {
    season: 2,
    get links() {
        return linkparams.season === 1 ? links_s1 : (linkparams.season === 2 ? links_s2 : links_s3)
    }
}

seenintro = false

settingprogress = false

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