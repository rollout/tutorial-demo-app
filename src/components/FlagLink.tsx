import React, { MouseEventHandler, ReactElement } from "react";
import { Urls } from "../configuration/Urls";
import { ExternalLinkIcon } from "./icons/ExternalLinkIcon";

interface Props {
  flag: {name: string}
  text: ((flagName: string) => ReactElement | string)
}

export function FlagLink({ flag, text }: Props) {
  const url = Urls.featureFlagUrl(flag.name);

  const openInPopup: MouseEventHandler<HTMLAnchorElement> = (ev) => {
    ev.preventDefault();
    window.open(url, "popup", "width=1500,height=1000");
  };

  return (
    <a className="ff-link" href={url} target="_blank" rel="noopener noreferrer" onClick={openInPopup}>
      {text(flag.name)}
      <ExternalLinkIcon />
    </a>
  );
}
