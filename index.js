


document.body.onload = function() {

// email subscription
const SUPABASE_URL = 'https://vhncezbspfetgozdumhv.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZobmNlemJzcGZldGdvemR1bWh2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ4NzQ5MTQsImV4cCI6MjA0MDQ1MDkxNH0.Lj6tgLO9_iTw2Ydtzk8zzrM7bPh11kz0pwkP06KXMFg';

const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

let subbutton = document.getElementById("subscribe-button");

subbutton.addEventListener("click", async function() {
    let sub_email = document.getElementById('email-text').value;
    let notifier = document.getElementById("form-notifier");

    if (sub_email.includes("@") && sub_email.includes(".") && sub_email.length > 5){
        const data = await _supabase
        .from('subscribers')
        .insert([ {sub_email}]);

        console.log(data);

            if (data != null && data.status == 201) {
                notifier.innerText = "Successfully subscribed, check your email to verify the correct email was inputed";
            } else if (data.status == 409) {
                notifier.innerText = "Oops! You've already subscribed with this email";
            }
            else {
                notifier.innerText = "Error on the server! Apologies :(";
            }
    
    } else {
        notifier.innerText = "Error! Not a valid email";
    }

});


/** PLAYABLE UX*/
    const isMobile =  (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ||
    (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.platform)));

    console.log(isMobile);

    function requestDeviceOrientation(callback) {
        if (window.DeviceOrientationEvent == null) {
            callback(new Error("DeviceOrientation is not supported."));
        } else if (typeof DeviceOrientationEvent.requestPermission === 'function') {
            DeviceOrientationEvent.requestPermission().then(function(state) {
                if (state === "granted") {
                    callback(null);
                } else callback(new Error("Permission denied by user"));
            }, function(err) {
                callback(err);
            });
        } else { // no need for permission
            callback(null);
        }
    }

    if (isMobile) {

        requestDeviceOrientation(function(err) {
            //if (err == null) {
                window.addEventListener('deviceorientation',(e) => {
                    console.log("event" + e.gamma);
                    if (e.gamma > 15) {
                        keys[37] = true;
                    } else {
                        keys[37] = false;
                    }

                    if (e.gamma < -15) {
                        keys[39] = true;
                    } else {
                        keys[39] = false;
                    }
                }, true);
            //} else {
                let leftButton = document.getElementById("mobile-left-button");
                leftButton.style.display = "inline-block";
        
                leftButton.ontouchstart = function() {
                    leftButton.style.backgroundColor = "slategrey";
                    keys[37] = true;
                };
                leftButton.ontouchend = function() {
                    leftButton.style.backgroundColor = "lightslategrey";
                    keys[37] = false;
                };

                let  rightButton = document.getElementById("mobile-right-button");
                 rightButton.style.display = "inline-block";
        
                 rightButton.ontouchstart = function() {
                    rightButton.style.backgroundColor = "slategrey";
                    keys[39] = true;
                };
                 rightButton.ontouchend = function() {
                    rightButton.style.backgroundColor = "lightslategrey";
                    keys[39] = false;
                };
                
            //}
        });

        let jumpButton = document.getElementById("mobile-jump-button");
        jumpButton.style.display = "inline-block";

        jumpButton.ontouchstart = function() {
            jumpButton.style.backgroundColor = "slategrey";
            keys[38] = true;
        };
        jumpButton.ontouchend = function() {
            jumpButton.style.backgroundColor = "lightslategrey";
            keys[38] = false;
        };
    }

    //establish constants
    const gravity = -2;

    //physics variables
    var xvel = 0;
    var yvel = 0;
    var collided = true;

    //key activation data
    var keys = {38: false, 37: false, 39:false};

    //gather character dimensions
    let character = document.getElementById("character");
    const characterWidth = character.getBoundingClientRect().width;
    const characterHeight = character.getBoundingClientRect().height;

    //gather page dimensions
    let bodyWidth = document.body.getBoundingClientRect().width;
    let bodyHeight = document.body.getBoundingClientRect().height;
    let footerHeight = document.getElementById("footer").getBoundingClientRect().height;

    //origin at top left corner, positions at bottom left of rectangles
    var xpos = character.getBoundingClientRect().left;
    var ypos = bodyHeight - window.scrollY - character.getBoundingClientRect().bottom;

    //attach keyboard control events
    document.addEventListener("keydown", function(e) {
        keys[e.keyCode] = true;
    });

    document.addEventListener("keyup", function(e) {
        keys[e.keyCode] = false;
    })

    //gather platform dimensions
    let platformsElements = document.getElementsByClassName("platform");
    let platforms = [];

    for (var i=0; i<platformsElements.length; i++) {
        let el = platformsElements[i];
        let elx = el.getBoundingClientRect().left;
        let ely = bodyHeight - window.scrollY - el.getBoundingClientRect().bottom;

        platforms.push({id: el.id, x: elx, y: ely, width: el.getBoundingClientRect().width, height: el.getBoundingClientRect().height});
    }

    console.log(platforms);

    //regather width dimensions on window resize
    window.addEventListener('resize', function(event) {
        bodyWidth = document.body.getBoundingClientRect().width;
        
        platforms = [];

        for (var i=0; i<platformsElements.length; i++) {
            let el = platformsElements[i];
            let elx = el.getBoundingClientRect().left;
            let ely = bodyHeight - window.scrollY - el.getBoundingClientRect().bottom;

            platforms.push({id: el.id, x: elx, y: ely, width: el.getBoundingClientRect().width, height: el.getBoundingClientRect().height});
        }
    }, true);

    var scrollMode = false;

    let scrollModeButton = document.getElementById("scroll-mode");
    scrollModeButton.checked = scrollMode;

    //check scroll mode
    scrollModeButton.addEventListener("change", function(e) {

        scrollMode = scrollModeButton.checked;
    });

    //start frames for character movement
    requestAnimationFrame(frame); 

    function frame() {

        if (!scrollMode) {
            //physics updates
            updateY();
            updateX();

            for(let platform of platforms) {
                updateCollision(platform);
            }

            //screen follows character
            window.scrollTo(0,bodyHeight - ypos - window.screen.availHeight/2);

        } else {
            yvel = 0;
            xvel = 0;

            character.style.bottom = bodyHeight - window.screen.scrollY - window.screen.availHeight/2;
        }

        //request the next frame
        requestAnimationFrame(frame); 
    }

    //check y position bounds, collisions, and key presses
    function updateY() {

        //quick acceleration upwards to jump (but not on welcome)
        if (keys[38] && collided && ypos <= platforms[1].y + platforms[1].height) {

            //exponential function for jump force based on screen width
            yvel = 0.2890*Math.exp(bodyWidth*0.0025)+58.4459;
            collided = false;
        }

        ypos += yvel;
        yvel += gravity;

        //lower bound
        if (ypos - footerHeight <= 0) {
            ypos = footerHeight;
            yvel = 0;
            collided = true;
        } 

        character.style.bottom = ypos + "px";
    }


    //check for overlap between character and text platform bounds
    function updateCollision(platformObject) {
        if (ypos + yvel <= platformObject.y + platformObject.height &&  ypos > platformObject.y + platformObject.height/2 && xpos >= platformObject.x - characterWidth && xpos <= platformObject.x + platformObject.width && yvel <= 0) {
            ypos = platformObject.y + platformObject.height;
            yvel = 0;
            collided = true;
        } 
        character.style.bottom = ypos + "px";
    }

    //check x position bounds and key presses
    function updateX() {
        
        //accelerate when key press
        if (keys[37]) {
            xvel -= 1.4;
        } else if (keys[39]) {
            xvel += 1.4;
        }

        //dampen speed for natural accelerating
        xpos += xvel;
        xvel *= 0.92;

        //wrap screen
        if (xpos <= 0) {
            xpos = bodyWidth - characterWidth;
        }else if (xpos + characterWidth >= bodyWidth) {
            xpos = 0;
        }

        character.style.left = xpos + "px";
    }
};
