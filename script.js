function S(param) {
    return document.querySelector(param)
}

let audio = S('audio')
let tempoAtual = S('#tempoAtual')
let tempoTotal = S('#tempoTotal')

let musicas = [
    'nao_troco.mp3',
    'amoras.mp3',
    'provavelmente.mp3',
    'insonia.mp3',
    'detalhes.mp3'
]

let percentual;
let intervalo;

let mm = 0;
let ss = 0;



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
        
        let musicaAtual = src[4]
        //console.log()
        

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
        
        let musicaAtual = src[4]

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
    
    let musicaAtual = src[4]

    //dar tempo de setar o src no audio
    setTimeout(() => {
        segundo = Math.floor(audio.duration % 60).toFixed(0)
        minuto = Math.floor(audio.duration / 60).toFixed(0)

//console.log(minuto)

        nomeFaixa.innerHTML = musicaAtual
        tempoTotal.innerHTML = `${minuto < 1 ? '0' : minuto}` + ' : ' + `${segundo < 10 ? '0' + segundo : segundo}`
    },200)
}


function progressBar() {

    percentual = (audio.currentTime / audio.duration) * 100
    console.log(percentual)  

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
