import { Matrix } from "../math/matrix"
import { Vector } from "../math/vector"


export class Wall{
    start: Vector
    end: Vector
    angle: number
    pivot: any
    omega: number
    dir: any
    c:CanvasRenderingContext2D | null

    thickness:number
    dash:number

    constructor(sx:number, sy:number, ex:number, ey:number , angle = 0 , c:CanvasRenderingContext2D | null){
        
        this.start = new Vector(sx, sy)
        this.end = new Vector(ex, ey)
        this.angle = 0
        this.pivot = new Vector(sx, sy)
        this.omega = 0
        this.c = c
        this.thickness = 3
        this.dash = 7

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
      this.c.setLineDash([55, this.dash]);
        this.c.moveTo(this.start.x, this.start.y)
        this.c.lineTo(this.end.x, this.end.y)
        this.c.lineCap = "round";
        this.c.lineWidth = 10
        //   this.c.shadowBlur = 20
        // this.c.shadowColor = "#49beb7"
        this.c.strokeStyle = "#085f63"
        this.c.stroke()
        }
      
    }
    
    update(){
        this.updateAngle(this.omega)

        this.draw()
    }
}