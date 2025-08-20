VIDEO_PREFIX = "https://www.youtube.com/watch?v="
IMG_PREFIX = "https://img.youtube.com/vi/"
IMG_SUFFIX = "/hqdefault.jpg"

iamwatching = ""

previous_position = { username: "4CVIT", chapter: 0 }

links = [
    { username: "4CVIT", links: ["FgHOiVT7buc", "-IZ025_0Upg", "zu5lWDsJfQk"], progress: 0 },
    { username: "Ashswag", links: [], progress: 0 },
    { username: "Blooh", links: ["ALEeqAsOW4c", "cA0a7X2BW_M", "dyS3uSkDq1s"], progress: 0 },
    { username: "BranzyCraft", links: ["t6GViL5gRoU"], progress: 0, ending: 1 },
    { username: "ClownPierce", links: [], progress: 0 },
    { username: "Crafty­Masterman", links: ["fM-HIQY94Fk", "T8V2rxxG7Yc", "FwhVK2defKI"], progress: 0 },
    { username: "Evbo", links: [], progress: 0 },
    { username: "LegunDOS", links: ["t8p8lF53XdQ", "9XYIXtj-bIE", "qtxIZQ8Vkb4", "5oxrKVymbXk"], progress: 0 },
    { username: "Loony", links: ["ssYpONYsJFY", "WVe-AmEl9B8", "olroMCN2SVw", "GAvQ3fX5e6E"], progress: 0, ending: 4 },
    { username: "Midmysticx", links: ["1obpz9NNnns", "W-YFuoLFQbM", "Sjt3GYksO5c", "PN7kt06QYxE"], progress: 0 },
    { username: "MiniMuka", links: ["YTF11t91rUg", "f4gsPUsJh1o", "6FEL7OUc2eQ", "H36cQTCJI5M"], progress: 0 },
    { username: "MogSwamp", links: ["wbyreM1_BrQ"], progress: 0, ending: 1 },
    { username: "NotNotBrock", links: ["e3rVlLC-E5k", "dlckliqo7Fw", "HyZ7S4GO2Bw"], progress: 0 },
    { username: "Reddoons", links: ["rXhX1Wa_M20"], progress: 0, ending: 1 },
    { username: "rekrap2", links: ["hloX5S1YNNc", "hYWieU5YFkg", "BEJG5Dq5fRU", "vFQBd60xjPo"], progress: 0 },
    { username: "SB737", links: ["FhTp7501lgQ", "tnKtNUH5ULg"], progress: 0, ending: 2 },
    { username: "Squiddo", links: [], progress: 0 },
    { username: "Taneesha­hogan", links: ["y3u4L-GHC1I", "HR8yEmy-E8o", "iSI9t0VJVE0", "mZIN-j18LCc"], progress: 0 },
    { username: "Wunba", links: [], progress: 0 },
    { username: "YeahJaron", links: ["0xC5cfaVz9U", "1n3wMfVaBh8", "N-fZ6pj_Jdg", "TFkDzU9qClI"], progress: 0 }
]

function resetProgress() {
    links.forEach(element => {
        localStorage.setItem(element.username, 0);
        element.progress = 0
    });

    regen()
}

function hover(linkobj, chapter) {
    const end = linkobj.progress === linkobj.ending

    $("#progress").html(`${linkobj.username}'s Story<br>Progress: ${linkobj.progress}/${end ? linkobj.ending : "?"}`)

    $("#progress").removeClass("beginning")
    $("#progress").removeClass("ending")
    $("#progress").removeClass("c2")

    if (end) {
        $("#progress").addClass("ending")
    } else {
        if (linkobj.progress == 0) {
            $("#progress").addClass("beginning")
        } else if (linkobj.progress > 1) {
            $("#progress").addClass("c2")
        }
    }

    if (previous_position.username !== linkobj.username) {
        let sound = "grass"
        let volume = 0.03

        if (end) {
            sound = "stone"
            volume = 0.12
        } else if (linkobj.progress === 1) {
            sound = "gravel"
        } else if (linkobj.progress > 1) {
            sound = "stone-step"
            volume = 0.12
        }

        sound = new Audio(`assets/sound/${sound}${Math.ceil(Math.random()*4)}.ogg`)
        sound.volume = volume
        sound.play()
    }

    previous_position = { username: linkobj.username, chapter: chapter }
}

function linkClicked(linkobj) {
    $("#overlay").addClass("overlay-visible")
    iamwatching = linkobj

    const sound = new Audio(`assets/sound/grass${Math.ceil(Math.random()*4)}.ogg`)
    sound.volume = end ? 0.08 : 0.04
    sound.play()
}

function save() {
    links.forEach(element => {
        localStorage.setItem(element.username, element.progress);
    });
}

function main() {
    // load
    links.forEach(element => {
        element.progress = localStorage.getItem(element.username) ?? 0;
        element.progress = Number(element.progress)
    });

    // set callbacks
    $("#overlay-yes").on("click", () => {
        iamwatching.progress += 1
        $("#overlay").removeClass("overlay-visible")
        regen()
        save()
    })

    $("#overlay-no").on("click", () => {
        $("#overlay").removeClass("overlay-visible")
    })

    const table = $("#video-table")
    links.forEach(linkobj => {
        if (linkobj.links.length !== 0) {
            $("#names").append(`<td class="user">${linkobj.username}'s Story</td>`)
        }
    });

    links.forEach(linkobj => {
        linkobj.random = Array.from({length: 8}, () => Math.ceil(Math.random() * 4));
    })

    regen()
}

function regen() {
    Array.from({ length: 8 }, (_, i) => i + 1).forEach(chapter => {
        $(`#chapter-${chapter}`).empty()
    })

    links.forEach(linkobj => {
        if (linkobj.links.length !== 0) {
            Array.from({ length: 8 }, (_, i) => i + 1).forEach(chapter => {
                const videoID = linkobj.links[chapter - 1]

                //const locked = idx > linkobj.progress + 1
                locked = false
                const invisible = chapter > linkobj.progress + 1
                const ending = linkobj.ending == chapter - 1

                var fullLink = ""
                
                if (ending && !invisible) {
                    fullLink = "The End..."
                } else if (!invisible) {
                    if (locked) {
                        fullLink = `<img class="thumbnail" src="assets/locked.jpg"}>`
                    } else if (videoID !== undefined) {
                        const img = IMG_PREFIX + videoID + IMG_SUFFIX
                        fullLink = `<a href="${VIDEO_PREFIX + videoID}" target="_blank"><img class="thumbnail" src=${img}></a>`
                    } else {
                        fullLink = "The End...?"
                    } 
                }

                $(`#chapter-${chapter}`).append(`<td id="video-${linkobj.username}-${chapter}" class="video${locked ? "" : " locked"}">${fullLink}</td>`)
                if (Number(linkobj.progress) + 1 === chapter && linkobj.ending + 1 !== chapter && !locked && videoID) {
                    $(`#video-${linkobj.username}-${chapter}`).on("click", (event) => {
                        linkClicked(linkobj)
                    })
                }

                $(`#video-${linkobj.username}-${chapter}`).on("mouseenter", (event) => {
                    hover(linkobj, chapter)
                })

                /*if (linkobj.ending === linkobj.progress && invisible || ending && !invisible) {
                    if (chapter >= linkobj.ending) {
                        $(`#video-${linkobj.username}-${chapter}`).addClass("past-ending")
                    } else {
                        $(`#video-${linkobj.username}-${chapter}`).addClass("ending")
                    }
                }*/
                $(`#video-${linkobj.username}-${chapter}`).addClass(`variant-${linkobj.random[chapter]}`)
            })
        }
    })
    
}


$(() => {
    main()
    console.log("YEAH!")
})