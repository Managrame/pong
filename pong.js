"use strict";
function Ball() {
    this.id = "ball";
    this.x = 0;
    this.y = 0;
    }
   
    function place_objects(objects) {
        for(let object of objects) {
            let element = document.getElementById(object.id);
            element.style.left = object.x + "px";
            element.style.top = object.y + "px";
        }
    }
    
    function update() {
    ball.x += 5;
    ball.y += 5;
    place_objects([ball]);
    }
    
    let ball;
    function init() {
    ball = new Ball();
    setInterval(update, 100);
    }
