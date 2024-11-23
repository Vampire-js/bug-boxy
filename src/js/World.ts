import { TestLevel } from "./levels/TestLevel"
import { Player } from "./player"
import { Wall } from "./primitives/Wall"

export class World{
    canvas:HTMLCanvasElement
    c:CanvasRenderingContext2D | null
  wall: Wall | undefined
  testLevel: TestLevel | undefined
  player: Player | undefined

  

    constructor(){
      this.canvas = document.createElement("canvas")
      this.c = this.canvas.getContext("2d")
      this.init()
    }
    init(){
      document.body.append(this.canvas)
  
      //Making the canvas full screen
      this.canvas.width = innerWidth
      this.canvas.height = innerHeight

      this.drawWall()
    }
    drawWall(){
      this.testLevel = new TestLevel(this.c , this.canvas.width/2,this.canvas.height/2)
      this.testLevel.draw()

      this.player = new Player(this.testLevel.origin.x, this.testLevel.origin.y,20,this.c)
      this.player.walls = [...this.player.walls, this.testLevel.wall1, this.testLevel.wall2, this.testLevel.wall3, this.testLevel.wall4]
      this.player.draw()
    }
    update(){
      if(this.c){
      this.c.fillStyle = "#eee"
      this.c.fillRect(0,0,this.canvas.width, this.canvas.height)

      if(this.testLevel){
        this.testLevel.update()
      }

      if(this.player){
        this.player.update()
      }
      }
    }
  }
  