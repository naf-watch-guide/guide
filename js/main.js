VIDEO_PREFIX = "https://www.youtube.com/watch?v="
IMG_PREFIX = "https://img.youtube.com/vi/"
IMG_SUFFIX = "/hqdefault.jpg"

iamwatching = ""

previous_position = { username: "4CVIT", chapter: 0 }

linkparams = {
    season: 1,
    get links() {
        return linkparams.season === 1 ? links_s1 : links_s2
    }
}

links_s1 = [
    { username: "ClownPierce", links: ["l1M8__oMJXA","niCSUJNS6gg"], progress: 0, ending: 2 },
    { username: "Loony", links: ["DWvlfm779Nc","qP_bHX1pwEU","H1YGxl_jPj4","4AZBA775tSk","lTLKfRt_I1c","NL0zSPZ-P6I","LXHbYSPz1Xw","7lAXiEA6NvE"], progress: 0 },
    { username: "MiniMuka", links: ["7tJzGjkCpJA","mZ7_9jrJx-Y","ZiqUsunxUOE"], progress: 0, ending: 3 },
    { username: "MogSwamp", links: ["oKODGpJDNss"], progress: 0, ending: 1 },
    { username: "NotNotBrock", links: ["vj4N5sYIymk","RzPvQtWIGBY","le_rgfEPXn8","F04FkpfKwRk","omJhG4WIgp4","MM6W7ERdN_g","DJKyyuuwFXU","8j8vqg8GuxU"], progress: 0 },
    { username: "rekrap2", links: ["Yuvk4rfhjog", "82LRpQMxpYw", "S_EgYvz-XII", "KavglOabvRA", "uAv7vcPN1ic", "xazZDW8rq5Q", "jPVEgjoQgA4", "u8xC_C-o4DI"], progress: 0 },
    { username: "SB737", links: ["1hDrQ2ip5YY","tZ8sjgDpzD8","2Kc7Nyxg9BU","BbU8-ZqMwNs"], progress: 0, ending: 4 },
    { username: "Wunba", links: ["VVTrr1Vx8LQ"], progress: 0, ending: 1 },
    { username: "YeahJaron", links: ["95w1C6ebhzQ","SoYs67D278M","aFLgmNRp5zQ","Pqf7-5nMq60"], progress: 0, ending: 4 }
]

links_s2 = [
    { username: "4CVIT", links: ["FgHOiVT7buc", "-IZ025_0Upg", "zu5lWDsJfQk"], progress: 0 },
    { username: "Ashswag", links: [], progress: 0 },
    { username: "Blooh", links: ["ALEeqAsOW4c", "cA0a7X2BW_M", "dyS3uSkDq1s"], progress: 0 },
    { username: "BranzyCraft", links: ["t6GViL5gRoU"], progress: 0, ending: 1 },
    { username: "ClownPierce", links: [], progress: 0 },
    { username: "Crafty­Masterman", links: ["fM-HIQY94Fk", "T8V2rxxG7Yc", "FwhVK2defKI"], progress: 0 },
    { username: "Evbo", links: ["0IyLA5irWPk"], progress: 0, ending: 1 },
    { username: "LegunDOS", links: ["t8p8lF53XdQ", "9XYIXtj-bIE", "qtxIZQ8Vkb4", "5oxrKVymbXk"], progress: 0 },
    { username: "Loony", links: ["ssYpONYsJFY", "WVe-AmEl9B8", "olroMCN2SVw", "GAvQ3fX5e6E"], progress: 0, ending: 4 },
    { username: "Midmysticx", links: ["1obpz9NNnns", "W-YFuoLFQbM", "Sjt3GYksO5c", "PN7kt06QYxE"], progress: 0 },
    { username: "MiniMuka", links: ["YTF11t91rUg", "f4gsPUsJh1o", "6FEL7OUc2eQ", "H36cQTCJI5M"], progress: 0 },
    { username: "MogSwamp", links: ["wbyreM1_BrQ"], progress: 0, ending: 1 },
    { username: "NotNotBrock", links: ["e3rVlLC-E5k", "dlckliqo7Fw", "HyZ7S4GO2Bw"], progress: 0 },
    { username: "Reddoons", links: ["rXhX1Wa_M20"], progress: 0, ending: 1 },
    { username: "rekrap2", links: ["hloX5S1YNNc", "hYWieU5YFkg", "BEJG5Dq5fRU", "vFQBd60xjPo"], progress: 0 },
    { username: "SB737", links: ["FhTp7501lgQ", "tnKtNUH5ULg"], progress: 0, ending: 2 },
    { username: "Squiddo", links: ["4kI7jMrNyIo", "zWta9XIUMXs"], progress: 0, ending: 2 },
    { username: "Taneesha­hogan", links: ["y3u4L-GHC1I", "HR8yEmy-E8o", "iSI9t0VJVE0", "mZIN-j18LCc"], progress: 0 },
    { username: "Wunba", links: [], progress: 0 },
    { username: "YeahJaron", links: ["0xC5cfaVz9U", "1n3wMfVaBh8", "N-fZ6pj_Jdg", "TFkDzU9qClI"], progress: 0 }
]

function resetProgress() {
    linkparams.links.forEach(element => {
        localStorage.setItem(element.username + linkparams.season, 0);
        element.progress = 0
    });

    regen()
}

function hover(linkobj, chapter) {
    const end = linkobj.progress >= linkobj.ending || linkobj.progress >= 8

    $("#progress").html(`${linkobj.username}'s Story<br>Progress: ${linkobj.progress}/${end || linkobj.progress >= 7 || (linkobj.username === "Wunba" && linkparams.season === 1) ? linkobj.ending ?? 8 : "?"}`)

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
        let volume = 0.04

        if (end) {
            sound = "stone"
            volume = 0.12
        } else if (linkobj.progress === 1) {
            sound = "gravel"
            volume = 0.03
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

function swap() {
    save()
    $("#swapper").html(`Swap to <b>Season ${linkparams.season}</b>?`)
    linkparams.season = linkparams.season === 1 ? 2 : 1
    $("#subtitle").html(`The Season ${linkparams.season} Watch Guide`)
    load()
    $("#names").empty()
    linkparams.links.forEach(linkobj => {
        if (linkobj.links.length !== 0) {
            if (linkobj.username === "rekrap2") {
                $("#names").append(`<td class="user">${linkobj.username}'s Story<br><b>(RECOMMENDED)</td>`)
            } else if (linkparams.season === 1 && linkobj.username === "Wunba") {
                $("#names").append(`<td class="user">${linkobj.username}'s Story<br><i>(COMPILATION)</td>`)
            } else {
                $("#names").append(`<td class="user">${linkobj.username}'s Story</td>`)
            }
            
        }
    });
    linkparams.links.forEach(linkobj => {
        linkobj.random = Array.from({length: 8}, () => Math.ceil(Math.random() * 4));
    })
    regen()
}

function save() {
    linkparams.links.forEach(element => {
        localStorage.setItem(element.username + linkparams.season, element.progress);
    });
}

function load() {
    linkparams.links.forEach(element => {
        element.progress = localStorage.getItem(element.username + linkparams.season) ?? 0;
        element.progress = Number(element.progress)
    });
}

function main() {
    // load
    load()

    // set callbacks
    $("#overlay-yes").on("click", () => {
        iamwatching.progress += 1
        $("#overlay").removeClass("overlay-visible")
        sound = new Audio(`assets/sound/click.ogg`)
        sound.volume = 0.18
        sound.play()
        regen()
        save()
    })

    $("#overlay-no").on("click", () => {
        $("#overlay").removeClass("overlay-visible")
        sound = new Audio(`assets/sound/click.ogg`)
        sound.volume = 0.18
        sound.play()
    })

    $("#swapper").on("click", () => {
        swap()
    })

    linkparams.links.forEach(linkobj => {
        if (linkobj.links.length !== 0) {
            if (linkobj.username === "rekrap2") {
                $("#names").append(`<td class="user">${linkobj.username}'s Story<br><b>(RECOMMENDED)</td>`)
            } else if (linkparams.season === 1 && linkobj.username === "Wunba") {
                $("#names").append(`<td class="user">${linkobj.username}'s Story<br><i>(COMPILATION)</td>`)
            } else {
                $("#names").append(`<td class="user">${linkobj.username}'s Story</td>`)
            }
        }
    });

    linkparams.links.forEach(linkobj => {
        linkobj.random = Array.from({length: 8}, () => Math.ceil(Math.random() * 4));
    })

    regen()
}

function regen() {
    Array.from({ length: 8 }, (_, i) => i + 1).forEach(chapter => {
        $(`#chapter-${chapter}`).empty()
    })

    linkparams.links.forEach(linkobj => {
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