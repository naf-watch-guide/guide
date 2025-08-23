global_volume = 1

function click() {
    sound = new Audio(`assets/sound/click.ogg`)
    sound.volume = 0.55 * global_volume
    sound.play()
}

function orb() {
    sound = new Audio(`assets/sound/orb.ogg`)
    sound.volume = 0.18 * global_volume
    sound.play()
}

function getHoverVideoSound(linkobj) {
    let sound = "stone"
    let volume = 0.45
    let random = 4

    if (!(linkobj.progress >= linkobj.ending) && linkobj.progress < 8) {
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
            //REMINDER: add mineral block sound for survivors
        }
    } 
        

    sound = new Audio(`assets/sound/${sound}${Math.ceil(Math.random()*random)}.ogg`)
    sound.volume = volume * global_volume

    return sound
}

function getPlayVideoSound(chapter) {
    let sound = "break/grass"
    let volume = 0.27
    let random = 4

    switch (chapter) {
        case 1:
            break;
        case 2:
            sound = "break/gravel"
            volume = 0.27
            random = 4
            break;
        case 3:
            sound = "stone"
            volume = 0.6
            random = 4
            break;
        case 4:
            sound = "endportal"
            volume = 0.18
            random = 0
            break;
        case 5:
            sound = "hurt"
            volume = 0.2
            random = 4
            break;
        default:
            sound = "break/deepslate"
            volume = 1
            random = 4
    }

    sound = new Audio(`assets/sound/${sound}${random !== 0 ? Math.ceil(Math.random()*random) : ""}.ogg`)
    sound.volume = volume * global_volume

    return sound
}

function finishVideoSound() {
    if (iamwatching.progress !== iamwatching.ending) {
        click()
        if (iamwatching.progress !== 8) {
            sound = new Audio(`assets/sound/levelup.ogg`)
            sound.volume = 0.3
            sound.play()
        }
    } else {
        sound = new Audio(`assets/sound/fallbig.ogg`)
        sound.volume = 0.75
        sound.play()
    }
}