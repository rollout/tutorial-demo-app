import { MouseEvent } from "react";
import { QueryParams } from "../configuration/QueryParams";
import { useFeatureFlags } from "../context/FeatureFlagsContext";

export function AppKeyError() {

  const {attemptRoxSetup, initializationFailed} = useFeatureFlags()

  const onClick = (ev: MouseEvent<HTMLAnchorElement>)=> {
    ev.preventDefault()
    QueryParams.environment_id = prompt("Enter your application key (which is the environment id)") || ''
    QueryParams.application_id = prompt("Enter your application id") || ''
    attemptRoxSetup?.()
  }

  if(!initializationFailed) return null

  return (
    <div className="error">
      You have not provided the required parameters to execute this demo application.
      <br></br>
      <a href="#prompt-parameters" onClick={onClick}>
        Click here
      </a>{" "} to configure them.
      
    </div>
  );
}
