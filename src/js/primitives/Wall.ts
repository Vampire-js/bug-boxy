import { Matrix } from "../math/matrix"
import { Vector } from "../math/vector"
import { World } from "../World"


export class Wall{
    start: Vector
    end: Vector
    angle: number
    pivot: any
    omega: number
    dir: any
    c:CanvasRenderingContext2D | null

    thickness:number

    constructor(sx:number, sy:number, ex:number, ey:number , angle = 0 , c:CanvasRenderingContext2D | null){
        
        this.start = new Vector(sx, sy)
        this.end = new Vector(ex, ey)
        this.angle = 0
        this.pivot = new Vector(sx, sy)
        this.omega = 0
        this.c = c
        this.thickness = 3

        this.updateAngle(angle)
           }
    updateAngle(a:number){
        let rotationMatrix = new Matrix(2 , 2)
        rotationMatrix.data[0][0] = Math.cos(a)
        rotationMatrix.data[0][1] = Math.sin(a)
        rotationMatrix.data[1][0] = -Math.sin(a)
        rotationMatrix.data[1][1] = Math.cos(a)
    
         this.end = rotationMatrix.multiplyVec(this.end.sub(this.pivot)).add(this.pivot)
         this.start = rotationMatrix.multiplyVec(this.start.sub(this.pivot)).add(this.pivot)

        this.dir = this.start.sub(this.end)

    }
    draw(){
        if(this.c){
        this.c.beginPath()
        this.c.moveTo(this.start.x, this.start.y)
        this.c.lineTo(this.end.x, this.end.y)
        this.c.lineWidth = 5
        this.c.strokeStyle = "#222"
        this.c.stroke()
        }
      
    }
    
    update(){
        this.updateAngle(this.omega)

        this.draw()
    }
}