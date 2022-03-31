import { ReactComponent as Logo } from "../../assets/images/hidden_empty_state.svg";

import "./ErrorPage.css";

export function ErrorPage() {
  return (
    <div className="errorPage">
      <div className="errorPage-content">
        <Logo className="errorPage-logo" />
        <div className="errorPage-text">
            <h1 className="errorPage-title">
                Ooops... 
            </h1>
            <h2 className="errorPage-title">
                Something went wrong
            </h2>
            <p>
                Open this page from <a className="ff-link" href="app.rollout.io">app.rollout.io</a> {"➜"} <span className="errorPage-quote">Getting Started</span> {"➜"} <span className="errorPage-quote">Try an interactive app</span>
            </p>
        </div>
      </div>
    </div>
  );
}
