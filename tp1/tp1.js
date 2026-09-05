let framesCaminar = [];
let framesSaltar = [];
let imgFondo;

let posX = -50; 
let posY = 518; 

let posxFondo = 0;
let anchoFondo = 2000; 

let estadoActual = "espera_inicial";
let velocidadAnimacion = 6; 
let duracionSalto = 0; 

let contadorTiempo = 0; 
let cantidadSaltos = 0; 
let yaFreno = false; 

function preload() {
  imgFondo = loadImage("data/fondo.jpg");

  for (let i = 0; i < 3; i++) {
    framesCaminar.push(loadImage("data/caminar" + i + ".png"));
  }
  for (let i = 0; i < 3; i++) {
    framesSaltar.push(loadImage("data/saltar" + i + ".png"));
  }
}

function setup() {
  createCanvas(800, 600);
  frameRate(60); 
}

function draw() {
  image(imgFondo, posxFondo, 0, anchoFondo, height);
  image(imgFondo, posxFondo + anchoFondo, 0, anchoFondo, height);
  
  if ((estadoActual === "caminar" || estadoActual === "saltar") && estadoActual !== "fin") {
    posxFondo -= 1; 
    if (posxFondo <= -anchoFondo) {
      posxFondo = 0;
    }
  }

  if (estadoActual === "espera_inicial") {
    contadorTiempo++;
    if (contadorTiempo > 180) { 
      estadoActual = "caminar";
      contadorTiempo = 0; 
    }
    
  } else if (estadoActual === "caminar") {
    posX += 2; 
    posY = 518; 
    
    if (posX > 150 && yaFreno === false) {
      estadoActual = "idle";
      contadorTiempo = 0;
      yaFreno = true; 
    }
    else if (posX > 280 && cantidadSaltos === 0) {
      estadoActual = "saltar";
      duracionSalto = 0;
      cantidadSaltos = 1;
    }
    else if (posX > 580 && cantidadSaltos === 1) {
      estadoActual = "saltar";
      duracionSalto = 0;
      cantidadSaltos = 2;
    }
    else if (posX > 750 && cantidadSaltos === 2) {
      estadoActual = "fin";
    }
    
  } else if (estadoActual === "idle") {
    contadorTiempo++;
    if (contadorTiempo > 120) { 
      estadoActual = "caminar"; 
      contadorTiempo = 0;
    }
    
  } else if (estadoActual === "saltar") {
    duracionSalto++; 
    posX += 2; 
    
    let progresoSalto = map(duracionSalto, 0, 140, 0, PI);
    posY = 518 - sin(progresoSalto) * 140; 
    
    if (duracionSalto > 140) {
      estadoActual = "caminar";
      posY = 518; 
    }
  } else if (estadoActual === "fin") {
  }

  let indiceFrame = 0;
  let escalaMario = 2.5; 
  
  if (estadoActual === "espera_inicial" || estadoActual === "idle" || estadoActual === "fin") {
    dibujarPersonaje(framesCaminar[0], posX, posY, escalaMario);
    
  } else if (estadoActual === "caminar") {
    indiceFrame = calcularIndiceFrame(framesCaminar.length, velocidadAnimacion);
    dibujarPersonaje(framesCaminar[indiceFrame], posX, posY, escalaMario);
    
  } else if (estadoActual === "saltar") {
    if (duracionSalto < 25) {
      indiceFrame = 0; 
    } else if (duracionSalto < 50) {
      indiceFrame = 1; 
    } else {
      indiceFrame = 2; 
    }
    dibujarPersonaje(framesSaltar[indiceFrame], posX, posY, escalaMario);
  }
}

function calcularIndiceFrame(totalFrames, velocidad) {
  let indice = floor(frameCount / velocidad) % totalFrames;
  return indice;
}

function dibujarPersonaje(imgSprite, x, y, escala) {
  push();
  let hFinal = imgSprite.height * escala;
  let wFinal = imgSprite.width * escala;
  image(imgSprite, x - wFinal / 2, y - hFinal, wFinal, hFinal);
  pop();
}

//reinicio con tecla R

function keyPressed() {
  if (key === 'r' || key === 'R') {
    posX = -50; 
    posY = 518;
    posxFondo = 0; 
    estadoActual = "espera_inicial";
    duracionSalto = 0;
    contadorTiempo = 0;
    cantidadSaltos = 0; 
    yaFreno = false; 
  }
}
