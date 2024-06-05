const html = document.querySelector('html');
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const titulo = document.querySelector('.app__title');
const banner = document.querySelector('.app__image');
const botoes = document.querySelectorAll('.app__card-button');
const iniciarOuPausarBt = document.querySelector('#start-pause span')
const tempoNaTela = document.querySelector('#timer')
const imgBtPlayOuPause = document.querySelector('.app__card-primary-butto-icon')
const musicaFocoInput = document.querySelector('#alternar-musica');
const musica = new Audio('/sons/luna-rise-part-one.mp3');

const audioPlay = new Audio('/sons/play.wav');
const audioPausa = new Audio('/sons/pause.mp3');
const audioTempoFinalizado = new Audio('./sons/beep.mp3')
const startPauseBt = document.querySelector('#start-pause');

let tempoCorridoEmSegundos = 1500;
let intervaloId = null;



musica.loop = true;



 musicaFocoInput.addEventListener ('change', () =>  {
    if(musica.paused){
        musica.play();
        
    } else {
        musica.pause();
    }
}) 

focoBt.addEventListener('click', () => {
    tempoCorridoEmSegundos = 1500;
    alterandoContexto('foco' , 'foco.png' );
    focoBt.classList.add('active');
    
   
})

curtoBt.addEventListener('click', () => {
    tempoCorridoEmSegundos =300;
    alterandoContexto('descanso-curto', 'descanso-curto.png');
    curtoBt.classList.add('active');
   

})

longoBt.addEventListener('click', ()=>{
    tempoCorridoEmSegundos = 900;
    alterandoContexto('descanso-longo', 'descanso-longo.png');
    longoBt.classList.add('active');
  

})


function alterandoContexto (contexto, imagem ){
    mostrarTempo();
    botoes.forEach(function (contexto) {
        contexto.classList.remove('active')
    })

    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `/imagens/${imagem}`);
    
    switch (contexto) {
        case 'foco':
            titulo.innerHTML =`
            Otimize sua produtividade,<br>
                <strong class="app__title-strong"> mergulhe no que importa.</strong>
            `
        
            break;
        case 'descanso-curto':
            titulo.innerHTML = `
            Que tal dar uma respirada?<br>
            <strong class="app__title-strong"> Faça uma pausa curta! </strong>
            `
            
            break;

            case 'descanso-longo':
                titulo.innerHTML = `
                Hora de voltar à superfície.<br>
                <strong class="app__title-strong"> Faça uma pausa longa.
                `
            break;
    
        default:
            break;
    }
    titulo.setAttribute('app__title', contexto)
}

const contagemRegressiva = () =>{
    if (tempoCorridoEmSegundos <= 0) {
    audioTempoFinalizado.play()
    alert('Tempo finalizado')
    zerar ();
    return
    }
    tempoCorridoEmSegundos -= 1;
    mostrarTempo();
}

startPauseBt.addEventListener('click', iniciarOuPausar) 

function iniciarOuPausar (){
    if (intervaloId){
        audioPausa.play();
        zerar()
        return
    }
    audioPlay.play();  
    intervaloId = setInterval (contagemRegressiva, 1000)
    iniciarOuPausarBt.textContent = "Pausar"
    imgBtPlayOuPause.setAttribute('src' , '/imagens/pause.png')
}

function zerar (){
    clearInterval(intervaloId);
    intervaloId = null
    iniciarOuPausarBt.textContent = "Começar"
    imgBtPlayOuPause.setAttribute('src' , '/imagens/play_arrow.png')
}

function mostrarTempo  (){
    const tempo = new Date (tempoCorridoEmSegundos * 1000 );
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'})
    tempoNaTela.innerHTML = `${tempoFormatado}`;
} 
mostrarTempo();

