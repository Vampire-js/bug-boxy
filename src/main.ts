import { World } from './js/World'
import './style.css'

const world = new World()

let lastTime = performance.now() // Use `performance.now()` for better precision

const animate = (currentTime: number): void => {
    requestAnimationFrame(animate)

    const deltaTime = (currentTime - lastTime) / (1000 / 60) // Normalize deltaTime to 60 FPS
    lastTime = currentTime // Update last frame time

    world.update(deltaTime)
}

requestAnimationFrame(animate) // Start the loop
