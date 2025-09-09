//https://youtu.be/hEvURn8MOPY

//PImage referencia;
var cuadradoX;
var cuadradoY;
var cuadradoW;
var cuadradoH;
var color1 = 100;
var color2 = 255;
var color3 = 0;
var i;
var ib;
var giroA = 0;
var giroB = 1;

function preload() {
  referencia = loadImage("data/referencia.jpg");
}

function setup()
{
  createCanvas(800, 400);
}

function draw() {
  background(150);
  //image(referencia,0,0,width/2,width/2);
  for (i=0; i<width; i+=100) {                           //gris
    for (ib=0; ib<width; ib+= 98) {
      push();
      translate(ib, i);
      rotate(radians(45)+frameCount*-0.1);
      scale(0.1+sin(frameCount*0.05));
      rectMode(CENTER);
      fill(color1);
      rect(0, 0, 70, 70);
      pop();
    }
  }
  for (i=50; i<width; i+=200) {                        //blanco
    for (ib=50; ib<width; ib+=100) {
      push();
      translate(ib, i);
      fill(color2);

      if (giroB == 0) {
        rotate(radians(45)+frameCount*0.1);
      } else if (giroB == 1) {
        rotate(radians(45));
      }

      rectMode(CENTER);
      rect(0, 0, 70, 70);
      pop();
    }
  }
  for (i=-50; i<width; i+=200) {                      //negro
    for (ib=50; ib<width; ib+=100) {
      push();
      translate(ib, i);
      if (giroA == 0) {
        rotate(radians(45)+frameCount*0.1);
      } else if (giroA == 1) {
        rotate(radians(45));
      }
      fill(color3);
      rectMode(CENTER);
      rect(0, 0, 70, 70);
      pop();
    }
  }
  image(referencia, 0, 0, width/2, width/2);
}
//DECLARAR UNA FUNCION QUE DEVUELVA VERDADERO O FALSO (var) EN CASO DE QUE EL MOUSE ESTÉ SOBRE LA IMAGEN

function mouseOnImage() {
  var imagenX = 0;
  var imagenY = 0;
  var imagenW = width / 2;
  var imagenH = width / 2;
  if (mouseX >= imagenX && mouseX <= imagenX + imagenW &&
    mouseY >= imagenY && mouseY <= imagenY + imagenH) {
    return true;
  } else {
    return false;
  }
}


function KILLColorChange() {
  color1 = 100;
  color2 = 255;
  color3 = 0;
}

function colorChange() {                             //para que cambie de color con una tecla
  if (color1 == 100)
  {
    color1 = 200;
  } /*else
   {
   color1 = 100;
   }*/
  if (color2 == 255) {
    color2 = 0;
  } /*else
   {
   color2 = 0;
   }*/
  if (color3 == 0) {
    color3 = 255;
  } /*else
   {
   color3 = 0;
   }
   return;*/
}

function patrgiro() {                                //Para que gire con el click
  if (giroA == 0)
  {
    giroA = 1;
  } else {
    giroA = 0;
  }
  if (giroB == 0)
  {
    giroB = 1;
  } else {
    giroB = 0;
  }
}


//USAR DICHA FUNCION PARA EL IF DEL MOUSEPRESSED :)
function mousePressed() {
  var MouseEnImagen = mouseOnImage();
  if (!MouseEnImagen) {
    patrgiro();
  }
}
function keyPressed() {
  if (key == 'c')
  {
    colorChange();
  }
}
function keyReleased() {
  if (key == 'c')
  {
    KILLColorChange();
  }
}
