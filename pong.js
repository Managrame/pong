"use strict";
function Ball() {
    this.id = "ball";
    this.x = 0;
    this.y = 0;
    this.vx =10
    this.vy=10;
    this.height=64
    this.width=64
} 

function Paddle(n){
    this.id = "paddle"+n;
    this.x = 0;
    this.y = 0;
    this.v=10;
    this.height=192
    this.width=24
}

function buttons(){
    this.p1_down = false;
    this.p1_up = false;
    this.p2_down = false;
    this.p2_up = false;
}

function place_objects(objects) {
    for(let object of objects) {
        let element = document.getElementById(object.id);
        element.style.left = object.x + "px";
        element.style.top = object.y + "px";
    }
}


let o=document.body.getBoundingClientRect();
function update() {
    /*mouvement paddle1*/
    if(p1.y<o.height||b.p1_up){
        p1.y+=p1.v;
    }

    if(p1.y>p1.height||b.p1_down){
        p1.y-=p1.v;
    }
   
    /*mouvement paddle1*/
    if(p2.y<o.height||b.p2_up){
        p2.y+=p2.v;
    }

    if(p2.y>p2.height||b.p2_down){
        p2.y-=p2.v;
    }
   
    /* mouvement ball*/
    if(ball.x<=0 ||ball.x>o.width-ball.width ){
        ball.vx=-(ball.vx)
    }

    if (ball.y<=0 ||ball.y>o.height-ball.height ) {
        ball.vy=-(ball.vy)
    }
    ball.x += ball.vx;
    ball.y += ball.vy;
    place_objects([ball,p1,p2]);
}


function track_player_input(event) {
    if(event.type == "keydown") {
    switch(event.key) {
    case "a": buttons.p1_up = true; break;
    case "q": buttons.p1_down = true; break;
    case "p": buttons.p2_up = true; break;
    case "m": buttons.p2_down = true; break;
    }
    } else if(event.type == "keyup") {
    switch(event.key) {
    case "a": buttons.p1_up = false; break;
    case "q": buttons.p1_down = false; break;
    case "p": buttons.p2_up = false; break;
    case "m": buttons.p2_down = false; break;
    }
    }
}
document.addEventListener("keydown", track_player_input);
document.addEventListener("keyup", track_player_input);


let ball;

let p1;

let p2;

let b ;

function init() {
    ball = new Ball();
    b=new buttons();
    p1=new Paddle(1);
    p1.y=o.height/2;
    p2= new Paddle(2);
    p2.x=o.width-p2.width;
    p2.y=o.height/2;
    setInterval(update, 100);
}