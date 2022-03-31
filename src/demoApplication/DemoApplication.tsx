import { useFeatureFlags } from "../lib/featureManagement/FeatureFlagsContext";
import { Disabled } from "./Disabled";
import { Snake } from "./snake/Snake";

export function DemoApplication() {
  const { featureFlags } = useFeatureFlags();

  const disabled = !featureFlags.snakeGame.release.isEnabled();

  return (
    <div
      className={`demoApplication-wrapper ${disabled ? "is-disabled" : ""}`}
    >
    {disabled ? <Disabled /> : <Snake speed={featureFlags.snakeGame.speed.getValue() as any} />}
    </div>
  );
}
