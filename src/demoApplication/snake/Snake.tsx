import { useState } from 'react'
import SnakeGame from './react-simple-snake/SnakeGame'
import "./Snake.css"

const GAME_SIZE = 600

interface Props {
  speed: 'slow' | 'normal' | 'fast' | 'insane'
  startSnakeSize?: number
}

export function Snake({speed = 'insane', startSnakeSize = 4}: Props) {
  const [key, setKey] = useState(Date.now())

  const reset = ()=> setKey(Date.now())

  const containerWidth = window.document.querySelector(".demoApplication-wrapper ")?.clientWidth || 800;
  const gameWidth = Math.min(GAME_SIZE * 100 / containerWidth, 100)

  const speedMs = speed === 'slow' ? 300 :
                  speed === 'normal' ? 80 :
                  speed === 'fast' ? 50 :
                  25
  return(
    <div id="SnakeDemoApp">
      <div>
        <h3><span>Use your arrow keys or WASD</span></h3>
        <p className='subtitle'>
          Speed is <code>{speed}</code> 
          &nbsp;&nbsp; · &nbsp;
          <button className='link' onClick={reset}>restart the game</button>
        </p>
      </div>
      <SnakeGame key={key} speed={speedMs} percentageWidth={gameWidth} startSnakeSize={startSnakeSize} snakeColor="#0167a1" appleColor="#00CC75" borderWidth="8px" fontSize="1.5rem"/>
    </div>
  )
}