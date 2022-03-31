import { FlagLink } from "../../components/FlagLink";
import {
  Step, StepActionLink, StepDescription, StepStrongText, StepSuccessText
} from "../../components/step/Step";
import { StepComponent, StepComponentProps } from "../StepTypes";
import { useFeatureFlags } from "../../lib/featureManagement/FeatureFlagsContext";
import { forwardRef, useEffect } from "react";

export const StringFeature: StepComponent = forwardRef<HTMLDivElement, StepComponentProps>(({number, active, current, onSuccessChange}: StepComponentProps, ref) => {

  const {featureFlags} = useFeatureFlags()
  const flag = featureFlags.snakeGame.speed
  const success = flag.getValue() !== flag.defaultValue;

  useEffect(()=> {
    onSuccessChange(success)
  }, [success]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Step number={number} title="Change the difficulty" active={active || current} ref={ref}>
      <StepDescription>You can adjust the speed of the snake with a feature flag!</StepDescription>
      <StepDescription>
        <StepStrongText>Enable its targeting</StepStrongText> and <StepStrongText>set its value to
        <span className="value-text"> fast</span></StepStrongText>.
      </StepDescription>
      <StepDescription>
        <StepActionLink>
          <FlagLink
            flag={flag}
            text={(flagName) => (<>Go to {flagName}</>)}
          />
        </StepActionLink>
      </StepDescription>
      {success && (
        <StepSuccessText>
        Congratulations! You've changed the difficulty of the game!
      </StepSuccessText>
      )}
    </Step>
  );
})

StringFeature.displayName = "StringFeature"