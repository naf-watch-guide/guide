function tableInit() {
    regenNames()
    chooseRandom()
    regenVideos()
}

function chooseRandom() {
    linkparams.links.forEach(linkobj => {
        linkobj.random = Array.from({length: 8}, () => Math.ceil(Math.random() * 4));
    })
}

function regenNames() {
    $("#names").empty()
    linkparams.links.forEach(linkobj => {
        if (linkobj.links.length !== 0) {
            if (linkparams.season === 1 && linkobj.username === "Wunba") {
                $("#names").append(`<td class="user">${linkobj.username}'s Story<br><i>(COMPILATION)</td>`)
            } else {
                $("#names").append(`<td class="user">${linkobj.username}'s Story</td>`)
            }
            
        }
    });
}

function regenVideos() {
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
                const skip = videoID === "skip"

                var fullLink = ""
                
                if (skip && !invisible) {
                    fullLink = "..."
                } else if (ending && !invisible) {
                    fullLink = "The End..."
                } else if (!invisible) {
                    if (locked) {
                        fullLink = `<img class="thumbnail" src="assets/locked.jpg"}>`
                    } else if (videoID !== undefined) {
                        const img = IMG_PREFIX + videoID + IMG_SUFFIX
                        fullLink = `<img class="thumbnail" src=${img}>`
                    } else {
                        fullLink = "The End...?"
                    } 
                }

                $(`#chapter-${chapter}`).append(`<td id="video-${linkobj.username}-${chapter}" class="video${locked ? "" : " locked"}">${fullLink}</td>`)
                if (!invisible && videoID !== undefined && !skip) {
                    $(`#video-${linkobj.username}-${chapter}`).on("click", (event) => {
                        showVideoConfirmation(linkobj, chapter)
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
                $(`#video-${linkobj.username}-${chapter}`).addClass(`variant-${linkobj.random[chapter-1]}`)
            })
        }
    })
    
}

function hover(linkobj, chapter) {
    const end = linkobj.progress >= linkobj.ending || linkobj.progress >= 8

    $("#progress").html(`${linkobj.username}'s Story<br>Progress: ${linkobj.progress}/${end || linkobj.progress >= 7 || (linkobj.username === "Wunba" && linkparams.season === 1) ? linkobj.ending ?? 8 : "?"}`)

    $("#progress").removeClass("beginning")
    $("#progress").removeClass("ending")
    $("#progress").removeClass("c2")
    $("#progress").removeClass("c3")
    $("#progress").removeClass("c4")
    $("#progress").removeClass("c5")

    if (end) {
        $("#progress").addClass("ending")
    } else {
        if (linkobj.progress == 0) {
            $("#progress").addClass("beginning")
        } else if (linkobj.progress === 2) {
            $("#progress").addClass("c2")
        } else if (linkobj.progress === 4) {
            $("#progress").addClass("c4")
        } else if (linkobj.progress === 3) {
            $("#progress").addClass("c3")
        } else if (linkobj.progress > 4) {
            $("#progress").addClass("c5")
        }
    }

    if (previous_position.username !== linkobj.username) {
        let sound = "stone"
        let volume = 0.45
        let random = 4

        if (!end) {
            switch (linkobj.progress) {
                case 0:
                    sound = "grass"
                    volume = 0.2
                    random = 6
                    break;
                case 1:
                    sound = "gravel"
                    volume = 0.12
                    random = 4
                    break;
                case 2:
                    sound = "stone-step"
                    volume = 0.45
                    random = 4
                    break;
                case 3:
                    sound = "eyeplace"
                    volume = 0.32
                    random = 3
                    break;
                case 4:
                    sound = "hurt_closed"
                    volume = 0.22
                    random = 5
                    break;
                default:
                    sound = "deepslate"
                    volume = 0.65
                    random = 6
                    break;
            }
        } 
            

        sound = new Audio(`assets/sound/${sound}${Math.ceil(Math.random()*random)}.ogg`)
        sound.volume = volume
        sound.play()
    }

    previous_position = { username: linkobj.username, chapter: chapter }
}