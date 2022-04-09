var PLAY = 1;
var END = 0;
var gameState = PLAY;

var dog, dog_running
var ground, invisibleGround, groundImage;


var obstaclesGroup, obstacle1, obstacle2

var score;
var gameOver, restart
var gameOverImg,restartImg


function preload(){
                    
  dog_running = loadAnimation("dog.png","dog1.png","dog2.png.png");

  
 groundImage = loadImage("ground-png-hd-removebg-preview.png");
 
  
  obstacle1 = loadImage("obstaclea.png");
  obstacle2 = loadImage("obstacleb.png");
 
  
  restartImg = loadImage("restart.png")
  gameOverImg = loadImage("gameOver.png")
  
}

function setup() {
 
  createCanvas(500, 300);

 var message = "This is a message";
 console.log(message)
  
  dog = createSprite(50,100,20,50);
  dog.addAnimation("running", dog_running);
 
  

  dog.scale = 0.5;
  
  ground = createSprite(1000,280,100,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  gameOver = createSprite(250,150);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(250,190);
  restart.addImage(restartImg);
  
 
  gameOver.scale = 0.5;
  restart.scale = 0.5;
  
  invisibleGround = createSprite(200,200,400,10);
  invisibleGround.visible = false;
  
  //create Obstacle and Cloud Groups
  obstaclesGroup = createGroup();
 

  
  dog.setCollider("rectangle",0,0,dog.width,dog.height);
  dog.debug = false
  
  score = 0;
  
}


function draw() {
  
  background("cyan");
 
  text("Score: "+ score, 200,50);
  
  
  if(gameState === PLAY){

    gameOver.visible = false;
    restart.visible = false;
    
    ground.velocityX = -(4 + 3* score/100)
    
    score = score + Math.round(getFrameRate()/60);
    
    
    if (ground.x < 0){
     ground.x = ground.width/2;
    }
    
    if(keyDown("space")&& dog.y >= 100) {
        dog.velocityY = -12;
       
    }
    
   dog.velocityY = dog.velocityY + 0.8
  
    spawnObstacles();
    
    if(obstaclesGroup.isTouching(dog)){
        
        gameState = END;
      
    }
  }
   else if (gameState === END) {
      gameOver.visible = true
      restart.visible = true
     
      ground.velocityX = 0;
      dog.velocityY = 0
      dog.visible=false
     
      //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    
     
     obstaclesGroup.setVelocityXEach(0);
  
   }
  
  dog.collide(invisibleGround);
  
  if(mousePressedOver(restart)) {
      reset();
    }


  drawSprites();
}

function reset(){
  
  //game is made to reset when trex collides with obstales

  gameState = PLAY;
 
  restart.visible=false;
  gameOver.visible=false;

dog.visible=true

 obstaclesGroup.destroyEach();
 

score =0;
}


function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(600,185,10,40);
   
   obstacle.velocityX = -(6 + score/100);
   
    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
     
      default: break;
    }
   
    obstacle.scale = 0.2;
    obstacle.lifetime = 300;
   
    obstaclesGroup.add(obstacle);
 }
}


