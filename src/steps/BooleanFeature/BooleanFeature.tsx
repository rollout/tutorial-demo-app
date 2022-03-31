import { FlagLink } from "../../components/FlagLink";
import { Step, StepActionLink, StepDescription, StepStrongText, StepSuccessText } from "../../components/step/Step";
import { useFeatureFlags } from "../../lib/featureManagement/FeatureFlagsContext";
import { StepComponent, StepComponentProps } from "../StepTypes";
import { forwardRef, useEffect } from "react";

export const BooleanFeature: StepComponent = forwardRef<HTMLDivElement, StepComponentProps>(({number, active, current, onSuccessChange}: StepComponentProps, ref) => {

  const {featureFlags} = useFeatureFlags()
  const flag = featureFlags.snakeGame.release
  const success = `${flag.isEnabled()}` !== `${flag.defaultValue}`

  useEffect(()=> {
    onSuccessChange(success)
  }, [success]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Step number={number} title="Release the new game" active={active || current} ref={ref}>
      <StepDescription>
        Your engineering team has just deployed the game. To release it, <StepStrongText>enable its targeting</StepStrongText> and <StepStrongText>set its value to 
        <span className="value-true"> true</span></StepStrongText>.
      </StepDescription>
      <StepDescription>
        <StepActionLink>
          <FlagLink 
            flag={flag} 
            text={(flagName) => <>Go to {flagName}</>}/>
        </StepActionLink>
      </StepDescription>
      {success && (
        <StepSuccessText>
          Congratulations! The game has been released!
        </StepSuccessText>
      )}
    </Step>
  );
})

BooleanFeature.displayName = "BooleanFeature"
