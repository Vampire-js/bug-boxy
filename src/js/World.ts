import { TestLevel } from "./levels/TestLevel"
import { TestLevel2 } from "./levels/TestLevel2"
import { TestLevel3 } from "./levels/TestLevel3"
import { TestLevel4 } from "./levels/TestLevel4"
import { TestLevel5 } from "./levels/TestLevel5"
import { TestLevel6 } from "./levels/TestLevel6"
import { Player } from "./player"

import { Wall } from "./primitives/Wall"

const gameover = document.getElementById("gameover")
let MAX = 5
let TIMER = 0;

export class World{
    canvas:HTMLCanvasElement
    c:CanvasRenderingContext2D | null
  wall: Wall | undefined
  testLevel: TestLevel | undefined
  player: Player | undefined
  
  level:number
  levels:Array<any>
  isLevelOver:boolean

    constructor(){
      this.canvas = document.createElement("canvas")
      this.canvas.width = 1080
      this.canvas.height = 616
      this.c = this.canvas.getContext("2d")
      this.level = 0;
      this.isLevelOver = false
      this.levels = [new TestLevel(this.c , this.canvas.width/2,this.canvas.height/2) , new TestLevel2(this.c , this.canvas.width/2,this.canvas.height/2) , new TestLevel3(this.c , this.canvas.width/2,this.canvas.height/2), new TestLevel4(this.c , this.canvas.width/2,this.canvas.height/2) , new TestLevel5(this.c , this.canvas.width/2,this.canvas.height/2) , new TestLevel6(this.c , this.canvas.width/2,this.canvas.height/2)]
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
    startTimer(){
      TIMER += 0.008
      let timerDisplay =   document.getElementById("timer")
if(timerDisplay)
{
  
  timerDisplay.innerHTML = `${Math.round(TIMER)} s`
}
      
    }
    update(dt:number){

      this.startTimer()

      if(this.c){
      this.c.fillStyle = "#facf5a"
      this.c.fillRect(0,0,this.canvas.width, this.canvas.height)

      if(this.levels[this.level]){
        this.levels[this.level].update(dt)
      }

      if(this.player){
        if(this.player.position.sub(this.levels[this.level].origin).mag() >= 350){
          this.isLevelOver = true
          this.player.position = this.levels[this.level].origin         
        }
        this.player.update(dt)
      }

      if(this.isLevelOver){
        if(this.level == MAX && gameover
        ){
          let endtime = document.getElementById("endtime")
          if(endtime){
            endtime.innerHTML += ` ${Math.round(TIMER)}`
          }
          this.level += 1
          gameover.classList.remove('hidden')
        }else{
          this.level++

        }
        this.isLevelOver = false
        this.drawWall()
      }

      


      }
    }
  }
  