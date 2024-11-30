import { CollisionEffect } from "../effects/CollisionEffect"
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
    explosions: Array<CollisionEffect>



    constructor(x:number, y:number, r:number, c:CanvasRenderingContext2D | null) {

        this.gravity = 0

        this.position = new Vector(x, y)
        this.r = r
        this.c = c
        this.velocity = new Vector(.2,.6)
        this.acc = new Vector(0, 0)
        this.color = "#fff"
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

        this.explosions = []
       
    }
    draw() {
        if(this.c){
        this.c.beginPath()
      this.c.setLineDash([]);

        this.c.arc(this.position.x, this.position.y, this.r, 0, 2 * Math.PI)
        this.c.strokeStyle = "black"
        this.c.lineWidth =12
        this.c.stroke()
        this.c.shadowBlur = 10
    this.c.shadowColor = "#000"
        this.c.fillStyle = this.color
        this.c.fill()
        }

  

        // this.velocity.draw(this.position.x, this.position.y, 40, "red")
    }
    startRandomMotion(){
        this.velocity.x = .5
        this.velocity.y = -.1
    }
    // intersects(other){
    //     let d = this.position.sub(other.position).mag()
        
    //     //Collision Resolution
        
    //     if(d  <= -this.velocity.sub(other.velocity).dot(this.position.sub(other.position))*(1/d)+this.r + other.r){
    //         let n = this.position.sub(other.position).unit()

    //         let p = this.velocity.sub(other.velocity).dot(n) * 2 / (this.mass + other.mass)
    //         console.log(this.velocity)
            
    //         this.velocity = this.velocity.sub(n.mult(p * this.mass))
    //         other.velocity = other.velocity.add(n.mult(p * other.mass))


    //       }

    // }

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
                
                let effect = new CollisionEffect(closestPoint.x-20, closestPoint.y-20, this.c)
                this.explosions.push(effect)

                this.position = closestPoint.add(collisionNormal.mult(this.r));
                // console.log(collisionNormal)
                this.velocity = this.velocity.sub(collisionNormal.mult(2 * this.velocity.dot(collisionNormal))).add(collisionNormal.mult(closestPoint.sub(wall.start).mag()*wall.omega)).mult(.4 + Math.random()*.6) // Damping factor
            }
        }
    }
    
    
    // setColor(color){
    //     this.color = color
    // }


    // keyControls() {
       
    //         canvas.onkeydown = (key) => {
    //             if(this.keys.hasOwnProperty(key.key)){
    //                 this.keys[key.key] = true
    //             }
    //         }


    //         canvas.onkeyup = (key) => {
    //             if(this.keys.hasOwnProperty(key.key) ){
    //                 this.keys[key.key] = false
    //             }
    //         }
    // }

    // move(){
    //     this.keyControls()

    //     if(this.keys.w == true){
    //         this.velocity.y = -1
    //     }else if(this.keys.a == true){
    //         this.velocity.x = -1
    //     }else if(this.keys.s == true){
    //         this.velocity.y = 1
    //     }else if(this.keys.d == true){
    //         this.velocity.x = 1
    //     }else{
    //         this.velocity.x = 0
    //         this.velocity.y = 0
    //     }
    // }

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
    
    


        // this.explosions.map(e => {
        //     e.draw()
        //     e.update()
        // })

        // if(this.timer%40 == 0){
        //     this.explosions.shift()
        // }

        
    }
    
    
}