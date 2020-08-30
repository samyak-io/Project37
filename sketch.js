var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

//initiate Game STATEs
var PLAY = 1;
var END = 0;
var gameState = PLAY;

var score;
var gameOver, restart;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  
  gameOverImage = loadImage("gameOver.png");
  restartImage = loadImage("restart.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
}


function setup() {
  var canvas = createCanvas(displayWidth, 200);
  
  trex = createSprite(camera.position.x - 660,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided);
  trex.scale = 0.5;
  
  ground = createSprite(displayWidth/2,180,displayWidth,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width/2;
  // ground.velocityX = -4;
  
  invisibleGround = createSprite(200,190,displayWidth,10);
  invisibleGround.visible = false;
  
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  
  gameOver = createSprite(displayWidth/2,100);
  restart = createSprite(displayWidth/2,140);
  gameOver.addImage(gameOverImage);
  gameOver.scale = 0.5;
  restart.addImage(restartImage);
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;
  
  score = 0;
}

function draw() {
  background(180);
  
  fill("white");
  stroke(2);
  textSize(22);
  strokeWeight(2);
  text("Score: "+ score, camera.position.x + 540,50);

  if(gameState === PLAY) {
   score = score + Math.round(getFrameRate()/60);
    
  if(keyDown("space") && trex.y >=  160.75) {
    trex.velocityY = -13.6;
  }
  
  //add gravity to trex
  trex.velocityY = trex.velocityY + 0.6;
  
  // if (ground.x < 0){
  //   ground.x = ground.width/2;
  // }
  
    camera.position.x = camera.position.x + 1;
 if(camera.position.x = camera.position.x + 1){
    trex.x = camera.position.x - 660;
    restart.x = camera.position.x;
    gameOver.x = camera.position.x;
    ground.x = camera.position.x;
    cloudsGroup.x = camera.position.x + 600;
    obstaclesGroup.x = camera.position.x + 600;
    invisibleGround.x = camera.position.x;
  }
  spawnClouds();
  spawnObstacles();
    
 if(obstaclesGroup.isTouching(trex)){
      gameState = END;
    }
    
  // ground.velocityX = -6;  
}
  
  else if(gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    // ground.velocityX = 0;
    // trex.velocityY = 0;
    // obstaclesGroup.setVelocityXEach(0);
    // cloudsGroup.setVelocityXEach(0);
    
    camera.position.x = camera.position.x;

    //change the trex animation
    trex.changeAnimation("collided", trex_collided);
    trex.velocityY = trex.velocityY + 0.8;
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    
  if(mousePressedOver(restart)) {
    reset();
  }
}
  trex.collide(invisibleGround);
  
  drawSprites();
}

function reset(){
  gameState = PLAY;
  
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  
  trex.changeAnimation("running", trex_running);
  
  score = 0;
  
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 80 === 0) {
    var cloud = createSprite(random(camera.position.x + 650, camera.position.x + 900),120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    // cloud.velocityX = -3;
    
     //assign lifetime to the variable
    // cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}

function spawnObstacles() {
  if(frameCount % 120 === 0) {
    var obstacle = createSprite(camera.position.x + 700,165,10,40);
    // obstacle.velocityX = -4;
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    // obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

