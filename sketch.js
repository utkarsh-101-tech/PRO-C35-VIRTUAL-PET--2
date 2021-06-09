//Create variables here
var dog, doggy, happyDog, database;
var fedTime,lastFed,feed,addFood,foodObj,foodStock;
var food,giveName,ok1;

function preload()
{	//load images here
 dog = loadImage("images/dogImg.png");
 happyDog = loadImage("images/dogImg1.png");
}

function setup() {
	createCanvas(1000,500);
  food = createSprite(80,100,10,10);
  food.visible=false;

  doggy = createSprite(width/2+150,height/2+50,50,50);
  doggy.addImage(dog,doggy.x,doggy.y);
  doggy.scale= 0.25;

  foodObj = new Food();
 ok1 = createButton("ok");
 ok1.position(965,450);
  giveName = createInput("dog's name");
  giveName.position(790,450);
  database = firebase.database();
}

function draw() {  
  background(rgb(46, 138, 87));
  textSize(30);
  fill("black");
  if(lastFed>12){
    lastFed=lastFed-12
  text("Last Fed : "+lastFed+" pm" ,100,100 );
  }
  else if(lastFed<12){
  text("Last Fed : "+lastFed+" am" ,100,100 );  
  }
  else if(lastFed==12){
  text("Last Fed : "+12+" noon" ,100,100 );
  }
  name1 = giveName.value();
  ok1.mousePressed(function(){
  giveName.hide();
  ok1.hide();
  })
  text("name : "+name1,600,120);
  food.collide(doggy);
  
  foodObj.display();
  getTime();
  feed = createButton("Feed")
  feed.position(800,100);
  feed.size(10*10);
  feed.mousePressed(giveTime);

  foodObj.getFoodStock();
  addFood = createButton("Add Food");
  addFood.position(600,100);
  addFood.size(10*10);
  addFood.mousePressed(foodObj.updateFoodStock);

  drawSprites();
}

async function giveTime(){
  timeRef = await database.ref('/').update({
  feedTime: hour()
  });
  foodObj.deductFoodStock();
  food.velocityX = 3;
  if(food.isTouching(doggy)){
    food.velocityX = 0;
  }
}

async function getTime(){
  fedTime = await database.ref('feedTime');
  fedTime.on("value",function(data){
  lastFed= data.val();
  })  
}