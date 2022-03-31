export interface StepComponentProps {
    number: number | string
    active: boolean
    current: boolean
    onSuccessChange: (success: boolean)=> void
}

export type StepComponent = React.ForwardRefExoticComponent<StepComponentProps & React.RefAttributes<HTMLDivElement>>