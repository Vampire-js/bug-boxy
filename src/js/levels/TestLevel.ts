import { Vector } from "../math/vector";
import { Wall } from "../primitives/Wall";

const ROTATION_SPEED = Math.PI/300

export class TestLevel{

    wall1: Wall
    wall2: Wall
    wall3: Wall
    wall4:Wall
    pivot: Vector
    omega: number
    origin:Vector
    width: number;
    height: number;
    c:CanvasRenderingContext2D | null
    src:string
    walls:Array<Wall>

    constructor(c:CanvasRenderingContext2D | null , x:number, y:number){
        this.origin = new Vector(x,y)
        this.width = 400
        this.height = 400
        this.c = c

        this.src = "src/assets/img.png"
        
        this.wall1 = new Wall(this.origin.x - this.width/2,this.origin.y - this.height/2,this.origin.x + this.width/2,this.origin.y - this.height/2, 0,c)
        this.wall2 = new Wall(this.origin.x - this.width/2,this.origin.y + this.height/2,this.origin.x + this.width/2,this.origin.y + this.height/2, 0,c)
        this.wall3 = new Wall(this.origin.x - this.width/2,this.origin.y - this.height/2,this.origin.x + this.width/2 - 50,this.origin.y - this.height/2, -Math.PI/2,c)
        this.wall4 = new Wall(this.origin.x + this.width/2,this.origin.y + this.height/2,this.origin.x - this.width/2,this.origin.y + this.height/2, -Math.PI/2,c)

        this.walls = [this.wall1 , this.wall2 ,  this.wall3 , this.wall4]
      
        this.pivot = this.origin
        this.omega = 0
    }
    draw(){
        this.walls.map(e => {
            e.pivot = this.pivot
            e.draw()})

this.enableControls()

        
    }

    enableControls(){
        document.onkeydown = e => {
            if(e.key == "w"){
              this.omega = ROTATION_SPEED
            }
        }

        document.onkeyup = e => {
            if(e.key == "w"){
                this.omega = 0
            }
        }
    }

    maskImage(img:string){
        let image = new Image()
        image.src = img
       
        this.c?.drawImage(image, this.origin.x - this.width/2 - 30, this.origin.y - this.height/2 - 30,this.width + 60, this.height + 60)
    }
    update(dt:number) {

        // this.maskImage(this.src)

     
        this.walls.map(e => {
            e.omega = this.omega
            e.update(dt)
        })

    }
}