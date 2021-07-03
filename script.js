
let audio = S('audio')
let tempoAtual = S('#tempoAtual')
let tempoTotal = S('#tempoTotal')

let percentual;
let intervalo;

let mm = 0;
let ss = 0;

let musicas = [
    'songs/Foi-no-teu-Olhar.mp3',
    'songs/Destination-Calabria.mp3',
    'songs/Dubdogz-Atomic-Bomb.mp3',
    'songs/It-Is-What-It-Is-Vintage-Culture.mp3',
    'songs/MEDUZA-Paradise.mp3',
    'songs/SAINt-JHN-Roses.mp3',
    'songs/nao-troco.mp3',
    'songs/amoras.mp3',
    'songs/provavelmente.mp3'
]

//selecionar elemento html da página
function S(param) {
    return document.querySelector(param)
}

function playPause() {
    let playPause = S('#playPause')

    if(playPause.classList.contains('fa-play')) {
        play()

        playPause.classList.remove('fa-play')
        playPause.classList.add('fa-pause')
        //console.log('play!')
    }
    else {
        pause()

        playPause.classList.remove('fa-pause')
        playPause.classList.add('fa-play')
        //console.log('pause!')
        
    }
}

function play() {
    timerStop()

    if(audio.src != '') {
        audio.play()
        timer()
    }
    else {
        audio.src = musicas[0]
        audio.play()
        timer()
    }
}

function pause() {
    
    audio.pause()
    timerStop()

}

function next() {
    timerStop()

    if(audio.src == ''){
        audio.src = musicas[0]
        audio.play()
        timer()
    }
    else {
        let src = audio.src.split('/')
        
        let musicaAtual = `${src[src.length - 2]}/${src[src.length - 1]}`
        //console.log(musicaAtual)
        

        audio.src = ''
        
        for (let i = 0; i < musicas.length; i++) {

            if(musicaAtual == musicas[i]) {
                
                if((i + 1) == (musicas.length)){
                    audio.src = musicas[0]
                    audio.play()
                    timer()
                }
                else {
                    audio.src = musicas[i + 1]
                    audio.play()
                    timer()
                }
                
            }
        }
    }

}

function prev() {
    timerStop()

    if(audio.src == ''){
        audio.src = musicas[0]
        audio.play()
        timer()
    }
    else {

        let src = audio.src.split('/')
        
        let musicaAtual = `${src[src.length - 2]}/${src[src.length - 1]}`

        audio.src = ''
        
        for (let i = 0; i < musicas.length; i++) {

            if(musicaAtual == musicas[i]) {
                
                if((i - 1) < 0){
                    audio.src = musicas[musicas.length - 1]
                    audio.play()
                    timer()
                }
                else {
                    audio.src = musicas[i - 1]
                    audio.play()
                    timer()
                }
                
            }
        }
    }
}

//Criação da barra de Progresso
function legenda() {

    let segundo
    let  minuto
    let nomeFaixa = S('#nome-faixa')
    
    let src = audio.src.split('/')
    
    let musicaAtual = src[src.length - 1]

    //dar tempo de setar o src no audio
    function timeout() {
        setTimeout(() => {
            segundo = Math.floor(audio.duration % 60).toFixed(0)
            minuto = Math.floor(audio.duration / 60).toFixed(0)

    //console.log(tempoTotal)

            nomeFaixa.innerHTML = musicaAtual
            tempoTotal.innerHTML = `${minuto < 1 ? '0' : minuto}` + ' : ' + `${segundo < 10 ? '0' + segundo : segundo}`

        
        },1000)
    }

    timeout()

    while(segundo == NaN || minuto == NaN) {
        timeout()
    }
}


function progressBar() {

    percentual = (audio.currentTime / audio.duration) * 100
    //console.log(percentual)  

    if(audio.currentTime == audio.duration)
        next()  
    
    let progresso = S('#progresso')
        progresso.style.width = `${percentual}%`
        progresso.style.background = `#009bdb`

        if(ss < 59) {
            ss++
        } else {
            mm++
            ss = 0
        }

        //tempoAtual.innerHTML = audio.currentTime.toFixed(0)
        tempoAtual.innerHTML = mm+' : '+(ss < 10 ? "0" + ss : ss)
}
    
    
function timer() {
    ss = 0
    mm = 0

    intervalo = setInterval(progressBar, 1000)
    legenda()
}

function timerStop() {
    clearInterval(intervalo)
}
