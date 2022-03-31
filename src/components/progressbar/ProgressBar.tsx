import './ProgressBar.css'

interface Props  {
    progress: number
}

export function ProgressBar({progress}: Props) {

  const value = toPercentage(progress)

  return (
    <div className="progress">
      <div className="progress-bar">
        <div className="progress-barCompleted" style={{ width: value }}></div>
      </div>
      <div className="progress-number">{value}</div>
    </div>
  );
}



function toPercentage(progress: number) {
  const percent = Math.round(progress * 100)
  const progressInt = Math.min(Math.max(0, percent), 100)
  return `${progressInt}%`
}