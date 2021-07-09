let audio = S('audio')
let tempoAtual = S('#tempoAtual')
let tempoTotal = S('#tempoTotal')

let percentual
let intervalo

let mm = 0
let ss = 0

let segundo = NaN
let  minuto = NaN
let nomeFaixa = S('#nome-faixa')

let musicas = [
    'songs/Lost_Frequencies-Rise.mp3',
    'songs/Timmy_Trumpet-Mad_World.mp3',
    'songs/Foi_no_teu_Olhar-AR15.mp3',
    'songs/Destination-Calabria.mp3',
    'songs/Dubdogz-Atomic_Bomb.mp3',
    'songs/It_Is_What_It_Is-Vintage_Culture.mp3',
    'songs/MEDUZA-Paradise.mp3',
    'songs/SAINt_JHN-Roses.mp3',
    'songs/Distribuidora-Biu_do_Piseiro.mp3',
    'songs/VAI_SE_TRATAR_GAROTA.mp3',
    'songs/Tipo_Gim.mp3',
    'songs/nao_troco.mp3',
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
    }
    else {
        pause()
    }
}

function play(param) {
    timerStop()

    let playPause = S('#playPause')

    if(playPause.classList.contains('fa-play')) {
        playPause.classList.remove('fa-play')
        playPause.classList.add('fa-pause')
    }

    if(param === undefined){

        if(audio.src != '') {
            audio.play()
            timer()
        }
        else {
            audio.src = musicas[0]
            audio.play()
            timer()
        }

    } else {
        audio.src = param
        audio.load()
        audio.play()
        timer()  
    }
}

function pause() {

    let playPause = S('#playPause')

    if(playPause.classList.contains('fa-pause')) {
        playPause.classList.remove('fa-play')
        playPause.classList.add('fa-play')
    }
    
    audio.pause()
    timerStop()

}

function next() {
    timerStop()

    if(audio.src == ''){
        play(musicas[0])
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
                    play(musicas[0])
                    timer()
                }
                else {
                    play(musicas[i + 1])
                    timer()
                }
                
            }
        }
    }

}

function prev() {
    timerStop()

    if(audio.src == ''){
        play(musicas[0])
        timer()
    }
    else {

        let src = audio.src.split('/')
        
        let musicaAtual = `${src[src.length - 2]}/${src[src.length - 1]}`

        audio.src = ''
        
        for (let i = 0; i < musicas.length; i++) {

            if(musicaAtual == musicas[i]) {
                
                if((i - 1) < 0){
                    play(musicas[musicas.length - 1])
                    timer()
                }
                else {
                    play(musicas[i - 1])
                    timer()
                }
                
            }
        }
    }
}

//Criação da barra de Progresso
function legenda() {

    let src = audio.src.split('/')
    
    let musicaAtual = src[src.length - 1]
    nomeFaixa.innerHTML = musicaAtual.replace('.mp3', '')
 
}

function progressBar() {

    percentual = (audio.currentTime / audio.duration) * 100
    //console.log(percentual)  

    if(audio.currentTime == audio.duration){
        next()  
    }
    
    let progresso = S('#progresso')
        progresso.style.width = `${percentual}%`
        progresso.style.background = `#009bdb`

        if(ss < 59) {
            ss = Math.floor(audio.currentTime % 60).toFixed(0)
        } else {
            mm = Math.floor(audio.currentTime / 60).toFixed(0)
            ss = 0
        }

        //tempoAtual.innerHTML = audio.currentTime.toFixed(0)
        tempoAtual.innerHTML = mm+' : '+(ss < 10 ? "0" + ss : ss)

        segundo = Math.floor(audio.duration % 60).toFixed(0)
        minuto = Math.floor(audio.duration / 60).toFixed(0)

        if(minuto != NaN && segundo != NaN) {
            tempoTotal.innerHTML = `${minuto < 1 ? '0' : minuto}` + ' : ' + `${segundo < 10 ? '0' + segundo : segundo}`
        }
}   
    
function timer() {
    ss = 0
    mm = 0

    ss = 0
    mm = 0

    intervalo = setInterval(progressBar, 1000)
    legenda()
}

function timerStop() {
    clearInterval(intervalo)
}

function playList() {

    display()

    let playList = S('.playlist')

    if(S('.playlist > p') == null) {

        for(let i = 0; i < musicas.length; i++) {
        
        nomeMusica = musicas[i].split('/')

        let musica = document.createElement('p')
        musica.onclick = () => { play(musicas[i]) }
        musica.innerHTML = nomeMusica[1].replace('.mp3', '')
        playList.appendChild(musica)
        
        }
    }
}

function display() {

    let legenda = S('.legenda')
    let album = S('.album')
    let playlist = S('.playlist')

    if(album.style.height === "0%") {
        album.style.height = "60%"
        legenda.style.display = 'fixed'
        legenda.style.top = "0px"
        playlist.style.height = "0%"
        playlist.style.background = "none"
        
    }
    else{
        
        album.style.height = "0%"
        playlist.style.height = "60%"
        playlist.style.background = "#292929"
    }

    
    
}
