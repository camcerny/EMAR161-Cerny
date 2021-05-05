//Final Project for Computation and Media II Spring 2021
//A (very simple) recreation of the 1984 game Duck Hunt!
//Use the UP, DOWN, LEFT, & RIGHT arrow buttons to move your cursor, and aim for the duck! If you get him enough, you'll win!
//Also, click on the game's screen to hear the game's theme!

let myCircle;
let myPlayer;
let img;
let img2;
let img3;
let img35;
let img4;
let img5;
let img6;
let img7;
let song;
let song2;

function preload() {
  img = loadImage('crosshair.png');
  img2 = loadImage('flying duck.gif');
  img3 = loadImage('blue.jpeg');
  img35 = loadImage('duckgrass.png');
  img4 = loadImage('duckhit.png');
  img5 = loadImage('laughingdog.gif');
  img6 = loadImage('logo.png');
  img7 = loadImage('cloud.png');

}

function setup() {
  createCanvas(600, 450);

  myCircle = new Circle(random(width),
    random(height),
    50,
    random(-2, 2),
    random(-2, 2));

  myPlayer = new Player(width / 2,
    height - 100,
    20,
    'violet');
  song = loadSound('Duck Hunt theme.mp3');
  song2 = loadSound('gunshot.mp3');
}

function draw() {
  background(img3, 600, 450);
  image(img3, 600, 450);

  myCircle.move();
  myCircle.display();
  
  //cloud
  img7.resize(170, 80);
  image(img7, 350, 40);
  
  //cloud 2
  img7.resize(170, 80);
  image(img7, 50, 100);

  //DUCK HUNT DOG!
  image(img5, 225, 235);

  handleKeyboard();

  //tree/grass
  img35.resize(600, 450);
  image(img35, 0, 0);

  //gun
  myPlayer.collide(myCircle.x, myCircle.y, myCircle.r);
  myPlayer.display();

  //logo
  img6.resize(150, 100);
  image(img6, 430, 20);
}

class Player {
  constructor(x, y, size, color) {
    this.x = x;
    this.y = y;
    this.size = 20;
    this.life = 1000;
    this.color = color;
  }

  move(xinc, yinc) {
    this.x += xinc;
    this.y += yinc;
  }

  display() {
    img.resize(80, 50);
    image(img, this.x, this.y);
    fill(255);
    textSize(24);
    text(this.life, 20, 20);
  }

  collide(otherx, othery, otherr) {
    if (dist(this.x, this.y, otherx, othery) < (otherr)) {

      //GUNSHOTS/FLASH
      if (song2.isPlaying()) {
        song2.stop();
      } else {
        song2.play();
        //background(255);
      }

      this.life -= 1;
      if (this.life <= 0) {

        fill(128, 0, 0, 32);
        rect(0, 0, width, height);
        textAlign(CENTER);
        textSize(32);
        fill('yellow');
        text("NICE SHOT!", width / 2, height / 2);
        noLoop();
      }
    } else {
      this.color = 'pink';
    }
  }

  display() {
    img.resize(60, 80);
    image(img, this.x, this.y);
    fill(255);
    textSize(24);
    text(this.life, 20, 20);
  }
}

class Circle {
  constructor(x, y, r, xSpeed, ySpeed) {
    this.x = x;
    this.y = y;
    this.r = 50;
    this.xSpeed = xSpeed;
    this.ySpeed = ySpeed;
    this.color = color(255, 255, 255);
  }

  move() {
    this.x += this.xSpeed;
    if (this.x < 0 || this.x > width) {
      this.xSpeed *= -1;
      this.color = color(random(255),
        random(255),
        random(255));
    }

    this.y += this.ySpeed;
    if (this.y < 0 || this.y > height) {
      this.ySpeed *= -0.9;
      this.color = color(255, 255, 255);
    }
  }

  display() {
    noStroke();
    fill(this.color);
    img2.resize(80, 75);
    image(img2, this.x, this.y);
  }
}

function handleKeyboard() {
  if (keyIsPressed) {
    if (keyCode === UP_ARROW) {
      myPlayer.move(0, -5);
    } else if (keyCode === DOWN_ARROW) {
      myPlayer.move(0, 5);
    } else if (keyCode === LEFT_ARROW) {
      myPlayer.move(-5, 0);
    } else if (keyCode === RIGHT_ARROW) {
      myPlayer.move(5, 0);
    }
  }
}

function mousePressed() {
  if (song.isPlaying()) {
    song.stop();
    background(255, 0, 0);
  } else {
    song.play();
    background(0, 255, 0);
  }
}