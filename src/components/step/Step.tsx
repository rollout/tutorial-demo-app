import { forwardRef, ReactNode } from "react";
import "./Step.css";

interface Props {
  number: number | string;
  title: string;
  active: boolean;
  success?: boolean;
  children: ReactNode;
}

export const Step = forwardRef<HTMLDivElement, Props>(({ number, title, active, children}: Props, ref) => {
  return (
    <div ref={ref} className={`Step ${!active ? "is-innactive" : ""}`}>
      {/* <h4 className="Step-number">{number}</h4> */}
      <div className="Step-content">
        <h5 className="Step-title">Step {number < 9 ? `0${number}` : number}: {title}</h5>
        {children}
      </div>
    </div>
  );
})

export function StepDescription({ children }: { children: ReactNode, success?: boolean }) {
  return <div className="Step-description">{children}</div>;
}

export function StepStrongText({ children }: { children: ReactNode }) {
  return <span className="Step-strongText">{children}</span>;
}

export function StepSuccessText({ children }: { children: ReactNode }) {
  return <span className="Step-description Step-successText">{children}</span>;
}

export function StepActionLink({ children }: { children: ReactNode }) {
  return <div className="Step-actionLink">{children}</div>;
}
