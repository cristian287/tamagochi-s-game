const canvas = document.getElementById("canvas")
const premios = document.getElementById("puntos")
const timeText = document.getElementById("time")
const buttonStart = document.getElementById("start")
const speed = 150
buttonStart.addEventListener("click",startTimer,false)
let tiempo = 0
let puntos = 0
let premioX = 0
let premioY = 0
let actualX = 0
let actualY = 0
let contexto = canvas.getContext("2d")
function startGame(){
    canvas.classList.remove("off")
    contexto.clearRect(actualX,actualY,32,32)
    contexto.clearRect(premioX,premioY,32,32)
    tiempo = 10 //Tiempo inicial
    timeText.textContent = "Tiempo restante : " + tiempo + "s"
    contexto.fillStyle = "black"
    actualX = 0
    actualY = 0
    contexto.fillRect(actualX,actualY,32,32)
    contexto.fillStyle = "green"
    //Coordenadas de premio inicial
    premioX = 96
    premioY = 96
    contexto.fillRect(premioX,premioY,32,32) 
    contexto.fillStyle = "black"
    for (var x=0; x<=1024; x=x+32){
        contexto.moveTo(x,0);
        contexto.lineTo(x,1024);
    }
    for (var y=0; y<=1024; y=y+32){
        contexto.moveTo(0,y);
        contexto.lineTo(1024,y);
    }
    puntos = 0
    premios.textContent = "Puntos : " + puntos
    contexto.stroke(); //Dibujar el cuadriculado
    let rememberLetter = undefined
}
let keyboard = function(e){
    if ((event.key === "s") || (event.key === "S") || (event.key === "w") || (event.key === "W") || ((event.key === "a") || (event.key === "A") || ((event.key === "d") || (event.key === "D")))){
        document.removeEventListener("keydown",keyboard,false)
        setTimeout(() => {
            addEvent()
            if ((actualX == premioX) && (actualY == premioY)){//Si se consigue el premio:
                puntos++
                tiempo = tiempo + 3
                tiempo.textContent = "Puntos : " + puntos
                premios.textContent = "Puntos : " + puntos
                respawnReward()
            }
        }, speed);
    }
    if ((event.key === "s") || (event.key === "S")){
        console.log("Abajo")
        if (actualY + 32 > 448){}
        else{
            contexto.clearRect(actualX,actualY,31,31)
            actualY = actualY + 32
            contexto.fillRect(actualX,actualY,32,32)
        }
    }
    if ((event.key === "w") || (event.key === "W")){
        console.log("Arriba")
        if (actualY - 32 < 0){}
        else{
            contexto.clearRect(actualX,actualY,31,31)
            actualY = actualY - 32
            contexto.fillRect(actualX,actualY,32,32)
        }
    }
    if ((event.key === "a") || (event.key === "A")){
        console.log("Izquierda")
        if (actualX - 32 < 0){}
        else{
            contexto.clearRect(actualX,actualY,31,31)
            actualX = actualX - 32
            contexto.fillRect(actualX,actualY,32,32)
        }
    }
    if ((event.key === "d") || (event.key === "D")){
        console.log("Derecha")
        if (actualX + 32 > 992){}
        else{
            contexto.clearRect(actualX,actualY,31,31)
            actualX = actualX + 32
            contexto.fillRect(actualX,actualY,32,32)
            }
        }
    }
function addEvent(){
    if (tiempo>0){
        document.addEventListener("keydown",keyboard,false)
    }
}
function respawnReward(){
    premioX = 9999
    premioY = 9999
    setTimeout(() => {
        premioX = RNG("x",30)
        premioY = RNG("y",14)
        contexto.fillStyle = "green"
        contexto.fillRect(premioX,premioY,32,32)
        contexto.fillStyle = "black"
    }, 1000);
}

function RNG(cord,maximo){
    let testing
    if (cord == "x"){testing = premioX}
    else{testing = premioY}
    let aleatoriedad
    do{aleatoriedad = (Math.round(Math.random()*maximo))*32}while((aleatoriedad === testing))
    return aleatoriedad;
}
function startTimer(){
    buttonStart.removeEventListener("click",startTimer,false)
    addEvent()
    timing()
}
function timing(){
    setTimeout(() => {
        tiempo --
        if (tiempo !== 0){
            timeText.textContent = "Tiempo restante : " + tiempo + "s"
            timing()
        }
        else{
            canvas.classList.add("off")
            document.removeEventListener("keydown",keyboard,false)
            timeText.textContent = "Tiempo finalizado!"
            buttonStart.textContent = "Reiniciar"
            buttonStart.addEventListener("click",buttonDos,false)
        }
    }, 1000);
}
let buttonDos = function(e){
    buttonStart.removeEventListener("click",buttonDos,false)
    buttonStart.textContent = "Start"
    buttonStart.addEventListener("click",startTimer,false)
    startGame()
}
startGame()