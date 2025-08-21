iamwatching = ""

previous_position = { username: "4CVIT", chapter: 0 }

linkparams = {
    season: 1,
    get links() {
        return linkparams.season === 1 ? links_s1 : links_s2
    }
}

function main() {
    load()

    overlayInit()
    optionsInit()
    tableInit()
}


$(() => {
    main()
    console.log("YEAH!")
})