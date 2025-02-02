"use strict";
function Ball(){
    this.id = "ball";
    this.height = 64; // taille de la balle
    this.width = 64;
    this.x = Math.round((window.innerWidth - this.height)/2); // placer la balle au milieu de l'écran
    this.y = Math.round((window.innerHeight - this.width)/2);
    this.vx = 2; // vélocité de la balle
    this.vy = 2;
} 

function Paddle(n){
    this.id = "paddle"+n;
    this.height = 192;
    this.width = 24;
    this.x = 0;
    this.y = (o.height - this.height)/2; // placer la raquette au milieu de l'écran
    this.v = 10;
    this.score = 0;
}

function Buttons(){
    this.p1_down = false;
    this.p1_up = false;
    this.p2_down = false;
    this.p2_up = false;
}

function place_objects(objects){
    for (let object of objects){
        let element = document.getElementById(object.id);
        element.style.left = object.x + "px";
        element.style.top = object.y + "px";
    }
}

let o=document.body.getBoundingClientRect();
function update(){
    /* mouvement p1 */
    if (buttons.p1_up) p1.y -= p1.v;
    if (buttons.p1_down) p1.y += p1.v;
    if (p1.y < 0) p1.y = 0;
    if (p1.y > o.height - p1.height) p1.y = o.height - p1.height;
   
    /* mouvement p2 */
    if (buttons.p2_up) p2.y -= p2.v;
    if (buttons.p2_down) p2.y += p2.v;
    if (p2.y < 0) p2.y = 0;
    if (p2.y > o.height - p2.height) p2.y = o.height - p2.height;
   
    /* mouvement ball */
    console.clear();
    console.log(o.width, o.height, ball.x, ball.y, ball.vx, ball.vy);
    if (ball.x <= 0 || ball.x >= o.width - ball.width) ball.vx *= -1;
    if (ball.y <= 0 || ball.y >= o.height - ball.height) ball.vy *= -1;
    console.log(ball.vx, ball.vy);

    ball.x += ball.vx;
    ball.y += ball.vy;

    while (
        ball.x < 0 ||
        ball.y < 0 ||
        ball.x > o.width - ball.width || 
        ball.y > o.height - ball.height
    ){
        ball.x -= ball.vx/Math.abs(ball.vx);
        ball.y -= ball.vy/Math.abs(ball.vy);
    }

    place_objects([p1, p2, ball]);
    document.getElementById('scores').innerText = p1.score + '·' + p2.score;
}

function track_player_input(event){
    if (event.type == "keydown"){
        switch(event.key){
            case "a": buttons.p1_up = true; break;
            case "q": buttons.p1_down = true; break;
            case "p": buttons.p2_up = true; break;
            case "m": buttons.p2_down = true; break;
        }
    } else if (event.type == "keyup"){
        switch(event.key){
            case "a": buttons.p1_up = false; break;
            case "q": buttons.p1_down = false; break;
            case "p": buttons.p2_up = false; break;
            case "m": buttons.p2_down = false; break;
        }
    }
}
document.addEventListener("keydown", track_player_input);
document.addEventListener("keyup", track_player_input);

let ball, p1, p2, buttons = new Buttons();

function init(){
    ball = new Ball();
    p1 = new Paddle(1);
    p2 = new Paddle(2);
    p2.x = o.width-p2.width;
    setInterval(update, 10);
}