//establish constants
const gravity = -1.5;
const screenWidth = document.getElementById("screen").style.width.slice(0,-2);
const screenHeight = document.getElementById("screen").style.height.slice(0,-2);

const characterWidth = 40;
const characterHeight = 40;

//setup physics variables
//origin at bottom left corner
var xpos = screenWidth/2;
var ypos = 0;

var xvel = 0;
var yvel = 0;

var collided = true;

var keys = {"w": false, "a": false, "d":false};

//create charcter div
let character = document.createElement("div");
character.style.width = characterWidth + "px";
character.style.height = characterHeight + "px";
character.style.backgroundImage = "url('images/character.png')";
character.style.backgroundSize = "cover";
character.style.position = "absolute";

let screen = document.getElementById("screen");
screen.appendChild(character);

//attach keyboard control events
document.addEventListener("keydown", function(e) {
    e.preventDefault();
    keys[e.key] = true;
});

document.addEventListener("keyup", function(e) {
    e.preventDefault();
    keys[e.key] = false;
})

//class for text that acts as platform for character
class Text {
    constructor(text, x, y, isLink, link) {
        this.text = text;
        this.x = x;
        this.y = y;
        this.isLink = isLink;
        this.link = link;

        this.p = document.createElement("h1");
        this.p.innerText = text;

        this.p.style.margin = "0px";
        this.p.style.left = x + "px";
        this.p.style.bottom = y + "px";
        this.p.style.position = "absolute";

        screen.appendChild(this.p);

        this.collided = false;
        this.width = this.p.getBoundingClientRect().width;
        this.height = this.p.getBoundingClientRect().height;
    }

    //update appearance and show page overlay when collision changes
    set collided(newVal) {
        if (this.isLink) {
            if (newVal) {
                document.getElementById(this.link).style.display = "block";
                this.p.style.color = "blue";
                this.p.style.textDecoration = "underline";
            } else {
                document.getElementById(this.link).style.display = "none";
                this.p.style.color = "black";
                this.p.style.textDecoration = "none";
        }
    }
    }
}

//create text instances
var texts = [
    new Text("ABOUT", 80, 80, true, "about"),
    new Text("PROJECTS", 300, 240, true, "projects"),
    new Text("CONTACT", 140, 420, true, "contact")
];

//start frames for character movement
requestAnimationFrame(frame); 

function frame() {
    updateY();
    updateX();

    for(let text of texts) {
        updateCollision(text);
    }

    //request the next frame
    requestAnimationFrame(frame); 
}

//check y position bounds, collisions, and key presses
function updateY() {
    //quick acceleration upwards
    if (keys["w"] && collided) {
        yvel += 25;
        collided = false;
    }

    ypos += yvel;
    yvel += gravity;

    //wrap bounds
    if (ypos <= 0) {
        ypos = 0;
        yvel = 0;
        collided = true;
    } else if (ypos >= screenHeight - characterHeight) {
        ypos = 0;
    }

    character.style.bottom = ypos + "px";
}

//check for overlap between character and text platform bounds
function updateCollision(textObject) {
    if (ypos <= textObject.y + textObject.height &&  ypos > textObject.y + textObject.height/2 && xpos >= textObject.x - characterWidth && xpos <= textObject.x + textObject.width && yvel <= 0) {
        ypos = textObject.y + textObject.height;
        yvel = 0;
        collided = true;
        textObject.collided = true;
    } else {
        textObject.collided = false;
    }

    character.style.bottom = ypos + "px";
}

//check x position bounds and key presses
function updateX() {
    //accelerate when key press
    if (keys["a"]) {
        xvel -= 0.8;
    } else if (keys["d"]) {
        xvel += 0.8;
    }

    //dampen speed for natural accelerating
    xpos += xvel;
    xvel *= 0.9;

    //wrap screen
    if (xpos <= 0) {
        xpos = screenWidth - characterWidth;
    }else if (xpos + characterWidth >= screenWidth) {
        xpos = 0;
    }

    character.style.left = xpos + "px";
}