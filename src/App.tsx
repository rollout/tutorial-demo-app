import { useRef } from "react";
import { useEffect } from "react";
import { useCallback, useState } from "react";
import "./App.css";
import { Layout } from "./components/layout/Layout";
import { DemoApplication } from "./demoApplication/DemoApplication";
import { BooleanFeature } from "./steps/BooleanFeature/BooleanFeature";
import { StepComponent } from "./steps/StepTypes";
import { StringFeature } from "./steps/StringFeature/StringFeature";

const Steps: StepComponent[] = [
  BooleanFeature,
  StringFeature
]

function App() {
  const [stepsSuccess, setStepsSuccess] = useState<boolean[]>(Array(Steps.length).fill(false))

  const onSuccess = useCallback((number: number, success: boolean)=> {
    setStepsSuccess(stepsSuccess => {
      const cloned = [...stepsSuccess]
      cloned[number] = success
      return cloned
    })
  }, [])
  
  const firstUnsuccessIndex = stepsSuccess.indexOf(false)
  const activeIndex = firstUnsuccessIndex !== -1 ? firstUnsuccessIndex : (Steps.length - 1)
  
  const numberOfSucceededSteps = stepsSuccess.filter(s => s).length
  const progress =  numberOfSucceededSteps / Steps.length
  const stepRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(()=> {
    if(!stepRefs.current[activeIndex]) {
      console.warn("no ref to step index", activeIndex, stepRefs.current)
    }
    stepRefs.current[activeIndex]?.scrollIntoView({behavior: "smooth", block: "start", inline: "start"});
  }, [activeIndex])
  
  return (
    <Layout
      demoApp={<DemoApplication />}
      progress={progress}
      steps={<>
        {
          Steps.map((StepElement, index)=> (
            <StepElement 
              key={index}
              number={index + 1}
              ref={el => stepRefs.current[index] = el}
              current={index === activeIndex}
              active={index <= activeIndex}
              onSuccessChange={onSuccess.bind(null, index)}
            />
          ))
        }
      </>}
    />
  );
}

export default App;
