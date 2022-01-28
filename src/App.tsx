//import logo from "./logo.svg";
import "./App.css";
import { useFeatureFlags } from "./context/FeatureFlagsContext";
import { AppKeyError } from "./components/AppKeyError";
import { StringFeatureUnmodified } from "./components/steps/StringFeature/StringFeatureUnmodified";
import { StringFeatureModified } from "./components/steps/StringFeature/StringFeatureModified";
import { BooleanFeatureOn } from "./components/steps/BooleanFeature/BooleanFeatureOn";
import { BooleanFeatureOff } from "./components/steps/BooleanFeature/BooleanFeatureOff";

function App() {
  const { initialized } = useFeatureFlags();

  return (
    <div className="App">
      <h1>
        Feature Management Demo Application
      </h1>
      <AppKeyError />
      {initialized && <AppContent />}
    </div>
  );
}

function AppContent() {
  const { featureFlags, historyFetchEvents } = useFeatureFlags();

  document.body.className = `theme-${featureFlags.styles.theme.getValue()}`

  return (
    <div className="AppContent">
      {featureFlags.styles.theme.getValue() === "dark" ? (
        <StringFeatureUnmodified />
      ) : (
        <StringFeatureModified />
      )}

      {featureFlags.features.displayConfigFetchHistory.isEnabled() ? (
        <BooleanFeatureOn events={historyFetchEvents} />
      ) : (
        <BooleanFeatureOff />
      )}
    </div>
  );
}

export default App;
