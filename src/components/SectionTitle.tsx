import { ReactNode } from "react";
import { CheckIcon } from "./icons/CheckIcon";

export function SectionTitle({done, children}: {done?: boolean, children: ReactNode}) {
    return <h2 className="sectionTitle">{children} {done && <CheckIcon />}</h2>
}