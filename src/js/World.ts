import { TestLevel } from "./levels/TestLevel"
import { TestLevel2 } from "./levels/TestLevel2"
import { TestLevel3 } from "./levels/TestLevel3"
import { Player } from "./player"
import { AnimatedSprite } from "./primitives/AnimatedSprite"
import { Wall } from "./primitives/Wall"

const gameover = document.getElementById("gameover")

export class World{
    canvas:HTMLCanvasElement
    c:CanvasRenderingContext2D | null
  wall: Wall | undefined
  testLevel: TestLevel | undefined
  player: Player | undefined

  anim: AnimatedSprite | undefined
  level:number
  levels:Array<any>
  isLevelOver:boolean

    constructor(){
      this.canvas = document.createElement("canvas")
      this.canvas.width = innerWidth
      this.canvas.height = innerHeight
      this.c = this.canvas.getContext("2d")
      this.level = 0;
      this.isLevelOver = false
      this.levels = [new TestLevel(this.c , this.canvas.width/2,this.canvas.height/2) , new TestLevel2(this.c , this.canvas.width/2,this.canvas.height/2) , new TestLevel3(this.c , this.canvas.width/2,this.canvas.height/2)]
      this.init()
    }
    init(){
      document.body.append(this.canvas)


      this.drawWall()

    }
    drawWall(){

    this.levels[this.level].draw()


     
    this.player = new Player(this.levels[this.level].origin.x, this.levels[this.level].origin.y,20,this.c)
    this.player.walls = [...this.player.walls,...this.levels[this.level].walls]
    this.player.draw()
      

    }
    update(){

      if(this.c){
      this.c.fillStyle = "#eee"
      this.c.fillRect(0,0,this.canvas.width, this.canvas.height)

      if(this.levels[this.level]){
        this.levels[this.level].update()
      }

      if(this.player){
        if(this.player.position.sub(this.levels[this.level].origin).mag() >= 350){
          this.isLevelOver = true
          this.player.position = this.levels[this.level].origin

         
        }
        this.player.update()
      }

      if(this.isLevelOver){
        if(this.level == 2 && gameover
        ){

          gameover.classList.remove('hidden')
        }else{
          this.level++

        }
        this.isLevelOver = false
        this.drawWall()
      }

      
      // if(this.isLevelOver && gameover){
      //   gameover.style.display = "block"
      // }else if(gameover){
      //   gameover.style.display = "hidden"
      // }
      
      // if(this.isLevelOver && gameover){
   
      //   document.onkeydown = e => {
      //     if(e.key == "w"){
      //       this.level++
           
            
      //     }
      //   }
      //   document.onkeyup =e => {
      //     if(e.key == "w"){
      //       this.level *= 1

      //       this.isLevelOver = false
      //       gameover.style.display = "hidden"
      //     }
      //   }
      // }
      console.log(this.level)


      // if(this.anim && this.player){
      //   this.anim.x = this.player.position.x - 50
      //   this.anim.y = this.player.position.y - 50
      //     this.anim.draw()
      //     this.anim.update()
      // }

      }
    }
  }
  