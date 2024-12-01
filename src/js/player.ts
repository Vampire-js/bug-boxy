
import { Vector } from "./math/vector"
import { Wall } from "./primitives/Wall"

export class Player {
    position: Vector
    r: number
    velocity: Vector
    acc: Vector
    color: string
    player: boolean
    randomMotion: boolean
    hightlight: boolean
    mass: number
    keys: { w: boolean; a: boolean; s: boolean; d: boolean }
   
    timer:number
    c: CanvasRenderingContext2D | null
    walls:Array<Wall>

    gravity:number
    



    constructor(x:number, y:number, r:number, c:CanvasRenderingContext2D | null) {

        this.gravity = 0

        this.position = new Vector(x, y)
        this.r = r
        this.c = c
        this.velocity = new Vector(.2,.6)
        this.acc = new Vector(0, 0)
        this.color = "#ff5959"
        this.player = false
        this.randomMotion = true
        this.hightlight = false
        this.timer = 0

        this.mass = 1
        this.keys = {
            w:false,
            a:false,
            s:false,
            d:false,
        }

        this.walls = []

       
    }
    draw() {
        if(this.c){
        this.c.beginPath()
      this.c.setLineDash([]);

        this.c.arc(this.position.x, this.position.y, this.r, 0, 2 * Math.PI)
        this.c.strokeStyle = "#085f63"
        this.c.lineWidth =12
        this.c.stroke()
    //     this.c.shadowBlur = 10
    // this.c.shadowColor = "#085f63"
        this.c.fillStyle = this.color
        this.c.fill()
        }

  

        // this.velocity.draw(this.position.x, this.position.y, 40, "red")
    }
    startRandomMotion(){
        this.velocity.x = .5
        this.velocity.y = -.1
    }
 

    collideWall(wall: Wall) {
        // Define the wall segment as a vector
        let wallVector = wall.end.sub(wall.start);
        let ballToWallStart = this.position.sub(wall.start);
    
        // Project the ball’s position onto the wall segment
        let projectionLength = ballToWallStart.dot(wallVector.unit());
        let wallLength = wallVector.mag();
    
        // Check if the projection is within the bounds of the wall segment
        if (projectionLength >= 0 && projectionLength <= wallLength) {
            // Find the closest point on the wall to the ball
            let closestPoint = wall.start.add(wallVector.unit().mult(projectionLength));
            
            // Calculate the vector from the ball to this closest point
            let ballToClosestPoint = this.position.sub(closestPoint);
            let distanceToWall = ballToClosestPoint.mag();
    
            // Check if the ball is within collision range
            if (distanceToWall <= this.r) {
                // Resolve the collision by moving the ball out and inverting velocity along the normal
                let collisionNormal = ballToClosestPoint.unit();
                

                this.position = closestPoint.add(collisionNormal.mult(this.r));
                // console.log(collisionNormal)
                this.velocity = this.velocity.sub(collisionNormal.mult(2 * this.velocity.dot(collisionNormal))).add(collisionNormal.mult(closestPoint.sub(wall.start).mag()*wall.omega)).mult(.4 + Math.random()*.6) // Damping factor
            }
        }
    }

    update() {
        this.draw();
        this.velocity = this.velocity.unit().mult(2)
        this.timer++
        // Check and resolve collisions with all walls before updating position
        for (let wall of this.walls) {
            this.collideWall(wall);
        }
    
        // Apply position updates based on velocity
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    
        // Update velocity with acceleration
        this.velocity.x += this.acc.x;
        this.velocity.y += this.acc.y;
    
        // Gravity on the y-axis
        this.acc.y = this.gravity;
        
    }
    
    
}