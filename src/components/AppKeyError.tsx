import { MouseEvent } from "react";
import { QueryParams } from "../configuration/QueryParams";
import { Urls } from "../configuration/Urls";

export function AppKeyError() {

  const onClick = (ev: MouseEvent<HTMLAnchorElement>)=> {
    ev.preventDefault()
    QueryParams.environment_id = prompt("Enter your application key (which is the environment id)") || ''
    QueryParams.application_id = prompt("Enter your application id") || ''
    window.location.href = Urls.thisWebUrl(QueryParams).toString()
  }

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
