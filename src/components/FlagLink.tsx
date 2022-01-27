import { MouseEventHandler } from "react";
import { Urls } from "../configuration/Urls";

export function FlagLink({ flag }: { flag: {name: string} }) {
  const url = Urls.featureFlagUrl(flag.name);

  const openInPopup: MouseEventHandler<HTMLAnchorElement> = (ev) => {
    ev.preventDefault();
    window.open(url, "popup", "width=1500,height=1000");
  };

  return (
    <a className="ff-link" href={url} target="_blank" rel="noopener noreferrer" onClick={openInPopup}>
      {flag.name}
    </a>
  );
}
