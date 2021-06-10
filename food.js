class Food {
    constructor(){
      this.image = loadImage("images/Milk.png");
      this.foodStockRef;
    }
    
    

async getFoodStock(){
  this.foodStockRef =await database.ref('foodStock');
  this.foodStockRef.on("value", function(data){
  foodStock=data.val();
 } )
}

updateFoodStock(){
  foodStock=foodStock+1;
  database.ref('/').update({
  foodStock:foodStock
   })
}

deductFoodStock(){
  foodStock=foodStock-1;
   database.ref('/').update({
  'foodStock':foodStock
  })
  doggy.addImage(happyDog);
 }

 display(){
  food.x=80 , food.y=100;
  if(foodStock!==0){
    for(var i=0; i<foodStock; i++){
      food.x= food.x+30;
      if(i%10==0){
        food.y=food.y+50;
        food.x= 80;
        }
      imageMode(CENTER);
      image(this.image,food.x,food.y,50,50);
      
    }
  }
 }
}
