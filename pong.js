"use strict";
function Ball(){
    this.id = "ball";
    this.height = 64; // taille de la balle
    this.width = 64;
    this.x = Math.round((window.innerWidth - this.height)/2); // placer la balle au milieu de l'écran
    this.y = Math.round((window.innerHeight - this.width)/2);
    this.vx = 4; // vélocité de la balle
    this.vy = 4;
} 

function Paddle(n){
    this.id = "paddle"+n;
    this.height = 192;
    this.width = 24;
    this.x = 0;
    this.y = (o.height - this.height)/2; // placer la raquette au milieu de l'écran
    this.v = 7;
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
    if (ball.x == 0) score2 += 1;
    if (ball.x == o.width - ball.width) score1 += 1;

    /* mouvement p1 */
    if (buttons.p1_up) p1.y -= p1.v; // déplacer la raquette
    if (buttons.p1_down) p1.y += p1.v;
    if (p1.y < 0) p1.y = 0; // repositionner la raquette si elle déborde
    if (p1.y > o.height - p1.height) p1.y = o.height - p1.height;
   
    /* mouvement p2 */
    if (buttons.p2_up) p2.y -= p2.v;
    if (buttons.p2_down) p2.y += p2.v;
    if (p2.y < 0) p2.y = 0;
    if (p2.y > o.height - p2.height) p2.y = o.height - p2.height;
   
    /* mouvement ball */
    if (
        (p1.y < ball.y + ball.height/4 && ball.y + ball.height*3/4 < p1.y + p1.height && ball.x <= p1.width) || // le joueur 1 a rattrapé la balle
        (ball.x + ball.width >= p2.x && ball.x <= p2.x + p2.width && ball.y + ball.height >= p2.y && ball.y <= p2.y + p2.height) || // le joueur 2 a rattrapé la balle
        (ball.x <= 0 || ball.x >= o.width - ball.width) // la balle rebondit en haut ou en bas
    ){ball.vx *= -1;}
    else if (ball.y <= 0 || ball.y >= o.height - ball.height)
        ball.vy *= -1; // le joueur n'a pas rattrapé la balle

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
    document.getElementById('scores').innerText = score1 + '·' + score2;
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

let ball, p1, p2, buttons, score1, score2;

function init(){
    ball = new Ball();
    p1 = new Paddle(1);
    p2 = new Paddle(2);
    buttons = new Buttons();
    score1 = 0;
    score2 = 0;
    p2.x = o.width-p2.width;
    setInterval(update, 10);
}