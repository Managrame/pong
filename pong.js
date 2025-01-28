"use strict";
function Ball() {
    this.id = "ball";
    this.x = 0;
    this.y = 0;
    this.vx =10
this.vy=10;
} 

function place_objects(objects) {
    for(let object of objects) {
        let element = document.getElementById(object.id);
        element.style.left = object.x + "px";
        element.style.top = object.y + "px";
    }
}

function update() {
    let o=document.body.getBoundingClientRect();
    if(o.x<=0 ||o.x>o.width+64 ){
        ball.vx=(-ball.vx)
    }

    if (o.y<=0 ||o.x>o.height+64 ) {
        ball.vx=(-ball.vy)
    }
    ball.x += ball.vx;
    ball.y += ball.vy;
    place_objects([ball]);
}

let ball;
function init() {
    ball = new Ball();
    setInterval(update, 100);
}
