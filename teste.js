/*
let i = 0
let interval

function s() {
    console.log('S')
    interval = setInterval(timer, 1000 )
    
}

function stop() {
    //console.log('Stop')
    clearInterval(interval)
    
}

function timer() {
    i++
    console.log(i)

}
*/
function start() {
    audio = document.querySelector('audio')
    audio.src = 'songs/amoras.mp3'
    audio.play()
}

function  s() {
    setTimeout(() => {
        start()
    }, 5000)
}