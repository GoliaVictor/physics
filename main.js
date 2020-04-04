var shapes = [];

function setup() {
      //push test2
      createCanvas(5735, 3100);
      pixelDensity(1);
      angleMode(DEGREES);
      frameRate(60);

      shapes.push(new Shape(config2));
      shapes.push(new Shape(config));
      //shapes.push(new Shape(config3));
      //shapes.push(new Shape(config4));
      //hapes.push(new Shape(config5));
    }
    
    function draw() {
      background(50);
      stroke(255);
      shapes[0].show();
      shapes[1].show();
      //shapes[2].show();
      //shapes[3].show();
      //shapes[4].show();
    
      shapes[0].moveLinear(5);
      //shapes[0].gravity(10, shapes[1]);
      //shapes[0].gravity(10, shapes[2]);
      shapes[1].gravity(10, shapes[0]);
      //shapes[1].gravity(10, shapes[2]);
      //shapes[2].gravity(10, shapes[0]);
      //shapes[2].gravity(10, shapes[1]);
      //shapes[3].gravity(10, shapes[0]);
      //shapes[3].gravity(10, shapes[1]);
      //shapes[4].gravity(10, shapes[0]);
      //shapes[4].gravity(10, shapes[1]);

      //inputs to the function control how many frames before it applies its' speed
      for(let i = 0; i < shapes.length; i++){
        if(shapes[i].collision == true){
          for(let j = 0; j < shapes.length; j++){
            if(i != j){
              if(shapes[j].collision == true){
                shapes[i].collisionDetection(j);
              }
            }
          }
        }
      }

      shapes[0].applyVelocity();
      shapes[1].applyVelocity();
      //shapes[2].applyVelocity();
      //shapes[3].applyVelocity();
      //shapes[4].applyVelocity();
    }