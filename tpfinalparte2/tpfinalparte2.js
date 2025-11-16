//Odín Arcade
//Santino Xavier Contrera y Elias Del Río
//Comision 3, David Bedoian
//Youtube: https://youtu.be/Mw3aHNKDsNE

let miJuego;
let fontGreconian
let protaSounds = {};
let enemigoSounds = {};
let uiSounds = {};
let protaSprites = {};
let enemigoSprites = {};
let vidaSprites = {};
let ultiSprites = {};
const PROTA_ANCHO = 70;
const PROTA_ALTO = 70;

function setup() {
  createCanvas(640, 480);
  noSmooth();
  miJuego= new Juego();
  getAudioContext().suspend();
}

function preload() {
  imgFondo = loadImage('fondo.png'); 
  imgMenu = loadImage('menu.png');
  imgLose = loadImage ('lose.png');
  imgWin = loadImage ('win.png');
  imgInstru = loadImage('instrucciones.png');
  imgCred = loadImage('creditos.png');
  fontGreconian = loadFont('Greconian.ttf');
  
  uiSounds['musica_menu'] = loadSound('instrucciones.ogg'); 
  uiSounds['musica_menu'].setVolume(0.2);
  
  uiSounds['musica_juego'] = loadSound('gameplay.ogg');
  uiSounds['musica_juego'].setVolume(0.1);
  
  uiSounds['boton_avanzar'] = loadSound('botonmenu.ogg');
  
  protaSounds['ataque_normal'] = loadSound('normal.ogg');
  protaSounds['ataque_ulti'] = loadSound('ulti.ogg');
  protaSounds['dano'] = loadSound('danoprota.ogg');
    
  enemigoSounds['muere'] = loadSound('enemigomuere.ogg');
  
  protaSprites['abajo'] = [
    loadImage('abajo0.png'),
    loadImage('abajo1.png'),
    loadImage('abajo2.png'),
    loadImage('abajo3.png')
  ];
  
  vidaSprites['3'] = loadImage('vida1.png');
  vidaSprites['2'] = loadImage('vida2.png');
  vidaSprites['1'] = loadImage('vida3.png');
  
  ultiSprites['listo'] = loadImage('ulti0.png'); 
  ultiSprites['cooldown'] = loadImage('ulti1.png');
  
  enemigoSprites['tanque'] = [
    loadImage('tanque0.png'),
    loadImage('tanque1.png')
  ];
  
  enemigoSprites['normal'] = [
    loadImage('normal0.png'),
    loadImage('normal1.png')
  ];
  
  protaSprites['arriba'] = [
    loadImage('arriba0.png'),
    loadImage('arriba1.png'),
    loadImage('arriba2.png'),
    loadImage('arriba3.png')
  ];

  protaSprites['izquierda'] = [
    loadImage('izquierda0.png'),
    loadImage('izquierda1.png'),
    loadImage('izquierda2.png'),
    loadImage('izquierda3.png')
  ];
  
  protaSprites['derecha'] = [
    loadImage('derecha0.png'),
    loadImage('derecha1.png'),
    loadImage('derecha2.png'),
    loadImage('derecha3.png')
  ];
  
  protaSprites['ataque_abajo'] = loadImage('ataquedown.png');
  protaSprites['ataque_arriba'] = loadImage('ataqueup.png');
  protaSprites['ataque_izquierda'] = loadImage('ataqueleft.png');
  protaSprites['ataque_derecha'] = loadImage('ataqueright.png');
  
  protaSprites['ulti_abajo'] = loadImage('ultidown.png');
  protaSprites['ulti_arriba'] = loadImage('ultiup.png');
  protaSprites['ulti_izquierda'] = loadImage('ultileft.png');
  protaSprites['ulti_derecha'] = loadImage('ultiright.png');
}

function draw() {
  image(imgFondo, 0, 0, width, height);
  
  if (miJuego.enMenu){
    miJuego.mostrarPantallaInicio();
    return;
  }
  
  if (miJuego.enInstrucciones) {
    miJuego.mostrarPantallaInstrucciones();
    return;
  }
  
  if (miJuego.gameOver === false) {
  miJuego.actualizar();
  }
  
  if (miJuego.gameOver) {
    if (miJuego.enCreditos){
        miJuego.mostrarPantallaCreditos();
    }
    
    else if (miJuego.vida > 0) {
      miJuego.mostrarPantallaVictoria();
    } else {
      miJuego.mostrarPantallaFinal();
    }
    return; // Detiene la ejecución de draw() para no dibujar HUD
  }
  
   if (miJuego.gameOver == false) {
    fill(255,50,50);
    textFont(fontGreconian);
    textSize(25);
    
    let vidaActual = constrain(miJuego.vida, 0, 3);
    let imgVida = vidaSprites[vidaActual.toString()];
    if (imgVida) {
    const HUD_W = 150;
    const HUD_H = 70;
    image (imgVida, 0, 0, HUD_W, HUD_H);
    }
    
    let ultiLista = miJuego.cooldownUlti === 0;
    let tiempoRestante = ceil(miJuego.cooldownUlti / 60);
    const ICONO_W = 69;
    const ICONO_H = 69;
    const ICONO_X = width - ICONO_W - 15;
    const ICONO_Y = height - ICONO_H - 15;
    
    let imgUlti;
    
    if (ultiLista){
       imgUlti = ultiSprites['listo'];
    } else {
        imgUlti = ultiSprites['cooldown'];
    }
    
    if (imgUlti){
        image(imgUlti, ICONO_X, ICONO_Y, ICONO_W, ICONO_H);
    }
    
    
    const MAX_SEGUNDOS = 60;
    
    let segundosTranscurridos = floor(miJuego.gameFrameCount / 60);
    let segundosRestantes = constrain(MAX_SEGUNDOS - segundosTranscurridos, 0, MAX_SEGUNDOS);
    let tiempoFormateado = nf(segundosRestantes, 2);
    
    let textoTiempo = tiempoFormateado + "s";
    
    textSize (25);
    fill(64,0,0);
    noStroke();
    rect(560, 10, 120, 35);
    fill(255,255,255);
    textAlign(RIGHT,CENTER);
    text(textoTiempo, width - 15, 26);

    
    if (segundosRestantes <= 0 && miJuego.tiempoTerminado === false) {
       miJuego.tiempoTerminado = true;
    }
  }
}

function keyPressed(){
  if (!miJuego) { // <--- ¡Añade esta línea!
   return;
 }
  
 if (key === 'r' || key === 'R') {
   uiSounds['musica_menu'].stop();
   uiSounds['musica_juego'].stop();
   miJuego.reiniciar();
   uiSounds['musica_menu'].loop();
   return;
 }
 
 if (keyCode === 32){
   
   userStartAudio(); 
   
   if (miJuego.enMenu || miJuego.enInstrucciones || miJuego.gameOver) {
       uiSounds['boton_avanzar'].play();
   }
   
   if (miJuego.enMenu) {
      uiSounds['musica_menu'].loop();
      miJuego.enMenu = false; 
      miJuego.enInstrucciones = true;
      return;
   }
   
   if (miJuego.enInstrucciones){
      uiSounds['musica_menu'].stop();
      uiSounds['musica_juego'].loop();
      miJuego.reiniciar();
      miJuego.enInstrucciones = false;
      miJuego.enMenu = false;
      miJuego.gameOver = false;
      return;
   }
       
   if (miJuego.gameOver && miJuego.enCreditos === false){
      uiSounds['musica_juego'].stop();
      miJuego.enCreditos = true;
      return;
   }
     
   if (miJuego.enCreditos){
     uiSounds['musica_menu'].loop();
     miJuego.enCreditos = false;
     miJuego.enMenu = true;
     return;
   }
 }
 

 if (miJuego.enMenu === false && miJuego.gameOver === false){
 
 
   if (key === 'x' || key === 'X') { 
    protaSounds['ataque_normal'].play(); 
    miJuego.p.direccionAtaque = miJuego.p.direccion;
    miJuego.tiempoAtaque = 8;
   }
   
   if ((key === 'c' || key === 'C') && miJuego.cooldownUlti === 0) {
    protaSounds['ataque_ulti'].play();
    miJuego.p.direccionAtaque = miJuego.p.direccion;
    miJuego.tiempoUlti = 25;
    miJuego.cooldownUlti = miJuego.cooldownUltiMax;
   }
   
 }
}

class Juego {
  constructor() {
    this.p = new Personaje( width/2, height/2 );
    this.enemigos = [];
    this.vida = 3;
    this.gameOver = false; 
    this.tiempoTerminado = false;
    this.radioAtaque = 60; 
    this.tiempoAtaque = 0;
    this.radioUlti = 100;
    this.tiempoUlti = 0;
    this.cooldownUltiMax = 240;
    this.cooldownUlti = 0;
    this.intervaloGeneracion = 120;
    this.gameFrameCount = 0;
    this.enMenu = true;
    this.enCreditos = false;
    this.enInstrucciones = false;
    this.startButtonArea = {}
    }
    
   reiniciar() {
   this.p = new Personaje( width/2, height/2);
   this.enemigos = [];
   this.vida = 3;
   this.gameOver = false; 
   this.enMenu = true;
   this.enCreditos = false;
   this.enInstrucciones = false;
   this.tiempoUlti = 0;
   this.cooldownUlti = 0;
   this.intervaloGeneracion = 120;
   this.gameFrameCount = 0;
   this.tiempoTerminado = false;
  }

  actualizar() {
    if (this.gameOver) {
      return;}
      
     this.gameFrameCount++; 
     
     if (this.cooldownUlti > 0) {
       this.cooldownUlti--;
     }
     
     if (this.tiempoTerminado === false && this.gameFrameCount % 120 === 0) { 
     if (this.intervaloGeneracion > 30) { 
        this.intervaloGeneracion -= 4;
       }
     }
      
      if (this.tiempoAtaque > 0) {
        this.tiempoAtaque--;
      }
      
      if (this.tiempoUlti > 0){
         this.tiempoUlti--;
       }
      
      
    this.p.actualizar();
    this.generarEnemigos();
    this.actualizarEnemigos();
  }
  
  generarEnemigos(){
    if (this.tiempoTerminado === false && this.gameFrameCount % this.intervaloGeneracion == 0) {
       const MIN_SPAWN_DIST = 150;
       let x, y, distancia;
       const SUELO_Y = 230;
       
       do {
       x = random(width);
       y = random(SUELO_Y, height); 
       distancia = dist(x, y, this.p.x, this.p.y);
       } while (distancia < MIN_SPAWN_DIST);
       
       let nuevoTipo = 'normal';
       
       const TIEMPO_INICIO_TANQUE = 600;
       const TIEMPO_FINAL = 3600
       
       if (this.gameFrameCount > TIEMPO_INICIO_TANQUE) {
         let progreso = map(this.gameFrameCount, TIEMPO_INICIO_TANQUE, TIEMPO_FINAL, 0, 1);
         progreso = constrain (progreso, 0, 1);
         
         let probTanque = 0.05 + progreso * 0.3;
         
         if (random() < probTanque) {
             nuevoTipo = 'tanque';
         }
       }
       
       this.enemigos.push(new Enemigo (x,y,nuevoTipo));
       
   }
  } 
 
 actualizarEnemigos() {
   //ciclo for anidado recorre lista enemigos para kill
   for (let i = this.enemigos.length - 1; i >= 0; i--){
     let enemigo = this.enemigos[i];
     
     enemigo.actualizar(this.p); //mueve,dibuja,colision ctr personaje
   
    let impactoDeAtaque = this.tiempoAtaque > 0 && enemigo.colisionaConAtaque(this.p, this.radioAtaque);
    
    let impactoDeUlti = this.tiempoUlti > 0 && enemigo.colisionaConAtaque(this.p, this.radioUlti);
    
    let colisionaConPersonaje = enemigo.colisionaCon(this.p);
    
    if(impactoDeUlti){
    enemigo.vida -= 2;
      if (enemigo.vida <= 0){
      enemigoSounds['muere'].play();
        this.enemigos.splice(i,1);
           if (this.tiempoTerminado && this.enemigos.length === 0) {this.chequearVictoria();}
      }
    }
    
    else if (impactoDeAtaque) {
      if (enemigo.tiempoInvulnerabilidad === 0){
       enemigo.vida--;
       
       enemigo.tiempoInvulnerabilidad = 13;
       
      if (enemigo.tipo === 'tanque' && enemigo.vida > 0) {
        enemigo.aplicarRetroceso(this.p, 20); 
       }
       
       if (enemigo.vida <= 0){
         enemigoSounds['muere'].play();
         this.enemigos.splice(i,1);
         if (this.tiempoTerminado && this.enemigos.length === 0) {this.chequearVictoria();}
      }
     }
    }
     else if (colisionaConPersonaje) {
       protaSounds['dano'].play();
       this.vida--;
       
       if (this.vida <= 0) {
       uiSounds['musica_juego'].stop();
       this.gameOver = true;
       this.mostrarPantallaFinal();
       this.enemigos.splice(i,1);}
       
       else { 
         enemigoSounds['muere'].play();
         this.enemigos.splice(i,1);
         if (this.enemigos.length === 0 && this.tiempoTerminado){this.chequearVictoria();
         }
       }
       
     } } }
     
     mostrarPantallaCreditos(){
     push();
     image(imgCred, 0, 0, width, height);
     fill(255,255,255);
     textSize(20);
     textAlign(CENTER,CENTER);
     text("PULSA ESPACIO para volver al Menú", width/2, height - 50);
     pop();
     }
     
     mostrarPantallaInstrucciones(){
     push();
     image(imgInstru, 0, 0, width, height);
     pop();
     }
     
     mostrarPantallaInicio() {
     push();
     image(imgMenu, 0, 0, width, height);
     pop();
     }
     
     mostrarPantallaFinal() {
       push();
       image(imgLose, 0, 0, width, height);
       fill(0, 0, 0);
       textSize(20);
       textAlign(CENTER,CENTER);
       text("PULSA ESPACIO para ir a Créditos", width/2, height/2 + 110);
       text("PULSA R para reiniciar", width/2, height/2 + 130);
       pop();
      }
      
     chequearVictoria() {
      if (this.enemigos.length === 0 && this.vida > 0){
        this.mostrarPantallaVictoria();
        this.gameOver = true;}
    }
      
     mostrarPantallaVictoria() {
      push();
      image(imgWin, 0, 0, width, height);
      fill(0);
      textFont (fontGreconian);
      textAlign(CENTER, CENTER);
      textSize(24);
      text("PULSA ESPACIO para ir a Créditos", width/2, height/2 + 60);
      text("Presiona R para reiniciar", width/2, height/2 + 80);
      pop();
      } 
}


class Personaje {
  constructor( x_, y_ ) {
    this.ancho = PROTA_ANCHO; 
    this.alto = PROTA_ALTO;
    this.rad = 25
    this.frameIndex = 0;
    this.direccion = 'abajo';
    this.estaMoviendo = false;
    this.contador = 0;
    this.velocidadAnimacion = 8;
    this.x  = x_;
    this.y = y_ ;
    this.velocidad = 3;
    this.direccionAtaque = 'abajo';
  }

  actualizar() {
    this.mover();
    this.animar();
    this.dibujar();
  }

  mover() {
    this.estaMoviendo = false;
    if ( keyIsDown(65) || keyIsDown(LEFT_ARROW) ) { // 'A' o Flecha Izquierda
     this.x -= this.velocidad;
     this.direccion = 'izquierda';
     this.estaMoviendo = true;
  }
  
  if ( keyIsDown(68) || keyIsDown(RIGHT_ARROW) ) { // 'D' o Flecha Derecha
    this.x += this.velocidad;
    this.direccion = 'derecha';
    this.estaMoviendo = true;
  }
  
  if ( keyIsDown(87) || keyIsDown(UP_ARROW) ) { // 'W' o Flecha Arriba
    this.y -= this.velocidad;
    this.direccion = 'arriba';
    this.estaMoviendo = true;
  }
  
  if ( keyIsDown(83) || keyIsDown(DOWN_ARROW) ) { // 'S' o Flecha Abajo
    this.y += this.velocidad;
    this.direccion = 'abajo';
    this.estaMoviendo = true;
  }
  
this.x = constrain(this.x, this.rad, width - this.rad);
  this.y = constrain(this.y, this.rad, height - this.rad);
}

animar() {
  if (this.estaMoviendo) {
    this.contador++;
    
    if (this.contador >= this.velocidadAnimacion) {
      // Avanza el índice del frame (0 -> 1 -> 2 -> 0)
      this.frameIndex++;
      
      // Si llega al final del arreglo (frame 3), vuelve al inicio (frame 1 si quieres 
      // quitar el frame de reposo, o frame 0 si quieres el ciclo completo)
      if (this.frameIndex >= protaSprites[this.direccion].length) {
        this.frameIndex = 0; 
      }
      this.contador = 0;
    }
  } else {
    // Si no se está moviendo, usa el primer frame (reposo) de la dirección actual
    this.frameIndex = 0; 
    this.contador = 0;
  }
}

  dibujar() {
  let img;
  let w = this.ancho;
  let h = this.alto;
  
  if (miJuego.tiempoUlti > 0){
     let spriteKey = 'ulti_' + this.direccionAtaque;
      img = protaSprites[spriteKey];
      w = 250;
      h = 250;
  }
  
  else if (miJuego.tiempoAtaque > 0){
     let spriteKey = 'ataque_' + this.direccionAtaque;
      img = protaSprites[spriteKey];
      w = 148;
      h = 148;
  }  else  {
        img = protaSprites[this.direccion][this.frameIndex];
  }
  
  image(
      img, 
        this.x - w / 2, 
        this.y - h / 2, 
        w, 
        h
    );
    

    //noFill();
    //stroke(255, 0, 0, 150); 
    //ellipse(this.x, this.y, this.rad * 2, this.rad * 2);

  }
}

 class Enemigo {
    constructor(x_, y_, tipo_ = 'normal') {
          this.x = x_;
          this.y = y_;
          this.tipo = tipo_;
          
          this.frameIndex = 0;
          this.contador = 0;
          this.velocidadAnimacion = 10;
          this.tiempoInvulnerabilidad = 0;
          
          if (this.tipo === 'tanque'){
          this.rad = 40;
          this.velocidad = 0.8;
          this.vida = 2;
          this.ancho = 100;
          this.alto = 100;
          
          }
          else {
          this.rad = 25;
          this.velocidad = 1.5;
          this.vida = 1;
          this.ancho = 70;
          this.alto = 70;
          }
  }
  
  colisionaConAtaque(personaje,radioAtaque){
      let d = dist(this.x, this.y, personaje.x, personaje.y);
      return d < this.rad + radioAtaque;
  }
  
  actualizar(personaje) {
    
    if (this.tiempoInvulnerabilidad > 0){
        this.tiempoInvulnerabilidad--; }
    
    this.mover(personaje);
    this.animar();
    this.dibujar();
    
  }
  //ia se mueve al personaje
  mover(personaje) {
    //calcula la diferencia en x y y
    let dx= personaje.x - this.x;
    let dy= personaje.y - this.y;
    
    let angulo = atan2(dy, dx);
    
    this.x += cos(angulo) * this.velocidad;
    this.y += sin(angulo) * this.velocidad; 
  }
  
 aplicarRetroceso(personaje, fuerza){
   
  let dx = personaje.x - this.x;
  let dy = personaje.y - this.y;
  let distancia = dist(0,0,dx,dy);
  if (distancia > 0){
   this.x -= (dx / distancia) * fuerza;
   this.y -= (dy / distancia) * fuerza;
   }
   
  this.x = constrain(this.x, this.rad, width - this.rad);
  this.y = constrain(this.y, this.rad, height - this.rad);
  }
  
  animar(){
    this.contador++;
    
    if (this.contador >= this.velocidadAnimacion){
      let sprites = enemigoSprites[this.tipo];
      
      this.frameIndex++;
      
      if (this.frameIndex >= sprites.length){
        this.frameIndex = 0;
      }
      this.contador = 0;
    }
  }
  
  colisionaCon(otroObjeto) {
    let d = dist(this.x, this.y, otroObjeto.x, otroObjeto.y);
    return d < this.rad + otroObjeto.rad;
  }
  
  dibujar() {
    push();
    
    let img = enemigoSprites[this.tipo][this.frameIndex];
    
    if (this.tiempoInvulnerabilidad > 0 && frameCount % 2 === 0){
    } else {
    
    
    image(
      img,
      this.x - this.ancho / 2,
      this.y - this.alto / 2,
      this.ancho,
      this.alto
    );
   }
    
    //noFill();
    //stroke(255, 0, 0, 100);
    //ellipse(this.x, this.y, this.rad * 2); //ver radio colision
    
    pop();
  }
 }
