//https://youtu.be/wlvijDEhDP4

let pantalla = 0;
let imagenes = [];
let botonX, botonY, botonW, botonH;
let accion;
let miFuente;
let miMusica;

function preload() {
    miFuente = loadFont("data/futura.ttf");
    miMusica = loadSound("data/skyrim.mp3");
    imagenes[0] = loadImage("data/img00.png");
    imagenes[1] = loadImage("data/img1.png");
    imagenes[2] = loadImage("data/img2.png");
    imagenes[3] = loadImage("data/img3.png");
    imagenes[4] = loadImage("data/img4final1.png");
    imagenes[5] = loadImage("data/img5.png");
    imagenes[6] = loadImage("data/img6.png");
    imagenes[7] = loadImage("data/img7.png");
    imagenes[8] = loadImage("data/img8.png");
    imagenes[9] = loadImage("data/img9.png");
    imagenes[10] = loadImage("data/img10.png");
    imagenes[11] = loadImage("data/img11final2.png");
    imagenes[12] = loadImage("data/img12.png");
    imagenes[13] = loadImage("data/img13.png");
    imagenes[14] = loadImage("data/img14.png");
    imagenes[15] = loadImage("data/img15final3.png");
    imagenes[16] = loadImage("data/img16.png");
}

function setup() {
    createCanvas(640, 480);
    miMusica.setVolume(0.4);
    botonW = 150;
    botonH = 40;
    botonX = width - botonW - 20;
    botonY = height - botonH - 20;
}

function botonSiguiente(texto, funcionAccion) {
    accion = funcionAccion; 
    fill(255);
    stroke(0);
    rect(botonX, botonY, botonW, botonH, 6);
    noStroke();
    fill(0);
    textAlign(CENTER, CENTER);
    textSize(25);
    text(texto, botonX + botonW / 2, botonY + botonH / 2);
}

function draw() {
  
 background(145);
   textFont(miFuente);
   textSize(27);
   textAlign(CENTER,CENTER);
   
  if (pantalla === 0) {
   image(imagenes[0],0,0,width,height);
   botonSiguiente("Empezar", () => pantalla = 1);
 } 
  
 if (pantalla === 1) {
   image(imagenes[1],0,0,width,height);
   botonSiguiente("Continuar", () => pantalla = 2);
  fill(255,150);
   rect(0, 23, width, 40);
   fill(0);
   text("Odín caminó montañas hasta encontrarse a Mímir, y su pozo",320,40); 
   } 

   else if (pantalla === 2) {
   image(imagenes[2],0,0,width,height);
   fill(255,150);
   rect(0, 425, width, 40);
   fill(0);
   text("Al llegar, Mímir le permite beber de su pozo?",320,440); 
  dibujarBotonOpcion("Odín no bebe del pozo", 50, 50, () => pantalla = 3);
  dibujarBotonOpcion("Odín bebe del pozo", width - 170, 50, () => pantalla = 5);
  } 

  else if (pantalla === 3) {
   image(imagenes[3],0,0,width,height);
   fill(255,150);
   rect(0, 35, width, 80);
   fill(0);
   text("Al no poder beber del Pozo, Odín no obtiene la sabiduría y no se vuelve el Rey de Reyes.", 50, 20, width - 100, 100);
   botonSiguiente("Continuar", () => pantalla = 4);
  } 
  
  else if (pantalla === 4) {
   image(imagenes[4],0,0,width,height);
    fill(255,150);
   rect(0, 55, width, 80);
   fill(0);
    text("Mímir nunca se convierte en sirviente de Odín, y vive tranquilo en su cueva por siempre.", 50, 40, width - 100, 100);
   botonSiguiente("Reiniciar", () => pantalla = 0);
  } 

  else if (pantalla === 5) {
   image(imagenes[5],0,0,width,height);
   fill(255,150);
   rect(0, 35, width, 80);
   fill(0);
   text("Odín da su ojo a cambio y consigue beber del Pozo, así obteniendo inconmensurable sabiduría y conocimiento.", 50, 20, width - 100, 100);
   botonSiguiente("Continuar", () => pantalla = 6);
  } 

  else if (pantalla === 6) {
   image(imagenes[6],0,0,width,height);
   fill(255,150);
   rect(0, 35, width, 80);
   fill(0);
   text("Tiempo despues de Odín convertirse el Rey de Todo, una guerra Vanir y Aesir se desata, conllevando miles de muertes.", 50, 20, width - 100, 100);
   botonSiguiente("Continuar", () => pantalla = 7);
  } 

 else if (pantalla === 7) {
   image(imagenes[7],0,0,width,height);
   fill(255,120);
   rect(0, 35, width, 80);
   fill(0);
   text("Mímir y el Dios Hoenir son enviados por Odín como ofrenda de paz a los Vanir", 50, 20, width - 100, 100);
   botonSiguiente("Continuar", () => pantalla = 8);
  } 

  else if (pantalla === 8) {
   image(imagenes[8],0,0,width,height);
   fill(255,150);
   rect(0, 35, width, 80);
   fill(0);
   text("Hoenir se convierte en Rey de los Vanir, y Mímir su consejero", 50, 20, width - 100, 100);
   botonSiguiente("Continuar", () => pantalla = 9);
  } 

  else if (pantalla === 9) {
   image(imagenes[9],0,0,width,height);
   fill(255,150);
   rect(0, 400, width, 80);
   fill(0);
    text("Mímir se ausenta, ¿Hoenir es suficiente Rey para gobernar sin sus consejos?", 50, 390, width - 100, 100);
 dibujarBotonOpcion("Hoenir puede gobernar", 50, 50, () => pantalla = 10);
 dibujarBotonOpcion("Hoenir no puede", width - 170, 50, () => pantalla = 12);
  } 

  else if (pantalla === 10) {
   image(imagenes[10],0,0,width,height);
   fill(255,150);
   rect(0, 30, width, 80);
   fill(0);
   text ("Hoenir demuestra poder liderar solo, los Vanir contentos lo celebran.", 50, 20, width - 100, 100);
   botonSiguiente("Continuar", () => pantalla = 11);
  } 

  else if (pantalla === 11) {
   image(imagenes[11],0,0,width,height);
   fill(255,150);
   rect(0, 45, width, 80);
   fill(0);
   text ("Mímir disfruta de su tiempo, mientras siguen en buenos terminos con los Vanir.", 50, 30, width - 100, 100);
   botonSiguiente("Reiniciar", () => pantalla = 0);
  } 

  else if (pantalla === 12) {
   image(imagenes[12],0,0,width,height);
   fill(255,150);
   rect(0, 15, width, 80);
   fill(0);
   text("Los Vanir se dan cuenta de que Hoenir no puede liderar solo, lo toman como una ofensa y se rebelan.", 50, 5, width - 100, 100);
   botonSiguiente("Continuar", () => pantalla = 13);
  } 

  else if (pantalla === 13) {
  image(imagenes[13],0,0,width,height);
   fill(255,150);
   rect(0, 55, width, 40);
   fill(0);
   text("Deciden atacar a Mímir, le rebanan la cabeza.", 50, 20, width - 100, 100);
   botonSiguiente("Continuar", () => pantalla = 14);
  } 

  else if (pantalla === 14) {
   image(imagenes[14],0,0,width,height);
   fill(255,150);
   rect(0, 0, width, 80);
   fill(0);
    text("Le envían la cabeza de Mímir a Odín, quien usa magia para revivirla", 50, -15, width - 100, 100);
   botonSiguiente("Continuar", () => pantalla = 15);
  } 

  else if (pantalla === 15) {
   image(imagenes[15],0,0,width,height);
    fill(255,150);
   rect(0, 45, width, 80);
   fill(0);
   text("Odín conserva a Mímir como su consejero personal, debido a su infinito conocimiento.", 50, 25, width - 100, 100);
   botonSiguiente("Continuar", () => pantalla = 16);
  }
  else if (pantalla === 16) {
    image(imagenes[16],0,0,width,height);
   botonSiguiente("Reiniciar", () => pantalla = 0);}
} 

function dibujarBotonOpcion(texto, x, y, funcionAccion) {
  fill(255);
  stroke(0);
  rect(x, y, botonW, botonH, 6);
  noStroke();
  fill(0);
  textAlign(CENTER, CENTER);
  textSize(20);
   text(texto, x + botonW/2, y + botonH/2);
  
  if (mouseX > x && mouseX < x + botonW &&
      mouseY > y && mouseY < y + botonH) {
    if (mouseIsPressed) {
      funcionAccion();
    }
  }
}

function mouseClicked() {
    if (mouseX > botonX && mouseX < botonX + botonW &&
        mouseY > botonY && mouseY < botonY + botonH) {
        
         if (accion) {
            if (pantalla === 0 && !miMusica.isPlaying()) {
                miMusica.loop();}
            
         if (pantalla === 4 || pantalla === 11 || pantalla === 16) {
                    miMusica.stop(); }
                
            accion(); 
        }
    }   
     if (pantalla > 16) {
        pantalla = 0;
    } 
}
