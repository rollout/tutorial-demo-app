import React, { MouseEventHandler, ReactElement } from "react";
import { Urls } from "../configuration/Urls";
import { ExternalLinkIcon } from "./icons/ExternalLinkIcon";

interface Props {
  flag: {name: string}
  text?: string | ((flagName: string) => ReactElement | string)
}

export function FlagLink({ flag, text }: Props) {
  const url = Urls.featureFlagUrl(flag.name);

  const openInPopup: MouseEventHandler<HTMLAnchorElement> = (ev) => {
    ev.preventDefault();
    window.open(url, "popup", "width=1500,height=1000");
  };

  const linkText = typeof text === "function" ? text(flag.name)
                  : typeof text === "string" ? text
                  : flag.name

  return (
    <a className="ff-link" href={url} target="_blank" rel="noopener noreferrer" onClick={openInPopup}>
      {linkText}
      <ExternalLinkIcon />
    </a>
  );
}
