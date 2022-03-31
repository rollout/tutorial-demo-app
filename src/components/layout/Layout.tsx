import { ReactComponent as Logo } from "@cloudbees/honeyui-icons/cloudbees/cloudbees-infinity-vertical-white.svg";
import { ProgressBar } from "../progressbar/ProgressBar";
import "./Layout.css";

interface Props {
  steps: React.ReactNode;
  demoApp: React.ReactNode;
  progress: number
}

export function Layout({ steps, demoApp, progress }: Props) {

  return (
    <div className="layout">
      <section className="layout-sidepanel sidepanel">
        <header className="sidepanel-header">
          <Logo
            className="sidepanel-logo"
            aria-hidden="true"
            width={90}
            height={90}
          />
          <h1 className="sidepanel-title">
            CloudBees Feature Management demo application
          </h1>
          <ProgressBar progress={progress}/>
        </header>
        <div className="sidepanel-content">
          <h3 className="sidepanel-sectionTitle">Progress</h3>
          {steps}
        </div>
        <footer>
        </footer>
      </section>
      <section className="layout-demoAppWrapper">
        <div className="layout-demoApp">{demoApp}</div>
        <footer className="layout-demoApp-footer">
          <p>
            Do you want to know more? Check the <a
              href="https://github.com/rollout/tutorial-demo-app"
              target="_blank"
              rel="noreferrer"
            >
              source code
            </a> of this demo application, and {" "}
            <a href="https://github.com/rollout/tutorial-demo-app#readme">
              how it works
            </a>.
          </p>
        </footer>
      </section>
    </div>
  );
}
