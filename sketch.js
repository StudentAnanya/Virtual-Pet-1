//Create variables here
var dog,dogImg,happyDog;
var database;
var foodVal,foodStock;

function preload()
{
dogImg = loadImage("images/dogImg.png");
happyDog = loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(500,500);
  background(46, 139, 87)

  database= firebase.database();

  dog = createSprite(260,320,50,50);
  dog.addImage(dogImg);
  dog.scale = 0.2;

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
}


function draw() {  
  background(46, 139, 87)
  
 if(keyWentDown(UP_ARROW)){
   writeStock(foodVal);
   dog.addImage(happyDog);
 }

 drawSprites();

 textSize(20)
  fill("black")
  text("Food Remaining : "+foodVal,150,200);
  textSize(13)
  text("Note : Press the UP ARROW Key to feed the dog, milk")
}

function readStock(data){
  foodVal = data.val();
}

function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }
  database.ref('/').update({
    Food:x
  })
}
