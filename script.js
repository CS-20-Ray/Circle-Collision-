// Global Variables

let player = {
  x: 400,
  y: 585,
  r: 15,
  speed: 6
}


// Draw Targets/Circles
let circles = [];
for (let i = 0; i < 25; i++){
circles.push(newCircle())
}


window.addEventListener("load", draw);

function draw(){
  // Drawing
  ctx.clearRect(0, 0, cnv.width, cnv.height);

  // Draw circles
  for (let i= 0; i< circles.length; i++){
    moveCircle(circles[i])
    drawCircle(circles[i])

  }

  // Logic
  movePlayer();
  drawPlayer();

// Bullets
  drawBullet();
  bulletShoot();
  collisionDetect();

  requestAnimationFrame(draw);
}

function newCircle(){
  return{
  x: randomInt(25, 700),
  y: randomInt(25, 500),
  r: 20,
  ySpeed: 4,
  xSpeed: 2,
  color: randomRGB()
  }
}

function drawCircle(aCircle){
  fill(aCircle.color);
  circle(aCircle.x, aCircle.y, aCircle.r, "fill");
}

function moveCircle(aCircle){

// Move Ball Horizontally
aCircle.x += aCircle.xSpeed;
if(aCircle.x + aCircle.r > cnv.width || aCircle.x - aCircle.r < 0) {
  aCircle.xSpeed = -aCircle.xSpeed;
}

// Move aCircle Vertically
aCircle.y += aCircle.ySpeed;
if( aCircle.y + aCircle.r > 550 || aCircle.y - aCircle.r < 0){
  aCircle.ySpeed = -aCircle.ySpeed;
}
}

function movePlayer(){
  if (keyPressed["ArrowLeft"]) {
    player.x += -player.speed;
  } else if  (keyPressed["ArrowRight"]){
    player.x += player.speed;
  }

  if (player.r + player.x > cnv.width){
    player.x = 785
  }

  if (ptInCircle(0, 585, player)){
    player.x = 15; 
  }
}

function drawPlayer(){
  ctx.fillStyle = "red"
  ctx.beginPath();
  ctx.arc(player.x, player.y, player.r, 0, 2 * Math.PI);
  ctx.fill();
  }

// Draw Bullets
  function newBullet(initX, initY, initW, initH, initR, initColor, initSpeedx, initSpeedy) {
    return {
      x: initX,
      y: initY,
      w: initW,
      h: initH,
      r: initR,
      color: initColor,
      xSpeed: initSpeedx,
      ySpeed: initSpeedy
    }
  }



// Draw Bullets
let bullets = [];
function drawBullet(){
for (let i = 0; i < bullets.length; i++) {
ctx.fillStyle = bullets[i].color;
  ctx.beginPath();
  ctx.arc(bullets[i].w, bullets[i].h, bullets[i].r, 0, 2 * Math.PI);
  ctx.fill();


  bullets[i].w += bullets[i].xSpeed;
  bullets[i].h += bullets[i].ySpeed;
}

}
//  Fire Bullets

function bulletShoot() {
  document.addEventListener("click", function (event) {
    let bullet = newBullet(player.x, player.y, 20, 20, 5, "blue");
    bullet.w = player.x;
    bullet.h = player.y;

    // Calculate the direction vector towards the mouse
    let mouseX = event.clientX - cnv.getBoundingClientRect().left;
    let mouseY = event.clientY - cnv.getBoundingClientRect().top;
    let directionX = mouseX - player.x;
    let directionY = mouseY - player.y;
    let length = Math.sqrt(directionX * directionX + directionY * directionY);

    // Normalize the direction vector
    bullet.ySpeed = (directionY / length) * 5;
    bullet.xSpeed = (directionX / length) * 5;



    bullets.push(bullet);
  });
}

// function collisionDetect(){

//   for (let n =0; n < bullets.length; n++){
//     let bulletsArray = bullets[n]

// for (let i=0; i< circles.length; i++){
//   let circlesArray = circles[i]

//   if (circleCollide(bulletsArray, circlesArray)){
//     bullets.splice(n, 1)
//     circles.splice(i, 1)
//   }
// }
//   }

//       }

function collisionDetect(){
  for (let i = 0; i < bullets.length; i++) {
    let bullet = bullets[i];
    
    for (let n = 0; n < circles.length; n++) {
        let circle = circles[n];
        let distance = Math.sqrt((bullet.x - circle.x) ** 2 + (bullet.y - circle.y) ** 2);

        if (distance <= bullet.r + circle.r) {
            // Handle collision, e.g., remove the bullet and circle
            bullets.splice(i, 1);
            circles.splice(n, 1);
        }

        if (bullet.y < 0) {
            bullets.splice(i, 1);
        }
    }   
}
}
