import { Vector } from "../math/vector";
import { Wall } from "../primitives/Wall";

const ROTATION_SPEED = Math.PI/200

export class TestLevel6{

    wall1: Wall
    wall2: Wall
    wall3: Wall
    wall4:Wall
    wall5:Wall
    wall6:Wall
    pivot: Vector
    omega: number
    origin:Vector
    width: number;
    height: number;
    c:CanvasRenderingContext2D | null
    src:string
    walls:Array<Wall>
    time:number

    constructor(c:CanvasRenderingContext2D | null , x:number, y:number){
        this.origin = new Vector(x,y)
        this.width = 400
        this.height = 400
        this.c = c

        this.src = "src/assets/img.png"
        
        this.wall1 = new Wall(this.origin.x - this.width/2+50,this.origin.y - this.height/2,this.origin.x + this.width/2 ,this.origin.y - this.height/2 + 75, 0,c)
        this.wall2 = new Wall(this.origin.x - this.width/2,this.origin.y + this.height/2,this.origin.x + this.width/2,this.origin.y + this.height/2, 0,c)
        this.wall3 = new Wall(this.origin.x - this.width/2+0,this.origin.y - this.height/2,this.origin.x + this.width/2 ,this.origin.y - this.height/2 -20, -Math.PI/2,c)
        this.wall4 = new Wall(this.origin.x + this.width/2 ,this.origin.y + this.height/2 - 10,this.origin.x - this.width/2,this.origin.y + this.height/2 , -Math.PI/2,c)
        this.wall5 = new Wall(this.origin.x -10 , this.origin.y + 120 , this.origin.x + 180 , this.origin.y-60 ,0,c)

        this.wall6 = new Wall(this.origin.x -170 , this.origin.y + 40 , this.origin.x + 130 , this.origin.y-100 ,0,c)

        this.walls = [this.wall1 , this.wall2 ,  this.wall3 , this.wall4, this.wall5, this.wall6]
      
        this.pivot = this.origin
        this.omega = 0
        this.time = 0
    }
    draw(){
        this.walls.map(e => {
            e.dash = 70
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
    update() {
this.time++
this.draw()
        // this.maskImage(this.src)

        this.walls.map(e => {
            e.omega = -this.omega
            
            e.update()
        })

    }
}