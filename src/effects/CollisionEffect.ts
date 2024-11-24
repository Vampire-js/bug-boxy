export class CollisionEffect{
    c:CanvasRenderingContext2D|null
    
    x: number
    y: number
    spriteWidth: number
    spriteHeight: number
    width: number
    height: number
    image: HTMLImageElement
    frame: number
    last:number
    timer:number

    constructor(x:number, y:number , c:CanvasRenderingContext2D|null){
        this.c = c

        this.x = x
        this.y = y
        this.spriteWidth = 200
        this.spriteHeight = 179
        this.width = this.spriteWidth/2
        this.height = this.spriteHeight/2
        this.image = new Image()
        this.image.src = "src/assets/boom.png"
        this.frame = 0
        this.last = 5

        this.timer = 0
    }
    update(){

        this.timer++
        if(this.timer%20 == 0){
        this.frame++
        if(this.frame == this.last){
            this.frame = 0
        }
    }
    }
    draw(){
        if(this.c){
        this.c.drawImage(this.image, this.spriteWidth*this.frame, 0,this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height)
        }
    }
}