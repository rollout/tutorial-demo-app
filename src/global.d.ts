declare module "react-simple-snake" {
    import React from "react";
  
    interface Props {
      percentageWidth?: number;
      startSnakeSize?: number;
      snakeColor?: string;
      appleColor?: string;
      speed?: number;
      borderWidth?: number | string
      fontSize?: number | string
    }
  
    const Snake: React.FC<Props>;
  
    export default Snake
  }
  