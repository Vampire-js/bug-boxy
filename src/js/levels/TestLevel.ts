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

      
        this.pivot = this.origin
        this.omega = 0
    }
    draw(){
        this.wall1.draw()
        this.wall2.draw()
        this.wall3.draw()
        this.wall4.draw()

this.enableControls()


        this.wall1.pivot = this.pivot
        this.wall2.pivot = this.pivot
        this.wall3.pivot = this.pivot
        this.wall4.pivot = this.pivot
        
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

        // this.maskImage(this.src)

        this.wall1.omega = this.omega
        this.wall2.omega = this.omega
        this.wall3.omega = this.omega
        this.wall4.omega = this.omega

     this.wall1.update()
     this.wall2.update()   
     this.wall3.update()
     this.wall4.update()
    }
}