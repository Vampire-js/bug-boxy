export class AnimatedSprite{
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
  

    constructor(x:number, y:number , c:CanvasRenderingContext2D|null , src?:string){
        this.c = c

        this.x = x
        this.y = y
        
        this.image = new Image()
        this.image.src = "src/assets/test.png"
        this.frame = 0
        this.last = 4

        this.timer = 0

        this.spriteWidth = this.image.width/4
        this.spriteHeight = this.image.height
        this.width = this.spriteWidth/2
        this.height = this.spriteHeight/2
    }
    update(){

        this.timer++
    //     if(this.timer%20 == 0){
    //     this.frame++
    //     if(this.frame == this.last){
    //         this.frame = 0
    //     }
    // }
    this.frame = Math.round(1+ Math.abs(Math.sin(this.timer/20))*2)
    
}
    draw(){
        if(this.c){
        this.c.drawImage(this.image, this.spriteWidth*this.frame, 0,this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height)
        }
    }
}