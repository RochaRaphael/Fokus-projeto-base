const html = document.querySelector('html')
const focoBt = document.querySelector('.app__card-button--foco')
const curtoBt = document.querySelector('.app__card-button--curto')
const longoBt = document.querySelector('.app__card-button--longo')
const displayTempo = document.querySelector('#timer');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const playBt = document.querySelector('#start-pause');
const flagMusica = document.querySelector('.app__card-list-label')
const musicaFocoInput = document.querySelector('#alternar-musica')
const musica = new Audio('/sons/luna-rise-part-one.mp3')
const musicaPause = new Audio ('/sons/pause.mp3')
const musicaPlay = new Audio ('/sons/play.wav')
musica.loop = true;

const duracaoFoco = 4; 
const duracaoDescansoCurto = 8; 
const duracaoDescansoLongo = 16; 
let intervaloId;
let tempoDecorridoEmSegundos = 2
var cronometroLigado = false;

musicaFocoInput.addEventListener('change', () => {
    musica.paused ? musica.play() : musica.pause();
})

let numeroDeTrocas = 1

const contagemRegressiva = () => {
    if(tempoDecorridoEmSegundos == 0) {
        musicaPause.play()
        pararCronometro()

        if(numeroDeTrocas != 7){
            if(numeroDeTrocas % 2 === 0){
                alteraContexto('foco')
            }
            else{
                if(numeroDeTrocas == 5){
                    alteraContexto('descanso-longo')
                }
                else{
                    alteraContexto('descanso-curto')
                }
            }  
            iniciarCronometro()
            numeroDeTrocas++
        }
    }
    mostraTempo(tempoDecorridoEmSegundos)
    tempoDecorridoEmSegundos -= 1   
}

playBt.addEventListener('click', () =>
{
    cronometroLigado == false ? iniciarCronometro() : pararCronometro()
})


focoBt.addEventListener('click',() => { alteraContexto('foco')})
curtoBt.addEventListener('click',() => { alteraContexto('descanso-curto')})
longoBt.addEventListener('click',() => { alteraContexto('descanso-longo')})

function alteraContexto(contexto)
{
    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `/imagens/${contexto}.png`)

    document.querySelector('#audio_pom').play()
    mudaCronometro()
    switch(contexto) {
        case "foco":
            contextoFoco()
        break;
        case "descanso-curto":
            contextoDescansoCurto()
        break;
        case "descanso-longo":
            contextoDescansoLongo()
        break;
        default:
            break;
    }
    
}

function iniciarCronometro() {
    intervaloId = setInterval(contagemRegressiva, 1000);
    cronometroLigado = true
    playBt.textContent = 'Pausar'  
    musicaPlay.play()
}

function pararCronometro() {
    clearInterval(intervaloId)
    cronometroLigado = false
    playBt.textContent = 'Continuar'
    musicaPause.play()
}

function mudaCronometro()
{
    clearInterval(intervaloId)
    cronometroLigado = false
    playBt.textContent = 'Começar'
}


function mostraTempo(tempo) {
    const minutos = Math.floor(tempo / 60); // Calcula os minutos
    const segundos = tempo % 60; // Calcula os segundos

    // Formata os minutos e segundos para terem dois dígitos
    const minutosFormatados = minutos < 10 ? '0' + minutos : minutos;
    const segundosFormatados = segundos < 10 ? '0' + segundos : segundos;

    // Atualiza o display com o tempo formatado
    displayTempo.textContent = minutosFormatados + ':' + segundosFormatados;
}

function contextoFoco(){
    titulo.innerHTML = 'Otimize sua produtividade, <br> <strong class="app__title-strong">mergulhe no que importa.</strong>'

    curtoBt.classList.remove('active')
    longoBt.classList.remove('active')
    focoBt.classList.add('active')

    mostraTempo(duracaoFoco)
    tempoDecorridoEmSegundos = duracaoFoco
}

function contextoDescansoCurto() {
    titulo.innerHTML = 'Que tal uma respirada?, <br> <strong class="app__title-strong">Faça uma pausa.</strong>'

    focoBt.classList.remove('active')
    longoBt.classList.remove('active')
    curtoBt.classList.add('active')

    mostraTempo(duracaoDescansoCurto)
    tempoDecorridoEmSegundos = duracaoDescansoCurto
}

function contextoDescansoLongo(){
    titulo.innerHTML = 'Hora de voltar a superfice, <br> <strong class="app__title-strong">Faça uma pausa longa.</strong>'

    curtoBt.classList.remove('active')
    focoBt.classList.remove('active')
    longoBt.classList.add('active')

    mostraTempo(duracaoDescansoLongo)
    tempoDecorridoEmSegundos = duracaoDescansoLongo
}
