import { ReactNode } from "react";

export const Nice = ({children}: {children?: ReactNode}) => <span className="nice">{children || "Nice!"}</span>