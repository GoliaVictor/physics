class Shape{
    constructor(config){
        
    //mouse
        if (config.mouse != undefined){
            this.mouse = config.mouse;
        }
        else{
            this.mouse = false;
        }

    //corners
        if (config.corners != undefined){
            this.corners = config.corners;
        }
        else{
            this.corners = 4;
        }

    //collision
        if (config.collision != undefined){
            this.collision = config.collision;
        }
        else{
            this.collision = false;
        }
    //movement
        if (config.movement != undefined){
            this.movement = config.movement;
        }
        else{
            this.movement = false;
        }

    //velocityY
        if (config.velocityY != undefined){
            this.velocityY = config.velocityY;
        }
        else{
            this.velocityY = 0;
        }

    //velocityX
        if (config.velocityX != undefined){
            this.velocityX = config.velocityX;
        }
        else{
            this.velocityX = 0;
        }

    //size
        if (config.size != undefined){
            this.size = config.size;
        }
        else{
            this.size = 50;
        }

    //position
        if (config.x != undefined || config.y != undefined){
            this.x = config.x;
            this.y = config.y;
        }
        else{
            this.x = width/2
            this.y = height/2
        }
    
    //rgba
        if (config.r != undefined || config.b != undefined || config.g != undefined || config.a != undefined){
            this.a = config.a;
            this.r = config.r;
            this.g = config.g;
            this.b = config.b;
        }
        else{
            this.a = 100;
            this.r = 100;
            this.g = 100;
            this.b = 100;
        }

    //rotate
        if (config.rotate != undefined){
            this.rotate = config.rotate-90;
        }
        else{
            this.rotate = -90;
        }
        if (config.cornerPoints != undefined){
            this.cornerPoints = config.cornerPoints;
        }
        else{
            this.cornerPoints = true;
        }

        if (config.player != undefined){
            this.player = config.player;
        }
        else{
            this.player = false;
        }

    this.initialvelocityX = this.velocityX;
    this.initialvelocityY = this.velocityY;
    this.id = config.id;
    this.yChange = 0;
    this.xChange = 0;

    this.collisionPoints = [];
    this.isColliding = 0;
    this.isCollidingWith = [];
    this.cancelOverLap = 60;
    this.rotateRate = 0;
    this.tempRotateRate = 0;
    }
    
    show(){
        if(this.movement == true){
            if(this.collisionDetected != true){
                fill(this.r,this.g,this.b,this.a);
                if (this.mouse) {
                    this.x = mouseX;
                    this.y = mouseY;
                }
                this.vertices = [];
                beginShape();
                for (let a = 0; a < 360; a += 360/this.corners) {
                    vertex(this.size * cos(a+this.rotate) + this.x,this.size * sin(a+this.rotate) + this.y);
                    this.vertices.push([this.size * cos(a+this.rotate) + this.x, this.size * sin(a+this.rotate) + this.y]);
                    if(this.cornerPoints == true ){
                        strokeWeight(3);
                        stroke(255,100,100);
                        point(this.vertices[Math.round(a/(360/this.corners))][0], this.vertices[Math.round(a/(360/this.corners))][1]);
                        strokeWeight(1);
                        stroke(255);
                    }
                }
                endShape(CLOSE);
                this.vertices.push(this.vertices[0]);
            }
            else{
                fill(this.r,this.g,this.b,this.a);
                if (this.mouse) {
                    this.x = mouseX;
                    this.y = mouseY;
                }
                this.vertices = [];
                beginShape();
                for (let a = 0; a < 360; a += 360/this.corners) {
                    vertex(this.size * cos(a+this.rotate) + this.prevX,this.size * sin(a+this.rotate) + this.prevY);
                    this.vertices.push([this.size * cos(a+this.rotate) + this.prevX, this.size * sin(a+this.rotate) + this.prevY]);
                    if(this.cornerPoints == true ){
                        strokeWeight(3);
                        stroke(255,100,100);
                        point(this.vertices[Math.round(a/(360/this.corners))][0], this.vertices[Math.round(a/(360/this.corners))][1]);
                        strokeWeight(1);
                        stroke(255);
                    }
                }
                endShape(CLOSE);
                this.vertices.push(this.vertices[0]);
            }
        }
        else{
            fill(this.r,this.g,this.b,this.a);
            if (this.mouse) {
                this.x = mouseX;
                this.y = mouseY;
            }
            this.vertices = [];
            beginShape();
               for (let a = 0; a < 360; a += 360/this.corners) {
                   vertex(this.size * cos(a+this.rotate) + this.x,this.size * sin(a+this.rotate) + this.y);
                this.vertices.push([this.size * cos(a+this.rotate) + this.x, this.size * sin(a+this.rotate) + this.y]);
                if(this.cornerPoints == true ){
                    strokeWeight(3);
                    stroke(255,100,100);
                    point(this.vertices[Math.round(a/(360/this.corners))][0], this.vertices[Math.round(a/(360/this.corners))][1]);
                    strokeWeight(1);
                    stroke(255);
                }
               }
            endShape(CLOSE);
            this.vertices.push(this.vertices[0]);
        }
    }


    collisionDetection(i){
        if(this.collision == true){
            this.collisionDetected = false;
            for (let a = 0; a < this.corners; a += 1) {
                for (let b = 0; b < shapes[i].corners; b += 1) {
                    let intersectCheck = intersects(
                    this.vertices[a][0],this.vertices[a][1], 
                    this.vertices[a+1][0],this.vertices[a+1][1], 
                    shapes[i].vertices[b][0],shapes[i].vertices[b][1], 
                    shapes[i].vertices[b+1][0],shapes[i].vertices[b+1][1]);
                    if (intersectCheck == true) {
                        this.impalingCorner = this.vertices[a]
                        this.collisionCornerInside = a;
                        this.collisionDetected = true;
                        this.isColliding += 1;
                        strokeWeight(6);
                        stroke(255)
                        let mathIntersect = math.intersect(
                         this.vertices[a], 
                         this.vertices[a+1],
                         shapes[i].vertices[b],
                         shapes[i].vertices[b+1]
                        );
                        point(mathIntersect[0], mathIntersect[1])
                        this.collisionPoints.push([mathIntersect[0], mathIntersect[1]])
                        strokeWeight(1)
                    }
                }
            }
            if(this.isColliding > 0){
                this.collisionDetected = true;
                this.isCollidingWith.push(i);

            }
        }
    }


    collisionResolutionBounce(bounceHeight = 3, rotationRate = 50){
        if(this.movement = true){
            if(this.collisionDetected == true){
                //if(this.player == false){ - important cause if we don't want the player to be able to be moved by collisions
                    //if((this.collisionPoints[0][0] - this.x) < 40 || this.collisionPoints[0][1] - this.y < 40){
                       // if(Math.abs(shapes[this.isCollidingWith[0]].x - this.x) >= this.size*2 && Math.abs(shapes[this.isCollidingWith[0]].y - this.y) >= this.size*2){
                       //     this.overLapCanceler = false;
                       // }
                       // else{
                       //     this.overLapCanceler = true;
                       // }
                       // if(this.overLapCanceler == true){
                            this.tempX = this.x;
                            this.tempY = this.y;
                            this.x = this.prevX;
                            this.y = this.prevY;

                            this.collisionPointsDistance = [];
                            for (let i = 0; i < this.collisionPoints.length; i++) {
                                this.collisionPointsDistance.push(Math.sqrt((this.collisionPoints[0][0]-this.x)^2+(this.collisionPoints[1][1]-this.y)^2));
                            }
                            this.collisionPointsDistanceSorted = this.collisionPointsDistance.sort(function(a, b){return a - b});
                            for (let j = 0; j < this.collisionPointsDistance.length; j++) {
                                if (this.collisionPointsDistanceSorted[0] == this.collisionPointsDistance[j]) {
                                    this.closestCollisionPoint = this.collisionPoints[j]
                                }
                            }

                            this.x = this.tempX;
                            this.y = this.tempY;

                            // this.x += ((this.impalingCorner[0]-this.closestCollisionPoint[0])* -1)/this.cancelOverLap;
                            // this.y += ((this.impalingCorner[1]-this.closestCollisionPoint[1])* -1)/this.cancelOverLap;
                            this.x += ((this.impalingCorner[0] - this.closestCollisionPoint[0])* -1);
                            this.y += ((this.impalingCorner[1] - this.closestCollisionPoint[1])* -1);
                            // this.x += ((this.collisionPoints[0][0] - this.x)* -1)/this.cancelOverLap;
                            // this.y += ((this.collisionPoints[0][1] - this.y)* -1)/this.cancelOverLap;
                        //}
                    //}
                //}
                //else{
                //    shapes[this.isCollidingWith[0]].cancelOverLap = shapes[this.isCollidingWith[0]].cancelOverLap/2;
                //}
                
                this.distanceToCollision = Math.sqrt(Math.pow(this.collisionPoints[0][1]-this.y,2)+Math.pow(this.collisionPoints[0][0]-this.x,2));;
                this.angleToCollision = asin((this.collisionPoints[0][1] - this.y)/this.distanceToCollision);
                this.rotateRate = this.angleToCollision/rotationRate;

                if(Math.sign(this.velocityX) != Math.sign(shapes[this.isCollidingWith[0]].velocityX) && Math.sign(this.velocityY) != Math.sign(shapes[this.isCollidingWith[0]].velocityY)){
                    this.velocityX = (this.velocityX * -1) + (Math.sign(this.velocityX) * bounceHeight);
                    this.velocityY = (this.velocityY * -1) + (Math.sign(this.velocityY) * bounceHeight);
                }
                else{
                //is it colliding to its right and going to the right
                    if(Math.sign(this.collisionPoints[0][0] - this.x) == 1 && Math.sign(this.velocityX) == 1){
                        this.velocityX = this.velocityX - shapes[this.isCollidingWith[0]].velocityX/10;
                    }
                //is it colliding to its left and going to the left
                    else if(Math.sign(this.collisionPoints[0][0] - this.x) == -1 && Math.sign(this.velocityX) == -1){
                        this.velocityX = this.velocityX - shapes[this.isCollidingWith[0]].velocityX/10;
                    }
                    else{
                        this.velocityX = this.velocityX + shapes[this.isCollidingWith[0]].velocityX/25;
                    }

                //is it colliding to its down and going to the down
                    if(Math.sign(this.collisionPoints[0][1] - this.y) == -1 && Math.sign(this.velocityY) == -1){
                        this.velocityY = this.velocityY - shapes[this.isCollidingWith[0]].velocityY/10;
                    }
                //is it colliding to its up and going to the up
                    else if(Math.sign(this.collisionPoints[0][1] - this.y) == 1 && Math.sign(this.velocityY) == 1){
                       this.velocityY = this.velocityY - shapes[this.isCollidingWith[0]].velocityY/10;
                    }
                    else{
                       this.velocityY = this.velocityY + shapes[this.isCollidingWith[0]].velocityY/25;
                    }
                }

                //rotation stuff
                if ((map(this.rotate, 0,360,0,360/this.corners)-map(this.isCollidingWith[0].rotate, 0,360,0,360/this.isCollidingWith[0].corners)) > 90) {-(Math.abs(this.rotateRate))}
                else {Math.abs(this.rotateRate)}

                this.collisionPoints = [];
                this.isColliding = 0;
                this.collisionDetected = false;
            }
        }
        else{
            this.velocityX = 0;
            this.velocityY = 0;
            this.collisionPoints = [];
            this.isColliding = 0;
            this.collisionDetected = false;
            this.rotateRate = 0;
        }
     }

    applyVelocity(timeStep = 1, rotateMagnitude = 4){
        if(frameCount % timeStep == 0 && this.movement == true){
            if(this.collisionDetected == false){
                this.prevX = this.x;
                this.prevY = this.y;
                this.prevVelocityX = this.velocityX;
                this.prevVelocityY = this.velocityY;
                this.x += this.velocityX;
                this.y += this.velocityY;
                this.x += this.xChange;
                this.y += this.yChange;
                this.xChange = 0;
                this.yChange = 0;
                this.isColliding = 0;
                this.isCollidingWith = [];
                this.rotate += this.rotateRate;
            }
            else{
                this.collisionResolutionBounce(3);
                this.rotate += this.rotateRate*rotateMagnitude;
            }
        }
    }


    movementAcceleration(force = 5, deceleration = 1){
        if(this.movement == true){
            force = force/50;

        //Up
            if(keyIsDown(UP_ARROW)){
                if (Math.sign(this.velocityY) == -1) {
                    this.velocityY -= force;
                } else {
                    this.velocityY -= force*deceleration;
                }
            }
            
        //Down
            if(keyIsDown(DOWN_ARROW)){
                if (Math.sign(this.velocityY) == 1) {
                    this.velocityY += force;
                } else {
                    this.velocityY += force*deceleration;
                }
            }

        //Left
            if(keyIsDown(LEFT_ARROW)){
                if (Math.sign(this.velocityX) == -1) {
                    this.velocityX -= force;
                } else {
                    this.velocityX -= force*deceleration;
                }
            }

        //Right
            if(keyIsDown(RIGHT_ARROW)){
                if (Math.sign(this.velocityX) == 1) {
                    this.velocityX += force;
                } else {
                    this.velocityX += force*deceleration;
                }
            }
        }
    }

    moveLinear(force = 10){
        if(this.movement == true){
            if(keyIsDown(UP_ARROW)){
                this.yChange = -force;
            }

            if(keyIsDown(DOWN_ARROW)){
                this.yChange = force;
            }

            if(keyIsDown(LEFT_ARROW)){
                this.xChange = -force;
            }

            if(keyIsDown(RIGHT_ARROW)){
                this.xChange = force;
            }
        }
    }

    gravity(force, object, distanceSignificance = 2){
        force = force/100;
        if(object == undefined){
            this.velocityY += force;
            console.log('hi');
        }
        else{
            //pythagous - gives distance from this shape to the object
            this.distanceGravity = Math.sqrt(Math.pow(object.y-this.y,2)+Math.pow(object.x-this.x,2));
            this.velocityX += ((object.x-this.x)/(this.distanceGravity/distanceSignificance))*force;
            this.velocityY += ((object.y-this.y)/(this.distanceGravity/distanceSignificance))*force;
        }

    }

}


function keyReleased(){
    keyCode = 8;
}

function intersects(a,b,c,d,p,q,r,s) {
    var det, gamma, lambda;
    det = (c - a) * (s - q) - (r - p) * (d - b);
    if (det === 0) {
      return false;
    } else {
      lambda = ((s - q) * (r - a) + (p - r) * (s - b)) / det;
      gamma = ((b - d) * (r - a) + (c - a) * (s - b)) / det;
      return (0 < lambda && lambda < 1) && (0 < gamma && gamma < 1);
    }
  }


