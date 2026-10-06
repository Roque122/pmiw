let estado = 0;
let imagenes = [];
let botonD1;
let botonD2;
let botonContinuarImg; 

let textos = [];
textos[0] = ""; 
textos[1] = "Vas a visitar a tu vecino, el profesor Zinka, que es medio un científico loco. Entrás a la casa y lo ves a mil por hora. Te cuenta que por fin armó una máquina para viajar al hiperespacio, un lugar rarísimo donde el tiempo y el espacio hacen cualquiera.";
textos[2] = "Zinka prende la máquina que hace un ruido molesto. El aire se empieza a ver borroso, como cuando hace mucho calor en la ruta. De la nada Zinka da un paso hacia esa cosa borrosa y desaparece. La máquina queda prendida y esa especie de portal empieza a crecer.";
textos[3] = "El portal ya se está tragando los muebles del laboratorio. Tenés que decidir rápido antes de que la casa entera desaparezca o la máquina se apague y pierdas a Zinka para siempre.";
textos[9] = "Desconectás la máquina a la fuerza. El portal desaparece de golpe, pero notás algo turbio: te mirás en el vidrio de la ventana y tu reflejo se mueve un segundo más tarde que vos.";
textos[10] = "En la mesa encontrás una nota escrita con tu letra que dice: \"No salgas de la casa. La paradoja te va a atrapar\". Pero justo en ese mismo momento, escuchás a Zinka gritando ayuda desde el patio.";

function preload() {
  imagenes[0] = loadImage('data/0.jpg');
  imagenes[1] = loadImage('data/1.jpg');
  imagenes[2] = loadImage('data/2.jpg');
  imagenes[3] = loadImage('data/3.jpg');
  imagenes[9] = loadImage('data/9.jpg');
  imagenes[10] = loadImage('data/10.jpg');

  botonD1 = loadImage('data/botonD1.png');
  botonD2 = loadImage('data/botonD2.png');
  botonContinuarImg = loadImage('data/botonInicialContinuar.jpg');
}

function setup() {
  createCanvas(800, 450); 
}

function draw() {
  background(30);

  if (estado === 0) {
    if (imagenes[0]) {
      image(imagenes[0], 0, 0, 800, 450);
    } else {
      fill(20, 20, 40);
      rect(0, 0, 800, 450);
    }
    
    fill(0, 0, 0, 150); 
    rect(200, 100, 400, 200, 10);
    
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(24);
    text("Odisea en el hiper espacio", width / 2, 170);
    textSize(16);
    text("Haz clic para comenzar", width / 2, 230);
    
    dibujarBotonSimple(300, 330, 200, 45, "INICIAR");
  } 
  else {
    dibujarPantallaJuego();
    
    if (estado === 1 || estado === 2) {
      dibujarBotonContinuar(); 
    } 
    else if (estado === 3) {
      boton(100, 340, 280, 60, "te tiras detras de Zinak", botonD1, botonD2);
      boton(420, 340, 280, 60, "Desenchufar la máquina", botonD1, botonD2);
    } 
    else if (estado === 9 || estado === 10) {
      dibujarBotonContinuar();
    }
  }
}

function dibujarPantallaJuego() {
  if (imagenes[estado]) {
    image(imagenes[estado], 0, 0, 800, 450);
  } else {
    fill(40); 
    rect(0, 0, 800, 450); 
    fill(255);
    textSize(20);
    textAlign(CENTER, CENTER);
    text("(Imagen " + estado + ".jpg pendiente de carga)", width / 2, 225);
  }
  
  fill(0, 0, 0, 210);
  rect(50, 30, 700, 130, 10);
  
  push();
  fill(255);
  textSize(16);
  textAlign(LEFT, TOP);
  text(textos[estado], 75, 45, 650, 100);
  pop();
}

function boton(posX, posY, tamX, tamY, texto, bot1, bot2) {
  push();
  if (overMouse(posX, posY, tamX, tamY)) {
    image(bot1, posX, posY, tamX, tamY);
    fill(255);
    textSize(14);
    textAlign(CENTER, CENTER);
    text(texto, posX + tamX / 2, posY + tamY / 2);
  } else {
    image(bot2, posX, posY, tamX, tamY);
    fill(230);
    textSize(14);
    textAlign(CENTER, CENTER);
    text(texto, posX + tamX / 2, posY + tamY / 2);
  }
  pop();
}

function dibujarBotonSimple(posX, posY, tamX, tamY, textoBoton) {
  push();
  if (overMouse(posX, posY, tamX, tamY)) {
    fill(80, 140, 220); 
  } else {
    fill(40, 80, 150);  
  }
  rect(posX, posY, tamX, tamY, 8);
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(14);
  text(textoBoton, posX + tamX / 2, posY + tamY / 2);
  pop();
}

function dibujarBotonContinuar() {
  let posX = 300;
  let posY = 350;
  let tamX = 200;
  let tamY = 45;

  push();
  if (overMouse(posX, posY, tamX, tamY)) {
    tint(220, 240, 255); 
  } else {
    noTint();
  }
  
  if (botonContinuarImg) {
    image(botonContinuarImg, posX, posY, tamX, tamY);
  } else {
    fill(50, 120, 50);
    rect(posX, posY, tamX, tamY, 8);
  }
  noTint();
  
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(16);
  text("CONTINUAR", posX + tamX / 2, posY + tamY / 2);
  pop();
}

function overMouse(posX, posY, tamX, tamY) {
  return mouseX > posX && mouseX < posX + tamX && mouseY > posY && mouseY < mouseY + tamY;
}

function mousePressed() {
  if (estado === 0) {
    if (overMouse(300, 330, 200, 45)) {
      estado = 1; 
    }
  } 
  else if (estado === 1) { 
    if (overMouse(300, 350, 200, 45)) {
      estado = 2; 
    }
  } 
  else if (estado === 2) { 
    if (overMouse(300, 350, 200, 45)) {
      estado = 3; 
    }
  }
  else if (estado === 3) { 
    if (overMouse(420, 340, 280, 60)) {
      estado = 9;  
    }
  } 
  else if (estado === 9) {
    if (overMouse(300, 350, 200, 45)) {
      estado = 10;  
    }
  }
  else if (estado === 10) {
    if (overMouse(300, 350, 200, 45)) {
      estado = 0;  
    }
  }
}
