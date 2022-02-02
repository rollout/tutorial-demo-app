import { ReactNode } from "react";
import { CheckIcon } from "./icons/CheckIcon";
import './SectionTitle.css'

export function SectionTitle({done, children, doneMessage}: {done?: boolean, children: ReactNode, doneMessage?: string}) {
    return <header className="section-header">
        <h2 className="section-title">{children} {done && <CheckIcon />}</h2>
        {done && doneMessage && <h3 className="section-successSubtitle">{doneMessage}</h3>}
    </header>
}